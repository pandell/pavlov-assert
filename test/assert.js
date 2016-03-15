/*jslint node: true */
/*global describe: false */

"use strict";

var assert = require("assert");
var given = require("mocha-testdata");

var pavlovAssert = require("../dist/assert");

describe("assert", function () {

    given([
        "equals",
        "isSimilarTo",
        "isNotSimilarTo",
        "isEqualTo",
        "isNotEqualTo",
        "isOfType",
        "isTrue",
        "isFalse",
        "isDefined",
        "isNotDefined",
        "isSameAs",
        "isNotSameAs",
        "pass",
        "fail",
        "throwsError",
        "throwsErrorWithMessage",
        "isString",
        "isArray",
        "isObject",
        "isFunction",
        "isRegExp",
        "isDate",
        "isNumber",
        "isBoolean",
        "isUndefined",
        "isNull",
        "isNotString",
        "isNotArray",
        "isNotObject",
        "isNotFunction",
        "isNotRegExp",
        "isNotDate",
        "isNotNumber",
        "isNotBoolean",
        "isNotUndefined",
        "isNotNull"
    ]).it("defines default assertions", function (name) {
        var a = pavlovAssert();
        assert.ok(typeof a[name] === "function");
    });

});
