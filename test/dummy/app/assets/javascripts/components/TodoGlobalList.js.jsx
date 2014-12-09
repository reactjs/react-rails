TodoGlobalList = React.createClass({
    getInitialState: function() {
        return({mounted: "nope"});
    },
    componentWillMount: function() {
        this.setState({mounted: 'yep'});
    },
    render: function() {
        return (
            <ul>
                <li id='status'>{this.state.mounted}</li>
        {todos.map(function(todo, i) {
            return (<Todo key={i} todo={todo} />)
        })}
            </ul>
            )
    }
})