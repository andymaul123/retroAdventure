const fs = require('fs'),
      inquirer = require('inquirer'),
      readline = require('readline'),
      chalk = require('chalk'),
      store = require('./store.js'),
      constants = require('./constants.js'),
      controller = require('./controller.js'),
      helpers = require('./helpers.js');


function init() {
  fs.readdir(store.read(constants.gamesDirectory), function(err,files){
    inquirer.prompt([{
      type: 'list',
      name: 'games',
      message: 'Choose a game',
      choices: files
    }])
    .then(function(answers){
      store.write(constants.gameFile,require(store.read(constants.gamesDirectory)+"/"+answers.games));
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.setPrompt(answers.games.replace(".js","") + " > ");
      rl.on('line', (input) => {
        controller.parseCommand(input);
        rl.prompt();
      });
      console.log(chalk.magenta(store.read(constants.gameFile).img));
      console.log(chalk.magenta.italic(store.read(constants.gameFile).desc));
      console.log("");
      helpers.renderRoom(true);
      rl.prompt();
    })
  })
}





init();