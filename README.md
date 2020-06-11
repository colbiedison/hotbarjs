# hotbarjs
Usage : node index.js [delay] [range]
-------------------------------------
Both arguments are optional.
Cannot declare range without delay.

delay: time between slot switches (in ms), default 50
range: highest slot to switch to (2-9), default 9

You may be required to run this program as root to access the input device. In that case, run the program with
sudo node index.js [delay] [range]
