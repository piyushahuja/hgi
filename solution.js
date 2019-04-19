
let processFile = require('./processFile');
let getUserIdMap = require('./userIdMap');
let getGroupIdMap = require('./groupIdMap');
let userGroups = require('./data/manifest.json'); 
let SOLUTION = [];

(async function(SOLUTION){

  let userIdMap = await getUserIdMap();  // Contains a dictionary structure of the form{user: userId}
  let groupIdMap = await getGroupIdMap(); /// Contains a dictionary structure of the form{group: groupId}
  let numUsers  = userGroups.length;
  let indexOfUserGroupInSolution = {}
  

/**
 * This piece of code reads each entry from manifest.json, which corresponds to a user, appends keys for size, lastModified and inodes with suitable default values, and pushes it to the final array containing the data.
 * Simultaneously, we store the array index to which this user has be stored in the data array.
 */
  for(let i = 0; i < numUsers; i++){
      let ugislObject = userGroups[i];
        ugislObject.inodes = 0;
        ugislObject.size = 0;
        ugislObject.latest = null; 
        SOLUTION.push(ugislObject);
        let userGroup = ugislObject.user + "," + ugislObject.group;
        indexOfUserGroupInSolution[userGroup] = i;

  } 
 

/**
 * This piece of code reads stat line by line and extracts {userID, size, lastModified}
 * Then it checks finds the corresponding entry int the final finalDataArray[] for the user (say user) and does the following:
 * 1. Increments user.inodes by 1
 * 2. Increments user.size by size
 * 3. Checks if lastModified is bigger than user.lastModified. If it is, it updates it
 */

let processLine = function(line){
    let row =  line.split("\t");
    let userId = row[2];
    let size =  parseInt(row[1]);
    let groupId = row[3];


    let lastModified = row[5];
    let user = userIdMap[userId]
    let group = groupIdMap[groupId]
    let userGroup = user + "," + group;
    let index = indexOfUserGroupInSolution[userGroup]
    if (index != null){
      let ugislObject = SOLUTION[index]
      ugislObject.size = ugislObject.size + size;
      ugislObject.inodes = ugislObject.inodes + 1;
      if(ugislObject.latest < lastModified){
        ugislObject.latest = lastModified;
      }   

    }  

}

await processFile('./data/stat.dat', processLine)

console.log(SOLUTION)

})(SOLUTION)









