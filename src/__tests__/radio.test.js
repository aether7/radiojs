const { describe, it, beforeEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const radio = require('../radio');

describe('> radio', () => {
  it('should be a Object', () => {
    const actual = Object.prototype.toString.call(radio);
    assert.strictEqual(actual, '[object Object]');
  });

  it('should have all methods required', () => {
    const actual = Object.keys(radio).sort();
    assert.deepStrictEqual(actual, ['getChannels', 'publish', 'resetChannels', 'subscribe']);
  });
});

describe('> radio create channel', () => {
  let listener;

  beforeEach(() => {
    radio.resetChannels();
    listener = mock.fn();
    radio.subscribe('channel1', listener);
  });

  it('shouldn`t call to non-existent channel', () => {
    radio.publish('non-existent');
    assert.strictEqual(listener.mock.calls.length, 0);
  });

  it('should call function', () => {
    radio.publish('channel1');
    assert.ok(listener.mock.calls.length > 0);
  });

  it('should there is the channel in the list', () => {
    assert.deepStrictEqual(radio.getChannels(), ['channel1']);
  });

  it('should clear all channels', () => {
    radio.resetChannels();
    radio.publish('channel1');
    assert.strictEqual(listener.mock.calls.length, 0);
  });

  it('should clear one channel', () => {
    radio.resetChannels('channel1');

    const listener2 = mock.fn();
    radio.subscribe('channel2', listener2);

    radio.publish('channel1');
    radio.publish('channel2');

    assert.strictEqual(listener.mock.calls.length, 0);
    assert.ok(listener2.mock.calls.length > 0);
  });

  it('should clear non-existent channel', () => {
    radio.resetChannels('non-existent');
    radio.publish('non-existent');
    assert.strictEqual(listener.mock.calls.length, 0);
  });
});

describe('> radio unsubscribe channel', () => {
  beforeEach(() => {
    radio.resetChannels();
  });

  it('should dispose channel', () => {
    const listener = mock.fn();
    radio.subscribe('channel1', listener).unsubscribe();
    radio.publish('channel1');
    assert.strictEqual(listener.mock.calls.length, 0);
  });
});
