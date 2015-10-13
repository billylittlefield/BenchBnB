(function(root) {
  'use strict';

  var _filter_params = {
    min_seating: 0,
    max_seating: 999
  };
  var FILTERS_CHANGE_EVENT = "FILTERS_CHANGE_EVENT";

  var change_max_filter = function(max) {
    _filter_params.max_seating = max;
    FilterStore.emit(FILTERS_CHANGE_EVENT);
  };

  var change_min_filter = function(min) {
    _filter_params.min_seating = min;
    FilterStore.emit(FILTERS_CHANGE_EVENT);
  };

  var change_bounds_filter = function(bounds) {
    _filter_params.bounds = bounds;
    FilterStore.emit(FILTERS_CHANGE_EVENT);
  }

  root.FilterStore = $.extend({}, EventEmitter.prototype, {
    filter_params: function() {
      return _filter_params;
    },
    addFilterChangeEventListener: function(callback) {
      this.on(FILTERS_CHANGE_EVENT, callback);
    },
    removeFilterChangeEventListener: function(callback) {
      this.removeListener(FILTERS_CHANGE_EVENT, callback);
    },
    dispatcherId: AppDispatcher.register(function(payload){
      switch (payload.actionType) {
        case FilterConstants.MAX_SEATING_CHANGED:
          change_max_filter(payload.max);
          break;
        case FilterConstants.MIN_SEATING_CHANGED:
          change_min_filter(payload.min);
          break;
        case FilterConstants.BOUNDS_CHANGED:
          change_bounds_filter(payload.bounds);
          break;
      }
    })
  });

}(this));
