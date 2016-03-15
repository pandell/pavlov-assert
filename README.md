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

#### `pass(message?: string): void`
Passes with the given message.

#### `fail(message?: string): void`
Fails with the given message.

#### `equals(expected: any, message?: string): void`
#### `isEqualTo(expected: any, message?: string): void`
#### `isNotEqualTo(expected: any, message?: string): void`
Tests strict equality.

#### `isSimilarTo(expected: any, message?: string): void`
#### `isNotSimilarTo(expected: any, message?: string): void`
Tests non-strict equality.

#### `isOfType(expected: string, message?: string): void`
Tests the type string for the given value.

#### `isTrue(message?: string): void`
Tests strict equality to `true`.

#### `isFalse(message?: string): void`
Tests strict equality to `false`.

#### `isDefined(message?: string): void`
#### `isNotDefined(message?: string): void`
Compares against `null` and `undefined`.

#### `isSameAs(expected: any, message?: string): void`
#### `isNotSameAs(expected: any, message?: string): void`
Tests deep equality.

#### `throwsError(message?: string): void`
Tests that the supplied function throws an `Error`.

#### `throwsErrorWithMessage(expectedMessage: string, message?: string): void`
Tests that the supplied function throws an `Error` with a matching message.

#### `isString(message?: string): void`
#### `isNotString(message?: string): void`
#### `isArray(message?: string): void`
#### `isNotArray(message?: string): void`
#### `isObject(message?: string): void`
#### `isNotObject(message?: string): void`
#### `isFunction(message?: string): void`
#### `isNotFunction(message?: string): void`
#### `isRegExp(message?: string): void`
#### `isNotRegExp(message?: string): void`
#### `isDate(message?: string): void`
#### `isNotDate(message?: string): void`
#### `isNumber(message?: string): void`
#### `isNotNumber(message?: string): void`
#### `isBoolean(message?: string): void`
#### `isNotBoolean(message?: string): void`
#### `isUndefined(message?: string): void`
#### `isNotUndefined(message?: string): void`
#### `isNull(message?: string): void`
#### `isNotNull(message?: string): void`
Convenience functions for testing strict type equality.

## Contributing

1. Clone git repository

2. `npm install` (will install dev dependencies needed by the next step)

3. `npm start` (will start a file system watcher that will re-lint JavaScript and JSON files + re-run all tests when change is detected)

4. Make changes, don't forget to add tests, submit a pull request.


## License

MIT © [Pandell Technology](http://pandell.com/)

Based on Pavlov, Copyright (c) 2009-2011 Michael Monteleone, http://michaelmonteleone.net, used under the terms of the MIT license.
