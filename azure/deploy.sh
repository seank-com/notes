 [ -z "$1" ] && echo "Resource group not supplied" && exit 1
 [ -z "$2" ] && echo "VM name not supplied" && exit 2
az group create --name $1 --location westus2
az vm create --resource-group $1 --name $2 --image UbuntuLTS --generate-ssh-keys --admin-username ubuntu
az vm open-port --port 80 -g $1 -n $2
az vm open-port --port 443 --priority 950 -g $1 -n $2
