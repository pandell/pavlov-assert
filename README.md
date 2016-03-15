# pavlov-assert

[![Build status](https://travis-ci.org/pandell/pavlov-assert.svg?branch=master)](https://travis-ci.org/pandell/pavlov-assert) [!["devDependencies" status](https://david-dm.org/pandell/pavlov-assert/dev-status.svg)](https://david-dm.org/pandell/pavlov-assert#info=devDependencies)

> Fluent assertions

[Git repository](https://github.com/pandell/pavlov-assert)

[Changelog](https://github.com/pandell/pavlov-assert/releases)

Fluent assertions library extracted from [pavlov](https://github.com/mmonteleone/pavlov).


## Install

```sh
$ npm install --save-dev pavlov-assert
```


## Usage

Here's a basic example using `mocha`'s BDD interface:

```js
var assert = require('pavlov-assert');

describe('My test suite', function() {
  it('passes if value is false', function() {
    var value = !true;
    assert(value, 'value').isFalse('should be false');
  });
});
```

## API

Assuming:

```js
var assert = require('pavlov-assert');
```

### `assert(value: any, description?: string)`

Creates an assertion handler for the given value.

#### value

_Type_: any

Value to assert against.

Returns: an object that can perform assertions on the supplied value.

### Assertion methods

#### `pass(message?: string)`
Passes with the given message.

#### `fail(message?: string)`
Fails with the given message.

#### `equals(expected: any, message?: string)`
#### `isEqualTo(expected: any, message?: string)`
#### `isNotEqualTo(expected: any, message?: string)`
Tests strict equality.

#### `isSimilarTo(expected: any, message?: string)`
#### `isNotSimilarTo(expected: any, message?: string)`
Tests non-strict equality.

#### `isOfType(expected: string, message?: string)`
Tests the type string for the given value.

#### `isTrue(message?: string)`
Tests strict equality to `true`.

#### `isFalse(message?: string)`
Tests strict equality to `false`.

#### `isDefined(message?: string)`
#### `isNotDefined(message?: string)`
Compares against `null` and `undefined`.

#### `isSameAs(expected: any, message?: string)`
#### `isNotSameAs(expected: any, message?: string)`
Tests deep equality.

#### `throwsError(message?: string)`
Tests that the supplied function throws an `Error`.

#### `throwsErrorWithMessage(expectedMessage: string, message?: string)`
Tests that the supplied function throws an `Error` with a matching message.

#### `isString(message?: string)`
#### `isNotString(message?: string)`
#### `isArray(message?: string)`
#### `isNotArray(message?: string)`
#### `isObject(message?: string)`
#### `isNotObject(message?: string)`
#### `isFunction(message?: string)`
#### `isNotFunction(message?: string)`
#### `isRegExp(message?: string)`
#### `isNotRegExp(message?: string)`
#### `isDate(message?: string)`
#### `isNotDate(message?: string)`
#### `isNumber(message?: string)`
#### `isNotNumber(message?: string)`
#### `isBoolean(message?: string)`
#### `isNotBoolean(message?: string)`
#### `isUndefined(message?: string)`
#### `isNotUndefined(message?: string)`
#### `isNull(message?: string)`
#### `isNotNull(message?: string)`
Convenience functions for testing strict type equality.

## Contributing

1. Clone git repository

2. `npm install` (will install dev dependencies needed by the next step)

3. `npm start` (will start a file system watcher that will re-lint JavaScript and JSON files + re-run all tests when change is detected)

4. Make changes, don't forget to add tests, submit a pull request.


## License

MIT © [Pandell Technology](http://pandell.com/)

Based on Pavlov, Copyright (c) 2009-2011 Michael Monteleone, http://michaelmonteleone.net, used under the terms of the MIT license.
