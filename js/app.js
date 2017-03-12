/*
    Author: David Deal
*/

/*
    Implement Enemies
*/

// Enemies our player must avoid
var Enemy = function(x,y,spd,img) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = img;
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
        this.x = -101;
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
            //if they do then call function to resolve the collision.
            this.resolveCollision();
        }
};

Enemy.prototype.resolveCollision = function() {
    player.score -= 10;
    player.reset();
};

/*
    Implement Gems
*/

//Gems which the player can collect to increase their score.
//Because of the similarities in functionality Gem will be
//a subclass of Enemy
var Gem = function(x,y,spd,img) {
    Enemy.call(this,x,y,spd,img);
};

Gem.prototype = Object.create(Enemy.prototype);
Gem.prototype.constructor = Gem;

//Collision for Gem will resolve differently from Enemy so over-
//write this method on the Gem prototype.
Gem.prototype.resolveCollision = function() {
    player.score += 100;
    this.y += 500;
};

/*
    Implement the Player
*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
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
        player.score = player.score + 50;
        this.reset();
    }
};

/*
    Implement the Scoreboard
*/

//Place a scoreboard and link to player's score property.
var scoreBoard = function() {
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + player.score,40,70);
};

/*
    Initial Setup of Game Assets
*/

//Generate a random values for various properties.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRnd(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var allGems = [];

// Now instantiate your objects.
//BUGS
for (var i = 0;i < 5; i++) {
    var bugSpd = getRnd(1,8);
    var bugRow = 65 + (getRnd(0,3) * 83);
    allEnemies.push(new Enemy(-101,bugRow,bugSpd,'images/enemy-bug.png'));
}

//GEMS
for (var i = 0;i < 3; i++) {
    var gemX = getRnd(50,400);
    var gemY = getRnd(50,400);
    allGems.push(new Gem(gemX,gemY,0,'images/Gem Blue.png'));
}

// Place the player object in a variable called player
var player = new Player(200,375);

/*
    Listen for Player Input
*/

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