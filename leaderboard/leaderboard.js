Playerslist = new Mongo.Collection('players');

if (Meteor.isClient) {

  Meteor.subscribe('thePlayers');

  Template.Leaderboard.helpers({
    'player': function() {
      var currentUserId = Meteor.userId();
      return Playerslist.find({createdBy: currentUserId}, {sort: {score: -1, name: 1}});
    },
    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer')
      if (playerId === selectedPlayer) {
        return 'selected';
      }
    },
    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return Playerslist.findOne(selectedPlayer);
    }
  });

  Template.Leaderboard.events({
    'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var playerName = event.target.playerName.value;
      var playerScore = event.target.playerScore.value;
      event.target.playerName.value = '';
      event.target.playerScore.value = '';
      Meteor.call('insertPlayerData', playerName, playerScore);
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId;
    return Playerslist.find({createdBy: currentUserId});
  });

  Meteor.methods({
    'insertPlayerData': function(playerName, playerScore) {
      var currentUserId = Meteor.userId();
      Playerslist.insert({
        name: playerName,
        score: playerScore,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(player) {
      Playerslist.remove(player);
    },
    'modifyPlayerScore': function(player, playerScore) {
      console.log(player);
      console.log(playerScore);
      console.log(typeof playerScore);
      console.log(Playerslist.find(player).fetch());
      Playerslist.update(player, {$inc: {score: playerScore} });
    }
  });
}