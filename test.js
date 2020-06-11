var stdin = process.stdin;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );
stdin.on( 'data', function( key ){
	// ctrl-c ( end of text )
	if ( key === '\u0003' ) {
	process.exit();
	}
});
