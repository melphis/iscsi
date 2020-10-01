const Iscsi = require('./src');

Iscsi.readFile('./conf/test_target.conf')
  .then(iscsi => {
    iscsi.writeTo('./conf/xyi.conf');
  })
  .catch(err => console.error(err));
