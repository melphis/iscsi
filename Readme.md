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

### Добавление target
```
iscsi.addRawTarget('iqn.2020-09.domain.ru:test-lun-2', targetParsms, true);
```
Последний аргумент {boolean} [autoSave=false] - необходимо ли сразу сохранить
все изменения в iscsi. 

### Запись
Сохранение в файл
`iscsi.saveTo('./tgt/xyi.conf');`

Сохранение в файл, указанный при считывании 
`iscsi.save();`
