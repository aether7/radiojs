# radiojs

RadioJS is a library to provide you a way to communicate your components/objects via publisher/subscriber pattern.

## Subscribe(channel, callback)

Allows you to subscribe a chosen channel,


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

## Publish(channel, [...data])

```javascript
radio.publish('coffeeChannel', 'macchiato');
```


## Channels
