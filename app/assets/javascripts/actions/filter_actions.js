window.FilterActions = {
  changeMinSeating: function(min) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.MIN_SEATING_CHANGED,
      min: min
    });
  },
  changeMaxSeating: function(max) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.MAX_SEATING_CHANGED,
      max: max
    });
  },
  changeBounds: function(bounds) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.BOUNDS_CHANGED,
      bounds: bounds
    })
  }
};
