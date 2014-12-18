/** @jsx React.DOM */

var React = require('react');

var DecreaseButton = React.createClass({
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
        <title>arrowDown</title>
          <g fill="none" fill-rule="evenodd">
            <g fill={this.props.fillColor}>
              <g>
                <path d="M147.393 182.63L104 226.4 288 412l184-185.6-43.393-43.77L288 324.46 147.393 182.63z"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
      Reduce Energy Usage
      </button>
    );
  }
});

module.exports = DecreaseButton;