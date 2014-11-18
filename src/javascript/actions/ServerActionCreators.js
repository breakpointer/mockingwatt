var MockingwattAppDispatcher = require('../dispatcher/MockingwattAppDispatcher');
var MockingwattConstants = require('../constants/MockingwattConstants');

var ActionTypes = MockingwattConstants.ActionTypes;

module.exports = {

  receiveUsage: function(data) {
    MockingwattAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_USAGE,
      data: data
    });
  }

};
