/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

  	var redData = [];
    var greenData = [];
    var yellowData = [];
    var consumptionData = [];

  	for (var i = 0; i < this.props.usageData.length; i++) {

      // Subtract the bias from the value
      if (this.props.usageData[i].bias > 0) {
        var biasedData = this.props.usageData[i].value + this.props.usageData[i].bias
        redData.push([this.props.usageData[i].slot, biasedData])
      } else {
        redData.push([this.props.usageData[i].slot, this.props.usageData[i].value])
      }
      
      // tracks the current consumption 
      var consumptionValue = this.props.usageData[i].value + this.props.usageData[i].bias; 
      consumptionData.push([this.props.usageData[i].slot, consumptionValue])
      
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
				series: [{
          type: 'area',
			    name: 'Green Data',
          color: '#1c9632',
			    data: greenData,
          index: 100
				},
        {
          type: 'area',
          name: 'Red Data',
          color: '#b32b22',
          data: redData,
          index: 10
        },
        {
          type: 'area',
          name: 'Yellow Data',
          color: '#fff',
          data: yellowData,
          index: 1000
        },
        {
          type: 'line',
          name: 'Baseline',
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