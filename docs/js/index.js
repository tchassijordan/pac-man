// game components
const grid = document.querySelector('.grid');
const gameOverDisplay = document.querySelector('.game-over');
const scoreDisplay = document.querySelector('#score');


//game elements
let squares = [];
const width = 28;
let score = 0;
let pacmanCurrentIndex = 489;
let direction = 1;
let isWon = false;
let isLeft = false;
let isRight = false;
let isUp = false;
let isDown = false;


// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

const body = document.querySelector('body');
const animation = body.style.getPropertyValue('--openCloseMouth');


function openCloseMouthHandler() {
    return body.style.setProperty('--openCloseMouth', 'openCloseMouth');
}

function fadePacman() {
    body.style.setProperty('--openCloseMouth', 'fade');
    return squares[pacmanCurrentIndex].classList.remove('pac-man');
}





function createGrid() {
    for (let i = 0; i < layout.length; i++) {
        //create square
        const square = document.createElement('div');
        // add square to grid
        grid.appendChild(square);
        // Also add square to squares array
        squares.push(square);
        // add wall class
        if (layout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet');
        } else if (layout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        }
    }
    squares[pacmanCurrentIndex].classList.add('pac-man');
}

createGrid();


function move() {
    //add class pac-man
    squares[pacmanCurrentIndex].classList.add('pac-man');
    //when pac-man eats pac-dot
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        // set pac-man animation to openCloseMouth when pac-man eats pac-dot
        openCloseMouthHandler();
        // remove class pac-dot 
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        //increment score
        score++;
        //display score
        scoreDisplay.textContent = score;
    }
    powerPelletEaten();
    checkForWin();
    checkGameOver();
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        // set pac-man animation to openCloseMouth when it eats power-pellet
        openCloseMouthHandler();
        //remove class power-pellet
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        //increment score by 10
        score += 10;
        //display score
        scoreDisplay.textContent = score;
        // set the ghost isScared property to true
        ghosts.forEach(ghost => {
            ghost.isScared = true;
        })
        // after 10s unScare the ghosts
        setTimeout(unScareGhosts, 10000);
    }
}


function control(event) {
    //remove the pac-man class from previous index before any next move 
    squares[pacmanCurrentIndex].classList.remove('pac-man');
    // remove openCloseMouth animation from pac-man before any move 
    body.style.setProperty('--openCloseMouth', 'none');

    //handle keyboard arrow direction
    switch (event.key) {
        case "Down": // IE-support
        case "ArrowDown":
            direction = width;
            if (
                (pacmanCurrentIndex + width < width * width) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('wall')) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('ghost-lair'))
            ) {
                isDown = true;
                pacmanIndexHandler();
            }
            break;

        case "Up": // IE-support
        case "ArrowUp":
            direction = -width;
            if (
                (pacmanCurrentIndex - width > width - 1) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('wall')) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('ghost-lair'))
            ) {
                isUp = true;
                pacmanIndexHandler();
            }
            break;

        case "Left": // IE-support
        case "ArrowLeft":
            direction = -1;
            if (
                (pacmanCurrentIndex % width > 1) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('wall')) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('ghost-lair'))
            ) {
                isLeft = true;
                pacmanIndexHandler();
            } else if (pacmanCurrentIndex === 365) {
                // add fade animation  
                fadePacman();
                // set pacman index to middle-right
                pacmanCurrentIndex = 391;
                isLeft = true;
                pacmanIndexHandler();
            }
            break;

        case "Right": // IE-support
        case "ArrowRight":
            direction = 1;
            if (
                !(pacmanCurrentIndex % width === width - 1) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('wall')) &&
                !(squares[pacmanCurrentIndex + direction].classList.contains('ghost-lair'))
            ) {
                isRight = true;
                pacmanIndexHandler();

            }
            if (pacmanCurrentIndex === 391) {
                // add fade animation 
                fadePacman();
                // set pacman index to middle-left
                pacmanCurrentIndex = 365;
                isRight = true;
                pacmanIndexHandler();
            }
            break;
    }
    event.preventDefault();
    move();
}

document.addEventListener('keydown', control);

function pacmanIndexHandler() {
    //update pacman direction
    pacmanCurrentIndex += direction;
    if (isRight) {
        //rotate pacman to right
        body.style.setProperty('--angle', 'rotate(130deg)');
        isRight = false;
    } else if (isLeft) {
        //rotate pacman to left
        body.style.setProperty('--angle', 'rotate(315deg)');
        isLeft = false;
    } else if (isDown) {
        //rotate pacman down
        body.style.setProperty('--angle', 'rotate(220deg)');
        isDown = false;
    } else if (isUp) {
        //rotate pacman up
        body.style.setProperty('--angle', 'rotate(50deg)');
        isUp = false;
    }
}


class Ghost {
    constructor(ghostName, ghostIndex, speed) {
        this.className = ghostName;
        this.startIndex = ghostIndex;
        this.speed = speed;
        this.currentIndex = ghostIndex;
        this.timer = NaN;
        this.isScared = false;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add('ghost', ghost.name);
});

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    const directions = [1, -1, width, -width];
    // generate a random direction
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];
    // set the ghost time so it can move 
    ghost.timer = setInterval(() => {
        if (
            !squares[ghost.currentIndex + randomDirection].classList.contains('wall') &&
            !squares[ghost.currentIndex + randomDirection].classList.contains('ghost')
        ) {
            //remove the ghost class before moving
            squares[ghost.currentIndex].classList.remove('ghost', ghost.className, 'scared-ghost');
            // change ghost index
            ghost.currentIndex += randomDirection;
            //add the ghost and ghost.className classes to the new ghost.currentIndex
            squares[ghost.currentIndex].classList.add('ghost', ghost.className);

        } else randomDirection = directions[Math.floor(Math.random() * directions.length)];

        //if pac-man eats a power pellet set ghost.isScared to true
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        if (
            ghost.isScared &&
            (
                squares[ghost.currentIndex].classList.contains('pac-man') ||
                squares[pacmanCurrentIndex].classList.contains('scared-ghost')
            )
        ) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove('ghost', ghost.className, 'scared-ghost');
            //reset ghost currentIndex 
            ghost.currentIndex = ghost.startIndex;
            // increment score by 100
            score += 100;
            //dispay score
            scoreDisplay.textContent = score;
            //add classnames - ghost.className, 'ghost'
            squares[ghost.currentIndex].classList.add('ghost', ghost.className);

        }
        //check for game over
        checkGameOver();
    }, ghost.speed);
}


//unScare ghosts 
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}


//check for game over
function checkGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !(squares[pacmanCurrentIndex].classList.contains('scared-ghost'))
    )
        gameOverHandler();
}



//check for win
function checkForWin() {
    if (score === 274) {
        //set isWon to true
        isWon = true;
        gameOverHandler();
    }
}


// stop game and display game over message
function gameOverHandler() {
    // clear each ghost timer
    ghosts.forEach(ghost => clearInterval(ghost.timer));
    // also stop the user from moving pac-man 
    document.removeEventListener('keydown', control);
    //show game over message
    gameOverDisplay.style.display = "block";
    if (isWon)
        gameOverDisplay.textContent = "You won 🎉";
    else gameOverDisplay.textContent = "You Loss 🔄";
}


