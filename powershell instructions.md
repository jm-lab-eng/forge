cd C:\\Users\\jithi\\OneDrive\\Documents\\Career\\Jithin\\GitHub

git clone https://github.com/jm-lab-eng/forge



cd forge

git status





**Apply patch from codex**





cd C:\\Users\\jithi\\OneDrive\\Documents\\Career\\Jithin\\GitHub\\forge

notepad codex.patch

git apply codex.patch





git status



**Know changes**



cd C:\\Users\\jithi\\OneDrive\\Documents\\Career\\Jithin\\GitHub\\forge

git status

pwd



**Push to GitHub**



cd C:\\Users\\jithi\\OneDrive\\Documents\\Career\\Jithin\\GitHub\\forge

git status

git add .

git commit -m "Applied changes"

git push origin main









**download latest changes from GitHub to your local repo**



cd C:\\Users\\jithi\\OneDrive\\Documents\\Career\\Jithin\\GitHub\\forge

git pull origin main





**# make changes**

git add .

git commit -m "message"



**# sync safely**

git pull --rebase origin main

git push origin main

