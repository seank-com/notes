# Windows Configuration

Configuration steps, scripts and tools i use on windows machines. Feel free to skip any steps that don't work for you or add steps if you think something is missing.

### Setting up your development environment

1. Install [Chrome](https://www.google.com/chrome/)
2. Install [Node](http://nodejs.org/)
3. Install [Visual Studio Code](https://code.visualstudio.com/Download)
4. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
5. Install [Git](https://git-scm.com/)

  - Select Components

    *You can uncheck all if you'd like*

  - Start Menu Folder

    *default is fine*

  - Select "Use Git and optional Unix tools from the Windows Command Prompt"

    *We will remove the paths later (if you were worried)*
  
  - Select "Use the OpenSSL library"

  - Select "Checkout Windows-style, commit Unix-style line endings"

  - Select "Use Windows' default console window"

    *On Windows 10 it's not as bad as the description makes it sound*

  - Uncheck "Enable Git Credential Manager"

    *we'll be setting up ssh keys*

6. Launch an elevated command prompt

  (Press Win-R, type cmd, click OK, right click icon on taskbar, right click 'Command Prompt', right click 'Run as administrator')

  ```
  cd %USERPROFILE%
  md Bin
  md Development
  atom Bin\Init.cmd Bin\cmds.lst
  ```

  For Init.cmd put the following

  ```cmd
@echo off
set PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\Git\mingw64\bin;C:\Program Files\Git\usr\bin;C:\Users\v-seakel\AppData\Local\Programs\Microsoft VS Code\bin;%~dp0
if exist "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\Tools\VsDevCmd.bat" call "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\Tools\VsDevCmd.bat"
alias -f "%USERPROFILE%\Bin\cmds.lst"
pushd "%USERPROFILE%\Development"
  ```

  Copy alias.exe into %USERPROFILE%\Bin if you haven't already.

  For cmds.lst put the following

  ```
  home pushd "%USERPROFILE%\Desktop"
  self pushd "%USERPROFILE%"
  bin  pushd "%USERPROFILE%\Bin"
  dev  pushd "%USERPROFILE%\Development"
  ```

8. Create a shortcut on your desktop with the following Target

  Right click on your desktop and select New | Shortcut

  For the location of the item put the following

  ```
  %ComSpec% /k "%USERPROFILE%\Bin\Init.cmd"
  ```

  Name it Dev Shell or whatever is easy to remember.

  Right click the icon and select Properties.
  Click the Advanced button and check 'Run as administrator'

9. Remove paths from system settings

  From Win-Pause | Advanced system settings | Environment Variables..., adjust the PATH variable as follows

  double click PATH under User variables for <username> and remove

  ```
  C:\Users\<username>\AppData\Roaming\npm;
  C:\Users\<username>\AppData\Local\atom\bin;
  C:\Program Files (x86)\Microsoft VS Code\bin;
  ```

  double click PATH under System variables and remove

  ```
  C:\Program Files\nodejs\;
  C:\Program Files\Git\cmd;
  C:\Program Files\Git\mingw64\bin;
  C:\Program Files\Git\usr\bin;
  C:\HashiCorp\Vagrant\bin;
  ```

10. Launch the dev window from the shortcut

  configure git with the following commands

  ```
  git config --global user.name "Your Name Here"
  git config --global user.email "your_email@example.com"
  git config --global core.editor "code --wait"
  git config --global color.ui auto
  git config --global push.default simple
  git config --global alias.lga "log --graph --oneline --all --decorate"
  git config --global core.autocrlf true
  git config --global core.safecrlf true
  ```  

11. Launch Git bash

  Press the Win key and type 'git' right click Git Bash and select pin to taskbar then click the button on the taskbar

  Setup ssh keys for github with the following commands

  ```bash
  $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
  Enter passphrase (empty for no passphrase): [Press enter]
  Enter same passphrase again: [Press enter]
  $ eval "$(ssh-agent -s)"
  $ ssh-add ~/.ssh/id_rsa
  $ clip < ~/.ssh/id_rsa.pub
  ```

12. Goto [Github ssh settings](https://github.com/settings/ssh)
  - Click New SSH key
  - Enter a name for your machine
  - Right click in key field and select Paste
  - Click Add SSH key

13. Update hosts file

  Enter the following command in your dev window

  ```
  code C:\Windows\System32\drivers\etc\hosts
  ```
  add the following line to the end
  ```
  127.0.0.1 local.<yourdomainname>.com
  ```
