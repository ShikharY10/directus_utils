const fs = require('fs');
const chokidar = require('chokidar');
const chalk = require('chalk');

const copyFileContent = (source, destination) => {
  try {
    const content = fs.readFileSync(source, 'utf-8');
    fs.writeFileSync(destination, content);

    console.log(`Content copied from '${source}' to '${destination}' successfully.`);
  } catch (e) {
    console.error(`An error occurred: ${e}`);
  }
};

function listener(project_name, extension_type, extension_name) {

    const PROJECT_NAME = (project_name != null) ? project_name : process.env.PROJECT_NAME;
    const EXT_TYPE = (extension_type != null) ? extension_type : process.env.EXT_TYPE;
    const EXT_NAME = (extension_name != null) ? extension_name : process.env.EXT_NAME;
    
    const SOURCE = './dist/index.js';
    const DESTINATION = `../../${PROJECT_NAME}/extensions/${EXT_TYPE}/${EXT_NAME}/index.js`;

    const watcher = chokidar.watch(SOURCE, { ignoreInitial: true });

    watcher.on('all', (event, path) => {
    console.log(`File ${path} was ${event}`);
    if (event === 'add' || event === 'change') {
        copyFileContent(SOURCE, DESTINATION);
    }
    });

    console.log(chalk.green(`[directus_utils] [Listner] => Watching for changes in '${SOURCE}' file`));
}

module.exports = listener;

// Uses chalk@4.1.2