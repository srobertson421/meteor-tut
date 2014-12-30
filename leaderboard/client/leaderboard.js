// There's that goddamn subscribe, use that shit!
Meteor.subscribe('thePlayers');

// Some fuckin helpers to help you help someone...pay it forward son!!
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

// Check out these bitchin event handlers! Fuck ya!!
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
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);
  },
  'click .remove': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('removePlayerData', selectedPlayer);
  }
});

// Come again?! More event handlers for the addPlayerForm template?! Daaaayyyyymmmmm
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

