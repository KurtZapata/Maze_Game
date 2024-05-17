var tableLocation, imageLocation;
var currentCell; 
var rowLocations = [];
var columnLocations = [];
var currentCellBorders;
var cellCorners = {};
var cellBorders = {}; 

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
        if (imageLocation.top <= tableLocation.topLeft.y && imageLocation.bottom >= tableLocation.topLeft.y) {
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
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/8.gif")' && cellchecker === 0) {
            alert("COMBAT");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/9.gif")' && cellchecker === 0) {
            alert("COMBAT");
            cellchecker = 1;
        }
        else if (document.getElementById("cell" + Cellnum).style.backgroundImage === 'url("assets/img/1.gif")' && cellchecker === 0) {
            alert("COMBAT");
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

// Para sa Combat at stat setting

/* 

var statpoints = 150;
var statused = 0;
var CskillLeft;
var CskillRight;
var Mobstats = [30, 10, 30, 30, 30];
var Mobhealth = 150 + (Mobstats[4] * 3), MobMax = Mobhealth;
var strength1 = 0, luck1 = 0, evasion1 = 0, armor1 = 0, vitality1 = 0;
var streduc = 1, arreduc = 1, mobstreduc = 1, mobarreduc = 1;
var health = 200 + (vitality1 * 15), maxhealth = health;

function load() {
    document.getElementById("submit").disabled = true;
}

function stats(stats, points) {
    if (stats === 0) {
        strength1 += points;
        statused += points;
        document.getElementById("Sstrength").innerHTML = "Strength: " + strength1;
    } else if (stats === 1) {
        luck1 += points;
        statused += points;
        document.getElementById("SLuck").innerHTML = "Luck: " + luck1;
    } else if (stats === 2) {
        evasion1 += points;
        statused += points;
        document.getElementById("Sevasion").innerHTML = "Evasion: " + evasion1;
    } else if (stats === 3) {
        dexterity1 += points;
        statused += points;
        document.getElementById("Sdexterity").innerHTML = "Dexterity: " + dexterity1;
    } else if (stats === 4) {
        vitality1 += points;
        statused += points;
        document.getElementById("Svitality").innerHTML = "Vitality: " + vitality1;
    }

    if (statused >= 100) {
        document.getElementById("submit").disabled = false;
		document.getElementById("btn_strength_plus").disabled = true;
		document.getElementById("btn_luck_plus").disabled = true;
		document.getElementById("btn_evasion_plus").disabled = true;
		document.getElementById("btn_dexterity_plus").disabled = true;
		document.getElementById("btn_vitality_plus").disabled = true;
    } else if (statused <= 0) {
        document.getElementById("submit").disabled = true;
		document.getElementById("btn_strength_minus").disabled = true;
		document.getElementById("btn_luck_minus").disabled = true;
		document.getElementById("btn_evasion_minus").disabled = true;
		document.getElementById("btn_dexterity_minus").disabled = true;
		document.getElementById("btn_vitality_minus").disabled = true;
    } else {
        document.getElementById("submit").disabled = true;
		document.getElementById("btn_strength_plus").disabled = false;
		document.getElementById("btn_luck_plus").disabled = false;
		document.getElementById("btn_evasion_plus").disabled = false;
		document.getElementById("btn_dexterity_plus").disabled = false;
		document.getElementById("btn_vitality_plus").disabled = false;
		document.getElementById("btn_strength_minus").disabled = false;
		document.getElementById("btn_luck_minus").disabled = false;
		document.getElementById("btn_evasion_minus").disabled = false;
		document.getElementById("btn_dexterity_minus").disabled = false;
		document.getElementById("btn_vitality_minus").disabled = false;
    }

}
function selectClass(className) {
    // Do something with the selected class, like store it
    console.log("Selected class: " + className);
}

function Playerstats() {
    // Do something with the player stats here, like store them or calculate something
}

function damage() {
    // Function to handle damage calculation
}

    var CskillLeft;
    var CskillRight;
    var Mobstats = [30, 10, 30, 30, 30];
    var Mobhealth = 150 + (Mobstats[4] * 3), MobMax = Mobhealth;
    var strength1 = 35, luck1 = 25, evasion1 = 10, armor1 = 15, vitality1 = 50;
    var streduc = 1, arreduc = 1, mobstreduc = 1, mobarreduc = 1;
    var health = 200 + (vitality1 * 15), maxhealth = health;

    function stats() {
      document.getElementById("Pstats1").innerHTML = "Strength: " + strength1 + " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  Luck: " + luck1;
      document.getElementById("Pstats2").innerHTML = "Evasion: " + evasion1 + " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  Armor: " + armor1;
      document.getElementById("Pstats3").innerHTML = "Vitality: " + vitality1;
      document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;

      document.getElementById("Astats1").innerHTML = "Strength: " + Mobstats[0] + " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  Luck: " + Mobstats[1];
      document.getElementById("Astats2").innerHTML = "Evasion: " + Mobstats[2] + " &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  Armor: " + Mobstats[3];
      document.getElementById("Astats3").innerHTML = "Vitality: " + Mobstats[4];
      document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;


      document.getElementById("PPattack1").innerHTML = '<input type="radio" name="left-option" id="Pattack1">' + PskillName[CharacterChoice][0];
      document.getElementById("PPattack2").innerHTML = '<input type="radio" name="left-option" id="Pattack2">' + PskillName[CharacterChoice][1];
      document.getElementById("PPattack3").innerHTML = '<input type="radio" name="left-option" id="Pattack3">' + PskillName[CharacterChoice][2];
      document.getElementById("PPattack4").innerHTML = '<input type="radio" name="left-option" id="Pattack4">' + PskillName[CharacterChoice][3];

      document.getElementById("Cattack1").innerHTML = AskillName[enemyChoice][0];
      document.getElementById("Cattack2").innerHTML = AskillName[enemyChoice][1];
      document.getElementById("Cattack3").innerHTML = AskillName[enemyChoice][2];
      document.getElementById("Cattack4").innerHTML = AskillName[enemyChoice][3];


      document.getElementById("right").src = "rogue.gif";
      document.getElementById("left").src = "rogue.gif";
    }

    function NselectSkill(x) {
      CskillRight = x;
    }

    var PskillName = [["slash", "Shield Bash", "Whirlwind Strike", "Earthshaker Slam"],
    ["Quick Thrust", "Shield Bash", "Venomous Blade", "Death's Embrace"],
    ["Arrow Shot", "Multi-Shot", "Piercing Shot", "Rain of Arrows"]]

    var AskillName = [["Stab", "Shield Bash", "Acid Bomb", "Goblin Rush"],
    ["Piercing Arrow", "Quick Shot", "Poison Tip", "Volley of Arrows"],
    ["Dagger Stab", "Sneak Attack", "Toxic Blade", "Shadow Ambush"]]

    var CharacterChoice = 1, enemyChoice = 1;
    function selectSkill(side) {
      if (side === 'left') {
        if (document.getElementById("Pattack1").checked) { CskillLeft = 1; }
        else if (document.getElementById("Pattack2").checked) { CskillLeft = 2; }
        else if (document.getElementById("Pattack3").checked) { CskillLeft = 3; }
        else if (document.getElementById("Pattack4").checked) { CskillLeft = 4; }
        else { document.getElementById("outputLeft").innerHTML = "Please Select A Skill"; }
      }
    }
    function showSkillDescription(side) {
      if (side === 'left') {
        document.getElementById("outputLeft").innerHTML = "";
        if (CskillLeft === 1) { document.getElementById("outputLeft").innerHTML = PskillName[CharacterChoice][0]; }
        else if (CskillLeft === 2) { document.getElementById("outputLeft").innerHTML =  PskillName[CharacterChoice][1]; }
        else if (CskillLeft === 3) { document.getElementById("outputLeft").innerHTML =  PskillName[CharacterChoice][2]; }
        else if (CskillLeft === 4) { document.getElementById("outputLeft").innerHTML =  PskillName[CharacterChoice][3]; }
      } else if (side === 'right') {
        document.getElementById("outputRight").innerHTML = "";
        if (CskillRight === 1) { document.getElementById("outputRight").innerHTML =  AskillName[enemyChoice][0]; }
        else if (CskillRight === 2) { document.getElementById("outputRight").innerHTML =  AskillName[enemyChoice][1]; }
        else if (CskillRight === 3) { document.getElementById("outputRight").innerHTML =  AskillName[enemyChoice][2]; }
        else if (CskillRight === 4) { document.getElementById("outputRight").innerHTML =  AskillName[enemyChoice][3]; }
      }
    }

    function checkhealth() {
      if (health <= 0)
      {
        alert('PATAHY KANA HEHEHEHE');
      }
      else if (Mobhealth <= 0)
      {
        alert('Panalo pa hayop');
      }
    }
    function attack(side) {
      if (side === 'left') {
        PlayerWarrior();
      }
      console.log(AIattackCounter % 4);
      AIattackAssassin();
      checkhealth();
    }

    function PlayerWarrior() {
      document.getElementById("outputLeft").innerHTML = "";
      if (CskillLeft === 1) {
        if ((Math.floor(Math.random() * 100) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((15 + (3.5 * strength1)) * (Mobstats[3] / 100)) * 1.5);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Slash <br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((15 + (3.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Slash <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 2) {
        if ((Math.floor(Math.random() * 100) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((10 + (3.5 * strength1)) * (Mobstats[3] / 100)) * 1.5);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Shield Bash <br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((10 + (3.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Shield Bash <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 3) {
        if ((Math.floor(Math.random() * 200) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((30 + (4.5 * strength1)) * (Mobstats[3] / 100)) * 1.6);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Whirlwind Strike <br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((30 + (4.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Whirlwind Strike <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 4) {
        if ((Math.floor(Math.random() * 100) + 1) >= 50) {
          var damage = parseInt(((40 + ((6 * strength1)) * (Mobstats[3] / 100))) * 1.8);
          Mobhealth -= damage;
          document.getElementById("outputLeft").innerHTML = "Earthshaker Slam: <br> Critical Damage Dealt: " + damage;
          document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
        }
        else {
          var damage = parseInt((40 + (5 * strength1)) * (Mobstats[3] / 100));
          Mobhealth -= damage;
          document.getElementById("outputLeft").innerHTML = "Earthshaker Slam: <br> Damage Dealt: " + damage;
          document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
        }
      }
      else {
        document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
      }
    }

    function PlayerAssassin() {
      document.getElementById("outputLeft").innerHTML = "";
      if (CskillLeft === 1) {
        if ((Math.floor(Math.random() * 100) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((10 + (4 * strength1)) * (Mobstats[3] / 100)) * 1.5);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Quick Thrust<br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((10 + (4 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Quick Thrust <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 2) {
        if ((Math.floor(Math.random() * 100) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((10 + (4.5 * strength1)) * (Mobstats[3] / 100)) * 1.5);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Shadow Strike <br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((10 + (4.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Shadow Strike <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 3) {
        if ((Math.floor(Math.random() * 200) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((10 + (2.5 * strength1)) * (Mobstats[3] / 100)) * 1.6);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Venomous Blade <br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((10 + (2.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Venomous Blade <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 4) {
        if ((Math.floor(Math.random() * 100) + 1) >= 50) {
          var damage = parseInt(((20 + (5 * strength1)) * (Mobstats[3] / 100)) * 1.8);
          Mobhealth -= damage;
          document.getElementById("outputLeft").innerHTML = "Death's Embrace: <br> Critical Damage Dealt: " + damage;
          document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
        }
        else {
          var damage = parseInt((20 + (5 * strength1)) * (Mobstats[3] / 100));
          Mobhealth -= damage;
          document.getElementById("outputLeft").innerHTML = "Death's Embrace: <br> Damage Dealt: " + damage;
          document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
        }
      }
    }

    function PlayerArcher() {
      document.getElementById("outputLeft").innerHTML = "";
      if (CskillLeft === 1) {
        if ((Math.floor(Math.random() * 100) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((10 + (2.5 * strength1)) * (Mobstats[3] / 100)) * 1.5);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Arrow Shot<br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((10 + (2.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Arrow Shot <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 2) {
        if ((Math.floor(Math.random() * 100) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((10 + (2.5 * strength1)) * (Mobstats[3] / 100)) * 1.5);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Multi-Shot <br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((10 + (2.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Multi-Shot <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 3) {
        if ((Math.floor(Math.random() * 200) + 1) > Mobstats[2] + (Mobstats[0] * 0.2)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((10 + (2.5 * strength1)) * (Mobstats[3] / 100)) * 1.6);
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Piercing Shot <br> Critical Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
          else {
            var damage = parseInt((10 + (2.5 * strength1)) * (Mobstats[3] / 100));
            Mobhealth -= damage;
            document.getElementById("outputLeft").innerHTML = "Piercing Shot <br> Damage Dealt: " + damage;
            document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
          }
        }
        else {
          document.getElementById("outputLeft").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
        }
      }
      else if (CskillLeft === 4) {
        if ((Math.floor(Math.random() * 100) + 1) >= 50) {
          var damage = parseInt(((20 + (5 * strength1)) * (Mobstats[3] / 100)) * 1.8);
          Mobhealth -= damage;
          document.getElementById("outputLeft").innerHTML = "Rain of Arrows: <br> Critical Damage Dealt: " + damage;
          document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
        }
        else {
          var damage = parseInt((20 + (5 * strength1)) * (Mobstats[3] / 100));
          Mobhealth -= damage;
          document.getElementById("outputLeft").innerHTML = "Rain of Arrows: <br> Damage Dealt: " + damage;
          document.getElementById("Ahealth").innerHTML = "Health: " + Mobhealth + "/" + MobMax;
        }
      }
    }

    var AIattackCounter = 1;

    function AIattackWarior() {
      document.getElementById("outputRight").innerHTML = "";
      if (AIattackCounter % 4 === 1 || AIattackCounter % 4 === 2) {
        var skillpick = Math.floor(Math.random() * 2) + 1;
        if (skillpick === 1) {
          if ((Math.floor(Math.random() * 100) + 1) > evasion1 + (luck1 * .05)) {
            if ((Math.floor(Math.random() * 100) + 1) >= 50) {
              var damage = parseInt(((10 + (2.5 * Mobstats[0])) * (armor1 * arreduc / 100)) * 1.5);
              arreduc = 1;
              health -= damage;
              document.getElementById("outputRight").innerHTML = "Stab <br> Critical Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
            else {
              var damage = parseInt((10 + (2.5 * Mobstats[0])) * ((armor1 * arreduc) / 100));
              health -= damage;
              arreduc = 1;
              document.getElementById("outputRight").innerHTML = "Stab <br> Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
          }
          else {
            document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
            arreduc = 1;
          }
        }
        else if (skillpick === 2) {
          if ((Math.floor(Math.random() * 100) + 1) > evasion1 + (luck1 * .05)) {
            if ((Math.floor(Math.random() * 100) + 1) >= 50) {
              var damage = parseInt(((10 + (2.3 * Mobstats[0])) * ((armor1 * arreduc) / 50)) * 1.5);
              arreduc = .7;
              health -= damage;
              document.getElementById("outputRight").innerHTML = "Scratch <br> Critical Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
            else {
              var damage = parseInt((10 + (2.3 * Mobstats[0])) * ((armor1 * arreduc) / 50));
              health -= damage;
              arreduc = .7;
              document.getElementById("outputRight").innerHTML = "Scratch <br> Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
          }
          else {
            document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
            arreduc = 1;
          }
        }
      }
      else if (AIattackCounter % 4 === 3) {
        if ((Math.floor(Math.random() * 200) + 1) > evasion1 + (luck1 * .05)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((15 + 2.8 * (Mobstats[0])) * ((armor1 * arreduc) / 50)) * 1.5);
            arreduc = 1;
            health -= damage;
            document.getElementById("outputRight").innerHTML = "Acid Bomb <br> Critical Damage Dealt: " + damage;
            document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
          }
          else {
            var damage = parseInt((15 + (2.8 * Mobstats[0])) * ((armor1 * arreduc) / 50));
            health -= damage;
            arreduc = 1;
            document.getElementById("outputRight").innerHTML = "Acid Bomb <br> Damage Dealt: " + damage;
            document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
          }
        }
        else {
          document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
          arreduc = 1;
        }
      }
      else if (AIattackCounter % 4 === 0) {
        if ((Math.floor(Math.random() * 100) + 1) >= 50) {
          var damage = parseInt(((30 + (4 * (Mobstats[0]))) * ((armor1 * arreduc) / 50)) * 1.5);
          arreduc = 1;
          health -= damage;
          document.getElementById("outputRight").innerHTML = "Goblin Rush <br> Critical Damage Dealt: " + damage;
          document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
        }
        else {
          var damage = parseInt((30 + (4 * (Mobstats[0]))) * ((armor1 * arreduc) / 50));
          health -= damage;
          arreduc = 1;
          document.getElementById("outputRight").innerHTML = "Goblin Rush <br> Damage Dealt: " + damage;
          document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
        }
      }
      AIattackCounter++;
    }

    function AIattackArcher() {
      document.getElementById("outputRight").innerHTML = "";
      if (AIattackCounter % 4 === 1 || AIattackCounter % 4 === 2) {
        var skillpick = Math.floor(Math.random() * 2) + 1;
        if (skillpick === 1) {
          if ((Math.floor(Math.random() * 100) + 1) > evasion1 + (luck1 * .05)) {
            if ((Math.floor(Math.random() * 100) + 1) >= 50) {
              var damage = parseInt(((10 + (2.5 * Mobstats[0])) * (armor1 * arreduc / 100)) * 1.5);
              arreduc = 1;
              health -= damage;
              document.getElementById("outputRight").innerHTML = "Piercing Arrow <br> Critical Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
            else {
              var damage = parseInt((10 + (2.5 * Mobstats[0])) * ((armor1 * arreduc) / 100));
              health -= damage;
              arreduc = 1;
              document.getElementById("outputRight").innerHTML = "Quick Shot <br> Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
          }
          else {
            document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
            arreduc = 1;
          }
        }
        else if (skillpick === 2) {
          if ((Math.floor(Math.random() * 100) + 1) > evasion1 + (luck1 * .05)) {
            if ((Math.floor(Math.random() * 100) + 1) >= 50) {
              var damage = parseInt(((10 + (2.3 * Mobstats[0])) * ((armor1 * arreduc) / 50)) * 1.5);
              arreduc = 1;
              health -= damage;
              document.getElementById("outputRight").innerHTML = "Quick Shot <br> Critical Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
            else {
              var damage = parseInt((10 + (2.3 * Mobstats[0])) * ((armor1 * arreduc) / 50));
              health -= damage;
              arreduc = 1;
              document.getElementById("outputRight").innerHTML = "Quick Shot <br> Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
          }
          else {
            document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
            arreduc = 1;
          }
        }
      }
      else if (AIattackCounter % 4 === 3) {
        if ((Math.floor(Math.random() * 200) + 1) > evasion1 + (luck1 * .05)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((15 + 2.8 * (Mobstats[0])) * ((armor1 * arreduc) / 50)) * 1.5);
            arreduc = .5;
            health -= damage;
            document.getElementById("outputRight").innerHTML = "You have been Poisoned: your armor has been reduced for the next turn <br> Poison Tip <br> Critical Damage Dealt: " + damage;
            document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
          }
          else {
            var damage = parseInt((15 + (2.8 * Mobstats[0])) * ((armor1 * arreduc) / 50));
            health -= damage;
            arreduc = 0.5;
            document.getElementById("outputRight").innerHTML = "You have been Poisoned: your armor has been reduced for the next turn <br>Poison Tip <br> Damage Dealt: " + damage;
            document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
          }
        }
        else {
          document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
          arreduc = 1;
        }
      }
      else if (AIattackCounter % 4 === 0) {
        if ((Math.floor(Math.random() * 100) + 1) >= 50) {
          var damage = parseInt(((30 + (4 * (Mobstats[0]))) * ((armor1 * arreduc) / 50)) * 1.5);
          arreduc = 1;
          health -= damage;
          document.getElementById("outputRight").innerHTML = "Volley of Arrows <br> Critical Damage Dealt: " + damage;
          document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
        }
        else {
          var damage = parseInt((30 + (4 * (Mobstats[0]))) * ((armor1 * arreduc) / 50));
          health -= damage;
          arreduc = 1;
          document.getElementById("outputRight").innerHTML = "Volley of Arrows <br> Damage Dealt: " + damage;
          document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
        }
      }
      AIattackCounter++;
    }

    function AIattackAssassin() {
      document.getElementById("outputRight").innerHTML = "";
      if (AIattackCounter % 4 === 1 || AIattackCounter % 4 === 2) {
        var skillpick = Math.floor(Math.random() * 2) + 1;
        if (skillpick === 1) {
          if ((Math.floor(Math.random() * 100) + 1) > evasion1 + (luck1 * .05)) {
            if ((Math.floor(Math.random() * 100) + 1) >= 50) {
              var damage = parseInt(((10 + (2.5 * Mobstats[0])) * (armor1 * arreduc / 100)) * 1.5);
              arreduc = 1;
              health -= damage;
              document.getElementById("outputRight").innerHTML = "Dagger Stab <br> Critical Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
            else {
              var damage = parseInt((10 + (2.5 * Mobstats[0])) * ((armor1 * arreduc) / 100));
              health -= damage;
              arreduc = 1;
              document.getElementById("outputRight").innerHTML = "Dagger Stab <br> Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
          }
          else {
            document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
            arreduc = 1;
          }
        }
        else if (skillpick === 2) {
          if ((Math.floor(Math.random() * 100) + 1) > evasion1 + (luck1 * .05)) {
            if ((Math.floor(Math.random() * 100) + 1) >= 50) {
              var damage = parseInt(((10 + (2.3 * Mobstats[0])) * ((armor1 * arreduc) / 50)) * 1.5);
              arreduc = 1;
              health -= damage;
              document.getElementById("outputRight").innerHTML = "Sneak Attack <br> Critical Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
            else {
              var damage = parseInt((10 + (2.3 * Mobstats[0])) * ((armor1 * arreduc) / 50));
              health -= damage;
              arreduc = 1;
              document.getElementById("outputRight").innerHTML = "Sneak Attack <br> Damage Dealt: " + damage;
              document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
            }
          }
          else {
            document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
            arreduc = 1;
          }
        }
      }
      else if (AIattackCounter % 4 === 3) {
        if ((Math.floor(Math.random() * 200) + 1) > evasion1 + (luck1 * .05)) {
          if ((Math.floor(Math.random() * 100) + 1) >= 50) {
            var damage = parseInt(((20 + 3.1 * (Mobstats[0])) * ((armor1 * arreduc) / 50)) * 1.5);
            arreduc = .6;
            health -= damage;
            document.getElementById("outputRight").innerHTML = "You have been Poisoned: your armor has been reduced for the next turn <br> Toxic Blade Critical Damage Dealt: " + damage;
            document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
          }
          else {
            var damage = parseInt((20 + (3.1 * Mobstats[0])) * ((armor1 * arreduc) / 50));
            health -= damage;
            arreduc = .6;
            document.getElementById("outputRight").innerHTML = "Toxic Blade <br> Damage Dealt: " + damage;
            document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
          }
        }
        else {
          document.getElementById("outputRight").innerHTML = "Attack has been evaded <br> Damage Dealt: " + 0;
          arreduc = 1;
        }
      }
      else if (AIattackCounter % 4 === 0) {
        if ((Math.floor(Math.random() * 100) + 1) >= 50) {
          var damage = parseInt(((30 + (4 * (Mobstats[0]))) * ((armor1 * arreduc) / 50)) * 1.5);
          arreduc = 1;
          health -= damage;
          document.getElementById("outputRight").innerHTML = "Shadow Ambush <br> Critical Damage Dealt: " + damage;
          document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
        }
        else {
          var damage = parseInt((30 + (4 * (Mobstats[0]))) * ((armor1 * arreduc) / 50));
          health -= damage;
          arreduc = 1;
          document.getElementById("outputRight").innerHTML = "Shadow Ambush <br> Damage Dealt: " + damage;
          document.getElementById("Phealth").innerHTML = "Health: " + health + "/" + maxhealth;
        }
      }
      AIattackCounter++;
    }

*/