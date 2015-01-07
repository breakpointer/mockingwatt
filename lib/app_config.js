
exports.app_config = {
  "development": {
    "redis": {
      "port": 6379,
      "host": "127.0.0.1",
      "options": {}
    }
  },
  "test": {
    "redis": {
      "port": 6380,
      "host": "127.0.0.1",
      "options": {}
    }
  },
  "production": {
    "redis": {}, // Using REDIS_TO_GO env config instead
  },
  
}