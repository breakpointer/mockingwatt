/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

    var baseLineData = [];
    var maskingData = [];
    var consumptionData = [];

    for (var i = 0; i < this.props.usageData.length; i++) {
      var slot = this.props.usageData[i].slot;
      var bias = this.props.usageData[i].bias;
      var value = this.props.usageData[i].value;
      
      // tracks the current consumption 
      consumptionData.push([slot, value + bias]);
      
      // tracks what would normally be consumed
      baseLineData.push([slot, value]);
      
      // Add only negative bias values to the data
      // This will expose the green baseline graph behind the topmost mask graph
      if (bias < 0) {
        maskingData.push([slot, value + bias]);
      } else {
        maskingData.push([slot, value]);
      }
    }
    
		$(function () {
	    $('#highcharts').highcharts({
				chart: {
				  style: {
				  	fontFamily: 'Avenir-Medium'
					}
				},
				credits: {
				    enabled: false
				},
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: '',
            style: {
                display: 'none'
            }
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
            fillOpacity: 1.0,
            lineWidth: 1,
            lineColor: '#fafafa'
          }
        },
				series: [
        {
          type: 'area',
          name: 'Consumption',
          color: '#b32b22',
          data: consumptionData,
          index: 10
        },
        {
          type: 'area',
          name: 'Baseline',
          color: '#1c9632',
          data: baseLineData,
          index: 100
        },
        {
          type: 'area',
          name: 'Graph Mask',
          color: '#fff',
          data: maskingData,
          index: 1000
        },
        {
          type: 'line',
          name: 'Energy Consumption',
          color: '#333',
          data: consumptionData,
          lineWidth: 3,
          index: 1100
        }],
        xAxis: {
          plotBands: [{
            color: 'rgba(128,128,128,0.5)',
            label: {
              text: 'Past consumption'
            },
            from: 710,
            to: 760,
            zIndex: 1101
          }],
          
        }
	    });
		});

    return (
	  	<div id="foo">
	  	</div>
    );
  }

});

module.exports = Graph;