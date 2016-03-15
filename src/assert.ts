import * as nativeAssert from "assert";


/**
 * Converts an array-like object to an array.
 * @param {any} array
 *     Array-like object.
 * @returns
 *     An array containing the elements of the array-like object.
 */
function makeArray(array: any): any[] {
    return Array.prototype.slice.call(array);
}


/**
 * Returns the type of any object (in lowercase).
 * @param {any} obj
 *     Object to inspect.
 * @returns {string}
 *     Type name of the object (in lowercase).
 */
function type(obj: any): string {
    if (obj === undefined || obj === null) {
        return String(obj);
    }
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}


/**
 * Transforms a camel or pascal case string to all lower-case space-separated phrase.
 * @param {string} value
 *     Pascal or camel-cased string.
 * @returns
 *     All-lower-case space-separated phrase.
 */
function phraseCase(value: string): string {
    return value.replace(/([A-Z])/g, " $1").toLowerCase();
}


/**
 * Convert the specified value to a human-readable string.
 */
function prettyPrint(value: any, printDetails?: boolean): string {
    if (type(value) === "string") {
        return "\"" + value + "\"";
    }
    if (type(value) === "array") {
        return "[" + value.toString() + "]";
    }
    if (type(value) === "function") {
        return printDetails ? value.toString() : "function()";
    }
    return String(value);
}


/**
 * Assertion value container with optional description.
 * Provides an API for asserting a value against any of the bundled
 * or custom assertion handlers.
 * @param {any} value
 *     A test-produced value to assert against.
 * @param {any} description?
 *     The name of the variable for automatic descriptions.
 */
class AssertionHandler {
    constructor(public value: any, public description?: any) {}
}

/**
 * Appends assertion methods to the AssertionHandler prototype.
 *
 * For each provided assertion implementation, adds an identically named
 * assertion function to assertionHandler prototype with the given implementation.
 *
 * @param {any} asserts
 *     Object containing assertion implementations.
 */
function addAssertions(asserts: any, targetPrototype: any): void {
    for (const name in asserts) {
        if (asserts.hasOwnProperty(name)) {
            const fn = asserts[name];

            targetPrototype[name] = function(): any {
                // implement this handler against backend
                // by pre-pending AssertionHandler's current value to args
                let args = makeArray(arguments),
                    desc = ["asserting", phraseCase(name)],
                    expected: any;

                if (fn.shouldPrintValue !== false) {
                    desc.splice(1, 0, prettyPrint(this.value, fn.shouldPrintDetails));
                }

                args.unshift(this.value);

                if (this.description) {
                    desc[1] += ",";
                    desc.splice(1, 0, "that (" + this.description + "), being");
                }

                // if no explicit message was given with the assertion,
                // then let's build our own friendly one
                if (fn.length === 2) {
                    args[1] = args[1] || desc.join(" ");
                } else if (fn.length === 3) {
                    if (fn.shouldPrintExpected && !fn.shouldPrintExpected(args[1])) {
                        expected = "";
                    } else {
                        expected = " " + prettyPrint(args[1]);
                    }
                    args[2] = args[2] || desc.join(" ") + expected;
                }

                return fn.apply(this, args);
            };
        }
    }
}


/**
 * Add default assertions
 */
const defaultAssertions: {[key: string]: Function} = {
    equals: function (actual: any, expected: any, message?: string): void {
        nativeAssert.strictEqual(actual, expected, message);
    },
    isSimilarTo: function(actual: any, expected: any, message?: string): void {
        nativeAssert.equal(actual, expected, message);
    },
    isNotSimilarTo: function(actual: any, expected: any, message?: string): void {
        nativeAssert.notEqual(actual, expected, message);
    },
    isEqualTo: function(actual: any, expected: any, message?: string): void {
        nativeAssert.strictEqual(actual, expected, message);
    },
    isNotEqualTo: function(actual: any, expected: any, message?: string): void {
        nativeAssert.notStrictEqual(actual, expected, message);
    },
    isOfType: function(actual: any, expected: any, message?: string): void {
        nativeAssert.strictEqual(type(actual), expected, message);
    },
    isTrue: function(actual: any, message?: string): void {
        nativeAssert.strictEqual(actual, true, message);
    },
    isFalse: function(actual: any, message?: string): void {
        nativeAssert.strictEqual(actual, false, message);
    },
    isDefined: function(actual: any, message?: string): void {
        nativeAssert.notStrictEqual(actual, undefined, message);
        nativeAssert.notStrictEqual(actual, null, message);
    },
    isNotDefined: function(actual: any, message?: string): void {
        nativeAssert(actual === undefined || actual === null, message);
    },
    isSameAs: function(actual: any, expected: any, message?: string): void {
        nativeAssert.deepEqual(actual, expected, message);
    },
    isNotSameAs: function(actual: any, expected: any, message?: string): void {
        nativeAssert.notDeepEqual(actual, expected, message);
    },
    pass: function(actual: any, message?: string): void {
        nativeAssert(true, message);
    },
    fail: function(actual: any, message?: string): void {
        nativeAssert(false, message);
    },
    throwsError: function(actual: Function, message?: string): void {
        if (!message) { message = "Expected error"; }
        try {
            actual();
            nativeAssert(false, message + " (no error was thrown)");
        } catch (e) {
            nativeAssert.strictEqual(type(e), "error", message + " (thrown object is not an Error)");
            return e;
        }
    },
    throwsErrorWithMessage: function(actual: Function, expectedMessage: string, message?: string): void {
        if (!message) { message = "Expected error"; }
        try {
            actual();
            nativeAssert(false, message + " (no error was thrown)");
        } catch (e) {
            nativeAssert.strictEqual(type(e), "error", message + " (thrown object is not an Error)");
            nativeAssert.strictEqual(e.message, expectedMessage, message + " (error message does not match)");
            return e;
        }
    }
};

// create convenience assertions: isString, isNotString, ..., isNull, isNotNull

const convenienceAssertionNames = [
    "String",
    "Array",
    "Object",
    "Function",
    "RegExp",
    "Date",
    "Number",
    "Boolean",
    "Undefined",
    "Null"
];
for (const key of convenienceAssertionNames) {
    defaultAssertions["is" + key] = function (actual: any, message?: string): void {
        nativeAssert.strictEqual(type(actual), key.toLowerCase(), message);
    };
    defaultAssertions["isNot" + key] = function (actual: string, message?: string): void {
        nativeAssert.notStrictEqual(type(actual), key.toLowerCase(), message);
    };
}

// add annotations to assertion methods
const defaultAssertionsAny: any = defaultAssertions;
defaultAssertionsAny.pass.shouldPrintValue = false;
defaultAssertionsAny.fail.shouldPrintValue = false;

// now extend "AssertionHandler" prototype with assertion methods
addAssertions(defaultAssertions, AssertionHandler.prototype);

// define exported assert function
function assert(value: any, description?: string): assert.PavlovAssert { return (new AssertionHandler(value, description) as any); }

// extend exported assert function for easier access to
// parameter-less assert.pass() and assert.fail() calls
namespace assert {
    export function pass(message?: string): void { assert(undefined).pass(message); };
    export function fail(message?: string): void { assert(undefined).fail(message); };

    /**
     * Assertion methods available as a fluent interface after "assert(value, 'value')" call.
     */
    export interface PavlovAssert {
        equals(expected: any, message?: string): void;
        isSimilarTo(expected: any, message?: string): void;
        isNotSimilarTo(expected: any, message?: string): void;
        isEqualTo(expected: any, message?: string): void;
        isNotEqualTo(expected: any, message?: string): void;
        isOfType(expected: any, message?: string): void;
        isTrue(message?: string): void;
        isFalse(message?: string): void;
        isDefined(message?: string): void;
        isNotDefined(message?: string): void;
        isSameAs(expected: any, message?: string): void;
        isNotSameAs(expected: any, message?: string): void;
        pass(message?: string): void;
        fail(message?: string): void;

        throwsError(message?: string): void;
        throwsErrorWithMessage(expectedMessage: string, message?: string): void;

        isString(message?: string): void;
        isNotString(message?: string): void;
        isArray(message?: string): void;
        isNotArray(message?: string): void;
        isObject(message?: string): void;
        isNotObject(message?: string): void;
        isFunction(message?: string): void;
        isNotFunction(message?: string): void;
        isRegExp(message?: string): void;
        isNotRegExp(message?: string): void;
        isDate(message?: string): void;
        isNotDate(message?: string): void;
        isNumber(message?: string): void;
        isNotNumber(message?: string): void;
        isBoolean(message?: string): void;
        isNotBoolean(message?: string): void;
        isUndefined(message?: string): void;
        isNotUndefined(message?: string): void;
        isNull(message?: string): void;
        isNotNull(message?: string): void;
    }
}

export = assert;
