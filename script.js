const player = function (name) {
    return {name};
}

const gameboard = () => {
    const gameArray = new Array(9);
    return {gameArray};
}

const xPlayer = player('X');
const oPlayer = player('O');
let board = gameboard().gameArray;
const boxes = document.querySelectorAll('.box');
let round = 1;

boxes.forEach(box => box.addEventListener('click', () => playGame(box)));

function playGame(box){
    let boxIndex = box.dataset.box;
    let marker = getMarker(round);
    
    if(board[boxIndex] === undefined && !checkWinner(board)){
        board.splice(boxIndex, 1, marker);
        displayBoard(box, marker);
        if(checkWinner(board) === true){
            document.querySelector('.message').textContent = `Player ${marker} has won!`;
        }
        else if(round === 9){
            document.querySelector('.message').textContent = "It's a tie!";
        }
        round++;
    }

    document.querySelector('.restart-btn').addEventListener('click', () => {
        round = 1;
        boxes.forEach(box => box.textContent = '');
        document.querySelector('.message').textContent = "Player X's turn";
        board = gameboard().gameArray;
    })
}

function getMarker(round) {
    return round % 2 === 0 ? oPlayer.name : xPlayer.name;
}

function displayBoard(box, marker) {
    const headingMessage = document.querySelector('.message');
    box.textContent = marker;
    marker === 'X' ? headingMessage.textContent = "Player O's turn" : headingMessage.textContent = "Player X's turn";
}

function checkWinner(board){
    if(board[0] === board[1] && board[0] === board[2]){
        return board[0] === undefined ? false : true;
    }
    else if(board[3] === board[4] && board[3] === board[5]){
        return board[3] === undefined ? false : true;
    }
    else if(board[6] === board[7] && board[6] === board[8]){
        return board[6] === undefined ? false : true;
    }
    else if(board[0] === board[3] && board[0] === board[6]){
        return board[0] === undefined ? false : true;
    }
    else if(board[1] === board[4] && board[1] === board[7]){
        return board[1] === undefined ? false : true;
    }
    else if(board[2] === board[5] && board[2] === board[8]){
        return board[2] === undefined ? false : true;
    }
    else if(board[0] === board[4] && board[0] === board[8]){
        return board[0] === undefined ? false : true;
    }
    else if(board[2] === board[4] && board[2] === board[6]){
        return board[2] === undefined ? false : true;
    }
    else {
        return false;
    }
}