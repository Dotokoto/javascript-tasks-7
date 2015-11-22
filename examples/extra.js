/**
 * Примеры для дополнительного задания
 */

var check = require('../src/check');

check.init();
var person = { name: 'John', age: 20 };
var numbers = [1, 2, 3];
var func = function (a, b) {};
var str = 'some string';
var emptyStr = '         ';
var itsNull = null;
itsNull = check.wrap(itsNull);
var undef = undefined;
undef = check.wrap(undef);

console.log(
    person.check.hasKeys(['name', 'age']), // true
    person.check.hasValueType('name', String), // true

    numbers.check.hasKeys(['0', '1', '2']), // true
    numbers.check.hasLength(3), // true

    numbers.check.hasValues([2, 1]), // false

    func.check.hasParamsCount(2), // true

    str.check.hasWordsCount(2), // true
    emptyStr.check.hasWordsCount(0),
    itsNull.check.hasKeys(['name']),
    undef.check.hasKeys(['name'])
);
