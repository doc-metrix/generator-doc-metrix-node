<%= name %>
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> <%= description %>


## Installation

``` bash
$ npm install <%= name %>
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To interface with the [documentation](https://github.com/doc-metrix/INSERT_NAME),

``` javascript
var metrics = require( 'doc-metrix-NAME' );
```

The interface has the following methods...


### Metrics

Metric centric methods...


#### metrics.mexists( name )

Checks whether a metric having the provided `name` is included in the documentation.

``` javascript
metrics.mexists( '' );
// returns true

metrics.mexists( '' );
// returns false
```

Note: method is __not__ case sensitive.


#### metrics.mlist()

Lists all metrics included in the documentation.

``` javascript
metrics.mlist();
// returns an array of metric names
```


#### metrics.mfilter( regexp )

Lists all metrics satisfying a regular expression filter.

``` javascript
metrics.mfilter( /.+/i );
```

Note: filtering for metric names __is__ case sensitive. Ignore case `/i` for case insensitive filtering.


#### metrics.mget( [filter] )

Returns metric documentation. The provided `filter` may be a `string` or a regular expression. If a metric does not have documentation, returns `null`. To return a single metric,

``` javascript
metrics.mget( '' );
// returns {...}

metrics.mget( '' );
// returns null
```

To return metric documentation matching a filter,

``` javascript
metrics.mget( /.+/i );
// returns {...}
```

To return all metric documentation,

``` javascript
metrics.mget();
// returns {"metric1":{...},"metric2":{...},...}
```

Note: when the filter is a `string`, the method is __not__ case sensitive.

Note: when the filter is a regular expression, the method __is__ case sensitive. If case does not matter, ignore case `/i`;


### Devices

Device centric methods...


#### metrics.dexists( name )

Checks whether a device having the provided `name` is known to have associated metric documentation.

``` javascript
metrics.dexists( '' );
// returns true

metrics.dexists( '' );
// returns false
```

#### metrics.dlist()

Lists all devices known to have associated metric documentation.

``` javascript
metrics.dlist();
// returns an array of device names
```

Note: the returned list __may__ contain regular expressions. Regular expressions are included to account for platform variability.


#### metrics.dget( [name] )

Returns metric documentation associated with devices. If a device does not have associated documentation, returns `null`. To return a single device's metric documentation,

``` javascript
metrics.dget( '' );
// returns {"metric0":{...},"metric1":{...},...}

metrics.dget( '' );
// returns null
```

To return all devices and their associated metric documentation,

``` javascript
metrics.dget();
// returns {"device0":{...},"device1":{...},...}
```



## Examples

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Notes

After running the following commands,

``` bash
$ npm install
$ npm update
```

this package, when used as a dependency, will attempt an HTTP request to retrieve the latest documentation from [Github](https://github.com/doc-metrix/INSERT_NAME).

During development, run the following command to retrieve the latest documentation

``` bash
$ npm run docs
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; <%= year %>. <%= author %>.


[npm-image]: http://img.shields.io/npm/v/<%= name %>.svg
[npm-url]: https://npmjs.org/package/<%= name %>

[travis-image]: http://img.shields.io/travis/doc-metrix/<%= repo %>/master.svg
[travis-url]: https://travis-ci.org/doc-metrix/<%= repo %>

[coveralls-image]: https://img.shields.io/coveralls/doc-metrix/<%= repo %>/master.svg
[coveralls-url]: https://coveralls.io/r/doc-metrix/<%= repo %>?branch=master

[dependencies-image]: http://img.shields.io/david/doc-metrix/<%= repo %>.svg
[dependencies-url]: https://david-dm.org/doc-metrix/<%= repo %>

[dev-dependencies-image]: http://img.shields.io/david/dev/doc-metrix/<%= repo %>.svg
[dev-dependencies-url]: https://david-dm.org/dev/doc-metrix/<%= repo %>

[github-issues-image]: http://img.shields.io/github/issues/doc-metrix/<%= repo %>.svg
[github-issues-url]: https://github.com/doc-metrix/<%= repo %>/issues