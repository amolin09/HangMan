const assert = require('assert');//code used to receive input in terminal
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let wordBank = ['NINJA', 'SAMURAI', 'GEISHA', 'SUSHI', 'ISLAND', 'SUMO', 'RAMEN', 'CHOPSTICKS', 'KIMONO', 'ANIME', 'ORIGAMI', 'RICE', 'KATANA', 'MOUNTAINS', 'SHOGUN', 'NINTENDO', 'SEGA', 'TOKYO', 'HAIKU', 'SHOGI']  //if we want different themes, I will have multiple arrays for the word banks. we'll change which array to pick the word from depending on the user's selected theme.
let selectedWord = '' //this stores the word the user is trying to guess. I suppose it could be named better
let guessWord = [] //as the user guesses letters, the correct letters will be stored in this array
let correctWord = ''//in order to check the selectedWord with guessWord, we need to convert guessWord into a string. this variable holds that string.
let usedLetters = []//as the user guesses letters, we don't want them to accidentally guess a previous letter. This array stores the letters the user enters and compares them to future guesses
let turns = 6// amount of tries the user has. decreases for every incorrect letter guessed. once it reaches 0, the game ends
let gameOver = false//determines if the game is over either by winning or losing. prevents user from continuing to guess after the game is over. streamlines UX


const getRandomInt = (min, max) => { // function used to create random integers
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomWord = (wordsArray) =>{// function used to select a word from the wordBank array. uses the random generated number to determine index of the wordBank array
  const randomIndex = getRandomInt(0, wordsArray.length);
  selectedWord = wordsArray[randomIndex]

  for(let i = 0; i < selectedWord.length; i++){
    guessWord[i] = "_"//guessWord array starts with the length as selectedWord's length and default value is _. i used _ as the placeholder so that there's something to see in the terminal. not necessary when we switch to DOM
  }
}

const restartFields = () =>{//if replaying the game, the original arrays and variables need to be reset so that they don't carry over to the next game
  turns = 6
  gameOver = false
  usedLetters = []
  guessWord = []

  for(let i = 0; i < selectedWord.length; i++){
    guessWord[i] = "_"
  }

}

const replay = () =>{//this prompt is used to play the game again if the user wants. I had to call this twice so I thought it would look cleaner with all functions called in a single function
  rl.question('Play again? Y or N: ', (restart) => { 
    const playAgain = restart.toUpperCase()
     if(playAgain == "Y"){
       getRandomWord(wordBank)
       restartFields()
       getPrompt()
     }
     });
}

const printBoard = () =>{// prints out the board on terminal, not needed when we switch to DOM
  let wordBoard = guessWord.join(' ')
  const displayLength = selectedWord.length
  console.log('\nLives: ' + turns)
  console.log('This word has ' + displayLength + ' letters.\n')
  console.log(wordBoard + '\n')
  //console.log(selectedWord) uncomment me if you want to see the answer displayed on the screen
}

const hangMan = (guess) =>{
  let upperGuess = guess.toUpperCase()
  console.log('\n------------------------------------------\n')

  if(upperGuess.length > 1 || upperGuess.length < 1){ // prevents the user from entering an input longer than a single character
    console.log('Not a valid guess. Try again')
  }
  
  else if(usedLetters.includes(upperGuess)){// checks if the letter inputted has already been guessed by checking the usedLetters array. any valid guess (correct or incorrect) gets stored in usedLetters array
    console.log('Already guessed that letter. Try again')
  }

  else if(selectedWord.includes(upperGuess)){// checks if the guess is in the selectedWord. 
     
      for(let i = 0; i < selectedWord.length; i++){//iterating through selectedWord, comparing each letter to the guessed letter
     
        if(selectedWord[i] == upperGuess){//checks if current index of selectedWord matches the guess
        guessWord[i] = upperGuess//if so, the guessed letter gets added to guessWord array, matching the same index in selectedWord
        usedLetters.push(upperGuess)//guessed letter getting added to usedLetters array
        }
      
      }
      console.log("Good guess! Keep going!")
    }

  else{
      usedLetters.push(upperGuess)//incorrect guess, still gets added to usedLetters so that we don't decrease lives if the same letter was guessed again
      console.log('Wrong guess! Try again!')
      turns--
  }
  
    
}


const getPrompt = () =>  { // initial function to start the game. I recommend having a start button to call this function so that the game doesn't start immediately when the page loads. 
  printBoard();
  correctWord = guessWord.join('')//converts guessWord array into a string with no commas

  if(correctWord == selectedWord){//conmpares correctWord to see if it matches the selectedWord. if so, the game is won
    console.log('You got the right word!')
    gameOver = true
    replay()
  }

  else if(turns < 1){//runs out of lives, game ends, selectedWord is displyed
    console.log('You ran out of lives! The answer was: ' + selectedWord )
    gameOver = true
    replay()
  }

  if(!gameOver){//as long as gameOver isn't true, the game continues on
    rl.question('Guess a letter: ', (guess) => { 
      hangMan(guess);
      getPrompt();
      });
  } 
    
}

getRandomWord(wordBank);//initial call to select word from wordbank. we only need to run this function once to get the random selectedWord. if placed in getPrompt function, selectedWord will continuously randomize after each guess
getPrompt()//initial call to start the game in terminal

