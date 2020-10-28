const Field = require('./Field');
const name = 'backing-store';

class BackingStore extends Field {
  static Name = name;
  name = name;
}

module.exports = BackingStore;
