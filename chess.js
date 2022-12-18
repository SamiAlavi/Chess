// @ts-check

const chessBoardLength = 8;
const CLASS_POSSIBLE_MOVE = "possible-move";
const TIMEOUT_REMOVE_CLASS = 0;
const tower = "♜";
const knight = "♞";
const bishop = "♝";
const pieces = [tower, bishop, knight];
let selectedPiece = null;

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
        if (selectedPiece?.id === cell.id) {
            selectedPiece = null;
            removePossibleMoveClass();
            return;
        }

        if (cellContent === tower) {
            selectedPiece = cell;
            addTowerFunctionality(cell, rowIndex, colIndex);
        }
        else if (cellContent === knight) {
            selectedPiece = cell;
            addKnightFunctionality(cell, rowIndex, colIndex);
        }
        else if (cellContent === bishop) {
            selectedPiece = cell;
            addBishopFunctionality(cell, rowIndex, colIndex);
        }
        else {
            emptyCellFunctionality(cell, rowIndex, colIndex);
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
    }, TIMEOUT_REMOVE_CLASS);
}

function getTowerPossibleMoves(rowIndex, colIndex) {
    const possibleMoves = [];
    const temp = [1, -1];

    temp.forEach((mul) => {
        for (let index = rowIndex+mul; index >= 0; index+=mul) {
            if (!checkPossibleMove(possibleMoves, index, colIndex)) {
                break;
            }
        }
    });

    temp.forEach((mul) => {
        for (let index = colIndex+mul; index >= 0; index+=mul) {
            if (!checkPossibleMove(possibleMoves, rowIndex, index)) {
                break;
            }
        }
    });
    
    return possibleMoves;
}

function checkPossibleMove(possibleMoves, rowIndex, colIndex) {
    const cellId = getCellId(rowIndex, colIndex);
    let cell = document.getElementById(cellId);
    if (cell?.textContent !== "") {
        return false;
    }
    possibleMoves.push(cellId);
    return true;
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
    const diff = 2;

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
    }, TIMEOUT_REMOVE_CLASS);
}

function addBishopFunctionality(bishop, rowIndex, colIndex) {
    removePossibleMoveClass();
    setTimeout(() => {
        const possibleMoves = getBishopPossibleMoves(rowIndex, colIndex);
        addPossibleMovesClass(possibleMoves);
    }, TIMEOUT_REMOVE_CLASS);
}

function emptyCellFunctionality(cell, rowIndex, colIndex) {
    if (selectedPiece && cell.classList.contains(CLASS_POSSIBLE_MOVE)) {
        cell.textContent = selectedPiece.textContent;
        selectedPiece.textContent = "";
        selectedPiece = null;
    }
    removePossibleMoveClass();
}