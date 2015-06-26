var React = require('react');
var views = require('./views/views.jsx');
var $ = require('jquery');
var Context = require('./models/context');
window.apiContext = "API_CONTEXT_URI";

$(document).ready(function () {
  var bus = $({});
  new Context(bus);
  var render = function(evt, state){
    React.render(React.createElement(views.App, state), document.getElementById('app'));
  };
  bus.on('app::state_changed', render);
  bus.on('init::complete', render);
  bus.trigger('init');
});
