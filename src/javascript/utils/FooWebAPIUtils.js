var FooServerActionCreators = require('../actions/FooServerActionCreators');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getAllBars: function() {
    // simulate retrieving data from a database
    var rawBars = JSON.parse(localStorage.getItem('bars'));

    // simulate success callback
    FooServerActionCreators.receiveAll(rawBars);
  },

  createBar: function(bar) {
    // simulate writing to a database
    var rawBars = JSON.parse(localStorage.getItem('bars'));
    var timestamp = Date.now();
    var id = 'b_' + timestamp;
    var createdBar = {
      id: id,
      name: bar.text
    };
    rawBars.push(createdBar);
    localStorage.setItem('bars', JSON.stringify(rawBars));

    // simulate success callback
    setTimeout(function() {
      FooServerActionCreators.receiveCreatedBars(createdBar);
    }, 0);
  }

};
