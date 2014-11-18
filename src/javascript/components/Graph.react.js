/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {
    return (
	  	<div id="highcharts">
	  	</div>
    );
  },

  componentDidMount: function() {

	$(function () {
	    $('#highcharts').highcharts({
	        chart: {
	            type: 'area',
	            style: {
	            	fontFamily: 'Avenir-Medium'
	        	}
	        },
	        title: {
	            text: '.',
	            margin: 10
	        },
	        colors: ['#66c2a5'],
	        xAxis: {
        		labels: {
        			rotation: -45
        		},
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
            plotBands: [{
				  color: 'rgba(0,0,0,0.05)', // Color value
				  from: '0', // Start of the plot band
				  to: '2', // End of the plot band
				  label: { 
				    text: '<span style="font-size: 10px; color: #999">1/1/2012 - 12/31/2012</span><br />Seed Period', // Content of the label. 
				    align: 'center', // Positioning of the label. 
				    y: -25, // Amount of pixels the label will be repositioned according to the alignment.
				    useHTML: true
				  }
				},
				{
				  color: 'rgba(0,0,0,0.1)', // Color value
				  from: '2', // Start of the plot band
				  to: '4', // End of the plot band
				  label: { 
				    text: '<span style="font-size: 10px; color: #999">1/1/2012 - 12/31/2012</span><br />Implementation Period', // Content of the label. 
				    align: 'center', // Positioning of the label. 
				    y: -25, // Amount of pixels the label will be repositioned according to the alignment. 
				    useHTML: true
				  }
				},
				{
				  color: 'rgba(0,0,0,0.15)', // Color value
				  from: '4', // Start of the plot band
				  to: '7', // End of the plot band
				  label: { 
				    text: '<span style="font-size: 10px; color: #999">1/1/2012 - 12/31/2012</span><br />Measurement Period', // Content of the label. 
				    align: 'center', // Positioning of the label. 
				    y: -25, // Amount of pixels the label will be repositioned according to the alignment.
				    useHTML: true 
				  }
				},
				{
				  color: 'rgba(50,136,189,0.15)', // Color value
				  from: '7', // Start of the plot band
				  to: '12', // End of the plot band
				  label: { 
				    text: 'Projected ROI', // Content of the label. 
				    align: 'center', // Positioning of the label. 
				    y: -10 // Amount of pixels the label will be repositioned according to the alignment. 
				  }
				}],
				plotLines: [{
					color: '#fdae61',
					value: '7',
					width: '2',
				  label: { 
				    text: '<span style="color: #fdae61">Today</span>', // Content of the label. 
				    align: 'center', // Positioning of the label. 
				    rotation: -45,
				    y: -20, // Amount of pixels the label will be repositioned according to the alignment.
				    x: 10,
				    useHTML: true
				  }
				}]
	        },
	        yAxis: {
	       	  labels: {
                format: '$ {value}'
              }
	        },
	        credits: {
	            enabled: false
	        },
	        legend: {
	        	enabled: false
	        },
	        series: [{
	            name: 'Actual',
	            data: [0, 0, -500000, -400000, -150000, 0, 150000, 300000, null, null, null],
	            negativeColor: '#d53e4f'
	        },
	        {
	            name: 'Projected',
	            type: 'line',
	            dashStyle: 'longdash',
	            data: [null, null, null, null, null, null, null, 300000, 450000, 550000, 600000],
	            color: '#3288bd',
	            negativeColor: '#d73027'
	        }]
	    });
	});
  }

});

module.exports = Graph;