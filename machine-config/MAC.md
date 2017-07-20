# MAC Configuration

Configuration steps, scripts and tools i use on mac machines. Feel free to skip any steps that don't work for you or add steps if you think something is missing.

### Setting up your development environment

1. Install [XCode](https://developer.apple.com/xcode) then launch it to complate installation
2. Install [Homebrew](http://brew.sh/)
3. While in the terminal console run the following:

  ```bash
  $ brew install git
  $ brew install node
  $ brew install brew-cask-completion
  $ brew cask install iterm2
  $ brew cask install atom
  $ touch .bash_profile
  $ touch .bashrc
  $ mkdir ~/Development
  $ atom .bash_profile .bashrc & exit
  ```
4. In ```atom``` 
  - Goto Atom | Preferences | Install
    - Enter merge-conflicts and press Packages
    - Install merge-conflicts package
    - repeat for find-selection, sort-lines & atom-mermaid
  - Goto Atom | Preferences | Open Config Folder
    - Click keymap.cson and append the following    
      ```coffee
      '.editor':
        'ctrl-alt-up': 'editor:add-selection-above'
        'ctrl-alt-down': 'editor:add-selection-below'

      'atom-text-editor':
        'alt-cmd-j': 'find-selection:find-previous-casesensitive'
        'alt-cmd-k': 'find-selection:find-next-casesensitive'
      ```
  
4. Edit .bash_profile (see [.bash_profile vs .bashrc](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html) for details)
  ```bash
  [[ -s ~/.bashrc ]] && source ~/.bashrc
  ```
5. Edit .bashrc (nvm will write some of this during install)

  ```bash
  for file in /usr/local/etc/bash_completion.d/* ; do
    source "$file"
  done

  GIT_PS1_SHOWDIRTYSTATE=true
  GIT_PS1_SHOWSTASHSTATE=true
  GIT_PS1_SHOWUNTRACKEDFILES=true
  GIT_PS1_HIDE_IF_PWD_IGNORED=true
  GIT_PS1_SHOWUPSTREAM="verbose"
  PS1='\[\e[0;36m\]\w\[\e[0;32m\]$(__git_ps1 " (%s)")\n\[\e[1;31m\]\t\[\e[0m\] \$ '

  export GEM_HOME=~/.gem
  export GEM_PATH=~/.gem
  export PATH="/usr/local/sbin:$PATH:~/.gem/bin"

  alias ll='ls -AlF'
  alias ls='ls -AF'

  help()
  {
    man -t $1 | open -f -a /Applications/Preview.app
  }

  where()
  {
    find / -name $1 2>/dev/null
  }

  newmac()
  {
    # http://en.wikipedia.org/wiki/MAC_address#Address_details
    ifconfig en1 ether `echo "$(echo -n fc ; openssl rand -hex 5)" | sed 's/\(..\)/\1:/g; s/.$//'`
  }

  repostati()
  {
    find . -maxdepth 1 -mindepth 1 -type d -exec sh -c '(echo {} && cd {} && git status -s && echo)' \;
  }
  
  vs()
  {
    open /Applications/Visual\ Studio.app
  }

  cd ~/Development
  ```

6. Launch iTerm2
  - Goto iTerm | Preferences | Profiles | Window
    - Adjust Transparency
  - Goto iTerm | Preferences | Profiles | Terminal
    - Check Unlimited scrollback
  
  ```bash
  # Must have bro pages
  $ gem install bropages
  
  # Other useful tools
  $ brew cask install android-file-transfer
  $ brew cask install dropbox
  $ brew cask install tresorit
  
  $ brew cask install google-chrome
  $ brew cask install microsoft-office
  $ brew cask install visual-studio-code
  $ brew cask install visual-studio

  # configure git
  $ git config --global user.name "Your Name Here"
  $ git config --global user.email your_email@example.com
  $ git config --global color.ui auto
  $ git config --global push.default simple

  # adds git lga command (try it, you'll love it)
  $ git config --global alias.lga "log --graph --oneline --all --decorate"

  # if you installed atom
  $ git config --global core.editor "atom --wait"

  # If you want to unset any git config commands above
  # you can use the following command
  #$ git config --global --unset-all core.editor

  # generate ssh keys
  $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
  Enter passphrase (empty for no passphrase): [Press enter]
  Enter same passphrase again: [Press enter]
  $ eval "$(ssh-agent -s)"
  $ ssh-add ~/.ssh/id_rsa
  $ pbcopy < ~/.ssh/id_rsa.pub

  # To show the full path at the top of the finder windows
  $ defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
  $ osascript -e 'tell app "Finder" to quit'

  # launch Visual Studio
  $ vs
  ```

11. Goto [Github ssh settings](https://github.com/settings/ssh)
  - Click New SSH key
  - Enter a name for your machine
  - Right click in key field and select Paste
  - Click Add SSH key

7. From ```Visual Studio```
  - Goto VisualStudioCommunity | Extensions
    - Click Gallery tab
    - Enter 'MVVMCross' into the search box

EDIT HERE

13. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
  - Download [Windows 10 ISO](https://www.microsoft.com/en-us/software-download/windows10ISO) - *If you want to run a Windows 10 vm (useful for building Windows Phone versions of Cordova)*
14. Install [Vagrant](https://www.vagrantup.com/downloads.html)
15. Install [Android File Transfer](https://www.android.com/filetransfer/)
16. Update hosts file
  ```bash
  $ atom /etc/hosts
  ```
  $ add the following line to the end
  ```
  127.0.0.1 local.<yourdomainname>.com
  ```
17. Install [OSXFUSE](http://osxfuse.github.io/)
18. Install SSHFS
  ```bash
  $ brew install homebrew/fuse/sshfs
  ```
19. Goto System Preferences | Mission Control and change Show Desktop and Show Dashboard key board shortcuts (F11 is needed to "Step In" when debugging in Chrome)
20. Install [Arduino IDE](https://www.arduino.cc/en/Main/Software)
21. Install [USB to UART driver](https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx)
