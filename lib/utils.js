exports.parseCommandline = () => {
  var args = process.argv,
    results = {
      engine: args.shift(),
      script: args.shift(),
      flags: {},
      files: []
    };

    while(args.length) {
      var val = args.shift();

      if (val.startsWith("-")) {
        // arguments will either have one parameter
        //
        // -u admin
        //
        if (args.length && !(args[0].startsWith("-"))) {
          results.flags[val] = args.shift();
        // or just a flag
        //
        // --verbose
        //
        } else {
          results.flags[val] = true;
        }
      } else {
        results.files.push(val);
      }
    }

    return results;
}
