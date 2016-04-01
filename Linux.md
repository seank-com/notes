# Linux Configuration

Configuration steps, scripts and tools i use on linux machines. Feel free to skip any steps that don't work for you or add steps if you think something is missing.

I assume you are setting up a physical machine by booting a DVD with the [Ubuntu Server 64 bit ISO](http://www.ubuntu.com/download/server). If you are setting up a virtual machine either locally or in the cloud, see [Cloud configuration](Cloud.md)

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

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install mysql-server-5.6
```

mysql root password: see 'MySQL Root Password' in LastPass for IT@LearnBIG.com

Open

```bash
sudo vim /etc/mysql/my.cnf
```

comment out line:

```bash
#bind-address           = 127.0.0.1
```

Create remote user:

```bash
sudo restart mysql
mysql -u root -p
GRANT ALL PRIVILEGES ON *.* TO 'LBdbadmin'@'%' IDENTIFIED BY 'Hn5StEXzLjANkgmb' WITH GRANT OPTION;
FLUSH PRIVILEGES;
QUIT;
```

Then server is ready for database creation:

```bash
./bin/devcon create-database reporting-msft-007.learnbig.com <database-name>
```

Note: You may need to connect via mySQL Workbench to reset the password

```
INSERT `athena-vul-ade`.projects (id, name, clientid) VALUES (1, 'vul-ade', 2);
```

## Setting up a MongoDB server

Borrowed from the [internet](http://www.liquidweb.com/kb/how-to-install-mongodb-on-ubuntu-14-04/)

* Import MongoDB public key used by the package manager.
* Ceate a list file for MongodDB
* Reload the package database
* Install Mongo
* Start service
* Check status

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://download-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start
sudo service mongod status
```

if you see a warning about hugepages when you run mongo, follow these steps here to create the /etc/init.d/disable-transparent-hugepages (borrowed from the [internet](http://docs.mongodb.org/master/tutorial/transparent-huge-pages/))

```bash
sudo vim /etc/init.d/disable-transparent-hugepages
```

```bash
#!/bin/sh
### BEGIN INIT INFO
# Provides:          disable-transparent-hugepages
# Required-Start:    $local_fs
# Required-Stop:
# X-Start-Before:    mongod mongodb-mms-automation-agent
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Disable Linux transparent huge pages
# Description:       Disable Linux transparent huge pages, to improve
#                    database performance.
### END INIT INFO

case $1 in
  start)
    if [ -d /sys/kernel/mm/transparent_hugepage ]; then
      thp_path=/sys/kernel/mm/transparent_hugepage
    elif [ -d /sys/kernel/mm/redhat_transparent_hugepage ]; then
      thp_path=/sys/kernel/mm/redhat_transparent_hugepage
    else
      return 0
    fi

    echo 'never' > ${thp_path}/enabled
    echo 'never' > ${thp_path}/defrag

    unset thp_path
    ;;
esac
```

```bash
sudo chmod 755 /etc/init.d/disable-transparent-hugepages
sudo update-rc.d disable-transparent-hugepages defaults
```

fix timeout issues on azure, borrowed from the [internet](https://docs.mongodb.org/manual/administration/production-notes/#azure)

```bash
sudo vim /etc/sysctl.conf
```

Add the following line to the end of the file.

```
net.ipv4.tcp_keepalive_time = 120
```

If mongo will run on a server different from your node server then
you need to update the bind_ip line in /etc/mongod.conf

```
sudo vim /etc/mongod.conf
```

change the following line from

```
bind_ip = 127.0.0.1
```

to

```
bind_ip = 0.0.0.0
```
