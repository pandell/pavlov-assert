import * as assert from "assert";
import * as given from "mocha-testdata";

import * as pavlovAssert from "../src/assert";

describe("assert", () => {

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
    ]).it("defines default assertions", (name) => {
        const a = pavlovAssert({}) as any;
        assert.ok(typeof a[name] === "function");
    });

});
