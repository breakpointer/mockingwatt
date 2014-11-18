var FooAppDispatcher = require('../dispatcher/FooAppDispatcher');
var FooConstants = require('../constants/FooConstants');
var FooWebAPIUtils = require('../utils/FooWebAPIUtils');
var BarStore = require('../stores/BarStore');

var ActionTypes = FooConstants.ActionTypes;

module.exports = {

  createBar: function(name) {
    FooAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_BAR,
      name: name
    });
    var bar = BarStore.getCreatedBarData(name);
    FooWebAPIUtils.createBar(bar);
  }

};
