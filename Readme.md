# Читалка/писалка конфигурации Iscsi targets
### Чтение и запись
```
const Iscsi = require('iscsi');
Iscsi.readFile('./tgt/test_target.conf')
  .then(iscsi => {
    iscsi.saveTo('./tgt/xyi.conf');
  })
  .catch(err => console.error(err));
```
##### result:
```
[ Target {
    name: 'iqn.2020-09.domain.ru',
    lun: 'test-lun-10',
    auth: [Auth],
    backingStore: [BackingStore],
    ipFilter: [IpFilter],
    params: [ [Param], [Param], [Param], [Param] ]
}, ...]
```

### Создание из объекта и сериализация в объект
```
Iscsi.fromJson({
    name: 'iqn.2020-09.domain.ru',
    lun: 'test-lun-10',
    auth: {
        type: 2,
        incomingUser: {username, password},
        outgoingUser: {username, password}
    },
    backingStore: '/dev/xyi',
    ipFilter: '1.1.1.1',
})

Iscsi.toJson()
```

#### Типы авторизации
* None - 0
* Chap - 1
* TwoWay - 2

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
