"""Sandboxed VM — Made by 2pro12342.

Run as main.py in a CodeHS Python Graphics (tkinter) sandbox.
This is a real Linux desktop session with native applications, not an OS mockup.
Packages are extracted into this program's own directory, without sudo.
Roblox is a website shortcut; a native Roblox Linux client is not included.
"""
import atexit
import json
import math
import os
from pathlib import Path
import queue
import re
import shlex
import shutil
import signal
import socket
import subprocess
import sys
import tarfile
import threading
import time
import tkinter as tk
from tkinter import messagebox
from xml.sax.saxutils import escape
from concurrent.futures import ThreadPoolExecutor

TITLE = "Sandboxed VM"
AUTHOR = "2pro12342"
# Explicitly approved by the user for Chrome inside this CodeHS Linux session.
# Set False to require Chrome's own sandbox and block unsupported launches.
ALLOW_CHROME_WITHOUT_SANDBOX = True
HERE = Path(__file__).resolve().parent
BASE = HERE / ".sandboxed-vm-linux"
RUNTIME = BASE / "runtime"
DOWNLOADS = BASE / "downloads"
DOCUMENTS = HERE / "Documents"
LOGS = BASE / "logs"
APPS = BASE / "apps"
SOCKET = BASE / "control.sock"
SCRIPT = Path(__file__).resolve()
for directory in (BASE, RUNTIME, DOWNLOADS, DOCUMENTS, LOGS, APPS, BASE / "profiles", BASE / "run", BASE / "icons"):
    directory.mkdir(parents=True, exist_ok=True)


def environment():
    env = os.environ.copy()
    libdirs = [RUNTIME / "usr/lib/x86_64-linux-gnu", RUNTIME / "lib/x86_64-linux-gnu"]
    env["LD_LIBRARY_PATH"] = ":".join([str(p) for p in libdirs] + [env.get("LD_LIBRARY_PATH", "")])
    env["PATH"] = str(RUNTIME / "usr/bin") + ":" + env.get("PATH", "")
    env["XDG_DATA_DIRS"] = str(RUNTIME / "usr/share") + ":" + env.get("XDG_DATA_DIRS", "/usr/local/share:/usr/share")
    env["XDG_RUNTIME_DIR"] = str(BASE / "run")
    env["DBUS_SESSION_BUS_ADDRESS"] = "unix:path=" + str(BASE / "run/bus")
    env["NO_AT_BRIDGE"] = "1"
    env["GTK_A11Y"] = "none"
    env["DISPLAY"] = os.environ.get("DISPLAY", ":99")
    return env


def client(action):
    try:
        with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as connection:
            connection.settimeout(3)
            connection.connect(str(SOCKET))
            connection.sendall((json.dumps({"action": action}) + "\n").encode())
            print(connection.recv(16384).decode())
        return 0
    except OSError as exc:
        print("Start Sandboxed VM first:", exc)
        return 1


def checked(command, log_name="setup.log", timeout=240, env=None):
    with (LOGS / log_name).open("ab", buffering=0) as log:
        result = subprocess.run(command, stdout=log, stderr=subprocess.STDOUT, timeout=timeout, env=env)
    if result.returncode:
        detail = (LOGS / log_name).read_text(errors="replace")[-2200:]
        raise RuntimeError("{} failed ({}).\n{}".format(Path(command[0]).name, result.returncode, detail))


def fetch(url, destination):
    partial = destination.with_suffix(destination.suffix + ".part")
    checked(["curl", "--location", "--fail", "--retry", "2", "--connect-timeout", "25", "--max-time", "240", "--output", str(partial), url], timeout=260)
    partial.replace(destination)


def install_desktop(report):
    marker = RUNTIME / "desktop-ready.json"
    if marker.exists() and (RUNTIME / "usr/bin/jwm").exists():
        return
    release = Path("/etc/os-release").read_text()
    if 'VERSION_ID="22.04"' not in release or os.uname().machine != "x86_64":
        raise RuntimeError("The automatic package setup supports CodeHS Ubuntu 22.04 x64. This sandbox has a different runtime.")
    apt = BASE / "apt"
    archives = apt / "archives"
    for directory in (archives / "partial", apt / "lists/partial"):
        directory.mkdir(parents=True, exist_ok=True)
    shutil.copyfile("/var/lib/dpkg/status", str(apt / "status"))
    (apt / "sources.list").write_text(
        "deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] https://archive.ubuntu.com/ubuntu jammy main universe\n"
        "deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] https://archive.ubuntu.com/ubuntu jammy-updates main universe\n"
        "deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] https://security.ubuntu.com/ubuntu jammy-security main universe\n")
    options = []
    for key, value in {
        "Dir::State::status": apt / "status",
        "Dir::State::extended_states": apt / "extended_states",
        "Dir::State::lists": apt / "lists",
        "Dir::Cache::archives": archives,
        "Dir::Cache::pkgcache": apt / "pkgcache.bin",
        "Dir::Cache::srcpkgcache": apt / "srcpkgcache.bin",
        "Dir::Etc::sourcelist": apt / "sources.list",
        "Dir::Etc::sourceparts": "-",
        "Acquire::Retries": "2",
    }.items():
        options.extend(["-o", str(key) + "=" + str(value)])
    report("desktop", "Getting signed Ubuntu packages…")
    checked(["apt-get"] + options + ["update"])
    packages = ["jwm", "pcmanfm", "xterm", "mousepad", "galculator", "libnss3", "libnspr4", "libatk-bridge2.0-0", "libcups2", "libdrm2", "libxkbcommon0", "libxcomposite1", "libxdamage1", "libxrandr2", "libgbm1", "libasound2", "libgtk-3-0", "libxss1"]
    checked(["apt-get"] + options + ["--yes", "--download-only", "--no-install-recommends", "install"] + packages)
    report("desktop", "Installing the window manager and desktop tools…")
    for package in sorted(archives.glob("*.deb")):
        checked(["dpkg-deb", "-x", str(package), str(RUNTIME)], timeout=90)
    for program in ("jwm", "pcmanfm", "xterm", "mousepad", "galculator"):
        if not (RUNTIME / "usr/bin" / program).exists():
            raise RuntimeError("Desktop package did not supply " + program)
    marker.write_text(json.dumps({"packages": packages, "installed": time.time()}))


def install_firefox(report):
    binary = APPS / "firefox/firefox"
    if not binary.exists():
        report("firefox", "Downloading Firefox from Mozilla…")
        archive = DOWNLOADS / "firefox.tar.xz"
        fetch("https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US", archive)
        report("firefox", "Installing Firefox…")
        with tarfile.open(str(archive), "r:*") as tar:
            for member in tar.getmembers():
                target = (APPS / member.name).resolve()
                if os.path.commonpath([str(APPS.resolve()), str(target)]) != str(APPS.resolve()):
                    raise RuntimeError("Unexpected path in Firefox archive")
            tar.extractall(str(APPS))
        archive.unlink()
    report("firefox", "Installed")


def install_chrome(report):
    binary = APPS / "chrome/opt/google/chrome/google-chrome"
    if not binary.exists():
        report("chrome", "Downloading Google Chrome from Google…")
        archive = DOWNLOADS / "chrome.deb"
        fetch("https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb", archive)
        report("chrome", "Installing Google Chrome…")
        checked(["dpkg-deb", "-x", str(archive), str(APPS / "chrome")], timeout=120)
        archive.unlink()
    report("chrome", "Installed")


def write_icons():
    colors = {" ": "None", "a": "#59a6ff", "b": "#f2c35f", "c": "#ffffff", "d": "#111e34", "e": "#ed574a", "f": "#42b875", "g": "#f79539", "h": "#8e65e8"}
    for name in ("files", "firefox", "chrome", "roblox", "terminal", "settings", "editor", "calculator"):
        rows = []
        for y in range(32):
            row = ""
            for x in range(32):
                px, py = x - 15.5, y - 15.5
                radius = math.hypot(px, py)
                color = " "
                if name == "chrome" and radius < 14:
                    color = "e" if py < -abs(px) / 2 else ("f" if px < 0 else "b")
                    if radius < 7:
                        color = "c" if radius > 5.5 else "a"
                elif name == "firefox" and radius < 14:
                    color = "g" if radius > 9 or py > 2 else "h"
                elif name == "roblox":
                    u, v = px * .94 + py * .342, -px * .342 + py * .94
                    if abs(u) < 11 and abs(v) < 11 and not (abs(u) < 4 and abs(v) < 4):
                        color = "c"
                elif name == "files" and 4 <= x <= 28 and 10 <= y <= 26:
                    color = "b"
                elif name == "files" and 4 <= x <= 15 and 7 <= y <= 11:
                    color = "b"
                elif name == "terminal" and 3 <= x <= 28 and 5 <= y <= 27:
                    color = "a" if x in (3, 28) or y in (5, 27) else "d"
                    if (8 <= x <= 13 and abs((y-15) - (x-11)) < 1.5) or (8 <= x <= 13 and abs((y-15) + (x-11)) < 1.5) or (17 <= x <= 23 and y == 21):
                        color = "c"
                elif name == "settings" and 6 < radius < 12:
                    color = "a"
                elif name == "editor" and 7 <= x <= 25 and 4 <= y <= 28:
                    color = "c" if not (11 <= x <= 21 and y in (12, 17, 22)) else "a"
                elif name == "calculator" and 7 <= x <= 25 and 3 <= y <= 28:
                    color = "a" if y < 11 else ("c" if x % 5 in (1, 2) and y % 5 in (1, 2) else "d")
                row += color
            rows.append(row)
        lines = ['/* XPM */', 'static char * icon[] = {', '"32 32 {} 1",'.format(len(colors))]
        lines += ['"{} c {}",'.format(k, v) for k, v in colors.items()]
        lines += ['"{}"{}'.format(row, ',' if i < 31 else '};') for i, row in enumerate(rows)]
        (BASE / "icons" / (name + ".xpm")).write_text("\n".join(lines))


def command(action):
    return " ".join(shlex.quote(v) for v in (sys.executable, str(BASE / "launcher.py"), action))


def write_jwm():
    # CodeHS may execute main.py through a runner. A separate, tiny launcher
    # gives the window manager a stable executable file of its own.
    (BASE / "launcher.py").write_text(
        "import socket,sys,json\n"
        "s=socket.socket(socket.AF_UNIX,socket.SOCK_STREAM)\n"
        "s.settimeout(5)\n"
        "s.connect(" + repr(str(SOCKET)) + ")\n"
        "s.sendall((json.dumps({'action':sys.argv[1]})+'\\n').encode())\n"
        "s.recv(4096)\n"
        "s.close()\n")
    entries = [("files", "Files"), ("firefox", "Firefox"), ("chrome", "Google Chrome"), ("roblox", "Roblox (website)"), ("terminal", "Terminal"), ("editor", "Text Editor"), ("calculator", "Calculator"), ("settings", "Settings"), ("about", "About Sandboxed VM")]
    menu = "".join('<Program label="{}" icon="{}">{}</Program>'.format(label, BASE / "icons" / (app + ".xpm") if app != "about" else BASE / "icons/settings.xpm", escape(command(app))) for app, label in entries)
    buttons = "".join('<TrayButton popup="{}" icon="{}">exec:{}</TrayButton>'.format(label, BASE / "icons" / (app + ".xpm"), escape(command(app))) for app, label in entries[:5])
    xml = '''<?xml version="1.0"?>
<JWM>
<RootMenu onroot="123" labeled="true" label="Sandboxed VM" height="30">{menu}<Separator/><Program label="Stop desktop">{stop}</Program></RootMenu>
<Group><Class>SandboxedVMDesktop</Class><Option>noborder</Option><Option>notitle</Option><Option>nolist</Option><Option>sticky</Option><Option>layer:below</Option></Group>
<WindowStyle><Font>DejaVu Sans-10</Font><Width>2</Width><Height>30</Height><Corner>3</Corner><Foreground>#eaf2ff</Foreground><Background>#182944</Background><Outline>#30435e</Outline><Active><Foreground>#ffffff</Foreground><Background>#244878</Background><Outline>#619bff</Outline></Active></WindowStyle>
<TrayStyle><Font>DejaVu Sans-10</Font><Background>#111e34</Background><Foreground>#e5f0ff</Foreground><Outline>#263b58</Outline><Active><Foreground>#ffffff</Foreground><Background>#244878</Background></Active></TrayStyle>
<MenuStyle><Font>DejaVu Sans-10</Font><Foreground>#eaf2ff</Foreground><Background>#14233b</Background><Outline>#395375</Outline><Active><Foreground>#ffffff</Foreground><Background>#244878</Background></Active></MenuStyle>
<Tray x="0" y="-1" height="44" autohide="off"><TrayButton label="Start" width="76">root:1</TrayButton><Spacer width="6"/>{buttons}<Spacer width="8"/><TaskList maxwidth="180"/><Clock format="%H:%M" width="70"/></Tray>
<Desktops width="1" height="1"/><FocusModel>click</FocusModel><MoveMode>opaque</MoveMode><ResizeMode>opaque</ResizeMode>
<Key mask="A" key="F4">close</Key><Key mask="A" key="Tab">nextstacked</Key><Key mask="4" key="e">exec:{files}</Key><Key mask="C4" key="t">exec:{terminal}</Key><Key key="F1">exec:{about}</Key>
</JWM>'''.format(menu=menu, buttons=buttons, stop=escape(command("stop")), files=escape(command("files")), terminal=escape(command("terminal")), about=escape(command("about")))
    (BASE / "jwmrc").write_text(xml)


def resize_display():
    # Xvfb supplies the remote Linux screen; ask its normal RandR interface for
    # a desktop-sized mode. Browsers and the window manager use that real screen.
    try:
        modeline = subprocess.check_output(["gtf", "1024", "480", "60"], timeout=5, text=True)
        line = next(line for line in modeline.splitlines() if "Modeline" in line)
        values = shlex.split(line.strip())[2:]
        mode = "SandboxedVM-1024x480"
        for args in (["--newmode", mode] + values, ["--addmode", "screen", mode], ["--output", "screen", "--mode", mode]):
            subprocess.run(["xrandr"] + args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)
    except (OSError, subprocess.SubprocessError, StopIteration):
        pass


class Desktop:
    def __init__(self):
        self.events = queue.Queue()
        self.processes = []
        self.ready = False
        self.closed = False
        self.namespace_sandbox = False
        self.status = {"desktop": "Preparing…", "firefox": "Waiting…", "chrome": "Waiting…"}
        self.failures = {}
        self.config = {"wallpaper": "Blue", "browser": "Firefox"}
        try:
            self.config.update(json.loads((BASE / "settings.json").read_text()))
        except (OSError, ValueError):
            pass
        resize_display()
        self.root = tk.Tk(className="SandboxedVMDesktop")
        self.root.title(TITLE)
        self.root.wm_attributes("-type", "desktop")
        self.width = self.root.winfo_screenwidth()
        self.height = self.root.winfo_screenheight()
        self.root.geometry("{}x{}+0+0".format(self.width, self.height))
        self.canvas = tk.Canvas(self.root, highlightthickness=0, bg="#0b1427")
        self.canvas.pack(fill="both", expand=True)
        self.root.bind("<Configure>", lambda e: self.draw_wallpaper() if e.widget == self.root else None)
        self.root.bind_all("<Control-Alt-t>", lambda e: self.launch("terminal"))
        self.root.protocol("WM_DELETE_WINDOW", self.close)
        self.draw_wallpaper()
        self.shortcuts = []
        self.create_shortcuts()
        self.welcome = None
        self.show_welcome()
        self.server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        if SOCKET.exists():
            SOCKET.unlink()
        self.server.bind(str(SOCKET))
        os.chmod(str(SOCKET), 0o600)
        self.server.listen(8)
        threading.Thread(target=self.listen, daemon=True).start()
        threading.Thread(target=self.console_commands, daemon=True).start()
        threading.Thread(target=self.prepare, daemon=True).start()
        self.root.after(120, self.pump)
        self.last_heartbeat = time.monotonic()
        self.root.after(1000, self.watch_display)
        atexit.register(self.cleanup)

    def report(self, app, text):
        print("[{}] {}".format(app, text), flush=True)
        self.events.put(("status", app, text))

    def prepare(self):
        try:
            install_desktop(self.report)
            write_icons()
            write_jwm()
            checked([str(RUNTIME / "usr/bin/jwm"), "-p", "-f", str(BASE / "jwmrc")], env=environment())
            os.chmod(str(BASE / "run"), 0o700)
            if not (BASE / "run/bus").exists():
                self.spawn("dbus", ["dbus-daemon", "--session", "--nofork", "--nopidfile", "--address=unix:path=" + str(BASE / "run/bus")])
            manager = self.spawn("jwm", [str(RUNTIME / "usr/bin/jwm"), "-f", str(BASE / "jwmrc")])
            time.sleep(1)
            if manager.poll() is not None:
                raise RuntimeError("Window manager could not start. " + (LOGS / "jwm.log").read_text(errors="replace")[-1000:])
            self.events.put(("ready",))
            self.report("desktop", "Ready")
            try:
                probe = subprocess.run(["unshare", "--user", "--map-root-user", "true"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)
                self.namespace_sandbox = probe.returncode == 0
            except (OSError, subprocess.SubprocessError):
                pass
            print("Chrome namespace sandbox available:", self.namespace_sandbox, flush=True)
            self.write_welcome_file()
            with ThreadPoolExecutor(max_workers=2) as pool:
                futures = {pool.submit(install_firefox, self.report): "firefox", pool.submit(install_chrome, self.report): "chrome"}
                for future, app in futures.items():
                    try:
                        future.result()
                    except Exception as exc:
                        self.report(app, "Installation failed")
                        self.events.put(("failure", app, str(exc)))
            self.events.put(("finished",))
        except Exception as exc:
            self.events.put(("failure", "desktop", str(exc)))

    def write_welcome_file(self):
        target = DOCUMENTS / "Welcome to Sandboxed VM.txt"
        if not target.exists():
            target.write_text("Sandboxed VM\nMade by 2pro12342\n\nThis is a real Linux desktop running in a CodeHS sandbox.\n\nFirefox and Google Chrome are native applications. Files, Text Editor, Terminal and Calculator run as native Linux programs.\n\nRoblox opens the Roblox website. Roblox has no supported native Linux desktop client, so gameplay is not included.\n\nUse Start, the desktop shortcuts, or the taskbar to open apps. Drag title bars to move windows; minimize, maximize, and close use the native window manager. Alt+Tab switches windows.\n\nSave documents in this Documents folder. Use Settings > Create backup to create a ZIP in the CodeHS program directory. Download important work; CodeHS can recycle the running server.\n\nIf the runtime is reset, press Run again and allow the applications to reinstall.\n")

    def spawn(self, name, args):
        log = (LOGS / (name + ".log")).open("ab", buffering=0)
        try:
            process = subprocess.Popen(args, env=environment(), cwd=str(DOCUMENTS), stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
        finally:
            log.close()
        self.processes.append((name, process))
        return process

    def listen(self):
        while not self.closed:
            try:
                connection, _ = self.server.accept()
                with connection:
                    connection.settimeout(3)
                    request = json.loads(connection.recv(4096).decode())
                    action = request.get("action", "")
                    if action == "status":
                        result = {"name": TITLE, "author": AUTHOR, "ready": self.ready, "apps": dict(self.status), "failures": dict(self.failures), "processes": {name: process.poll() for name, process in self.processes}}
                        connection.sendall(json.dumps(result).encode())
                    else:
                        self.events.put(("launch", action))
                        connection.sendall(b'{"accepted":true}')
            except (OSError, ValueError):
                if self.closed:
                    return

    def console_commands(self):
        # The CodeHS console also provides a convenient app launcher.
        for line in sys.stdin:
            action = line.strip().lower()
            if action == "status":
                print(json.dumps({"name": TITLE, "author": AUTHOR, "apps": self.status, "screen": [self.width, self.height], "chrome_namespace_sandbox": self.namespace_sandbox, "processes": {name: process.poll() for name, process in self.processes}, "failures": self.failures}), flush=True)
            elif action in ("firefox", "chrome", "roblox", "files", "terminal", "editor", "calculator", "settings", "about"):
                self.events.put(("launch", action))

    def watch_display(self):
        if self.closed:
            return
        try:
            info = subprocess.check_output(["xrandr", "--current"], text=True, timeout=3, stderr=subprocess.DEVNULL)
            match = re.search(r"current (\d+) x (\d+)", info)
            if match:
                size = tuple(int(value) for value in match.groups())
                if size != (self.width, self.height):
                    self.width, self.height = size
                    self.root.geometry("{}x{}+0+0".format(*size))
                    self.root.lower()
                    self.position_shortcuts()
                    self.draw_wallpaper()
        except (OSError, subprocess.SubprocessError):
            pass
        if time.monotonic() - self.last_heartbeat > 20:
            print("Sandboxed VM session active. Console commands: status, firefox, chrome, files, terminal.", flush=True)
            self.last_heartbeat = time.monotonic()
        self.root.after(1000, self.watch_display)

    def pump(self):
        while True:
            try:
                event = self.events.get_nowait()
            except queue.Empty:
                break
            if event[0] == "status":
                self.status[event[1]] = event[2]
                self.refresh_welcome()
            elif event[0] == "ready":
                self.ready = True
                self.root.lower()
                if self.welcome and self.welcome.winfo_exists():
                    self.welcome.lift()
            elif event[0] == "failure":
                self.failures[event[1]] = event[2]
                print("ERROR:", event[1], event[2], flush=True)
                self.refresh_welcome()
                self.notice("Setup needs attention", event[1] + ": " + event[2][-1600:])
            elif event[0] == "launch":
                self.launch(event[1])
            elif event[0] == "finished":
                self.refresh_welcome()
                print("DESKTOP READY — Sandboxed VM — Made by 2pro12342", flush=True)
        if not self.closed:
            self.root.after(150, self.pump)

    def draw_wallpaper(self):
        canvas = self.canvas
        canvas.delete("wallpaper")
        width = max(1, self.root.winfo_width())
        height = max(1, self.root.winfo_height())
        palette = {"Blue": ("#0b1427", "#17385d", "#285a99"), "Violet": ("#141028", "#30255b", "#63428e"), "Forest": ("#091e20", "#164b4c", "#237d79")}
        background, mid, accent = palette.get(self.config["wallpaper"], palette["Blue"])
        canvas.configure(bg=background)
        for index in range(15, 0, -1):
            inset = index * max(width, height) / 20
            canvas.create_oval(width * .62 - inset, height * .38 - inset * .65, width * 1.42 + inset, height * 1.35 + inset * .65, fill=mid if index > 7 else accent, outline=background, width=3, tags="wallpaper")
        canvas.create_text(width - 34, height - 112, text=TITLE, fill="#e8f1ff", font=("DejaVu Sans", 27, "bold"), anchor="e", tags="wallpaper")
        canvas.create_text(width - 35, height - 78, text="Made by " + AUTHOR, fill="#a7c3e7", font=("DejaVu Sans", 12), anchor="e", tags="wallpaper")
        canvas.tag_lower("wallpaper")

    def create_shortcuts(self):
        for index, (action, label, color, symbol) in enumerate([
            ("files", "Files", "#ffd06e", "▰"), ("firefox", "Firefox", "#ff9b48", "◉"), ("chrome", "Google Chrome", "#66b2ff", "◉"), ("roblox", "Roblox (web)", "#ffffff", "◈"), ("terminal", "Terminal", "#b5d5ff", ">_"), ("settings", "Settings", "#b5c8e6", "⚙")
        ]):
            button = tk.Button(self.root, text=symbol + "\n" + label, command=lambda name=action: self.launch(name), width=12, height=3, bg="#11233b", fg=color, activebackground="#234568", activeforeground="#ffffff", relief="flat", bd=0, font=("DejaVu Sans", 10), cursor="hand2")
            self.shortcuts.append(button)
        self.position_shortcuts()

    def position_shortcuts(self):
        rows = max(1, (self.height - 64) // 86)
        for index, button in enumerate(self.shortcuts):
            button.place(x=16 + (index // rows) * 124, y=18 + (index % rows) * 86, width=112, height=72)

    def make_window(self, title, width=600, height=440):
        window = tk.Toplevel(self.root)
        window.title(title)
        window.configure(bg="#f5f8ff")
        width = min(width, max(320, self.width - 150))
        height = min(height, max(260, self.height - 68))
        x = min(max(138, (self.width - width) // 2), max(0, self.width - width - 10))
        y = max(10, (self.height - height - 44) // 2)
        window.geometry("{}x{}+{}+{}".format(width, height, x, y))
        window.minsize(min(320, width), min(260, height))
        window.lift()
        return window

    def show_welcome(self):
        if self.welcome and self.welcome.winfo_exists():
            self.welcome.deiconify()
            self.welcome.lift()
            return
        self.welcome = self.make_window("Welcome to Sandboxed VM", 610, 430)
        pane = tk.Frame(self.welcome, bg="#f5f8ff", padx=30, pady=24)
        pane.pack(fill="both", expand=True)
        tk.Label(pane, text="Your Linux desktop is here.", bg="#f5f8ff", fg="#182b47", font=("DejaVu Sans", 21, "bold"), anchor="w").pack(fill="x", pady=(0, 8))
        tk.Label(pane, text="Sandboxed VM · Made by 2pro12342", bg="#f5f8ff", fg="#526983", font=("DejaVu Sans", 11), anchor="w").pack(fill="x", pady=(0, 20))
        self.status_vars = {}
        for app, label in (("desktop", "Desktop tools"), ("firefox", "Mozilla Firefox"), ("chrome", "Google Chrome")):
            row = tk.Frame(pane, bg="#f5f8ff")
            row.pack(fill="x", pady=5)
            tk.Label(row, text=label, width=18, bg="#f5f8ff", fg="#20364f", font=("DejaVu Sans", 11), anchor="w").pack(side="left")
            variable = tk.StringVar(value=self.status[app])
            self.status_vars[app] = variable
            tk.Label(row, textvariable=variable, bg="#f5f8ff", fg="#426ca5", font=("DejaVu Sans", 10), anchor="w", wraplength=330).pack(side="left", fill="x", expand=True)
        buttons = tk.Frame(pane, bg="#f5f8ff")
        buttons.pack(fill="x", pady=20)
        for action, label in (("firefox", "Open Firefox"), ("chrome", "Open Chrome"), ("files", "Open Files")):
            tk.Button(buttons, text=label, command=lambda name=action: self.launch(name), bg="#245ba8", fg="white", activebackground="#19457e", activeforeground="white", relief="flat", padx=13, pady=9, cursor="hand2").pack(side="left", padx=(0, 10))
        tk.Label(pane, text="Real Linux apps. Move windows by their title bars.\nRoblox opens its website; native Roblox gameplay is unavailable on Linux.", bg="#f5f8ff", fg="#526983", font=("DejaVu Sans", 10), justify="left", anchor="w", wraplength=540).pack(fill="x")

    def refresh_welcome(self):
        if self.welcome and self.welcome.winfo_exists():
            for app, variable in self.status_vars.items():
                variable.set(self.status[app])

    def notice(self, title, text):
        window = self.make_window(title, 620, 330)
        tk.Label(window, text=title, bg="#f5f8ff", fg="#162d4b", font=("DejaVu Sans", 17, "bold"), anchor="w").pack(fill="x", padx=24, pady=(22, 10))
        body = tk.Text(window, wrap="word", bg="#f5f8ff", fg="#314963", relief="flat", padx=24, pady=8, font=("DejaVu Sans", 10))
        body.pack(fill="both", expand=True)
        body.insert("1.0", text)
        body.configure(state="disabled")
        tk.Button(window, text="Close", command=window.destroy, padx=20, pady=7).pack(pady=14)

    def launch(self, action):
        if action == "stop":
            self.close()
            return
        if action == "about":
            self.notice("About Sandboxed VM", "Sandboxed VM\nMade by 2pro12342\n\nA real Linux desktop session inside CodeHS.\n\nWindow manager: JWM\nFile manager: PCManFM\nTerminal: xterm\nText editor: Mousepad\nCalculator: Galculator\nBrowsers: Firefox and Google Chrome\n\nRoblox is a website shortcut. Native Roblox gameplay is not supported on Linux.\n\nThis project is a Linux sandbox desktop, not a Microsoft Windows installation.")
            return
        if action == "settings":
            self.settings()
            return
        if not self.ready:
            self.show_welcome()
            return
        args = None
        if action in ("chrome", "firefox", "roblox"):
            browser = self.config["browser"].lower() if action == "roblox" else action
            if self.status.get(browser) != "Installed":
                self.show_welcome()
                return
            url = "https://www.roblox.com/" if action == "roblox" else (DOCUMENTS / "Welcome to Sandboxed VM.txt").as_uri()
            profile = BASE / "profiles" / browser
            profile.mkdir(exist_ok=True)
            if browser == "firefox":
                args = [str(APPS / "firefox/firefox"), "--profile", str(profile), url]
            else:
                args = [str(APPS / "chrome/opt/google/chrome/google-chrome"), "--user-data-dir=" + str(profile), "--disable-dev-shm-usage", "--no-default-browser-check", url]
                # Use Chromium's unprivileged namespace sandbox when it works.
                # Seccomp and the namespace sandbox remain enabled in this
                # branch; the fallback below requires the explicit user option.
                if self.namespace_sandbox:
                    args.insert(1, "--disable-setuid-sandbox")
                elif ALLOW_CHROME_WITHOUT_SANDBOX:
                    args.insert(1, "--no-sandbox")
            name = browser
        else:
            name = action
            choices = {
                "files": [str(RUNTIME / "usr/bin/pcmanfm"), str(DOCUMENTS)],
                "editor": [str(RUNTIME / "usr/bin/mousepad"), str(DOCUMENTS / "Welcome to Sandboxed VM.txt")],
                "terminal": [str(RUNTIME / "usr/bin/xterm"), "-T", "Terminal — Sandboxed VM", "-fa", "DejaVu Sans Mono", "-fs", "11", "-bg", "#0c1628", "-fg", "#e4eeff", "-e", "/bin/bash"],
                "calculator": [str(RUNTIME / "usr/bin/galculator")],
            }
            args = choices.get(action)
        if not args:
            return
        try:
            process = self.spawn(name, args)
            self.root.lower()
            self.root.after(2400, lambda: self.check_launch(name, process))
        except OSError as exc:
            self.notice("Could not open " + action, str(exc))

    def check_launch(self, name, process):
        result = process.poll()
        if result is not None and result != 0:
            log = (LOGS / (name + ".log")).read_text(errors="replace")[-1800:]
            self.failures[name] = log
            print("LAUNCH ERROR:", name, log, flush=True)
            self.notice("Could not open " + name, "The real application exited with code {}.\n\n{}".format(result, log))

    def settings(self):
        window = self.make_window("Settings — Sandboxed VM", 510, 370)
        frame = tk.Frame(window, bg="#f5f8ff", padx=24, pady=22)
        frame.pack(fill="both", expand=True)
        tk.Label(frame, text="Make it yours", font=("DejaVu Sans", 19, "bold"), bg="#f5f8ff", fg="#1b3553").pack(anchor="w", pady=(0, 18))
        tk.Label(frame, text="Wallpaper", bg="#f5f8ff", fg="#2d4764").pack(anchor="w")
        wallpaper = tk.StringVar(value=self.config["wallpaper"])
        tk.OptionMenu(frame, wallpaper, "Blue", "Violet", "Forest").pack(anchor="w", pady=(3, 10))
        tk.Label(frame, text="Browser for the Roblox website shortcut", bg="#f5f8ff", fg="#2d4764").pack(anchor="w")
        browser = tk.StringVar(value=self.config["browser"])
        tk.OptionMenu(frame, browser, "Firefox", "Chrome").pack(anchor="w", pady=(3, 12))
        def save():
            self.config.update(wallpaper=wallpaper.get(), browser=browser.get())
            (BASE / "settings.json").write_text(json.dumps(self.config))
            self.draw_wallpaper()
            window.destroy()
        row = tk.Frame(frame, bg="#f5f8ff")
        row.pack(anchor="w", pady=10)
        tk.Button(row, text="Save settings", command=save, padx=12, pady=7).pack(side="left", padx=(0, 10))
        tk.Button(row, text="Create document backup", command=self.backup, padx=12, pady=7).pack(side="left")

    def backup(self):
        import zipfile
        output = HERE / "Sandboxed-VM-Documents.zip"
        with zipfile.ZipFile(str(output), "w", zipfile.ZIP_DEFLATED) as archive:
            for filename in DOCUMENTS.rglob("*"):
                if filename.is_file() and not filename.is_symlink():
                    archive.write(str(filename), str(filename.relative_to(HERE)))
        self.notice("Backup created", "Your documents were saved to:\n\n" + str(output) + "\n\nEnable CodeHS File I/O to show generated files, then download this ZIP from the CodeHS file list.")

    def close(self):
        if not self.closed:
            self.closed = True
            self.cleanup()
            self.root.destroy()

    def cleanup(self):
        for _name, process in reversed(self.processes):
            if process.poll() is None:
                try:
                    os.killpg(process.pid, signal.SIGTERM)
                except ProcessLookupError:
                    pass
        try:
            self.server.close()
            SOCKET.unlink(missing_ok=True)
        except (OSError, AttributeError):
            pass

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    if "--launch" in sys.argv:
        position = sys.argv.index("--launch")
        sys.exit(client(sys.argv[position + 1] if len(sys.argv) > position + 1 else "status"))
    try:
        desktop = Desktop()
        signal.signal(signal.SIGTERM, lambda *_: desktop.root.after(0, desktop.close))
        desktop.run()
    except Exception as error:
        print("Sandboxed VM could not start:", error, flush=True)
        raise
