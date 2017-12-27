 [ -z "$1" ] && echo "public IP address not supplied" && exit 1
ssh ubuntu@$1 'bash -s' <<'ENDSSH'
sudo apt-get -y update
sudo apt-get -y install nginx
ENDSSH
