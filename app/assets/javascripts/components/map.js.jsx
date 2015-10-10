window.Map = React.createClass({
  componentDidMount: function() {
    var map = document.getElementById('map');
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.map.addListener('idle', function() {
      var northEast = this.getBounds().getNorthEast();
      var southWest = this.getBounds().getSouthWest();
      var bounds = {
        'northEast':{'lat':northEast['lat'](), 'lng':northEast['lng']()},
        'southWest':{'lat':southWest['lat'](), 'lng':southWest['lng']()},
      };
      ApiUtil.fetchBenches({bounds: bounds});
    });
    BenchStore.addIndexChangeEventListener(this.updateMarkers);
    HoveredBenchStore.addHoveredBenchChangeEventListener(this.changeHover);
  },
  getInitialState: function() {
    return { markedBenches: [] };
  },
  clearHover: function() {
    this.state.markedBenches.forEach(function(markedBench){
      markedBench.setAnimation(null);
    });
  },
  changeHover: function() {
    if (HoveredBenchStore.hoveredBench()) {
      var hoverBench = this.findMarker(HoveredBenchStore.hoveredBench());
      hoverBench.setAnimation(google.maps.Animation.BOUNCE);
    } else {
      this.clearHover();
    }
  },
  clearMarkers: function() {
    this.state.markedBenches.forEach(function(markedBench){
      markedBench.setMap(null);
    });
  },
  findMarker: function(bench) {
    var match = this.state.markedBenches.filter(function(markedBench){
      return markedBench.benchId === bench.id;
    });
    return match[0];
  },
  addNewMarker: function(inBoundBench) {
    var newMarker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      benchId: inBoundBench.id,
      animation: google.maps.Animation.DROP,
      position: {lat: inBoundBench.lat, lng: inBoundBench.lng}
    });
    this.setState({ markedBenches: this.state.markedBenches.concat([newMarker])})
  },
  updateMarkers: function() {
    this.clearMarkers();                // Set map to null for all markers
    BenchStore.all().forEach(function(inBoundBench){
      var existingMark = this.findMarker(inBoundBench);
      if (existingMark) {                // If marker already in list
        existingMark.setMap(this.map);   // make marker visible again
      } else {                           // If first time seeing this marker
        this.addNewMarker(inBoundBench); // Create new marker object, add to list
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div onClick={this.renderBenchForm} className="map" id='map'></div>
    );
  }
});
