let word = "";
var current = "";


window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    word = atob(urlParams.get('word'));
    console.log(word);
    gameboard.createBoard();
    gameboard.resize();
};

function encrypt(word){
  return btoa(word);
}


document.addEventListener('keydown', function(event) {
  if(event.keyCode == 13) {
    checkWord();
  } else if(event.keyCode == 8){
    removeLetter();
  } else if(event.keyCode <= 90 && event.keyCode >= 65){
    let letter = String.fromCharCode(97 + (event.keyCode-65)).toUpperCase();
    addLetter(letter);
  }
});



function addLetter(value){
    if (current.length >= word.length) return;
    current += value;
    gameboard.addLetter(value, word);
    
  }
  function removeLetter(){
    if (current.length <= 0) return;
    current = current.slice(0,-1);
    gameboard.removeLetter()
  }
  
  function checkWord(){
    if (current.length < word.length){
      console.log("too short");
      return;
    }
    console.log("checkword");
  
    //Checking Logic
    var correct = 0;
    for(let i = 0; i < word.length; i++){
      if(current.toUpperCase()[i] == word.toUpperCase()[i]){
        correct++;
      }
    }
  
    gameboard.checkBoard(word, current);
  
  
    //Check if won
    let victory = false;
    if(correct == word.length){
      alert("YOU WON");
      victory = true;
    }
    //Start a new line
    current = "";
    if(!victory)
      gameboard.newline();
  }