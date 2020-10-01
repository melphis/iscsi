# Читалка/писалка конфигурации Iscsi targets
### Чтение и запись
```
const Iscsi = require('iscsi');
Iscsi.readFile('./tgt/test_target.conf')
  .then(iscsi => {
    iscsi.writeTo('./tgt/xyi.conf');
  })
  .catch(err => console.error(err));
```
##### result:
```
Target {
    name: 'iqn.2020-09.signaltec.ru:test-lun-10',
    params: [ [Param], [Param], [Param], [Param] ]
},
```
```
Param {
  name: 'initiator-address',
  arguments: [ '192.168.56.102' ],
  enabled: false
}
```
### Запись
`iscsi.writeTo('./tgt/xyi.conf');`
 можно вызывать без аргумента, тогда будет использоваться тот путь, который
 был указан при чтении конфига.
