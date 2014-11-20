var ServerActionCreators = require('../actions/ServerActionCreators');
var request = require('superagent');

module.exports = {

  getUsage: function() {

    request
    .get('/usage')
    .end(function(res){
      ServerActionCreators.receiveUsage(res.body);
    });
  },

  incrementUsage: function() {

    request
    .post('/usage')
    .send({ action: 'increase', slot: 920 })
    .end(function(res){
      console.log("incremented!")
    });
  },

  decrementUsage: function() {

    request
    .post('/usage')
    .send({ action: 'decrease', slot: 920 })
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
  }

};
