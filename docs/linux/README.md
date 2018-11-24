To clean up the boot partition you need to delete old images. First you need to figure out what image you are booting.

```bash
$ uname -a
```

Then figure out how many images need to be cleaned up

```bash
$ cd /boot
$ du -sk * | sort -n
```

From there tar up the unused images and then remove them

```bash
$ sudo tar -cvf ~seank/boot.tar *4.4.0-104-generic *4.4.0-109-generic ...
$ sudo rm -rf *4.4.0-104-generic *4.4.0-109-generic ...
```

Now you can reboot and finishing installing if necessary

```bash
$ sudo reboot
$ sudo apt-get -f install
$ sudo reboot
```

Then cleanup

```bash
$ sudo apt-get autoremove
$ dpkg -l | grep linux-image
$ sudo dpkg --purge linux-image-4.4.0-104-generic
$ sudo dpkg --purge linux-image-extra-4.4.0-104-generic
$ sudo dpkg --purge linux-image-4.4.0-109-generic
$ sudo dpkg --purge linux-image-extra-4.4.0-109-generic
...
$ sudo rm ~seank/boot.tar
```