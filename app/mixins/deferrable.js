var $ = require('jquery');
var Deferrable = {
  get: function(query, callback) {
    return this._resource(this.path, query, callback);
  },
  index: function(query, callback) {
    return this._resource(this.searchPath, query, callback);
  },
  _init: function(path, value) {
    this._resultTicker = this._resultTicker || {};
    this._resultTicker[path] = value;
    this._cache = this._cache || {};
  },
  _cacheKey: function(path, query) {
    return path + ':' + JSON.stringify(query);
  },
  _withCallback: function(callback, data) {
    return callback ? callback.bind(this)(data) : data;
  },
  _resource: function(path, query, callback) {
    var that = this;
    var deferred = $.Deferred();
    var cacheKey = this._cacheKey(path, query);
    this._init(path, cacheKey);
    $.ajax({
      url: window.apiContext + path,
      data: query
    }).done(function(data) {
      that._cache[that._cacheKey(path, query)] = data;
      if (that._resultTicker[path] === cacheKey) {
        deferred.resolve(that._withCallback(callback, data));
      } else {
        deferred.fail("Slow Request ignored");
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      deferred.fail(errorThrown);
    });
    return deferred;
  }
}
module.exports = Deferrable;