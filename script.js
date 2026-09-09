const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//Walls 
const walls = [
    //x, y, width, height
    {x: 100, y: 100, width: 700, height: 20},
    {x: 100, y: 100, width: 20, height: 20},
    {x: 100, y: 500, width: 700, height: 20},
    {x: 780, y: 100, width: 20, height: 500},

    //inside walls 
    {x: 250, y: 100, width: 20, height: 300},
    {x: 500, y: 300, width: 20, height: 300}
]




//player
const player = {
    x: 380,
    y: 280,
    width: 20,
    height: 10,
    speed: 3
};


//keys

const keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});

//moving 

function update() {
    let oldX = player.x;
    let oldY = player.y;

    if (keys["w"]) {
        player.y -= player.speed;
    }
    if (keys["s"]) {
        player.y += player.speed;
    }
    if (keys["a"]) {
        player.x -= player.speed;
    }
    if (keys["d"]) {
        player.x += player.speed;
    }

    //collision with maze wall 
    for (const wall of walls) { 
        if (collision(player, wall)) {
            player.x = oldX;
            player.y = oldY;
        }
    }

    //limit for player

    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y <0) {
        player.y = 0;
    }
    if (player.x + player.width > canvas.width){
        player.x = canvas.width - player.width;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

//Colision Walls
function collision(player, wall){
    return (
        player.x < wall.x + wall.width &&
        player.x + wall.width > wall.x &&
        player.y < wall.y + wall.height &&
        player.y + wall.height > wall.y
    )
}



//drawing

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // maze walls
    ctx.fillStyle = "grey";

    for(const wall of walls) {
        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        )
    }

    // player
    ctx.fillStyle = "white";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}
//game loop

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}


//starting the game
gameLoop();