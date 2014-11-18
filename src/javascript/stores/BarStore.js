var FooAppDispatcher = require('../dispatcher/FooAppDispatcher');
var FooConstants = require('../constants/FooConstants');
var FooBarUtils = require('../utils/FooBarUtils');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = FooConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _bars = {};

function _addBars(rawBars) {
  rawBars.forEach(function(bar) {
    if (!_bars[bar.id]) {
      _bars[bar.id] = FooBarUtils.convertRawBar(bar);
    }
  });
}

var BarStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _bars[id];
  },

  getAll: function() {
    var bars = [];
    for (var id in _bars) {
      bars.push(_bars[id]);
    }
    return bars;
  },

  getCreatedBarData: function(name) {
    var timestamp = Date.now();
    return {
      id: 'b_' + timestamp,
      name: name
    };
  }

});

BarStore.dispatchToken = FooAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CREATE_BAR:
      var bar = BarStore.getCreatedBarData(action.name);
      _bars[bar.id] = bar;
      BarStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_BARS:
      _addBars(action.rawBars);
      BarStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = BarStore;
