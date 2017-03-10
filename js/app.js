/*
    Author: David Deal
*/

// Enemies our player must avoid
var Enemy = function(x,y,spd) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.spd = spd;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var speed = this.spd;
    if(this.x < 500) {this.x = this.x + speed;
    } else {
        this.x = 0;
    }
    //Check to see if bug has collided with player.
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check for collisions
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function() {
    //Define approximate space occupied by player and bugs.
    var playerSpace = {x:player.x, y:player.y, width:50, height:30};
    var bugSpace = {x:this.x, y:this.y, width:50, height:50};

    //Determine if player and bugs rectangles overlap.
    if (playerSpace.x < bugSpace.x + bugSpace.width &&
        playerSpace.x + playerSpace.width > bugSpace.x &&
        playerSpace.y < bugSpace.y + bugSpace.height &&
        playerSpace.height + playerSpace.y > bugSpace.y) {
            //if they do then send the player back to start position.
            player.reset();
        }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {

};

//Set the player sprite back to the start position.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 375;
};

//Draw the player sprite on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Use player input to move the player sprite on the screen.
Player.prototype.handleInput = function(dir) {
    if (dir === 'left' && this.x > 0) {this.x = this.x - 101;}
    if (dir === 'right' && this.x < 400) {this.x = this.x + 101;}
    if (dir === 'down' && this.y < 375) {this.y = this.y + 83;}
    if (dir === 'up' && this.y > 75) {this.y = this.y - 83;
    } else if (dir === 'up' && this.y < 75) {
        this.reset();
    }
};

//Generate a random speed for bugs.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getSpeed() {
    min = Math.ceil(1);
    max = Math.floor(8);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Generate a random row in which each bug will appear.
function getRow() {
    min = Math.ceil(0);
    max = Math.floor(3);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Now instantiate your objects.
for (var i = 0;i < 5; i++) {
    var bugSpd = getSpeed();
    var bugRow = 65 + (getRow() * 83);
    allEnemies.push(new Enemy(-101,bugRow,bugSpd));
};

// Place the player object in a variable called player
var player = new Player(200,375);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*MAYBES:
    SCOREBOARD
    GEMS?
*/