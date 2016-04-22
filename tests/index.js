var test = require('tape');
var radio = require('../src/radio.js');

function type(obj){
  return Object.prototype.toString.call(obj);
}

test('should be an object', function(assert){
  var actual = type(radio);
  var expected = '[object Object]';

  assert.equal(actual, expected, 'radio should be an object, instead it is a ' + actual);
  assert.end();
});

test('should have all required methods', function(assert){
  var actual = Object.keys(radio).sort();
  var expected = ['channels', 'publish', 'subscribe'];
  var msg = 'radio should have these methods : ' + expected + ', however it has these other: ' + actual;

  assert.deepEqual(actual, expected, msg);
  assert.end();
});

test('channels should be a function returning arrays', function(assert){
  var actualType = typeof radio.channels;
  var expectedType = 'function';
  var actualReturn = type(radio.channels());
  var expectedReturn = '[object Array]';

  assert.equal(actualType, expectedType, 'channels should be a function, instead it is a ' + actualType);
  assert.equal(actualReturn, expectedReturn, 'it should return an array, but it returns ' + actualReturn);
  assert.end();
});

test('should return 0 channels', function(assert){
  var actual = radio.channels();
  var expected = [];
  var msg = 'it should have 0 channels, instead it has : ' + actual;

  assert.deepEqual(actual, expected, msg);
  assert.end();
});

test('subscribe should be a function returning an object with dispose property', function(assert){
  var actualType = typeof radio.subscribe;
  var expectedType = 'function';
  var actualReturn = type(radio.subscribe());
  var expectedReturn = '[object Object]';
  var hasDispose = typeof radio.subscribe().dispose;
  var expectedDiposeType = 'function';

  assert.equal(actualType, expectedType, 'it should be a function, but it is ' + actualType);
  assert.equal(actualReturn, expectedReturn, 'it should be an object, but it is ' + actualReturn);
  assert.equal(hasDispose, expectedDiposeType, 'it should be a function, but it is ' + hasDispose);
  assert.end();
});
