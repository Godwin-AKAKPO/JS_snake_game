// Exécute la fonction quand la page est entièrement chargée
window.onload = function()
{
    var canvas;  // Déclare une variable pour stocker l'élément canvas
    var ctx;  // Déclare une variable pour stocker le contexte de dessin
    var delay = 1000;     // Définit le délai de rafraîchissement (en millisecondes)
    var xCoord = 0;   // Initialise la coordonnée X du rectangle à 0
    var yCoord = 0;  // Initialise la coordonnée Y du rectangle à 0

    init();   // Appelle la fonction d'initialisation
    function init() // Fonction qui initialise le canvas et démarre l'animation
    {       
        canvas = document.createElement('canvas');  // Crée un élément canvas dans le DOM
        canvas.width = 900; // Définit la largeur du canvas à 900 pixels
        canvas.height = 600; // Définit la hauteur du canvas à 600 pixels
        canvas.style.border = "1px solid";  // Ajoute une bordure au canvas pour le visualiser
        document.body.appendChild(canvas); // Ajoute le canvas au corps du document
        ctx = canvas.getContext('2d');  // Obtient le contexte de dessin 2D du canvas
        refreshCanvas();    // Appelle la fonction pour dessiner sur le canvas
    }

    function refreshCanvas()  // Fonction qui redessine le canvas à intervalles réguliers
    {
        xCoord += 2;  // Incrémente la coordonnée X de 2 pixels
        yCoord += 2;         // Incrémente la coordonnée Y de 2 pixels
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface tout le contenu du canvas
        ctx.fillStyle = "#ff0000";  // Définit la couleur de remplissage à rouge
        ctx.fillRect(xCoord, yCoord, 100, 50);  // Dessine un rectangle rouge aux coordonnées (xCoord, yCoord) avec une largeur de 100px et une hauteur de 50px
        setTimeout(refreshCanvas, delay);  // Programme le prochain rafraîchissement après le délai spécifié
    }
}