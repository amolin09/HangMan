
const japanWordBank = ['NINJA', 'SAMURAI', 'GEISHA', 'SUSHI', 'ISLAND', 'SUMO', 'RAMEN', 'CHOPSTICKS', 'KIMONO', 'ANIME', 'ORIGAMI', 'RICE', 'KATANA', 'MOUNTAINS', 'SHOGUN', 'NINTENDO', 'SEGA', 'TOKYO', 'HAIKU', 'SHOGI']  //if we want different themes, I will have multiple arrays for the word banks. we'll change which array to pick the word from depending on the user's selected theme.
const animalWordBank = ['DOG', 'CAT', 'MOUSE', 'HORSE', 'ELEPHANT', 'BEAR', 'ALLIGATOR', 'LION', 'SCORPION', 'LIZARD', 'SNAKE', 'SPIDER', 'TURTLE', 'ZEBRA', 'GIRAFFE', 'MONKEY', 'OWL', 'BUTTERFLY', 'DOLPHIN', 'WHALE', 'SHARK', 'EAGLE', 'MOOSE', 'BEAVER', 'OTTER']
const schoolWordBank = ['DESK', 'COMPUTER', 'PAPER', 'STAPLER', 'LUNCH', 'PRINTER', 'PENCIL', 'HOMEWORK', 'TEACHER', 'STUDENT', 'GYMNASIUM', 'CAFETERIA', 'BAND', 'ART', 'MATH', 'HISTORY', 'SCIENCE', 'THEATER', 'SPORTS', 'LIBRARY', 'OFFICE', 'RESTROOM']
const spaceWordBank = ['EARTH', 'MARS', 'MERCURY', 'MOON', 'VENUS', 'SUN', 'GALAXY', 'SATELLITE', 'JUPITER', 'SATURN', 'NEPTUNE', 'NEBULA', 'SUPERNOVA', 'PULSAR', 'BLACKHOLE', 'STAR', 'PLUTO', 'ASTEROID', 'COMET', 'SPACESHIP']
const foodWordBank = ['PIZZA', 'HAMBURGER', 'SANDWICH', 'TACOS', 'SPAGHETTI', 'LASAGNA', 'CHICKEN', 'STEAK', 'SALMON', 'CASSEROLE', 'TURKEY', 'SALAD', 'CAKE', 'SOUP']
const fullWordBank = [japanWordBank, animalWordBank, schoolWordBank, spaceWordBank, foodWordBank]

let selectedWordBank = 0
let selectedWord = '' //this stores the word the user is trying to guess. I suppose it could be named better
let guessWord = [] //as the user guesses letters, the correct letters will be stored in this array
let usedLetters = []//as the user guesses letters, we don't want them to accidentally guess a previous letter. This array stores the letters the user enters and compares them to future guesses
let lives = 6// amount of tries the user has. decreases for every incorrect letter guessed. once it reaches 0, the game ends
let gameOver = false//determines if the game is over either by winning or losing. prevents user from continuing to guess after the game is over. streamlines UX

const hangManPictreElement = document.getElementById('hang-man-picture')//setting variables to existing but empty divs in the DOM
const turnsCounterDiv = document.getElementById('turns-div')
const winnerDivElement = document.getElementById('win-or-lose-div')
const feedBackDiv = document.getElementById('feedback-div')

const getRandomInt = (min, max) => { // function used to create random integers
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomWord = (wordsArray) =>{// function used to select a word from the wordBank array. uses the random generated number to determine index of the wordBank array
  const randomIndex = getRandomInt(0, wordsArray.length);
  selectedWord = wordsArray[randomIndex]

  for(let i = 0; i < selectedWord.length; i++){
    guessWord[i] = "_"
  }  
}

const getWordArray = () =>{//if we want to use all the word banks, this randomizes which array to use and getRandomWord will choose the word within that array
  const randomBankIndex = getRandomInt(0, fullWordBank.length)
  selectedWordBank = randomBankIndex
}

const restartFields = () =>{//if replaying the game, the original arrays and variables need to be reset so that they don't carry over to the next game
  lives = 6
  gameOver = false
  usedLetters = []
  guessWord = []

  for(let i = 0; i < selectedWord.length; i++){
    guessWord[i] = "_"
  }
  while(turnsCounterDiv.hasChildNodes()){
    turnsCounterDiv.removeChild(turnsCounterDiv.firstChild)
  }
  while(winnerDivElement.hasChildNodes()){
    winnerDivElement.removeChild(winnerDivElement.firstChild)
  }
  resetFeedBackDisplay()

}

const replay = () =>{//this prompt is used to play the game again if the user wants. 
    
      getWordArray() 
      getRandomWord(fullWordBank[selectedWordBank])
      restartFields()
      printBoard()

}

const setHangManPicture = () =>{//changes the picture depeding on how many lives the user has left
  if(lives == 6){
    hangManPictreElement.src ="./Images/Hangman-0.png"
  }
  else if(lives == 5){
    hangManPictreElement.src ="./Images/Hangman-1.png"
  }
  else if(lives == 4){
    hangManPictreElement.src ="./Images/Hangman-2.png"
  }
  else if(lives == 3){
    hangManPictreElement.src ="./Images/Hangman-3.png"
  }
  else if(lives == 2){
    hangManPictreElement.src ="./Images/Hangman-4.png"
  }
  else if(lives == 1){
    hangManPictreElement.src ="./Images/Hangman-5.png"
  }
  else if(lives == 0){
    hangManPictreElement.src ="./Images/Hangman-6.png"
  }
}

const setLivesCounter = ()=>{//displays how many lives the user has left in the DOM. 
  
  while(turnsCounterDiv.hasChildNodes()){
    turnsCounterDiv.removeChild(turnsCounterDiv.firstChild)
  }
  const turnsCounterElement = document.createElement('span')
  const turnsText = document.createTextNode('Lives left: ' + lives)
  turnsCounterElement.appendChild(turnsText)
  turnsCounterDiv.appendChild(turnsCounterElement)
}

const printBoard = () =>{//displays the word in progress, the hang man picture and lives counter
  const wordDisplayElement = document.getElementById('word')
  setHangManPicture()
  setLivesCounter()

  while(wordDisplayElement.hasChildNodes()){
    wordDisplayElement.removeChild(wordDisplayElement.firstChild)
  }

  for(let i = 0; i < selectedWord.length; i++){
    const letterSpaceElement = document.createElement('span')
    document.getElementById("word").className = "word-class"
    let letterSpaceValue = document.createTextNode(guessWord[i])
    letterSpaceElement.appendChild(letterSpaceValue)
    wordDisplayElement.appendChild(letterSpaceElement)
  }
}

const setFeedBackDisplay = (text) => {//displays a message depending if the letter is valid, used already, correct or incorrect
  resetFeedBackDisplay()
  const feedBackElement = document.createElement('span')
  feedBackElement.appendChild(text)
  feedBackDiv.appendChild(feedBackElement)
  
}

const resetFeedBackDisplay = () =>{//removes the feedback display so that they do not stack on top of each other
  while(feedBackDiv.hasChildNodes()){
    feedBackDiv.removeChild(feedBackDiv.firstChild)
  }
}

function invalidCharacters (str){//function to check if the a string has special characters or numbers
  const forbiddenCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  const forbiddenNumbers = /\d/
  const hasSpecialCharacters = forbiddenCharacters.test(str)
  const hasNumbers = forbiddenNumbers.test(str)
  if(hasSpecialCharacters||hasNumbers){
    return true
  }
  else{
    return false
  }
  
}

const hangMan = (guess) =>{
  let upperGuess = guess.toUpperCase()
  let checkForInvalidCharacters = invalidCharacters(upperGuess)
  console.log('\n------------------------------------------\n')

  if(upperGuess.length > 1 || upperGuess.length < 1 || checkForInvalidCharacters){ // prevents the user from entering an input longer than a single character or less than a single character. also checks to make sure the guess only has letters
    let feedBackText = document.createTextNode('Not a valid guess. Try again')
    setFeedBackDisplay(feedBackText)
    console.log('Not a valid guess. Try again')
  }
  
  else if(usedLetters.includes(upperGuess)){// checks if the letter inputted has already been guessed by checking the usedLetters array. any valid guess (correct or incorrect) gets stored in usedLetters array
    let feedBackText = document.createTextNode('Already guessed that letter. Try again')
    setFeedBackDisplay(feedBackText)
    console.log('Already guessed that letter. Try again')
  }

  else if(selectedWord.includes(upperGuess)){// checks if the guess is in the selectedWord. 
     
      for(let i = 0; i < selectedWord.length; i++){//iterating through selectedWord, comparing each letter to the guessed letter
     
        if(selectedWord[i] == upperGuess){//checks if current index of selectedWord matches the guess
        guessWord[i] = upperGuess//if so, the guessed letter gets added to guessWord array, matching the same index in selectedWord
        usedLetters.push(upperGuess)//guessed letter getting added to usedLetters array
        }
      
      }
      let feedBackText = document.createTextNode('Good guess! Keep going!')
      setFeedBackDisplay(feedBackText)
      console.log("Good guess! Keep going!")
    }

  else{
      usedLetters.push(upperGuess)//incorrect guess, still gets added to usedLetters so that we don't decrease lives if the same letter was guessed again
      let feedBackText = document.createTextNode('Wrong guess! Try again!')
      setFeedBackDisplay(feedBackText)
      console.log('Wrong guess! Try again!')
      lives--

  }
  
    
}

const winOrLose = (text) =>{//displays if the user gets the correct word or runs out of lives
  
  const winnerTextElement = document.createElement('span')
  winnerTextElement.appendChild(text)
  winnerDivElement.appendChild(winnerTextElement)
}


const submitLetter = () =>  { // initial function to start the game. I recommend having a start button to call this function so that the game doesn't start immediately when the page loads. 
  
  if(!gameOver){//as long as gameOver isn't true, the game continues on
      let userGuess = document.getElementById('user-guess').value
      hangMan(userGuess);
      document.getElementById('user-guess').value = '' //resets he input field so that the user doesn't have to backspace or delete the previous letter
      printBoard()
      let correctWord = guessWord.join('')//converts guessWord array into a string with no commas

      if(correctWord == selectedWord){//conmpares correctWord to see if it matches the selectedWord. if so, the game is won
        
        let winnerText = document.createTextNode('You got the right word!')
        while(turnsCounterDiv.hasChildNodes()){
          turnsCounterDiv.removeChild(turnsCounterDiv.firstChild)
        }
        resetFeedBackDisplay()
        document.getElementById("win-or-lose-div").className = "win-text"//the div's class name changes so we can have a different style for the text if the user wins
        winOrLose(winnerText)
        console.log('You got the right word!')
        gameOver = true
      }
    
      else if(lives < 1){//runs out of lives, game ends, selectedWord is displyed

        let gameOverText = document.createTextNode('You lose! The answer was: ' + selectedWord)
        while(turnsCounterDiv.hasChildNodes()){
          turnsCounterDiv.removeChild(turnsCounterDiv.firstChild)
        }
        resetFeedBackDisplay()
        document.getElementById("win-or-lose-div").className = "lose-text"//the div's class name changes so we can have a different style for the text if the user loses
        winOrLose(gameOverText)
        console.log('You ran out of lives! The answer was: ' + selectedWord )
        gameOver = true
      }
  } 
    
}

  // getWordArray() uncomment me if you want to use all the word banks, otherwise, only the Japan theme will pop up
  getRandomWord(fullWordBank[selectedWordBank])
  printBoard()