const cp = require('child_process');
const fs = require('fs');

function resolve(that, name) {
    if (typeof that[name] === 'function') {
      return that[name].call(that);
    }
    return that[name];
};

function remoteExecute(callback) {
  var sshCommand = "ssh " +
      "-o StrictHostKeyChecking=no " +
      "-o UserKnownHostsFile=/dev/null " +
      "-o LogLevel=quiet " +
      `-i ${resolve(this, "identity")} ` +
      `-p ${resolve(this, "port")} ` +
      `${resolve(this, "user")}@${resolve(this, "server")} '${resolve(this, "command")}'`,
    child = {};

    if (this.debug) {
      setImmediate(() => {
        callback(null, sshCommand, null);
      });
    } else {
      child = cp.exec(sshCommand, { maxBuffer: 2000*1024 }, callback);
    }
};

function createRemoteFile(callback) {
  var sshCommand = "ssh " +
      "-o StrictHostKeyChecking=no " +
      "-o UserKnownHostsFile=/dev/null " +
      "-o LogLevel=quiet " +
      `-i ${resolve(this, "identity")} ` +
      `-p ${resolve(this, "port")} ` +
      `${resolve(this, "user")}@${resolve(this, "server")} 'sudo tee ${resolve(this, "filename")}'`,
    contentString = resolve(this, "content");
    child = {}

    if (this.debug) {
      setImmediate(() => {
        callback(null, sshCommand + "\n\n" + contentString, null);
      });
    } else {
      child = cp.exec(sshCommand, { maxBuffer: 2000*1024 }, callback);
      child.stdin.write(contentString);
      child.stdin.end();
    }
};

function copyRemoteFile(callback) {
  var filename =
  fs.readFile(resolve(this, "localFilename"), "utf8", (err, data) => {
    if (err) {
      callback(err);
    } else {
      this.content = data;
      createRemoteFile.call(this, callback);
    }
    console.log(data);
  });
};

function operate(next) {
  function doNextTask(err, stdout, stderr) {
    var hasError = false;
    if (err) {
      console.log("ERROR-----------");
      console.log(err.toString());
      hasError = true;
    }
    if (stderr && !this.ignoreErrors) {
      console.log("STDERR----------");
      console.log(stderr);
      hasError = true;
    }
    if (stdout) {
      if (hasError) {
        console.log("STDOUT----------");
      }
      console.log(stdout);
    }
    if (hasError && !this.ignoreErrors) {
      return;
    }

    var newThis = next();

    if (newThis) {
      console.log("------------------------------------------------------------");
      if (newThis.command) {
        console.log("COMMAND:", resolve(newThis, "command"));
      } else {
        console.log("CREATING FILE:", resolve(newThis, "filename"));
      }
      console.log("------------------------------------------------------------");
      newThis.task.call(newThis, doNextTask.bind(newThis));
    }
  };

  doNextTask.call({}, null, null, null);
};

exports.remoteExecute = remoteExecute;
exports.createRemoteFile = createRemoteFile;
exports.copyRemoteFile = copyRemoteFile;
exports.operate = operate;
