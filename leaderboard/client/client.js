// There's that goddamn subscribe, use that shit!
Meteor.subscribe('thePosts');

// Some fuckin helpers to help you help someone...pay it forward son!!
Template.posts.helpers({
  'post': function() {
    var currentUserId = Meteor.userId();
    return Posts.find({createdBy: currentUserId});
  },
  'selectedClass': function() {
    var playerId = this._id;
    var selectedPost = Session.get('selectedPost')
    if (playerId === selectedPost) {
      return 'selected';
    }
  },
  'showSelectedPost': function() {
    var selectedPost = Session.get('selectedPost');
    return Posts.findOne(selectedPost);
  }
});

// Check out these bitchin event handlers! Fuck ya!!
Template.posts.events({
  'click .onePost': function() {
    var postId = this._id;
    Session.set('selectedPost', postId);
  },
  'click .remove': function() {
    var selectedPost = Session.get('selectedPost');
    Meteor.call('removePostData', selectedPost);
  }
});

// Come again?! More event handlers for the addPlayerForm template?! Daaaayyyyymmmmm
Template.newPostForm.events({
  'submit form': function(event) {
    event.preventDefault();
    var postTitle = event.target.postTitle.value;
    var postContent = event.target.postContent.value;
    event.target.postTitle.value = '';
    event.target.postContent.value = '';
    Meteor.call('insertPostData', postTitle, postContent);
  }
});

