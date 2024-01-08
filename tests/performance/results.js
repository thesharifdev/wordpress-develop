#!/usr/bin/env node

/**
 * External dependencies.
 */
const fs = require( 'node:fs' );
const { join } = require( 'node:path' );
const { median, getResultsFilename } = require( './utils' );

const testSuites = [
    'admin',
    'admin-l10n',
    'home-classic-theme',
    'home-classic-theme-l10n',
    'home-block-theme',
    'home-block-theme-l10n',
];

console.log( '\n>> 🎉 Results 🎉 \n' );

for ( const testSuite of testSuites ) {
    const resultsFileName = getResultsFilename( testSuite + '.test' );
    const resultsPath = join( __dirname, '/specs/', resultsFileName );
    fs.readFile( resultsPath, "utf8", ( err, data ) => {
        if ( err ) {
            console.log( "File read failed:", err );
            return;
        }
        const convertString = testSuite.charAt( 0 ).toUpperCase() + testSuite.slice( 1 );
        console.log( convertString.replace( /[-]+/g, " " ) + ':' );

        tableData = JSON.parse( data );
        const rawResults = [];

        for ( var key in tableData ) {
            if ( tableData.hasOwnProperty( key ) ) {
                rawResults[ key ] = median( tableData[ key ] );
            }
        }
        console.table( rawResults );
    });
}
