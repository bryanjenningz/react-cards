var Hello = React.createClass({
  render: function() {
    return <h1>Hi</h1>;
  }
});

React.render(<Hello />, document.getElementById('app'));
