var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');
var MockingwattWebAPIUtils = require('../utils/MockingwattWebAPIUtils');
var UsageStore = require('../stores/UsageStore');

var ActionTypes = MockingwattConstants.ActionTypes;

module.exports = {

  getUsage: function() {
    console.log("client action creator")
    MockingwattWebAPIUtils.getUsage();
  }

};
