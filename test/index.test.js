// Include and set up feathers client
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

const client = feathers()
  .configure(socketio(io('http://localhost:3030/')))
  .configure(hooks());

// Include it as a CommonJS module
const Vue = require('vue');
const feathersVue = require('feathers-vue');

// And plug it in
Vue.use(feathersVue, client)