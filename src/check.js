'use strict';

exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            var tests = initCheck.call(this);
            tests.not = Object.keys(tests).reduce(function (prev, key) {
                prev[key] = function () {
                    return !tests[key].apply(this, arguments);
                };
                return prev;
            }, {});
            return tests;
        }
    });
};

exports.wrap = function (thing) {
    if (thing !== null && thing !== undefined) {
        return thing;
    }
    var wrappedNull = {};
    wrappedNull.isNull = function () {
        return true;
    };
    return wrappedNull;
};

function initCheck() {
    return {
        containsKeys: checkContainsKeys.bind(this),
        hasKeys: checkHasKeys.bind(this),
        containsValues: checkContainsValues.bind(this),
        hasValues: checkHasValues.bind(this),
        hasValueType: checkHasValueType.bind(this),
        hasLength: checkHasLength.bind(this),
        hasParamsCount: checkHasParamsCount.bind(this),
        hasWordsCount: checkHasWordsCount.bind(this)
    };
}

function checkContainsKeys(keys) {
    if (!checkType.call(this, [Array, Object])) {
        return undefined;
    }
    var thisKeys = Object.keys(this);
    return keys.every(function (key) {
        return thisKeys.indexOf(key) > -1;
    });
}

function checkHasKeys(keys) {
    return (checkContainsKeys.call(this, keys) && Object.keys(this).length === keys.length);
}

function checkContainsValues(values) {
    if (!checkType.call(this, [Array, Object])) {
        return undefined;
    }
    var thisValues = getValues.call(this);
    return values.every(function (value) {
        return thisValues.indexOf(value) > -1;
    });
}

function checkHasValues(values) {
    var thisValues = getValues.call(this);
    return (checkContainsValues.call(this, values) && thisValues.length === values.length);
}

function checkHasValueType(key, type) {
    if (!checkType.call(this, [Array, Object])) {
        return undefined;
    }
    if (!this.hasOwnProperty(key)) {
        return false;
    }
    var valueTypes = [String, Number, Function, Array];
    if (!valueTypes.some(function (value) {
        return value.prototype === type.prototype;
    })) {
        return false;
    }
    return this[key] === type(this[key]);
}

function checkHasLength(length) {
    if (!checkType.call(this, [Array, String])) {
        return undefined;
    }
    return (this.length === length);
}

function checkHasParamsCount(count) {
    if (!checkType.call(this, [Function])) {
        return undefined;
    }
    return (this.length === count);
}

function checkHasWordsCount(count) {
    if (!checkType.call(this, [String])) {
        return undefined;
    }
    var words = this.split(/\s+/);
    words = words.filter(function (item) {
        return item.length;
    });
    return words.length === count;
}

function checkType(types) {
    return types.some(function (item) {
        return Object.getPrototypeOf(this) === item.prototype;
    }, this);
}

function getValues() {
    return Object.keys(this).map(function (key) {
        return this[key];
    }, this);
}
