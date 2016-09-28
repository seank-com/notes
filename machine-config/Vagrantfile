# -*- mode: ruby -*-
# vi: set ft=ruby :

# https://docs.vagrantup.com.
Vagrant.configure(2) do |config|
  config.vm.box = "hashicorp/precise64"
  # since we are standing up a webserver forward 8080
  config.vm.network "forwarded_port", guest: 80, host: 8080
  # disable folder sharing since we don't have this in the cloud
  config.vm.synced_folder ".", "/vagrant", disabled: true
  # add packages that come with ubuntu server when installed in the cloud
  config.vm.provision "shell", inline: "apt-get update"
  config.vm.provision "shell", inline: "apt-get install -y curl"
  config.vm.provision "shell", inline: "apt-get install -y python-software-properties"
  config.vm.provision "shell", inline: "apt-get install -y vim"
  config.vm.provider :virtualbox do |vb|
    # Azure's A1 server has 1 cpu and 768MB of memory
    # this is ideal for most node services
    vb.cpus = 1
    vb.memory = "768"
  end
end
