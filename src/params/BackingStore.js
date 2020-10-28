class BackingStore {

  static name = 'backing-store';

  constructor(path) {
    this.path = path;
  }

  serialize() {
    return !this.path ? '' : `${BackingStore.name} ${this.path}\n`;
  }
}

module.exports = BackingStore;
