// Fuck...We're totally gonna publish the available data of the user...hope someone subscribes to it
Meteor.publish('thePlayers', function() {
  var currentUserId = this.userId;
  return Playerslist.find({createdBy: currentUserId});
});

// Holy Christ!! Server-side data manipulation methods!!!
Meteor.methods({
  // Say what?! We're gonna use it to create new data!
  'insertPlayerData': function(playerName, playerScore) {
    var currentUserId = Meteor.userId();
    Playerslist.insert({
      name: playerName,
      score: parseInt(playerScore),
      createdBy: currentUserId
    });
  },
  // Hey...lets try and get rid of some shit
  'removePlayerData': function(player) {
    Playerslist.remove(player);
  },
  // Ya man, you gotta change stuff to make it good right?
  'modifyPlayerScore': function(player, playerScore) {
    Playerslist.update(player, {$inc: {score: playerScore} });
  }
});