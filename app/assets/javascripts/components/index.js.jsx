window.Index = React.createClass({
  getInitialState: function() {
    return { benches: BenchStore.all() };
  },
  updateBenches: function() {
    this.setState({ benches: BenchStore.all() });
  },
  componentWillMount: function() {
    BenchStore.addIndexChangeEventListener(this.updateBenches)
  },
  componentDidUnmount: function() {
    BenchStore.removeIndexChangeEventListener(this.updateBenches);
  },
  changeHover: function() {
    debugger;
  },
  render: function() {
    return (
      <div >
        <ul>
          {this.state.benches.map(function(bench){
            return <IndexItem key={bench.id} bench={bench}/>
          }.bind(this))}
        </ul>
      </div>
    );
  }
});
