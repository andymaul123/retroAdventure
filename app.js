const fs = require('fs'),
      inquirer = require('inquirer'),
      readline = require('readline'),
      chalk = require('chalk'),
      util = require('util'),
      store = require('./store.js'),
      constants = require('./constants.js'),
      controller = require('./controller.js'),
      helpers = require('./helpers.js');

const readDir = util.promisify(fs.readdir);

let chosenGame, saveFiles;

let responseObject = {
  "chosenGame": "",
  "savesArray": []
}

function init() {
  readDir(store.read(constants.gamesDirectory))
  .then((files) => {
    return inquirer.prompt([{
      type: 'list',
      name: 'games',
      message: 'Choose a game',
      choices: files
    }])
  })
  .then((response) => {
    responseObject.chosenGame = response.games;
    return readDir('./saves');
  })
  .then((response) => {
    responseObject.savesArray = response;
    if(responseObject && responseObject.savesArray.includes(responseObject.chosenGame)) {
      return inquirer.prompt([{
        type: 'list',
        name: 'load',
        message: 'There is a save file for this game. Do you wish to load it?',
        choices: ["Yes", "No"]
      }])
    }
    return null
  })
  .then((response) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.setPrompt(responseObject.chosenGame.replace(".js","") + " > ");
    rl.on('line', (input) => {
      controller.parseCommand(input);
      rl.prompt();
    });
    if(response && response.load === "Yes") {
      console.log(chalk.yellow("Loading game..."));
      store.load(require('./saves/'+responseObject.chosenGame));
    } else {
      store.write(constants.gameFile, require(store.read(constants.gamesDirectory)+"/"+responseObject.chosenGame));
      console.log(chalk.magenta(store.read(constants.gameFile).img));
      console.log(chalk.magenta.italic(store.read(constants.gameFile).desc));
      console.log("");
      helpers.renderRoom(true);
    }
    rl.prompt();
  })
  .catch(error => console.log(error));

}





init();

