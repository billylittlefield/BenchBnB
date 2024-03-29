window.BenchForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  blankAttrs: {
    lat: 0,
    lng: 0,
    description: '',
    seating: 0
  },
  getInitialState: function() {
    return { lat: parseFloat(this.props.location.query.lat),
             lng: parseFloat(this.props.location.query.lng),
             description: '',
             seating: 0 };
  },
  formSubmit: function(e) {
    e.preventDefault();
    ApiUtil.createBench({bench: this.state});
    this.props.history.pushState(null, '');
  },
  render: function() {
    return (
      <form onSubmit={this.formSubmit}>
        <label>Latitude:
          <input
            type="number"
            step="any"
            valueLink={this.linkState("lat")}/>
        </label>
        <br/>
        <br/>
        <label>Longitude:
          <input
            type="number"
            step="any"
            valueLink={this.linkState("lng")}/>
        </label>
        <br/>
        <br/>
        <label>Seating:
          <input
            type="number"
            step="1"
            valueLink={this.linkState("seating")}/>
        </label>
        <br/>
        <br/>
        <label>Description:
          <input
            type="text"
            valueLink={this.linkState("description")}/>
        </label>
        <br/>
        <br/>
        <input type="submit" value="Create Bench"/>
      </form>
    );
  }
});
