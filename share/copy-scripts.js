// This script is for copying files from some places (node_modules...) to a destination folder.
// It will required the user to set up two env variables in the file .npmrc 
// the first env variable: COPY_TO_FOLDER
// the second env variable: COPY_FROM_FILES
// the third env variable: SPLIT_SEPARATOR (default to &&&)
/*
    Example for the COPY_FROM_FILES.
    if we want do the following
        - copy node_modules/@vital-ai/haley-group-instance/index.web.js to COPY_TO_FOLDER webroot/libraries and rename the file to group-api.web.js
        - copy node_modules/@vital-ai/haley-group-instance/index.js to COPY_TO_FOLDER webroot/libraries and rename the file to group-api.js

    The the the set up in the .npmrc file could be
    COPY_FROM_FILES=node_modules/@vital-ai/haley-group-instance/index.web.js->group-api.web.js&&&node_modules/@vital-ai/haley-group-instance/index.js->group-api.js
*/

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m%s\x1b[0m';
const SPLIT_SEPARATOR = process.env.npm_config_SPLIT_SEPARATOR;
const COPY_TO_FOLDER = process.env.npm_config_COPY_TO_FOLDER;
const ENV_COPY_FROM_FILES = process.env.npm_config_COPY_FROM_FILES;
const copyFromFiles = ENV_COPY_FROM_FILES.split(SPLIT_SEPARATOR || '&&&');
const relativePathFromScriptToRoot = '../../../../';

const copyToFolder = path.join(__dirname, relativePathFromScriptToRoot, COPY_TO_FOLDER);

if (COPY_TO_FOLDER && !fs.existsSync(copyToFolder)){
    console.error(RED, `Directory ${copyToFolder} does not exist`);
    console.error(RED, `Might be issue with the config of COPY_TO_FOLDER in .npmrc`);
    return;
}

// copy the latest file.
console.log(`Copying files to folder: ${copyToFolder}`);
copyFromFiles.forEach(function(file) {
    const fileParts = file.split('->');
    const filePath = fileParts[0];
    const sourcePath = path.join(__dirname, relativePathFromScriptToRoot, filePath);
    const fileName = fileParts.length > 1 ? fileParts[1] : sourcePath.split('/').pop();
    const destinationPath = path.join(__dirname, relativePathFromScriptToRoot, COPY_TO_FOLDER, fileName);

    if(fs.existsSync(destinationPath)) {
        fs.unlink(destinationPath, function (err) {            
            if (err) {                                                 
                console.error(RED, err);                          
            }                                                          
           console.log(`Deleted old file: ${file}`);                           
        });
    }

    fs.readFile(sourcePath, 'utf8', function (err,data) {
        if (err) {
          console.log(RED, err)
          throw err;
        }

        fs.writeFile(destinationPath, data, 'utf8', function (err) {
            if (err) {
                console.log(RED, err);
                throw err;
            }
            console.log('Copied file: ', fileName);
        });
    });
});
