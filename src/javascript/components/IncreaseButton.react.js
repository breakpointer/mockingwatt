/** @jsx React.DOM */

var React = require('react');

var IncreaseButton = React.createClass({
  render: function() {

   var iconStyle = {
    width: "20px",
    height: "20px",
    margin: "0 10px 0 -12px",
    float: "left"
   };
   
    return (
      <button className="btn btn-lg btn-info" onClick={this.props.onClick} >
      <div style={iconStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 560 560">
        <title>arrowUp</title>
          <g fill="none" fill-rule="evenodd">
            <g fill={this.props.fillColor}>
              <g>
                <path d="M428.607 409.37L472 365.6 288 180 104 365.6l43.393 43.77L288 267.54l140.607 141.83z"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
      Increase Energy Usage
      </button>
    );
  }
});

module.exports = IncreaseButton;