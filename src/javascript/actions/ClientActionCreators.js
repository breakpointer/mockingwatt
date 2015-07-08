var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');
var MockingwattWebAPIUtils = require('../utils/MockingwattWebAPIUtils');
var UsageStore = require('../stores/UsageStore');

var ActionTypes = MockingwattConstants.ActionTypes;
var mAPI = MockingwattWebAPIUtils;

module.exports = {

  getUsage: function() {
    mAPI.getUsage(mAPI.getScope());
  },

  incrementUsage: function() {
    mAPI.incrementUsage(mAPI.currentSlot());
    mAPI.getUsage(mAPI.getScope());
  },

  decrementUsage: function() {
    mAPI.decrementUsage(mAPI.currentSlot());
    mAPI.getUsage(mAPI.getScope());
  },

  resetUsage: function() {
    mAPI.resetUsage();
    mAPI.getUsage(mAPI.getScope());
  },
  
  regenerateUsage: function() {
    mAPI.regenerateUsage();
    mAPI.getUsage(mAPI.getScope());
  }
};
