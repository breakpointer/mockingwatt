// Usage model
// Interfaces with redis to read/update values in the allocated usage
// time slots 0..1440

exports.getRange = function(startSlot, count, done){
  usage = [];
  for (var i=0; i < count; i++){
    var slotNow =  startSlot + i;
    var fakeValue = Math.ceil((Math.sin(slotNow/10)*2) + 15);
    var fakeBias = Math.ceil(Math.cos(slotNow/10)*10);
    usage.push({"slot": slotNow, "value": fakeValue, "bias": fakeBias});
  }
  // if err return done(true, null);
  return done(null, usage);
};

exports.applyIncrement = function (startSlot, done){

  return done(null, true);  
};

exports.applyDecriment = function (startSlot, done){
  
  return done(null, true);  
};

exports.resetAdjustments = function (argument, done) {
  
  
  return done(null, true);  
};