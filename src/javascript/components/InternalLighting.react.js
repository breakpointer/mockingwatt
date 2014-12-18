/** @jsx React.DOM */

var React = require('react');

var InternalLighting = React.createClass({
  render: function() {
    var iconStyle = { 
      width: "60px",
      height: "60px"
    }; 
    return (
      <div id="internalLighting" style={iconStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 560 560"><title>lighting</title><g fill="none" fill-rule="evenodd"><g fill={this.props.fillColor}><g><path d="M327.92 406.162h-45.694c-.23 0-.457-.012-.68-.035-.224.023-.45.035-.68.035h-45.694c-.968 0-1.927-.206-2.808-.61-.657-.302-16.113-7.535-16.926-22.974-1.895-36.27-10.876-106.582-24.91-149.344-.67-2.043-.318-4.284.95-6.023 1.267-1.74 3.292-2.77 5.452-2.77h169.23c2.158 0 4.187 1.03 5.454 2.77 1.267 1.74 1.62 3.98.95 6.024-14.035 42.782-23.015 113.086-24.91 149.342-.814 15.438-16.267 22.674-16.924 22.975-.88.406-1.84.612-2.81.612zm-91.057-13.416h44.003c.23 0 .456.012.68.035.223-.022.45-.034.68-.034h43.996c2.357-1.406 7.68-5.195 7.978-10.868 1.808-34.62 9.99-99.778 22.847-144.02H206.044c12.858 44.225 21.04 109.39 22.847 144.023.3 5.694 5.61 9.465 7.973 10.866z"/><path d="M281.21 480.35h-.004l-.407-.002c-19.683-.21-37.784-16.136-44.652-22.98-6.574-6.552-5.263-55.554-5.24-56.04.166-3.58 3.13-6.4 6.728-6.4h86.482c3.618 0 6.592 2.846 6.728 6.45.02.477.994 48.813-4.406 55.467-7.376 9.086-26.177 23.506-45.23 23.506zm-34.72-31.667c5.318 5.146 20.132 18.1 34.45 18.25h.266c13.058 0 27.79-10.406 34.19-17.847 1.34-5.3 2.066-27.957 2.078-40.742h-73.21c.005 12.507.787 34.837 2.225 40.34z"/><path d="M237.474 431.745c-2.28 0-4.255-1.693-4.54-4.006-.31-2.5 1.476-4.78 3.987-5.086l86.774-10.617c2.5-.303 4.8 1.468 5.106 3.972.31 2.5-1.476 4.777-3.987 5.084L238.04 431.71c-.19.024-.38.035-.566.035"/><path d="M237.474 447.088c-2.28 0-4.255-1.693-4.54-4.005-.31-2.504 1.476-4.78 3.987-5.086l86.774-10.622c2.5-.313 4.8 1.47 5.106 3.97.31 2.502-1.476 4.777-3.987 5.086l-86.773 10.624c-.19.023-.38.034-.566.034"/><path d="M367.423 237.856H195.67c-2.475 0-4.753-1.35-5.928-3.522-4.932-9.11-29.325-55.543-25.48-75.303 2.715-13.933 45.572-46.466 116.484-46.877.076-.002.154-.002.233-.002h1.132c.08 0 .154 0 .236.003 70.92.41 113.77 32.944 116.48 46.878 3.843 19.76-20.544 66.195-25.476 75.304-1.174 2.17-3.45 3.522-5.93 3.522zm-86.557-13.415h82.502c10.365-19.814 24.216-51.473 22.272-62.662-2.805-6.605-37.78-36.044-104.094-36.212-66.312.168-101.29 29.61-104.095 36.212-1.943 11.2 11.906 42.854 22.276 62.663h81.14z"/></g></g></g></svg>
      </div>
    );
  }
});

module.exports = InternalLighting;