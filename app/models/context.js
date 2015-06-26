var Team = require('./team');

var Context = function(eventBus) {
	this.eventBus = eventBus;

	this.models = {};
	var that = this;
	var emptyState = function(eventBus) {
		return {
			bus: that.eventBus,
			team: that.models.team ? that.models.team.state() : []
		};
	};

	var state = function() {
		return {
			bus: that.eventBus,
			team: that.models.team.state()
		}
	};

	eventBus.on("init", function() {
		that.models.team = new Team();
		that.models.team.displayTeam().done(function(data) {
			that.eventBus.trigger("init::complete", state());
		});
	});
};

module.exports = Context;
