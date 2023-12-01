/*JavaScript for Fifteen Puzzle
Extra Feature: End-of_Game Notification */


"use strict"; //this activates strict mode 

//globally declared variables 
var gamePiece;
var notify;
var timer;
var spaceY;
var spaceX;

window.onload = function () {
    var puzzleArea = document.getElementById('puzzlearea');
    gamePiece = puzzleArea.getElementsByTagName('div');

    for (var i = 0; i < gamePiece.length; i++) {
        gamePiece[i].className = 'puzzlepiece';
        gamePiece[i].style.left = (i % 4 * 100) + 'px';
        gamePiece[i].style.top = (parseInt(i / 4) * 100) + 'px';
        gamePiece[i].style.backgroundPosition = '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top;

        gamePiece[i].onmouseover = function () {
            highlightMovableSquares(this);
        };

        gamePiece[i].onmouseout = function () {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
            this.style.textDecoration = "none";
        };

        gamePiece[i].onclick = function () {
            movePiecesBetween(parseInt(this.innerHTML) - 1);
            if (finish()) {
                win();
            }
        };
    }

    var shuffle = document.getElementById('shufflebutton');
    spaceX = '300px';
    spaceY = '300px';

    shuffle.onclick = function () {
        shufflePuzzle();
    };
};

function shufflePuzzle() {
    for (var i = 0; i < 300; i++) {
        var rand = parseInt(Math.random() * 100) % 4;
        if (rand === 0) {
            var temp = up(spaceX, spaceY);
            if (temp !== -1) {
                swap(temp);
            }
        } else if (rand === 1) {
            var temp = down(spaceX, spaceY);
            if (temp !== -1) {
                swap(temp);
            }
        } else if (rand === 2) {
            var temp = left(spaceX, spaceY);
            if (temp !== -1) {
                swap(temp);
            }
        } else if (rand === 3) {
            var temp = right(spaceX, spaceY);
            if (temp !== -1) {
                swap(temp);
            }
        }
    }
}

function highlightMovableSquares(piece) {
    var pieceIndex = parseInt(piece.innerHTML) - 1;
    var movableIndexes = getMovableIndexes(pieceIndex);

    for (var i = 0; i < gamePiece.length; i++) {
        if (movableIndexes.includes(i)) {
            gamePiece[i].classList.add('movable');
        }
    }
}

function getMovableIndexes(pieceIndex) {
    var indexes = [];

    var emptyRow = parseInt(spaceY) / 100;
    var emptyCol = parseInt(spaceX) / 100;

    var pieceRow = parseInt(gamePiece[pieceIndex].style.top) / 100;
    var pieceCol = parseInt(gamePiece[pieceIndex].style.left) / 100;

    if (emptyRow === pieceRow || emptyCol === pieceCol) {
        indexes = getIndexesInRowOrColumn(emptyRow, emptyCol, pieceRow, pieceCol);
    }

    return indexes;
}

function getIndexesInRowOrColumn(emptyRow, emptyCol, pieceRow, pieceCol) {
    var indexes = [];

    if (emptyRow === pieceRow) {
        for (var i = 0; i < 4; i++) {
            indexes.push(pieceRow * 4 + i);
        }
    }

    if (emptyCol === pieceCol) {
        for (var i = 0; i < 4; i++) {
            indexes.push(i * 4 + pieceCol);
        }
    }

    return indexes;
}

function movePiecesBetween(position) {
    for (var i = 0; i < gamePiece.length; i++) {
        gamePiece[i].classList.remove('movable');
    }

    swap(position);
}

function Notify() {
    notify--;
    if (notify == 0) {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundImage = "none";
        alert('Winner! ... Shuffle and Play Again');
        var para = document.getElementsByClassName('explanation');
        para[0].style.visibility = "visible";
        return;
    } else if (notify % 2) {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundImage = "url('background.jpg')";
    }
    timer = setTimeout(Notify, 200);
}

function win() {
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundImage = "url('background.jpg)";
    notify = 10;
    timer = setTimeout(Notify, 200);
    var para = document.getElementsByClassName('explanation');
    para[0].style.visibility = "hidden";
}

function finish() {
    var flag = true;
    for (var i = 0; i < gamePiece.length; i++) {
        var top = parseInt(gamePiece[i].style.top);
        var left = parseInt(gamePiece[i].style.left);
        if (left !== (i % 4 * 100) || top !== parseInt(i / 4) * 100) {
            flag = false;
            break;
        }
    }
    return flag;
}

function left(x, y) {
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if (cordX > 0) {
        for (var i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.left) + 100 === cordX && parseInt(gamePiece[i].style.top) === cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function right(x, y) {
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if (cordX < 300) {
        for (var i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.left) - 100 === cordX && parseInt(gamePiece[i].style.top) === cordY) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function up(x, y) {
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if (cordY > 0) {
        for (var i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.top) + 100 === cordY && parseInt(gamePiece[i].style.left) === cordX) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function down(x, y) {
    var cordX = parseInt(x);
    var cordY = parseInt(y);
    if (cordY < 300) {
        for (var i = 0; i < gamePiece.length; i++) {
            if (parseInt(gamePiece[i].style.top) - 100 === cordY && parseInt(gamePiece[i].style.left) === cordX) {
                return i;
            }
        }
    } else {
        return -1;
    }
}

function swap(position) {
    var temp = gamePiece[position].style.top;
    gamePiece[position].style.top = spaceY;
    spaceY = temp;

    temp = gamePiece[position].style.left;
    gamePiece[position].style.left = spaceX;
    spaceX = temp;
}