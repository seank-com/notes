These instructions are for the [Thin Mini PC with Intel Celeron j1900 processor
onboard, quad core 2.42 GHz, 8G ram 128G SSD 300M WIFI, dual nic 720P/1080P HD
video dual LAN dual HDMI COM Mini Pc](https://www.amazon.com/gp/product/B01M3WPT91/)
that I got from Amazon for my home router.

I was originally going to install pfSense on it as it indicated that it was
supported. However I found out that [Broadcom Wifi board is not
support](https://www.reddit.com/r/freebsd/comments/4g1hdh/broadcom_diver_wmib275n_half_card_wifi/)
in pfSense and so it would not work for my purposes. Before packing it up and
sending it back I decided to look and see if ubuntu could be coaxed into doing
the job. I found [two](https://help.ubuntu.com/community/Router#Dedicated_Hardware) [pages](https://help.ubuntu.com/community/EasyRouter) that discussed using
ubuntu as a router. As well as pages that indicated that the [broadcom
WiFi](http://askubuntu.com/questions/55868/installing-broadcom-wireless-drivers)
and a [tethered](http://askubuntu.com/questions/724238/connection-to-the-internet-via-smartphone-usb-tethering)
[android](http://www.junauza.com/2012/07/how-to-tether-android-smartphone-to.html)
would be supported.

So without further ado, here are the steps I took to standup an Ubuntu router.
Your mileage may vary and I certainly hope it is easier for you than it was for
me.

- Follow the steps to [create a bootable USB
stick](https://www.ubuntu.com/download/desktop/create-a-usb-stick-on-macos) with
the latest version of Ubuntu Desktop. _I had to first Fat32 format my usb stick
before it would show up in UNetbootin. The only way I know how to do this on a
Mac is to use Windows like so:_
  - Click eject on the thumbdrive from the finder.
  - Launch VirtualBox and boot your Windows 10 vm _(**Note:** it might be
    necessary to install thet [extension
    pack](https://www.virtualbox.org/wiki/Downloads) if you haven't done so
    already)_
  - Select your device from the USB Device menu under the Devices menu
  - Open Explorer in the Windows VM and right click the thumbdrive and select
  Format.
  - Shutdown your vm
- Inset USB stick in router hardware and boot. To understand the choices below,
  refer to the [Ubuntu Installation
  Guide](https://help.ubuntu.com/lts/installation-guide/)
- Select either 'Try Ubuntu without installing' and then double click the
  'Install Ubuntu' icon on the desktop or select 'Install Ubuntu'
- Choose English
- Check 'Download updates while installing Ubuntu' but leave 'Install
  third-party software for graphics and Wi-Fi hardware, Flash, MP3 and other
  media' unchecked
- Check 'Use LVM with the new Ubuntu installation'
- Select you time zone
- Select your keyboard layout
- Choose a user name and password
- Boot Ubuntu and sign in
- Press Ctrl-Alt-T and enter the following commands

  ```
  sudo add-apt-repository ppa:webupd8team/atom
  sudo apt-get update
  sudo apt-get install atom
  sudo atom /etc/lihtdm/lightdm.conf.d/50-no-guest.conf
  ```
- enter the following

  ```
  [SeatDefaults]
  allow-guest=false

  ```
- Select 'Edit Connections' from the network menu
- Click Add
- Choose Wi-Fi
- Uncheck 'Automatically connect to this network when it is available'
- Enter SSID
- Choose Hotspot Mode
- For Device use 20:E5:2A:FE:AB:29
- For Security select 'WPA & WPA2 Personal'
- Enter password (must be long enough or Save button will be disabled)
- For IPv4 Settings select 'Shared to other computers' for Method
- Click Save
- Close Edit Connections
- Select 'Create New Wi-Fi Network...' from network menu
- Under connect choose 'Wi-Fi connection 1' and press Create
