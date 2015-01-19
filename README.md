# dev-mac-config
==============

Configuration steps, scripts and tools i use on mac machines.

### Setting up your development environment

- Install [Node](http://nodejs.org/)

defaults install to /usr/local/bin

- Install [Sublime Text 2](http://www.sublimetext.com/2)
- Install [KDiff3](http://kdiff3.sourceforge.net/)
- Install [Git](http://msysgit.github.io/)

    Be sure to select "Run Git and included Unix tools from the Windows Command Prompt". We will remove the paths later (if you were worried)

### From an elevated command prompt

```
git config --global user.name "Your Name Here"
git config --global user.email "your_email@example.com"
cd "c:\Program Files (x86)"
git clone https://github.com/seank-com/dev-win-config.git Scripts
```

### Create a shortcut on your desktop with the following Target

```
C:\Windows\System32\cmd.exe /k "C:\Program Files (x86)\Scripts\Init.cmd"
```

Click the Advanced button and check 'Run as administrator'

From Win-X | System | Advanced system settings | Environment Variables..., remove the following from the end of PATH

```
;C:\Program Files (x86)\Git\cmd;C:\Program Files (x86)\Git\bin

```

### Launch the dev window from the shortcut

```
git config --global core.editor "'c:/Program Files/Sublime Text 2/sublime_text.exe' -w"
git config --global color.ui auto
git config --global diff.tool windiff
git config --global difftool.prompt false
git config --global difftool.windiff.cmd  "'C:/Program Files (x86)/Scripts/windiff.exe' $LOCAL $REMOTE"
git config --global merge.tool kdiff3
git config --global mergetool.kdiff3.cmd "'C:/Program Files (x86)/KDiff3/kdiff3.exe' $BASE $LOCAL $REMOTE -o $MERGED"
git config --global alias.lga "log --graph --oneline --al --decorate"
npm install jslint -g
```
