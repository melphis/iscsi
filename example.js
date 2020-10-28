const Iscsi = require('./src');

Iscsi.readFile('./conf/test_target.conf')
  .then(iscsi => {
    const targetParams = [
      {
        name: 'incominguser',
        // если enabled указать false, то в модели этот параметр не появится,
        // только в общем списке параметров.
        args: [ 'tecmint-iscsi-user', 'password' ],
      },
      {
        name: 'backing-store',
        args: ['/dev/xyi'],
      }
    ];

    // добавление таргета с автоматическим сохранением iscsi конфига
    // iscsi.addRawTarget('iqn.2020-09.domain.ru:test-lun-2', targetParams, true);
    iscsi.addRawTarget('iqn.2020-09.domain.ru:test-lun-2', targetParams);

    console.log(iscsi.toJson());

    // запись по пути чтения конфига
    // iscsi.save();

    // запись по произвольному пути
    iscsi.saveTo('./conf/xyi.conf');
  })
  .catch(err => console.error(err));
