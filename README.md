# haley-js-scripts

## install
```js
    npm install @vital-ai/haley-js-scripts
```

## Share
scripts that could be used both to server side and web side

### copy-domains

#### Functionality
This command will copy the domains files from process.env.VITAL_HOME to ${HALEY_DIR}/lib-vital/vitalservice-js.
- HALEY_DIR could be set through .npmrc. putting the following inside .npmrc file
```js
    HALEY_DIR=www/haley-js-browser
```

#### How to use the command
1, put the following scripts to the package.json file
```js
    scripts: {
        "copy-domains": "node ./node_modules/@vital-ai/haley-js-scripts/share/copy-domains.js",
    }
```

### copy-domains-server

#### Functionality
This command will copy the domains files from process.env.VITAL_HOME to ${copy_domains_to_folder_server}/vitalservice.
- copy_domains_to_folder_server could be set through .npmrc. putting the following inside .npmrc file. It has the default value '.'
```js
    copy_domains_to_folder_server=.
```

#### How to use the command
1, put the following scripts to the package.json file
```js
    scripts: {
        "copy-domains": "node ./node_modules/@vital-ai/haley-js-scripts/share/copy-domains-server.js",
    }
```