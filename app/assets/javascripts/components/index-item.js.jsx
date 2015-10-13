window.IndexItem = React.createClass({
  mixins: [ReactRouter.History],
  changeHover: function() {
    ApiActions.changeHover(this.props.bench);
  },
  removeHover: function() {
    ApiActions.changeHover(null);
  },
  renderShowPage: function() {
    benchUrl = 'benches/' + this.props.bench.id;
    this.history.pushState(null, benchUrl);
  },
  render: function() {
    return (
      <li onMouseOver={this.changeHover}
          onMouseLeave={this.removeHover}
          onClick={this.renderShowPage}>
        {this.props.bench.description}
      </li>
    );
  }
});
