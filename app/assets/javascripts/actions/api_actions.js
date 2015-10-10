window.ApiActions = {
  receiveAll: function(benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },
  changeHover: function(bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.HOVER_CHANGED,
      bench: bench
    });
  },
  addBench: function(bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_ADDED,
      bench: bench
    });
  }
};
