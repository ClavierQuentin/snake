function recupLastInstruction(e){
    e = e || window.event;
    if (e.keyCode == '38') {
        instruction = "haut";
        // up arrow
    }
    else if (e.keyCode == '40') {
        instruction = "bas";
        // down arrow
    }
    else if (e.keyCode == '37') {
        instruction = "gauche";
       // left arrow
    }
    else if (e.keyCode == '39') {
        instruction = "droite";
       // right arrow
    }
}

//On déclare une première valeur de temps pour la répétition
let time = 1000;
//On force une direction pour la répétition
let instruction = "droite";
//On récupère le container dans l'html
let cf = document.getElementById('cf');
// Je crée un compteur pour numéroter les cases
let compteur = 1;
// On déclare notre serpent
let serpent = [25,24,23];
// On déclare une variable pomme
let pomme = genererPomme();
//On déclare une variable pour stocker le score
let valeurScoreActuel = 0;
//Variable pour stocker le score max
let valeurMaxScore = valeurScoreActuel;
//On récupère un élément HTML
let scoreActuel = document.getElementById('scoreActuel');
//idem que précedemment
let maxScore = document.getElementById('maxScore');

//Fonction pour générer une grille
function generate(){
    //On boucle 10 fois pour faire un tableau de 10 lignes
    for(let i = 0; i < 10; i++){  
        //A chaque boucle on créée l'élément HTML
        let maLigne = document.createElement('div');
        // On rajoute la classe row
        maLigne.classList.add('row', 'hauteur');
        // On rajoute la div au conteneur HTML
        cf.appendChild(maLigne);
        // On boucle 10 fois pour faire 10 colonnes dans une ligne pour un carré
        for(let y = 0; y < 10; y++){
            // A chaque boucle, création d'un élément
            maColonne = document.createElement('div');
            // Rajout de classe
            maColonne.classList.add('col', 'largeur');
            // Rajout à l'html
            maLigne.appendChild(maColonne);
            // On donne comme ID le numéro de la case
            maColonne.id = compteur;
            // On incrémente le compteur pour continuer à numéroter
            compteur++;
        }  
    }
}

//Fonction pour colorier les cellules
function couleurGrise(){
    // On boucle par 100 pour parcourir toutes les cellules
    for(let z = 1; z <= 100; z++){
        // On récupère l'élément avec l'id
        let maCel = document.getElementById(z);
        // On teste si la valeur du serpent est dans une cellule
        if(serpent.includes(z) == true){
            //Si oui, on ajoute une propriété css correspondante
            maCel.classList.add('couleurGrise')
            //On enleve les propriétes precedentes
            maCel.classList.remove('couleurBlanche','noir','pomme','celluleRouge')
            //On colore en noir la cellule du tableau d'index 0 du serpent pour la tete
            if(serpent[0] === z){
                maCel.classList.add('noir')
                maCel.classList.remove('couleurgrise','couleurBlanche','pomme','celluleRouge')
            }
            if(serpent[serpent.length-1] === z){
                maCel.classList.add('celluleRouge');
                maCel.classList.remove('couleurGrise','noir','couleurBlanche','pomme')
            }
        }
        //si la valeur est en dehors du serpent
        else{
            //On teste si c'est la position de la pomme
            if(z == pomme){
                maCel.classList.add('pomme');
                maCel.classList.remove('couleurBlanche', 'noir', 'couleurGrise','celluleRouge')
            }//Sinon on colorie en blanc
            else{
                maCel.classList.add('couleurBlanche')
                maCel.classList.remove('couleurGrise', 'noir', 'pomme','celluleRouge')
            }
        }
    }
}

//Fontion pour effectuer un déplacement
function calculDeplacement(){
    //En fonction de instruction
    switch(instruction){
        case "droite" :
            //On fait modulo de 10 pour savoir si la position de la tete de serpent est un multiple de 10
            if(serpent[0]%10 ===0){
                //Si la prochaine position de la tete est apres la tete, on empeche le demi-tour
                if(serpent[0]-9 == serpent[1]){
                    break
                }
                //Si la prochaine position de la tete est une partie du serpent, on perds
                if(serpent.includes(serpent[0]-9) == true){
                    gameOver()
                } 
                //Sinon, on ajoute la case a la tete du serpent
                serpent.unshift(serpent[0] - 9);
                //On enleve la derniere case du serpent
                serpent.pop();
                //Si la tete se trouve sur une pomme
                if(serpent[0] == pomme){
                    //On rajoute la case où se trouve la pomme
                    serpent.unshift(pomme)
                    //On genere une nouvelle pomme
                    pomme = genererPomme()
                }
                  
            }
            //Si ce n'est pas un modulo de 10
            else{
                //On empeche le demi-tour
                if(serpent[0]+1 == serpent[1]){
                    break
                }
                //Si la prochaine position de la tete est le corps, on perds
                if(serpent.includes(serpent[0]+1) == true){
                    gameOver()
                }
                //Sinon on rajoute la case au serpent
                serpent.unshift(serpent[0] + 1)
                //On enleve la derniere case
                serpent.pop()
                //Si la tete mange la pomme
                if(serpent[0] == pomme){
                    serpent.unshift(pomme)
                    pomme = genererPomme()
                }  
            }
            break;
        case "gauche":
            if(serpent[0]%10 ===1){
                if(serpent[0]-1==serpent[1]){
                    break
                }
                if(serpent.includes(serpent[0]-1) == serpent[1]){
                    gameOver()
                }
                serpent.unshift(serpent[0] + 9);
                serpent.pop()
                if(serpent[0] == pomme){
                    serpent.unshift(pomme)
                    pomme = genererPomme()
                } 
            }
            else{
                if(serpent[0]-1 == serpent[1]){
                    break
                }
                if(serpent.includes(serpent[0]-1) == true){
                    gameOver()
                }
                serpent.unshift(serpent[0] - 1);
                serpent.pop()
                if(serpent[0] == pomme){
                    serpent.unshift(pomme)
                    pomme = genererPomme()
                } 
            }            
            break;
        case "haut" :
            if(serpent[0] < 11){
                if(serpent[0]+90 == serpent[1]){
                    break
                }
                if(serpent.includes(serpent[0]+99) == true){
                    gameOver()
                }                
                serpent.unshift(serpent[0] + 90);
                serpent.pop()
                if(serpent[0] == pomme){
                    serpent.unshift(pomme)
                    pomme = genererPomme()
                } 
            }
            else{
                if(serpent[0]-10 == serpent[1]){
                    break
                }
                if(serpent.includes(serpent[0]-10) == true){
                    gameOver()
                }
                serpent.unshift(serpent[0] - 10);
                serpent.pop()
                if(serpent[0] == pomme){
                    serpent.unshift(pomme)
                    pomme = genererPomme()
                } 
            }
            break;
        case "bas" :
            if(serpent[0] / 10 > 9){
                if(serpent[0]-90 == serpent[1]){
                    break
                }
                if(serpent.includes(serpent[0]-90) == true){
                    gameOver()
                }
                serpent.unshift(serpent[0] - 90);
                serpent.pop();
                if(serpent[0] == pomme){
                    serpent.unshift(pomme)
                    pomme = genererPomme()
                } 
            }
            else{
                if(serpent[0]+10 == serpent[1]){
                    break
                }
                if(serpent.includes(serpent[0]+10) == true){
                    gameOver()
                }
                serpent.unshift(serpent[0] +10);
                serpent.pop();
                if(serpent[0] == pomme){
                    serpent.unshift(pomme)
                    pomme = genererPomme()
                } 
            }
            break;    
        }
    //On appelle la fonction pour generer les couleurs a chaque mouvement
    couleurGrise()
    //On adapte le timing selon la taille du serpent
    time =  (1000 / serpent.length-2) * 2;
    //On relance timeOut pour boucler la fonctio
    setTimeout(calculDeplacement,time);
}
//Fonction pour générer la position de la pomme
function genererPomme(){
    //Je déclare une variable en y intégrant le nombre généré
    let number = genererNombreAleatoire();
    //On évite que le nombre soit égale à 0
    if(number === 0){
        //On regenere un nombre
        genererNombreAleatoire();
        number = genererNombreAleatoire()
    }
    //On boucle le serpent pour éviter une position généré sur le serpent
    for(let i = 0; i <= serpent.length;i++){
        if(number === serpent[i]){
            genererNombreAleatoire()
            number = genererNombreAleatoire()
        }
    }
    return number
}
//Fonction qui génère un nombre aléatoire en 1 et 100
function genererNombreAleatoire(){
     return Math.trunc(Math.random()*100);   
}

function gameOver(){
    //On affiche game over et le score
    alert("Game Over" + " Score = " + serpent.length)
    //On indique la valeur de la taille du serpent comme score
    valeurScoreActuel = serpent.length;
    //On affiche score précédent
    scoreActuel.textContent = valeurScoreActuel;
    //Si le score est supérieur au score précédent on affiche le plus haut score
    if(valeurScoreActuel > valeurMaxScore){
        valeurMaxScore = serpent.length;
        maxScore.textContent = valeurMaxScore;
    }
    serpent = [47,46,45]
}
generate();
genererPomme();
couleurGrise();
setTimeout(calculDeplacement,time);
