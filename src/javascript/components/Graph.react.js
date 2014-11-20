/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

    var baseLineData = [];
    var maskingData = [];
    var consumptionData = [];

    for (var i = 0; i < this.props.usageData.length; i++) {

      // tracks the current consumption 
      var consumptionValue = this.props.usageData[i].value + this.props.usageData[i].bias; 
      consumptionData.push([this.props.usageData[i].slot, consumptionValue])
      
      // tracks what would normally be consumed
      baseLineData.push([this.props.usageData[i].slot, this.props.usageData[i].value])

      if (this.props.usageData[i].bias < 0) {
        var maskingPoint = this.props.usageData[i].value + this.props.usageData[i].bias
        maskingData.push([this.props.usageData[i].slot, maskingPoint])
      } else 
        maskingData.push([this.props.usageData[i].slot, this.props.usageData[i].value])
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