const repl = require('repl'),
      fse = require('fse'),
      inquirer = require('inquirer'),
      readline = require('readline'),
      gamesDirectory = './games';


function init() {
  fse.readdir(gamesDirectory)
  .then(function(files) {
    inquirer.prompt([{
      type: 'list',
      name: 'games',
      message: 'Choose a game',
      choices: files
    }])
    .then(function(answers){
      const gameFile = require(gamesDirectory+"/"+answers.games);
      console.log(gameFile);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.setPrompt(answers.games.replace(".json","") + " > ");
      rl.prompt();
      rl.on('line', (input) => {
        console.log(`Received: ${input}`);
      });
    })
  }) 

}

function startRepl(game) {

}





init();