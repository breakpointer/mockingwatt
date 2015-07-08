var ServerActionCreators = require('../actions/ServerActionCreators');
var request = require('superagent');
var self = {

  getUsage: function(scope) {
    console.log('Scope', scope);
    request
    .get('/usage')
    .query({ slot: scope })
    .end(function(res){
      ServerActionCreators.receiveUsage(res.body);
    });
  },

  incrementUsage: function(slot) {
    console.log('slot incr', slot);
    request
    .post('/usage')
    .send({ action: 'increase', slot: slot})
    .end(function(res){
      console.log("incremented!")
    });
  },

  decrementUsage: function(slot) {
    console.log('slot dec', slot);
    request
    .post('/usage')
    .send({ action: 'decrease', slot: slot})
    .end(function(res){
      console.log("decremented!")
    });
  },

  resetUsage: function() {
    request
    .post('/usage')
    .send({ action: 'reset' })
    .end(function(res){
      console.log("reset!")
    });
  },
  
  regenerateUsage: function() {
    request
    .post('/usage')
    .send({ action: 'regenerate' })
    .end(function(res){
      console.log("regenerated!")
    });
  },
  
  getScope: function() {
    console.log("get scope");
    var scope = self.currentSlot() - 40;
    return scope;
  }, 
  
  currentSlot: function (){
    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    var slot = (currentHour * 60) + currentMinute;
    return slot;
  }
};

module.exports = self;

