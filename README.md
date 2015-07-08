# dev-mac-config

Configuration steps, scripts and tools i use on mac machines.

### Setting up your development environment

- Install [iTerm2](https://www.iterm2.com/)
- Install [Homebrew](http://brew.sh/)
- Install [Node](http://nodejs.org/)
- Install Git and get ready to install nvm (launch iTerm2)
```bash
$ cd ~/
$ brew install git
$ touch .bashrc
$ exit
```
- Install [Node Version Manager](https://github.com/creationix/nvm)
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
$ sudo -H npm install jslint -g
$ cd ~/
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
```
- Follow the instructions on github for [setting up ssh](https://help.github.com/articles/generating-ssh-keys/)
- Configure Atom
  - Goto Atom | Preferences
  - Got Install Tab
  - Enter merge-conflicts and press Packages
  - Install merge-conflicts package
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
