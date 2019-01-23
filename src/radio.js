function factory() {
  const channels = {};
  const { slice } = Array.prototype;

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
        dispose() {
          channels[channel] = channels[channel].filter(observer => observer !== listener);
        }
      };
    },
    channels() {
      return Object.keys(channels);
    },
    shutdown() {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments.length ? slice.call(arguments) : this.channels();

      args.forEach(channelName => {
        if (channels[channelName]) {
          channels[channelName].length = 0;
        }
      });
    }
  };
}

module.exports = factory();
