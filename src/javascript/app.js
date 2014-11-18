/** @jsx React.DOM */

// This file bootstraps the entire application.

var FooApp = require('./components/FooApp.react');
var FooExampleData = require('./FooExampleData');
var FooWebAPIUtils = require('./utils/FooWebAPIUtils');
var React = require('react');

FooExampleData.init(); // load example data into localstorage

FooWebAPIUtils.getAllBars();

React.renderComponent(
    <FooApp />,
    document.getElementById('react')
);
