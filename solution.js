
let userIdMap =  require('./userIdMap'); // Contains a dictionary structure of the form{user: userId}
let userGroups = require('./finalDataArray/manifest.json'); 



await userID(('./etc/passwd'))

console.log(userGroups);

let numUsers  = userGroups.length;
let mapOfUserIdToDataArrayIndex = {
	
}


let finalDataArray = [];


/**
 * This piece of code reads each entry from manifest.json, which corresponds to a user, appends keys for size, lastModified and inodes with suitable default values, and pushes it to the final array containing the data.
 * Simultaneously, we store the array index to which this user has be stored in the data array.
 */

for(let i = 0; i < numUsers; i++){
	let userGroup = userGroups[i];
	userGroup.size = 0;
	userGroup.lastModified = null;
	userGroup.inodes = 0;
	finalDataArray.push(userGroup);
	let user = userGroup.user;
	let userID = userIdMap[user];
	mapOfUserIdToDataArrayIndex[userID] = i;
}


/**
 * This piece of code reads stat line by line and extracts {userID, size, lastModified}
 * Then it checks finds the corresponding entry int the final finalDataArray[] for the user (say user) and does the following:
 * 1. Increments user.inodes by 1
 * 2. Increments user.size by size
 * 3. Checks if lastModified is bigger than user.lastModified. If it is, it updates it
 */

var lineReader = require('readline').createInterface({
  	input: require('fs').createReadStream('./finalDataArray/stat.dat')
});

lineReader.on('line', function (line) {
  	let row =  line.split("\t");
  	let userID = row[2];
  	let size = row[1];
  	let lastModified = row[5];
  	let user = finalDataArray[mapOfUserIdToDataArrayIndex[userID]]
  	user.size = user.size + size;
  	user.inodes = user.inodes + 1;
  	if(user.lastModified < lastModified){
  		user.lastModified = lastModified;
  	}  	

});

 lineReader.on('close', function(line){
 	
 })

 return finalDataArray


