/** @jsx React.DOM */

var Graph = require('./Graph.react');
var UsageStore = require('../stores/UsageStore');
var ScopeStore = require('../stores/ScopeStore');
var React = require('react');
var ClientActionCreators = require('../actions/ClientActionCreators');

function getStateFromStores() {

  console.log(ScopeStore.getScope())

  return {
    usageData: UsageStore.getUsageData(),
    usageSlot: UsageStore.getUsageSlot(),
    scope: ScopeStore.getScope()
  };
}

var MockingwattApp = React.createClass({

  getInitialState: function() {

    // Make a request for the usageData once, before this component mounts.

    var date = new Date();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    currentSlot = (currentHour * 60) + currentMinute;

    console.log(currentSlot);

    var scope = currentSlot - 60

    ClientActionCreators.getUsage(scope)

    return getStateFromStores();
  },

  componentDidMount: function() {
    UsageStore.addChangeListener(this._onChange);
    ScopeStore.addChangeListener(this._onChange);

    setInterval(ClientActionCreators.getScope(), 2000);

  },

  componentWillUnmount: function() {
    UsageStore.removeChangeListener(this._onChange);
    ScopeStore.removeChangeListener(this._onChange);
  },

  render: function() {

    console.log(this.state);

    // The highcharts div is a total hack because jquery has to be called after render, and then data doesnt update, and kittens cry. Not at all how react should work but an easy hack for now.

    return (
      <div className="sillyContainer">
        <p>{this.state.usageSlot}</p>
        <img className="meterImg" src="images/energy-meter.jpg" />
      	<h1 className="pageHeader">Mockingwatt - Artificial Load profile </h1>
      	<Graph
          usageData={this.state.usageData}
          usageSlot={this.state.usageSlot}
        />
        <div id="highcharts"></div>
        <button className="btn btn-lg btn-info" onClick={this.reset} >Reset</button>
        <button className="btn btn-lg btn-warning" onClick={this.decrement} > Reduce Energy Usage</button>
      	<button className="btn btn-lg btn-success" onClick={this.increment} > Increase Energy Usage</button>
      </div>
    );
  },

  increment: function() {
    ClientActionCreators.incrementUsage();
  },

  decrement: function() {
    ClientActionCreators.decrementUsage();
  },  

  reset: function() {
    ClientActionCreators.resetUsage();
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MockingwattApp;