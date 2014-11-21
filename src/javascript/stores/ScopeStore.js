var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = MockingwattConstants.ActionTypes;
var CHANGE_EVENT = 'change';


var _scope = 0;


var ScopeStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getScope: function() {

    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    currentSlot = (currentHour * 60) + currentMinute;

    _scope = currentSlot - 60;

    return _scope;
  }

});

ScopeStore.dispatchToken = MockingwattAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_USAGE:
      ScopeStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = ScopeStore;
