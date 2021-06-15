let outerBoard, grids;
const buttons = document.querySelectorAll('[button]');
const result = document.querySelector('[result]');

result.innerText = "Please choose O or X"

Array.prototype.sample = function() {
    const index = Math.floor(Math.random() * this.length)
    const element = this[index];
    return { index, element };
};

const game = (function() {
    outerBoard = document.querySelector('[board]');
    innerBoard = ["", "", "", "", "", "", "", "", ""];
    clearBoard = function() {
        grids.forEach(grid => {
            grid.classList.remove('disabled');
        });
        this.innerBoard = ["", "", "", "", "", "", "", "", ""];
    };
    createBoard = function() {
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.classList.add('grid');
            div.setAttribute('grid', i);
            outerBoard.appendChild(div);
        }
        grids = outerBoard.querySelectorAll('[grid]');
        this.clearBoard();
        this.display();
    };
    display = function() {
        let i = 0;
        grids.forEach(grid => {
            grid.innerText = this.innerBoard[i];
            i++;
        })
    };
    computerChoose = function(chosenButtonValue) {
        while (!this.checkIfSomeoneWon()) {
            let sample = this.innerBoard.sample();
            if (sample.element === "") {
                this.innerBoard[sample.index] = chosenButtonValue === "O" ? "X" : "O";
                if (chosenButtonValue === "O") {
                    if (this.checkIfDraw()) {
                        result.innerText = "Draw! Choose O or X to play again"
                    }
                }
                if (this.checkIfSomeoneWon()) {
                    result.innerText = "You Lost!";
                }
                this.display();
                return;
            }
        }
    };
    playerChoose = function(chosenButtonValue) {
        grids.forEach(grid => {
            grid.addEventListener('click', () => {
                if (!grid.innerText && !this.checkIfSomeoneWon()) {
                    grid.innerText = chosenButtonValue;
                    this.innerBoard[grid.getAttribute('grid')] = grid.innerText;
                    if (chosenButtonValue === "X") {
                        if (this.checkIfDraw()) {
                            result.innerText = "Draw! Choose O or X to play again"
                        }
                    };
                    if (this.checkIfSomeoneWon()) {
                        result.innerText = "You Won!";
                    };
                    if (!this.checkIfDraw()) {
                        this.computerChoose(chosenButtonValue);
                    }
                }
                if (this.checkIfSomeoneWon() || this.checkIfDraw()) {
                    grids.forEach(grid => {
                        grid.classList.add('disabled');
                    })
                }
            })
        })
    };
    checkIfSomeoneWon = function() {
        if (
            this.innerBoard[0] === this.innerBoard[1] && this.innerBoard[0] === this.innerBoard[2] && this.innerBoard[0] !== "" ||
            this.innerBoard[3] === this.innerBoard[4] && this.innerBoard[3] === this.innerBoard[5] && this.innerBoard[3] !== "" ||
            this.innerBoard[6] === this.innerBoard[7] && this.innerBoard[6] === this.innerBoard[8] && this.innerBoard[6] !== "" ||
            this.innerBoard[0] === this.innerBoard[3] && this.innerBoard[0] === this.innerBoard[6] && this.innerBoard[0] !== "" ||
            this.innerBoard[1] === this.innerBoard[4] && this.innerBoard[1] === this.innerBoard[7] && this.innerBoard[1] !== "" ||
            this.innerBoard[2] === this.innerBoard[5] && this.innerBoard[2] === this.innerBoard[8] && this.innerBoard[2] !== "" ||
            this.innerBoard[0] === this.innerBoard[4] && this.innerBoard[0] === this.innerBoard[8] && this.innerBoard[0] !== "" ||
            this.innerBoard[2] === this.innerBoard[4] && this.innerBoard[2] === this.innerBoard[6] && this.innerBoard[2] !== ""
        ) {
            return true
        } else {
            return false
        }
    };
    checkIfDraw = function() {
        for (let grid of this.innerBoard) {
            if (grid === "") {
                return false;
            }
        }
        return true
    };
    return {
        outerBoard,
        createBoard,
        computerChoose,
        playerChoose,
        clearBoard,
        display,
        checkIfSomeoneWon,
        checkIfDraw,
    }
})();

for (let button of buttons) {
    button.addEventListener('click', () => {
        result.innerText = `You are playing as ${button.innerText}. ${button.innerText==="X"?"You play":"Computer plays"} first.`;
        game.outerBoard.innerHTML = "";
        game.createBoard();
        if (button.innerText === "O") {
            game.computerChoose(button.innerText);
        }
        game.playerChoose(button.innerText);
    })
}