var ServerActionCreators = require('../actions/ServerActionCreators');
var request = require('superagent');

module.exports = {

  getUsage: function(scope) {

    console.log(scope);

    request
    .get('/usage')
    .query({ slot: scope })
    .end(function(res){
      ServerActionCreators.receiveUsage(res.body);
    });
  },

  incrementUsage: function() {

    request
    .post('/usage')
    .send({ action: 'increase' })
    .end(function(res){
      console.log("incremented!")
    });
  },

  decrementUsage: function() {

    request
    .post('/usage')
    .send({ action: 'decrease' })
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
  
  getScope: function() {

    console.log("get scope")

    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    currentSlot = (currentHour * 60) + currentMinute;

    console.log(currentSlot);

    var scope = currentSlot - 40;

    return scope;

  }


};
