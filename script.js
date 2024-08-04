const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const winMessage = document.getElementById('winMessage');

const winneableCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]

cells.forEach(cell =>{
    cell.addEventListener('click', (cell)=>{
        if(board.classList.contains('x')){
            cell.target.classList.add('x');
        }else{
            cell.target.classList.add('o');
        }

        if(checkWin()){
            message.classList.add('show')
            winMessage.innerText += `${board.classList.contains('x') ? "X's" : "O's"} Wins!`
        }else if(checkDraw()){
            winMessage.innerText += `Draw!`
            message.classList.add('show')
        }

        if(board.classList.contains('x')){
            board.classList.remove('x')
            board.classList.add('o')
        }else{
            board.classList.add('x')
            board.classList.remove('o')
        }}, {once: true});
})

function checkWin() {
    return winneableCombinations.some(combination => {
        const firstCellClass = cells[combination[0]].classList;
        if (firstCellClass.contains('x') || firstCellClass.contains('o')) {
            const classToCheck = firstCellClass.contains('x') ? 'x' : 'o';
            return combination.every(index => {
                return cells[index].classList.contains(classToCheck);
            });
        }
        return false;
    });
}

function checkDraw(){
    return [...cells].every(cell =>{
        return cell.classList.contains('x') ||  cell.classList.contains('o')
    })
}

restartBtn.addEventListener('click', ()=>{
    window.location.reload()
})