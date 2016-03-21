# Linux Configuration

Configuration steps, scripts and tools i use on linux machines. Feel free to skip any steps that don't work for you or add steps if you think something is missing.

I assume you are setting up a physical machine by booting a DVD with the [Ubuntu Server 64 bit ISO](http://www.ubuntu.com/download/server). If you are setting up a virtual machine you really should use vagrant and the steps in [Devops](../Devops/README.md)

## Basic Install

Boot ISO
  - Select "English"
  - Select “Install Ubuntu Server”
  - Select "English"
  - Select  "United States"
  - For “Detect keyboard layout?” choose No
  - Select “English (US)”
  - Select “English (US)” again
  - For Hostname: you can use "ubuntu"
  - For Full name you can use "Ubuntu User"
  - For Username "ubuntu"
  - Enter your password twice
  - For “Encrypt your home directory?” choose No
  - Answer if time zone is correct
  - For “Partitioning method” choose “Guided - use entire disk and set up LVM”
  - Select the only disk partition available
  - For “Write the changes to disks and configure LVM?” choose Yes
  - Press Enter to accept the max amount of volume group to use for guided partitioning.
  - For “Write the changes to disks?” choose Yes
  - Press Enter to leave HTTP proxy blank
  - Select “No Automatic updates”
  - If you plan to ssh into the server, select “OpenSSH server” and press Enter
  - For “Install the GRUB boot loader to the master boot record?” choose Yes
  - Select Continue

## Configure ssh Identity

On you development machine run the following from a bash shell to generate a certificate

```
# when prompted for a filename enter server-access-key.pem
# when prompted for a password press enter to leave blank
$ ssh-keygen -t rsa -b 2048 -v
$ cd ~/.ssh/

# you can enter . for all prompts except email
# you must enter an email address when prompted
$ openssl req -x509 -key server-access-key.pem -nodes -days 3650 -newkey rsa:2048 -out server-access-cert.pem
$ openssl x509 -in server-access-cert.pem -noout -pubkey >server-access-public-key.pem

# remove this file since you will never use it
$ rm server-access-key.pem.pub

# copy public key to machine-config
# you will be prompted for the password
$ scp -P 2222 server-access-public-key.pem ubuntu@127.0.0.1:~/server-access-public-key.pem
```

On the server run the following commands

```
$ mkdir ~/.ssh
$ chmod 700 ~/.ssh
$ ssh-keygen -i -m PKCS8 -f ~/server-access-public-key.pem >~/.ssh/authorized_keys
$ rm ~/server-access-public-key.pem
```

Now you should be able to ssh into your server from your development machine using the following command with getting a password prompt

```
ssh ubuntu@<hostname> -i ~/.ssh/server-access-key.pem
```

## Enable passwordless sudo (Vagrant has it why can't we)

Run the following command

```
sudo visudo
```

Append the following line to the end of the file

```
ubuntu ALL=(ALL) NOPASSWD: ALL
```

## Setting up a Node server

SSH and run the following commands to install node and nginx

```
$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
$ sudo add-apt-repository "ppa:nginx/stable" --yes
$ sudo apt-get update
$ sudo apt-get install -y nodejs
$ sudo apt-get install -y nginx
$ sudo npm install -g n
$ sudo n stable
$ sudo apt-get install -y git
$ sudo stop nginx
$ sudo vim /etc/nginx/sites-enabled/default
```

If you have an SSL certificate, then let nginx manage it and
redirect all http traffic to https before proxying to node.

Replace the contents of /etc/nginx/sites-enabled/default with
the following

```
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# http://wiki.nginx.org/Pitfalls
# http://wiki.nginx.org/QuickStart
# http://wiki.nginx.org/Configuration
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# HTTP server
server {
  listen 		80 default;
  server_name 	*.seank.com;
  return		301 https://$server_name$request_uri;
}

# HTTPS server
server {
  listen 443;
  ssl on;

  ssl_certificate /etc/ssl/certs/wildcard.seank.com.chained.crt;
  ssl_certificate_key /etc/ssl/private/wildcard.seank.com.key;

  server_name *.seank.com;

  # Proxy pass-though to the local node server
  location / {
    proxy_pass https://127.0.0.1:4000/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_connect_timeout       300;
    proxy_send_timeout          300;
    proxy_read_timeout          300;
    send_timeout                300;
  }
}
```

If you don't have SSL then lets use something simpler.

Replace the contents of /etc/nginx/sites-enabled/default with
the following

```
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# http://wiki.nginx.org/Pitfalls
# http://wiki.nginx.org/QuickStart
# http://wiki.nginx.org/Configuration
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# HTTP server
server {
  listen 		80 default;
  server_name 	*.seank.com;

  # Proxy pass-though to the local node server
  location / {
    proxy_pass http://127.0.0.1:4000/;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_connect_timeout       300;
    proxy_send_timeout          300;
    proxy_read_timeout          300;
    send_timeout                300;
  }
}
```

Now setup the node server

```
$ sudo chown -R root:root /etc/nginx/sites-available/default
$ sudo mkdir /var/www/nodeserver
$ vim /var/www/nodeserver/app.js
```

Paste the following

```
const http = require('http');

const port = 4000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World From Node JS\n');
}).listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
```

Now make it a service

```
$ sudo chown -R $(whoami):www-data /var/www
$ sudo chmod -R 750 /var/www
$ sudo vim /etc/init/nodeserver.conf
```

Paste the following for /etc/init/nodeserver.conf

```
#upstart
description "node.js server"
author      "Seank"

start on runlevel [2345]
stop on runlevel [016]

respawn
respawn limit 7 60

setuid www-data
setgid www-data
chdir /var/www/nodeserver
exec /usr/local/bin/node app.js >> /var/log/nodeserver.log 2>> /var/log/nodeserver.err
```

Now configure logrotate to handle the logs

```
$ sudo chown $(whoami):root /etc/init/nodeserver.conf
$ sudo chmod 744 /etc/init/nodeserver.conf
$ sudo vim etc/logrotate.d/nodeserver
```

Paste the following

```
/var/log/nodeserver.log {
  daily
  missingok
  size 100k
  rotate 7
  compress
  delaycompress
  notifempty
  create 0764 www-data www-data
  nomail
  prerotate
    initctl stop nodeserver >/dev/null 2>&1
  endscript
  postrotate
    initctl start nodeserver >/dev/null 2>&1
  endscript
}

/var/log/nodeserver.err {
  daily
  missingok
  size 1
  rotate 7
  compress
  delaycompress
  notifempty
  create 0764 www-data www-data
  mail home@seank.com
  mailfirst
  prerotate
    initctl stop nodeserver >/dev/null 2>&1
  endscript
  postrotate
    initctl start nodeserver >/dev/null 2>&1
  endscript
}
```

Create logs and start services

```
$ sudo touch /var/log/nodeserver.log
$ sudo touch /var/log/nodeserver.err
$ sudo chown www-data:www-data /var/log/nodeserver.*
$ sudo start nodeserver
$ sudo start nginx
```

## Setting up a MySQL server

Coming soon

## Setting up a MongoDB server

Coming soon
