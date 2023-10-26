const fs = require('fs');
const chokidar = require('chokidar');
const chalk = require('chalk');

const copyFileContent = (source, destination) => {
  try {
    const content = fs.readFileSync(source, 'utf-8');
    fs.writeFileSync(destination, content);

    console.log("[directutils] [Gossip Successfull] : ", chalk.green(source), ">>>", chalk.green(destination));
  } catch (e) {
    console.log(chalk.red(`An error occurred: ${e}`));
  }
};

function listener(destinationFile) {
    
    const SOURCE = './dist/index.js';
    const DESTINATION = (destinationFile != null) ? destinationFile : process.env.DESTINATION_FILE;

    const watcher = chokidar.watch(SOURCE, { ignoreInitial: true });

    watcher.on('all', (event, path) => {
    if (event === 'add' || event === 'change') {
        copyFileContent(SOURCE, DESTINATION);
    }
    });

    console.log(chalk.green(`[directutils] [Gossip] => Watching for changes in '${SOURCE}' file`));
}

module.exports = listener;

// Uses chalk@4.1.2