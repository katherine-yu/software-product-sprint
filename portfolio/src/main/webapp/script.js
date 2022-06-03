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
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const facts =
      ["I'm left-handed.", "My right eye has 20/20 vision, while my left eye has 20/100 vision.", "My favorite flavor of ice cream is mint chocolate chip.", "I like to listen to the Beatles.", "My favorite color is purple.", "I want to visit Antarctica someday.", "I like to watch let's play videos of horror games."];

  // Pick a random greeting.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('random-fact-container');
  factContainer.innerText = fact;
}

/* Shows the previous image in the gallery. */
function previousImg() {
    const images = ["images/ico1.jpg", "images/ico2.jpg", "images/fountain.jpg", "images/palm-tree.jpg", "images/ice-cream.jpeg", "images/sunset.jpg"];

    idx = parseInt(document.querySelector('#galleryimg').dataset.idx);
    prev_idx = (idx - 1 + images.length) % images.length;
    document.querySelector('#galleryimg').src = images[prev_idx];
    document.querySelector('#galleryimg').dataset.idx = prev_idx;
}

/* Shows the next image in the gallery. */
function nextImg() {
    const images = ["images/ico1.jpg", "images/ico2.jpg", "images/fountain.jpg", "images/palm-tree.jpg", "images/ice-cream.jpeg", "images/sunset.jpg"];

    idx = parseInt(document.querySelector('#galleryimg').dataset.idx);
    console.log(idx + 1)
    next_idx = (idx + 1) % images.length;
    document.querySelector('#galleryimg').src = images[next_idx];
    document.querySelector('#galleryimg').dataset.idx = next_idx;
}

/* Shows or hides the Mandelbrot fractal. */
function selectMandelbrot() {
    if (document.querySelector('#fractal').src != "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mandelbrot_sequence_new.gif")
    {
        document.querySelector('#fractal').src = "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mandelbrot_sequence_new.gif";
        document.querySelector('#fractal').alt = "Mandelbrot set";
        document.querySelector('#fractal').style.visibility = "visible";
    }
    else
    {
        hideFractal();
    }
}

/* Shows or hides the Sierpinski fractal. */
function selectSierpinski() {
    if (document.querySelector('#fractal').src != "https://upload.wikimedia.org/wikipedia/commons/a/a9/Fractal_tree.gif")
    {
        document.querySelector('#fractal').src = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Fractal_tree.gif";
        document.querySelector('#fractal').alt = "Sierpinski gasket";
        document.querySelector('#fractal').style.visibility = "visible";
    }
    else
    {
        hideFractal();
    }
}

/* Shows or hides the Koch fractal. */
function selectKoch() {
    if (document.querySelector('#fractal').src != "https://upload.wikimedia.org/wikipedia/commons/f/fd/Von_Koch_curve.gif")
    {
        document.querySelector('#fractal').src = "https://upload.wikimedia.org/wikipedia/commons/f/fd/Von_Koch_curve.gif";
        document.querySelector('#fractal').alt = "Koch snowflake";
        document.querySelector('#fractal').style.visibility = "visible";
    }
    else
    {
        hideFractal();
    }
}

/* Hides the fractal. */
function hideFractal() {
    document.querySelector('#fractal').style.visibility = "hidden";
    document.querySelector('#fractal').src = "";
    document.querySelector('#fractal').alt = "";
}