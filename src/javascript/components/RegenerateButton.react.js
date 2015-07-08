/** @jsx React.DOM */

var React = require('react');

var RegenerateButton = React.createClass({
  render: function() {
    return (
      <button className="btn btn-lg btn-info" onClick={this.props.onClick} >Regenerate data</button>
    );
  }
});

module.exports = RegenerateButton;