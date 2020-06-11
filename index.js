var robot = require("robotjs");
const InputEvent = require("input-event");

try {	global.input = new InputEvent('/dev/input/event4');	}
catch (error) {
	console.error(error);
	console.error('\nFailed to open input device.');
	console.error('Try running as root?\t sudo node index.js [delay] [range]');
	process.exit(1);
}
const keyboard = new InputEvent.Keyboard(input);

robot.setKeyboardDelay(1);

var args = process.argv.slice(2);

/*
///// Capture all keystrokes in the console window so we don't write over stuff
*/
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
/*
/////
*/

function printHelp() {
	console.log('Usage :\tnode index.js [delay] [range]');
	console.log('\tBoth arguments are optional.');
	console.log('\tCannot declare range without delay.');
	console.log('');
	console.log('\tdelay\t: time between slot switches (in ms), default 50');
	console.log('\trange\t: highest slot to switch to (2-9), default 9');
	console.log('You may be required to run this program as root to access the input device. In that case, run the program with\n\tsudo node index.js [delay] [range]')
};

if(args.length !== 0) {
//	console.log('got arguments ', args);
	var arg0 = Math.round(args[0]);
	if(arg0 >= 1 && arg0 <= 3600000) {
		global.delay = arg0;

		var arg1 = Math.round(args[1]);
		if(arg1 >= 2 && arg1 <= 9) {
			global.range = arg1;
		} else {
			console.error(args[1], ': Range must be between 2 and 9\n');
			printHelp();
			process.exit(1);
		}
	} else if(args[0] == 'help' || args[0] == '--help' || args[0] == '-help' || args[0] == '-h') {
		printHelp();
		process.exit(0);
	} else {
		console.error(args[0], ': Delay must be between 1 and 3600000\n');
		printHelp();
		process.exit(1);
	}
} else {
	global.delay = 50;
	global.range = 9;
}
console.log('Press Ctrl+c to exit');
console.log('\nRandomizer ready with delay '+delay+' and range 1-'+range);
process.stdout.write('\nPress [rightAlt] to Activate\r');

var interval = setInterval(function(){console.log("nothing")},60000);
clearInterval(interval);
//console.log("Interval cleared");

//keyboard.on('keyup', console.log);
//keyboard.on('keydown', console.log);
keyboard.on('keypress', keypress => {
//	console.log(keypress.code);
//	console.log('KEY PRESSED: '+keypress.code);
	if(keypress.code == 100) {
		// then Right Alt has been pressed
//		console.log("Right Alt pressed");
		if(interval._destroyed) {
//			console.log("Interval is destroyed. Starting it.");
			interval = setInterval(function(){
				var random = Math.round(Math.random()*(range - 1))+1;
//				console.log('Random number generated: '+random.toString());
				robot.keyTap(random);
//				console.log('Key '+random.toString()+' pressed');
//				console.log('Iteration done');
//				console.log();
			}	, delay);
			console.log('Now ACTIVE'+' '.repeat(25));
			process.stdout.write('Deactivate by pressing [leftAlt]\r');
		} else {
			clearInterval(interval);
			console.log('\r%cNow INACTIVE'+' '.repeat(25),"color: red");
			process.stdout.write('Press [rightAlt] to Activate\r');
		};
	} else if(keypress.code == 56) {
		// then left alt was pressed
//		console.log("Left Alt was pressed");
		if(!interval._destroyed) {
			clearInterval(interval);
			console.log('\rDeactivated'+' '.repeat(25));
			process.stdout.write('Press [rightAlt] to Activate\r');
		}
	}
});
