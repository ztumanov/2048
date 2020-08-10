let createAndAppend = function({className, parentElement, value}, tag = 'div'){
    let element = document.createElement(tag);
    element.className = className;
    if (value){
        element.innerHTML = value;
    }
    parentElement.appendChild(element);
    return element;
}

var cell = document.querySelectorAll(".cell");
var loss = false;

let getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game {
    constructor(parentElement , size = 4){
        let gameFieldElem = createAndAppend({
            className: 'game',
            parentElement
        });
        
        let headerElem = createAndAppend({
            className: 'score',
            parentElement: gameFieldElem
        });
        
        this.score = 0;

        headerElem.innerHTML = 'Score:' + this.score;

        let fieldElem = createAndAppend({
            className: 'field',
            parentElement: gameFieldElem
        });

        this.field = [];
        for(let i = 0; i < size; i++){
            this.field[i] = [];
            for(let j = 0; j < size; j++){
                this.field[i][j] = new Cell(fieldElem);
            }
        }

        window.onkeyup = function(e) {
            switch(e.keyCode) {
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight();
                    break;
            }
        }.bind(this);
        console.log(this.field);
        
    }

    spawnUnit() {
        let emptyCells = [];
        for(let i = 0; i < this.field.length; i++){
            for(let j = 0; j < this.field[i].length; j++){
                if(!this.field[i][j].value){
                    emptyCells.push(this.field[i][j]);
                }
            }
        }
        if(emptyCells.length){
            emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn();
        }else{
            alert("Ты проиграл");
        }
    }
  
    moveRight() {
    var i, j;
    var coll;
    for(i = 0; i < 4; i++) {
        for(j = 4 - 2; j >= 0; j--) {
            if(this.field[i][j].value) {
            coll = j;
                while (coll + 1 < 4) {
                    if (!this.field[i][coll + 1].value) {
                        this.field[i][coll + 1].value = this.field[i][coll].value;
                        this.field[i][coll].value = 0;
                        coll++;
                    } else if (this.field[i][coll].value == this.field[i][coll + 1].value) {
                        this.field[i][coll + 1].value *= 2;
                        this.score +=  this.field[i][coll + 1].value;
                        this.field[i][coll].value = 0;
                        break;
                    } else {
                        break;
                        }
                    }
                }
            }
        }
        var score = document.querySelector(".score").innerHTML = 'Score: '+ this.score;
        this.spawnUnit();
    }
    moveLeft() {
    var i, j;
    var coll;
    for(i = 0; i < 4; i++) {
        for(j = 1; j < 4; j++) {
            if(this.field[i][j].value) {
            coll = j;
            while (coll - 1 >= 0) {
                if (!this.field[i][coll - 1].value) {
                    this.field[i][coll - 1].value = this.field[i][coll].value;
                    this.field[i][coll].value = 0;
                    coll--;
                } else if (this.field[i][coll].value == this.field[i][coll - 1].value) {
                    this.field[i][coll - 1].value *= 2;
                    this.score += this.field[i][coll - 1].value;
                    this.field[i][coll].value = 0;
                    break;
                } else {
                    break; 
                        }
                    }
                }
            }
        }
        var score = document.querySelector(".score").innerHTML = 'Score: '+ this.score;
        this.spawnUnit();
    }

    moveUp() {
    var i, j, row;
    for(j = 0; j < 4; j++) {
        for(i = 1; i < 4; i++) {
        if(this.field[i][j].value) {
            row = i;
            while (row > 0) {
                if(!this.field[row - 1][j].value) {
                    this.field[row - 1][j].value = this.field[row][j].value;
                    this.field[row][j].value = 0;
                    row--;
                } else if (this.field[row][j].value == this.field[row - 1][j].value) {
                    this.field[row - 1][j].value *= 2;
                    this.score +=  this.field[row - 1][j].value;
                    this.field[row][j].value = 0;
                    break;
                } else {
                    break; 
                        }
                    }
                }
            }
        }
        var score = document.querySelector(".score").innerHTML = 'Score: '+ this.score;
        this.spawnUnit();
    }

    moveDown() {
    var i, j, row;
    for(j = 0; j < 4; j++) {
        for(i = 4 - 2; i >= 0; i--) {
            if(this.field[i][j].value) {
                row = i;
                while (row + 1 < 4) {
                    if (!this.field[row + 1][j].value) {
                        this.field[row + 1][j].value = this.field[row][j].value;
                        this.field[row][j].value = 0;
                        row++;
                    } else if (this.field[row][j].value == this.field[row + 1][j].value) {
                        this.field[row + 1][j].value *= 2;
                        this.score +=  this.field[row + 1][j].value;
                        this.field[row][j].value = 0;
                        break;
                    } else {
                        break; 
                        }
                    }
                }
            }
        }
        var score = document.querySelector(".score").innerHTML = 'Score: '+ this.score;
        this.spawnUnit();
    }
}
class Cell {
    constructor(fieldElem){
        this.fieldElem = fieldElem;
        this.element = createAndAppend({
            className: 'cell',
            parentElement: fieldElem
        });
        if(Math.random() > 0.8) {
            this.spawn();
            this.value = Math.random() > 0.5 ? 4 : 2;
        }
    }
    get value() {
        return this._value || 0;
    }
    set value(value) {
        this._value = value;
        
        this.element.innerHTML = value == 0 ? '' : value;
        this.element.setAttribute('numb' , value);
    }
    clear() {
        this.value = '';
    }
    spawn() {
        this.value =  Math.random() > 0.5 ? 4 : 2;
    }
}
 var game = new Game(document.body, 4);
