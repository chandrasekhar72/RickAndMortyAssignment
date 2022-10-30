import subprocess

p = subprocess.Popen(["start", "cmd", "/k", f"code . && npm start"], shell=True)
p.wait()