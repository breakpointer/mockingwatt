/** @jsx React.DOM */

var BarComposer = require('./BarComposer.react');
var BarListItem = require('./BarListItem.react');
var BarStore = require('../stores/BarStore');
var React = require('react');

function getStateFromStores() {
  return {
    bars: BarStore.getAll()
  };
}

function getBarListItem(bar) {
  return (
    <BarListItem
      key={bar.id}
      bar={bar}
    />
  );
}

var BarSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    this._scrollToBottom();
    BarStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BarStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log(this.state.bars);
    var barListItems = this.state.bars.map(getBarListItem);
    return (
      <div className="bar-section">
        <ul className="bar-list" ref="barList">
          {barListItems}
        </ul>
        <BarComposer />
      </div>
    );
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.barList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  /**
   * Event handler for 'change' events coming from the BarStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = BarSection;
