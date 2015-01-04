// Fuck...We're totally gonna publish the available data of the user...hope someone subscribes to it
Meteor.publish('thePosts', function() {
  var currentUserId = this.userId;
  return Posts.find({createdBy: currentUserId});
});

// Holy Christ!! Server-side data manipulation methods!!!
Meteor.methods({
  // Say what?! We're gonna use it to create new data!
  'insertPostData': function(postTitle, postContent) {
    var currentUserId = Meteor.userId();
    Posts.insert({
      title: postTitle,
      content: postContent,
      createdBy: currentUserId
    });
  },
  // Hey...lets try and get rid of some shit
  'removePostData': function(post) {
    Posts.remove(post);
  },
  // Ya man, you gotta change stuff to make it good right?
  // TODO make so updated text in field is sent to document
  'modifyPlayerScore': function(player, playerScore) {
    Playerslist.update(player, {$inc: {score: playerScore} });
  }
});