var React = require('react');
var _ = require('underscore');

var Header = React.createClass({
	render: function() {
		return (<header>
			<h1>Contacts Database</h1>
		</header>);
	}
});

var Member = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.name}</td>
			</tr>
		)
	}
});

var Team = React.createClass({
	render: function(){
		var members = this.props.model.team.map(function(member){
			return(
				<Member id={member.id} name={member.name}/>
			);
		});
		return (
			<table className='tbl-team'>
				{members}
			</table>
		)
	}
});


var App = React.createClass({
	render: function() {
		return (
			<span>
				<Header/>
				<Team model={this.props}/>
			</span>
		);
	}
});



exports.App = App;
