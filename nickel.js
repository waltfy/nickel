exports.newPost = function (args) {
     
  var newPost = {},
      date = new Date();

  newPost.name = args.name.split(' ').join('-').toLowerCase();;
  newPost.format = "." + args.format;
  newPost.content = '---\nlayout: post\ntitle: ' + args.name + '\n---\n';
  newPost.year = date.getFullYear();
  newPost.month = date.getMonth() + 1;
  newPost.day = date.getDate();
  newPost.fileName = newPost.year + '-' + newPost.month + '-' + newPost.day + '-' + newPost.name + newPost.format;
  
  return newPost;
}