const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('writing_sub', () => {});

module.exports = emitter;
