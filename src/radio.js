(function(factory){
  if(typeof module !== 'undefined'){
    module.exports = factory();
  }else{
    window.radio = factory();
  }
})(function(){
  var channels = {}, slice = Array.prototype.slice;

  return {
    publish: function(channel){
      var args = slice.call(arguments, 1);

      if(!channels[channel]) {
        return;
      }

      channels[channel].forEach(function(listener){
        listener.apply(null, args);
      });
    },
    subscribe: function(channel, listener){
      if(!channels[channel]){
        channels[channel] = [];
      }

      channels[channel].push(listener);

      return {
        dispose: function(){
          channels[channel] = channels[channel].filter(function(observer){
            return observer !== listener;
          });
        }
      };
    },
    channels: function(){
      return Object.keys(channels);
    },
    shutdown: function(){
      var args = arguments.length ? slice.call(arguments) : this.channels();

      args.forEach(function(channelName){
        if(channels[channelName]){
          channels[channelName].length = 0;
        }
      });
    }
  };
});
