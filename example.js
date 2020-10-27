const Iscsi = require('./src');

Iscsi.readFile('./conf/test_target.conf')
  .then(iscsi => {
    const targetParsms = [
      {
        name: 'incominguser',
        enabled: false,
        args: [ 'tecmint-iscsi-user', 'password' ],
      }
    ];

    iscsi.addRawTarget('iqn.2020-09.domain.ru:test-lun-2', targetParsms, true);

    // запись по пути чтения конфига
    iscsi.save();

    // запись по произвольному пути
    iscsi.saveTo('./conf/xyi.conf');
  })
  .catch(err => console.error(err));
