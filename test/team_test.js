Context = require('../src/models/context');
assert = require("assert");
require('./spec_helper');
describe('State change', function() {
	it('should set the team to be displayed in the state', function(done){
		var eventBus = $({});
        var context = new Context(eventBus);
		withInit(context, eventBus, function(initialState){
			assert.equal(initialState.team.length, 6);
			done();
		});
	});
});