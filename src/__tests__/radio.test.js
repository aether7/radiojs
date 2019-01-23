const radio = require('../radio');

describe('> radio', () => {
  it('should be a Object', () => {
    const actual = Object.prototype.toString.call(radio);
    const expected = '[object Object]';

    expect(actual).toBe(expected);
  });

  it('should have all methods required', () => {
    const actual = Object.keys(radio).sort();
    var expected = ['channels', 'publish', 'shutdown', 'subscribe'];

    expect(actual).toEqual(expected);
  });
});

describe('> radio create channel', () => {
  let listener;

  beforeEach(()=> {
    radio.shutdown();
    listener = jest.fn();
    radio.subscribe('channel1', listener);
  });

  it('shouldn`t call to non-existent channel', () => {
    radio.publish('non-existent');
    expect(listener).not.toBeCalled()
  })

  it('should call function', () => {
    radio.publish('channel1');
    expect(listener).toBeCalled();
  });

  it('should there is the channel in the list', () => {
    const actual = radio.channels();
    const expected = [ 'channel1' ]
    expect(actual).toEqual(expected);
  });

  it('should clear all channels', () => {
    radio.shutdown();
    radio.publish('channel1');

    expect(listener).not.toBeCalled();
  });

  it('should clear one channel', () => {
    radio.shutdown('channel1');

    const listener2 = jest.fn();
    radio.subscribe('channel2', listener2);

    radio.publish('channel1');
    radio.publish('channel2');

    expect(listener).not.toBeCalled();
    expect(listener2).toBeCalled();
  });

  it('should clear non-existent channel', () => {
    radio.shutdown('non-existent');
    radio.publish('non-existent');
    
    expect(listener).not.toBeCalled();
  })
});

describe('> radio unsubscribe channel', () => {
  beforeEach(() => {
    radio.shutdown();
  });

  it('should dispose channel', () => {
    const listener = jest.fn();
    radio.subscribe('channel1', listener).dispose();
    radio.publish('channel1');
    expect(listener).not.toBeCalled();
  });

});
