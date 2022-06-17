// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Global variables.
 * Idea from: https://stackoverflow.com/a/2613534
 */
globals = {
    images: [
      "images/ico1.jpg",
      "images/ico2.jpg",
      "images/fountain.jpg",
      "images/palm-tree.jpg",
      "images/ice-cream.jpeg",
      "images/sunset.jpg"
    ],

    images_alts: [
      "origami icosahedron",
      "origami icosahedron",
      "fountain",
      "palm tree",
      "ice cream",
      "sunset"
    ],

    gallery_idx: 0,

    fractals: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mandelbrot_sequence_new.gif",
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Fractal_tree.gif",
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Von_Koch_curve.gif"
    ],
        
    fractal_alts: [
      "Mandelbrot set",
      "Sierpinski gasket",
      "Koch snowflake"
    ]
}

/**
 * Add event listeners.
 * Idea from: https://stackoverflow.com/a/56992424
 */
window.addEventListener('DOMContentLoaded', function(){
  document.getElementById("prev-img").addEventListener("click", function(){ previousImg(); });
  document.getElementById("next-img").addEventListener("click", function(){ nextImg(); });
  document.getElementById("mandelbrot").addEventListener("click", function(){ selectFractal(0); });
  document.getElementById("sierpinski").addEventListener("click", function(){ selectFractal(1); });
  document.getElementById("koch").addEventListener("click", function(){ selectFractal(2); });
});

/** Functions to execute on load. */
window.onload = function() {
  this.createMap();
  this.googleTranslateElementInit();
}

/**
 * Adds a random greeting to the page.
 */
async function addRandomGreeting() {
  const responseFromServer = await fetch('/random-facts');
  const facts = await responseFromServer.json();

  // Pick a random greeting.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('random-fact-container');
  factContainer.innerText = fact;
}

/**
 * Shows the previous image in the gallery. 
 */
function previousImg() {
    globals.gallery_idx = (globals.gallery_idx - 1 + globals.images.length) % globals.images.length;
    document.querySelector('#galleryimg').src = globals.images[globals.gallery_idx];
    document.querySelector('#galleryimg').alt = globals.images_alts[globals.gallery_idx];
}

/**
 * Shows the next image in the gallery.
 */
function nextImg() {
    globals.gallery_idx = (globals.gallery_idx + 1) % globals.images.length;
    document.querySelector('#galleryimg').src = globals.images[globals.gallery_idx];
    document.querySelector('#galleryimg').alt = globals.images_alts[globals.gallery_idx];
}

/**
 * Shows or hides the selected fractal.
 */
function selectFractal(idx) {
    if (document.querySelector('#fractal').src != globals.fractals[idx])
    {
        document.querySelector('#fractal').src = globals.fractals[idx]
        document.querySelector('#fractal').alt = globals.fractal_alts[idx]
        document.querySelector('#fractal').style.visibility = "visible";
    }
    else
    {
        document.querySelector('#fractal').style.visibility = "hidden";
        document.querySelector('#fractal').src = "";
        document.querySelector('#fractal').alt = "";
    }
}

/**
 * Initializes the map.
 */
function createMap() {
    const map = new google.maps.Map(
        document.getElementById('map_'),
        {center: {lat: 37.42786582988798, lng: -122.17018205695274}, zoom: 15}
    );
  
    addLandmark(
        map, 37.423818732889465, -122.16999966670419, 'Braun Music Center',
        'Braun Music Center, where I have music lessons and practice violin.');
    addLandmark(
        map, 37.42536091564845, -122.17497784665066, 'Meier Hall',
        'Meier Hall, which is where I\'m staying this summer.');
    addLandmark(
        map, 37.42889673964776, -122.17127639814106, 'Sloan Hall',
        'Sloan Hall, which is where the math department is.');
    addLandmark(
        map, 37.43017401370724, -122.17335176017816, 'Gates',
        'The Gates building, which is where the CS department is.');
    addLandmark(
        map, 37.43218463852577, -122.16613125345735, 'Bing Concert Hall',
        'Bing Concert Hall, where you can watch concerts and where the orchestra performs.');
    addLandmark(
        map, 37.42792903609415, -122.1743709993509, 'Huang Engineering Center',
        'Huang Engineering Center, a nice place to work at night.');
    addLandmark(
        map, 37.42518555657497, -122.17049788943241, 'The Axe & Palm',
        'The Axe & Palm (TAP), a place to get food.');
}
  
/**
 * Adds a marker that shows an info window when clicked.
 */
function addLandmark(map, lat, lng, title, description) {
    const marker = new google.maps.Marker({position: {lat: lat, lng: lng}, map: map, title: title});
  
    const infoWindow = new google.maps.InfoWindow({content: description});
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

/**
 * Initializes the Google Translate element.
 * Source: https://www.w3schools.com/howto/howto_google_translate.asp
 */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    'google_translate_element');
}
