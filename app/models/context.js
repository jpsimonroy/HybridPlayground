var Team = require('./team');

var Context = function(eventBus) {
	this.eventBus = eventBus;
	this.models = {};
	var that = this;

	var emptyState = function(eventBus) {
		return {
			bus: that.eventBus,
			team: that.models.team ? that.models.team.getState() : []
		};
	};

	eventBus.on("init", function() {
		that.models.team = new Team();
		that.models.team.displayTeam().done(function(data) {
			that.eventBus.trigger("init::complete", that.getState());
		});
	});
};

Context.prototype.getState = function(){
	var that = this;
	return{
		bus: that.eventBus,
		team: that.models.team.getState()
	}
}

module.exports = Context;
