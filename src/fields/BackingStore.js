const Field = require('./Field');
const name = 'backing-store';

class BackingStore extends Field {
  static get Name() {
    return name;
  };

  get name() {
    return name;
  };
}

module.exports = BackingStore;
