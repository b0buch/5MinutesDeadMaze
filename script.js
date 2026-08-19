const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")

//player

const player = {
    x: 380,
    y: 280,
    width: 40,
    height: 40,
    speed: 5
};

ctx.fillStyle = "white";

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


//drawing

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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