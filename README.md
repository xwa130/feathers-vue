# feathers-vue

> [Feathers](http://feathersjs.com/) is a minimalist real-time web framework written in JavaScript. 
> Feathers-Vue is a plugin for Vue.js that integrates it with Feathers.

**NOTE:** It's supposed to be compatible both with Vue 1.x and 2.x. It requires IE9+ or Safari 5+

### Install

``` bash
npm install feathers-vue --save
```

### Usage

``` js
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
```

Now in every component you get a new property called `$services`, which allows you to interact with all of your Feathers services:

``` js
this.$services.messages.find()

// or

this.$services.messages.create(...)
```

To subscribe on the [events](http://docs.feathersjs.com/real-time/events.html) your services generate, you just need to use a separate `feathers` section in your component:

``` js
export default {
  data() {
    return {
      ...
    }
  },

  methods: {
    ...
  }

  feathers: { // here is our section
    messages: { // here is the subsection for the 'messages' service
      created(data) {
        ...
      },

      updated(data) {
        ...
      }
    }
  }
}
```

feathers-vue does all the clean up before your component is destroyed (using the `removeListener` function).

In case you need to do something more complex, there is a `$feathers` property for that:

``` js
this.$feathers.service('messages').on(...)
```

### License

[MIT](http://opensource.org/licenses/MIT)
