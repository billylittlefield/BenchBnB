window.IndexItem = React.createClass({
  changeHover: function() {
    ApiActions.changeHover(this.props.bench);
  },
  removeHover: function() {
    ApiActions.changeHover(null);
  },
  render: function() {
    return (
      <li onMouseOver={this.changeHover} onMouseLeave={this.removeHover}>
        {this.props.bench.description}
      </li>
    );
  }
});
