jsdom = require('jsdom').jsdom;
document = jsdom('<html><head><script></script></head><body></body></html>');
window = document.defaultView
window.contextURI = "http://localhost:5558"
navigator = window.navigator = {};
navigator.userAgent = 'NodeJs JsDom';
navigator.appVersion = '';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
jQuery = $ = require("jquery");
$.support.cors = true;
jQuery.ajaxSettings.xhr = function() {
  return new XMLHttpRequest;
};

withInit = function(context, bus, test) {
  bus.trigger('init');
  bus.on('init::complete', function(evt, state) {
    test(state);
  });
}
