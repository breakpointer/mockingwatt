// BOS Meter feed model
// Formats the usage data into a BOS specific format
// We send data over as interval demand, or at least, that's the intention

function BOSMeter(readings){
  _self = this;
  _readings = readings;
}

BOSMeter.prototype.format = function(){
  var bosObj = {
    "datasource": "bos://buildingos-json/mocking-watt-demo",
    "expectedDataResolution": "1",
    "meterCatalog": [
    {
      "meterId": "MockOne",
      "meterName": "Building meter readings",
      "meterUnits": "kWh",
      "meterDescription": "The only one"
    }],
    "readings":[]
  }
  var readingObj = {
    "timestamp": null,
    "buildingLocalTime": true,
    "value": 0,
    "meterId": "MockOne"
  }
  
  _readings.forEach( function (reading, idx, arr){
    readingObj['timestamp'] = reading['timestamp'];
    readingObj['value'] = reading['value'];
    bosObj['readings'].push(readingObj);
  });
  
  return bosObj;  
}; 

module.exports = BOSMeter;