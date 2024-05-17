var tableLocation, imageLocation;
var currentCell; // Declaring currentCell as a global variable
var rowLocations = [];
var columnLocations = [];
var currentCellBorders; // Define currentCellBorders variable
var cellCorners = {}; // Define cellCorners variable as an object
var cellBorders = {}; // Define cellBorders variable as an object

function calculateInitialPositions() {
    tableLocation = getTableLocation();
    imageLocation = getImageLocation();

    console.log("Table Location:", tableLocation);
    console.log("Image Location:", imageLocation);
}

function calculateTableLocations() {
    var table = document.getElementById('mazeTable');
    var rows = table.rows;

    // Clear previous data
    rowLocations = [];
    columnLocations = [];

    // Extract row locations
    for (var i = 0; i < rows.length; i++) {
        var rect = rows[i].getBoundingClientRect();
        rowLocations.push(Math.floor(rect.top));
    }

    // Extract column locations
    var cells = table.rows[0].cells; // Assuming all rows have the same number of cells
    for (var j = 0; j < cells.length; j++) {
        var rect = cells[j].getBoundingClientRect();
        columnLocations.push(Math.floor(rect.left));
    }

    console.log("Row Locations:", rowLocations);
    console.log("Column Locations:", columnLocations);
}

function getCornerCoordinates(cellId) {
    var cell = document.getElementById(cellId);
    var rect = cell.getBoundingClientRect();
    var corners = {
        topLeft: { x: Math.floor(rect.left), y: Math.floor(rect.top) },
        topRight: { x: Math.floor(rect.right), y: Math.floor(rect.top) },
        bottomLeft: { x: Math.floor(rect.left), y: Math.floor(rect.bottom) },
        bottomRight: { x: Math.floor(rect.right), y: Math.floor(rect.bottom) }
    };
    return corners;
}

function getTableLocation() {
    var table = document.getElementById('mazeTable');
    var rect = table.getBoundingClientRect();
    var location = {
        topLeft: { x: Math.floor(rect.left), y: Math.floor(rect.top) },
        topRight: { x: Math.floor(rect.right), y: Math.floor(rect.top) },
        bottomLeft: { x: Math.floor(rect.left), y: Math.floor(rect.bottom) },
        bottomRight: { x: Math.floor(rect.right), y: Math.floor(rect.bottom) }
    };
    return location;
}

function getImageLocation() {
    var image = document.getElementById('startImage');
    var rect = image.getBoundingClientRect();
    var location = {
        top: Math.floor(rect.top),
        left: Math.floor(rect.left),
        bottom: Math.floor(rect.bottom),
        right: Math.floor(rect.right)
    };
    return location;
}
var Cellnum, cellchecker = 0;
function moveImage(event) {

    console.clear();
    console.log("Key pressed:", event.key);
    var image = document.getElementById('startImage');
    var rect = image.getBoundingClientRect();
    currentCell = findCurrentCell(imageLocation);
    imageLocation = getImageLocation();
    currentCellBorders = findCellBorders(currentCell);
    var newPosition = { x: rect.left, y: rect.top };

    for (let x = 1; x <= 900; x++) {
        if (currentCell === ("cell" + x)) {
            Cellnum = x;
            break;
        } else {
            Cellnum = 0;
        }
    }


    if (currentCell === "none") {
        if (newPosition.y <= tableLocation.topLeft.y && (newPosition.y + 12) >= tableLocation.topLeft.y) {
            switch (event.key) {
                case 'w':
                case 'W':
                    console.log("Moving up");
                    newPosition.y -= 1;
                    for (let x = 0; x < 30; x++) {
                        if (newPosition.y === rowLocations[x] || newPosition.y === tableLocation.topRight.y) {
                            newPosition.y += 1;
                            break;
                        }
                    }
                    break;
                case 's':
                case 'S':
                    console.log("Moving down");
                    newPosition.y += 1;
                    for (let x = 0; x < 30; x++) {
                        if ((newPosition.y + 12) === rowLocations[x] || (newPosition.y + 12) === tableLocation.bottomRight.y) {
                            if ((imageLocation.top + 12) === tableLocation.topLeft.y && (imageLocation.left > (tableLocation.bottomLeft.x + 406) && (imageLocation.left + 12) < (tableLocation.bottomLeft.x + 436))) {
                                break;
                            }
                            else {
                                newPosition.y -= 1;
                                break;
                            }

                        }
                    }

                    break;
                case 'a':
                case 'A':
                    console.log("Moving left");
                    newPosition.x -= 1;
                    for (let x = 0; x < 30; x++) {
                        if ((newPosition.x) === columnLocations[x] || imageLocation.left === tableLocation.bottomLeft.x) {
                            newPosition.x += 1;
                            break;

                        }
                    }
                    break;
                case 'd':
                case 'D':
                    console.log("Moving right");
                    newPosition.x += 1;
                    for (let x = 0; x < 30; x++) {
                        if ((newPosition.x + 12) === columnLocations[x] || imageLocation.right === tableLocation.bottomRight.x) {
                            newPosition.x -= 1;
                            break;
                        }
                    }
                    break;
            }
        }
        else {
            switch (event.key) {
                case 'w':
                case 'W':
                    console.log("Moving up");
                    newPosition.y -= 1;
                    if (imageLocation.top === tableLocation.bottomLeft.y && imageLocation.left > tableLocation.bottomLeft.x && (imageLocation.left + 12) < tableLocation.bottomRight.x) {
                        newPosition.y += 1;
                    }
                    break;
                case 's':
                case 'S':
                    console.log("Moving down");
                    newPosition.y += 1;
                    console.log((tableLocation.bottomLeft.x + 380) + " " + (tableLocation.bottomLeft.x + 405))
                    if ((imageLocation.top + 12) === tableLocation.topLeft.y && (imageLocation.left > (tableLocation.bottomLeft.x + 406) && (imageLocation.left + 12) < (tableLocation.bottomLeft.x + 436))) {
                        console.log("hehehehe")
                    }
                    else if ((imageLocation.top + 12) === tableLocation.topLeft.y && imageLocation.left > tableLocation.bottomLeft.x && (imageLocation.left + 12) < tableLocation.bottomRight.x) {
                        newPosition.y -= 1;
                    }
                    break;
                case 'a':
                case 'A':
                    console.log("Moving left");
                    newPosition.x -= 1;
                    if ((imageLocation.left) === tableLocation.topRight.x && imageLocation.top > tableLocation.topRight.y && (imageLocation.top + 12) < tableLocation.bottomRight.y) {
                        newPosition.x += 1;
                    }
                    break;
                case 'd':
                case 'D':
                    console.log("Moving right");
                    newPosition.x += 1;
                    if ((imageLocation.left + 12) === tableLocation.topLeft.x && imageLocation.top > (tableLocation.topLeft.y + 30) && (imageLocation.top + 12) < tableLocation.bottomRight.y) {
                        newPosition.x -= 1;
                    }
                    break;
            }
        }
    }
    else {
        // left rightg
        if (imageLocation.top <= rowLocations[0] && imageLocation.bottom >= rowLocations[0] ||
            imageLocation.top <= rowLocations[1] && imageLocation.bottom >= rowLocations[1] ||
            imageLocation.top <= rowLocations[2] && imageLocation.bottom >= rowLocations[2] ||
            imageLocation.top <= rowLocations[3] && imageLocation.bottom >= rowLocations[3] ||
            imageLocation.top <= rowLocations[4] && imageLocation.bottom >= rowLocations[4] ||
            imageLocation.top <= rowLocations[5] && imageLocation.bottom >= rowLocations[5] ||
            imageLocation.top <= rowLocations[6] && imageLocation.bottom >= rowLocations[6] ||
            imageLocation.top <= rowLocations[7] && imageLocation.bottom >= rowLocations[7] ||
            imageLocation.top <= rowLocations[8] && imageLocation.bottom >= rowLocations[8] ||
            imageLocation.top <= rowLocations[9] && imageLocation.bottom >= rowLocations[9] ||
            imageLocation.top <= rowLocations[10] && imageLocation.bottom >= rowLocations[10] ||
            imageLocation.top <= rowLocations[11] && imageLocation.bottom >= rowLocations[11] ||
            imageLocation.top <= rowLocations[12] && imageLocation.bottom >= rowLocations[12] ||
            imageLocation.top <= rowLocations[13] && imageLocation.bottom >= rowLocations[13] ||
            imageLocation.top <= rowLocations[14] && imageLocation.bottom >= rowLocations[14] ||
            imageLocation.top <= rowLocations[15] && imageLocation.bottom >= rowLocations[15] ||
            imageLocation.top <= rowLocations[16] && imageLocation.bottom >= rowLocations[16] ||
            imageLocation.top <= rowLocations[17] && imageLocation.bottom >= rowLocations[17] ||
            imageLocation.top <= rowLocations[18] && imageLocation.bottom >= rowLocations[18] ||
            imageLocation.top <= rowLocations[19] && imageLocation.bottom >= rowLocations[19] ||
            imageLocation.top <= rowLocations[20] && imageLocation.bottom >= rowLocations[20] ||
            imageLocation.top <= rowLocations[21] && imageLocation.bottom >= rowLocations[21] ||
            imageLocation.top <= rowLocations[22] && imageLocation.bottom >= rowLocations[22] ||
            imageLocation.top <= rowLocations[23] && imageLocation.bottom >= rowLocations[23] ||
            imageLocation.top <= rowLocations[24] && imageLocation.bottom >= rowLocations[24] ||
            imageLocation.top <= rowLocations[25] && imageLocation.bottom >= rowLocations[25] ||
            imageLocation.top <= rowLocations[26] && imageLocation.bottom >= rowLocations[26] ||
            imageLocation.top <= rowLocations[27] && imageLocation.bottom >= rowLocations[27] ||
            imageLocation.top <= rowLocations[28] && imageLocation.bottom >= rowLocations[28] ||
            imageLocation.top <= rowLocations[29] && imageLocation.bottom >= rowLocations[29]
        ) {
            switch (event.key) {
                case 'w':
                case 'W':
                    console.log("Moving up");
                    newPosition.y -= 1;
                    break;
                case 's':
                case 'S':
                    console.log("Moving down");
                    newPosition.y += 1;
                    break;
                case 'a':
                case 'A':
                    console.log("Moving left");
                    newPosition.x -= 1;
                    for (let x = 0; x < 30; x++) {
                        if ((newPosition.x) === columnLocations[x] || imageLocation.left === tableLocation.bottomLeft.x) {
                            newPosition.x += 1;
                            break;
                        }
                    }
                    break;
                case 'd':
                case 'D':
                    console.log("Moving right");
                    newPosition.x += 1;
                    for (let x = 0; x < 30; x++) {
                        if ((newPosition.x + 12) === columnLocations[x] || imageLocation.right === tableLocation.bottomRight.x) {
                            newPosition.x -= 1;
                            break;
                        }
                    }
                    break;
            }
        }
        //up down
        else if (imageLocation.left <= columnLocations[0] && imageLocation.right >= columnLocations[0] ||
            imageLocation.left <= columnLocations[1] && imageLocation.right >= columnLocations[1] ||
            imageLocation.left <= columnLocations[2] && imageLocation.right >= columnLocations[2] ||
            imageLocation.left <= columnLocations[3] && imageLocation.right >= columnLocations[3] ||
            imageLocation.left <= columnLocations[4] && imageLocation.right >= columnLocations[4] ||
            imageLocation.left <= columnLocations[5] && imageLocation.right >= columnLocations[5] ||
            imageLocation.left <= columnLocations[6] && imageLocation.right >= columnLocations[6] ||
            imageLocation.left <= columnLocations[7] && imageLocation.right >= columnLocations[7] ||
            imageLocation.left <= columnLocations[8] && imageLocation.right >= columnLocations[8] ||
            imageLocation.left <= columnLocations[9] && imageLocation.right >= columnLocations[9] ||
            imageLocation.left <= columnLocations[10] && imageLocation.right >= columnLocations[10] ||
            imageLocation.left <= columnLocations[11] && imageLocation.right >= columnLocations[11] ||
            imageLocation.left <= columnLocations[12] && imageLocation.right >= columnLocations[12] ||
            imageLocation.left <= columnLocations[13] && imageLocation.right >= columnLocations[13] ||
            imageLocation.left <= columnLocations[14] && imageLocation.right >= columnLocations[14] ||
            imageLocation.left <= columnLocations[15] && imageLocation.right >= columnLocations[15] ||
            imageLocation.left <= columnLocations[16] && imageLocation.right >= columnLocations[16] ||
            imageLocation.left <= columnLocations[17] && imageLocation.right >= columnLocations[17] ||
            imageLocation.left <= columnLocations[18] && imageLocation.right >= columnLocations[18] ||
            imageLocation.left <= columnLocations[19] && imageLocation.right >= columnLocations[19] ||
            imageLocation.left <= columnLocations[20] && imageLocation.right >= columnLocations[20] ||
            imageLocation.left <= columnLocations[21] && imageLocation.right >= columnLocations[21] ||
            imageLocation.left <= columnLocations[22] && imageLocation.right >= columnLocations[22] ||
            imageLocation.left <= columnLocations[23] && imageLocation.right >= columnLocations[23] ||
            imageLocation.left <= columnLocations[24] && imageLocation.right >= columnLocations[24] ||
            imageLocation.left <= columnLocations[25] && imageLocation.right >= columnLocations[25] ||
            imageLocation.left <= columnLocations[26] && imageLocation.right >= columnLocations[26] ||
            imageLocation.left <= columnLocations[27] && imageLocation.right >= columnLocations[27] ||
            imageLocation.left <= columnLocations[28] && imageLocation.right >= columnLocations[28] ||
            imageLocation.left <= columnLocations[29] && imageLocation.right >= columnLocations[29]

        ) {
            switch (event.key) {
                case 'w':
                case 'W':
                    console.log("Moving up");
                    newPosition.y -= 1;
                    for (let x = 0; x < 30; x++) {
                        if (newPosition.y === rowLocations[x] || newPosition.y === tableLocation.topRight.y) {
                            newPosition.y += 1;
                            break;
                        }
                    }
                    break;
                case 's':
                case 'S':
                    console.log("Moving down");
                    newPosition.y += 1;
                    for (let x = 0; x < 30; x++) {
                        if ((newPosition.y + 12) === rowLocations[x] || (newPosition.y + 12) === tableLocation.bottomRight.y) {
                            newPosition.y -= 1;
                            break;
                        }
                    }
                    break;
                case 'a':
                case 'A':
                    console.log("Moving left");
                    newPosition.x -= 1;
                    break;
                case 'd':
                case 'D':
                    console.log("Moving right");
                    newPosition.x += 1;
                    break;
            }
        }
        else if (currentCell !== "none") {
            console.log("")
            switch (event.key) {
                case 'w':
                case 'W':
                    newPosition.y -= 1;
                    if (currentCellBorders.top !== "none") {
                        for (let x = 0; x < 30; x++) {
                            if (newPosition.y === rowLocations[x] || newPosition.y === tableLocation.topRight.y) {
                                newPosition.y += 1;
                                break;
                            }
                        }

                    }
                    break;
                case 's':
                case 'S':
                    newPosition.y += 1;
                    if (currentCellBorders.bottom !== "none") {
                        for (let x = 0; x < 30; x++) {
                            if ((newPosition.y + 12) === rowLocations[x] || (newPosition.y + 12) === tableLocation.bottomRight.y) {
                                newPosition.y -= 1;
                                break;
                            }
                        }

                    }
                    break;
                case 'a':
                case 'A':
                    newPosition.x -= 1;
                    if (currentCellBorders.left !== "none") {
                        for (let x = 0; x < 30; x++) {
                            if (newPosition.x === columnLocations[x] || imageLocation.left === tableLocation.bottomLeft.x) {
                                newPosition.x += 1;
                                break;
                            }
                        }
                    }
                    break;
                case 'd':
                case 'D':
                    newPosition.x += 1;
                    if (currentCellBorders.right !== "none") {
                        for (let x = 0; x < 30; x++) {
                            if ((newPosition.x + 12) === columnLocations[x] || imageLocation.right === tableLocation.bottomRight.x) {
                                newPosition.x -= 1;
                                break;
                            }
                        }
                    }
                    break;
            }
        }
    }
    console.log(Cellnum)
    console.log("New position:", newPosition);
    console.log("Table Location:", tableLocation);
    image.style.left = newPosition.x + 'px';
    image.style.top = newPosition.y + 'px'; // Update image location
    console.log("Image Location:", imageLocation);
    console.log("Current Cell:", currentCell);

    for (var i = 1; i <= 25; i++) {
        var cellId = 'cell' + i;
        cellCorners[cellId] = getCornerCoordinates(cellId);
    }
    console.log("Cell Corners:", cellCorners);
    interactionChecker();
}

function interactionChecker()
{
    var image = document.getElementById("cell" + Cellnum).style.backgroundImage;
    console.log(image);
        if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/6.png")' && cellchecker === 0) {
            alert("TRAP");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/5.png")' && cellchecker === 0) {
            alert("HEALTH POTION");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/4.png")' && cellchecker === 0) {
            alert("STRENGTH POTION");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/3.png")' && cellchecker === 0) {
            alert("EXCALIBUR");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/7.png")' && cellchecker === 0) {
            alert("KEY");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/2.png")' && cellchecker === 0) {
            alert("DOOR");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === "") {
            cellchecker = 0;
        }
}

function findCurrentCell(imageLocation) {
    if (
        imageLocation.left < tableLocation.left ||
        imageLocation.left > tableLocation.right ||
        imageLocation.top < tableLocation.top ||
        imageLocation.top > tableLocation.bottom
    ) {
        return "none";
    }
    for (var cellId in cellCorners) {
        var corners = cellCorners[cellId];
        if (
            imageLocation.left >= corners.topLeft.x &&
            imageLocation.left <= corners.topRight.x &&
            imageLocation.top >= corners.topLeft.y &&
            imageLocation.top <= corners.bottomLeft.y &&
            imageLocation.left < corners.bottomRight.x &&
            imageLocation.top < corners.bottomRight.y
        ) {
            return cellId;
        }
    }
    return "none";
}

function findCellBorders(cellId) {
    var cell = document.getElementById(cellId);
    if (!cell) {
        console.error("Cell element not found:", cellId);
        return null;
    }
    var borders = {
        top: cell.style.borderTop,
        bottom: cell.style.borderBottom,
        left: cell.style.borderLeft,
        right: cell.style.borderRight
    };
    return borders;
}

document.addEventListener('DOMContentLoaded', function () {
    calculateInitialPositions();
    calculateTableLocations();
    var tableCorners = getTableLocation();
    console.log("Table Corner Coordinates:", tableCorners);

    // Initialize cellCorners with data for all cell IDs
    for (var i = 1; i <= 900; i++) {
        var cellId = 'cell' + i;
        cellCorners[cellId] = getCornerCoordinates(cellId);
    }
    console.log("Cell Corners:", cellCorners);
});

document.body.addEventListener('keydown', moveImage);

// Focus the document to ensure it receives key events
document.body.focus();