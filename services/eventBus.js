const  { EventEmitter }  = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(0)

emitter.on('uncaughtException', function (err) {
    console.log("ccc");
    console.error(err);
});


module.exports = emitter;