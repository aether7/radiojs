function factory() {
  const channels = {};

  return {
    publish(channel, ...args) {
      if (!channels[channel]) {
        return;
      }

      channels[channel].forEach(listener => {
        listener(...args);
      });
    },
    subscribe(channel, listener) {
      if (!channels[channel]) {
        channels[channel] = [];
      }

      channels[channel].push(listener);

      return {
        unsubscribe() {
          channels[channel] = channels[channel].filter(observer => observer !== listener);
        }
      };
    },
    getChannels() {
      return Object.keys(channels);
    },
    resetChannels(...channelNames) {
      const args = channelNames.length ? channelNames : this.getChannels();

      args.forEach(channelName => {
        if (channels[channelName]) {
          channels[channelName].length = 0;
        }
      });
    }
  };
}

module.exports = factory();
