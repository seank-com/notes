# dev-mac-config

Configuration steps, scripts and tools i use on mac machines.

### Setting up your development environment

- Install [Chrome](http://www.google. com/chrome/)
- Install [iTerm2](https://www.iterm2.com/)
- Install [Homebrew](http://brew.sh/)
- Find your username, take ownership of usr/local and install Git and Node (launch iTerm2)
```bash
$ cd ~/
$ whoami
$ sudo chwon -R <username> /usr/local
$ sudo chwon -R <username> /Users/<username>
$ brew install git
$ cd /usr/local/bin/
$ ln -s ../Cellar/git/2.5.0//libexec/git-core/git-gui git-gui
$ cd ~/
$ brew install node
$ touch .bashrc
$ exit
```
- Install [Node Version Manager](https://github.com/creationix/nvm) (optional)
- Install [Atom](https://atom.io/) (or your favorite ediotr)
- Install [P4Merge](http://www.perforce.com/product/components/perforce-visual-merge-and-diff-tools) (helpful for diff and merge)
- Configure Git and Bash (launch iTerm2)
```bash
# update command below with your real name
$ git config --global user.name "Your Name Here"

# update command below with your real email
$ git config --global user.email your_email@example.com

# setup atom as your editor for git commits and such
$ git config --global core.editor "atom --wait"

# setup p4merge as a visual diff and merge tool
$ git config --global diff.tool p4mergetool
$ git config --global difftool.p4mergetool.cmd "/Applications/p4merge.app/Contents/Resources/launchp4merge \$LOCAL \$REMOTE"
$ git config --global merge.tool p4mergetool
$ git config --global mergetool.p4mergetool.cmd "/Applications/p4merge.app/Contents/Resources/launchp4merge \$PWD/\$BASE \$PWD/\$REMOTE \$PWD/\$LOCAL \$PWD/\$MERGED"
$ git config --global mergetool.p4mergetool.trustExitCode false
$ git config --global mergetool.keepBackup false

# typical settings
$ git config --global color.ui auto
$ git config --global push.default simple

# adds lga command to git (try it, you'll like it)
$ git config --global alias.lga "log --graph --oneline --all --decorate"

# install jslint
$ npm install jslint -g

# install node-inspector
$ npm install node-inspector -g

$ cd ~/
$ curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh -o .git-prompt.sh
$ curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o .git-completion.sh
$ touch .bash_profile
$ atom .bash_profile .bashrc
```
Edit .bash_profile (see [.bash_profile vs .bashrc](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html) for details)
```bash
[[ -s ~/.bashrc ]] && source ~/.bashrc
```
Edit .bashrc (nvm will write some of this during install)
```bash
export NVM_DIR=~/.nvm
source $NVM_DIR/nvm.sh
[ -r $NVM_DIR/bash_completion ] && . $NVM_DIR/bash_completion
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
}
```
- Follow the instructions on github for [setting up ssh](https://help.github.com/articles/generating-ssh-keys/)
- Configure Atom
  - Goto Atom | Preferences
  - Got Install Tab
  - Enter merge-conflicts and press Packages
  - Install merge-conflicts package
  - repeat for file-types, find-selection, jsonlint, & sort-lines
- Restart iTerm window
```bash
$ nvm install node
$ nvm install iojs
$ nvm use stable
```
*If you want to unset any git config commands you can use the following command*
```bash
$ git config --global --unset-all core.editor
```

Atom configuration (see [discussion](https://github.com/atom/atom/issues/1365#issuecomment-43124097) for details)

```
'.editor':
  'ctrl-alt-up': 'editor:add-selection-above'
  'ctrl-alt-down': 'editor:add-selection-below'
```
