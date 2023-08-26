// Game Constants & Variables
let snakeDir = {x: 0, y: 0};
let speed=2;
let lastPaintTime=0;
let score= 0;
let snakeArr=[
    {x: 13, y:15}
]
food = {x: 6, y: 7};
let dashboard = document.getElementById('dashboard');

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


function gameEngine(){
    // Part 1: Updating the snake array & Food 
    if(isCollide(snakeArr)){
        snakeDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }

    //If you have eaten the food,increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        score += 1;
        if(score>hiscoreval)
        {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML =" Score: "+score;
    snakeArr.unshift({x: snakeArr[0].x + snakeDir.x, y: snakeArr[0].y + snakeDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) 
    { 
        snakeArr[i+1] = {...snakeArr[i  ]};
    }
    snakeArr[0].x += snakeDir.x;
    snakeArr[0].y += snakeDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    dashboard.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        dashboard.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    dashboard.appendChild(foodElement);

    
}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    if (snakeDir.x === 0 && snakeDir.y === 0) {
    snakeDir = {x: 0, y: 1} // Start the game
    }
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            snakeDir.x = 0;
            snakeDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            snakeDir.x = 0;
            snakeDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            snakeDir.x = -1;
            snakeDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            snakeDir.x = 1;
            snakeDir.y = 0;
            break;
        default:
            break;
    }

});