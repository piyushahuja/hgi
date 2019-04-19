


/**
 * A generic function which takes a filepath and function as input, reads the file line by line and returns an object.
 */

let processFile = async function(filePath, processLine){

	const lineReader = require('readline');
	const fileLineReader = lineReader.createInterface(
		 {input: require('fs').createReadStream(filePath)}
	)

	return new Promise((resolve, reject) => {
		fileLineReader.on('line', processLine)
		fileLineReader.on('close', () => {
			resolve();
		})
	})
	

}


module.exports = processFile
