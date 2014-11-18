var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = MockingwattConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _usageData = [{}];

function _addUsageData(data) {
  _usageData = data;
}

var UsageStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getUsageData: function() {
    return _usageData;
  }

});

UsageStore.dispatchToken = MockingwattAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_USAGE:
      _addUsageData(action.data);
      UsageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UsageStore;
