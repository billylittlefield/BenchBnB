window.Map = React.createClass({
  mixins: [ReactRouter.History],
  componentDidMount: function() {
    var map = React.findDOMNode(this.refs.map);
    var mapOptions;
    if (this.props.bench) {
      mapOptions = {
        draggable: false,
        center: { lat: this.props.bench.lat, lng: this.props.bench.lng },
        zoom: 15
      };
    } else {
      mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };
    }
    this.map = new google.maps.Map(map, mapOptions);
    if (this.props.bench) {
      new google.maps.Marker({
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: {lat: this.props.bench.lat, lng: this.props.bench.lng}
      });
    } else {
      this.map.addListener('idle', function() {
        var northEast = this.getBounds().getNorthEast();
        var southWest = this.getBounds().getSouthWest();
        var bounds = {
          'northEast':{'lat':northEast['lat'](), 'lng':northEast['lng']()},
          'southWest':{'lat':southWest['lat'](), 'lng':southWest['lng']()},
        };
        FilterActions.changeBounds(bounds);
      });
      this.map.addListener('click', function(e) {
        this.props.handleMapClick({lat: e.latLng.lat(), lng: e.latLng.lng()});
      }.bind(this));
      BenchStore.addIndexChangeEventListener(this.updateMarkers);
      HoveredBenchStore.addHoveredBenchChangeEventListener(this.changeHover);
    }
  },
  componentWillUnmount: function() {
    BenchStore.removeIndexChangeEventListener(this.updateMarkers);
    HoveredBenchStore.removeHoveredBenchChangeEventListener(this.changeHover);
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
    newMarker.addListener('click', function() {
      var newUrl = 'benches/' + inBoundBench.id;
      this.history.pushState(null, newUrl);
    }.bind(this));
    this.setState({ markedBenches: this.state.markedBenches.concat([newMarker])});
  },
  updateMarkers: function() {
    this.clearMarkers();
    BenchStore.all().forEach(function(filteredBench){
      var existingMark = this.findMarker(filteredBench);
      if (existingMark) {                // If marker already in list
        existingMark.setMap(this.map);   // make marker visible again
      } else {                           // If first time seeing this marker
        this.addNewMarker(filteredBench); // Create new marker object, add to list
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div class="map" ref='map'></div>
    );
  }
});
