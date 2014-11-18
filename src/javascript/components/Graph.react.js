/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

  	var chartData = [];

  	if (this.props.usageData.length > 3) {
	  	for (var i = 0; i < this.props.usageData.length; i++) {
	  		chartData.push([this.props.usageData[i].slot, this.props.usageData[i].value])
	  	}
  	} else {
  		chartData = [[31, 32], [32, 33]]
  	}

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