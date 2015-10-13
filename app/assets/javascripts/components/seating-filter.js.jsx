window.SeatingFilter = React.createClass({
  getInitialState: function() {
    return { min: this.props.min,
             max: this.props.max };
  },
  updateMin: function(e) {
    FilterActions.changeMinSeating($('input#min').val());
  },
  updateMax: function() {
    FilterActions.changeMaxSeating($('input#max').val());
  },
  render: function() {
    return (
      <div>
        <label>Minimum Seats:</label>
        <input id='min'
               onChange={this.updateMin}
               type='number'
               step='1'/>
        <label>Maximum Seats:</label>
        <input id='max'
               onChange={this.updateMax}
               type='number'
               step='1'/>
      </div>
    )
  }
});
