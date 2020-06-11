# hotbar.js
hotbar.js is a node.js script which automatically presses random number keys.  
It is designed to assist with building in minecraft with randomized blocks.  

hotbar.js uses  
[input-event](https://github.com/risacher/input-event) by Daniel Risacher  
[robotjs](https://github.com/octalmage/robotjs) by Jason Stallings  

Prerequesites
-------------
You must have [node.js](https://nodejs.org/en/download/) installed.

Installation
------------
Clone this repository  
`git clone https://github.com/colbiedison/hotbarjs.git`  
Move into install directory  
`cd hotbarjs`  
Update node packages  
`npm i`  

Run  
`node index.js`  

Usage
-----
`node index.js [delay] [range]`

Both arguments are optional.  
Cannot declare range without delay.

delay: time between slot switches (in ms), default 50  
range: highest slot to switch to (2-9), default 9

You may be required to run this program as root to access the input device.
