(function() {
  'use strict';

  var plugin = {
    install: function(Vue, server) {

      // Every component will have this
      Vue.mixin({
        created: function() {
          // Setting up the client
          this.$feathers = server;
          // Setting up the services
          this.$services = server.services;

          var feathers = this.$options.feathers;
          if(!feathers)
            return;

          // Setting up the events
          Object.keys(feathers).forEach(function(serviceKey) {
            var service = feathers[serviceKey];
            Object.keys(service).forEach(function(eventKey) {
              server.service(serviceKey)
                .on(eventKey, service[eventKey].bind(this));
            });
          });
        },

        beforeDestroy: function() {
          var feathers = this.$options.feathers;
          if(!this.$options || !feathers)
            return;

          // Removing the events
          Object.keys(feathers).forEach(function(serviceKey) {
            var service = feathers[serviceKey];
            Object.keys(service).forEach(function(eventKey) {
              server.service(serviceKey)
                .removeListener(eventKey, service[eventKey].bind(this));
            });
          });
        }
      });
    }
  };

  if(typeof exports === 'object' && typeof module === 'object') {
    module.exports = plugin;
  } else if(typeof define === 'function' && define.amd) {
    define(function () { return plugin; });
  } else if (typeof window !== 'undefined') {
    window.VueAsyncData = plugin;
  }
})();