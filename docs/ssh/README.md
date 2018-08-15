## Configure SSH Identity

On your development machine run the following from a bash shell to generate a certificate

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

## Reverse SSH port tunneling

This is a two stage process. The first command creates and ssh connection to media.learnbig.com.
The second command then opens the reverse shh port to connect to alexandria.

```
ssh ubuntu@<azure machine name> -i ~/.ssh/server-certificate.pem
ssh -p 2222 admin@localhost
```

To disconnect run ```exit``` twice. The fist time closes the Alexandria connection and brings you back to the media.learnbig.com connection. The second time close the media.learnbig.com connection and brings you back to your local terminal.

To see how this was setup refer to the article, [Bypassing Corporate Firewall with reverse ssh port forwarding](http://toic.org/blog/2009/reverse-ssh-port-forwarding/#.VfW3lZ1VhHx). The following command
runs as part of a cron job

```
ssh -N -f -R 2222:localhost:22 ubuntu@<azure machine name> -i ~/.ssh/server-certificate.pem
```
