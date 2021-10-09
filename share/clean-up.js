const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m%s\x1b[0m';

const INSTALL_PATH_TO_PROJECT_FOLDER = process.env.npm_config_INSTALL_PATH_TO_PROJECT_FOLDER || '../../../../';
const HALEY_DIR = process.env.npm_package_config_HALEY_DIR || process.env.npm_config_HALEY_DIR || '';
const COPY_DOMAINS_TO_FOLDER = process.env.npm_config_COPY_DOMAINS_TO_FOLDER;

// if COPY_DOMAINS_TO_FOLDER is not set, then the domains will be copied to lib-vital/vitalservice;
let FOLDERS_TO_BE_CLEAN;
if (COPY_DOMAINS_TO_FOLDER) {
    const COPY_TO_PATH = path.join(__dirname, INSTALL_PATH_TO_PROJECT_FOLDER, COPY_DOMAINS_TO_FOLDER);
    FOLDERS_TO_BE_CLEAN = [
        path.join(COPY_TO_PATH, 'domains'),
        path.join(COPY_TO_PATH, 'domains-data'),
    ];
} else {
    const COPY_TO_PATH = path.join(__dirname, INSTALL_PATH_TO_PROJECT_FOLDER, HALEY_DIR, 'lib-vital');
    FOLDERS_TO_BE_CLEAN = [
        path.join(COPY_TO_PATH, 'vitalservice-js/domains'),
        path.join(COPY_TO_PATH, 'vitalservice-js/domains-data'),
    ];
}

console.log('Cleaning up domains files');
FOLDERS_TO_BE_CLEAN.forEach(function(dir) {
    if (!fs.existsSync(dir)){
        console.log(`directory: ${dir} does not exist`);
    } else {
        fs.readdir(dir, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              console.log(`Deleting file ${path.join(dir, file)}`);
              fs.unlink(path.join(dir, file), err => {
                if (err) throw err;
              });
            }
          });
    }
});
