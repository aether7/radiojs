(function(factory){
  if(typeof module !== 'undefined'){
    module.exports = factory();
  }else{
    window.radio = factory();
  }
})(function(){
  var channels = {};

  return {
    publish: function(channel){
      var args = Array.prototype.slice.call(arguments, 1);

      channels[channel].forEach(function(listener){
        listener.apply(args);
      });
    },
    subscribe: function(channel, listener){
      if(!channels[channel]){
        channels[channel] = [];
      }

      channels[channel].push(listener);

      return {
        unsubscribe: function(){
          channels[channel] = channels[channel].filter(function(observer){
            return observer !== listener;
          });
        }
      };
    },
    channels: function(){
      return Object.keys(channels);
    }
  };
});
