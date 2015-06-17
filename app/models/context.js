var Team = require('./team');

var Context = function(eventBus) {
	models = {}
	var emptyState = function(eventBus) {
		return {
			bus: eventBus,
			team: models.team ? models.team.state() : []
		};
	};

	var state = function() {
		return {
			bus: eventBus,
			team: models.team.state()
		}
	};

	eventBus.on("init", function() {
		models.team = new Team();
		models.team.displayTeam().done(function(data) {
			eventBus.trigger("init::complete", state());
		});
	});
};

module.exports = Context;