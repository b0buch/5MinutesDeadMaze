const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//Walls 
const walls = [
    //x, y, width, height
    {x: 250, y: 100, width: 530, height: 20},
    {x: 100, y: 500, width: 700, height: 20},
    {x: 780, y: 100, width: 20, height: 400},

    //inside walls 
    {x: 250, y: 100, width: 20, height: 300},
    {x: 500, y: 200, width: 20, height: 300}
]



//player
const player = {
    x: 380,
    y: 280,
    width: 20,
    height: 10,
    speed: 3
};

//mouse
let mouseX = 0;
let mouseY = 0;

let dx = 0;
let dy = 0;

canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    dx = mouseX - player.x;
    dy = mouseY - player.y;

    let length = Math.sqrt(dx * dx + dy * dy);
    dx = dx / length;
    dy = dy / length;

})



//bullet 
const bullets =[];

document.addEventListener("mousedown", function(event) {
    const newbullet = {
        x: player.x,
        y: player.y,
        velocityX:dx,
        velocityY:dy,
        width: 5,
        height: 10,
        speed: 7
    }

    bullets.push(newbullet);
});



//keys
const keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key.toLowerCase()] = false;
});



// Collision
function collision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}




// Update 

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
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.x + player.width > canvas.width){
        player.x = canvas.width - player.width;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }


    //Bullet Colision
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];

        // Move bullet
        bullet.x += bullet.velocityX * bullet.speed;
        bullet.y += bullet.velocityY * bullet.speed;

        // Bullet collision with walls
        let hitWall = false;
        for (const wall of walls) {
            if (collision(bullet, wall)) {
                hitWall = true;
                break;
            }
        }

        // Remove bullet if it hits a wall
        if (hitWall) {
            bullets.splice(i, 1);

            continue;
        }

        // Remove bullet if it leaves canvas
        if (bullet.x < 0 || bullet.y < 0 || bullet.x + bullet.width > canvas.width || bullet.y + bullet.height > canvas.height){
            bullets.splice(i, 1);
        }
    }
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

    //bullet
    ctx.fillStyle = "black";

    for(const bullet of bullets) {
        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
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