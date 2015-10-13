window.ShowPage = React.createClass({
  componentWillMount: function() {
    $.ajax({
      url: 'api' + this.props.location.pathname,
      dataType: 'json',
      async: false,
      success: function (bench) {
        this.setState({ bench: bench });
      }.bind(this)
    });
  },
  getInitialState: function() {
    return { bench: {
      seating: 0,
      lat: 0,
      lng: 0,
    } };
  },
  render: function() {
    return (
      <div>
        <h3>{this.state.bench.description}</h3>
        <a href="/">Back to All Benches</a>
        <p><strong>Seating: </strong>{this.state.bench.seating}</p>
        <p><strong>Latitude: </strong>{this.state.bench.lat}</p>
        <p><strong>Longitude: </strong>{this.state.bench.lng}</p>
        <Map bench={this.state.bench}/>
      </div>
    );
  }
});
