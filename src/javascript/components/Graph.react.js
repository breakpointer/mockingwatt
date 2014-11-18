/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

  	var chartData = [];

  	for (var i = 0; i < this.props.usageData.length; i++) {
  		chartData.push([this.props.usageData[i].slot, this.props.usageData[i].value])
  		console.log(chartData);
  	}

  	console.log(chartData);

		$(function () {
	    $('#highcharts').highcharts({
				chart: {
				  type: 'area',
				  style: {
				  	fontFamily: 'Avenir-Medium'
					}
				},
				colors: ['#66c2a5'],
				credits: {
				    enabled: false
				},
				legend: {
					enabled: true
				},
				series: [{
				    name: 'Usage Data',
				    data: chartData,
				    negativeColor: '#d53e4f'
				}]
	    });
		});

    return (
	  	<div id="foo">
	  	</div>
    );
  }

});

module.exports = Graph;