# Radiojs

RadioJS is a library to provide you a way to communicate your components/objects via publisher/subscriber pattern.

# Table of contents

- [Initial setup](#initial-setup)
- [API methods](#api-methods)
  - [.subscribe(channel, listener)](#subscribe) => object
  - [.publish(channel, subject)](#publish) => void
  - [unsubscribe](#unsubscribe)
  - [getChannels](#getChannels)
  - [resetChannels](#resetChannels)

## Initial setup

To get started, please run this command on your terminal

```shell
make init
```

## API methods


### subscribe

Allows you to subscribe a chosen channel through a listener. When this channel
emits something, it will notify all its listener to execute.

```javascript
radio.subscribe('coffeeChannel', function(data){
  console.log('hi, I will do anything with the data');
});
```

### publish

Allows you broadcast your message through a channel, it allows to send any data
as you like.

```javascript
radio.publish('coffeeChannel', 'macchiato');
```

### unsubscribe

When you invoke subscribe method, it returns to you an object with dispose
method:

```javascript
const subscription = radio.subscribe('demoChannel', (arg) => {
  console.log('this is what i am getting', arg);
});

subscription.unsubscribe();
```

### getChannels

If you want to know which channels you have registered, you can use this method
to know that:


```javascript
radio.subscribe('one', function(d){
  console.log(d);
});

radio.subscribe('two', function(d){
  console.log(parseInt(d) + 13);
});

var channels = radio.getChannels();//['one', 'two']
```

### resetChannels

If you want to reset some channels, you can just use shutdown to reset them.

```javascript
radio.resetChannels('javascript', 'one', 'coffeeChannel');
```

It will reset each of these channels, and will dispose all listeners. If you
want to reset all channels, just invoke it without args

```javascript
radio.resetChannels();
```
