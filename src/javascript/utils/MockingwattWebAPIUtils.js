var ServerActionCreators = require('../actions/ServerActionCreators');
var request = require('superagent');

module.exports = {

  getUsage: function() {

    request
    .get('/usage')
    .end(function(res){
      console.log(res)
      ServerActionCreators.receiveUsage(res.body);
    });
  }

};
