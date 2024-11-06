// Få canvas og kontekst
const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

// Last inn bilbildene
const car1Img = new Image();
const car2Img = new Image();
let imagesLoaded = 0; // Sporer bildeinnlasting

car1Img.src = "./Car1.jpg"; // Pass på at banen er riktig
car2Img.src = "./car2.jpg"; // Pass på at banen er riktig

// Egenskaper for bilene
let car1 = { x: 0, y: 50, speed: 2 }; // Plasseres på y=50 for car1
let car2 = { x: 0, y: 150, speed: 2 }; // Plasseres på y=150 for car2
let raceInProgress = false;

// Øk `imagesLoaded` når hvert bilde lastes
car1Img.onload = checkImagesLoaded;
car2Img.onload = checkImagesLoaded;

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) { // Aktiver knappen når begge bildene er lastet
        document.getElementById("startButton").disabled = false;
    }
}

// Start knappens hendelse
document.getElementById("startButton").addEventListener("click", startRace);

function startRace() {
    if (raceInProgress) return; // Unngå å starte flere løp samtidig
    raceInProgress = true;
    car1.x = 0;  // Nullstill bilposisjoner
    car2.x = 0;
    car1.speed = 2 + Math.random(); // Tilfeldig hastighet
    car2.speed = 2 + Math.random();
    requestAnimationFrame(updateRace); // Start animasjonen
}

function updateRace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rens canvas

    // Tegn bilene med spesifisert bredde og høyde
    ctx.drawImage(car1Img, car1.x, car1.y, 80, 40); // Bredde og høyde for car1
    ctx.drawImage(car2Img, car2.x, car2.y, 80, 40); // Bredde og høyde for car2

    // Oppdater posisjoner
    car1.x += car1.speed;
    car2.x += car2.speed;

    // Sjekk for vinner
    if (car1.x + 80 >= canvas.width) { // Sjekk om car1 er utenfor ruten
        raceInProgress = false;
        alert("Car 1 wins!");
    } else if (car2.x + 80 >= canvas.width) { // Sjekk om car2 er utenfor ruten
        raceInProgress = false;
        alert("Car 2 wins!");
    } else {
        requestAnimationFrame(updateRace); // Fortsett løp
    }
}
