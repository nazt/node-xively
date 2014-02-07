/*
 * node-xively
 * https://github.com/nat/grunt
 *
 * Copyright (c) 2014 Nat
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');

module.exports = function(apiHost) {
  var apiKey = "";
  var apiEndpoint = 'http://api.xively.com/v2';

  this.apiEndpoint = apiEndpoint;
  this.apiHost = apiHost;
  
  this.setKey = function (_apiKey) {
    apiKey =  _apiKey;
    this.apiKey = _apiKey;
  };

  this._settings = function() {
    return {
      apiHost: this.apiHost,
      apiKey: this.apiKey
    };
  };

  this.version = function() {
    return '1';
  };

  this.feed = {
      get: function(id, callback) {
        var options = {
          headers: {
            "X-ApiKey" : apiKey,
            "Content-Type": "application/json"
          }
        };
        request.get(apiEndpoint + "/feeds/" + id, options, callback);
      },
      new: function(id, data) {
        var options = { 
            headers: {
              "X-ApiKey" : apiKey,
              "Content-Type": "application/json",
              "Accept": "*/*",
              "User-Agent": "nodejs"
            },
            body: JSON.stringify(data.data_point)
          };

        request.put(apiEndpoint+"/feeds/"+id, options, data.callback); }, // console.log()
  };
};
