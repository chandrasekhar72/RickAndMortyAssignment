import os
import datetime
import subprocess

dateNow = datetime.datetime.now()
dateNow = dateNow.strftime("%Y-%m-%d %H:%M:%S %p")
os.system(f'git add . && git commit -am "Code Updated On {dateNow}"')
subprocess.Popen(["start", "cmd", "/k", "rmdir /s /q build & npm run build && git push origin main"], shell = True).wait()