var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');
var MockingwattWebAPIUtils = require('../utils/MockingwattWebAPIUtils');
var UsageStore = require('../stores/UsageStore');

var ActionTypes = MockingwattConstants.ActionTypes;

module.exports = {

  getUsage: function() {
    MockingwattWebAPIUtils.getUsage(MockingwattWebAPIUtils.getScope());
  },

  incrementUsage: function() {
    MockingwattWebAPIUtils.incrementUsage();
    MockingwattWebAPIUtils.getUsage(MockingwattWebAPIUtils.getScope());
  },

  decrementUsage: function() {
    MockingwattWebAPIUtils.decrementUsage();
    MockingwattWebAPIUtils.getUsage(MockingwattWebAPIUtils.getScope());
  },

  resetUsage: function() {
    MockingwattWebAPIUtils.resetUsage();
    MockingwattWebAPIUtils.getUsage(MockingwattWebAPIUtils.getScope());
  },
  
  regenerateUsage: function() {
    MockingwattWebAPIUtils.regenerateUsage();
    MockingwattWebAPIUtils.getUsage(MockingwattWebAPIUtils.getScope());
  }
};
