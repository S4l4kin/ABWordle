const keyboard = {
    layout: [["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Enter","Z","X","C","V","B","N","M","<-"]],
    dir : {},
    createKeyboard: function(){
        this.layout.forEach(function (item) {
            let parentDiv = document.getElementById("keyboard");
            let containerDiv = document.createElement("div");
            containerDiv.setAttribute("class", "button-container");
            parentDiv.append(containerDiv);
            item.forEach(function(item){
                let btn = document.createElement("button");
                btn.innerHTML = item;
                btn.addEventListener("click", function(){
                    if(item == "Enter")
                        checkWord();
                    else if(item == "<-")
                        removeLetter();
                    else
                        addLetter(item);
                })
                containerDiv.append(btn);
                keyboard.dir[item] = btn;
           }); 
        });
    },
    updateKeyboard: function(word, current){
        for(let i = 0; i < word.length; i++){
            let btn = this.dir[current.toUpperCase()[i]];
            if(current.toUpperCase()[i] == word.toUpperCase()[i]){
                btn.classList.remove("correct");
                btn.classList.remove("almost");
                btn.classList.add("correct");
            }
            else if (word.toUpperCase().includes(current.toUpperCase()[i]) && !btn.className.includes("correct")){
                btn.classList.add("almost");
            } else if (!(btn.className.includes("correct") || btn.className.includes("almost"))) {
                btn.classList.add("incorrect");
            }
        }
    }

}