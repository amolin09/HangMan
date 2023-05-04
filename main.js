const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//min 5 let, max 10 letter
let wordBank = ['ninja', 'samurai', 'geisha', 'sushi', 'island', 'sumo', 'ramen', 'chopsticks', 'kimono', 'anime', 'origami']
let selectedWord = ''
let guessWord = []
let correctWord = ''
let usedLetters = []
let turns = 6
let gameOver = false


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomWord = (wordsArray) =>{
  const randomIndex = getRandomInt(0, wordsArray.length);
  selectedWord = wordsArray[randomIndex]

  for(let i = 0; i < selectedWord.length; i++){
    guessWord[i] = "_"
  }
}

const printBoard = () =>{
  let wordBoard = guessWord.join(' ')
  // console.log('------------------------------------------')
  console.log('\nLives: ' + turns)
  console.log(wordBoard + '\n')
}

const hangMan = (guess) =>{

  console.log('------------------------------------------')

  if(guess.length > 1){
    console.log('Not a valid guess. Try again')
  }
  
  else if(usedLetters.includes(guess)){
    console.log('Already guessed that letter. Try again')
  }

  else if(selectedWord.includes(guess)){
     
      for(let i = 0; i < selectedWord.length; i++){
     
        if(selectedWord[i] == guess){
        guessWord[i] = guess
        usedLetters.push(guess)
        }
      
      }
      console.log("Good guess! Keep going!")
    }

  else{
      usedLetters.push(guess)
      console.log('Wrong guess! Try again!')
      turns--
    }
  
    
}


const getPrompt = () =>  {
  printBoard();
  correctWord = guessWord.join('')

  if(correctWord == selectedWord){
    console.log('You got the right word!')
    gameOver = true
  }

  else if(turns < 1){
    console.log('You ran out of lives! The answer was: ' + selectedWord )
    gameOver = true
  }

  if(!gameOver){
    rl.question('Guess a letter: ', (guess) => { 
      hangMan(guess);
      getPrompt();
      });
  } 
    
}

getRandomWord(wordBank);
getPrompt()

