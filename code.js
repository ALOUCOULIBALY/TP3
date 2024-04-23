// création du contrôle d'échelle
var scale = new maplibregl.ScaleControl({
    unit: 'metric' // utilisation de l'unité métrique
});

map.addControl(scale, 'bottom-left'); // ajout du contrôle en bas à gauche de la carte

// création du contrôle de géolocalisation
var geolocateControl = new maplibregl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true // activation de la géolocalisation précise
    },
    trackUserLocation: true // suivi automatique de la position de l'utilisateur
})

map.addControl(geolocateControl, 'bottom-right'); // ajout du contrôle en bas à droite de la carte
// création du contrôle de navigation
var nav = new maplibregl.NavigationControl({
    showCompass: true, // affichage de la boussole
    showZoom: true, // affichage des boutons de zoom
    visualizePitch: true // affichage de l'angle d'inclinaison
});
map.addControl(nav, 'bottom-right'); // ajout du contrôle en bas à droite de la carte

/**
 * Fonction qui génère une couleur aléatoire en format hexadécimal.
 * @returns {string} Couleur générée au format hexadécimal.
 */
function getRandomColor() {
    // Définition des caractères hexadécimaux possibles
    var letters = '0123456789ABCDEF';
    // Initialisation de la couleur avec le préfixe hexadécimal (#)
    var color = '#';
    // Boucle pour générer chaque caractère de la couleur (6 caractères)
    for (var i = 0; i < 6; i++) {
        // Sélection aléatoire d'un caractère hexadécimal
        color += letters[Math.floor(Math.random() * 16)];
    }
    // Retourne la couleur générée au format hexadécimal
    return color;
}


// Fonction qui charge une couche WFS depuis pgFeatureServ et l'ajoute à la carte MapLibre.
// ajout de source et de couche de la carte
function loadWFS() {
    // ajout de la source des données indice de niveau de vie 
    map.addSource('indice_niveau_de_vie-source', {
        type: 'vector', // https://maplibre.org/maplibre-style-spec/sources/
        tiles: ['https://congenial-dollop-v66x4575v6gr3pgx5-8801.app.github.dev/CA691970.indice_niveau_de_vie/{z}/{x}/{y}.pbf'] // URL dU Polygone 
    })
    // ajout de la couche des indices de niveau de vie 
    map.addLayer({
        'id': 'indice_niveau_de_vie', // identifiant de la couche
        'type': 'fill', // type de géométrie de la couche
        'source': 'indice_niveau_de_vie-source', // source des données de la couche
        'source-layer': 'CA691970.indice_niveau_de_vie', // source des données de la couche (id dans le JSON de pgtileserv), majoritairement nomduschema.nomdelatable
        'paint': {
            'fill-color': [  // Définition de la couleur de remplissage
            'interpolate',  // Utilisation de la fonction interpolate pour créer un dégradé de couleur
             ['linear'],  // Spécification de l'interpolation linéaire
             ['get', 'indice_emv'],  // Récupération de la valeur de la propriété 'acp_enviro' de la couche
              
              2, 'rgb(0,128,0)',// Pour une valeur de 2 de 'indice_emv', utiliser la couleur vert (RGB 0, 128, 0)
            
              4,'rgb(255,144,0)',// Pour une valeur de 4 de 'indice_emv', utiliser la couleur Rouge orange(RGB 255, 144, 0)

              6, 'rgb(139,0,0)',// Pour une valeur de 4 de 'indice_emv', utiliser la couleur Rouge foncé (RGB 139, 0, 0)

            ],
            'fill-opacity': 0.7 // Définition de l'opacité de remplissage à 0.7 (70%)
       }

    });
}
// Écouteur d'événement pour le bouton de chargerlacouche
document
  .getElementById('loadWFS') // id unique du bouton
  .addEventListener('click', loadWFS); // ajoute un event de type click qui lance la fonction chargerlacouche()
// Fonction qui charge une couche WFS depuis pgFeatureServ et l'ajoute à la carte MapLibre.
// ajout de source et de couche de la carte
  function load() {
    // ajout de la source des données arrondissements
    map.addSource('arrondissements-source', {
        type: 'vector', // https://maplibre.org/maplibre-style-spec/sources/
        tiles: ['https://congenial-dollop-v66x4575v6gr3pgx5-8801.app.github.dev/geo7630.arrondissements/{z}/{x}/{y}.pbf'] // URL dU Polygone 
    })
    // ajout de la couche des arrondissements 
    map.addLayer({
        'id': 'arrondissements', // identifiant de la couche
        'type': 'fill', // type de géométrie de la couche
        'source': 'arrondissements-source', // source des données de la couche
        'source-layer': 'geo7630.arrondissements', // source des données de la couche (id dans le JSON de pgtileserv), majoritairement nomduschema.nomdelatable
        'paint': {
            'fill-color': getRandomColor(),// couleur de remplissage
            'fill-opacity':0.5 // définition de l'opacité de remplissage
       }
    });
}
// Écouteur d'événement pour le bouton de chargerlacouche
document
  .getElementById('load') // id unique du bouton
  .addEventListener('click', load); 

// Fonction qui charge une couche VTS depuis pgFeatureServ et l'ajoute à la carte MapLibre.
// ajout de source et de couche de la carte
function loadVTS() {
    // ajout de la source des données contour_polygones 
    map.addSource('contour_polygones-source', {
        type: 'vector', // https://maplibre.org/maplibre-style-spec/sources/
        tiles: ['https://congenial-dollop-v66x4575v6gr3pgx5-8801.app.github.dev/CA691970.contour_polygones/{z}/{x}/{y}.pbf'] // URL du tuile vectorielle 
    })
    // ajout de la couche contour_polygones
    map.addLayer({
        'id': 'contour_polygones', // identifiant de la couche
        'type': 'fill', // type de géométrie de la couche
        'source': 'contour_polygones-source', // source des données de la couche
        'source-layer': 'CA691970.contour_polygones', // source des données de la couche (id dans le JSON de pgtileserv), majoritairement nomduschema.nomdelatable
        'paint': {  'fill-color': [  // Définition de la couleur de remplissage
             'interpolate',  // Utilisation de la fonction interpolate pour créer un dégradé de couleur
             ['linear'],  // Spécification de l'interpolation linéaire
             ['get', '_elevation'],  // Récupération de la valeur de la propriété 'acp_enviro' de la couche
              50, 'rgb(250,105,180)',// Pour une valeur de 50 de 'elevation', utiliser la couleur rose vif (RGB 250, 105, 180)
              75,'rgb(0,0,128)',// Pour une valeur de 75 de 'elevation', utiliser la couleur beige(RGB 0, 0, 128)
              100, 'rgb(210,105,30)',// Pour une valeur de 4 de 'elevation', utiliser la couleur chocolat (RGB 210, 105, 30)
           ],
    'fill-opacity': 0.5 // Définition de l'opacité de remplissage à 0.5 (50%)
       }
    });
}
// Écouteur d'événement pour le bouton de chargerlacouche
document
  .getElementById('loadVTS') // id unique du bouton
  .addEventListener('click', loadVTS); // ajoute un event de type click qui lance la fonction chargerlacouche()

// Fonction qui charge une couche LIDAR depuis pgFeatureServ et l'ajoute à la carte MapLibre.
// ajout de source et de couche de la carte
function loadLIDAR() {
    // ajout de la source des données indice de niveau de vie 
    map.addSource('nuage_de_points-source', {
        type: 'vector', // https://maplibre.org/maplibre-style-spec/sources/
        tiles: ['https://congenial-dollop-v66x4575v6gr3pgx5-8801.app.github.dev/CA691970.nuage_de_points/{z}/{x}/{y}.pbf'] // URL du nuage de points
    })
    // ajout de la couche des nuages de points 
    map.addLayer({
        'id': 'nuage_de_points', // identifiant de la couche
        'type': 'circle', // type de géométrie de la couche
        'source': 'nuage_de_points-source', // source des données de la couche
        'source-layer': 'CA691970.nuage_de_points', // source des données de la couche (id dans le JSON de pgtileserv), majoritairement nomduschema.nomdelatable
        'paint': {
            'circle-color': [ 'step',                // Utilise la fonction step pour définir des paliers
              ['get', '_elevation'], // Récupère la propriété '_elevation' des données
                // Définit les étapes de couleur pour le cercle
                '#51bbd6',              // Si '_elevation' est inférieur à 100, utilise la couleur #51bbd6
                100,                      // À 100 points, utilise la couleur #f1f075
                '#f1f075',              // Si '_elevation' est inférieur à 200, utilise la couleur #f1f075
                200,                     // À 200 points, utilise la couleur #f28cb1
                '#f28cb1'               // Si '_elevation' est supérieur ou égal à 200, utilise la couleur #f28cb1
            ],
            'circle-opacity': 0.7, // Définition de l'opacité de remplissage des points à 0.7 (70%)
            'circle-radius': 3, // Rayon des points
            'circle-stroke-color': '#fff'       // Couleur de la bordure des points
       }

    });
}
// Écouteur d'événement pour le bouton de chargerlacouche
document
  .getElementById('loadLIDAR') // id unique du bouton
  .addEventListener('click', loadLIDAR); // ajoute un event de type click qui lance la fonction chargerlacouche()

//crée une animation des données loadVTS quand on clique sur le bouton Animation 

function anime() {
  var elem = document.getElementById("loadWFS"); 
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 200) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.left = pos + 'px'; 
    }
  }
}



