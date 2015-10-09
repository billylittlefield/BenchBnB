(function(root) {
  'use strict';
  var _hoveredBench = null;
  var HOVERED_BENCH_CHANGE_EVENT = "HOVERED_BENCH_CHANGE_EVENT";

  var updateHoveredBench = function(bench) {
    _hoveredBench = bench;
    HoveredBenchStore.emit(HOVERED_BENCH_CHANGE_EVENT);
  };

  root.HoveredBenchStore = $.extend({}, EventEmitter.prototype, {
    hoveredBench: function() {
      return _hoveredBench;
    },
    addHoveredBenchChangeEventListener: function(callback) {
      this.on(HOVERED_BENCH_CHANGE_EVENT, callback);
    },
    removeHoveredBenchChangeEventListener: function(callback) {
      this.removeListener(HOVERED_BENCH_CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case BenchConstants.HOVER_CHANGED:
          updateHoveredBench(payload.bench);
          break;
      }
    })
  });
}(this));
