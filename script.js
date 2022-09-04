

const X_CLASS = 'x'
const Circle_class = 'circle'
const winningTextMessage = document.querySelector('[data-winning-message-text]')
const cellElements  = document.querySelectorAll('[data-cell]');
const board  = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage')
const restart = document.getElementById('restartButton')
const winninCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

]
let circleTurn;

restart.addEventListener('click',() => {
    startGame();

})

startGame()

function startGame(){
    circleTurn = false
    
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(Circle_class)
        cell.addEventListener('click', handleClick , {once: true});
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
   
}


function handleClick(e){
    const cell = e.target;
    const currentClasss = circleTurn ? Circle_class : X_CLASS;
    placemark(cell, currentClasss);
    //checkwin
    if(checkWin(currentClasss)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns();
        setBoardHoverClass()
    }
    
}

function placemark(cell, currentClasss){
    cell.classList.add(currentClasss)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(Circle_class);
    if(circleTurn){
        board.classList.add(Circle_class)
    }else{
        board.classList.add(X_CLASS)

    }

}

function checkWin(currentClasss){
    return winninCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClasss);
        })
    })
}

function endGame(draw){
    if(draw){
        winningTextMessage.innerText = 'Draw'
    }else{
        winningTextMessage.innerText = `${circleTurn ? "o's" : "X's"} Wins`
    }
    winningMessage.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        cell.classList.contains(X_CLASS) || cell.classList.contains(Circle_class)
    })
}