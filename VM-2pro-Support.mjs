// Sandboxed VM 2 — Made by 2pro12342
// CodeHS: JavaScript Graphics sandbox. Click Run, then Launch.
var SandboxedVM2 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // app.mjs
  var app_exports = {};
  __export(app_exports, {
    launchController: () => launchController,
    startApp: () => startApp
  });

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i2 = 0; i2 < 31; ++i2) {
      b[i2] = start += 1 << eb[i2 - 1];
    }
    var r = new i32(b[30]);
    for (var i2 = 1; i2 < 30; ++i2) {
      for (var j = b[i2]; j < b[i2 + 1]; ++j) {
        r[j] = j - b[i2] << 5 | i2;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i2 = 0;
    var l = new u16(mb);
    for (; i2 < s; ++i2) {
      if (cd[i2])
        ++l[cd[i2] - 1];
    }
    var le = new u16(mb);
    for (i2 = 1; i2 < mb; ++i2) {
      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          var sv = i2 << 4 | cd[i2];
          var r_1 = mb - cd[i2];
          var v = le[cd[i2] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i2 = 0; i2 < s; ++i2) {
        if (cd[i2]) {
          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i2 = 1; i2 < a.length; ++i2) {
      if (a[i2] > m)
        m = a[i2];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    // determined by compression function
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i2 = 0; i2 < hcLen; ++i2) {
            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i2 = 0; i2 < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i2++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i2++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i2 = sym - 257, b = fleb[i2];
            add = bits(dat, pos, (1 << b) - 1) + fl[i2];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
  };
  var b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
  };
  var b8 = function(d, b) {
    return b4(d, b) + b4(d, b + 4) * 4294967296;
  };
  function inflateSync(data, opts) {
    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }
  var dutf8 = function(d) {
    for (var r = "", i2 = 0; ; ) {
      var c = d[i2++];
      var eb = (c > 127) + (c > 223) + (c > 239);
      if (i2 + eb > d.length)
        return { s: r, r: slc(d, i2 - 1) };
      if (!eb)
        r += String.fromCharCode(c);
      else if (eb == 3) {
        c = ((c & 15) << 18 | (d[i2++] & 63) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
      } else if (eb & 1)
        r += String.fromCharCode((c & 31) << 6 | d[i2++] & 63);
      else
        r += String.fromCharCode((c & 15) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63);
    }
  };
  function strFromU8(dat, latin1) {
    if (latin1) {
      var r = "";
      for (var i2 = 0; i2 < dat.length; i2 += 16384)
        r += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));
      return r;
    } else if (td) {
      return td.decode(dat);
    } else {
      var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
      if (r.length)
        err(8);
      return s;
    }
  }
  var slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
  };
  var zh = function(d, b, z) {
    var fnl = b2(d, b + 28), efl = b2(d, b + 30), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl;
    var _a2 = z64hs(d, es, efl, z, b4(d, b + 20), b4(d, b + 24), b4(d, b + 42)), sc = _a2[0], su = _a2[1], off = _a2[2];
    return [b2(d, b + 10), sc, su, fn, es + efl + b2(d, b + 32), off];
  };
  var z64hs = function(d, b, l, z, sc, su, off) {
    var nsc = sc == 4294967295, nsu = su == 4294967295, noff = off == 4294967295, e = b + l;
    var nf = nsc + nsu + noff;
    if (z && nf) {
      for (; b + 4 < e; b += 4 + b2(d, b + 2)) {
        if (b2(d, b) == 1) {
          return [
            nsc ? b8(d, b + 4 + 8 * nsu) : sc,
            nsu ? b8(d, b + 4) : su,
            noff ? b8(d, b + 4 + 8 * (nsu + nsc)) : off,
            1
          ];
        }
      }
      if (z < 2)
        err(13);
    }
    return [sc, su, off, 0];
  };
  function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 101010256; --e) {
      if (!e || data.length - e > 65558)
        err(13);
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
      return {};
    var o = b4(data, e + 16);
    var z = b4(data, e - 20) == 117853008;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    for (var i2 = 0; i2 < c; ++i2) {
      var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_2
      })) {
        if (!c_2)
          files[fn] = slc(data, b, b + sc);
        else if (c_2 == 8)
          files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
        else
          err(14, "unknown compression type " + c_2);
      }
    }
    return files;
  }

  // core.mjs
  var LIMIT = 2e10;
  var VERSION = "2.0.0";
  function cleanPath(path) {
    if (typeof path !== "string" || !path || path.length > 1024 || path.includes("\\") || path.includes("\0") || path.startsWith("/")) throw Error("Invalid file path");
    const parts = path.split("/");
    if (parts.some((p) => !p || p === "." || p === ".." || /[\x00-\x1f:]/.test(p))) throw Error("Invalid file path");
    return parts.join("/");
  }
  function checkCapacity(total, oldSize, newSize, quota = LIMIT) {
    if (!Number.isSafeInteger(newSize) || newSize < 0 || total - oldSize + newSize > Math.min(LIMIT, quota)) throw Error("S-Files storage limit reached");
    return total - oldSize + newSize;
  }
  function bytes(n) {
    return n >= 1e9 ? (n / 1e9).toFixed(2) + " GB" : n >= 1e6 ? (n / 1e6).toFixed(1) + " MB" : n >= 1e3 ? (n / 1e3).toFixed(1) + " KB" : n + " B";
  }
  function validateManifest(m, files) {
    if (!m || m.format !== "SWBN/1" || typeof m.name !== "string" || !m.name.trim() || m.name.length > 80) throw Error("A SWBN app needs format SWBN/1 and a name of 1\u201380 characters");
    const entry = cleanPath(m.entry || "index.html");
    if (!/\.html?$/i.test(entry) || !files.has(entry)) throw Error("App entry must be an HTML file inside the package");
    return { format: "SWBN/1", name: m.name.trim(), version: String(m.version || "1.0.0").slice(0, 32), entry };
  }
  function calculate(expression) {
    const tokens = String(expression).replaceAll("\xD7", "*").replaceAll("\xF7", "/").match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[()+\-*/%]/gi) || [];
    if (tokens.join("") !== String(expression).replaceAll("\xD7", "*").replaceAll("\xF7", "/").replace(/\s/g, "")) throw Error("Use numbers and arithmetic operators");
    let i2 = 0;
    const atom = () => {
      if (tokens[i2] === "(") {
        i2++;
        const n2 = sum();
        if (tokens[i2++] !== ")") throw Error("Missing closing parenthesis");
        return n2;
      }
      if (tokens[i2] === "+" || tokens[i2] === "-") {
        const sign = tokens[i2++];
        return (sign === "-" ? -1 : 1) * atom();
      }
      const n = Number(tokens[i2++]);
      if (!Number.isFinite(n)) throw Error("Enter a number");
      return n;
    };
    const product = () => {
      let n = atom();
      while (["*", "/", "%"].includes(tokens[i2])) {
        const op = tokens[i2++], r = atom();
        n = op === "*" ? n * r : op === "/" ? n / r : n % r;
      }
      return n;
    };
    const sum = () => {
      let n = product();
      while (["+", "-"].includes(tokens[i2])) {
        const op = tokens[i2++], r = product();
        n = op === "+" ? n + r : n - r;
      }
      return n;
    };
    const result = sum();
    if (i2 !== tokens.length || !Number.isFinite(result)) throw Error("Invalid expression");
    return Number(result.toPrecision(14));
  }

  // vault.mjs
  function newUID(win) {
    const words = win.crypto.getRandomValues(new Uint32Array(4));
    return words.reduce((value, word) => value << 32n | BigInt(word), 0n).toString();
  }
  var Vault = class {
    constructor(win) {
      this.win = win;
      this.native = win.svmNative || null;
      this.manifest = { files: {}, apps: [], uid: newUID(win), settings: { quality: "balanced" } };
      this.chain = Promise.resolve();
    }
    async init() {
      var _a2;
      if (!this.native) {
        if (!this.win.navigator.storage?.getDirectory) throw Error("This browser does not support persistent S-Files. Use current Chrome, Edge, or the Windows app.");
        this.root = await this.win.navigator.storage.getDirectory();
        this.root = await this.root.getDirectoryHandle("sandboxed-vm-2pro-support-v2", { create: true });
      }
      try {
        const f = await this.read("_system/manifest.json");
        const m = JSON.parse(await f.text());
        if (m && m.files && Array.isArray(m.apps)) this.manifest = m;
      } catch (e) {
        if (e.name !== "NotFoundError" && !/not found|ENOENT/i.test(e.message)) console.warn("Manifest recovery:", e.message);
      }
      (_a2 = this.manifest).settings || (_a2.settings = { quality: "balanced" });
      if (!/^\d{20,40}$/.test(this.manifest.uid || "")) this.manifest.uid = newUID(this.win);
      await this.save();
      return this;
    }
    serial(fn) {
      const task = this.chain.then(fn);
      this.chain = task.catch(() => {
      });
      return task;
    }
    async handle(path, create = false) {
      const parts = cleanPath(path).split("/");
      const name = parts.pop();
      let d = this.root;
      for (const p of parts) d = await d.getDirectoryHandle(p, { create });
      return d.getFileHandle(name, { create });
    }
    async read(path) {
      cleanPath(path);
      if (this.native) {
        const stat = await this.native.call({ op: "stat", path });
        const self = this;
        const section = async (start, end) => {
          const chunks = [];
          for (let pos = start; pos < end; pos += 65536) {
            const part = await self.native.call({ op: "read", path, offset: pos, length: Math.min(65536, end - pos) });
            chunks.push(Uint8Array.from(atob(part.data), (c) => c.charCodeAt(0)));
          }
          return new Blob(chunks).arrayBuffer();
        };
        if (stat.size <= 16e6) return new File([await section(0, stat.size)], path.split("/").pop());
        return { size: stat.size, name: path.split("/").pop(), slice: (start = 0, end = stat.size) => ({ arrayBuffer: () => section(Math.max(0, start), Math.min(stat.size, end)) }), arrayBuffer: () => {
          if (stat.size > 15e7) throw Error("Use streaming or Download for large files");
          return section(0, stat.size);
        }, text: async () => {
          if (stat.size > 8e6) throw Error("File is too large for the text viewer");
          return new TextDecoder().decode(await section(0, stat.size));
        }, stream: () => {
          let offset = 0;
          return new self.win.ReadableStream({ async pull(controller) {
            if (offset >= stat.size) {
              controller.close();
              return;
            }
            const data = new Uint8Array(await section(offset, Math.min(offset + 65536, stat.size)));
            offset += data.length;
            controller.enqueue(data);
          } });
        } };
      }
      return (await this.handle(path)).getFile();
    }
    async writer(path) {
      cleanPath(path);
      if (this.native) {
        await this.native.call({ op: "begin", path });
        let offset = 0;
        return { write: async (data) => {
          const a = data instanceof Uint8Array ? data : new Uint8Array(data);
          for (let i2 = 0; i2 < a.length; i2 += 65536) {
            let s = "";
            for (const b of a.subarray(i2, i2 + 65536)) s += String.fromCharCode(b);
            await this.native.call({ op: "write", path, offset, data: btoa(s) });
            offset += Math.min(65536, a.length - i2);
          }
        }, close: () => this.native.call({ op: "commit", path }), abort: () => this.native.call({ op: "abort", path }) };
      }
      const h = await this.handle(path, true);
      return h.createWritable();
    }
    async save() {
      const json = JSON.stringify(this.manifest);
      const w = await this.writer("_system/manifest.json");
      await w.write(new TextEncoder().encode(json));
      await w.close();
    }
    get total() {
      return Object.values(this.manifest.files).reduce((n, f) => n + f.size, 0);
    }
    async capacity() {
      if (this.native) return this.native.call({ op: "capacity" });
      const e = await this.win.navigator.storage.estimate();
      return { limit: LIMIT, quota: Math.min(LIMIT, Math.max(0, (e.quota || LIMIT) - (e.usage || 0) + this.total)), used: this.total };
    }
    async put(path, file, extra = {}) {
      return this.serial(async () => {
        cleanPath(path);
        const cap = await this.capacity();
        checkCapacity(this.total, this.manifest.files[path]?.size || 0, file.size, cap.quota);
        const w = await this.writer("S-Files/" + path);
        try {
          if (file.stream) {
            const reader = file.stream().getReader();
            for (; ; ) {
              const { value, done } = await reader.read();
              if (done) break;
              await w.write(value);
            }
          } else await w.write(new Uint8Array(await file.arrayBuffer()));
          await w.close();
        } catch (e) {
          await w.abort?.();
          throw e;
        }
        this.manifest.files[path] = { size: file.size, mtime: Date.now(), ...extra };
        await this.save();
        return this.manifest.files[path];
      });
    }
    async receive(path, size, reader, extra = {}) {
      return this.serial(async () => {
        const cap = await this.capacity();
        checkCapacity(this.total, this.manifest.files[path]?.size || 0, size, cap.quota);
        const w = await this.writer("S-Files/" + cleanPath(path));
        try {
          for (let offset = 0; offset < size; offset += 65536) await w.write(await reader(offset, 65536));
          await w.close();
        } catch (e) {
          await w.abort?.();
          throw e;
        }
        this.manifest.files[path] = { size, mtime: Date.now(), ...extra };
        await this.save();
      });
    }
    async file(path) {
      return this.read("S-Files/" + cleanPath(path));
    }
    async remove(path) {
      return this.serial(async () => {
        cleanPath(path);
        if (this.native) await this.native.call({ op: "trash", path: "S-Files/" + path });
        else {
          const old = await this.file(path);
          const w = await this.writer("_trash/" + Date.now() + "-" + path.replaceAll("/", "_"));
          await w.write(new Uint8Array(await old.arrayBuffer()));
          await w.close();
          const parts = path.split("/");
          const name = parts.pop();
          let d = await this.root.getDirectoryHandle("S-Files");
          for (const p of parts) d = await d.getDirectoryHandle(p);
          await d.removeEntry(name);
        }
        delete this.manifest.files[path];
        await this.save();
      });
    }
  };

  // session.mjs
  var CodeHSSession = class {
    constructor(win, uid, files, onEvent) {
      this.win = win;
      this.uid = uid;
      this.files = files;
      this.onEvent = onEvent;
      this.pending = /* @__PURE__ */ new Map();
      this.sequence = 0;
      this.buffer = "";
      this.open = false;
      this.stopping = false;
    }
    emit(event, payload) {
      if (!this.open || this.socket.readyState !== 1) throw Error("CodeHS connection is not open");
      this.socket.send("42" + JSON.stringify([event, payload]));
    }
    async connect() {
      this.stopping = false;
      this.onEvent("stage", { percent: 3, label: "Starting the CodeHS Linux session" });
      const abort = this.abort = new AbortController();
      const timeout = this.win.setTimeout(() => abort.abort(), 9e4);
      try {
        const r = await this.win.fetch("https://scalinghub.codehs.com/hub/api/spinup/" + this.uid + "/config/default", { credentials: "include", signal: abort.signal });
        if (!r.ok) throw Error("CodeHS could not start a session (HTTP " + r.status + ")");
      } finally {
        this.win.clearTimeout(timeout);
      }
      if (this.stopping) throw Error("Start canceled");
      await new Promise((resolve, reject) => {
        const s = this.socket = new this.win.WebSocket("wss://scalinghub.codehs.com/user/" + this.uid + "/spawn/?watch=true&EIO=3&transport=websocket");
        const timer = this.win.setTimeout(() => reject(Error("CodeHS connection timed out")), 4e4);
        s.onmessage = (e) => {
          if (typeof e.data !== "string") return;
          const text = e.data;
          if (text.startsWith("0")) {
            s.send("40");
            return;
          }
          if (text === "40") {
            this.open = true;
            this.win.clearTimeout(timer);
            resolve();
            return;
          }
          if (text === "2") {
            s.send("3");
            return;
          }
          if (!text.startsWith("42")) return;
          try {
            const [event, data] = JSON.parse(text.slice(2));
            this.handle(event, data);
          } catch (error) {
            this.onEvent("log", error.message);
          }
        };
        s.onerror = () => {
          if (!this.open) reject(Error("CodeHS socket connection failed"));
        };
        s.onclose = () => {
          this.open = false;
          this.win.clearInterval(this.keepalive);
          for (const p of this.pending.values()) {
            this.win.clearTimeout(p.timer);
            p.reject(Error("CodeHS disconnected"));
          }
          this.pending.clear();
          if (!this.stopping) this.onEvent("disconnected", {});
        };
      });
      if (this.stopping) throw Error("Start canceled");
      this.keepalive = this.win.setInterval(() => {
        try {
          this.emit("keepalive", null);
        } catch {
        }
      }, 18e3);
      this.onEvent("stage", { percent: 8, label: "Sending the desktop runtime" });
      await new Promise((resolve, reject) => {
        this.transferDone = resolve;
        this.transferFailure = reject;
        this.transferTimer = this.win.setTimeout(() => reject(Error("CodeHS file transfer timed out")), 45e3);
        this.emit("transfer", this.files);
      });
      if (this.stopping) throw Error("Start canceled");
      this.emit("spawn", { cmd: "bash", args: ["-lc", "if [ -f ./.pyvenv311/bin/activate ]; then . ./.pyvenv311/bin/activate; fi; export DISPLAY=:99; exec python -u agent.py"], id: "svm2-agent", options: { type: "normal" } });
    }
    handle(event, data) {
      if (event === "transferComplete") {
        this.win.clearTimeout(this.transferTimer);
        this.transferDone?.();
        this.transferDone = null;
        return;
      }
      if ((event === "stdout" || event === "stderr") && data?.id === "svm2-agent") {
        if (event === "stderr") {
          this.onEvent("log", String(data.data));
          return;
        }
        this.buffer += String(data.data || "");
        let index;
        while ((index = this.buffer.indexOf("\n")) >= 0) {
          const line = this.buffer.slice(0, index).replace(/\r$/, "");
          this.buffer = this.buffer.slice(index + 1);
          if (line.startsWith("SVM2 ")) {
            try {
              const m = JSON.parse(line.slice(5));
              if (m.id) {
                const p = this.pending.get(m.id);
                if (p) {
                  this.win.clearTimeout(p.timer);
                  this.pending.delete(m.id);
                  m.ok ? p.resolve(m.result) : p.reject(Error(m.error));
                }
              } else this.onEvent(m.event, m.data);
            } catch (e) {
              this.onEvent("log", e.message);
            }
          } else if (line) this.onEvent("log", line);
        }
      }
      if (event === "exit" && data?.id === "svm2-agent" && !this.stopping) this.onEvent("error", { message: "The Linux desktop stopped. " + JSON.stringify(data.data) });
    }
    request(action, payload = {}, timeout = 3e4) {
      return new Promise((resolve, reject) => {
        const id = "r" + ++this.sequence;
        const timer = this.win.setTimeout(() => {
          this.pending.delete(id);
          reject(Error(action + " timed out"));
        }, timeout);
        this.pending.set(id, { resolve, reject, timer });
        try {
          this.emit("stdin", { id: "svm2-agent", data: JSON.stringify({ id, action, ...payload }) + "\n" });
        } catch (e) {
          this.win.clearTimeout(timer);
          this.pending.delete(id);
          reject(e);
        }
      });
    }
    resize(width, height) {
      if (this.open) this.emit("resize", { w: width, h: height });
    }
    async stop() {
      this.stopping = true;
      this.abort?.abort();
      if (this.open) {
        try {
          await this.request("stop", {}, 5e3);
        } catch {
        }
        if (this.open) this.emit("kill", { id: "svm2-agent" });
      }
      this.win.clearInterval(this.keepalive);
      this.win.clearTimeout(this.transferTimer);
      this.socket?.close();
      this.open = false;
    }
  };

  // icons.mjs
  var paths = {
    logo: "M5 4h15l-3 4H8l-1 3h8a5 5 0 0 1 0 10H2l3-4h10l1-3H8A5 5 0 0 1 5 4Z",
    desktop: "M3 3h18v13H3z M8 21h8 M12 16v5",
    files: "M2 6h8l2 3h10v12H2z M2 6V3h7l3 3",
    launcher: "M4 4h3v3H4z M10.5 4h3v3h-3z M17 4h3v3h-3z M4 10.5h3v3H4z M10.5 10.5h3v3h-3z M17 10.5h3v3h-3z M4 17h3v3H4z M10.5 17h3v3h-3z M17 17h3v3h-3z",
    store: "M4 7h16l1 14H3z M8 8V5a4 4 0 0 1 8 0v3",
    notepad: "M5 2h10l4 4v16H5z M14 2v5h5 M8 11h8 M8 15h8 M8 19h5",
    tasks: "M2 4h20v16H2z M5 12h3l2-5 3 10 2-5h4",
    calculator: "M5 2h14v20H5z M8 5h8v4H8z M8 13h1 M12 13h1 M16 13h1 M8 17h1 M12 17h1 M16 17h1",
    settings: "m9 3 1-2h4l1 2 2 1 2-1 2 3-1 2v3l1 2-2 3-2-1-2 1-1 3h-4l-1-3-2-1-2 1-2-3 1-2V8L2 6l2-3 2 1z M15.5 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0",
    fullscreen: "M3 8V3h5 M16 3h5v5 M21 16v5h-5 M8 21H3v-5",
    stop: "M5 5h14v14H5z",
    play: "m8 4 12 8-12 8z",
    upload: "M12 16V3 M7 8l5-5 5 5 M3 15v6h18v-6",
    refresh: "M20 7V2l-3 3a9 9 0 1 0 3 12 M20 7h-5",
    browser: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z M2 12h20 M12 2c-5 5-5 15 0 20 M12 2c5 5 5 15 0 20",
    terminal: "M3 4h18v16H3z M6 8l4 4-4 4 M12 16h5",
    close: "M5 5l14 14 M19 5 5 19",
    download: "M12 3v13 M7 11l5 5 5-5 M3 16v5h18v-5"
  };
  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="${name === "logo" ? "currentColor" : "none"}" stroke="currentColor" stroke-width="${name === "logo" ? 0 : 1.7}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.browser}"/></svg>`;
  }

  // style.css
  var style_default = ":root{color-scheme:dark;font-family:'Segoe UI',system-ui,sans-serif;color:#f3f6fc;background:#0d1420;font-synthesis:none;font-size:14px;--bg:#0d1420;--rail:#161f2c;--surface:#1b2737;--line:#2b3a4e;--muted:#a8b9cf;--blue:#4a83ff}\n*{box-sizing:border-box}body{margin:0;overflow:hidden}button,input,textarea,select{font:inherit}button{cursor:pointer;border:1px solid var(--line);background:#1b2737;color:inherit;border-radius:8px;padding:10px 16px;min-height:40px;display:inline-flex;align-items:center;justify-content:center;gap:10px}button:hover{background:#26394e}button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:2px solid #79a6ff;outline-offset:2px}button:disabled{opacity:.45;cursor:default}button.primary{background:#3d70ef;border-color:#5a8aff}button.primary:hover{background:#4b81ff}button.danger{color:#ffbdc2}button svg,.nav svg{width:20px;height:20px;flex-shrink:0}input,textarea,select{border:1px solid var(--line);background:#101a28;color:inherit;border-radius:7px;padding:10px 12px}input[type=file]{max-width:100%}a{color:#8eb4ff}h1{font-size:30px;font-weight:600;letter-spacing:-.8px;margin:0 0 8px}h2{font-size:19px;font-weight:600;margin:0 0 12px}h3{font-size:15px;font-weight:600;margin:0 0 6px}p{line-height:1.6;color:var(--muted);margin:8px 0 16px}small{color:var(--muted)}.app{height:100vh;height:100dvh;display:grid;grid-template-columns:224px minmax(0,1fr);grid-template-rows:64px minmax(0,1fr) 38px}.topbar{grid-column:1/-1;display:flex;align-items:center;padding:0 22px;gap:16px;border-bottom:1px solid var(--line);background:linear-gradient(100deg,#172332,#101a28)}.brand{font-size:21px;font-weight:600;letter-spacing:-.5px;display:flex;align-items:center;gap:13px;white-space:nowrap}.brand svg{width:30px;height:30px;color:#608dff}.top-divider{height:28px;width:1px;background:var(--line);margin:0 7px}.connection{display:flex;align-items:center;gap:8px;font-size:13px;color:#c4d4e7}.dot{height:9px;width:9px;border-radius:50%;background:#dfb363}.dot.online{background:#38cd8a}.top-actions{margin-left:auto;display:flex;gap:10px}.top-actions button{min-height:36px;padding:7px 13px}.rail{background:linear-gradient(100deg,#17212f,#141c28);border-right:1px solid var(--line);display:flex;flex-direction:column;padding:16px 10px;gap:5px;overflow:auto}.nav{width:100%;text-align:left;justify-content:flex-start;border:none;background:transparent;border-radius:8px;padding:14px 14px;min-height:52px;gap:14px;font-size:14px;white-space:nowrap}.nav.active{background:#193c70;box-shadow:inset 2px 0 #60a0ff}.rail-credit{margin-top:auto;padding:22px 14px 4px;line-height:1.7;font-size:11px;color:#8dabc7}.main{overflow:hidden;position:relative;min-width:0;background:#0d1420}.view{height:100%;overflow:auto;padding:34px 38px}.desktop-view{height:100%;padding:14px;display:flex;flex-direction:column;gap:10px}.desktop-tools{display:flex;gap:8px;flex-wrap:wrap}.desktop-tools button{font-size:12px;padding:6px 10px;min-height:32px}.vnc{min-height:0;flex:1;border:1px solid #304158;border-radius:10px;overflow:hidden;background:#071b39;display:flex;align-items:center;justify-content:center;position:relative}.vnc>div{width:100%;height:100%}.vnc canvas{outline:none}.view-head{display:flex;align-items:flex-start;justify-content:space-between;gap:22px;margin-bottom:26px}.view-head p{margin:0}.row{display:flex;align-items:center;gap:12px}.wrap{flex-wrap:wrap}.toolbar{display:flex;gap:10px;align-items:center;margin:20px 0}.toolbar input[type=search]{flex:1;min-width:120px}.muted{color:var(--muted)}.separator{height:1px;background:var(--line);margin:24px 0}.storage-meter{height:7px;background:#243146;border-radius:6px;overflow:hidden;margin:10px 0}.storage-meter span{display:block;height:100%;background:#5a8fff}.file-table{width:100%;border-collapse:collapse;text-align:left}.file-table th{font-size:11px;text-transform:uppercase;letter-spacing:.7px;color:#93abc5;font-weight:600;background:#121d2a;padding:13px 12px;border-bottom:1px solid var(--line)}.file-table td{padding:14px 12px;border-bottom:1px solid #233043;font-size:13px}.file-table td:first-child{word-break:break-word}.file-table button{min-height:30px;padding:5px 10px;font-size:12px}.empty{padding:50px 22px;text-align:center;color:#97aec9;border-bottom:1px solid var(--line)}.store-item{display:grid;grid-template-columns:58px 1fr auto;gap:18px;align-items:center;padding:25px 0;border-bottom:1px solid var(--line)}.app-icon{width:50px;height:50px;background:#233d68;color:#d7e5ff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:600}.store-item p{margin:0;font-size:13px}.store-item button{min-width:108px}.drop-zone{border:1px dashed #425b7d;border-radius:10px;padding:28px;background:#121e2f;text-align:center;margin-bottom:28px}.drop-zone h2{margin-bottom:8px}.drop-zone p{max-width:580px;margin:0 auto 18px}.apps-list{display:flex;flex-direction:column;gap:0}.app-row{display:flex;align-items:center;gap:16px;padding:18px 0;border-bottom:1px solid var(--line)}.app-row .description{flex:1}.app-row p{margin:3px 0 0;font-size:12px}.app-row button{min-width:75px}.notice{background:#17283e;border:1px solid #2b4667;border-radius:8px;color:#bdd1ea;padding:14px 17px;line-height:1.6;font-size:13px;margin:16px 0}.note-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:20px 0 14px}.note-toolbar input{flex:1;min-width:100px}.editor{width:100%;min-height:240px;height:calc(100% - 176px);resize:none;display:block;background:#101923;font-family:Consolas,'Cascadia Code',monospace;font-size:14px;line-height:1.7;padding:20px;border-radius:8px}.settings-list{max-width:790px}.setting{padding:22px 0;border-bottom:1px solid var(--line);display:flex;align-items:flex-start;justify-content:space-between;gap:32px}.setting p{font-size:13px;margin:6px 0 0}.setting>div:first-child{max-width:530px}.setting .controls{display:flex;gap:8px;flex-wrap:wrap}.setting .controls button{white-space:nowrap}.calculator{max-width:370px;margin:24px auto}.calc-display{width:100%;font-size:32px;text-align:right;margin-bottom:16px;min-height:75px;font-variant-numeric:tabular-nums}.calc-keys{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.calc-keys button{height:57px;font-size:18px}.calc-keys .equals{background:#3f73ee}.footer{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 22px;font-size:11px;border-top:1px solid var(--line);background:#131e2c;color:#a3bad3}.footer strong{font-weight:500;color:#e1ecf9}.toast{position:fixed;bottom:55px;left:calc(50% + 90px);transform:translateX(-50%);max-width:min(650px,90vw);background:#243b59;border:1px solid #426087;border-radius:8px;padding:14px 20px;box-shadow:0 8px 30px #0005;font-size:13px;z-index:500;line-height:1.5}.toast.error{background:#4b2532;border-color:#814151}.loader{position:absolute;inset:0;background:#0c1727;display:grid;place-items:center;padding:30px;z-index:100}.loader-inner{width:min(530px,100%)}.loader-logo{width:68px;height:68px;color:#6a98ff;margin-bottom:28px}.loader h1{font-size:34px}.loader p{margin:10px 0 28px}.progress-head{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#d0dff1;margin-bottom:10px;gap:18px}.progress{width:100%;height:8px;border:0;border-radius:8px;overflow:hidden;appearance:none;background:#263549}.progress::-webkit-progress-bar{background:#263549}.progress::-webkit-progress-value{background:linear-gradient(90deg,#4b73ff,#74c0ff);transition:width .2s}.progress::-moz-progress-bar{background:#6295ff}.stage-list{display:flex;justify-content:space-between;font-size:11px;color:#7f98b6;margin-top:14px}.loader .loader-controls{margin-top:24px}.loader details{margin-top:24px;color:#8ca7c5;font-size:12px}.loader pre{max-height:150px;overflow:auto;white-space:pre-wrap;word-break:break-word}.modal-backdrop{position:absolute;inset:0;background:#030a13b8;display:grid;place-items:center;padding:24px;z-index:200}.modal{width:min(940px,100%);height:min(680px,100%);background:#172231;border:1px solid #38506d;border-radius:12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 90px #0006}.modal-head{padding:12px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);gap:14px}.modal-head h2{font-size:15px;margin:0}.modal-head button{min-height:30px;padding:4px 9px}.modal iframe{border:0;background:white;flex:1;width:100%}.modal .source{flex:1;width:100%;resize:none;border:0;border-radius:0;font:13px/1.7 Consolas,monospace;padding:22px}.modal .preview-note{padding:9px 18px;font-size:11px;color:#a5bbd6}.launch-page{min-height:100vh;display:grid;place-items:center;background:radial-gradient(ellipse at 80% 0,#183f75,transparent 65%),#0c1727;padding:26px}.launch-panel{max-width:440px;width:100%;padding:28px 14px}.launch-panel .brand{margin-bottom:28px}.launch-panel h1{font-size:38px;line-height:1.15}.launch-panel p{font-size:14px}.launch-panel .primary{width:100%;margin:16px 0;font-size:16px;height:52px}.launch-panel small{display:block;line-height:1.7}.launch-status{font-size:12px;color:#aac5e4;min-height:20px;margin-top:16px}.hidden{display:none!important}[hidden]{display:none!important}\n@media(max-width:1000px){.app{grid-template-columns:190px minmax(0,1fr)}.brand{font-size:18px}.rail{padding:12px 8px}.nav{font-size:12px;padding:12px;gap:10px;min-height:46px}.view{padding:26px 24px}.footer{font-size:10px;padding:0 14px}.topbar{padding:0 16px}.rail-credit{font-size:10px}.top-divider{margin:0}.connection{font-size:12px}.desktop-tools button{font-size:11px}.toast{left:55%}}\n@media(max-width:720px){.app{grid-template-columns:64px minmax(0,1fr);grid-template-rows:58px minmax(0,1fr) 44px}.brand{font-size:16px;gap:8px}.brand svg{width:24px}.top-divider,.connection-text,.rail-credit,.nav .nav-label{display:none}.topbar{padding:0 12px;gap:9px}.top-actions button{padding:6px 8px;font-size:11px;gap:5px}.top-actions button svg{width:15px}.rail{padding:12px 6px}.nav{padding:13px;justify-content:center}.nav svg{width:22px;height:22px}.view{padding:22px 18px}.view-head{display:block;margin-bottom:18px}.view-head button{margin-top:16px}h1{font-size:25px}.toolbar{flex-wrap:wrap}.file-table td,.file-table th{padding:12px 8px}.file-table .date-col{display:none}.store-item{grid-template-columns:42px 1fr;gap:12px}.store-item .app-icon{width:40px;height:40px}.store-item button{grid-column:2;justify-self:start}.app-row{gap:10px;flex-wrap:wrap}.app-row .app-icon{width:38px;height:38px}.app-row .description{min-width:150px}.setting{display:block}.setting .controls{margin-top:14px}.footer{padding:5px 12px;align-items:flex-start;flex-direction:column;gap:2px;font-size:9px}.desktop-view{padding:8px}.desktop-tools{gap:4px}.desktop-tools button{padding:5px 6px;font-size:10px;min-height:28px}.desktop-tools button svg{display:none}.toast{left:50%;bottom:54px}.modal-backdrop{padding:10px}.calc-keys button{height:48px}.editor{height:calc(100% - 190px)}}\n@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}\n.fs-exit{display:none;position:absolute;top:16px;right:16px;z-index:20;background:#152740df}.vnc:fullscreen{width:100vw;height:100vh;border:0;border-radius:0;background:#071b39}.vnc:fullscreen .fs-exit{display:flex}.vnc:fullscreen>div{width:100%;height:100%}\n.fs-apps,.fs-close{display:none;position:absolute;top:16px;left:16px;z-index:25;background:#152740ed}.fs-close{left:95px}.vnc:fullscreen .fs-apps,.vnc:fullscreen .fs-close:not(.hidden){display:flex}.fs-menu{position:absolute;top:63px;left:16px;width:225px;padding:8px;z-index:35;background:#142238f5;border:1px solid #36547a;border-radius:9px;box-shadow:0 15px 40px #0007}.fs-menu button{background:transparent;border:0;width:100%;justify-content:flex-start;font-size:13px;padding:10px 12px}.fs-menu button:hover{background:#254774}.vnc>#page.fullscreen-app{position:absolute;inset:64px 20px 20px;width:auto;height:auto;z-index:22;border:1px solid #375271;border-radius:10px;background:#0d1727;text-align:left}.vnc .modal-backdrop{z-index:40}.vnc:fullscreen .fs-close{z-index:26}\n";

  // app.mjs
  var esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var mime = (p) => /\.html?$/i.test(p) ? "text/html" : /\.css$/i.test(p) ? "text/css" : /\.m?js$/i.test(p) ? "text/javascript" : /\.svg$/i.test(p) ? "image/svg+xml" : /\.png$/i.test(p) ? "image/png" : /\.jpe?g$/i.test(p) ? "image/jpeg" : /\.json$/i.test(p) ? "application/json" : /\.woff2$/i.test(p) ? "font/woff2" : "application/octet-stream";
  var nav = [["desktop", "Desktop"], ["files", "S-Files"], ["launcher", "2pro's Launcher"], ["store", "2pro's App Store"], ["notepad", "Notepad"], ["tasks", "Task Manager"], ["calculator", "Calculator"], ["settings", "Settings"]];
  var catalog = [{ id: "discord", name: "Discord", symbol: "D", description: "A dedicated Discord web-app window, powered by native Chrome." }, { id: "youtube", name: "YouTube", symbol: "\u25B6", description: "YouTube in its own native Chrome app window." }, { id: "hyper", name: "Hyper Browser Lite", symbol: "H", description: "A separate lean Chromium profile with extensions, sync, and background networking disabled." }];
  function mountStyle(doc) {
    const style = doc.createElement("style");
    style.textContent = style_default;
    doc.head.append(style);
    const meta = doc.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width,initial-scale=1";
    doc.head.append(meta);
  }
  function button(label, id, ico = "", kind = "") {
    return `<button id="${id}" class="${kind}">${ico ? icon(ico) : ""}${label}</button>`;
  }
  var shellHTML = () => `<div class="app"><header class="topbar"><div class="brand">${icon("logo")}<span>Sandboxed VM</span></div><span class="top-divider"></span><span class="connection"><span id="connectionDot" class="dot"></span><span id="connection" class="connection-text">Connecting</span></span><div class="top-actions">${button("Fullscreen", "fullscreen", "fullscreen")}${button("Stop", "stop", "stop", "danger")}</div></header><nav class="rail" aria-label="Applications">${nav.map(([id, label]) => `<button class="nav${id === "desktop" ? " active" : ""}" data-view="${id}" title="${esc(label)}">${icon(id)}<span class="nav-label">${esc(label)}</span></button>`).join("")}<div class="rail-credit">Sandboxed VM ${VERSION}<br>Made by 2pro12342</div></nav><main class="main"><section id="desktopView" class="desktop-view"><div class="desktop-tools">${button("Firefox", "firefox", "browser")}${button("Chrome", "chrome", "browser")}${button("Roblox web", "roblox", "browser")}${button("Files", "native-files", "files")}${button("Terminal", "terminal", "terminal")}</div><div class="vnc" id="vm-display"><div id="vnc"></div><button id="exit-vm-fullscreen" class="fs-exit">Exit fullscreen \xB7 Esc</button></div></section><section id="page" class="view hidden"></section><div id="loader" class="loader"><div class="loader-inner"><div class="loader-logo">${icon("logo")}</div><h1 id="loaderTitle">Starting your desktop.</h1><p>Sandboxed VM \xB7 Made by 2pro12342</p><div class="progress-head"><span id="stage">Connecting to CodeHS</span><strong id="percent">0%</strong></div><progress id="progress" class="progress" max="100" value="0" aria-label="Setup progress"></progress><div class="stage-list"><span>Connect</span><span>Install</span><span>Restore</span><span>Ready</span></div><div id="loaderControls" class="loader-controls hidden">${button("Reconnect", "retry", "refresh", "primary")}${button("Open S-Files", "offline-files", "files")}</div><details><summary>Setup details</summary><pre id="logs"></pre></details></div></div></main><footer class="footer"><span><strong>2pro Support</strong> &nbsp;\xB7&nbsp; <span id="saveStatus">Opening saved files</span></span><span id="capacity">20 GB maximum, available space varies.</span></footer></div>`;
  async function startApp(win, files, { offline = false } = {}) {
    const doc = win.document;
    doc.title = "Sandboxed VM \u2014 2pro12342";
    mountStyle(doc);
    doc.body.innerHTML = shellHTML();
    const fsMenu = doc.createElement("nav");
    fsMenu.id = "fullscreen-app-menu";
    fsMenu.className = "fs-menu hidden";
    fsMenu.setAttribute("aria-label", "Fullscreen applications");
    fsMenu.innerHTML = nav.map(([id, label]) => `<button data-fs-view="${id}">${icon(id)}${esc(label)}</button>`).join("");
    doc.getElementById("vm-display").append(fsMenu);
    const fsToggle = doc.createElement("button");
    fsToggle.id = "fullscreen-apps";
    fsToggle.className = "fs-apps";
    fsToggle.textContent = "Apps";
    fsToggle.onclick = () => fsMenu.classList.toggle("hidden");
    doc.getElementById("vm-display").append(fsToggle);
    const fsClose = doc.createElement("button");
    fsClose.id = "fullscreen-close-app";
    fsClose.className = "fs-close hidden";
    fsClose.textContent = "Close app";
    doc.getElementById("vm-display").append(fsClose);
    const $ = (id) => doc.getElementById(id);
    let session = null, rfb = null, ready = false, current = "desktop", vault = null, syncing = null, syncTimer = null, taskTimer = null, toastTimer = null, maximum = 0, noteTimer = null, noteDirty = false, notePath = "Notes/Untitled.txt", logs = [];
    let connectedRfb = false, reconnectTimer = null, lastSyncError = null, wantedRunning = !offline, runRetryTimer = null, retryAttempt = 0, connectionEpoch = 0, heartbeatTimer = null, displayAttempts = 0;
    const setStatus = (text, online = false) => {
      $("connection").textContent = text;
      $("connectionDot").classList.toggle("online", online);
    };
    const notice = (message, error = false) => {
      doc.querySelector(".toast")?.remove();
      const t = doc.createElement("div");
      t.className = "toast" + (error ? " error" : "");
      t.textContent = message;
      t.setAttribute("role", "status");
      doc.body.append(t);
      win.clearTimeout(toastTimer);
      toastTimer = win.setTimeout(() => t.remove(), 7500);
    };
    const log = (message) => {
      logs.push(typeof message === "string" ? message : JSON.stringify(message));
      logs = logs.slice(-65);
      $("logs").textContent = logs.join("\n");
    };
    const progress = (value, label) => {
      maximum = Math.max(maximum, Math.min(100, value));
      $("progress").value = maximum;
      $("percent").textContent = maximum + "%";
      $("stage").textContent = label;
    };
    function fail(error) {
      log(error.message || error);
      ready = false;
      setStatus("Reconnecting");
      $("stage").textContent = error.message || String(error);
      $("loaderControls").classList.remove("hidden");
      $("loader").classList.remove("hidden");
      if (wantedRunning && vault) {
        win.clearTimeout(runRetryTimer);
        const delay = Math.min(3e4, 1500 * 2 ** retryAttempt++);
        $("loaderTitle").textContent = "Reconnecting your desktop.";
        runRetryTimer = win.setTimeout(() => connect(false), delay);
      }
    }
    function requireReady() {
      if (!ready) throw Error("Start or reconnect the Linux desktop first. Your S-Files remain available.");
    }
    async function updateCapacity() {
      if (!vault) return;
      const cap = await vault.capacity();
      $("capacity").textContent = bytes(vault.total) + " saved \xB7 " + bytes(Math.min(LIMIT, cap.quota)) + " available limit";
    }
    function markSaved(message = "Saved on this device") {
      $("saveStatus").textContent = message;
    }
    async function openNative(app) {
      requireReady();
      await session.request("launch", { app });
      await showView("desktop");
    }
    async function uploadRemote(path) {
      const file = await vault.file(path);
      await session.request("begin", { path });
      for (let offset = 0; offset < file.size; offset += 65536) {
        const data = new Uint8Array(await file.slice(offset, offset + 65536).arrayBuffer());
        let s = "";
        for (const c of data) s += String.fromCharCode(c);
        await session.request("write", { path, offset, data: btoa(s) });
      }
      const stat = await session.request("commit", { path });
      vault.manifest.files[path] = { ...vault.manifest.files[path], remoteStamp: stat.stamp, needsUpload: false };
    }
    async function restoreFiles() {
      const paths2 = Object.keys(vault.manifest.files);
      let done = 0;
      for (const path of paths2) {
        progress(88 + Math.round(done / Math.max(1, paths2.length) * 8), "Restoring S-Files: " + path);
        await uploadRemote(path);
        done++;
      }
      await vault.serial(() => vault.save());
      progress(96, "Connecting the desktop display");
    }
    async function syncNative() {
      if (!ready || !session?.open) return;
      if (syncing) return syncing;
      syncing = (async () => {
        lastSyncError = null;
        markSaved("Syncing with Linux\u2026");
        for (const [path, meta] of Object.entries(vault.manifest.files)) {
          if (meta.needsUpload) await uploadRemote(path);
        }
        const remote = await session.request("list");
        for (const f of remote) {
          if (f.size > LIMIT) {
            notice("An S-File exceeds the 20 GB limit: " + f.path, true);
            continue;
          }
          const local = vault.manifest.files[f.path];
          if (local?.remoteStamp === f.stamp) continue;
          const stamp = f.stamp;
          await vault.receive(f.path, f.size, async (offset, length) => {
            const reply = await session.request("read", { path: f.path, offset, length });
            if (reply.stamp !== stamp || reply.size !== f.size) throw Error("File changed while syncing; it will retry: " + f.path);
            return Uint8Array.from(atob(reply.data), (c) => c.charCodeAt(0));
          }, { remoteStamp: stamp, needsUpload: false });
        }
        await vault.serial(() => vault.save());
        markSaved("Saved on this device \xB7 " + (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        await updateCapacity();
      })().catch((error) => {
        lastSyncError = error;
        markSaved("Sync needs attention");
        log(error.message);
      }).finally(() => {
        syncing = null;
      });
      return syncing;
    }
    async function loadRFB() {
      if (win.RFB) return;
      await new Promise((resolve, reject) => {
        const s = doc.createElement("script");
        s.src = "https://static1.codehs.com/lib/noVNC/noVNC.js";
        s.onload = resolve;
        s.onerror = () => reject(Error("The CodeHS desktop viewer could not load"));
        doc.head.append(s);
      });
      if (!win.RFB) throw Error("The desktop viewer is unavailable");
    }
    function applyQuality() {
      if (!rfb) return;
      const low = vault.manifest.settings.quality === "fast";
      rfb.qualityLevel = low ? 3 : 6;
      rfb.compressionLevel = low ? 8 : 5;
      rfb.scaleViewport = true;
      rfb.resizeSession = false;
      rfb.clipViewport = false;
      rfb.focusOnClick = true;
    }
    async function connectRFB() {
      await loadRFB();
      rfb?.disconnect();
      $("vnc").replaceChildren();
      rfb = new win.RFB($("vnc"), "wss://scalinghub.codehs.com/user/" + session.uid + "/graphics", {});
      applyQuality();
      rfb.addEventListener("connect", () => {
        connectedRfb = true;
        displayAttempts = 0;
        if (ready) {
          $("loader").classList.add("hidden");
          setStatus("Connected", true);
          progress(100, "Ready");
        }
        resizeDesktop();
      });
      rfb.addEventListener("disconnect", () => {
        connectedRfb = false;
        if (ready && wantedRunning && session?.open) {
          setStatus("Display reconnecting");
          win.clearTimeout(reconnectTimer);
          if (++displayAttempts >= 3) fail(Error("Restoring the CodeHS display connection"));
          else reconnectTimer = win.setTimeout(() => connectRFB().catch(fail), 1800);
        }
      });
    }
    async function onEvent(event, data) {
      if (!wantedRunning && event !== "log") return;
      if (event === "stage") progress(data.percent, data.label);
      else if (event === "ready") {
        try {
          await restoreFiles();
          await connectRFB();
          ready = true;
          retryAttempt = 0;
          setStatus("Connecting display");
          if (connectedRfb) {
            $("loader").classList.add("hidden");
            setStatus("Connected", true);
            progress(100, "Ready");
          }
          resizeDesktop();
          win.clearInterval(syncTimer);
          syncTimer = win.setInterval(syncNative, 2500);
          win.clearInterval(heartbeatTimer);
          heartbeatTimer = win.setInterval(() => {
            if (ready) session.request("status", {}, 18e3).catch((e) => fail(e));
          }, 12e3);
          await syncNative();
        } catch (error) {
          fail(error);
        }
      } else if (event === "error") fail(Error(data.message));
      else if (event === "view") await showView(data.view);
      else if (event === "disconnected") {
        ready = false;
        markSaved("Local copy retained");
        fail(Error("Connection interrupted. Restoring your saved desktop\u2026"));
      } else if (event === "log") log(data.text || data);
    }
    async function connect(manual = true) {
      if (!vault) return;
      wantedRunning = true;
      if (manual) retryAttempt = 0;
      const epoch = ++connectionEpoch;
      win.clearTimeout(runRetryTimer);
      win.clearInterval(syncTimer);
      win.clearInterval(heartbeatTimer);
      ready = false;
      maximum = 0;
      connectedRfb = false;
      $("loader").classList.remove("hidden");
      $("loaderControls").classList.add("hidden");
      setStatus("Connecting");
      $("stop").innerHTML = icon("stop") + "Stop";
      try {
        if (session) await session.stop();
        rfb?.disconnect();
        session = new CodeHSSession(win, vault.manifest.uid, files, (event, data) => {
          if (epoch === connectionEpoch) onEvent(event, data).catch((e) => fail(e));
        });
        await session.connect();
        if (epoch !== connectionEpoch) await session.stop();
      } catch (error) {
        if (epoch === connectionEpoch && wantedRunning) fail(error);
      }
    }
    async function stop() {
      if (!wantedRunning) {
        await connect();
        return;
      }
      $("stop").disabled = true;
      markSaved("Saving before stopping\u2026");
      try {
        await saveNote();
        await syncNative();
        if (ready && lastSyncError) throw Error("Stop canceled because a file did not finish syncing: " + lastSyncError.message);
        wantedRunning = false;
        connectionEpoch++;
        ready = false;
        win.clearInterval(syncTimer);
        win.clearInterval(taskTimer);
        win.clearInterval(heartbeatTimer);
        win.clearTimeout(reconnectTimer);
        win.clearTimeout(runRetryTimer);
        rfb?.disconnect();
        await session?.stop();
        $("loader").classList.add("hidden");
        setStatus("Stopped");
        markSaved("Saved on this device");
        $("stop").innerHTML = icon("play") + "Run";
        await showView("settings");
        notice("Desktop stopped. S-Files and installed apps are saved on this device.");
      } catch (error) {
        notice(error.message, true);
      } finally {
        $("stop").disabled = false;
      }
    }
    function resizeDesktop() {
      if (!session?.open || !ready || current !== "desktop") return;
      const r = $("vnc").getBoundingClientRect();
      const fast = vault.manifest.settings.quality === "fast";
      const maxW = fast ? 1280 : 1600, maxH = fast ? 720 : 1e3;
      const w = Math.max(640, Math.min(maxW, Math.round(r.width))), h = Math.max(360, Math.min(maxH, Math.round(r.height)));
      session.resize(w, h);
      session.request("resize", { width: w, height: h }).catch((e) => log(e.message));
    }
    async function showView(view) {
      if (current === "notepad" && view !== "notepad") await saveNote();
      current = view;
      doc.querySelectorAll("[data-view]").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
      placePage();
      win.clearInterval(taskTimer);
      if (view === "desktop") {
        resizeDesktop();
        return;
      }
      const render = { files: renderFiles, launcher: renderLauncher, store: renderStore, notepad: renderNotepad, tasks: renderTasks, calculator: renderCalculator, settings: renderSettings }[view];
      if (render) await render();
    }
    function placePage() {
      const fullscreen = doc.fullscreenElement === $("vm-display");
      $("desktopView").classList.toggle("hidden", current !== "desktop" && !fullscreen);
      $("page").classList.toggle("hidden", current === "desktop");
      $("page").classList.toggle("fullscreen-app", fullscreen);
      const parent = fullscreen ? $("vm-display") : doc.querySelector(".main");
      if ($("page").parentElement !== parent) parent.append($("page"));
      $("fullscreen-close-app").classList.toggle("hidden", !fullscreen || current === "desktop");
      $("fullscreen-app-menu").classList.add("hidden");
    }
    const heading = (title, description, actions = "") => `<div class="view-head"><div><h1>${esc(title)}</h1><p>${esc(description)}</p></div>${actions}</div>`;
    async function renderFiles() {
      $("page").innerHTML = heading("S-Files", "Your saved files, available after reconnecting or restarting.", button("Upload files", "upload-files", "upload")) + `<div class="row wrap"><span>${bytes(vault.total)} of a 20 GB maximum</span><small>Actual capacity depends on your device.</small></div><div class="storage-meter"><span style="width:${Math.min(100, vault.total / LIMIT * 100)}%"></span></div><div class="toolbar"><input id="fileSearch" type="search" aria-label="Search S-Files" placeholder="Search saved files">${button("Sync now", "sync-files", "refresh")}${button("Open Linux files", "linux-files", "files")}</div><div id="fileList"></div><input id="fileInput" class="hidden" type="file" multiple>`;
      const draw = () => {
        const q = $("fileSearch").value.toLowerCase();
        const entries = Object.entries(vault.manifest.files).filter(([path]) => path.toLowerCase().includes(q)).sort(([a], [b]) => a.localeCompare(b));
        $("fileList").innerHTML = entries.length ? `<table class="file-table"><thead><tr><th>Name</th><th>Size</th><th class="date-col">Saved</th><th>Actions</th></tr></thead><tbody>${entries.map(([path, f]) => `<tr><td>${esc(path)}</td><td>${bytes(f.size)}</td><td class="date-col">${new Date(f.mtime).toLocaleDateString()}</td><td><div class="row wrap"><button data-file="${esc(path)}" data-action="view">View</button><button data-file="${esc(path)}" data-action="download">Download</button><button data-file="${esc(path)}" data-action="trash">Trash</button></div></td></tr>`).join("")}</tbody></table>` : '<div class="empty">No files here yet. Upload a file or save a note to S-Files.</div>';
      };
      draw();
      $("fileSearch").oninput = draw;
      $("upload-files").onclick = () => $("fileInput").click();
      $("fileInput").onchange = async (e) => {
        try {
          for (const f of e.target.files) {
            await vault.put(cleanPath(f.webkitRelativePath || f.name), f, { needsUpload: true });
          }
          await syncNative();
          await updateCapacity();
          draw();
          notice("Files saved to S-Files.");
        } catch (error) {
          notice(error.message, true);
        }
      };
      $("sync-files").onclick = async () => {
        await syncNative();
        draw();
      };
      $("linux-files").onclick = () => openNative("files").catch((e) => notice(e.message, true));
      $("fileList").onclick = async (e) => {
        const b = e.target.closest("button[data-file]");
        if (!b) return;
        try {
          const path = b.dataset.file;
          if (b.dataset.action === "view") await viewFile(path);
          if (b.dataset.action === "download") await download(path);
          if (b.dataset.action === "trash") {
            await vault.remove(path);
            if (ready) await session.request("trash", { path });
            draw();
            await updateCapacity();
            notice("Moved to local recovery storage.");
          }
        } catch (error) {
          notice(error.message, true);
        }
      };
    }
    async function download(path) {
      if (vault.native) {
        await vault.native.call({ op: "export", path: "S-Files/" + path });
        return;
      }
      const file = await vault.file(path);
      const url = win.URL.createObjectURL(file);
      const a = doc.createElement("a");
      a.href = url;
      a.download = path.split("/").pop();
      a.click();
      win.setTimeout(() => win.URL.revokeObjectURL(url), 6e4);
    }
    function modal(title) {
      doc.querySelector(".modal-backdrop")?.remove();
      const back = doc.createElement("div");
      back.className = "modal-backdrop";
      back.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><header class="modal-head"><h2>${esc(title)}</h2>${button("Close", "close-modal", "close")}</header><div class="preview-note">HTML apps run in an isolated web frame and cannot access S-Files directly.</div></section>`;
      $("page").parentElement.append(back);
      const m = back.querySelector(".modal");
      back.querySelector("#close-modal").onclick = () => back.remove();
      return m;
    }
    async function viewFile(path) {
      const file = await vault.file(path);
      if (file.size > 4e6) {
        notice("This file is too large for the text viewer. Download it or open Linux Files.");
        return;
      }
      const m = modal(path);
      const text = doc.createElement("textarea");
      text.className = "source";
      text.readOnly = true;
      text.value = await file.text();
      m.append(text);
      if (/\.(html?|htwa)$/i.test(path)) {
        const run = doc.createElement("button");
        run.textContent = "Run HTML";
        run.onclick = () => runHTML(path);
        m.querySelector("header").insertBefore(run, m.querySelector("header button"));
      }
      if (/\.(txt|md|json|css|js|html?|htwa)$/i.test(path)) {
        const edit = doc.createElement("button");
        edit.textContent = "Edit in Notepad";
        edit.onclick = async () => {
          m.parentElement.remove();
          notePath = path;
          await showView("notepad");
        };
        m.querySelector("header").insertBefore(edit, m.querySelector("header button"));
      }
    }
    async function renderLauncher() {
      $("page").innerHTML = heading("2pro's Launcher", "Install a web app, inspect an APK, or run your HTML files.") + `<div class="drop-zone" id="dropZone"><h2>Bring your own apps.</h2><p>SWBN packages, HTWA and HTML web apps run here. APK files can be imported and inspected; this CodeHS session has no Android runtime.</p>${button("Choose app files", "choose-app", "upload", "primary")}<input type="file" id="appInput" class="hidden" accept=".swbn,.htwa,.html,.htm,.apk" multiple><small>SWBN/1: ZIP package with manifest.json and an HTML entry. Maximum package import: 50 MB compressed, 150 MB expanded.</small></div><h2>Installed apps</h2><div class="apps-list" id="installedApps"></div>`;
      drawInstalled();
      $("choose-app").onclick = () => $("appInput").click();
      $("appInput").onchange = (e) => importApps(e.target.files);
      $("dropZone").ondragover = (e) => {
        e.preventDefault();
      };
      $("dropZone").ondrop = (e) => {
        e.preventDefault();
        importApps(e.dataTransfer.files);
      };
    }
    function drawInstalled() {
      const apps = vault.manifest.apps;
      $("installedApps").innerHTML = apps.length ? apps.map((a) => `<div class="app-row"><span class="app-icon">${esc(a.kind === "apk" ? "A" : a.name[0])}</span><div class="description"><h3>${esc(a.name)}</h3><p>${esc(a.kind === "apk" ? "APK imported \xB7 Android runtime unavailable" : a.kind === "store" ? "Installed web app" : a.kind.toUpperCase() + " \xB7 " + a.version)}</p></div><button data-run="${esc(a.id)}">${a.kind === "apk" ? "Inspect" : "Run"}</button><button data-uninstall="${esc(a.id)}">Uninstall</button></div>`).join("") : '<div class="empty">Install an app here or visit 2pro\u2019s App Store.</div>';
      $("installedApps").onclick = async (e) => {
        const run = e.target.closest("[data-run]"), remove = e.target.closest("[data-uninstall]");
        try {
          if (run) await runApp(run.dataset.run);
          if (remove) {
            vault.manifest.apps = vault.manifest.apps.filter((a) => a.id !== remove.dataset.uninstall);
            await vault.serial(() => vault.save());
            drawInstalled();
            notice("App uninstalled. Its S-Files remain saved.");
          }
        } catch (error) {
          notice(error.message, true);
        }
      };
    }
    async function importApps(fileList) {
      for (const file of fileList) {
        try {
          await importApp(file);
          notice(file.name + " installed.");
        } catch (error) {
          notice(file.name + ": " + error.message, true);
        }
      }
      if (current === "launcher") drawInstalled();
      await updateCapacity();
      await syncNative();
    }
    async function importApp(file) {
      if (file.size > 5e7) throw Error("App packages must be 50 MB or smaller. General S-Files uploads support larger files.");
      const extension = file.name.split(".").pop().toLowerCase();
      if (!["swbn", "htwa", "html", "htm", "apk"].includes(extension)) throw Error("Unsupported app type");
      const id = "app-" + win.crypto.randomUUID();
      const base = "Apps/" + id;
      let app;
      if (extension === "swbn") {
        let expanded = 0, count = 0;
        const files2 = unzipSync(new Uint8Array(await file.arrayBuffer()), { filter: (info) => {
          if (info.name.endsWith("/")) return false;
          cleanPath(info.name);
          expanded += info.originalSize;
          count++;
          if (expanded > 15e7 || count > 2e3) throw Error("Package exceeds its expanded size or file count limit");
          return true;
        } });
        if (!files2["manifest.json"]) throw Error("SWBN is missing manifest.json");
        const manifest = validateManifest(JSON.parse(strFromU8(files2["manifest.json"])), new Set(Object.keys(files2)));
        const cap = await vault.capacity();
        if (vault.total + expanded > cap.quota) throw Error("Not enough S-Files storage for this app");
        const written = [];
        try {
          for (const [path, data] of Object.entries(files2)) {
            await vault.put(base + "/" + path, new File([data], path), { needsUpload: true });
            written.push(base + "/" + path);
          }
        } catch (error) {
          for (const path of written) await vault.remove(path);
          throw error;
        }
        app = { id, kind: "swbn", name: manifest.name, version: manifest.version, entry: base + "/" + manifest.entry, base, paths: Object.keys(files2) };
      } else {
        const path = base + "/" + cleanPath(file.name);
        await vault.put(path, file, { needsUpload: true });
        if (extension === "apk") {
          const files2 = unzipSync(new Uint8Array(await file.arrayBuffer()), { filter: (i2) => {
            if (i2.name === "AndroidManifest.xml" && i2.originalSize > 5e6) throw Error("APK manifest is too large");
            return i2.name === "AndroidManifest.xml";
          } });
          if (!files2["AndroidManifest.xml"]) {
            await vault.remove(path);
            throw Error("Not a valid APK: AndroidManifest.xml is missing");
          }
        }
        app = { id, kind: extension === "apk" ? "apk" : extension === "htwa" ? "htwa" : "html", name: file.name.replace(/\.[^.]+$/, ""), version: "1.0.0", entry: path, base, paths: [file.name] };
      }
      vault.manifest.apps.push(app);
      await vault.serial(() => vault.save());
    }
    async function runApp(id) {
      const app = vault.manifest.apps.find((a) => a.id === id);
      if (!app) throw Error("App is not installed");
      if (app.kind === "store") return openNative(app.id);
      if (app.kind === "apk") {
        const message = ready ? (await session.request("apk", { path: app.entry })).message : "APK saved. An Android runtime is not available in this CodeHS desktop. It cannot execute Android apps.";
        notice(message);
        return;
      }
      await runHTML(app.entry, app);
    }
    async function runHTML(path, app = null) {
      const f = await vault.file(path);
      if (f.size > 8e6) throw Error("HTML entry is too large to run");
      const source = await f.text(), m = modal(app?.name || path), urls = [];
      const resolvePath = (from, relative) => {
        if (!relative || /^(?:[a-z]+:|\/\/|#)/i.test(relative)) return null;
        const parts = from.split("/");
        parts.pop();
        for (const p of relative.split(/[?#]/)[0].split("/")) {
          if (p === "..") parts.pop();
          else if (p && p !== ".") parts.push(p);
        }
        const result = cleanPath(parts.join("/"));
        if (app && !result.startsWith(app.base + "/")) throw Error("An app resource is outside its package");
        return result;
      };
      const map = /* @__PURE__ */ new Map();
      if (app) {
        for (const name of app.paths) {
          if (/\.html?$/i.test(name)) continue;
          const resource = app.base + "/" + name;
          const file = await vault.file(resource);
          const url = win.URL.createObjectURL(new Blob([await file.arrayBuffer()], { type: mime(name) }));
          map.set(resource, url);
          urls.push(url);
        }
        for (const name of app.paths.filter((n) => /\.css$/i.test(n))) {
          const resource = app.base + "/" + name;
          const raw = await (await vault.file(resource)).text();
          const updated = raw.replace(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g, (all, relative) => {
            const p = resolvePath(resource, relative);
            return p && map.has(p) ? 'url("' + map.get(p) + '")' : all;
          });
          const url = win.URL.createObjectURL(new Blob([updated], { type: "text/css" }));
          urls.push(url);
          map.set(resource, url);
        }
      }
      const parsed = new win.DOMParser().parseFromString(source, "text/html");
      parsed.querySelectorAll("[src],[href]").forEach((el) => {
        for (const attribute of ["src", "href"]) {
          const value = el.getAttribute(attribute);
          if (!value) continue;
          const p = resolvePath(path, value);
          if (p && map.has(p)) el.setAttribute(attribute, map.get(p));
        }
      });
      const csp = parsed.createElement("meta");
      csp.httpEquiv = "Content-Security-Policy";
      csp.content = "default-src 'none'; script-src 'unsafe-inline' blob: https:; style-src 'unsafe-inline' blob: https:; img-src data: blob: https:; media-src data: blob: https:; font-src data: blob: https:; connect-src https:; frame-src https: blob:; form-action https:; base-uri 'none'";
      parsed.head.prepend(csp);
      const frame = doc.createElement("iframe");
      frame.title = app?.name || path;
      frame.setAttribute("sandbox", "allow-scripts allow-forms allow-downloads");
      frame.setAttribute("referrerpolicy", "no-referrer");
      frame.srcdoc = "<!doctype html>" + parsed.documentElement.outerHTML;
      m.append(frame);
      const close = m.querySelector("#close-modal");
      close.onclick = () => {
        m.parentElement.remove();
        for (const u of urls) win.URL.revokeObjectURL(u);
      };
    }
    async function renderStore() {
      $("page").innerHTML = heading("2pro's App Store", "Three apps for your desktop. Installation choices are saved by 2pro Support.") + catalog.map((app) => `<div class="store-item"><div class="app-icon">${esc(app.symbol)}</div><div><h2>${app.name}</h2><p>${app.description}</p></div><button data-store="${app.id}" class="${vault.manifest.apps.some((a) => a.id === app.id) ? "" : "primary"}">${vault.manifest.apps.some((a) => a.id === app.id) ? "Open" : "Install"}</button></div>`).join("") + '<p style="margin-top:24px">Discord and YouTube are web apps. Their services may require sign-in. Hyper Browser Lite shares the native Chrome engine and uses its own profile.</p>';
      $("page").onclick = async (e) => {
        const b = e.target.closest("[data-store]");
        if (!b) return;
        try {
          const id = b.dataset.store;
          if (vault.manifest.apps.some((a) => a.id === id)) await openNative(id);
          else {
            const app = catalog.find((a) => a.id === id);
            vault.manifest.apps.push({ id, name: app.name, kind: "store", version: "1.0.0" });
            await vault.serial(() => vault.save());
            await renderStore();
            notice(app.name + " installed.");
          }
        } catch (error) {
          notice(error.message, true);
        }
      };
    }
    async function renderNotepad() {
      let text = "";
      if (vault.manifest.files[notePath]) {
        const f = await vault.file(notePath);
        if (f.size > 4e6) throw Error("Notepad supports files up to 4 MB");
        text = await f.text();
      }
      noteDirty = false;
      $("page").innerHTML = heading("Notepad", "Write a note. Your text saves automatically to S-Files.") + `<div class="note-toolbar"><input id="notePath" aria-label="Note path" value="${esc(notePath)}">${button("Save", "save-note", "notepad", "primary")}${button("New", "new-note")}</div><textarea id="noteText" class="editor" aria-label="Note text" spellcheck="false" placeholder="Start writing\u2026"></textarea><small id="noteStatus">Saved locally</small>`;
      $("noteText").value = text;
      $("noteText").oninput = () => {
        noteDirty = true;
        $("noteStatus").textContent = "Saving\u2026";
        win.clearTimeout(noteTimer);
        noteTimer = win.setTimeout(() => saveNote().catch((e) => notice(e.message, true)), 600);
      };
      $("save-note").onclick = () => saveNote(true).then(() => notice("Note saved.")).catch((e) => notice(e.message, true));
      $("new-note").onclick = async () => {
        await saveNote();
        notePath = "Notes/Note-" + Date.now() + ".txt";
        await renderNotepad();
      };
    }
    async function saveNote(force = false) {
      if (!vault || !$("noteText") || !noteDirty && !force) return;
      win.clearTimeout(noteTimer);
      const path = cleanPath($("notePath").value), text = $("noteText").value;
      await vault.put(path, new File([text], path), { needsUpload: true });
      notePath = path;
      noteDirty = !!$("noteText") && $("noteText").value !== text;
      if ($("noteStatus")) $("noteStatus").textContent = noteDirty ? "Saving\u2026" : "Saved locally";
      markSaved();
      await updateCapacity();
    }
    async function renderTasks() {
      $("page").innerHTML = heading("Task Manager", "Apps started by Sandboxed VM. Memory shows each main process.") + `<div id="taskList" class="empty">${ready ? "Reading Linux processes\u2026" : "Connect the desktop to view native processes."}</div>`;
      const refresh = async () => {
        if (!ready || current !== "tasks") return;
        try {
          const result = await session.request("tasks");
          if (current !== "tasks") return;
          $("taskList").className = "";
          $("taskList").innerHTML = `<table class="file-table"><thead><tr><th>App</th><th>PID</th><th>Main process RAM</th><th>Action</th></tr></thead><tbody>${result.processes.map((p) => `<tr><td>${esc(p.name)}</td><td>${p.pid}</td><td>${bytes(p.memory)}</td><td>${p.canEnd ? `<button data-end="${p.pid}">End task</button>` : "System"}</td></tr>`).join("")}</tbody></table>`;
        } catch (error) {
          log(error.message);
        }
      };
      await refresh();
      taskTimer = win.setInterval(refresh, 2500);
      $("taskList").onclick = async (e) => {
        const b = e.target.closest("[data-end]");
        if (b) {
          try {
            await session.request("terminate", { pid: Number(b.dataset.end) });
            await refresh();
          } catch (error) {
            notice(error.message, true);
          }
        }
      };
    }
    async function renderCalculator() {
      $("page").innerHTML = heading("Calculator", "Fast, local arithmetic. No Linux connection needed.") + `<div class="calculator"><input id="calcDisplay" class="calc-display" aria-label="Calculator expression" placeholder="0" autocomplete="off"><div class="calc-keys">${["C", "(", ")", "\u232B", "7", "8", "9", "\xF7", "4", "5", "6", "\xD7", "1", "2", "3", "\u2212", "0", ".", "=", "+"].map((k) => `<button data-key="${k}" class="${k === "=" ? "equals" : ""}">${k}</button>`).join("")}</div></div>`;
      const solve = () => {
        try {
          $("calcDisplay").value = String(calculate($("calcDisplay").value.replaceAll("\u2212", "-")));
        } catch (error) {
          notice(error.message, true);
        }
      };
      $("calcDisplay").onkeydown = (e) => {
        if (e.key === "Enter") solve();
      };
      $("page").onclick = (e) => {
        const b = e.target.closest("[data-key]");
        if (!b) return;
        const k = b.dataset.key;
        if (k === "=") solve();
        else if (k === "C") $("calcDisplay").value = "";
        else if (k === "\u232B") $("calcDisplay").value = $("calcDisplay").value.slice(0, -1);
        else $("calcDisplay").value += k === "\u2212" ? "-" : k;
      };
    }
    async function renderSettings() {
      const cap = await vault.capacity();
      const persistent = vault.native ? true : await win.navigator.storage.persisted?.();
      $("page").innerHTML = heading("Settings", "Desktop performance, version, and saved data.") + `<div class="settings-list"><div class="setting"><div><h2>Performance</h2><p>Fast mode limits the desktop to 1280 \xD7 720 and lowers image quality. Balanced mode uses up to 1600 \xD7 1000. Both scale smoothly to your window.</p></div><div class="controls"><select id="quality" aria-label="Desktop performance"><option value="balanced">Balanced</option><option value="fast">Fast</option></select></div></div><div class="setting"><div><h2>Version</h2><p>Sandboxed VM ${VERSION}<br>Made by 2pro12342<br>Real Linux desktop \xB7 JWM \xB7 Firefox \xB7 Chrome</p></div></div><div class="setting"><div><h2>2pro Support</h2><p>Enabled. S-Files and app-install records save ${vault.native ? "in this Windows app\u2019s data folder" : "in this browser on this device"}. Saved files restore when CodeHS starts a new session. Maximum 20 GB; actual available limit: ${bytes(cap.quota)}.</p><p>Storage protection: ${persistent ? "persistent" : "best effort"}. Browser data clearing, uninstalling the app, or disk loss can remove local saves. This is local storage, not cloud storage.</p></div><div class="controls">${button("Sync now", "settings-sync", "refresh")}${vault.native ? "" : button("Protect local saves", "protect-storage")}${button("Reconnect", "settings-reconnect", "play")}</div></div><div class="setting"><div><h2>Files and installed apps</h2><p>${Object.keys(vault.manifest.files).length} files \xB7 ${vault.manifest.apps.length} installed apps \xB7 ${bytes(vault.total)} saved. Use Download in S-Files for an extra copy. Native changes sync every few seconds while connected; use Stop to flush saved work before closing.</p></div></div><div class="setting"><div><h2>Compatibility</h2><p>SWBN/1, HTWA, and HTML apps run in isolated web frames. APKs can be imported and inspected; this CodeHS session has no Android runtime. Roblox opens its website. Chrome uses the internal sandbox exception you approved.</p></div></div></div>`;
      $("quality").value = vault.manifest.settings.quality;
      $("quality").onchange = async (e) => {
        vault.manifest.settings.quality = e.target.value;
        await vault.serial(() => vault.save());
        applyQuality();
        resizeDesktop();
        notice("Performance setting saved.");
      };
      $("settings-sync").onclick = () => syncNative();
      $("settings-reconnect").onclick = connect;
      if ($("protect-storage")) $("protect-storage").onclick = async () => {
        const granted = await win.navigator.storage.persist();
        notice(granted ? "Local saves are protected from automatic storage eviction." : "The browser did not grant persistent storage. Keep an extra download of important files.");
        await renderSettings();
      };
    }
    doc.querySelectorAll("[data-view]").forEach((b) => b.onclick = () => showView(b.dataset.view).catch((e) => notice(e.message, true)));
    for (const app of ["firefox", "chrome", "roblox", "terminal"]) $(app).onclick = () => openNative(app).catch((e) => notice(e.message, true));
    $("native-files").onclick = () => openNative("files").catch((e) => notice(e.message, true));
    $("fullscreen").onclick = async () => {
      try {
        if (doc.fullscreenElement) await doc.exitFullscreen();
        else {
          await showView("desktop");
          await $("vm-display").requestFullscreen();
        }
      } catch (error) {
        notice("Fullscreen needs a direct click on the Fullscreen button.");
      }
    };
    $("exit-vm-fullscreen").onclick = () => doc.exitFullscreen();
    $("stop").onclick = stop;
    $("retry").onclick = () => connect();
    $("offline-files").onclick = async () => {
      $("loader").classList.add("hidden");
      await showView("files");
    };
    let resizeTimer;
    win.addEventListener("resize", () => {
      win.clearTimeout(resizeTimer);
      resizeTimer = win.setTimeout(resizeDesktop, 300);
    });
    doc.addEventListener("fullscreenchange", () => {
      placePage();
      win.requestAnimationFrame(() => {
        if (rfb) {
          rfb.scaleViewport = false;
          rfb.scaleViewport = true;
        }
        resizeDesktop();
      });
    });
    fsMenu.onclick = (e) => {
      const b = e.target.closest("[data-fs-view]");
      if (b) showView(b.dataset.fsView).catch((error) => notice(error.message, true));
    };
    fsClose.onclick = () => showView("desktop").catch((error) => notice(error.message, true));
    win.addEventListener("beforeunload", (e) => {
      if (noteDirty || syncing) {
        e.preventDefault();
        e.returnValue = "Saving work. Use Stop before closing.";
      }
    });
    win.addEventListener("pagehide", () => {
      win.clearInterval(taskTimer);
      win.clearInterval(syncTimer);
    });
    try {
      vault = await new Vault(win).init();
      markSaved();
      await updateCapacity();
      if (offline) {
        $("loader").classList.add("hidden");
        setStatus("Offline");
        $("stop").innerHTML = icon("play") + "Run";
        await showView("files");
      } else await connect();
    } catch (error) {
      fail(error);
    }
  }
  function launchController(files) {
    const doc = document;
    mountStyle(doc);
    doc.body.innerHTML = `<div class="launch-page"><div class="launch-panel"><div class="brand">${icon("logo")}Sandboxed VM</div><h1>Your desktop.<br>A new window.</h1><p>Launch a real Linux desktop with Firefox, Chrome, and your saved S-Files.</p>${button("Launch Sandboxed VM", "launch-vm", "play", "primary")}<small>Made by 2pro12342<br>2pro Support saves files and installed apps on this device.</small><div class="launch-status" id="launch-status"></div></div></div>`;
    let child = null;
    doc.getElementById("launch-vm").onclick = () => {
      if (child && !child.closed) {
        child.focus();
        return;
      }
      child = window.open("about:blank", "_blank");
      if (!child) {
        doc.getElementById("launch-status").textContent = "Allow popups for CodeHS, then click Launch again.";
        return;
      }
      doc.getElementById("launch-status").textContent = "VM opened in a new tab. Keep this CodeHS page open.";
      startApp(child, files).catch((error) => {
        child.document.body.textContent = error.message;
      });
    };
  }
  return __toCommonJS(app_exports);
})();

SandboxedVM2.launchController({"native.py":"\"\"\"Sandboxed VM — Made by 2pro12342.\n\nRun as main.py in a CodeHS Python Graphics (tkinter) sandbox.\nThis is a real Linux desktop session with native applications, not an OS mockup.\nPackages are extracted into this program's own directory, without sudo.\nRoblox is a website shortcut; a native Roblox Linux client is not included.\n\"\"\"\nimport atexit\nimport json\nimport math\nimport os\nfrom pathlib import Path\nimport queue\nimport re\nimport shlex\nimport shutil\nimport signal\nimport socket\nimport subprocess\nimport sys\nimport tarfile\nimport threading\nimport time\nimport tkinter as tk\nfrom tkinter import messagebox\nfrom xml.sax.saxutils import escape\nfrom concurrent.futures import ThreadPoolExecutor\n\nTITLE = \"Sandboxed VM\"\nAUTHOR = \"2pro12342\"\n# Explicitly approved by the user for Chrome inside this CodeHS Linux session.\n# Set False to require Chrome's own sandbox and block unsupported launches.\nALLOW_CHROME_WITHOUT_SANDBOX = True\nHERE = Path(__file__).resolve().parent\nBASE = HERE / \".sandboxed-vm-linux\"\nRUNTIME = BASE / \"runtime\"\nDOWNLOADS = BASE / \"downloads\"\nDOCUMENTS = HERE / \"Documents\"\nLOGS = BASE / \"logs\"\nAPPS = BASE / \"apps\"\nSOCKET = BASE / \"control.sock\"\nSCRIPT = Path(__file__).resolve()\nfor directory in (BASE, RUNTIME, DOWNLOADS, DOCUMENTS, LOGS, APPS, BASE / \"profiles\", BASE / \"run\", BASE / \"icons\"):\n    directory.mkdir(parents=True, exist_ok=True)\n\n\ndef environment():\n    env = os.environ.copy()\n    libdirs = [RUNTIME / \"usr/lib/x86_64-linux-gnu\", RUNTIME / \"lib/x86_64-linux-gnu\"]\n    env[\"LD_LIBRARY_PATH\"] = \":\".join([str(p) for p in libdirs] + [env.get(\"LD_LIBRARY_PATH\", \"\")])\n    env[\"PATH\"] = str(RUNTIME / \"usr/bin\") + \":\" + env.get(\"PATH\", \"\")\n    env[\"XDG_DATA_DIRS\"] = str(RUNTIME / \"usr/share\") + \":\" + env.get(\"XDG_DATA_DIRS\", \"/usr/local/share:/usr/share\")\n    env[\"XDG_RUNTIME_DIR\"] = str(BASE / \"run\")\n    env[\"DBUS_SESSION_BUS_ADDRESS\"] = \"unix:path=\" + str(BASE / \"run/bus\")\n    env[\"NO_AT_BRIDGE\"] = \"1\"\n    env[\"GTK_A11Y\"] = \"none\"\n    env[\"DISPLAY\"] = os.environ.get(\"DISPLAY\", \":99\")\n    return env\n\n\ndef client(action):\n    try:\n        with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as connection:\n            connection.settimeout(3)\n            connection.connect(str(SOCKET))\n            connection.sendall((json.dumps({\"action\": action}) + \"\\n\").encode())\n            print(connection.recv(16384).decode())\n        return 0\n    except OSError as exc:\n        print(\"Start Sandboxed VM first:\", exc)\n        return 1\n\n\ndef checked(command, log_name=\"setup.log\", timeout=240, env=None):\n    with (LOGS / log_name).open(\"ab\", buffering=0) as log:\n        result = subprocess.run(command, stdout=log, stderr=subprocess.STDOUT, timeout=timeout, env=env)\n    if result.returncode:\n        detail = (LOGS / log_name).read_text(errors=\"replace\")[-2200:]\n        raise RuntimeError(\"{} failed ({}).\\n{}\".format(Path(command[0]).name, result.returncode, detail))\n\n\ndef fetch(url, destination):\n    partial = destination.with_suffix(destination.suffix + \".part\")\n    checked([\"curl\", \"--location\", \"--fail\", \"--retry\", \"2\", \"--connect-timeout\", \"25\", \"--max-time\", \"240\", \"--output\", str(partial), url], timeout=260)\n    partial.replace(destination)\n\n\ndef install_desktop(report):\n    marker = RUNTIME / \"desktop-ready.json\"\n    if marker.exists() and (RUNTIME / \"usr/bin/jwm\").exists():\n        return\n    release = Path(\"/etc/os-release\").read_text()\n    if 'VERSION_ID=\"22.04\"' not in release or os.uname().machine != \"x86_64\":\n        raise RuntimeError(\"The automatic package setup supports CodeHS Ubuntu 22.04 x64. This sandbox has a different runtime.\")\n    apt = BASE / \"apt\"\n    archives = apt / \"archives\"\n    for directory in (archives / \"partial\", apt / \"lists/partial\"):\n        directory.mkdir(parents=True, exist_ok=True)\n    shutil.copyfile(\"/var/lib/dpkg/status\", str(apt / \"status\"))\n    (apt / \"sources.list\").write_text(\n        \"deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] https://archive.ubuntu.com/ubuntu jammy main universe\\n\"\n        \"deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] https://archive.ubuntu.com/ubuntu jammy-updates main universe\\n\"\n        \"deb [signed-by=/usr/share/keyrings/ubuntu-archive-keyring.gpg] https://security.ubuntu.com/ubuntu jammy-security main universe\\n\")\n    options = []\n    for key, value in {\n        \"Dir::State::status\": apt / \"status\",\n        \"Dir::State::extended_states\": apt / \"extended_states\",\n        \"Dir::State::lists\": apt / \"lists\",\n        \"Dir::Cache::archives\": archives,\n        \"Dir::Cache::pkgcache\": apt / \"pkgcache.bin\",\n        \"Dir::Cache::srcpkgcache\": apt / \"srcpkgcache.bin\",\n        \"Dir::Etc::sourcelist\": apt / \"sources.list\",\n        \"Dir::Etc::sourceparts\": \"-\",\n        \"Acquire::Retries\": \"2\",\n    }.items():\n        options.extend([\"-o\", str(key) + \"=\" + str(value)])\n    report(\"desktop\", \"Getting signed Ubuntu packages…\")\n    checked([\"apt-get\"] + options + [\"update\"])\n    packages = [\"jwm\", \"pcmanfm\", \"xterm\", \"mousepad\", \"galculator\", \"libnss3\", \"libnspr4\", \"libatk-bridge2.0-0\", \"libcups2\", \"libdrm2\", \"libxkbcommon0\", \"libxcomposite1\", \"libxdamage1\", \"libxrandr2\", \"libgbm1\", \"libasound2\", \"libgtk-3-0\", \"libxss1\"]\n    checked([\"apt-get\"] + options + [\"--yes\", \"--download-only\", \"--no-install-recommends\", \"install\"] + packages)\n    report(\"desktop\", \"Installing the window manager and desktop tools…\")\n    for package in sorted(archives.glob(\"*.deb\")):\n        checked([\"dpkg-deb\", \"-x\", str(package), str(RUNTIME)], timeout=90)\n    for program in (\"jwm\", \"pcmanfm\", \"xterm\", \"mousepad\", \"galculator\"):\n        if not (RUNTIME / \"usr/bin\" / program).exists():\n            raise RuntimeError(\"Desktop package did not supply \" + program)\n    marker.write_text(json.dumps({\"packages\": packages, \"installed\": time.time()}))\n\n\ndef install_firefox(report):\n    binary = APPS / \"firefox/firefox\"\n    if not binary.exists():\n        report(\"firefox\", \"Downloading Firefox from Mozilla…\")\n        archive = DOWNLOADS / \"firefox.tar.xz\"\n        fetch(\"https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US\", archive)\n        report(\"firefox\", \"Installing Firefox…\")\n        with tarfile.open(str(archive), \"r:*\") as tar:\n            for member in tar.getmembers():\n                target = (APPS / member.name).resolve()\n                if os.path.commonpath([str(APPS.resolve()), str(target)]) != str(APPS.resolve()):\n                    raise RuntimeError(\"Unexpected path in Firefox archive\")\n            tar.extractall(str(APPS))\n        archive.unlink()\n    report(\"firefox\", \"Installed\")\n\n\ndef install_chrome(report):\n    binary = APPS / \"chrome/opt/google/chrome/google-chrome\"\n    if not binary.exists():\n        report(\"chrome\", \"Downloading Google Chrome from Google…\")\n        archive = DOWNLOADS / \"chrome.deb\"\n        fetch(\"https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb\", archive)\n        report(\"chrome\", \"Installing Google Chrome…\")\n        checked([\"dpkg-deb\", \"-x\", str(archive), str(APPS / \"chrome\")], timeout=120)\n        archive.unlink()\n    report(\"chrome\", \"Installed\")\n\n\ndef write_icons():\n    colors = {\" \": \"None\", \"a\": \"#59a6ff\", \"b\": \"#f2c35f\", \"c\": \"#ffffff\", \"d\": \"#111e34\", \"e\": \"#ed574a\", \"f\": \"#42b875\", \"g\": \"#f79539\", \"h\": \"#8e65e8\"}\n    for name in (\"files\", \"firefox\", \"chrome\", \"roblox\", \"terminal\", \"settings\", \"editor\", \"calculator\"):\n        rows = []\n        for y in range(32):\n            row = \"\"\n            for x in range(32):\n                px, py = x - 15.5, y - 15.5\n                radius = math.hypot(px, py)\n                color = \" \"\n                if name == \"chrome\" and radius < 14:\n                    color = \"e\" if py < -abs(px) / 2 else (\"f\" if px < 0 else \"b\")\n                    if radius < 7:\n                        color = \"c\" if radius > 5.5 else \"a\"\n                elif name == \"firefox\" and radius < 14:\n                    color = \"g\" if radius > 9 or py > 2 else \"h\"\n                elif name == \"roblox\":\n                    u, v = px * .94 + py * .342, -px * .342 + py * .94\n                    if abs(u) < 11 and abs(v) < 11 and not (abs(u) < 4 and abs(v) < 4):\n                        color = \"c\"\n                elif name == \"files\" and 4 <= x <= 28 and 10 <= y <= 26:\n                    color = \"b\"\n                elif name == \"files\" and 4 <= x <= 15 and 7 <= y <= 11:\n                    color = \"b\"\n                elif name == \"terminal\" and 3 <= x <= 28 and 5 <= y <= 27:\n                    color = \"a\" if x in (3, 28) or y in (5, 27) else \"d\"\n                    if (8 <= x <= 13 and abs((y-15) - (x-11)) < 1.5) or (8 <= x <= 13 and abs((y-15) + (x-11)) < 1.5) or (17 <= x <= 23 and y == 21):\n                        color = \"c\"\n                elif name == \"settings\" and 6 < radius < 12:\n                    color = \"a\"\n                elif name == \"editor\" and 7 <= x <= 25 and 4 <= y <= 28:\n                    color = \"c\" if not (11 <= x <= 21 and y in (12, 17, 22)) else \"a\"\n                elif name == \"calculator\" and 7 <= x <= 25 and 3 <= y <= 28:\n                    color = \"a\" if y < 11 else (\"c\" if x % 5 in (1, 2) and y % 5 in (1, 2) else \"d\")\n                row += color\n            rows.append(row)\n        lines = ['/* XPM */', 'static char * icon[] = {', '\"32 32 {} 1\",'.format(len(colors))]\n        lines += ['\"{} c {}\",'.format(k, v) for k, v in colors.items()]\n        lines += ['\"{}\"{}'.format(row, ',' if i < 31 else '};') for i, row in enumerate(rows)]\n        (BASE / \"icons\" / (name + \".xpm\")).write_text(\"\\n\".join(lines))\n\n\ndef command(action):\n    return \" \".join(shlex.quote(v) for v in (sys.executable, str(BASE / \"launcher.py\"), action))\n\n\ndef write_jwm():\n    # CodeHS may execute main.py through a runner. A separate, tiny launcher\n    # gives the window manager a stable executable file of its own.\n    (BASE / \"launcher.py\").write_text(\n        \"import socket,sys,json\\n\"\n        \"s=socket.socket(socket.AF_UNIX,socket.SOCK_STREAM)\\n\"\n        \"s.settimeout(5)\\n\"\n        \"s.connect(\" + repr(str(SOCKET)) + \")\\n\"\n        \"s.sendall((json.dumps({'action':sys.argv[1]})+'\\\\n').encode())\\n\"\n        \"s.recv(4096)\\n\"\n        \"s.close()\\n\")\n    entries = [(\"files\", \"Files\"), (\"firefox\", \"Firefox\"), (\"chrome\", \"Google Chrome\"), (\"roblox\", \"Roblox (website)\"), (\"terminal\", \"Terminal\"), (\"editor\", \"Text Editor\"), (\"calculator\", \"Calculator\"), (\"settings\", \"Settings\"), (\"about\", \"About Sandboxed VM\")]\n    menu = \"\".join('<Program label=\"{}\" icon=\"{}\">{}</Program>'.format(label, BASE / \"icons\" / (app + \".xpm\") if app != \"about\" else BASE / \"icons/settings.xpm\", escape(command(app))) for app, label in entries)\n    buttons = \"\".join('<TrayButton popup=\"{}\" icon=\"{}\">exec:{}</TrayButton>'.format(label, BASE / \"icons\" / (app + \".xpm\"), escape(command(app))) for app, label in entries[:5])\n    xml = '''<?xml version=\"1.0\"?>\n<JWM>\n<RootMenu onroot=\"123\" labeled=\"true\" label=\"Sandboxed VM\" height=\"30\">{menu}<Separator/><Program label=\"Stop desktop\">{stop}</Program></RootMenu>\n<Group><Class>SandboxedVMDesktop</Class><Option>noborder</Option><Option>notitle</Option><Option>nolist</Option><Option>sticky</Option><Option>layer:below</Option></Group>\n<WindowStyle><Font>DejaVu Sans-10</Font><Width>2</Width><Height>30</Height><Corner>3</Corner><Foreground>#eaf2ff</Foreground><Background>#182944</Background><Outline>#30435e</Outline><Active><Foreground>#ffffff</Foreground><Background>#244878</Background><Outline>#619bff</Outline></Active></WindowStyle>\n<TrayStyle><Font>DejaVu Sans-10</Font><Background>#111e34</Background><Foreground>#e5f0ff</Foreground><Outline>#263b58</Outline><Active><Foreground>#ffffff</Foreground><Background>#244878</Background></Active></TrayStyle>\n<MenuStyle><Font>DejaVu Sans-10</Font><Foreground>#eaf2ff</Foreground><Background>#14233b</Background><Outline>#395375</Outline><Active><Foreground>#ffffff</Foreground><Background>#244878</Background></Active></MenuStyle>\n<Tray x=\"0\" y=\"-1\" height=\"44\" autohide=\"off\"><TrayButton label=\"Start\" width=\"76\">root:1</TrayButton><Spacer width=\"6\"/>{buttons}<Spacer width=\"8\"/><TaskList maxwidth=\"180\"/><Clock format=\"%H:%M\" width=\"70\"/></Tray>\n<Desktops width=\"1\" height=\"1\"/><FocusModel>click</FocusModel><MoveMode>opaque</MoveMode><ResizeMode>opaque</ResizeMode>\n<Key mask=\"A\" key=\"F4\">close</Key><Key mask=\"A\" key=\"Tab\">nextstacked</Key><Key mask=\"4\" key=\"e\">exec:{files}</Key><Key mask=\"C4\" key=\"t\">exec:{terminal}</Key><Key key=\"F1\">exec:{about}</Key>\n</JWM>'''.format(menu=menu, buttons=buttons, stop=escape(command(\"stop\")), files=escape(command(\"files\")), terminal=escape(command(\"terminal\")), about=escape(command(\"about\")))\n    (BASE / \"jwmrc\").write_text(xml)\n\n\ndef resize_display():\n    # Xvfb supplies the remote Linux screen; ask its normal RandR interface for\n    # a desktop-sized mode. Browsers and the window manager use that real screen.\n    try:\n        modeline = subprocess.check_output([\"gtf\", \"1024\", \"480\", \"60\"], timeout=5, text=True)\n        line = next(line for line in modeline.splitlines() if \"Modeline\" in line)\n        values = shlex.split(line.strip())[2:]\n        mode = \"SandboxedVM-1024x480\"\n        for args in ([\"--newmode\", mode] + values, [\"--addmode\", \"screen\", mode], [\"--output\", \"screen\", \"--mode\", mode]):\n            subprocess.run([\"xrandr\"] + args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)\n    except (OSError, subprocess.SubprocessError, StopIteration):\n        pass\n\n\nclass Desktop:\n    def __init__(self):\n        self.events = queue.Queue()\n        self.processes = []\n        self.ready = False\n        self.closed = False\n        self.namespace_sandbox = False\n        self.status = {\"desktop\": \"Preparing…\", \"firefox\": \"Waiting…\", \"chrome\": \"Waiting…\"}\n        self.failures = {}\n        self.config = {\"wallpaper\": \"Blue\", \"browser\": \"Firefox\"}\n        try:\n            self.config.update(json.loads((BASE / \"settings.json\").read_text()))\n        except (OSError, ValueError):\n            pass\n        resize_display()\n        self.root = tk.Tk(className=\"SandboxedVMDesktop\")\n        self.root.title(TITLE)\n        self.root.wm_attributes(\"-type\", \"desktop\")\n        self.width = self.root.winfo_screenwidth()\n        self.height = self.root.winfo_screenheight()\n        self.root.geometry(\"{}x{}+0+0\".format(self.width, self.height))\n        self.canvas = tk.Canvas(self.root, highlightthickness=0, bg=\"#0b1427\")\n        self.canvas.pack(fill=\"both\", expand=True)\n        self.root.bind(\"<Configure>\", lambda e: self.draw_wallpaper() if e.widget == self.root else None)\n        self.root.bind_all(\"<Control-Alt-t>\", lambda e: self.launch(\"terminal\"))\n        self.root.protocol(\"WM_DELETE_WINDOW\", self.close)\n        self.draw_wallpaper()\n        self.shortcuts = []\n        self.create_shortcuts()\n        self.welcome = None\n        self.show_welcome()\n        self.server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)\n        if SOCKET.exists():\n            SOCKET.unlink()\n        self.server.bind(str(SOCKET))\n        os.chmod(str(SOCKET), 0o600)\n        self.server.listen(8)\n        threading.Thread(target=self.listen, daemon=True).start()\n        threading.Thread(target=self.console_commands, daemon=True).start()\n        threading.Thread(target=self.prepare, daemon=True).start()\n        self.root.after(120, self.pump)\n        self.last_heartbeat = time.monotonic()\n        self.root.after(1000, self.watch_display)\n        atexit.register(self.cleanup)\n\n    def report(self, app, text):\n        print(\"[{}] {}\".format(app, text), flush=True)\n        self.events.put((\"status\", app, text))\n\n    def prepare(self):\n        try:\n            install_desktop(self.report)\n            write_icons()\n            write_jwm()\n            checked([str(RUNTIME / \"usr/bin/jwm\"), \"-p\", \"-f\", str(BASE / \"jwmrc\")], env=environment())\n            os.chmod(str(BASE / \"run\"), 0o700)\n            if not (BASE / \"run/bus\").exists():\n                self.spawn(\"dbus\", [\"dbus-daemon\", \"--session\", \"--nofork\", \"--nopidfile\", \"--address=unix:path=\" + str(BASE / \"run/bus\")])\n            manager = self.spawn(\"jwm\", [str(RUNTIME / \"usr/bin/jwm\"), \"-f\", str(BASE / \"jwmrc\")])\n            time.sleep(1)\n            if manager.poll() is not None:\n                raise RuntimeError(\"Window manager could not start. \" + (LOGS / \"jwm.log\").read_text(errors=\"replace\")[-1000:])\n            self.events.put((\"ready\",))\n            self.report(\"desktop\", \"Ready\")\n            try:\n                probe = subprocess.run([\"unshare\", \"--user\", \"--map-root-user\", \"true\"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=5)\n                self.namespace_sandbox = probe.returncode == 0\n            except (OSError, subprocess.SubprocessError):\n                pass\n            print(\"Chrome namespace sandbox available:\", self.namespace_sandbox, flush=True)\n            self.write_welcome_file()\n            with ThreadPoolExecutor(max_workers=2) as pool:\n                futures = {pool.submit(install_firefox, self.report): \"firefox\", pool.submit(install_chrome, self.report): \"chrome\"}\n                for future, app in futures.items():\n                    try:\n                        future.result()\n                    except Exception as exc:\n                        self.report(app, \"Installation failed\")\n                        self.events.put((\"failure\", app, str(exc)))\n            self.events.put((\"finished\",))\n        except Exception as exc:\n            self.events.put((\"failure\", \"desktop\", str(exc)))\n\n    def write_welcome_file(self):\n        target = DOCUMENTS / \"Welcome to Sandboxed VM.txt\"\n        if not target.exists():\n            target.write_text(\"Sandboxed VM\\nMade by 2pro12342\\n\\nThis is a real Linux desktop running in a CodeHS sandbox.\\n\\nFirefox and Google Chrome are native applications. Files, Text Editor, Terminal and Calculator run as native Linux programs.\\n\\nRoblox opens the Roblox website. Roblox has no supported native Linux desktop client, so gameplay is not included.\\n\\nUse Start, the desktop shortcuts, or the taskbar to open apps. Drag title bars to move windows; minimize, maximize, and close use the native window manager. Alt+Tab switches windows.\\n\\nSave documents in this Documents folder. Use Settings > Create backup to create a ZIP in the CodeHS program directory. Download important work; CodeHS can recycle the running server.\\n\\nIf the runtime is reset, press Run again and allow the applications to reinstall.\\n\")\n\n    def spawn(self, name, args):\n        log = (LOGS / (name + \".log\")).open(\"ab\", buffering=0)\n        try:\n            process = subprocess.Popen(args, env=environment(), cwd=str(DOCUMENTS), stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT, start_new_session=True)\n        finally:\n            log.close()\n        self.processes.append((name, process))\n        return process\n\n    def listen(self):\n        while not self.closed:\n            try:\n                connection, _ = self.server.accept()\n                with connection:\n                    connection.settimeout(3)\n                    request = json.loads(connection.recv(4096).decode())\n                    action = request.get(\"action\", \"\")\n                    if action == \"status\":\n                        result = {\"name\": TITLE, \"author\": AUTHOR, \"ready\": self.ready, \"apps\": dict(self.status), \"failures\": dict(self.failures), \"processes\": {name: process.poll() for name, process in self.processes}}\n                        connection.sendall(json.dumps(result).encode())\n                    else:\n                        self.events.put((\"launch\", action))\n                        connection.sendall(b'{\"accepted\":true}')\n            except (OSError, ValueError):\n                if self.closed:\n                    return\n\n    def console_commands(self):\n        # The CodeHS console also provides a convenient app launcher.\n        for line in sys.stdin:\n            action = line.strip().lower()\n            if action == \"status\":\n                print(json.dumps({\"name\": TITLE, \"author\": AUTHOR, \"apps\": self.status, \"screen\": [self.width, self.height], \"chrome_namespace_sandbox\": self.namespace_sandbox, \"processes\": {name: process.poll() for name, process in self.processes}, \"failures\": self.failures}), flush=True)\n            elif action in (\"firefox\", \"chrome\", \"roblox\", \"files\", \"terminal\", \"editor\", \"calculator\", \"settings\", \"about\"):\n                self.events.put((\"launch\", action))\n\n    def watch_display(self):\n        if self.closed:\n            return\n        try:\n            info = subprocess.check_output([\"xrandr\", \"--current\"], text=True, timeout=3, stderr=subprocess.DEVNULL)\n            match = re.search(r\"current (\\d+) x (\\d+)\", info)\n            if match:\n                size = tuple(int(value) for value in match.groups())\n                if size != (self.width, self.height):\n                    self.width, self.height = size\n                    self.root.geometry(\"{}x{}+0+0\".format(*size))\n                    self.root.lower()\n                    self.position_shortcuts()\n                    self.draw_wallpaper()\n        except (OSError, subprocess.SubprocessError):\n            pass\n        if time.monotonic() - self.last_heartbeat > 20:\n            print(\"Sandboxed VM session active. Console commands: status, firefox, chrome, files, terminal.\", flush=True)\n            self.last_heartbeat = time.monotonic()\n        self.root.after(1000, self.watch_display)\n\n    def pump(self):\n        while True:\n            try:\n                event = self.events.get_nowait()\n            except queue.Empty:\n                break\n            if event[0] == \"status\":\n                self.status[event[1]] = event[2]\n                self.refresh_welcome()\n            elif event[0] == \"ready\":\n                self.ready = True\n                self.root.lower()\n                if self.welcome and self.welcome.winfo_exists():\n                    self.welcome.lift()\n            elif event[0] == \"failure\":\n                self.failures[event[1]] = event[2]\n                print(\"ERROR:\", event[1], event[2], flush=True)\n                self.refresh_welcome()\n                self.notice(\"Setup needs attention\", event[1] + \": \" + event[2][-1600:])\n            elif event[0] == \"launch\":\n                self.launch(event[1])\n            elif event[0] == \"finished\":\n                self.refresh_welcome()\n                print(\"DESKTOP READY — Sandboxed VM — Made by 2pro12342\", flush=True)\n        if not self.closed:\n            self.root.after(150, self.pump)\n\n    def draw_wallpaper(self):\n        canvas = self.canvas\n        canvas.delete(\"wallpaper\")\n        width = max(1, self.root.winfo_width())\n        height = max(1, self.root.winfo_height())\n        palette = {\"Blue\": (\"#0b1427\", \"#17385d\", \"#285a99\"), \"Violet\": (\"#141028\", \"#30255b\", \"#63428e\"), \"Forest\": (\"#091e20\", \"#164b4c\", \"#237d79\")}\n        background, mid, accent = palette.get(self.config[\"wallpaper\"], palette[\"Blue\"])\n        canvas.configure(bg=background)\n        for index in range(15, 0, -1):\n            inset = index * max(width, height) / 20\n            canvas.create_oval(width * .62 - inset, height * .38 - inset * .65, width * 1.42 + inset, height * 1.35 + inset * .65, fill=mid if index > 7 else accent, outline=background, width=3, tags=\"wallpaper\")\n        canvas.create_text(width - 34, height - 112, text=TITLE, fill=\"#e8f1ff\", font=(\"DejaVu Sans\", 27, \"bold\"), anchor=\"e\", tags=\"wallpaper\")\n        canvas.create_text(width - 35, height - 78, text=\"Made by \" + AUTHOR, fill=\"#a7c3e7\", font=(\"DejaVu Sans\", 12), anchor=\"e\", tags=\"wallpaper\")\n        canvas.tag_lower(\"wallpaper\")\n\n    def create_shortcuts(self):\n        for index, (action, label, color, symbol) in enumerate([\n            (\"files\", \"Files\", \"#ffd06e\", \"▰\"), (\"firefox\", \"Firefox\", \"#ff9b48\", \"◉\"), (\"chrome\", \"Google Chrome\", \"#66b2ff\", \"◉\"), (\"roblox\", \"Roblox (web)\", \"#ffffff\", \"◈\"), (\"terminal\", \"Terminal\", \"#b5d5ff\", \">_\"), (\"settings\", \"Settings\", \"#b5c8e6\", \"⚙\")\n        ]):\n            button = tk.Button(self.root, text=symbol + \"\\n\" + label, command=lambda name=action: self.launch(name), width=12, height=3, bg=\"#11233b\", fg=color, activebackground=\"#234568\", activeforeground=\"#ffffff\", relief=\"flat\", bd=0, font=(\"DejaVu Sans\", 10), cursor=\"hand2\")\n            self.shortcuts.append(button)\n        self.position_shortcuts()\n\n    def position_shortcuts(self):\n        rows = max(1, (self.height - 64) // 86)\n        for index, button in enumerate(self.shortcuts):\n            button.place(x=16 + (index // rows) * 124, y=18 + (index % rows) * 86, width=112, height=72)\n\n    def make_window(self, title, width=600, height=440):\n        window = tk.Toplevel(self.root)\n        window.title(title)\n        window.configure(bg=\"#f5f8ff\")\n        width = min(width, max(320, self.width - 150))\n        height = min(height, max(260, self.height - 68))\n        x = min(max(138, (self.width - width) // 2), max(0, self.width - width - 10))\n        y = max(10, (self.height - height - 44) // 2)\n        window.geometry(\"{}x{}+{}+{}\".format(width, height, x, y))\n        window.minsize(min(320, width), min(260, height))\n        window.lift()\n        return window\n\n    def show_welcome(self):\n        if self.welcome and self.welcome.winfo_exists():\n            self.welcome.deiconify()\n            self.welcome.lift()\n            return\n        self.welcome = self.make_window(\"Welcome to Sandboxed VM\", 610, 430)\n        pane = tk.Frame(self.welcome, bg=\"#f5f8ff\", padx=30, pady=24)\n        pane.pack(fill=\"both\", expand=True)\n        tk.Label(pane, text=\"Your Linux desktop is here.\", bg=\"#f5f8ff\", fg=\"#182b47\", font=(\"DejaVu Sans\", 21, \"bold\"), anchor=\"w\").pack(fill=\"x\", pady=(0, 8))\n        tk.Label(pane, text=\"Sandboxed VM · Made by 2pro12342\", bg=\"#f5f8ff\", fg=\"#526983\", font=(\"DejaVu Sans\", 11), anchor=\"w\").pack(fill=\"x\", pady=(0, 20))\n        self.status_vars = {}\n        for app, label in ((\"desktop\", \"Desktop tools\"), (\"firefox\", \"Mozilla Firefox\"), (\"chrome\", \"Google Chrome\")):\n            row = tk.Frame(pane, bg=\"#f5f8ff\")\n            row.pack(fill=\"x\", pady=5)\n            tk.Label(row, text=label, width=18, bg=\"#f5f8ff\", fg=\"#20364f\", font=(\"DejaVu Sans\", 11), anchor=\"w\").pack(side=\"left\")\n            variable = tk.StringVar(value=self.status[app])\n            self.status_vars[app] = variable\n            tk.Label(row, textvariable=variable, bg=\"#f5f8ff\", fg=\"#426ca5\", font=(\"DejaVu Sans\", 10), anchor=\"w\", wraplength=330).pack(side=\"left\", fill=\"x\", expand=True)\n        buttons = tk.Frame(pane, bg=\"#f5f8ff\")\n        buttons.pack(fill=\"x\", pady=20)\n        for action, label in ((\"firefox\", \"Open Firefox\"), (\"chrome\", \"Open Chrome\"), (\"files\", \"Open Files\")):\n            tk.Button(buttons, text=label, command=lambda name=action: self.launch(name), bg=\"#245ba8\", fg=\"white\", activebackground=\"#19457e\", activeforeground=\"white\", relief=\"flat\", padx=13, pady=9, cursor=\"hand2\").pack(side=\"left\", padx=(0, 10))\n        tk.Label(pane, text=\"Real Linux apps. Move windows by their title bars.\\nRoblox opens its website; native Roblox gameplay is unavailable on Linux.\", bg=\"#f5f8ff\", fg=\"#526983\", font=(\"DejaVu Sans\", 10), justify=\"left\", anchor=\"w\", wraplength=540).pack(fill=\"x\")\n\n    def refresh_welcome(self):\n        if self.welcome and self.welcome.winfo_exists():\n            for app, variable in self.status_vars.items():\n                variable.set(self.status[app])\n\n    def notice(self, title, text):\n        window = self.make_window(title, 620, 330)\n        tk.Label(window, text=title, bg=\"#f5f8ff\", fg=\"#162d4b\", font=(\"DejaVu Sans\", 17, \"bold\"), anchor=\"w\").pack(fill=\"x\", padx=24, pady=(22, 10))\n        body = tk.Text(window, wrap=\"word\", bg=\"#f5f8ff\", fg=\"#314963\", relief=\"flat\", padx=24, pady=8, font=(\"DejaVu Sans\", 10))\n        body.pack(fill=\"both\", expand=True)\n        body.insert(\"1.0\", text)\n        body.configure(state=\"disabled\")\n        tk.Button(window, text=\"Close\", command=window.destroy, padx=20, pady=7).pack(pady=14)\n\n    def launch(self, action):\n        if action == \"stop\":\n            self.close()\n            return\n        if action == \"about\":\n            self.notice(\"About Sandboxed VM\", \"Sandboxed VM\\nMade by 2pro12342\\n\\nA real Linux desktop session inside CodeHS.\\n\\nWindow manager: JWM\\nFile manager: PCManFM\\nTerminal: xterm\\nText editor: Mousepad\\nCalculator: Galculator\\nBrowsers: Firefox and Google Chrome\\n\\nRoblox is a website shortcut. Native Roblox gameplay is not supported on Linux.\\n\\nThis project is a Linux sandbox desktop, not a Microsoft Windows installation.\")\n            return\n        if action == \"settings\":\n            self.settings()\n            return\n        if not self.ready:\n            self.show_welcome()\n            return\n        args = None\n        if action in (\"chrome\", \"firefox\", \"roblox\"):\n            browser = self.config[\"browser\"].lower() if action == \"roblox\" else action\n            if self.status.get(browser) != \"Installed\":\n                self.show_welcome()\n                return\n            url = \"https://www.roblox.com/\" if action == \"roblox\" else (DOCUMENTS / \"Welcome to Sandboxed VM.txt\").as_uri()\n            profile = BASE / \"profiles\" / browser\n            profile.mkdir(exist_ok=True)\n            if browser == \"firefox\":\n                args = [str(APPS / \"firefox/firefox\"), \"--profile\", str(profile), url]\n            else:\n                args = [str(APPS / \"chrome/opt/google/chrome/google-chrome\"), \"--user-data-dir=\" + str(profile), \"--disable-dev-shm-usage\", \"--no-default-browser-check\", url]\n                # Use Chromium's unprivileged namespace sandbox when it works.\n                # Seccomp and the namespace sandbox remain enabled in this\n                # branch; the fallback below requires the explicit user option.\n                if self.namespace_sandbox:\n                    args.insert(1, \"--disable-setuid-sandbox\")\n                elif ALLOW_CHROME_WITHOUT_SANDBOX:\n                    args.insert(1, \"--no-sandbox\")\n            name = browser\n        else:\n            name = action\n            choices = {\n                \"files\": [str(RUNTIME / \"usr/bin/pcmanfm\"), str(DOCUMENTS)],\n                \"editor\": [str(RUNTIME / \"usr/bin/mousepad\"), str(DOCUMENTS / \"Welcome to Sandboxed VM.txt\")],\n                \"terminal\": [str(RUNTIME / \"usr/bin/xterm\"), \"-T\", \"Terminal — Sandboxed VM\", \"-fa\", \"DejaVu Sans Mono\", \"-fs\", \"11\", \"-bg\", \"#0c1628\", \"-fg\", \"#e4eeff\", \"-e\", \"/bin/bash\"],\n                \"calculator\": [str(RUNTIME / \"usr/bin/galculator\")],\n            }\n            args = choices.get(action)\n        if not args:\n            return\n        try:\n            process = self.spawn(name, args)\n            self.root.lower()\n            self.root.after(2400, lambda: self.check_launch(name, process))\n        except OSError as exc:\n            self.notice(\"Could not open \" + action, str(exc))\n\n    def check_launch(self, name, process):\n        result = process.poll()\n        if result is not None and result != 0:\n            log = (LOGS / (name + \".log\")).read_text(errors=\"replace\")[-1800:]\n            self.failures[name] = log\n            print(\"LAUNCH ERROR:\", name, log, flush=True)\n            self.notice(\"Could not open \" + name, \"The real application exited with code {}.\\n\\n{}\".format(result, log))\n\n    def settings(self):\n        window = self.make_window(\"Settings — Sandboxed VM\", 510, 370)\n        frame = tk.Frame(window, bg=\"#f5f8ff\", padx=24, pady=22)\n        frame.pack(fill=\"both\", expand=True)\n        tk.Label(frame, text=\"Make it yours\", font=(\"DejaVu Sans\", 19, \"bold\"), bg=\"#f5f8ff\", fg=\"#1b3553\").pack(anchor=\"w\", pady=(0, 18))\n        tk.Label(frame, text=\"Wallpaper\", bg=\"#f5f8ff\", fg=\"#2d4764\").pack(anchor=\"w\")\n        wallpaper = tk.StringVar(value=self.config[\"wallpaper\"])\n        tk.OptionMenu(frame, wallpaper, \"Blue\", \"Violet\", \"Forest\").pack(anchor=\"w\", pady=(3, 10))\n        tk.Label(frame, text=\"Browser for the Roblox website shortcut\", bg=\"#f5f8ff\", fg=\"#2d4764\").pack(anchor=\"w\")\n        browser = tk.StringVar(value=self.config[\"browser\"])\n        tk.OptionMenu(frame, browser, \"Firefox\", \"Chrome\").pack(anchor=\"w\", pady=(3, 12))\n        def save():\n            self.config.update(wallpaper=wallpaper.get(), browser=browser.get())\n            (BASE / \"settings.json\").write_text(json.dumps(self.config))\n            self.draw_wallpaper()\n            window.destroy()\n        row = tk.Frame(frame, bg=\"#f5f8ff\")\n        row.pack(anchor=\"w\", pady=10)\n        tk.Button(row, text=\"Save settings\", command=save, padx=12, pady=7).pack(side=\"left\", padx=(0, 10))\n        tk.Button(row, text=\"Create document backup\", command=self.backup, padx=12, pady=7).pack(side=\"left\")\n\n    def backup(self):\n        import zipfile\n        output = HERE / \"Sandboxed-VM-Documents.zip\"\n        with zipfile.ZipFile(str(output), \"w\", zipfile.ZIP_DEFLATED) as archive:\n            for filename in DOCUMENTS.rglob(\"*\"):\n                if filename.is_file() and not filename.is_symlink():\n                    archive.write(str(filename), str(filename.relative_to(HERE)))\n        self.notice(\"Backup created\", \"Your documents were saved to:\\n\\n\" + str(output) + \"\\n\\nEnable CodeHS File I/O to show generated files, then download this ZIP from the CodeHS file list.\")\n\n    def close(self):\n        if not self.closed:\n            self.closed = True\n            self.cleanup()\n            self.root.destroy()\n\n    def cleanup(self):\n        for _name, process in reversed(self.processes):\n            if process.poll() is None:\n                try:\n                    os.killpg(process.pid, signal.SIGTERM)\n                except ProcessLookupError:\n                    pass\n        try:\n            self.server.close()\n            SOCKET.unlink(missing_ok=True)\n        except (OSError, AttributeError):\n            pass\n\n    def run(self):\n        self.root.mainloop()\n\n\nif __name__ == \"__main__\":\n    if \"--launch\" in sys.argv:\n        position = sys.argv.index(\"--launch\")\n        sys.exit(client(sys.argv[position + 1] if len(sys.argv) > position + 1 else \"status\"))\n    try:\n        desktop = Desktop()\n        signal.signal(signal.SIGTERM, lambda *_: desktop.root.after(0, desktop.close))\n        desktop.run()\n    except Exception as error:\n        print(\"Sandboxed VM could not start:\", error, flush=True)\n        raise\n","agent.py":"\"\"\"Sandboxed VM 2 protocol bridge. Original code by 2pro12342's project.\nJSON requests arrive through the CodeHS spawn socket. No local HTTP port is exposed.\n\"\"\"\nimport base64\nimport json\nimport os\nfrom pathlib import Path\nimport queue\nimport re\nimport signal\nimport subprocess\nimport sys\nimport threading\nimport time\nimport zipfile\n\nHERE=Path(__file__).resolve().parent\nCACHE=Path.home()/'.cache'/'2pro-sandboxed-vm-v2'\nCACHE.mkdir(parents=True,exist_ok=True)\nPID=CACHE/'agent.pid'\ntry:\n    previous=int(PID.read_text())\n    if previous!=os.getpid():\n        # PID reuse must never target an unrelated process.\n        cmd=(Path('/proc')/str(previous)/'cmdline').read_bytes()\n        if b'agent.py' in cmd:\n            os.kill(previous,signal.SIGTERM)\n            time.sleep(.6)\nexcept (OSError,ValueError):\n    pass\nPID.write_text(str(os.getpid()))\nimport native\n# CodeHS file transfer refreshes the program directory. Keep reusable browser\n# binaries and package extraction in the container's per-user cache instead.\nnative.BASE=Path.home()/'.cache'/'2pro-sandboxed-vm-v2'\nnative.RUNTIME=native.BASE/'runtime'\nnative.DOWNLOADS=native.BASE/'downloads'\nnative.LOGS=native.BASE/'logs'\nnative.APPS=native.BASE/'apps'\nnative.SOCKET=native.BASE/'control.sock'\nfor folder in (native.BASE,native.RUNTIME,native.DOWNLOADS,native.LOGS,native.APPS,native.BASE/'profiles',native.BASE/'run',native.BASE/'icons'):\n    folder.mkdir(parents=True,exist_ok=True)\nSFILES=HERE/'S-Files'\nSFILES.mkdir(exist_ok=True)\nnative.DOCUMENTS=SFILES\nfor bookmark in (Path.home()/'.gtk-bookmarks',Path.home()/'.config/gtk-3.0/bookmarks'):\n    bookmark.parent.mkdir(parents=True,exist_ok=True)\n    try:old=bookmark.read_text()\n    except FileNotFoundError:old=''\n    entry=SFILES.as_uri()+' S-Files'\n    if entry not in old.splitlines():bookmark.write_text(old+('\\n' if old and not old.endswith('\\n') else '')+entry+'\\n')\nnative.resize_display=lambda:None\nLOCK=threading.RLock()\n\ndef emit(event=None,data=None,**message):\n    if event:message.update(event=event,data=data)\n    with LOCK:\n        sys.stdout.write('SVM2 '+json.dumps(message,separators=(',',':'))+'\\n')\n        sys.stdout.flush()\n\nnative.print=lambda *args,**kwargs:emit('log',{'text':' '.join(str(a) for a in args)})\noriginal_write_jwm=native.write_jwm\ndef write_jwm():\n    original_write_jwm()\n    path=native.BASE/'jwmrc'\n    xml=path.read_text()\n    entries=[]\n    for view,label in [('launcher',\"2pro's Launcher\"),('store',\"2pro's App Store\"),('files','S-Files'),('notepad','Notepad'),('tasks','Task Manager'),('calculator','Calculator'),('settings','2pro Support / Settings')]:\n        entries.append('<Program label=\"'+native.escape(label,{'\"':'&quot;'})+'\">'+native.escape(native.command('view-'+view))+'</Program>')\n    xml=xml.replace('</RootMenu>','<Separator/>'+''.join(entries)+'</RootMenu>',1)\n    path.write_text(xml)\nnative.write_jwm=write_jwm\n\ndef safe_path(value):\n    if not isinstance(value,str) or not value or len(value)>1024 or '\\\\' in value or '\\0' in value:raise ValueError('Invalid S-File path')\n    parts=value.split('/')\n    if any(p in ('','.','..') or ':' in p or any(ord(c)<32 for c in p) for p in parts):raise ValueError('Invalid S-File path')\n    p=SFILES.joinpath(*parts)\n    if os.path.commonpath([str(SFILES.resolve()),str(p.resolve())])!=str(SFILES.resolve()):raise ValueError('File is outside S-Files')\n    return p\n\nclass Desktop(native.Desktop):\n    def __init__(self):\n        self.rpc_queue=queue.Queue()\n        self.setup_state={}\n        self.file_uploads={}\n        self.finished=False\n        self.memory_previous={}\n        super().__init__()\n        self.root.after(80,self.rpc_pump)\n        emit('agent',{'pid':os.getpid(),'android':bool(os.path.exists('/dev/kvm')),'version':'2.0.0'})\n\n    def show_welcome(self):\n        self.welcome=None\n\n    def notice(self,title,message):\n        if title=='Setup needs attention':emit('error',{'message':message})\n        else:super().notice(title,message)\n\n    def refresh_welcome(self):\n        if getattr(self,'finished',False):return\n        if self.status.get('desktop')=='Ready' and all(self.status.get(x)=='Installed' for x in ('firefox','chrome')):\n            self.finished=True\n            emit('ready',{'apps':dict(self.status),'android':False})\n\n    def report(self,app,text):\n        self.setup_state[app]=text\n        super().report(app,text)\n        stages={'desktop':12,'firefox':48,'chrome':66}\n        if app=='desktop' and text=='Ready':stages[app]=40\n        if text=='Installed':stages[app]=80 if app=='firefox' else 87\n        emit('stage',{'percent':stages.get(app,12),'label':text,'app':app})\n\n    def console_commands(self):\n        for line in sys.stdin:\n            try:\n                data=json.loads(line)\n                if not isinstance(data,dict) or not isinstance(data.get('id'),str):continue\n                self.rpc_queue.put(data)\n            except (ValueError,TypeError):pass\n\n    def rpc_pump(self):\n        for _ in range(8):\n            try:req=self.rpc_queue.get_nowait()\n            except queue.Empty:break\n            threading.Thread(target=self.reply,args=(req,),daemon=True).start()\n        if not self.closed:self.root.after(60,self.rpc_pump)\n\n    def reply(self,request):\n        try:\n            result=self.operation(request)\n            emit(id=request['id'],ok=True,result=result)\n        except Exception as error:emit(id=request['id'],ok=False,error=str(error))\n\n    def operation(self,r):\n        action=r.get('action')\n        if action=='status':return {'ready':self.finished,'apps':dict(self.status),'failures':dict(self.failures),'android':False}\n        if action=='launch':\n            app=r.get('app')\n            if app not in ('firefox','chrome','files','terminal','editor','calculator','settings','about','roblox','discord','youtube','hyper'):raise ValueError('Unknown app')\n            self.events.put(('launch',app));return {'launching':app}\n        if action=='open':\n            p=safe_path(r['path'])\n            if not p.is_file():raise FileNotFoundError('S-File not found')\n            self.open_browser(p.as_uri());return True\n        if action=='url':\n            url=str(r.get('url',''))\n            if not re.match(r'^https?://[^\\s]+$',url,re.I):raise ValueError('Enter a complete HTTP or HTTPS address')\n            self.open_browser(url,lean=bool(r.get('lean')));return True\n        if action=='list':\n            rows=[]\n            for path in SFILES.rglob('*'):\n                if path.is_file() and not path.is_symlink() and '.svm-part-' not in path.name:\n                    try:stat=path.stat();rows.append({'path':path.relative_to(SFILES).as_posix(),'size':stat.st_size,'stamp':str(stat.st_mtime_ns)})\n                    except OSError:pass\n            return rows\n        if action=='read':\n            p=safe_path(r['path']);offset=max(0,int(r.get('offset',0)));length=min(65536,max(1,int(r.get('length',65536))))\n            with p.open('rb') as f:f.seek(offset);data=f.read(length)\n            return {'data':base64.b64encode(data).decode(),'size':p.stat().st_size,'stamp':str(p.stat().st_mtime_ns)}\n        if action=='begin':\n            p=safe_path(r['path']);p.parent.mkdir(parents=True,exist_ok=True);part=p.with_name('.svm-part-'+p.name);part.write_bytes(b'');self.file_uploads[r['path']]=part;return True\n        if action=='write':\n            p=self.file_uploads.get(r['path'])\n            if p is None:raise ValueError('Upload was not started')\n            data=base64.b64decode(r['data'],validate=True)\n            if len(data)>65536:raise ValueError('Chunk too large')\n            offset=int(r['offset'])\n            if offset<0 or offset+len(data)>20_000_000_000:raise ValueError('File exceeds 20 GB limit')\n            with p.open('r+b') as f:f.seek(offset);f.write(data)\n            return True\n        if action=='commit':\n            p=self.file_uploads.pop(r['path']);dest=safe_path(r['path']);p.replace(dest);s=dest.stat();return {'size':s.st_size,'stamp':str(s.st_mtime_ns)}\n        if action=='trash':\n            p=safe_path(r['path']);trash=HERE/'.svm-trash';trash.mkdir(exist_ok=True);p.replace(trash/(str(time.time_ns())+'-'+p.name));return True\n        if action=='tasks':return self.tasks()\n        if action=='resize':\n            width=max(640,min(1600,int(r['width'])))\n            height=max(360,min(1000,int(r['height'])))\n            query=subprocess.check_output(['xrandr','--current'],text=True,timeout=5)\n            maximum=re.search(r'maximum (\\d+) x (\\d+)',query)\n            if maximum:\n                scale=min(1,int(maximum.group(1))/width,int(maximum.group(2))/height)\n                width=max(640,int(width*scale)//8*8)\n                height=max(360,int(height*scale)//2*2)\n            modeline=subprocess.check_output(['gtf',str(width),str(height),'60'],text=True,timeout=5)\n            line=next(s for s in modeline.splitlines() if 'Modeline' in s)\n            values=native.shlex.split(line.strip())[2:]\n            mode='SVM2-%dx%d'%(width,height)\n            for args in (['--newmode',mode]+values,['--addmode','screen',mode],['--output','screen','--mode',mode]):\n                result=subprocess.run(['xrandr']+args,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=5)\n            if result.returncode:raise RuntimeError('CodeHS display resize: '+result.stderr.decode(errors='replace')[-300:])\n            return {'width':width,'height':height}\n        if action=='terminate':\n            pid=int(r['pid']);owned={p.pid for name,p in self.processes if p.poll() is None};protected={p.pid for name,p in self.processes if name in ('jwm','dbus')}\n            if pid not in owned or pid in protected or pid==os.getpid():raise ValueError('Only apps started by Sandboxed VM can be ended')\n            os.killpg(pid,signal.SIGTERM);return True\n        if action=='apk':\n            p=safe_path(r['path'])\n            with zipfile.ZipFile(p) as package:\n                names=package.namelist()\n                if 'AndroidManifest.xml' not in names:raise ValueError('Not an Android APK')\n                return {'androidRuntime':False,'files':len(names),'dexFiles':len([n for n in names if re.match(r'classes\\d*\\.dex$',n)]),'abis':sorted({n.split('/')[1] for n in names if n.startswith('lib/') and len(n.split('/'))>2}),'message':'APK imported. This CodeHS session has no Android runtime; APK execution is unavailable.'}\n        if action=='stop':self.root.after(150,self.close);return True\n        raise ValueError('Unknown request')\n\n    def open_browser(self,url,lean=False,app=False):\n        if self.status.get('chrome')!='Installed':raise RuntimeError('Chrome is still installing')\n        binary=str(native.APPS/'chrome/opt/google/chrome/google-chrome')\n        profile=native.BASE/'profiles'/('hyper-lite' if lean else 'chrome')\n        profile.mkdir(parents=True,exist_ok=True)\n        args=[binary,'--user-data-dir='+str(profile),'--disable-dev-shm-usage','--no-default-browser-check']\n        if self.namespace_sandbox:args+=['--disable-setuid-sandbox']\n        elif native.ALLOW_CHROME_WITHOUT_SANDBOX:args+=['--no-sandbox']\n        if lean:args+=['--disable-extensions','--disable-background-networking','--disable-sync']\n        args+=[('--app='+url) if app else url]\n        self.spawn('hyper' if lean else ('webapp-'+str(time.time_ns()) if app else 'chrome'),args)\n\n    def launch(self,action):\n        if action.startswith('view-') and action[5:] in ('launcher','store','files','notepad','tasks','calculator','settings'):\n            emit('view',{'view':action[5:]});return\n        if action in ('discord','youtube'):\n            return self.open_browser({'discord':'https://discord.com/app','youtube':'https://www.youtube.com/'}[action],app=True)\n        if action=='hyper':return self.open_browser('https://www.google.com/',lean=True)\n        return super().launch(action)\n\n    def tasks(self):\n        rows=[]\n        try:total=int(Path('/proc/meminfo').read_text().split('MemTotal:')[1].split()[0])*1024\n        except Exception:total=0\n        for name,p in list(self.processes):\n            if p.poll() is not None:continue\n            try:\n                status=(Path('/proc')/str(p.pid)/'status').read_text();match=re.search(r'^VmRSS:\\s+(\\d+)',status,re.M);rss=int(match.group(1))*1024 if match else 0\n            except OSError:rss=0\n            rows.append({'name':name,'pid':p.pid,'memory':rss,'canEnd':name not in ('jwm','dbus')})\n        return {'processes':rows,'memoryTotal':total,'tracked':True}\n\n    def watch_display(self):\n        # Fewer subprocesses than v1; the browser also scales an unchanged\n        # framebuffer, so resizing does not repaint on every pointer movement.\n        if self.closed:return\n        try:\n            output=subprocess.check_output(['xrandr','--current'],text=True,timeout=3,stderr=subprocess.DEVNULL)\n            m=re.search(r'current (\\d+) x (\\d+)',output)\n            if m and tuple(map(int,m.groups()))!=(self.width,self.height):\n                self.width,self.height=map(int,m.groups());self.root.geometry('%dx%d+0+0'%(self.width,self.height));self.position_shortcuts();self.draw_wallpaper();self.root.lower()\n        except (OSError,subprocess.SubprocessError):pass\n        self.root.after(3500,self.watch_display)\n\n    def draw_wallpaper(self):\n        c=self.canvas;c.delete('wallpaper');w=max(1,self.width);h=max(1,self.height);c.configure(bg='#071b39')\n        for points,color in [([0,h*.9,w*.2,h*.32,w*.6,h*.1,w,h*.4,w,h,0,h],'#123f80'),([0,h,w*.35,h*.5,w*.6,h*.25,w,h*.65,w,h],'#1d63bc'),([w*.1,h,w*.5,h*.65,w*.8,h*.52,w,h*.8,w,h],'#0e2f69')]:c.create_polygon(*points,fill=color,outline='',smooth=True,tags='wallpaper')\n        c.create_text(w-34,h-100,text='Sandboxed VM',fill='#f3f6fc',font=('DejaVu Sans',26,'bold'),anchor='e',tags='wallpaper')\n        c.create_text(w-34,h-64,text='Made by 2pro12342',fill='#afc8e9',font=('DejaVu Sans',12),anchor='e',tags='wallpaper');c.tag_lower('wallpaper')\n\ntry:\n    desktop=Desktop()\n    signal.signal(signal.SIGTERM,lambda *_:desktop.root.after(0,desktop.close))\n    desktop.run()\nexcept Exception as e:\n    emit('error',{'message':str(e)});raise\n"});
