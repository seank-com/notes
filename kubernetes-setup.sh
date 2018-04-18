#!/bin/sh

sudo nano /boot/
# setup ssh key file
mkdir ~/.ssh/
chmod 700 ~/.ssh
ssh-keygen -i -m PKCS8 -f ~/server-access-public-key.pem >~/.ssh/authorized_keys
rm ~/server-access-public-key.pem

# turn off swap
sudo chmod -x /etc/init.d/dphys-swapfile
sudo swapoff -a
sudo rm /var/swap

# install docker
sudo surl -sSL https://get.docker.com | sh
sudo /etc/init.d/docker start

# install kubeadm
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF >kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
sudo mv kubernetes.list /etc/apt/sources.list.d/
sudo apt-get update
sudo apt-get install -y policykit-1 kubelet kubeadm kubectl
sudo systemctl daemon-reload
sudo systemctl restart kubelet
