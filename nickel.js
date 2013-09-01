exports.newPost = function(postName, format) {
  // Defining variables.
  var newPost = {},
      date = new Date(),
      content = '---\nlayout: post\ntitle: '+postName+'\n---\n';

  // Processing argument.
  postName = postName.split(' ');
  postName = postName.join('-').toLowerCase();

  newPost.name = postName;
  newPost.format = "." + format;
  newPost.content = content;
  newPost.year = date.getFullYear();
  newPost.month = date.getMonth() + 1;
  newPost.day = date.getDate();
  newPost.fileName = newPost.year + '-' + newPost.month + '-' + newPost.day + '-' + postName + newPost.format;
  
  return newPost;
}