var config = require('./app_config.js').app_config;

exports.get = function(context, envName){
  var services={};
  
  //console.log('Setting up services for envName: ', envName);
  //console.log('config:', config[envName]);
   
  // Redis service configuration
  if (context.REDISTOGO_URL) {
    var rtg   = require('url').parse(context.REDISTOGO_URL);
    services.redis = require('redis').createClient(rtg.port, rtg.hostname);
    services.redis.auth(rtg.auth.split(':')[1]);
  } else {
     var redisConf = config[envName]['redis'];
     services.redis = require('redis').createClient(redisConf.port, redisConf.host, redisConf.options);
  }
  return services;
}