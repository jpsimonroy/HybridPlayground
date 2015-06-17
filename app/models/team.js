var _ = require('underscore');
var $ = require('jquery');
var Deferrable = require('../mixins/deferrable');

var Team = function() {
	this.searchPath = '/ajira/team';
	state = [];
};
Team.prototype.state = function(){
	return state;
};
Team.prototype.displayTeam = function() {
	var deferred = $.Deferred();
	this.index().done(function(data) {
		state = data;
		deferred.resolve(data);
	}).fail(function(xhr, text, error) {
		deferred.fail(text);
	});
	return deferred;

};
_.defaults(Team.prototype, Deferrable);

module.exports = Team;