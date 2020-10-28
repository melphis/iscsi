const Field = require('./Field');
const name = 'initiator-address'

class IpFilter extends Field {
  static Name = name;
  name = name;
}

module.exports = IpFilter;
