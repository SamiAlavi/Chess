// @ts-check

const chessBoardLength = 8;
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
    cell.id = `${rowIndex},${colIndex}`;

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
    //const cell = document.createElement("td");
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
    for (let rowIndex = 0; rowIndex < chessBoardLength; rowIndex++) {        
        for (let colIndex = 0; colIndex < chessBoardLength; colIndex++) {
            const id = `${rowIndex},${colIndex}`;
            const cell = document.getElementById(id);
            cell?.classList.remove("possible-move");
        }
    }
}

function addPossibleMoveClass(rowIndex, colIndex) {
    const id = `${rowIndex},${colIndex}`;
    const cell = document.getElementById(id);
    if (!cell || cell.textContent !== "") {
        return;
    }
    cell.classList.add("possible-move");    
}

function addTowerFunctionality(tower, rowIndex, colIndex) {
    removePossibleMoveClass();
    setTimeout(() => {
        addTowerPossibleMoves(rowIndex, colIndex);
    }, 0);
}

function addTowerPossibleMoves(rowIndex, colIndex) {
    for (let index = 0; index < chessBoardLength; index++) {
        if (index === rowIndex) {
            continue;
        }
        addPossibleMoveClass(index, colIndex);
    }
    for (let index = 0; index < chessBoardLength; index++) {
        if (index === colIndex) {
            continue;
        }
        addPossibleMoveClass(rowIndex, index);
    }
}

function addBishopPossibleMoves(rowIndex, colIndex) {
    let diff = 1
    while (diff <= 8) {
        addPossibleMoveClass(rowIndex-diff, colIndex-diff);
        addPossibleMoveClass(rowIndex+diff, colIndex+diff);
        addPossibleMoveClass(rowIndex-diff, colIndex+diff);
        addPossibleMoveClass(rowIndex+diff, colIndex-diff);
        diff+=1;
    }
}

function addKnightFunctionality(knight, rowIndex, colIndex) {
}

function addBishopFunctionality(bishop, rowIndex, colIndex) {
    removePossibleMoveClass();
    setTimeout(() => {
        addBishopPossibleMoves(rowIndex, colIndex);
    }, 0);
}
