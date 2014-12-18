/** @jsx React.DOM */

var Graph = require('./Graph.react');
var Building = require('./Building.react');
var ResetButton = require('./ResetButton.react');
var DecreaseButton = require('./DecreaseButton.react');
var IncreaseButton = require('./IncreaseButton.react');
var ElectricityUsage = require('./ElectricityUsage.react');
var NatGasUsage = require('./NatGasUsage.react');
var WaterUsage = require('./WaterUsage.react');
var InternalTemperature = require('./InternalTemperature.react');
var InternalLighting = require('./InternalLighting.react');

var UsageStore = require('../stores/UsageStore');
var ScopeStore = require('../stores/ScopeStore');
var React = require('react');
var ClientActionCreators = require('../actions/ClientActionCreators');

function getStateFromStores() {

  return {
    usageData: UsageStore.getUsageData(),
    usageSlot: UsageStore.getUsageSlot(),
    scope: ScopeStore.getScope()
  };
}

var MockingwattApp = React.createClass({

  getInitialState: function() {

    // Make a request for the usageData once, before this component mounts.
    ClientActionCreators.getUsage()

    return getStateFromStores();
  },

  componentDidMount: function() {
    UsageStore.addChangeListener(this._onChange);
    ScopeStore.addChangeListener(this._onChange);

    //setInterval(ClientActionCreators.getScope(), 2000);

  },

  componentWillUnmount: function() {
    UsageStore.removeChangeListener(this._onChange);
    ScopeStore.removeChangeListener(this._onChange);
  },


  render: function() {
    var styles = {
      buttonBlock: {
        marginLeft: "80px"
      },
      graphBlock: {
      }
    };
    
    // The highcharts div is a total hack because jquery has to be called after render, and then data doesnt update, and kittens cry. Not at all how react should work but an easy hack for now.
    return (
      <div className="sillyContainer">
        <Building />
        <div id="graphBlock" style={styles.graphBlock}>
          <Graph
            usageData={this.state.usageData}
            usageSlot={this.state.usageSlot}
          />
        </div> 
        <div id="functionBlock" style={styles.buttonBlock}>
          <ResetButton onClick={this.reset} />
          <IncreaseButton onClick={this.increment} fillColor='#ffffff' />
          <DecreaseButton onClick={this.decrement} fillColor='#ffffff' />
        </div>
        <div id="resources">
          <WaterUsage fillColor="#333"/>
          <ElectricityUsage fillColor="#333" />
          <NatGasUsage fillColor="#333" innerFillColor="#ffffff" />
        </div>
        <div id="environment">
          <InternalTemperature fillColor="#333" />
          <InternalLighting fillColor="#333" />
        </div>
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