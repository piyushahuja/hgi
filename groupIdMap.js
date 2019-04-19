

let getGroupIdMap = async function(){

	let processFile = require('./processFile');

	let groupIdMap = {};
	let processLine = function(line){
		let row =  line.split(":");
  		groupIdMap[row[2]] = row[0];
		
	}
	
	await processFile('./etc/group', processLine)
	return groupIdMap
	
	
}	

module.exports = getGroupIdMap


	













// detemrine last line catch a "close" event: rl.on('close', cb)