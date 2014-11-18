/** @jsx React.DOM */

var Graph = require('./Graph.react');
var React = require('react');

var FooApp = React.createClass({

  render: function() {
    return (
      <div className="sillyContainer">
      	<h1 className="pageHeader">Mockingwatt</h1>
      	<Graph />
      	<button className="btn btn-lg btn-success">+</button>
      </div>
    );
  }

});

module.exports = FooApp;