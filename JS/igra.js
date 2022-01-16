// Varijable
let brojac = document.getElementById("brojac");
brojac.value = 7;
let score = document.getElementById("score");
score.value = 0;
let pravi = document.getElementById("pravi");
let ikonice = document.getElementById("ikonice");
let krivi = document.getElementById("krivi");
let kraj = document.getElementById("kraj");
let pobjeda = false;
let breakBrojac = 0;


// Arrays za generisanu kombinaciju i nas odabir
const nasInput = [];
const rjesenje = [];


// Functions ...
function generateCombination() {
    for (let i = 0; i < 4; i++) {
        let broj = Math.floor(Math.random()* 6);
        rjesenje.push(broj.toString());
    }
}


function compareArrays() {
    let naPravomMjestu = 0;
    let naKrivomMjestu = 0;

    for (let i = 0; i < rjesenje.length; i++) {
        if (rjesenje[i] === nasInput[i]) {
            naPravomMjestu +=1;
            nasInput[i] = -1;   // Mijenjamo vrijednost pronadjenog indeksa da ga ne racuna vise puta
        }
        else {
            for (let j = 0; j < rjesenje.length; j++) {
                if (rjesenje[i] === nasInput[j]) {
                    naKrivomMjestu +=1;
                    nasInput[j] = -1;    // Istu stvar radimo i ovdje        
                }
            }
        } 
    }
    if (naPravomMjestu === 4) {
        score.value += 100;
        score.innerText = score.value.toString();
        pobjeda = true;
    }
    else {
        score.value -= 10;
        if (score.value > 0) {      // Ovo radimo da nam ne prikazuje -10 npr na stranici 
            score.innerText = score.value.toString();
        }
    }
    // Ovdje namjestamo brojace na stranici i ispraznimo nasInput array
    brojac.value -= 1;
    brojac.innerText = brojac.value.toString();
    pravi.value = naPravomMjestu;
    pravi.innerText = pravi.value.toString();
    krivi.value = naKrivomMjestu;
    krivi.innerText = krivi.value.toString();
    nasInput.length = 0;
    btn.classList.toggle("show");
    gameCheck();
}


function showCards() {
    let meni = document.getElementById("meni");
    meni.classList.toggle("show");
}

// Na ovu funkciju sam posebno ponosan
function addToArray(i) {
    let num = document.getElementsByClassName("slika")[i].getAttribute("data-value");
    nasInput.push(num);
    meni.classList.toggle("show");
    showCombination(i);
    if (nasInput.length === 4) {
        let btn = document.getElementById("btn");
        btn.classList.toggle("show");
    }
}


function gameCheck() {
    if (brojac.value === 0) {
        kraj.classList.toggle("show");
    }
    else if (pobjeda === true) {
        rjesenje.length = 0;
        generateCombination();
        pobjeda = false;
    }
}

// Funkcija koja nam prikazuje zadnju nasu kombinaciju
function showCombination(i) {
    let img = document.createElement("img");
    let ikonice = document.getElementById("ikonice");
    img.src = document.getElementsByClassName("slika")[i].src;
    let breakline = document.createElement("br");
    ikonice.append(img);
    breakBrojac++;
    if (breakBrojac > 3) {
        ikonice.appendChild(breakline);    // Mocno bas, ovdje samo dodamo <br> jedan da nam iduca 4 znaka idu u novi red
        breakBrojac = 0;
    }
    // Klasa border-class kako bismo divu za ikonice dodali border tek nakon sto se unese prvi znak
    ikonice.classList.add("border-class");
}
