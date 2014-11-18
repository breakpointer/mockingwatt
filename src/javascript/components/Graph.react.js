/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

  	var redData = [];
    var greenData = [];
    var yellowData = [];

  	for (var i = 0; i < this.props.usageData.length; i++) {

      // Subtract the bias from the value
      if (this.props.usageData[i].bias > 0) {
        var biasedData = this.props.usageData[i].value + this.props.usageData[i].bias
        redData.push([this.props.usageData[i].slot, biasedData])
      } else {
        redData.push([this.props.usageData[i].slot, this.props.usageData[i].value])
      }


  		greenData.push([this.props.usageData[i].slot, this.props.usageData[i].value])

      if (this.props.usageData[i].bias < 0) {
        var foo = this.props.usageData[i].value + this.props.usageData[i].bias
        yellowData.push([this.props.usageData[i].slot, foo])
      } else {
        yellowData.push([this.props.usageData[i].slot, this.props.usageData[i].value])
      }

  	}

		$(function () {
	    $('#highcharts').highcharts({
				chart: {
				  style: {
				  	fontFamily: 'Avenir-Medium'
					}
				},
				colors: ['#d53e4f', '#fee08b', '#3288bd'],
				credits: {
				    enabled: false
				},
				legend: {
					enabled: false
				},
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          },
          area: {
            fillOpactiy: 1.0,
            lineColor: '#3288bd'
          }
        },
				series: [{
          type: 'area',
			    name: 'Green Data',
          color: '#99d594',
          fillOpactiy: 1.0,
			    data: greenData,
          index: 100
				},
        {
          type: 'area',
          name: 'Red Data',
          color: '#d53e4f',
          fillOpactiy: 1.0,
          data: redData,
          index: 10
        },
        {
          type: 'area',
          name: 'Yellow Data',
          color: '#F7F7F7',
          fillOpactiy: 1.0,
          data: yellowData,
          index: 1000
        },
        {
          type: 'line',
          name: 'Baseline',
          color: '#666',
          fillOpactiy: 1.0,
          data: greenData,
          index: 1000
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