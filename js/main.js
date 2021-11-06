const divResult = document.querySelector("#result");


let array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let resultArray = randomArray();
 

let lastClick = [];
let nbAffiche = 0;
let ready = true;




displayArray();

function displayArray() {
    let element = "";

    for(var i = 0; i < array.length; i++) {
        element += "<div>"
        for(var j = 0; j < array[i].length; j++) {
            if(array[i][j] === 0){
            element += "<button class='btn btn-danger m-2' style='width:110px;height:120px'onclick='verif(\""+i+"-"+j+"\")'><h1>?</h1></button>";
            }else {
                element += "<img src='"+ getImage(array[i][j])+"' style='width:110px;height:120px' class='m-2'>"; 
            }        
        }
        element += "</div>";
    }

    divResult.innerHTML = element;
}

function getImage(value){
    let newElement = "";
    switch(value){
        case 1 : newElement += "img/elephant.png";
        break;
        case 2 : newElement += "img/bear.png";
        break;
        case 3 : newElement += "img/cow.png";
        break;
        case 4 : newElement += "img/giraffe.png";
        break;
        case 5 : newElement += "img/narwhal.png";
        break;
        case 6 : newElement += "img/pig.png";
        break;
        default : console.log("cas non pris en compte")
    }
    return newElement;

}
function verif(button) {
   if(ready) {
    nbAffiche++;

    let row = button.substr(0,1);
    let column = button.substr(2,1);

    array[row][column] = resultArray[row][column];
    displayArray();

    if(nbAffiche > 1) {
        ready = false;
        
        setTimeout(() => {
            if(array[row][column] !== resultArray[lastClick[0]][lastClick[1]]) {
                array[row][column] = 0;
                array[lastClick[0]][lastClick[1]] = 0;
    
            }
            displayArray();
            ready = true;
            nbAffiche = 0;
            lastClick = [row, column];

        },1000)

     }else {
        lastClick = [row, column];
     }

    
}
}
function randomArray() {
    let arr = [];

    let position = [0, 0, 0, 0, 0, 0];


    for(let i = 0; i < 4; i++){
        let arrRow = [];
        for(let j = 0; j < 3; j++){
            let end = false;

          while(!end) {
            let randomImage = Math.floor(Math.random() * 6);
            if(position[randomImage] < 2) {
                arrRow.push(randomImage+1);
                position[randomImage]++;
                end = true;
            }
           
          }
        }

        arr.push(arrRow);
    }

    return arr;
}