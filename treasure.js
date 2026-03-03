let game = {
    moves:[]
};

// these are the inputs from the player, are made public just to be accessed later to not start playing if the input is not valid(to open inspect)
let num,num2,num3;
function playerInput(){
// map size input , higher than 2    
let input = prompt("Enter the map size:");
num = parseInt(input);
if(num < 2 || isNaN(num)){
    console.log("invalid input , please reload the page and enter a basic number higher than 1");
}else{
game.mapSize=num;
}

// number of moves input , higher than 0
let input2 = prompt("Enter the number of moves:");
num2 = parseInt(input2);
if(num2 < 1 || isNaN(num2)){
    console.log("invalid input , please reload the page and enter a basic number higher than 0");
}else{
game.numOfMoves=num2;
}

// players position input, between 0 and map lenght-1
let input3 = prompt("Enter your desired position on the map:");
num3 = parseInt(input3);
if(num3 < 0 || num3>game.mapSize-1 || isNaN(num3)){
    console.log("invalid input , please reload the page and enter a basic number from 0 to " + (game.mapSize-1));
}else{
game.startingPoint=num3;
game.currentPos=num3;
}
}

playerInput();

//max not included
function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function treasurePlacement(){
    let treasurePos=getRandomInt(0,game.mapSize);
    // if the random number is the same as the player's position we call on the function again
    if(treasurePos == game.startingPoint){
        return treasurePlacement();
    }else {
        return treasurePos;
    }
}
game.treasurePlacement=treasurePlacement();

function Play(){
    let inputNum;
    while(game.currentPos != game.treasurePlacement && game.numOfMoves !=0){
        let input=prompt("choose your move (left/right):");
        // left is -1, right is 1 , an invalid input starts the loop again
        if(input=="left"){inputNum=-1;}
        else if(input=="right"){inputNum=1;}
        else{console.log("invalid input , left/right only");continue;}
        // if the player makes a move that puts him outside of the map he gets warned to change direction and the loop starts again
        if(game.currentPos+inputNum > game.mapSize-1 || game.currentPos+inputNum <0){
            console.log("your last move was "+input+" please change direction since you are on the edge of the map");
            continue;
        }
        //save the move details then add it to the array that holds all the moves info
        let move={pastPos:game.currentPos,dir:input,presentPos:game.currentPos+inputNum};
        game.moves.push(move);
        console.log(move);
        game.currentPos+=inputNum;
        game.numOfMoves--;
    }
    if(game.currentPos==game.treasurePlacement){
        console.log("Congrats , you have won !!");
    }else{
        console.log("Sadly you have lost , the treasure was in the number " +game.treasurePlacement+" spot.");
    }
    console.log("Here are your moves history:");
    game.moves.forEach((move, index) => {
    // index starts at 0, so we add 1 for "Move #1"
    console.log(`Move #${index + 1}: You were at ${move.pastPos}, moved ${move.dir}, and arrived at ${move.presentPos}.`);
});
}
// the if is just incase the player continues playing even after putting a wrong input
if(num3 >= 0 && num3<=game.mapSize-1 && !isNaN(num3) && num2 >= 1 && !isNaN(num2) && num >= 2 && !isNaN(num)){
    Play();
}else {
    console.log("you have entered invalid input , please reload the page and try again");
}