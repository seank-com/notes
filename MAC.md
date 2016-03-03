# MAC Configuration

Configuration steps, scripts and tools i use on mac machines. Feel free to skip any steps that don't work for you or add steps if you think something is missing.

### Setting up your development environment

- Install [Chrome](http://www.google.com/chrome/) and configure
- Install [iTerm2](https://www.iterm2.com/) and launch
  - Goto iTerm | Preferences | Profiles | Window
    - Adjust Transparency
  - Goto iTerm | Preferences | Profiles | Terminal
    - Check Unlimited scrollback
- Install [Homebrew](http://brew.sh/)
- Install [XCode](https://developer.apple.com/xcode)
- Install [Atom](https://atom.io/)
  - Goto Atom | Preferences | Install
    - Enter merge-conflicts and press Packages
    - Install merge-conflicts package
    - repeat for file-types, find-selection, jsonlint, & sort-lines
  - Goto Atom | Preferences | Open Config Folder
    - Click config.cson and edit so it looks generally like this
    ```coffee
    "*"
      core: {}
      editor:
        invisibles: {}
      "exception-reporting":
        userId: "<don't change what atom has here>"
      "file-types":
        cdo: "source.json"
      jsonlint:
        hideOnNoErrors: true
      welcome:
        showOnStartup: false
    ```
    - Click keymap.cson and append the following
    ```coffee
    '.editor':
      'ctrl-alt-up': 'editor:add-selection-above'
      'ctrl-alt-down': 'editor:add-selection-below'
    
    'atom-text-editor':
      'alt-cmd-j': 'find-selection:find-previous-casesensitive'
      'alt-cmd-k': 'find-selection:find-next-casesensitive'
    ```
- Install [VisualStudio Code](https://code.visualstudio.com/)
- Install [P4Merge](http://www.perforce.com/product/components/perforce-visual-merge-and-diff-tools) (helpful for diff and merge)
- Take ownership of usr/local and install Git and Node (from iTerm2 console)
```bash
$ cd ~/
$ sudo chown -R $(whoami) /usr/local
$ sudo chown -R $(whoami) /Users/$(whoami)

# instal git
$ brew install git

# install git gui command
$ cd /usr/local/bin/
$ ln -s ../Cellar/git/2.5.0/libexec/git-core/git-gui git-gui

# install node
$ cd ~/
$ brew install node

# fix permissions so npm install -g works without sudo
$ sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# install simple node version manager
$ npm install -g n
$ n stable

# configure git
$ git config --global user.name "Your Name Here"
$ git config --global user.email your_email@example.com
$ git config --global color.ui auto
$ git config --global push.default simple

# adds git lga command (try it, you'll love it)
$ git config --global alias.lga "log --graph --oneline --all --decorate"

# if you installed atom
$ git config --global core.editor "atom --wait"

#if you installed p4merge
$ git config --global diff.tool p4mergetool
$ git config --global difftool.p4mergetool.cmd "/Applications/p4merge.app/Contents/Resources/launchp4merge \$LOCAL \$REMOTE"
$ git config --global merge.tool p4mergetool
$ git config --global mergetool.p4mergetool.cmd "/Applications/p4merge.app/Contents/Resources/launchp4merge \$PWD/\$BASE \$PWD/\$REMOTE \$PWD/\$LOCAL \$PWD/\$MERGED"
$ git config --global mergetool.p4mergetool.trustExitCode false
$ git config --global mergetool.keepBackup false

# install jslint
$ npm install jslint -g

# install node-inspector
$ npm install node-inspector -g

# if you get an error on the above do this and retry
$ sudo xcode-select -s /Application/Xcode.app/Contents/Developer

# download prompt
$ curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh -o .git-prompt.sh
$ curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o .git-completion.sh
$ touch .bash_profile
$ touch .bashrc
$ atom .bash_profile .bashrc
```
Edit .bash_profile (see [.bash_profile vs .bashrc](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html) for details)
```bash
[[ -s ~/.bashrc ]] && source ~/.bashrc
```
Edit .bashrc (nvm will write some of this during install)
```bash
source ~/.git-completion.sh
source ~/.git-prompt.sh
GIT_PS1_SHOWDIRTYSTATE=true
GIT_PS1_SHOWSTASHSTATE=true
GIT_PS1_SHOWUNTRACKEDFILES=true
GIT_PS1_HIDE_IF_PWD_IGNORED=true
GIT_PS1_SHOWUPSTREAM="verbose"
PS1='\[\e[0;36m\]\w\[\e[0;32m\]$(__git_ps1 " (%s)")\n\[\e[1;31m\]\t\[\e[0m\] \$ '

alias ll='ls -AlF'
alias ls='ls -AF'
alias p4merge='/Applications/p4merge.app/Contents/Resources/launchp4merge'

help()
{
  man -t $1 | open -f -a /Applications/Preview.app
}

where()
{
  find / -name $1 2>/dev/null
}

code()
{
  VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args "$@";
}
```
- Restart iTerm window
```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
Enter passphrase (empty for no passphrase): [Press enter]
Enter same passphrase again: [Press enter]
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa
$ pbcopy < ~/.ssh/id_rsa.pub
```
- Goto [Github ssh settings](https://github.com/settings/ssh)
  - Click New SSH key
  - Enter a name for your machine
  - Right click in key field and select Paste
  - Click Add SSH key
- To show the full path at the top of the finder windows run the following from the iTerm window and restart the Finder from the dock
```bash
$ defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES
$ osascript -e 'tell app "Finder" to quit'
```

*If you want to unset any git config commands you can use the following command*
```bash
$ git config --global --unset-all core.editor
```
