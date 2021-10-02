const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m%s\x1b[0m';
const WEBROOT_DIR = process.env.npm_package_config_WEBROOT_DIR || process.env.npm_config_WEBROOT_DIR;
const INSTALL_PATH_TO_PROJECT_FOLDER = process.env.npm_package_config_INSTALL_PATH_TO_PROJECT_FOLDER || process.env.npm_config_INSTALL_PATH_TO_PROJECT_FOLDER || '../../../../';

const webrootAbsolute = path.join(__dirname, INSTALL_PATH_TO_PROJECT_FOLDER, WEBROOT_DIR);
if (!fs.existsSync(webrootAbsolute)){
    console.error(RED, `Directory ${webrootAbsolute} does not exist`);
    console.error(RED, `Might be issue with the config of WEBROOT_DIR in package.json`);
    return;
}

const OUTPUT_DOMAINS_PATH = path.join(__dirname, INSTALL_PATH_TO_PROJECT_FOLDER, WEBROOT_DIR, 'js/domains.js');
const DOMAINS_PATH = path.join(process.env.VITAL_HOME, 'domain-json-schema');

if(!fs.existsSync(DOMAINS_PATH) || !fs.lstatSync(DOMAINS_PATH).isDirectory()) {
    console.error(RED, `${DOMAINS_PATH} does not exist`);
    throw new Error(`${DOMAINS_PATH} does not exist`);
}

const items = fs.readdirSync(DOMAINS_PATH);
let text = 'VITAL_DOMAINS = ["' + items.filter(s => s.endsWith('.js')).join('", "') + '"];\n';
text += `TIME_DOMAIN_LIST_CREATED = "${new Date()}"`;
fs.writeFile(OUTPUT_DOMAINS_PATH, text, {flag: 'w+'}, function (err) {
    if(err) {
        console.error(RED, err);
        throw err;
    }
    console.log('write files as list in domains.js');
});
