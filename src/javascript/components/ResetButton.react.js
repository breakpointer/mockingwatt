/** @jsx React.DOM */

var React = require('react');

var ResetButton = React.createClass({
  render: function() {
    return (
      <button className="btn btn-lg btn-info" onClick={this.props.onClick} >Reset to default</button>
    );
  }
});

module.exports = ResetButton;