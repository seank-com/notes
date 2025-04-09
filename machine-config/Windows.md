# Windows Configuration

Configuration steps, scripts and tools i use on windows machines. Feel free to skip any steps that don't work for you or add steps if you think something is missing.

### Setting up your development environment

1. Install [Chrome](https://www.google.com/chrome/)
2. Install [Dropbox](https://www.dropbox.com/downloading)
3. Install [Visual Studio](https://visualstudio.microsoft.com/downloads/)
4. Install [Visual Studio Code](https://code.visualstudio.com/Download) 
  
  - Check "Register Code as an editor for supported file types"
  
    *If you don't, everything will open in Visual Studio*
  
7. Open an elevated command prompt or powershell and run the following (see [wslinstall](https://aka.ms/wslinstall) 

    ```
    wsl --list --online
    wsl --install -d Ubuntu-22.04
    wsl --install
    # if the above command hangs or fails, follow up with
    wsl --update
    wsl --install -D Ubuntu
    ```

    _**Note: If you need to complete uninstall WSL follow the steps [here](https://www.makeuseof.com/uninstall-wsl-windows/)_

8. Install [PowerToys](https://github.com/microsoft/PowerToys/releases)
9. Install [Node](https://nodejs.org/)
10. Install [Git](https://git-scm.com/)

  - Select Components

    You can uncheck all if you'd like

  - Choosing the default editor used by Git
  
    Select "Use Visual Studio Code as Git's default editor"

  - Adjust the name of the initial branch in new repositories

    Let Git decide

  - Adjusting your PATH environment

    Select "Use Git from the command line and also from 3rd-party software"

    *You can adjust paths later (if you were worried)*
  
  - Choosing the SSH executable
  
    Select "Use bundled OpenSSH"

  - Choosing HTTPS transport backend

    Select "Use the OpenSSL Library"

  - Configure the line ending conversions

    Select "Checkout Windows-style, commit Unix-style line endings"

  - Configuring the terminal emulator to use with Git Bash
  
    Select "Use Windows' default console window"

    *On Windows 10 it's not as bad as the description makes it sound*

  - Choose the default behaviour of 'git pull'
  
    Select "Default (fast-forward or merge)"
  
  - Choose a credential helper
  
    Select "Git Credential Manager Core"

    *we'll be setting up ssh keys in WSL, but it could be helpful elsewhere*
    
   - Configuring extra options
   
     Defaults for file system caching and symbolic links are fine
   
   - Configuring experimental options
   
     Uncheck everything. Experiemental options are for containers

11. Launch an elevated command prompt

  (Press <kbd>Win</kbd>+<kbd>R</kbd>, type `cmd`, click OK, right click icon on taskbar, right click 'Command Prompt', right click 'Run as administrator')

  ```
  cd %USERPROFILE%
  md bin
  md c:\repos
  code bin\init.cmd bin\cmds.lst
  ```

  For Init.cmd put the following

  ```cmd
  @echo off
  set PATH=%PATH%;%~dp0
  if exist "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" -arch=amd64 -host_arch=amd64
  alias -f "%USERPROFILE%\Bin\cmds.lst"
  pushd "c:\repos"
  ```

  _**NOTE:** If you want to adjust paths here, Press <kbd>Win</kbd>+<kbd>Pause</kbd> | Advanced system settings | Environment Variables..., adjust the PATH variables and update them in the above batch file. Previous instructions recommended removing ```C:\Users\<username>\AppData\Roaming\npm;``` from User variables for <username> and ```C:\Program Files\Git\cmd;C:\Program Files\Git\mingw64\bin;C:\Program Files\Git\usr\bin``` from System variables. This will break some Unity features and is no longer advised._

  Copy alias.exe into %USERPROFILE%\Bin if you haven't already.

  For cmds.lst put the following

  ```
  home pushd "%USERPROFILE%\Desktop"
  self pushd "%USERPROFILE%"
  bin  pushd "%USERPROFILE%\Bin"
  dev  pushd "C:\repos"
  ```

12. Launch Windows Terminal click down caret and select Settings then click 'Open JSON file'

    add Dev Shell profile

    ```js
    {
        // Make changes here to the cmd.exe profile.
        "guid": "{2fb4199f-dbbf-47a3-ac82-bd1ee77a8287}",
        "name": "Dev Shell",
        "commandline": "%ComSpec% /k \"%USERPROFILE%\\Bin\\Init.cmd\"",
        "hidden": false
    },
    ```              

    update Ubuntu profile to use colorScheme UbuntuLegit

    ```js
    {
      "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
      "hidden": false,
      "name": "Ubuntu",
      "source": "Windows.Terminal.Wsl",
      "colorScheme": "UbuntuLegit"
    }

    ```

    add UbuntuLegit to schemes

    ```js
    "schemes": [
        {
            "background":  "#2C001E",
            "black":  "#4E9A06",
            "blue":  "#3465A4",
            "brightBlack":  "#555753",
            "brightBlue":  "#729FCF",
            "brightCyan":  "#34E2E2",
            "brightGreen":  "#8AE234",
            "brightPurple":  "#AD7FA8",
            "brightRed":  "#EF2929",
            "brightWhite":  "#EEEEEE",
            "brightYellow":  "#FCE94F",
            "cyan":  "#06989A",
            "foreground":  "#EEEEEE",
            "green":  "#300A24",
            "name":  "UbuntuLegit",
            "purple":  "#75507B",
            "red":  "#CC0000",
            "white":  "#D3D7CF",
            "yellow":  "#C4A000"
        }        
    ],
    ```

    update defaultProfile to point to you faovrite shell

    ```js
    "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",
    ```

13. create ```~/.gitmessage``` and edit in code as follows

  ```

  # Title: Summary, imperative, start upper case, don't end with a period
  # No more than 50 chars. #### 50 chars is here: #

  # Remember blank line between title and body.

  # Body: Explain *what* and *why* (not *how*). Include task ID (Jira issue).
  # Wrap at 72 chars. ################################## which is here: #


  # At the end: Include Co-authored-by for all contributors. 
  # Include at least one empty line before it. Format: 
  # Co-authored-by: name <user@users.noreply.github.com>
  #
  # How to Write a Git Commit Message:
  # https://chris.beams.io/posts/git-commit/
  #
  # 1.Separate subject from body with a blank line
  # 2. Limit the subject line to 50 characters
  # 3. Capitalize the subject line
  # 4. Do not end the subject line with a period
  # 5. Use the imperative mood in the subject line
  # 6. Wrap the body at 72 characters
  # 7. Use the body to explain what and why vs. how

  ```

14. Launch the Windows Terminal and from Ubuntudev window from the shortcut

  configure git with the following commands

  ```bash
  $ git config --global user.name "Your Name Here"
  $ git config --global user.email "your_email@example.com"
  $ git config --global color.ui auto
  $ git config --global push.default simple
  $ git config --global core.filemode false
  $ git config --global fetch.prune true
  $ git config --global pull.rebase true
  # see http://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/
  $ git config --global core.autocrlf input
  $ git config --global core.safecrlf true

  # adds git lga command (try it, you'll love it)
  $ git config --global alias.lga "log --graph --oneline --all --decorate"
  $ git config --global alias.sync "pull --rebase --autostash"

  # If you want to unset any git config commands above
  # you can use the following command
  #$ git config --global --unset-all core.editor

  # configure VS code
  $ git config --global core.editor "code --wait"
  $ git config --global merge.tool vscode
  $ git config --global mergetool.vscode.cmd "code --wait $MERGED"
  $ git config --global diff.tool vscode
  $ git config --global difftool.vscode.cmd "code --wait --diff $LOCAL $REMOTE"

  # copy .gitmessage from machine-config to you home folder
  $ git config --global commit.template ~/.gitmessage

  # generate ssh keys
  $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
  Enter passphrase (empty for no passphrase): [Press enter]
  Enter same passphrase again: [Press enter]
  $ eval "$(ssh-agent -s)"
  $ ssh-add ~/.ssh/id_rsa
  $ clip.exe < ~/.ssh/id_rsa.pub
  ```

15. Goto [Github ssh settings](https://github.com/settings/ssh)
  - Click New SSH key
  - Enter a name for your machine
  - Right click in key field and select Paste
  - Click Add SSH key

16. Setup Git Credential Manager (see [Engineering Hub](https://eng.ms/docs/cloud-ai-platform/devdiv/one-engineering-system-1es/1es-docs/1es-security-configuration/configuration-guides/gcm) for more details)

  From the Windows Terminal click down caret and select Dev Shell

  ```dos
  winget install Git.Git
  git config --global credential.azreposCredentialType oauth
  git config --global credential.msauthUseBroker true
  git config --global credential.msauthUseDefaultAccount true
  ```

  return to Ubuntudev window

  ```bash
  git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
  git config --global credential.https://dev.azure.com.useHttpPath true
  ```

  return to Dev Shell window if you see safe directory errors

  ```dos
  git config --global --add safe.directory '*'
  ```

17. Update hosts file

  Enter the following command in your dev window

  ```
  code C:\Windows\System32\drivers\etc\hosts
  ```
  add the following line to the end
  ```
  127.0.0.1 local.<yourdomainname>.com
  ```

18. In an Ubuntu WSL window

    ```bash
    cd ~
    code .bashrc
    ```

    add the following line to the end of the file

    ```bash
    cd /mnt/c/repos
    ```

    the run

    ```bash
    sudo apt update
    ```

19. Install NVM on WSL and DOS

    https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

20. Install essential [VS Code extensions](../docs/vscode/README.md)

21. Install [my extension](https://github.com/seank-com/number-it)

    Run the following from a command console

    ```dos
    npm install
    npx vsce package
    code --install-extension number-it-0.0.1.vsix
    ```

22. Install [Discord](https://discord.com/)
23. Install [Beyond Compare](https://www.scootersoftware.com/download.php) and follow directions for [configuring](https://www.scootersoftware.com/support.php?zz=kb_vcs#gitwindows) From your Dev shell
24. Install [DisplayFusion](https://www.displayfusion.com/)
25. Install [Unity](https://store.unity.com/)
26. Install [OBS](https://obsproject.com/)
27. Install [Blender](https://www.blender.org/)
28. Install [Stream Deck](https://www.elgato.com/en/stream-deck)

    Click the button-plus icon along the center top (to the left of the gear) to install plugins. In the search enter "barraider" and install "Speed Test" and "World Time"

    ![alt text](../docs/img/StreamDeckPlugins.jpg "Add Plugins")

    Click the gear icon, go to the Profiles tab and click the dropdown to Import

    ![alt text](../docs/img/StreamDeckImport.jpg "Import Settings")

29. Install [VoiceMod](https://www.voicemod.net/)
30. Install [Steam](https://store.steampowered.com/)
31. Install [Docker](https://www.docker.com/get-started/)
