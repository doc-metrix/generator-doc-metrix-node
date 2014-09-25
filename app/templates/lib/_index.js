/**
*
*	DOC-METRIX: <%= name %>
*
*
*	DESCRIPTION:
*		- <%= description %>
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) <%= year %>. <%= author %>.
*
*
*	AUTHOR:
*		<%= author %>. <%= email %>. <%= year %>.
*
*/

(function() {
	'use strict';

	// RESOURCES //

	var	METRICS = require( '' );


	// VARIABLES //

	var DEVICES = {},
		NAMES = {};
	

	// FUNCTIONS //

	/**
	* FUNCTION: deviceHash()
	*	Transforms the METRICS documentation into a hash based on device name.
	*
	* @private
	*/
	function deviceHash() {
		var keys,
			metric,
			doc,
			devices,
			name;

		keys = Object.keys( METRICS );

		for ( var i = 0; i < keys.length; i++ ) {
			metric = keys[ i ];
			doc = METRICS[ metric ];
			devices = doc.devices;
			if ( devices ) {
				for ( var j = 0; j < devices.length; j++ ) {
					name = devices[ j ];
					if ( !DEVICES[ name ] ) {
						DEVICES[ name ] = {};
					}
					DEVICES[ name ][ metric ] = doc;
				}
			}
		}
	} // end FUNCTION deviceHash()

	/**
	* FUNCTION: metricNames()
	*	Extracts the metric names.
	*
	* @private
	*/
	function metricNames() {
		var names = Object.keys( METRICS );
		NAMES.mList = names;
		NAMES.mLowercase = names.map( function ( name ) {
			return name.toLowerCase();
		});
	} // end FUNCTION metricNames()

	/**
	* FUNCTION: deviceNames()
	*	Extracts the device names.
	*
	* @private
	*/
	function deviceNames() {
		var names = Object.keys( DEVICES );
		NAMES.dList = names;
		NAMES.dRegExp = names.map( function ( name ) {
			return new RegExp( name, 'i' );
		});
	} // end FUNCTION deviceNames()


	// INIT //

	deviceHash();
	metricNames();
	deviceNames();


	// METRICS //

	/**
	* FUNCTION: Metrics()
	*	Metrics constructor.
	*
	* @constructor
	* @returns {Metrics} Metrics instance
	*/
	function Metrics() {
		return this;
	} // end FUNCTION Metrics()

	/**
	* METHOD: mexists( name )
	*	Checks whether a metric has documentation.
	*
	* @param {String} name - metric name
	* @returns {Boolean}
	*/
	Metrics.prototype.mexists = function( name ) {
		if ( typeof name !== 'string' ) {
			throw new TypeError( 'mexists()::invalid input argument. Metric `name` must be a string.' );
		}
		if ( NAMES.mLowercase.indexOf( name.toLowerCase() ) === -1 ) {
			return false;
		}
		return true;
	}; // end METHOD mexists()

	/**
	* METHOD: dexists( name )
	*	Checks whether a device has associated metric documentation.
	*
	* @param {String} name - device name
	* @returns {Boolean}
	*/
	Metrics.prototype.dexists = function( name ) {
		if ( typeof name !== 'string' ) {
			throw new TypeError( 'dexists()::invalid input argument. Device `name` must be a string.' );
		}
		var re = NAMES.dRegExp;
		for ( var i = 0; i < re.length; i++ ) {
			if ( re[ i ].test( name ) ) {
				return true;
			}
		}
		return false;
	}; // end METHOD dexists()

	/**
	* METHOD: mlist()
	*	Lists all documented metric names.
	*
	* @returns {Array} list of metric names.
	*/
	Metrics.prototype.mlist = function() {
		return NAMES.mList.slice();
	}; // end METHOD mlist()

	/**
	* METHOD: dlist()
	*	Lists all device names associated with metrics.
	*
	* @returns {Array} list of device names.
	*/
	Metrics.prototype.dlist = function() {
		return NAMES.dList.slice();
	}; // end METHOD dlist()

	/**
	* METHOD: mfilter( regexp )
	*	Filters the list of metric names and returns all names satisfying the provided regular expression.
	*
	* @param {RegExp} [regexp] - regular expression used to filter metric names
	* @returns {Array} list of metric names.
	*/
	Metrics.prototype.mfilter = function( regexp ) {
		if ( !(regexp instanceof RegExp ) ) {
			throw new TypeError( 'mfilter()::invalid input argument. Must provide a regular expression.' );
		}
		return NAMES.mList.filter( function ( name ) {
			return regexp.test( name );
		});
	}; // end METHOD mfilter()

	/**
	* METHOD: mget( filter )
	*	Returns metric documentation. If a metric name is provided as a filter, returns an individual metric's documentation. If no metric documentation exists, returns `null`. If a regular expression is provided, returns all metric documentation matching the filter. If no argument is provided, returns all metric documentation.
	*
	* @param {String|RegExp} filter - metric filter; e.g., metric name or regular expression
	* @returns {Object|null} documentation or null
	*/
	Metrics.prototype.mget = function( filter ) {
		var docs = {},
			type,
			idx,
			metric,
			metrics;

		if ( !arguments.length ) {
			return JSON.parse( JSON.stringify( METRICS ) );
		}
		type = typeof filter;
		if ( type !== 'string' && !( filter instanceof RegExp ) ) {
			throw new TypeError( 'mget()::invalid input argument. Metric `filter` must be either a string or regular expression.' );
		}
		if ( type === 'string' ) {
			idx = NAMES.mLowercase.indexOf( filter.toLowerCase() );
			if ( idx === -1 ) {
				return null;
			}
			metric = NAMES.mList[ idx ];
			docs = METRICS[ metric ];
		} else {
			metrics = NAMES.mList.filter( function ( name ) {
				return filter.test( name );
			});
			if ( !metrics.length ) {
				return null;
			}
			for ( var i = 0; i < metrics.length; i++ ) {
				metric = metrics[ i ];
				docs[ metric ] = METRICS[ metric ];
			}
		}
		return JSON.parse( JSON.stringify( docs ) );
	}; // end METHOD mget()

	/**
	* METHOD: dget( name )
	*	Returns metric documentation associated with devices. If a device `name` is provided, returns an `object` containing associated metric documentation. If no documentation is associated with a device, returns `null`. If no argument is provided, returns an `object` listing all devices and their associated documentation.
	*
	* @param {String} name - device name
	* @returns {Object|null} documentation or null
	*/
	Metrics.prototype.dget = function( name ) {
		var docs,
			names,
			re;

		if ( !arguments.length ) {
			return JSON.parse( JSON.stringify( DEVICES ) );
		}
		if ( typeof name !== 'string' ) {
			throw new TypeError( 'dget()::invalid input argument. Device `name` must be a string.' );
		}
		name = name.toLowerCase();
		names = NAMES.dList;
		re = NAMES.dRegExp;
		for ( var i = 0; i < re.length; i++ ) {
			if ( re[ i ].test( name ) ) {
				docs = DEVICES[ names[ i ] ];
				break;
			}
		}
		if ( !docs ) {
			return null;
		}
		return JSON.parse( JSON.stringify( docs ) );
	}; // end METHOD dget()


	// EXPORTS //

	module.exports = new Metrics();

})();