/** @jsx React.DOM */

var React = require('react');

var Graph = React.createClass({

  render: function() {

    var baseLineData = [];
    var maskingData = [];
    var consumptionData = [];

    for (var i = 0; i < this.props.usageData.length; i++) {
      
      var slot = this.props.usageData[i].slot;
      var now = new Date();
      var timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDay(), Math.floor(slot/60), (slot % 60));
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
          height: 300,
          style: {
            paddingBottom: "10px",
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
              display: "none",
              fontWeight: "bold",
              fontSize: "1.8em"
            }
          }
        },
        yAxis: {
          title: {
            text: "kW",
            margin: 5,
            style: {
              fontWeight: "bold",
              fontSize: "1.8em",
            }
          },
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
            lineColor: '#333',
            pointInterval: 1000 // one minute
          }
        },
        series: [
        {
          type: 'area',
          name: 'Consumption', 
          color: '#b32b22', // red usage above
          data: consumptionData,
          index: 10,
          enableMouseTracking: false //turn off tooltip
        },
        {
          type: 'area',
          name: 'Baseline',
          color: '#1c9632', // green usage below
          data: baseLineData,
          index: 20,
          enableMouseTracking: false //turn off tooltip
        },
        {
          type: 'area',
          name: 'Graph Mask',
          color: '#fff081', //Main graph color
          data: maskingData,
          index: 30,
          enableMouseTracking: false //turn off tooltip
        },
        {
          id: 'total_consumption',
          type: 'line',
          name: 'Energy Consumption',
          color: '#333', // the trend line 
          data: consumptionData,
          lineWidth: 1.5,
          index: 40,
          enableMouseTracking: true //turn ON tooltip here only
        }]
      });
    });

    var consumeStyle = {
      color: '#333',
      left: '80px',
      position: 'relative',
      fontSize: '47px',
      padding: '20px 10px 10px 10px'
    };
     
    var wattStyle = {
      color: '#333',
      padding: '0px',
    };
    
    var labelStyle = {
      color: '#999',
      padding: '3px',
      fontSize: '20px',
    };
 
   
    return (
      <div>
        <div style={consumeStyle} id="consumption">
          <span style={labelStyle}>usage now</span>
          <span style={wattStyle} id="currentConsumption" className="energy">
          </span>
        </div>
        <div id="highcharts"></div>
      </div>
    );
  },

  componentDidMount: function() {

    var makePlotBar = function() {
      
      $(function () {
        var chart = $('#highcharts').highcharts();
        
        var now = new Date();
        var currentSlot = Date.UTC(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours(), now.getMinutes());
        var consumptionData = chart.get('total_consumption').data;
      
        // Getting the consumption data from the graph to update the plotbands
        var firstValue = consumptionData[0];
        var startSlot = 0;
        if (isNaN(firstValue.x)) {
          startSlot = Date.UTC(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours()-1, now.getMinutes());
        }
        else{
          startSlot = firstValue.x;
        }
       
        chart.xAxis[0].removePlotBand('pastBand');
        chart.xAxis[0].removePlotLine('currentLine');

        chart.xAxis[0].addPlotBand({
          id: 'pastBand',
          color: 'rgba(210,210,210,0.4)',
          label: {
            text: 'Past consumption',
            style: {
              fontSize: '1.3em',
              padding: '5px',
              color: '#999999'
            }
          },
          from: startSlot,
          to: currentSlot,
          zIndex: 1000,
        })
        var matches = $.grep(consumptionData, function(e) { return e.x == currentSlot });
        var consumptionNow = '';
        if (matches.length > 0){
          consumptionNow = matches[0].y.toFixed(2) + ' kW';
          // Update the current consumption widget too
          $('#currentConsumption').html(consumptionNow);
        }
        chart.xAxis[0].addPlotLine({
           id: 'currentLine',
           color: 'rgba(235,127,84,1.0)',
           label: {
             text: 'Now',
             style: {
              fontSize: '1.3em',
              color: '#eb7f54',
              fontWeight: 'bold'
             }
           },
           value: currentSlot,
           width: 2,
           zIndex: 1001
        })

      })

    }

    makePlotBar();
    setInterval(makePlotBar, 2000);
    
  }

});

module.exports = Graph;