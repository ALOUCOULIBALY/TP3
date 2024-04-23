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
map.addControl(nav, 'bottom-right'); // ajout du contrôle en haut à droite de la carte

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
             ['get', 'acp_enviro'],  // Récupération de la valeur de la propriété 'acp_enviro' de la couche
              0, 'rgb(255, 255, 255)', // Pour une valeur de 0 de 'acp_enviro', utiliser la couleur blanche (RGB 255, 255, 255)
              1, 'rgb(0, 0, 255)' // Pour une valeur de 1 de 'acp_enviro', utiliser la couleur bleue (RGB 0, 0, 255) 
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
        'paint': {
            'fill-color':'red', // Définition de la couleur de remplissage
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
            'circle-color': '#11b4da',  // Couleur des points non regroupés
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

//crée une animation des données loadWFS quand on clique sur le bouton Animation 

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



