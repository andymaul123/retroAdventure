const repl = require('repl'),
      fs = require('fs'),
      inquirer = require('inquirer'),
      readline = require('readline'),
      gamesDirectory = './games';


function init() {
  fs.readdir(gamesDirectory, function(err,files){
    inquirer.prompt([{
      type: 'list',
      name: 'games',
      message: 'Choose a game',
      choices: files
    }])
    .then(function(answers){
      const gameFile = require(gamesDirectory+"/"+answers.games);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.setPrompt(answers.games.replace(".js","") + " > ");
      rl.prompt();
      rl.on('line', (input) => {
        console.log(`Received: ${input}`);
      });
      console.log(gameFile.img);
    })
  })
}





init();