
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Metrics specification:
	METRICS = require( '' ),

	// Module to be tested:
	metrics = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '<%= name %>', function tests() {
	'use strict';

	var NAMES = Object.keys( METRICS );

	it( 'should export an object', function test() {
		expect( metrics ).to.be.an( 'object' );
	});

	describe( 'mlist', function tests() {

		it( 'should provide a method to list all documented metrics', function test() {
			expect( metrics.mlist ).to.be.a( 'function' );
		});

		it( 'should list all documented metrics', function test() {
			assert.deepEqual( metrics.mlist(), Object.keys( METRICS ) );
		});

	});

	describe( 'mfilter', function tests() {

		it( 'should provide a method to return a filtered list of documented metrics', function test() {
			expect( metrics.mfilter ).to.be.a( 'function' );
		});

		it( 'should not allow a non-regular expression filter', function test() {
			var values = [
					'5',
					5,
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					metrics.mfilter( value );
				};
			}
		});

		it( 'should filter documented metric names', function test() {
			assert.isArray( metrics.mfilter( /.+/i ) );
		});

	});

	describe( 'mexists', function tests() {

		it( 'should provide a method to check the existence of a metric specification', function test() {
			expect( metrics.mexists ).to.be.a( 'function' );
		});

		it( 'should not allow a non-string metric name', function test() {
			var values = [
					5,
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					metrics.mexists( value );
				};
			}
		});

		it( 'should return false for a metric which does not have a specification', function test() {
			assert.notOk( metrics.mexists( 'invalid.classification.utilization' ) );
		});

		it( 'should return true for a metric which has a specification', function test() {
			assert.ok( metrics.mexists( NAMES[ 0 ] ) );
		});

		it( 'should return true for a metric which has a specification regardless of input name case', function test() {
			assert.ok( metrics.mexists( NAMES[ 0 ].toUpperCase() ) );
		});

	});

	describe( 'mget', function tests() {

		it( 'should provide a method to get a metric specification', function test() {
			expect( metrics.mget ).to.be.a( 'function' );
		});

		it( 'should not allow a non-string or non-regular expression metric filter', function test() {
			var values = [
					5,
					[],
					{},
					true,
					undefined,
					null,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					metrics.mget( value );
				};
			}
		});

		it( 'should return null for a metric which does not have a specification', function test() {
			assert.isNull( metrics.mget( 'invalid.classification.utilization' ) );
		});

		it( 'should return a metric specification', function test() {
			assert.deepEqual( metrics.mget( NAMES[ 0 ] ), METRICS[ NAMES[ 0 ] ] );
		});

		it( 'should return all metric specifications if called without a metric name', function test() {
			assert.deepEqual( metrics.mget(), METRICS );
		});

		it( 'should return a metric specification regardless of input name case', function test() {
			assert.deepEqual( metrics.mget( NAMES[ 0 ].toUpperCase() ), METRICS[ NAMES[ 0 ] ] );
		});

		it( 'should return a filtered list of metric specifications', function test() {
			assert.isObject( metrics.mget( /.+/i ) );
		});

		it( 'should return null if no metrics match a provided filter', function test() {
			assert.isNull( metrics.mget( /NOTHING_MATCHES_FILTER/i ) );
		});

		it( 'should return all metrics when provided a permissive filter', function test() {
			assert.deepEqual( metrics.mget( /.+/ ). METRICS );
		});

	});

	describe( 'dlist', function tests() {

		it( 'should provide a method to list all devices associated with the metrics', function test() {
			expect( metrics.dlist ).to.be.a( 'function' );
		});

		it( 'should list all devices associated with metrics', function test() {
			var list = metrics.dlist();
			assert.isArray( list );
			assert.ok( list.indexOf( '' ) !== -1 );
		});

	});

	describe( 'dexists', function tests() {

		it( 'should provide a method to check the existence of a device having associated specifications', function test() {
			expect( metrics.dexists ).to.be.a( 'function' );
		});

		it( 'should not allow a non-string device name', function test() {
			var values = [
					5,
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					metrics.dexists( value );
				};
			}
		});

		it( 'should return false for a device which does not have associated specification', function test() {
			assert.notOk( metrics.dexists( 'unknown-device-name' ) );
		});

		it( 'should return true for a device which has associated specifications', function test() {
			assert.ok( metrics.dexists( '' ) );
		});

		it( 'should return true for a device which has an associated specification regardless of input name case', function test() {
			assert.ok( metrics.dexists( '' ) );
		});

	});

	describe( 'dget', function tests() {

		it( 'should provide a method to get metric specifications associated with a device', function test() {
			expect( metrics.dget ).to.be.a( 'function' );
		});

		it( 'should not allow a non-string device name', function test() {
			var values = [
					5,
					[],
					{},
					true,
					undefined,
					null,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					metrics.dget( value );
				};
			}
		});

		it( 'should return null for a device which does not have an associated metric specification', function test() {
			assert.isNull( metrics.dget( 'no such device' ) );
		});

		it( 'should return metric specification(s) associated with a device', function test() {
			var obj = metrics.dget( '' );
			assert.isObject( obj );
			assert.ok( Object.keys( obj ).length );
		});

		it( 'should return metric specifications associated with all devices if not provided a device name', function test() {
			var obj = metrics.dget();
			assert.isObject( obj );
			assert.ok( Object.keys( obj ).length );
		});

		it( 'should return metric specification(s) associated with a device regardless of input device case', function test() {
			var obj = metrics.dget( '' );
			assert.isObject( obj );
			assert.ok( Object.keys( obj ).length );
		});

		it( 'should return null if no device matches a provided filter', function test() {
			var obj = metrics.dget( 'UNKNOWN_DEVICE_FILTER' );
			assert.isNull( obj );
		});

	});

});