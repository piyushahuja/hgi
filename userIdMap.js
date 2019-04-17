let getuserIdMap = function (filePath, callback){

	let userIdMap = {};
	var lineReader = require('readline').createInterface({
  		input: require('fs').createReadStream(filePath)
	});

	lineReader.on('line', function (line) {
  		let row =  line.split(":")
  		userIdMap[row[0]] = row[2];
	});

 	lineReader.on('close', function(line){
 		callback(userIdMap)
 	})
	
}


const userIdMap = getuserIdMap('./etc/passwd', function(userIdMap){
   	console.log(userIdMap)
	return userIdMap
})










// detemrine last line catch a "close" event: rl.on('close', cb)