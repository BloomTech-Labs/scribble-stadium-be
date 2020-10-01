const { EventEmitter } = require('events');
const dsEmitter = new EventEmitter();

// Callback functions for DS queries
const { submitWritingToDS, submitDrawingToDS } = require('./dsRequests');

// Action dispatch names
const WRITING_SUB = 'WRITING_SUB';
const DRAWING_SUB = 'DRAWING_SUB';

// Emitter listeners that trigger a query
dsEmitter.on(WRITING_SUB, submitWritingToDS);
dsEmitter.on(DRAWING_SUB, submitDrawingToDS);

// Action dispatchers
const dispatchWritingSub = (storyId, pages) => {
  dsEmitter.emit(WRITING_SUB, storyId, pages);
};
const dispatchDrawingSub = (image) => {
  dsEmitter.emit(DRAWING_SUB, image);
};

module.exports = { dispatchWritingSub, dispatchDrawingSub };
