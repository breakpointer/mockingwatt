/** @jsx React.DOM */

var React = require('react');

var InternalTemperature = React.createClass({
  render: function() {
    var iconStyle = { 
      width: "60px",
      height: "60px"
    };  
    return (
      <div id="internalTemperature" style={iconStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 560 560"><title>geothermal</title><g fill={this.props.fillColor} fill-rule="evenodd"><path d="M288.444 480.12c-41.825 0-75.848-33.86-75.848-75.48 0-22.987 10.626-44.803 28.595-59.05V164.698c0-29.798 21.2-54.04 47.255-54.04 26.055 0 47.25 24.242 47.25 54.04V345.59c17.967 14.247 28.596 36.066 28.596 59.05 0 41.62-34.025 75.48-75.845 75.48zm0-355.882c-18.53 0-33.61 18.15-33.61 40.46v184.26c0 2.18-1.05 4.227-2.826 5.504-16.136 11.6-25.772 30.358-25.772 50.18 0 34.132 27.91 61.9 62.208 61.9 34.297 0 62.203-27.768 62.203-61.9 0-19.822-9.634-38.58-25.77-50.18-1.774-1.277-2.825-3.325-2.825-5.504v-184.26c0-22.31-15.076-40.46-33.608-40.46zM288.444 447.948c-23.997 0-43.52-19.43-43.52-43.307 0-14.77 7.452-28.375 19.94-36.407l8.657-5.57V282h29.845v80.66l8.657 5.57c12.493 8.032 19.945 21.637 19.945 36.41 0 23.877-19.52 43.306-43.52 43.306"/></g></svg>
      </div>
    );
  }
});

module.exports = InternalTemperature;