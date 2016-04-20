# Cloud Configuration

![alt text](docs/img/cloud.png "There is no cloud")

It doesn't matter if its [Azure](https://azure.microsoft.com/), [AWS](https://aws.amazon.com/), [Rackspace](https://www.rackspace.com/en-us/cloud), [Dreamhost](https://www.dreamhost.com/cloud/) or even local ([Vagrant](https://www.vagrantup.com/)), the pattern is basically the same.
1. Pick a vm configuration and spin it up with an installation of Ubuntu Server.
2. Connect to it via ssh and install the software you need to do the job.
3. Profit.

To get an idea of what is being done for you, refer to the [Linux configuration](Linux.md)

## Pull this repo

Either fork and clone or just clone directly with a command like the following

```
git clone git@github.com:seank-com/machine-config.git
cd machine-config
npm install
```

## Spinning up a server

### Vagrant

Assuming you installed Vagrant and  VirtualBox following the steps for either [Mac](MAC.md) or [Windows](Windows.md) then issue the following commands from the clone of this repo

```
vagrant up
```
