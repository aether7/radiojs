var test = require('tape');
var radio = require('../src/radio.js');

function type(obj){
  return Object.prototype.toString.call(obj);
}

function teardown(){
  radio.shutdown();
}

function failMaker(channelName){
  return function(){
    assert.ok(0, 'listener in channel ' + channelName + ' still remain here');
  };
};

test('should be an object', function(assert){
  var actual = type(radio);
  var expected = '[object Object]';

  assert.equal(actual, expected, 'radio should be an object, instead it is a ' + actual);
  assert.end();
});

test('should have all required methods', function(assert){
  var actual = Object.keys(radio).sort();
  var expected = ['channels', 'publish', 'shutdown', 'subscribe'];
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

test('publish should emit the correct data type', function(assert){
  radio.subscribe('one', function(d){
    var actual = typeof d;
    var expected = 'number';

    assert.equal(actual, expected, 'data type should be a number not ' + actual);
  });

  radio.publish('one', 1);
  teardown();
  assert.end();
});

test('shutdown should remove each listener from given channels', function(assert){
  radio.subscribe('one', failMaker('one'));
  radio.subscribe('two', failMaker('two'));
  radio.subscribe('three', failMaker('three'));
  radio.shutdown('one', 'two', 'three');
  radio.publish('one');
  radio.publish('two');
  radio.publish('three');

  assert.pass('all channels were reset');
  teardown();
  assert.end();
});

test('shutdown should remove all listeners from all channels', function(assert){
  var channels = 'one two three four five six seven'.split(' ');

  channels.forEach(function(channel){
    radio.subscribe(channel, failMaker(channel));
  });

  radio.shutdown();
  channels.forEach(function(channel){ radio.publish(channel, 1); });

  assert.pass('all channels were reset');
  teardown();
  assert.end();
});
