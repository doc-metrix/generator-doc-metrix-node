

// MODULES //

var path = require( 'path' ),
	yeoman = require( 'yeoman-generator' );


// VARIABLES //

var helpers = yeoman.test;


// TESTS //

describe( 'doc-metrix generator for Node.js', function tests() {
	'use strict';

	// SETUP //

	beforeEach( function setup( done ) {
		helpers
			.run( path.join( __dirname, '../app' ) )
			.inDir( path.join( __dirname, 'tmp' ) )
			.withOptions({
				'skip-install': true,
				'skip-install-message': true,
				'skip-message': true
			})
			.withPrompt({
				'name': 'test-node',
				'repo': 'test',
				'author': 'Jane Doe',
				'email': 'jane@doe.com',
				'license_holder': 'Jane Doe &lt;jane@doe.com&gt;',
				'description': 'doc-metrix generator test node module.',
				'git': false
			})
			.on( 'ready', function onReady( generator ) {
				// Called before `generator.run()` is called.
			})
			.on( 'end', function onEnd() {
				done();
			});
	});


	// TESTS //

	it( 'creates expected files', function test( done ) {
		var expected = [
				'.gitignore',
				'.npmignore',
				'.travis.yml',
				'README.md',
				'TODO.md',
				'Makefile',
				'LICENSE',
				'examples/index.js',
				'test/test.js',
				'lib/index.js'
			];

		helpers.assertFile( expected );
	});
});
