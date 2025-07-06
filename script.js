// Exécute le code une fois que la page est entièrement chargée
window.onload = function(){
    // Définit la largeur du canvas en pixels
    let canvasWidth = 900;
    // Définit la hauteur du canvas en pixels
    let canvasHeight = 600;
    // Définit la taille d'un bloc (une unité du jeu) en pixels
    let blockSize = 30;
    // Déclare la variable pour le contexte de dessin du canvas
    let ctx;
    // Définit le délai entre chaque rafraîchissement du jeu en millisecondes
    let delay = 100;
    // Déclare la variable pour le serpent
    let snakee;
    // Déclare la variable pour la pomme
    let applee;
    // Calcule la largeur du canvas en nombre de blocs
    let widthInBlocks = canvasWidth/blockSize;
    // Calcule la hauteur du canvas en nombre de blocs
    let heightInBlocks = canvasHeight/blockSize;
    // Déclare la variable pour le score
    let score; 
    // Déclare la variable pour gérer les intervalles de temps
    let timeout;
    // Appelle la fonction d'initialisation du jeu
    init();
    
    // Fonction qui initialise le jeu
    function init(){       
        // Crée un élément canvas
        var canvas = document.createElement('canvas');
        // Définit la largeur du canvas
        canvas.width = canvasWidth;
        // Définit la hauteur du canvas
        canvas.height = canvasHeight;
        // Ajoute une bordure grise au canvas
        canvas.style.border = "30px solid gray";
        // Centre le canvas sur la page
        canvas.style.margin = "50px auto";
        // Affiche le canvas comme un élément de bloc
        canvas.style.display = "block"
        // Définit la couleur de fond du canvas
        canvas.style.backgroundColor = "#ddd";
        // Ajoute le canvas au corps du document
        document.body.appendChild(canvas);
        // Obtient le contexte de dessin 2D du canvas
        ctx = canvas.getContext('2d');
        // Crée une nouvelle instance du serpent avec une position et direction initiales
        snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");
        // Crée une nouvelle instance de pomme à une position donnée
        applee = new Apple([10,10]);
        // Initialise le score à zéro
        score = 0
        // Lance la première actualisation du canvas
        refreshCanvas();
    }

    // Fonction qui met à jour et redessine le canvas
    function refreshCanvas()
    {
        // Fait avancer le serpent d'une position
        snakee.advance();
        // Vérifie si le serpent est entré en collision
        if (snakee.checkCollision())
        {
            // Si collision, affiche l'écran de fin de jeu
            gameOver()
        }else {
            // Vérifie si le serpent mange la pomme
            if (snakee.isEatingApple(applee)){
                // Augmente le score
                score++;
                // Indique que le serpent a mangé une pomme
                snakee.ateApple = true;
                // Trouve une nouvelle position pour la pomme
                do{
                    // Définit une nouvelle position pour la pomme
                    applee.setNewPosition();
                // Continue jusqu'à ce que la pomme ne soit pas sur le serpent
                }while(applee.isOnSnake(snakee))
            }
            // Efface tout le contenu du canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            // Affiche le score
            drawScore();
            // Dessine le serpent
            snakee.draw();
            // Dessine la pomme
            applee.draw();
            // Planifie la prochaine actualisation du canvas
            timeout = setTimeout(refreshCanvas, delay);
        }
    }
    
    // Fonction qui affiche l'écran de fin de jeu
    function gameOver(){
        // Sauvegarde l'état actuel du contexte
        ctx.save();
        // Définit la police pour le texte "Game Over"
        ctx.font = "bold 70px sans-serif"
        // Définit la couleur de remplissage du texte
        ctx.fillStyle = "#000";
        // Centre le texte horizontalement
        ctx.textAlign = "center";
        // Définit la couleur du contour du texte
        ctx.strokeStyle = "white";
        // Définit l'épaisseur du contour
        ctx.lineWidth = 5;
        // Aligne le texte verticalement au milieu
        ctx.textBaseline = "middle";
        // Calcule le centre horizontal du canvas
        var centreX = canvasWidth / 2;
        // Calcule le centre vertical du canvas
        var centreY = canvasHeight / 2;
        // Dessine le contour du texte "Game Over"
        ctx.strokeText("Game Over",  centreX, centreY-180);
        // Remplit le texte "Game Over"
        ctx.fillText("Game Over", centreX, centreY-180);
        // Change la police pour le texte d'instruction
        ctx.font = "bold 40px sans-serif"
        // Dessine le contour du texte d'instruction
        ctx.strokeText("Apuyez sur la touche Espace pour rejouer", centreX, centreY-120);
        // Remplit le texte d'instruction
        ctx.fillText("Apuyez sur la touche Espace pour rejouer", centreX, centreY-120);
        // Restaure l'état précédent du contexte
        ctx.restore();
    }

    // Fonction qui redémarre le jeu
    function restart(){
        // Réinitialise le serpent
        snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");
        // Réinitialise la pomme
        applee = new Apple([10,10]);
        // Réinitialise le score
        score = 0;
        // Annule le timeout précédent
        clearTimeout(timeout)
        // Relance l'actualisation du canvas
        refreshCanvas();
    }
    
    // Fonction qui affiche le score
    function drawScore(){
        // Sauvegarde l'état actuel du contexte
        ctx.save();
        // Définit la police pour le score
        ctx.font = "bold 200px sans-serif"
        // Définit la couleur de remplissage du score
        ctx.fillStyle = "gray";
        // Centre le score horizontalement
        ctx.textAlign = "center";
        // Aligne le score verticalement au milieu
        ctx.textBaseline = "middle";
        // Calcule le centre horizontal du canvas
        var centreX = canvasWidth / 2;
        // Calcule le centre vertical du canvas
        var centreY = canvasHeight / 2;
        // Dessine le score
        ctx.fillText(score.toString(), centreX, centreY);
        // Restaure l'état précédent du contexte
        ctx.restore();
    }
    
    // Fonction qui dessine un bloc à une position donnée
    function drawBlock(ctx, position){
        // Calcule la coordonnée x du bloc
        var x = position[0] * blockSize;
        // Calcule la coordonnée y du bloc
        var y = position[1] * blockSize;
        // Dessine un rectangle rempli représentant le bloc
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    // Constructeur pour créer un serpent
    function Snake(body, direction){
        // Corps du serpent (tableau de positions)
        this.body = body;
        // Direction actuelle du serpent
        this.direction = direction;
        // Indicateur si le serpent vient de manger une pomme
        this.ateApple = false;
        
        // Méthode pour dessiner le serpent
        this.draw = function(){
            // Sauvegarde l'état actuel du contexte
            ctx.save();
            // Définit la couleur de remplissage du serpent
            ctx.fillStyle = "#ff0000";
            // Parcourt chaque segment du corps du serpent
            for(var i = 0; i < this.body.length; i++){
                // Dessine un bloc pour chaque segment
                drawBlock(ctx, this.body[i]);
            }
            // Restaure l'état précédent du contexte
            ctx.restore();
        };
        
        // Méthode pour faire avancer le serpent
        this.advance = function(){
            // Copie la position de la tête
            var nextPosition = this.body[0].slice();
            // Détermine la nouvelle position en fonction de la direction
            switch(this.direction){
                case "left":
                    // Déplace vers la gauche
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    // Déplace vers la droite
                    nextPosition[0] += 1; 
                    break;
                case "down":
                    // Déplace vers le bas
                    nextPosition[1] += 1;
                    break;
                case "up":
                    // Déplace vers le haut
                    nextPosition[1] -= 1;
                    break;
                default:
                    // Lance une erreur si la direction est invalide
                    throw("Invalid Direction");
            }
            // Ajoute la nouvelle position à l'avant du corps
            this.body.unshift(nextPosition);
            // Si le serpent n'a pas mangé de pomme, retire le dernier segment
            if(!this.ateApple){
                this.body.pop();
            }else{
                // Réinitialise l'indicateur de pomme mangée
                this.ateApple = false;
            }
        };
        
        // Méthode pour changer la direction du serpent
        this.setDirection= function(newDirection){
            // Directions autorisées en fonction de la direction actuelle
            var allowedDirections;
            switch(this.direction){
                case "left":
                case "right":
                    // Si direction horizontale, permet vertical
                    allowedDirections = ["up", "down"]
                    break;
                case "down":
                case "up":
                    // Si direction verticale, permet horizontal
                    allowedDirections = ["left", "right"]
                    break;
                default:
                    // Lance une erreur si la direction est invalide
                    throw("Invalid Direction");
            }
            // Vérifie si la nouvelle direction est autorisée
            if (allowedDirections.indexOf(newDirection ) > -1){
                // Change la direction
                this.direction = newDirection;        
            }
        };
        
        // Méthode pour vérifier les collisions
        this.checkCollision = function(){
            // Initialise les variables de collision
            var wallCollision = false;
            var snakeCollision = false;
            // Récupère la position de la tête
            var head = this.body[0];
            // Récupère le reste du corps
            var rest = this.body.slice(1);
            // Coordonnées x et y de la tête
            var snakeX = head[0];
            var snakeY = head[1];
            // Limites du terrain de jeu
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            // Vérifie si la tête est en dehors des limites horizontales
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            // Vérifie si la tête est en dehors des limites verticales
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            // Si la tête est en dehors des limites, il y a collision avec un mur
            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallCollision = true;
            }
            // Vérifie si la tête entre en collision avec le reste du corps
            for (var i = 0; i<rest.length; i++){
                if (snakeX === rest[i][0] && snakeY === rest[i][1]){
                    snakeCollision = true;
                }
            }
            // Retourne vrai s'il y a une collision
            return wallCollision || snakeCollision;
        };
        
        // Méthode pour vérifier si le serpent mange une pomme
        this.isEatingApple = function(appleToEat){
            // Récupère la position de la tête
            var head = this.body[0];
            // Vérifie si la tête est à la même position que la pomme
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
            {
                return true;
            }else{
                return false;
            }
        }
    };

    // Constructeur pour créer une pomme
    function Apple(position){
        // Position de la pomme
        this.position = position;
        
        // Méthode pour dessiner la pomme
        this.draw = function(){
            // Sauvegarde l'état actuel du contexte
            ctx.save();
            // Définit la couleur de remplissage de la pomme
            ctx.fillStyle = "#33cc33";
            // Commence un nouveau chemin de dessin
            ctx.beginPath();
            // Calcule le rayon de la pomme
            var radius = blockSize/2;
            // Calcule la coordonnée x du centre de la pomme
            var x = this.position[0] * blockSize + radius;
            // Calcule la coordonnée y du centre de la pomme
            var y= this.position[1] * blockSize + radius;
            // Dessine un cercle représentant la pomme
            ctx.arc(x,y, radius, 0, Math.PI*2, true);
            // Remplit le cercle
            ctx.fill();
            // Restaure l'état précédent du contexte
            ctx.restore();
        };
        
        // Méthode pour définir une nouvelle position aléatoire pour la pomme
        this.setNewPosition = function(){
            // Génère une coordonnée x aléatoire
            var newX = Math.round(Math.random(0,1) * (widthInBlocks-1));
            // Génère une coordonnée y aléatoire
            var newY = Math.round(Math.random(0,1) * (heightInBlocks-1));
            // Met à jour la position de la pomme
            this.position = [newX,newY];
        };
        
        // Méthode pour vérifier si la pomme est sur le serpent
        this.isOnSnake = function (snakeToCheck){
            // Initialise la variable de vérification
            var isOnSnake = false;
            // Parcourt chaque segment du corps du serpent
            for (let i=0; i< snakeToCheck.body.length; i++){
                // Vérifie si la pomme est à la même position qu'un segment du serpent
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][0]){
                    isOnSnake = true;
                }
                // Retourne le résultat de la vérification
                return isOnSnake;
            }
        }
    }

    // Gestionnaire d'événement pour les touches du clavier
    document.onkeydown = function handleKeyDown(e){
        // Récupère le code de la touche pressée
        var key = e.keyCode;
        // Variable pour la nouvelle direction
        var newDirection;
        // Détermine la direction en fonction de la touche
        switch(key){
            case 37:
                // Flèche gauche
                newDirection="left";
                break;
            case 38:
                // Flèche haut
                newDirection= "up"
                break;
            case 39:
                // Flèche droite
                newDirection= "right"
                break;
            case 40:
                // Flèche bas
                newDirection= "down"
                break;
            case 32:
                // Touche espace pour redémarrer
                restart();
                return;
            default:
                // Autres touches sont ignorées
                return;;
        }
        // Change la direction du serpent
        snakee.setDirection(newDirection)
    }
}
