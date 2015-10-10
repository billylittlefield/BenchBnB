window.ApiUtil = {
  fetchBenches: function(bounds) {
    $.ajax({
      url: '/api/benches',
      dataType: 'json',
      data: bounds,
      success: function (benches) {
        ApiActions.receiveAll(benches);
      }
    });
  },
  createBench: function(bench) {
    $.ajax({
      type: 'POST',
      url: '/api/benches',
      dataType: 'json',
      data: bench,
      success: function (bench) {
        ApiActions.addBench(bench);
      }
    });
  }
};
