/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

    console.log(this.props)

    var baseLineData = [];
    var maskingData = [];
    var consumptionData = [];

    for (var i = 0; i < this.props.usageData.length; i++) {
      
      var slot = this.props.usageData[i].slot;
      var now = new Date();
      var timestamp = Date.UTC(now.getYear(), now.getMonth(), now.getDay(), Math.floor(slot/60), (slot % 60));
      var bias = this.props.usageData[i].bias;
      var value = this.props.usageData[i].value;
      
      // tracks the current consumption 
      consumptionData.push([timestamp, value + bias]);
      
      // tracks what would normally be consumed
      baseLineData.push([timestamp, value]);
      
      // Add only negative bias values to the data
      // This will expose the green baseline graph behind the topmost mask graph
      if (bias < 0) {
        maskingData.push([timestamp, value + bias]);
      } else {
        maskingData.push([timestamp, value]);
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
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
              hour: '%I %p',
              minute: '%I:%M %p'
          },
          title: {
            text: "Time",
            margin: 20,
            style: {
              fontWeight: "bold",
              fontSize: "1.8em"
            }
          }
        },
        yAxis: {
          title: {
            text: "kW",
            margin: 15,
            style: {
              fontWeight: "bold",
              fontSize: "1.8em",
            }
          }
        },
        tooltip: {
          dateTimeLabelFormats: {
            hour: '%I %p',
            minute: '%I:%M %p'
          },
          valueDecimals: 2,
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
            },
            pointInterval: 1000 // one minute
          },
          area: {
            fillOpacity: 1.0,
            lineWidth: 1,
            lineColor: '#fafafa',
            pointInterval: 1000 // one minute
          }
        },
        series: [
        {
          type: 'area',
          name: 'Consumption',
          color: '#b32b22',
          data: consumptionData,
          index: 10,
        },
        {
          type: 'area',
          name: 'Baseline',
          color: '#1c9632',
          data: baseLineData,
          index: 20
        },
        {
          type: 'area',
          name: 'Graph Mask',
          color: '#fff',
          data: maskingData,
          index: 30
        },
        {
          type: 'line',
          name: 'Energy Consumption',
          color: '#333',
          data: consumptionData,
          lineWidth: 3,
          index: 40
        }]
      });
    });

    return (
      <div id="foo">
      </div>
    );
  },

  componentDidMount: function() {

    var makePlotBar = function() {
      
     
      $(function () {
        var now = new Date();
        var currentSlot = Date.UTC(now.getYear(), now.getMonth(), now.getDay(), now.getHours(), now.getMinutes());
        var startSlot = Date.UTC(now.getYear(), now.getMonth(), now.getDay(), now.getHours()-1, now.getMinutes());
        var chart = $('#highcharts').highcharts();
        
        chart.xAxis[0].removePlotBand('pastBand');
        chart.xAxis[0].removePlotLine('currentLine');

        chart.xAxis[0].addPlotBand({
          id: 'pastBand',
          color: 'rgba(128,128,128,0.5)',
          label: {
            text: 'Past consumption'
          },
          from: startSlot,
          to: currentSlot,
          zIndex: 50
        })
        
        chart.xAxis[0].addPlotLine({
           id: 'currentLine',
           color: 'red',
           label: {
             text: 'Usage Now',
             verticalAlign: 'middle',
             textAlign: 'center'
           },
           value: currentSlot,
           width: 3,
           zIndex: 60
        })

      })

    }

    makePlotBar();
    setInterval(makePlotBar, 2000);
    
  }

});

module.exports = Graph;