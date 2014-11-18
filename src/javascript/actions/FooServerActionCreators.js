var FooAppDispatcher = require('../dispatcher/FooAppDispatcher');
var FooConstants = require('../constants/FooConstants');

var ActionTypes = FooConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawBars) {
    FooAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_BARS,
      rawBars: rawBars
    });
  }

};
