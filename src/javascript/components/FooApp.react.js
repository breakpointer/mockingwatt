/** @jsx React.DOM */

var BarSection = require('./BarSection.react');
var React = require('react');

var FooApp = React.createClass({

  render: function() {
    return (
      <div className="FooApp">
        <BarSection />
      </div>
    );
  }

});

module.exports = FooApp;
