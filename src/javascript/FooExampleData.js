module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('bars', JSON.stringify([
      {
        id: 'b_1',
        name: 'Bar One',
      },
      {
        id: 'b_2',
        name: 'Bar Two',
      },
      {
        id: 'b_3',
        name: 'Bar Three',
      },
      {
        id: 'b_4',
        name: 'Bar Four',
      }
    ]));
  }

};
