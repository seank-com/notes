const path = require("path");
const tasks = require("./lib/tasks.js");
const utils = require("./lib/utils.js");

var tasklist_part1 = [
    {
      task: tasks.remoteExecute,
      command: "curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -"
    },
    {
      task: tasks.remoteExecute,
      ignoreErrors: true,
      command: 'sudo add-apt-repository "ppa:nginx/stable" --yes'
    },
    {
      task: tasks.remoteExecute,
      command: "sudo apt-get update"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs"
    },
    {
      task: tasks.remoteExecute,
      ignoreErrors: true,
      command: "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nginx"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo npm install -g n"
    },
    {
      task: tasks.remoteExecute,
      ignoreErrors: true,
      command: "sudo n stable"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y git"
    },
    {
      task: tasks.remoteExecute,
      command: "ssh-keyscan -H -t rsa github.com  >> ~/.ssh/known_hosts"
    },
    {
      task: tasks.copyRemoteFile,
      filename: "~/.ssh/github-access-key.pem",
      localFilename: function () {
        return this.gitkey;
      }
    },
    {
      task: tasks.createRemoteFile,
      filename: "~/.ssh/config",
      content: ""+
        "Host github\n"+
        "\tHostName github.com\n"+
        "\tUser git\n"+
        "\tIdentityFile ~/.ssh/github-access-key.pem\n\n"+
        "Host github.com\n"+
        "\tHostName github.com\n"+
        "\tUser git\n"+
        "\tIdentityFile ~/.ssh/github-access-key.pem\n\n"
    },
    {
      task: tasks.createRemoteFile,
      filename: "/etc/nginx/sites-enabled/default",
      content: ""+
        "##\n"+
        "# You should look at the following URL's in order to grasp a solid understanding\n"+
        "# of Nginx configuration files in order to fully unleash the power of Nginx.\n"+
        "# http://wiki.nginx.org/Pitfalls\n"+
        "# http://wiki.nginx.org/QuickStart\n"+
        "# http://wiki.nginx.org/Configuration\n"+
        "#\n"+
        "# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.\n"+
        "##\n"+
        "\n"+
        "# HTTP server\n"+
        "server {\n"+
        "  listen       80 default;\n"+
        "  server_name  *.seank.com;\n"+
        "\n"+
        "  # Proxy pass-though to the local node server\n"+
        "  location / {\n"+
        "    proxy_pass              http://127.0.0.1:4000/;\n"+
        "    proxy_set_header        Host $host;\n"+
        "    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;\n"+
        "    proxy_connect_timeout   300;\n"+
        "    proxy_send_timeout      300;\n"+
        "    proxy_read_timeout      300;\n"+
        "    send_timeout            300;\n"+
        "  }\n"+
        "}\n"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo chown -R root:root /etc/nginx/sites-available/default"
    },
    {
      task: tasks.remoteExecute,
      command: function () {
        return "git clone " + this.gitrepo+ " nodeserver";
      }
    },
    {
      task: tasks.remoteExecute,
      command: function () {
        return "git checkout " + this.gitbranch;
      }
    },
    {
      task: tasks.remoteExecute,
      command: "git pull"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo chown -R $(whoami):www-data /var/www"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo chmod -R 750 /var/www"
    },
    {
      task: tasks.createRemoteFile,
      filename: "/etc/init/nodeserver.conf",
      content: ""+
        "#upstart\n"+
        "description \"node.js server\"\n"+
        "author      \"Seank\"\n"+
        "\n"+
        "start on runlevel [2345]\n"+
        "stop on runlevel [016]\n"+
        "\n"+
        "respawn\n"+
        "respawn limit 7 60\n"+
        "\n"+
        "setuid www-data\n"+
        "setgid www-data\n"+
        "chdir /var/www/nodeserver\n"+
        "exec /usr/local/bin/node app.js >> /var/log/nodeserver.log 2>> /var/log/nodeserver.err\n"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo chown $(whoami):root /etc/init/nodeserver.conf"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo chmod 744 /etc/init/nodeserver.conf"
    },
    {
      task: tasks.createRemoteFile,
      filename: "/etc/logrotate.d/nodeserver",
      content: ""+
        "/var/log/nodeserver.log {\n"+
        "  daily\n"+
        "  missingok\n"+
        "  size 100k\n"+
        "  rotate 7\n"+
        "  compress\n"+
        "  delaycompress\n"+
        "  notifempty\n"+
        "  create 0764 www-data www-data\n"+
        "  nomail\n"+
        "  prerotate\n"+
        "    initctl stop nodeserver >/dev/null 2>&1\n"+
        "  endscript\n"+
        "  postrotate\n"+
        "    initctl start nodeserver >/dev/null 2>&1\n"+
        "  endscript\n"+
        "}\n"+
        "\n"+
        "/var/log/nodeserver.err {\n"+
        "  daily\n"+
        "  missingok\n"+
        "  size 1\n"+
        "  rotate 7\n"+
        "  compress\n"+
        "  delaycompress\n"+
        "  notifempty\n"+
        "  create 0764 www-data www-data\n"+
        "  nomail\n"+
//        "  mail seank@microsoft.com\n"+
//        "  mailfirst\n"+
        "  prerotate\n"+
        "    initctl stop nodeserver >/dev/null 2>&1\n"+
        "  endscript\n"+
        "  postrotate\n"+
        "    initctl start nodeserver >/dev/null 2>&1\n"+
        "  endscript\n"+
        "}\n"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo touch /var/log/nodeserver.log"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo touch /var/log/nodeserver.err"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo chown www-data:www-data /var/log/nodeserver.*"
    },
  ],
  tasklist_mongo = [
    {
      task: tasks.remoteExecute,
      command: "sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10"
    },
    {
      task: tasks.remoteExecute,
      command: 'echo "deb http://download-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee /etc/apt/sources.list.d/mongodb.list'
    },
    {
      task: tasks.remoteExecute,
      command: "sudo apt-get update"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo DEBIAN_FRONTEND=noninteractive apt-get install -y mongodb-org"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo service mongod start"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo service mongod status"
    },
    {
      task: tasks.remoteExecute,
      command: 'echo "net.ipv4.tcp_keepalive_time = 120" | tee --append /etc/sysctl.conf'
    },
  ],
  tasklist_part2 = [
    {
      task: tasks.remoteExecute,
      command: "sudo start nodeserver"
    },
    {
      task: tasks.remoteExecute,
      command: "sudo restart nginx"
    }
  ],
  params = utils.parseCommandline(),
  context = {
    debug: params.flags["--debug"] || "",
    server: params.flags["-s"] || "127.0.0.1",
    user: params.flags["-u"] || "vagrant",
    port: params.flags["-p"] || "2222",
    gitkey: params.flags["-k"] || path.resolve(process.env.HOME, ".ssh/id_rsa"),
    gitrepo: params.flags["-r"] || "git@github.com:seank-com/demo-service.git",
    gitbranch: params.flags["-b"] || "master",
    identity: params.flags["-i"] || ""
  };

  if (!context.server || !context.user || !context.port || !context.identity ||
      !context.gitkey || !context.gitrepo || !context.gitbranch) {
    console.log("Usage: node config-server.js -s <server> -u <user> " +
      "-p <port> -i <identity> -k <gitkey> -r <gitrepo> -b <gitbranch> " +
      "--debug --install-mongo");
    process.exit();
  }

  var tasklist = [];
  Array.prototype.push.apply(tasklist, tasklist_part1);
  if (params.flags["--install-mongo"]) {
    Array.prototype.push.apply(tasklist, tasklist_mongo);
  }
  Array.prototype.push.apply(tasklist, tasklist_part2);

  tasks.operate(() => {
    var task = tasklist.shift();
    if (task) {
      // task overwrites context
      task = Object.assign({}, context, task);
    }
    return task;
  });
