window.Search = React.createClass({
  getInitialState: function() {
    return { filter_params: FilterStore.filter_params()};
  },
  componentDidMount: function() {
    FilterStore.addFilterChangeEventListener(this.updateFilters);
  },
  componentWillUnmount: function() {
    FilterStore.removeFilterChangeEventListener(this.updateFilters);
  },
  updateFilters: function() {
    ApiUtil.fetchBenches(this.state.filter_params);
    this.setState(FilterStore.filter_params());
  },
  handleMapClick: function(coords) {
    this.props.history.pushState(null, 'benches/new', coords);
  },
  render: function() {
    return (
      <div className="page-container">
        <Map className="map" handleMapClick={this.handleMapClick}/>
        <SeatingFilter className="seating-filter"
                       max={this.state.filter_params.max_seating}
                       min={this.state.filter_params.min_seating} />
        <Index className="index"/>
      </div>
    );
  }
});
