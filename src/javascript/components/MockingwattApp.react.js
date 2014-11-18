/** @jsx React.DOM */

var Graph = require('./Graph.react');
var UsageStore = require('../stores/UsageStore');
var React = require('react');
var ClientActionCreators = require('../actions/ClientActionCreators');

function getStateFromStores() {
  return {
    usageData: UsageStore.getUsageData()
  };
}

var MockingwattApp = React.createClass({

  getInitialState: function() {

    ClientActionCreators.getUsage()

    return getStateFromStores();
  },

  componentDidMount: function() {
    UsageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UsageStore.removeChangeListener(this._onChange);
  },

  render: function() {

    console.log(this.state);

    return (
      <div className="sillyContainer">
      	<h1 className="pageHeader">Mockingwatt</h1>
      	<Graph />
        <button className="btn btn-lg btn-warning">-</button>
      	<button className="btn btn-lg btn-success">+</button>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MockingwattApp;