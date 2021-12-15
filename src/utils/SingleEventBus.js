import events from "events";

class SingleEventBus {
  constructor() {
    this.event = new events();
  }

  getEvent() {
    return this.event;
  }

  emit(eventName, ...args) {
    return this.event.emit(eventName, ...args);
  }

  on(eventName, callback) {
    this.event.on(eventName, callback);
    return () => {
      this.event.removeListener(eventName, callback);
    };
  }

  off(eventName, callback) {
    return callback
      ? this.event.removeListener(eventName, callback)
      : this.event.removeAllListeners(eventName);
  }
}

export default new SingleEventBus();
