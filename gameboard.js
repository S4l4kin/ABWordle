const gameboard = {
    letterPos: 0,
    wordRow: 0,

    createBoard: function(){
        this.addNewRow();
        let selector = '[row="'+this.wordRow+'"]';
        let newlineCollection = document.querySelectorAll(selector);
        arr = Array.prototype.slice.call( newlineCollection )
        arr.forEach(function (item, index){
            if (item.className.includes("box"))
            item.classList.add("selected");
            });
        keyboard.createKeyboard();
    },

addNewRow: function(){
        this.wordRow++
        let parentDiv = document.getElementById("lineList");
        let containerDiv = document.createElement("div");
        containerDiv.setAttribute("class", "flex-container");
        containerDiv.setAttribute("row", this.wordRow);
        parentDiv.append(containerDiv);
    
        let score = document.createElement("div");
        score.setAttribute("class", "score");
        score.innerHTML = this.wordRow;
        containerDiv.append(score);
        for(let i = 0; i < word.length; i++){
        let boxDiv = document.createElement("div");
        boxDiv.setAttribute("class", "box");
        boxDiv.setAttribute("row", this.wordRow);
        boxDiv.setAttribute("pos", i);
        boxDiv.setAttribute("style", "animation-delay:"+(i/16)+"s;" )
    
        let letter = document.createElement("p");
        letter.setAttribute("class", "letter");
        boxDiv.append(letter);
    
        containerDiv.append(boxDiv);
        }

        parentDiv.scrollTo(0, parentDiv.scrollHeight);
    },
removeRow: function(){
    let selector = '[row="'+this.wordRow+'"]';
    let selectedCollection = document.querySelector(selector);
    selectedCollection.remove();
},

    removeLetter: function(){
    if (this.letterPos <= 0) return;
    
    this.letterPos--
    let selector = '[row="'+this.wordRow+'"][pos="'+this.letterPos+'"]';
    let box = document.querySelector(selector);
    let letter = box.getElementsByClassName("letter")[0];

    letter.innerHTML="";
},

    addLetter: function(value, word){
    if (this.letterPos >= word.length) return;
  
    let selector = '[row="'+this.wordRow+'"][pos="'+this.letterPos+'"]';
    let box = document.querySelector(selector);
    let letter = box.getElementsByClassName("letter")[0];
    letter.innerHTML=value;
    this.letterPos++;
},

checkBoard: function(word, current){
        var letterAmount = {};
        word.toUpperCase().split("").forEach(function(item, index){
            if(!(item in letterAmount))
            letterAmount[item] = 1;
            else letterAmount[item]++;
        });

        for(let i = 0; i < word.length; i++){
            if(current.toUpperCase()[i] == word.toUpperCase()[i]){
            let selector = '[row="'+this.wordRow+'"][pos="'+i+'"]';
            let box = document.querySelector(selector);
            box.classList.add("correct");
            letterAmount[current.toUpperCase()[i]]--;
            }
        }
        //check for correct letters in wrong position
        for(let i = 0; i < word.length; i++){
            let selector = '[row="'+this.wordRow+'"][pos="'+i+'"]';
            let box = document.querySelector(selector);
            console.log(box.getAttribute("class").includes("correct"));
            if(word.toUpperCase().includes(current.toUpperCase()[i]) && letterAmount[current.toUpperCase()[i]] > 0 && !box.getAttribute("class").includes("correct")){
            
            box.classList.add("almost");
            letterAmount[current.toUpperCase()[i]]--;
            }
        }
        //check for incorrect letters
        for(let i = 0; i < word.length; i++){
            let selector = '[row="'+this.wordRow+'"][pos="'+i+'"]';
            let box = document.querySelector(selector);
            if(!(box.getAttribute("class").includes("correct") || box.getAttribute("class").includes("almost"))){
                box.classList.add("incorrect");
            }
        }

        //Animate the letters
        const animationList = ["bounce", "rotate", "flip"];
        const animation = animationList[Math.floor(Math.random() * animationList.length)];
        for(let i = 0; i < word.length; i++){
            let selector = '[row="'+this.wordRow+'"][pos="'+i+'"]';
            let box = document.querySelector(selector);
            
            box.classList.add(animation);
        }
            keyboard.updateKeyboard(word, current);
    },
newline: function(){
  this.letterPos = 0;


  //Remove "selected" from current class
  let selectedCollection = document.getElementsByClassName("selected");
  var arr = Array.prototype.slice.call( selectedCollection )
  arr.forEach(function (item, index){
    item.classList.remove("selected");
  });
  this.addNewRow();
  //Add "selected" class to new line
  let selector = '[row="'+this.wordRow+'"]';
  let newlineCollection = document.querySelectorAll(selector);
  arr = Array.prototype.slice.call( newlineCollection )
  arr.forEach(function (item, index){
    if (item.className.includes("box"))
      item.classList.add("selected");
    });
}
}