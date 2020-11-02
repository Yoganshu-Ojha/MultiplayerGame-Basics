var ball;
var DataBase;
var position;

function setup(){
    createCanvas(500,500);
    DataBase = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ball_pos = DataBase.ref('ball/position');
    ball_pos.on("value", readPosition , showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
    console.log(position);
}

function showError(){
    console.log("ERROR in Reading values");
}

function changePosition(x,y){
    DataBase.ref('ball/position').set({ 
        'x' : position.x+x,
        'y' : position.y+y
    });
}
