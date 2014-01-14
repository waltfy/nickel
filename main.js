(function () {

  // Dependencies
  var path = require('path'),
      fs = require('fs'),
      nickel = require ('./nickel.js'),
      args = require('optimist').argv,
      fileFormat = 'md', // Markdown by default.
      post = null;

  // Help Function
  var help = function () {
    /* should use a closure, to allow emulation of private vars */
    console.log("Usage: nickel [name] [flag] [argument]\n\nOptions:\n\tname\t\tThe post's name. If your post name contains spaces, wrap it with double quotes (\").\n\t-f, --format\tFlag to specify format 'md', 'markdown', 'text' or 'txt'.\n\t-h, --help\tSimply displays help.\n\nNickel's Documentation can be found at https://github.com/waltervascarvalho/nickel");
    
    return;
  };

  // If help flag is detected call for help.
  if ((args.h) || (args.help)) {
    help();
    process.exit(0);
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
        console.error('Nickel only makes Markdown (.md) or Text files (.txt).');
        help();
        process.exit(1);
        break;
    }
  }

  // Creates the post object
  if (args._[0] && args._[0].constructor === String) {
    post = nickel.newPost({name: args._[0], format: fileFormat});
  } else {
    console.error('You must provide Nickel a filename.');
    help();
    return;
  };
  
  try {
    if (!fs.existsSync(path.resolve('./' + post.fileName))) {
      console.log("Creating post...");
      fs.writeFile('./' + post.fileName, post.content, function(err){
        if(err) {
          console.error('Error saving %s, %s', post.fileName, err);
          process.exit(1);
        }
        console.log(post.fileName + ' created.');
      });
    } else {
      console.log('Sorry. A file named ' + post.fileName + ' already exists.');
    }
  } catch (e) {
    console.error("Sorry. Nickel could not create post.", e);
    process.exit(1);
  }

})()