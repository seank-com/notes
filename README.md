# dev-mac-config
==============

Configuration steps, scripts and tools i use on mac machines.

### Setting up your development environment

- Install [iTerm2](https://www.iterm2.com/)
- Install [Homebrew](http://brew.sh/)
- Install [Node](http://nodejs.org/)
- Install Git and get ready to install nvm (launch iTerm2)
```
cd ~/
brew install git
touch .bashrc
exit
```
- Install [Node Version Manager](https://github.com/creationix/nvm)
- Install [Atom](https://atom.io/) (or your favorite ediotr)
- Configure Git and Bash (launch iTerm2)
```bash
# update command below with your real name
git config --global user.name "Your Name Here"

# update command below with your real email
git config --global user.email your_email@example.com

# use which to find the path to your favorite editor
which atom

# update command below with path to your favorite editor
git config --global core.editor "atom --wait"

# typical settings
git config --global color.ui auto
git config --global push.default simple

# adds lga command to git (try it, you'll like it)
git config --global alias.lga "log --graph --oneline --all --decorate"

# install jslint
sudo npm install jslint -g

cd ~/
touch .bash_profile
atom .bash_profile .bashrc
```
Edit .bash_profile (see [.bash_profile vs .bashrc](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html) for details)
```
[[ -s ~/.bashrc ]] && source ~/.bashrc
```
Edit .bashrc (nvm will write some of this during install)
```
export NVM_DIR=~/.nvm
source $NVM_DIR/nvm.sh
[ -r $NVM_DIR/bash_completion ] && . $NVM_DIR/bash_completion
```
- Configure Atom
  - Goto Atom | Preferences
  - Got Install Tab
  - Enter merge-conflicts and press Packages
  - Install merge-conflicts package

If you want to unset any git config commands you can use the following command
```
git config --global --unset-all core.editor
```
