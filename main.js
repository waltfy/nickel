(function() {
  // Dependencies
  var path = require('path'),
      fs = require('fs'),
      nickel = require ('./nickel.js'),
      args = require('optimist').argv,
      fileFormat = 'md',
      post;

  // Help Function
  var help = function () {
    fs.readFile('help.txt','utf8',function(err,data){
      if(err) {
        console.error("Could not open help file: %s", err);
        process.exit(1);
      }
      console.log(data);
    });
    return;
  };

  // If help flag is detected call for help.
  if ((args.h) || (args.help)) {
    help();
  }

  // Watch for the format flag, change file format accordingly.
  if ((args.f) || (args.format)) {
    var format = args.f || args.format;
    switch (format) {
      case 'md':
        fileFormat = 'md';
        break;
      case 'markdown':
        fileFormat = 'md';
        break;
      case 'txt':
        fileFormat = 'txt';
        break;
      case 'text':
        fileFormat = 'txt';
        break;
      default:
        console.error('Cannot deal with this file format.');
        help();
        return;
        break;
    }
  }

  // Creates the post object
  post = nickel.newPost(args._[0], fileFormat);

  try {
    if (!fs.existsSync(path.resolve('../' + post.fileName))) {
      console.log("Creating post...");
      fs.writeFile('../' + post.fileName, post.content, function(err){
        if(err) {
          console.error('Error saving %s, %s', post.fileName, err);
          process.exit(1);
        }
          console.log('Post ' + post.fileName + ' created.');
      });
    } else {
      console.log('A file named ' + post.fileName + ' already exists.');
      process.exit(1);
    }
  } catch (e) {
    console.log("Could not create post.", e);
    process.exit(1);
  }
}).call(this)