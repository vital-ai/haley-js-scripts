const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m%s\x1b[0m';

const INSTALL_PATH_TO_PROJECT_FOLDER = process.env.npm_config_INSTALL_PATH_TO_PROJECT_FOLDER || '../../../../';
const VITAL_HOME_PATH = process.env.VITAL_HOME || process.env.npm_config_VITAL_HOME || path.join(__dirname, INSTALL_PATH_TO_PROJECT_FOLDER, '../vitalhome-harbordev');
const HALEY_DIR = process.env.npm_package_config_HALEY_DIR || process.env.npm_config_HALEY_DIR || '';
const COPY_DOMAINS_TO_FOLDER = process.env.npm_config_COPY_DOMAINS_TO_FOLDER;

const DOMAINS_PATH = path.join(VITAL_HOME_PATH, 'domain-json-schema');
const DOMAINS_JSON_DATA_PATH = path.join(VITAL_HOME_PATH, 'domain-json-data');

if(!fs.existsSync(DOMAINS_PATH) || !fs.lstatSync(DOMAINS_PATH).isDirectory()) {
    console.error(RED, `${DOMAINS_PATH} does not exist`);
    throw new Error(`${DOMAINS_PATH} does not exist`);
}

if(!fs.existsSync(DOMAINS_JSON_DATA_PATH) || !fs.lstatSync(DOMAINS_JSON_DATA_PATH).isDirectory()) {
    console.error(RED, `${DOMAINS_JSON_DATA_PATH} does not exist`);
    throw new Error(`${DOMAINS_JSON_DATA_PATH} does not exist`);
}

// if COPY_DOMAINS_TO_FOLDER is not set, then the domains will be copied to lib-vital/vitalservice;
if (COPY_DOMAINS_TO_FOLDER) {
    const COPY_TO_PATH = path.join(__dirname, INSTALL_PATH_TO_PROJECT_FOLDER, COPY_DOMAINS_TO_FOLDER);

    const FOLDERS_TO_BE_CREATED = [
        COPY_TO_PATH,
        path.join(COPY_TO_PATH, 'domains'),
        path.join(COPY_TO_PATH, 'domains-data'),
    ];

    console.log('Creating Neccessary Folder');
    FOLDERS_TO_BE_CREATED.forEach(function(dir) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            console.log(`created directory: ${dir}`);
        } else {
            console.log(`directory: ${dir} already exist`);
        }
    });

    const copyFile = (sourcePath, destinationPath, file) => {
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
                console.log(`Copied file: ${file}`);
            });
        });
    }

    const domainFiles = fs.readdirSync(DOMAINS_PATH).filter(fileName => fileName.endsWith('.js'));
    const domainJsonDataFiles = fs.readdirSync(DOMAINS_JSON_DATA_PATH).filter(fileName => fileName.endsWith('.js') || fileName.endsWith('.ndjson'));

    domainFiles.forEach(function(file) {
        const sourcePath = path.join(DOMAINS_PATH, file);
        const destinationPath = path.join(COPY_TO_PATH, 'domains', file);
        copyFile(sourcePath, destinationPath, file);
    });

    domainJsonDataFiles.forEach(function(file) {
        const sourcePath = path.join(DOMAINS_JSON_DATA_PATH, file);
        const destinationPath = path.join(COPY_TO_PATH, 'domains-data', file);
        copyFile(sourcePath, destinationPath, file);
    });

} else {

    const COPY_TO_PATH = path.join(__dirname, INSTALL_PATH_TO_PROJECT_FOLDER, HALEY_DIR, 'lib-vital');

    const FOLDERS_TO_BE_CREATED = [
        COPY_TO_PATH,
        path.join(COPY_TO_PATH, 'vitalservice-js'),
        path.join(COPY_TO_PATH, 'vitalservice-js/domains'),
        path.join(COPY_TO_PATH, 'vitalservice-js/domains-data'),
    ];

    console.log('Creating Neccessary Folder');
    FOLDERS_TO_BE_CREATED.forEach(function(dir) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            console.log(`created directory: ${dir}`);
        } else {
            console.log(`directory: ${dir} already exist`);
        }
    });

    const copyFile = (sourcePath, destinationPath, file) => {
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
                console.log(`Copied file: ${file}`);
            });
        });
    }

    const domainFiles = fs.readdirSync(DOMAINS_PATH).filter(fileName => fileName.endsWith('.js'));
    const domainJsonDataFiles = fs.readdirSync(DOMAINS_JSON_DATA_PATH).filter(fileName => fileName.endsWith('.js') || fileName.endsWith('.ndjson'));

    domainFiles.forEach(function(file) {
        const sourcePath = path.join(DOMAINS_PATH, file);
        const destinationPath = path.join(COPY_TO_PATH, 'vitalservice-js/domains', file);
        copyFile(sourcePath, destinationPath, file);
    });

    domainJsonDataFiles.forEach(function(file) {
        const sourcePath = path.join(DOMAINS_JSON_DATA_PATH, file);
        const destinationPath = path.join(COPY_TO_PATH, 'vitalservice-js/domains-data', file);
        copyFile(sourcePath, destinationPath, file);
    });
}
