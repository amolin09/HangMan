
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
let turns = 6// amount of tries the user has. decreases for every incorrect letter guessed. once it reaches 0, the game ends
let gameOver = false//determines if the game is over either by winning or losing. prevents user from continuing to guess after the game is over. streamlines UX

const hangManPictreElement = document.getElementById('hang-man-lives')
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

const getWordArray = () =>{
  const randomBankIndex = getRandomInt(0, fullWordBank.length)
  selectedWordBank = randomBankIndex
}

const restartFields = () =>{//if replaying the game, the original arrays and variables need to be reset so that they don't carry over to the next game
  turns = 6
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

const replay = () =>{//this prompt is used to play the game again if the user wants. I had to call this twice so I thought it would look cleaner with all functions called in a single function
    
      getWordArray() 
      getRandomWord(fullWordBank[selectedWordBank])
      restartFields()
      printBoard()

}

const setHangManPicture = () =>{
  if(turns == 6){
    hangManPictreElement.src ="./Images/Hangman-0.png"
  }
  else if(turns == 5){
    hangManPictreElement.src ="./Images/Hangman-1.jpg"
  }
  else if(turns == 4){
    hangManPictreElement.src ="./Images/Hangman-2.jpg"
  }
  else if(turns == 3){
    hangManPictreElement.src ="./Images/Hangman-3.jpg"
  }
  else if(turns == 2){
    hangManPictreElement.src ="./Images/Hangman-4.jpg"
  }
  else if(turns == 1){
    hangManPictreElement.src ="./Images/Hangman-5.jpg"
  }
  else if(turns == 0){
    hangManPictreElement.src ="./Images/Hangman-6.jpg"
  }
}

const setTurnsCounter = ()=>{
  
  while(turnsCounterDiv.hasChildNodes()){
    turnsCounterDiv.removeChild(turnsCounterDiv.firstChild)
  }
  const turnsCounterElement = document.createElement('span')
  const turnsText = document.createTextNode('Turns left: ' + turns)
  turnsCounterElement.appendChild(turnsText)
  turnsCounterDiv.appendChild(turnsCounterElement)
}

const printBoard = () =>{// prints out the board on terminal, not needed when we switch to DOM
  document.getElementById('user-guess').value = ''
  const wordDisplayElement = document.getElementById('word')
  setHangManPicture()
  setTurnsCounter()

  while(wordDisplayElement.hasChildNodes()){
    wordDisplayElement.removeChild(wordDisplayElement.firstChild)
  }

  for(let i = 0; i < selectedWord.length; i++){
    const letterSpaceElement = document.createElement('span')
    let letterSpaceValue = document.createTextNode(guessWord[i])
    letterSpaceElement.appendChild(letterSpaceValue)
    wordDisplayElement.appendChild(letterSpaceElement)
  }
}

const setFeedBackDisplay = (text) => {
  resetFeedBackDisplay()
  const feedBackElement = document.createElement('span')
  feedBackElement.appendChild(text)
  feedBackDiv.appendChild(feedBackElement)
  
}

const resetFeedBackDisplay = () =>{
  while(feedBackDiv.hasChildNodes()){
    feedBackDiv.removeChild(feedBackDiv.firstChild)
  }
}

const hangMan = (guess) =>{
  let upperGuess = guess.toUpperCase()
  console.log('\n------------------------------------------\n')

  if(upperGuess.length > 1 || upperGuess.length < 1){ // prevents the user from entering an input longer than a single character
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
      turns--

  }
  
    
}

const winOrLose = (text) =>{
  const winnerDivElement = document.getElementById('win-or-lose-div')
  const winnerTextElement = document.createElement('span')
  winnerTextElement.appendChild(text)
  winnerDivElement.appendChild(winnerTextElement)
}


const getPrompt = () =>  { // initial function to start the game. I recommend having a start button to call this function so that the game doesn't start immediately when the page loads. 
  
  if(!gameOver){//as long as gameOver isn't true, the game continues on
      let userGuess = document.getElementById('user-guess').value
      hangMan(userGuess);
      printBoard()
      let correctWord = guessWord.join('')//converts guessWord array into a string with no commas

      if(correctWord == selectedWord){//conmpares correctWord to see if it matches the selectedWord. if so, the game is won
        
        let winnerText = document.createTextNode('You got the right word!')
        while(turnsCounterDiv.hasChildNodes()){
          turnsCounterDiv.removeChild(turnsCounterDiv.firstChild)
        }
        resetFeedBackDisplay()
        winOrLose(winnerText)
        console.log('You got the right word!')
        gameOver = true
      }
    
      else if(turns < 1){//runs out of lives, game ends, selectedWord is displyed

        let gameOverText = document.createTextNode('You lose! The answer was: ' + selectedWord)
        while(turnsCounterDiv.hasChildNodes()){
          turnsCounterDiv.removeChild(turnsCounterDiv.firstChild)
        }
        resetFeedBackDisplay()
        winOrLose(gameOverText)
        console.log('You ran out of lives! The answer was: ' + selectedWord )
        gameOver = true
      }
  } 
    
}

  getWordArray()
  getRandomWord(fullWordBank[selectedWordBank])
  printBoard()