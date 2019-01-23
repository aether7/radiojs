# Radiojs

RadioJS is a library to provide you a way to communicate your components/objects via publisher/subscriber pattern.

# Table of contents

- [Initial setup](#initial-setup)
- API


## Initial setup

To get started, please run this command on your terminal

```shell
make init
```

## Subscribe(channelName, callback)

Allows you to subscribe a chosen channel through a listener. When this channel emits something,
it will notify all its listener to execute.

**Example**
```javascript
radio.subscribe('coffeeChannel', function(data){
  console.log('hi, I will do anything with the data');
});
```

When you invoke subscribe method, it returns to you an object with dispose method:

```javascript
var disposable = radio.subscribe('coffeeChannel', function(data){
  //some instructions to do with data
});

//if I want to remove my listener to channel, just invoke dispose
disposable.dispose();
```

## Publish(channelName, [...data])

Allows you broadcast your message through a channel, it allows to send any data as you like.

```javascript
radio.publish('coffeeChannel', 'macchiato');
```


## Channels

If you want to know which channels you have registered, you can use this method to know that:

```javascript
radio.subscribe('one', function(d){
  console.log(d);
});

radio.subscribe('two', function(d){
  console.log(parseInt(d) + 13);
});

var channels = radio.channels();//['one', 'two']
```

### Shutdown(...channelName)

If you want to reset some channels, you can just use shutdown to reset them.

```javascript
radio.shutdown('javascript', 'one', 'coffeeChannel');
```

It will reset each of these channels, and will dispose all listeners. If you want to reset all channels, just invoke it without args

```javascript
radio.shutdown();
```
