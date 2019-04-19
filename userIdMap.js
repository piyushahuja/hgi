

let getUserIdMap = async function(){

	let processFile = require('./processFile');

	let userIdMap = {};
	let processLine = function(line){
		let row =  line.split(":");
  		userIdMap[row[2]] = row[0];
		
	}
	
	await processFile('./etc/passwd', processLine)
	return userIdMap
	
	
}	

module.exports = getUserIdMap


	













// detemrine last line catch a "close" event: rl.on('close', cb)