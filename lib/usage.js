// Usage model
// Interfaces with redis to read/update values in the allocated usage
// time slots 0..1440
function Usage(redis){
  this.redis = redis;
  this.setName = 'usage';
  this.maxSlots = 1440;// <== the number of minutes in 24hours
}

Usage.prototype.get = function(startSlot, count, done){
  var usage = []; 
  var slotList = this._slotWindow(startSlot, count);
  // Getting the keys from the list
  this.redis.hmget(this.setName, slotList, function (err, result){
    if (err) return done(err, "Error getting keys " + slotList);
    var usage = [];
    for (x in result){
      usage.push(JSON.parse(result[x]));
    }
    return done(null, usage);
  });
};

Usage.prototype.increase = function (startSlot, done){
  var biasValues = this._loadAdjustments();
  this._biasSlotValues(startSlot, biasValues, 'increase', function (err, result){
    return done(null, true);
  });
};

Usage.prototype.decrease = function (startSlot, done){
  var biasValues = this._loadAdjustments();
  this._biasSlotValues(startSlot, biasValues, 'decrease', function (err, result){
    return done(null, true);  
  });
};

Usage.prototype._biasSlotValues = function(startSlot, biasValues, direction, done){
  var self = this;
  self.get(startSlot, biasValues.length, function (err, result){
    if (err) return done(err, "Error getting slots ");
    // make the adjustments
    var newUsage = {};
    var slotList = self._slotWindow(startSlot, result.length);
    for(x in result){
      if (direction == 'increase'){
        result[x]['bias'] = result[x]['bias'] + biasValues[x];
      }
      else{
        result[x]['bias'] = result[x]['bias'] - biasValues[x];
      }
      // update the new usage object with the altered records
      // creating a hash to load to redis
      newUsage[slotList[x]] = JSON.stringify(result[x]);
    }
    // persist the new usage values
    self.redis.hmset(self.setName, newUsage, function (err, result){
      if (err) return done(err, "Error updaing biased slot values");
      return done(null, true);
    });
  });
};

Usage.prototype.reset = function (done) {
  var usage = {};
  var count = this.maxSlots; 
  // Iterate over the slots and generate faked data load baseline data
  for (var slot=0; slot < count; slot++){
    var fakeValue = (Math.random() * 3) + (Math.sin(slot/10)*4) + 10;
    var fakeBias = 0;//(Math.random() *2) + Math.cos(slot/10)*10;
    var slotKey = "slot:" + slot;
    usage[slotKey] = JSON.stringify({"slot": slot, "value": fakeValue, "bias": fakeBias});
  }
  // Write the faked baseline data to redis 
  this.redis.hmset(this.setName, usage, function (err, result) {
    if (err) return done(true, "Error writing usage update to Redis");
    return done(null, result);
  });
};

Usage.prototype._slotWindow = function (startSlot, count){
  var slotList = [];
  // Gathering a list of the keys we need to request
  for(var i=0; i < count; i++){
    var slot = 0;
    if ((startSlot + i) < this.maxSlots){
      slot = startSlot + i;
      slotList.push('slot:' + slot);
    } else { //Wrap around to beginning
      slot = (startSlot + i) - this.maxSlots;
      slotList.push('slot:' + slot);
    }
  }  
  return slotList;
}

Usage.prototype._loadAdjustments = function () {
  // Load adjustment bias over 15 slots
  return [0.1, 0.3, 0.5, 1.0, 1.1, 1.8, 1.6, 1.5, 1.1, 1.0, 0.5, 0.2, 0.1, 0.1, 0.1 ];
}
// exporting the class object
module.exports = Usage;