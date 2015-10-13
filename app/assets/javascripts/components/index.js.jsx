window.Index = React.createClass({
  getInitialState: function() {
    return { benches: BenchStore.all() };
  },
  updateBenches: function() {
    this.setState({ benches: BenchStore.all() });
  },
  componentDidMount: function() {
    BenchStore.addIndexChangeEventListener(this.updateBenches)
  },
  componentWillUnmount: function() {
    BenchStore.removeIndexChangeEventListener(this.updateBenches);
  },
  changeHover: function() {
    debugger;
  },
  render: function() {
    return (
      <div >
        <h2>BENCHES</h2>
        <ul>
          {this.state.benches.map(function(bench){
            return <IndexItem key={bench.id} bench={bench}/>
          }.bind(this))}
        </ul>
      </div>
    );
  }
});
