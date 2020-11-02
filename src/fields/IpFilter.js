const Field = require('./Field');
const name = 'initiator-address'

class IpFilter extends Field {
  static get Name() {
    return name;
  };
  get name() {
    return name;
  };
}

module.exports = IpFilter;
