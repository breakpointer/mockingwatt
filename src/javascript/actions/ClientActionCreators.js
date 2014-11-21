var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');
var MockingwattWebAPIUtils = require('../utils/MockingwattWebAPIUtils');
var UsageStore = require('../stores/UsageStore');

var ActionTypes = MockingwattConstants.ActionTypes;

module.exports = {

  getUsage: function(scope) {
    console.log(scope);
    MockingwattWebAPIUtils.getUsage(scope);
  },

  incrementUsage: function(scope) {
    MockingwattWebAPIUtils.incrementUsage();
    MockingwattWebAPIUtils.getUsage(scope);
  },

  decrementUsage: function(scope) {
    MockingwattWebAPIUtils.decrementUsage();
    MockingwattWebAPIUtils.getUsage(scope);
  },

  resetUsage: function(scope) {
    MockingwattWebAPIUtils.resetUsage();
    MockingwattWebAPIUtils.getUsage(scope);
  },

  getScope: function() {

    console.log("get scope")

    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    currentSlot = (currentHour * 60) + currentMinute;

    console.log(currentSlot);

    var scope = currentSlot - 60;

    return scope;

  }

};
