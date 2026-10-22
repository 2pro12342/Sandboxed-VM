import urllib.request

# The URL pointing to the raw Python code
url = "https://raw.githubusercontent.com/2pro12342/Sandboxed-VM/refs/heads/main/VM.py"  # Replace with your URL

try:
    # Fetch the content from the URL
    with urllib.request.urlopen(url) as response:
        python_code = response.read().decode('utf-8')
    
    # Execute the fetched string as Python code
    exec(python_code)
    
except Exception as e:
    print(f"An error occurred: {e}")
