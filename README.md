# Machine Configuration

Here I document install steps, scripts and settings I use for each platform I work on.

## [Mac](MAC.md)
## [Windows](Windows.md)
## [Linux](Linux.md)

### Generate PEM cert and key for SSH

```
# when prompted for a filename enter server-access-key.pem
# when prompted for a password press enter to leave blank
$ ssh-keygen -t rsa -b 2048 -v

# you can enter . for all prompts except email
# you must enter an email address when prompted
$ openssl req -x509 -key server-access-key.pem -nodes -days 3650 -newkey rsa:2048 -out server-access-cert.pem
$ openssl x509 -in server-access-cert.pem -noout -pubkey >server-access-public-key.pem

ssh -p 22000 ubuntu@127.0.0.1 "ssh-keygen -i -m PKCS8 -f ~/server-access-public-key.pem >~/.ssh/authorized_keys"

# remove this file since you will never use it
$ rm server-access-key.pem.pub
```


VBoxManage modifyvm myserver --natpf1 "ssh,tcp,,22000,,22"
