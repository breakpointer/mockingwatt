/** @jsx React.DOM */

var FooBarActionCreators = require('../actions/FooBarActionCreators');
var React = require('react');

var ENTER_KEY_CODE = 13;

var BarComposer = React.createClass({

  getInitialState: function() {
    return {name: ''};
  },

  render: function() {
    return (
      <textarea
        className="bar-composer"
        name="bar"
        value={this.state.name}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  },

  _onChange: function(event, value) {
    this.setState({name: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      var name = this.state.name.trim();
      if (name) {
        FooBarActionCreators.createBar(name);
      }
      this.setState({name: ''});
    }
  }

});

module.exports = BarComposer;
