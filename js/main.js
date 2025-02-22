let divResult = document.querySelector("#result");
// balise avec l'id "result"
// elle sert a stocker le contenu html


let array = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]

];
//tableau  bi-dimensionnel qui stock les elements
//afficher sous forme de grille

let resultArray = randomArray();
let lastClick = []; //conserve le dernier élément cliqué sous forme (0, 1), (3, 2)...etc
let number = 0; //nb de clics
let ready = true;// boolean qui dit si on peut cliquer sur un nouveau bouton ou pas

displayArray();

function displayArray() {
  let element = "";

  for (var i = 0; i < array.length; i++) {
    element += "<div>"
    //première boucle pour generer les quatres lignes de la grille
    for (var j = 0; j < array[i].length; j++) {
      //deuxième boucle pour générer trois bouton par ligne
      // ou bien les images si array[i][j] != 0
      if (array[i][j] === 0) {
        element += "<button class='btn btn-dark m-1 size button' onclick='verif(\"" + i + "-" + j + "\")'><img class='format' src='img/South_Park_sign_logo.png'></button>";
        //onclick
      } else {
        element += "<img src='" + getImage(array[i][j]) + "' class='m-2 size'>";
      }
    }
    element += "</div>";
  }

  divResult.innerHTML = element;
}

function getImage(value) {
  //fonction qui récupère une valeur et retourne l'image correspondante grace au switchCase
  let newElement = "";
  switch (value) {
    //source des images "kenney"
    case 1: newElement += "https://www.gifsanimes.com/data/media/1552/south-park-image-animee-0023.gif";
      break;
    case 2: newElement += "https://www.gifsanimes.com/data/media/1552/south-park-image-animee-0013.gif";
      break;
    case 3: newElement += "https://www.gifsanimes.com/data/media/1552/south-park-image-animee-0031.gif";
      break;
    case 4: newElement += "https://www.gifsanimes.com/data/media/1552/south-park-image-animee-0008.gif";
      break;
    case 5: newElement += "https://www.gifsanimes.com/data/media/1552/south-park-image-animee-0012.gif";
      break;
    case 6: newElement += "https://www.gifsanimes.com/data/media/1552/south-park-image-animee-0003.gif";
      break;
    default: console.log("cas non pris en compte")
  }
  return newElement;//retourne l'image correspondante à la valeur

}

function youWin() {
  //fonction qui compare les valeurs du tableau de nos élément
  //à celui d'image généré au hazard s'ils sont égales alors c'est gagner!!
  if (array.join("") === resultArray.join("")) {
    alert("BRAVO Vous avez gagné!!! Pour rejouer raffraîchir la page...");
  }
}
function verif(button) {
  //recupère l'élement cliqué(button)
  if (ready) {
    //si ready est true on peut cliquer sur un nouveau bouton
    number++;

    let row = button.substr(0, 1);//récupérer la ligne et la colone cliqué façon "bataille navale"
    let column = button.substr(2, 1);

    array[row][column] = resultArray[row][column];
    //quand je clic sur un bouton il est associé a la valeur générant l'image
    displayArray();
    //rappel de la fonction pour afficher la grille

    if (number > 1) {
      //si deux images de cliquées alors => verification
      ready = false;
      //si deux clics alors ready passe a false
      //alors on lance le timout
      setTimeout(() => {
        // sert à laisser un temps avant de repouvoir cliquer
        if (array[row][column] !== resultArray[lastClick[0]][lastClick[1]]) {
          // verifie si la valeur cliquée correspond a la valeur du précedent clic
          array[row][column] = 0;
          array[lastClick[0]][lastClick[1]] = 0;
          // si les valeurs sont différentes alors reinnitialise les deux valeurs à 0
        }
        displayArray();
        youWin();
        ready = true;
        number = 0;
        lastClick = [row, column];
        console.log(resultArray)

      }, 750)

    } else {
      lastClick = [row, column];
    }


  }
}
function randomArray() {
  let arr = [];

  let position = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    let arrRow = [];
    for (let j = 0; j < 3; j++) {
      let end = false;

      while (!end) {
        let randomImage = Math.floor(Math.random() * 6);
        if (position[randomImage] < 2) {
          arrRow.push(randomImage + 1);
          position[randomImage]++;
          end = true;
        }
      }
    }
    arr.push(arrRow);
  }
  return arr;
}

