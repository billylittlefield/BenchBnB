window.ApiUtil = {
  fetchBenches: function(params) {
    $.ajax({
      url: '/api/benches',
      dataType: 'json',
      data: params,
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
