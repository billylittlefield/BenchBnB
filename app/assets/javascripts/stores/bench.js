(function(root) {
  'use strict';
  var _benches = [];
  var BENCH_INDEX_CHANGE_EVENT = "BENCH_INDEX_CHANGE_EVENT";

  var resetBenches = function(benches) {
    _benches = benches;
    BenchStore.emit(BENCH_INDEX_CHANGE_EVENT);
  };

  var addBench = function(benches) {
    _benches.push(BENCH_INDEX_CHANGE_EVENT);
  };

  root.BenchStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _benches.slice();
    },
    addIndexChangeEventListener: function(callback) {
      this.on(BENCH_INDEX_CHANGE_EVENT, callback);
    },
    removeIndexChangeEventListener: function(callback) {
      this.removeListener(BENCH_INDEX_CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case BenchConstants.BENCHES_RECEIVED:
          resetBenches(payload.benches);
          break;
        case BenchConstants.BENCH_ADDED:
          addBench(payload.bench);
          break;
      }
    })
  });

}(this));
