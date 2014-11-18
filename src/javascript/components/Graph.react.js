/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

  	var chartData = [];
    var baselineData = [];

  	if (this.props.usageData.length > 3) {
	  	for (var i = 0; i < this.props.usageData.length; i++) {

        // Subtract the bias from the value
        var biasedData = this.props.usageData[i].value - this.props.usageData[i].bias

        chartData.push([this.props.usageData[i].slot, biasedData])

        // Subtract the 
	  		baselineData.push([this.props.usageData[i].slot, this.props.usageData[i].value])
	  	}
  	} else {
      // This is just a hack to prevent Highcharts from barfing when it gets values that don't exist yet.
  		chartData = [[31, 32], [32, 33]]
      baselineData = [[31, 32], [32, 33]]
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
				    name: 'Baseline Data',
				    data: baselineData,
				    negativeColor: '#d53e4f'
				},
        {
            name: 'Chart Data',
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