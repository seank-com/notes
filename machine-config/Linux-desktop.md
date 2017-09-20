# Linux  Desktop Configuration

Configuration steps, scripts and tools i use on linux machines. Feel free to skip any steps that don't work for you or add steps if you think something is missing.

I assume you are setting up a physical machine by booting a DVD with the [Ubuntu Server 64 bit ISO](http://www.ubuntu.com/download/server). If you are setting up a virtual machine either locally or in the cloud, see [Cloud configuration](Cloud.md)

## Basic Install

### Setting up your development environment

1. Open a terminal console (press ```super``` key and type ```term```) then run the following:

  ```bash
  $ sudo apt-get update
  $ sudo apt-get upgrade
  $ sudo apt-get dist-upgrade

  # install git
  $ sudo apt-get install git-gui

  # install Atom
  $ sudo add-apt-repository ppa:webupd8team/atom
  $ sudo apt-get update
  $ sudo apt-get install atom

  # install Bro Pages (pay attention to any warning about updating your path)
  $ sudo apt-get install ruby-dev
  $ gem install --user-install bropages

  $ mkdir ~/Development
  $ atom .bashrc & exit
  ```

2. In ```atom```
  - Goto Edit | Preferences | Install
    - Enter merge-conflicts and press Packages
    - Install merge-conflicts package
    - repeat for find-selection, sort-lines & atom-mermaid
  - Goto Edit | Preferences | Keybindings | your keymap file
    - Append the following    
      ```coffee
      '.editor':
        'ctrl-alt-up': 'editor:add-selection-above'
        'ctrl-alt-down': 'editor:add-selection-below'

      'atom-text-editor':
        'alt-cmd-j': 'find-selection:find-previous-casesensitive'
        'alt-cmd-k': 'find-selection:find-next-casesensitive'
      ```

3. Edit .bashrc to be something like the following

  ```bash

  # don't run if not on host
  if [ $HOME != /home/seank ]; then
    exit 0
  fi

  export PATH="$PATH:~/.gem/ruby/2.3.0/bin"

  # If not running interactively, don't do anything
  case $- in
      *i*) ;;
        *) return;;
  esac

  # don't put duplicate lines or lines starting with space in the history.
  HISTCONTROL=ignoreboth

  # append to the history file, don't overwrite it
  shopt -s histappend

  # for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
  HISTSIZE=1000
  HISTFILESIZE=2000

  # check the window size after each command and, if necessary,
  # update the values of LINES and COLUMNS.
  shopt -s checkwinsize

  # make less more friendly for non-text input files, see lesspipe(1)
  [ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

  # set a fancy prompt (non-color, unless we know we "want" color)
  case "$TERM" in
      xterm-color|*-256color) color_prompt=yes;;
  esac

  if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
  	# We have color support; assume it's compliant with Ecma-48
  	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
  	# a case would tend to support setf rather than setaf.)
  	color_prompt=yes
  else
  	color_prompt=
  fi

  GIT_PS1_SHOWDIRTYSTATE=true
  GIT_PS1_SHOWSTASHSTATE=true
  GIT_PS1_SHOWUNTRACKEDFILES=true
  GIT_PS1_HIDE_IF_PWD_IGNORED=true
  GIT_PS1_SHOWUPSTREAM="verbose"

  if [ "$color_prompt" = yes ]; then
      PS1='\[\033[01;34m\]\w \[\033[00m\]$(__git_ps1 " (%s)")\n\[\033[01;32m\]\u@\h\[\033[00m\]\$ '
  else
      PS1='\w $(__git_ps1 " (%s)")\n\u@\h\$ '
  fi
  unset color_prompt

  # If this is an xterm set the title to user@host:dir
  case "$TERM" in
  xterm*|rxvt*)
      PS1="\[\e]0; \u@\h: \w\a\]$PS1"
      ;;
  *)
      ;;
  esac

  # enable color support of ls and also add handy aliases
  if [ -x /usr/bin/dircolors ]; then
      alias ls='ls --color=auto'
      alias grep='grep --color=auto'
      alias fgrep='fgrep --color=auto'
      alias egrep='egrep --color=auto'
  fi

  # colored GCC warnings and errors
  #export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

  # some more ls aliases
  alias ll='ls -AlF'
  alias la='ls -AF'
  alias l='ls -CF'

  # Add an "alert" alias for long running commands.  Use like so:
  #   sleep 10; alert
  alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

  if ! shopt -oq posix; then
    if [ -f /usr/share/bash-completion/bash_completion ]; then
      . /usr/share/bash-completion/bash_completion
    elif [ -f /etc/bash_completion ]; then
      . /etc/bash_completion
    fi
  fi

  azure-cli()
  {
    docker run --rm -v ${HOME}:/root -it azuresdk/azure-cli-python:latest
  }

  cd ~/Development
  ```

4. Launch a terminal

  ```bash
  # Configure git
  $ git config --global user.name "Your Name Here"
  $ git config --global user.email your_email@example.com
  $ git config --global color.ui auto
  $ git config --global push.default simple
  $ git config --global core.filemode false
  $ git config --global fetch.prune true
  # see http://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/
  $ git config --global core.autocrlf input
  $ git config --global core.safecrlf true

  # adds git lga command (try it, you'll love it)
  $ git config --global alias.lga "log --graph --oneline --all --decorate"

  # if you installed atom
  $ git config --global core.editor "atom --wait"

  # If you want to unset any git config commands above
  # you can use the following command
  #$ git config --global --unset-all core.editor

  # generate ssh keys
  $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  $ eval "$(ssh-agent -s)"
  $ ssh-add ~/.ssh/id_rsa
  $ sudo apt-get install xclip
  $ xclip -sel clip < ~/.ssh/id_rsa.pub
  ```

5. Goto [Github ssh settings](https://github.com/settings/ssh)
  - Click New SSH key
  - Enter a name for your machine
  - Right click in key field and select Paste
  - Click Add SSH key
