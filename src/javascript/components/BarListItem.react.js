/** @jsx React.DOM */

var React = require('react');

var ReactPropTypes = React.PropTypes;

var BarListItem = React.createClass({

  propTypes: {
    bar: ReactPropTypes.object
  },

  render: function() {
    var bar = this.props.bar;
    return (
      <li className="bar-list-item">
        <div className="bar-name">{bar.name}</div>
      </li>
    );
  }

});

module.exports = BarListItem;
