var ball1,ball2;
var stage;
document.addEventListener('DOMContentLoaded', demo,false);
function rotatePoint(point, center, angle){
    angle = (angle ) * (Math.PI/180); // Convert to radians
    var rotatedX = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x;
    var rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
    return new createjs.Point(rotatedX,rotatedY);
}

function demo(){
    stage = new createjs.Stage("theCanvas");
    var g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginFill(createjs.Graphics.getRGB(0,0,255));
    g.drawCircle(0,0,30);
    ball1 = new createjs.Shape(g);
    ball2 = new createjs.Shape(g);
    ball1.x = stage.canvas.width/2;
    ball1.y = stage.canvas.height/2;
    ball2.x = stage.canvas.width/2;
    ball2.y = 30;
    stage.addChild(ball1);
    stage.addChild(ball2);
    //And go...
    stage.update();
    // onFrame will be called each "tick". Default is 50ms, or 20FPS
    createjs.Ticker.addListener(onFrame);
}

function onFrame(elapsedTime) {
    // Convert from milliseconds to fraction of a second
    var delta = elapsedTime /1000;
    // Rotate by 90 degrees per second, or 1 full rotation per 4 seconds.
    var rotateBy = 90 * delta;
    // Current position of ball2
    var ballPosition = new createjs.Point(ball2.x,ball2.y);
    // Updated position rotated by... um... rotateBy value
    var rotatedPosition = rotatePoint(ballPosition,
    new createjs.Point(ball1.x,ball1.y),rotateBy);

    // Update ball's position to the newly rotated coordinates
    ball2.x = rotatedPosition.x;
    ball2.y = rotatedPosition.y;
    stage.update();
}