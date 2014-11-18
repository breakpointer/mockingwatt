/** @jsx React.DOM */

// This file bootstraps the entire application.

var MockingwattApp = require('./components/MockingwattApp.react');
var React = require('react');

React.renderComponent(
    <MockingwattApp />,
    document.getElementById('react')
);
