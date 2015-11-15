'use strict';

exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            return initCheck.call(this, false);
        }
    });
};

exports.wrap = function (thing) {
    if (thing !== null) {
        return thing;
    }
    var wrappedNull = {};
    wrappedNull.isNull = function () {
        return true;
    };
};

function initCheck(notMode) {
    var checkMethods = {
        containsKeys: checkContainsKeys.bind(this),
        hasKeys: checkHasKeys.bind(this),
        containsValues: checkContainsValues.bind(this),
        hasValues: checkHasValues.bind(this),
        hasValueType: checkHasValueType.bind(this),
        hasLength: checkHasLength.bind(this),
        hasParamsCount: checkHasParamsCount.bind(this),
        hasWordsCount: checkHasWordsCount.bind(this)
    };
    return checkMethods;
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
    var valueTypes = [String, Number, Function, Array];
    var goodType = false;
    for (var i = 0; i < valueTypes.length; i++) {
        if (valueTypes[i].prototype === type.prototype) {
            goodType = true;
        }
    }
    if (!goodType) {
        return false;
    }
    if (!this.hasOwnProperty(key)) {
        return false;
    }
    return (this[key] === type(this[key]));
}

function checkHasLength(length) {
    if (!checkType.call(this, [Array, Object])) {
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
    return (words.length === count);
}

function checkType(types) {
    for (var i = 0; i < types.length; i++) {
        if (Object.getPrototypeOf(this) === types[i].prototype) {
            return true;
        }
    }
    return false;
}

function getValues() {
    return Object.keys(this).map(function (key) {
        return this[key];
    }, this);
}
