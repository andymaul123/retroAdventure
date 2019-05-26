const repl = require('repl'),
      fse = require('fse'),
      inquirer = require('inquirer'),
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
      startRepl(answers.games)
    })
  }) 

}

function startRepl(game) {
  let promptTitle = game.replace(".json","") + " > ";
  const replServer = repl.start({
    prompt: promptTitle, 
    ignoreUndefined: true
  });
  let gamePath = "./games/"+game;
  replServer.context.game = require(gamePath);
}





init();