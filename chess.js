// @ts-check

const chessBoardLength = 8;
const CLASS_POSSIBLE_MOVE = "possible-move";
const tower = "♜";
const knight = "♞";
const bishop = "♝";
const pieces = [tower, bishop, knight];

createChessBoard();

function createElement(element) {
    return document.createElement(element);
}

function addClasses(element, ...classes) {
    element.classList.add(...classes);
}

function getCellId(rowIndex, colIndex) {
    return `${rowIndex},${colIndex}`;
}

function createChessBoard() {
    const table = document.getElementById("tableBody");
    if (!table) {
        return;
    }

    for (let rowIndex = 0; rowIndex < chessBoardLength; rowIndex++) {
        let row = document.createElement("tr");
        
        for (let colIndex = 0; colIndex < chessBoardLength; colIndex++) {
            row.append(createCell(rowIndex, colIndex));
        }
        table.append(row);
    }
}

function createCell(rowIndex, colIndex) {
    const cell = document.createElement("td");
    cell.id = getCellId(rowIndex, colIndex);

    if (rowIndex === 3 && colIndex < 3) {
        cell.textContent = pieces[colIndex];
    }

    addClasses(cell, "cell", "float-left");
    if ((rowIndex + colIndex - 1)%2 === 0) {
        addClasses(cell, "gray");
    }
    else {
        addClasses(cell, "white");
    }

    addCellEventListeners(cell, rowIndex, colIndex);

    return cell;
}

function addCellEventListeners(cell, rowIndex, colIndex) {
    cell.addEventListener("click", (event) => {
        const cellContent = cell.textContent;

        if (cellContent === tower) {
            addTowerFunctionality(cell, rowIndex, colIndex);
        }
        else if (cellContent === knight) {
            addKnightFunctionality(cell, rowIndex, colIndex);
        }
        else if (cellContent === bishop) {
            addBishopFunctionality(cell, rowIndex, colIndex);
        }

        console.log(cellContent);
    });
}

function removePossibleMoveClass() {
    const cells = document.getElementsByClassName(CLASS_POSSIBLE_MOVE);
    [...cells].forEach((cell) => {
        cell.classList.remove(CLASS_POSSIBLE_MOVE);
    });
}

function addPossibleMovesClass(possibleMoves) {
    possibleMoves.forEach((id) => {
        const cell = document.getElementById(id);
        if (!cell || cell.textContent !== "") {
            return;
        }
        cell.classList.add(CLASS_POSSIBLE_MOVE);
    });  
}

function addTowerFunctionality(tower, rowIndex, colIndex) {
    removePossibleMoveClass();
    setTimeout(() => {
        const possibleMoves = getTowerPossibleMoves(rowIndex, colIndex);
        addPossibleMovesClass(possibleMoves);
    }, 0);
}

function getTowerPossibleMoves(rowIndex, colIndex) {
    const possibleMoves = [];

    for (let index = 0; index < chessBoardLength; index++) {
        if (index === rowIndex) {
            continue;
        }
        possibleMoves.push(getCellId(index, colIndex));
    }
    for (let index = 0; index < chessBoardLength; index++) {
        if (index === colIndex) {
            continue;
        }
        possibleMoves.push(getCellId(rowIndex, index));
    }
    return possibleMoves;
}

function getBishopPossibleMoves(rowIndex, colIndex) {
    const possibleMoves = [];

    let diff = 1;
    while (diff <= 8) {
        possibleMoves.push(
            getCellId(rowIndex-diff, colIndex-diff),
            getCellId(rowIndex+diff, colIndex+diff),
            getCellId(rowIndex-diff, colIndex+diff),
            getCellId(rowIndex+diff, colIndex-diff),
        );
        diff+=1;
    }
    return possibleMoves;
}

function getKnightPossibleMoves(rowIndex, colIndex) {
    const possibleMoves = [];
    const temp = [1, -1];

    let diff = 1;
    while (diff <= 2) {
        possibleMoves.push(
            getCellId(rowIndex-diff, colIndex),
            getCellId(rowIndex+diff, colIndex),
            getCellId(rowIndex, colIndex-diff),
            getCellId(rowIndex, colIndex+diff),
        );
        diff+=1;
    }
    diff-=1;

    temp.forEach((mul) => {
        possibleMoves.push(
            getCellId(rowIndex-diff, colIndex-mul),
            getCellId(rowIndex+diff, colIndex-mul),
            getCellId(rowIndex-mul, colIndex-diff),
            getCellId(rowIndex-mul, colIndex+diff),
        );
    });

    return possibleMoves;
}

function addKnightFunctionality(knight, rowIndex, colIndex) {
    removePossibleMoveClass();
    setTimeout(() => {
        const possibleMoves = getKnightPossibleMoves(rowIndex, colIndex);
        addPossibleMovesClass(possibleMoves);
    }, 0);
}

function addBishopFunctionality(bishop, rowIndex, colIndex) {
    removePossibleMoveClass();
    setTimeout(() => {
        const possibleMoves = getBishopPossibleMoves(rowIndex, colIndex);
        addPossibleMovesClass(possibleMoves);
    }, 0);
}
