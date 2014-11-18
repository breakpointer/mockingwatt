/** @jsx React.DOM */

// This file bootstraps the entire application.

var MockingwattApp = require('./components/MockingwattApp.react');
var FooExampleData = require('./FooExampleData');
var FooWebAPIUtils = require('./utils/FooWebAPIUtils');
var React = require('react');

FooExampleData.init(); // load example data into localstorage

FooWebAPIUtils.getAllBars();

React.renderComponent(
    <MockingwattApp />,
    document.getElementById('react')
);
