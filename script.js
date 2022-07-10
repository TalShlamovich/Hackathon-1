var game = document.querySelector('cards'); //the game itself (cards)
var cards = document.querySelectorAll('.card'); //collection of cards
var index = 0; //variable used to compare only two currently active cards
var card1; // active card 1
var card2;// active card 2
var flipped = document.getElementsByClassName('flipped'); //class used to mark flipped cards
var unflipTimeout; //used to slightly delay unflipping 
var restartTimeout; //used to let cards unflip before shuffling
var scoreTimeout; //used to make score appear with a slight delay
var sum = 700;// this and var a are used to calculate score. the first match is worth 700 pts, then 600 and so on
var a = 0;
var clap = 0; //used to make clapping sound when player found all pairs

//mix the cards
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function mix() {
    for (i = 0; i < cards.length; i++) {

        randomPos = arr[Math.floor(Math.random() * arr.length)];
        cards[i].style.order = randomPos;
        arr.splice(randomPos, 1);
    }
    cards.forEach(x => x.addEventListener('click', flip));
}
mix()


//add class flipped to a clicked card
function flip() {

    this.classList.add('flipped');

    compare();
}

//compare two flipped cards

function compare() {
    card1 = flipped[index];
    card2 = flipped[index + 1];

    //if matched then keep them flipped, change the class to matched and call disable cards function
    if (card1.className.split(" ")[1] === card2.className.split(" ")[1]) {

        clap++;
        blinkingScore()

        card1.classList.remove('flipped')
        card2.classList.remove('flipped')

        card1.classList.add('matched')
        card2.classList.add('matched')

        scoreTimeout = setTimeout(score, 700)
        disableCards();

        // clap when all pairs are found
        if (clap == 6) {
            document.getElementById('mySound').play();
        }
    }

    //if cards are not the same then call unflip function
    else if (card1.className.split(" ")[1] !== card2.className.split(" ")[1]) {
        cards.forEach(x => x.removeEventListener('click', flip));
        unflipTimeout = setTimeout(unflip, 800);

    }
}


//add score
function score() {
    a += sum
    document.querySelector("#score").innerText = a;
    
}

function blinkingScore() {
    let timesRun = 0
    let blinkScore = document.getElementById('blink')
    blinkScore.style.visibility = 'hidden'
    var blinkInterval = setInterval(function () {
        console.log(sum);
        blinkScore.innerText = '+ ' + sum
        blinkScore.style.visibility = (blinkScore.style.visibility == 'hidden' ? '' : 'hidden')
        if (timesRun === 5) {
            clearInterval(blinkInterval)
        }
        timesRun++
    }, 400)
    sum -= 100
}

//unflip the cards whn they do not match (remove flipped class)
function unflip() {

    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    cards.forEach(x => x.addEventListener('click', flip));

};

// make matched cards non-interactive
function disableCards() {
    card1.removeEventListener("click", flip);
    card2.removeEventListener("click", flip);

}

// restart button fires restartFun function
let btn = document.getElementById('start');
btn.addEventListener('click', restartFun);

//reset the score, remove flipped and matched classes
function restartFun() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('matched');
        cards[i].classList.remove('flipped');
        document.querySelector("#score").innerText = 0;
        a = 0;
        sum = 700;
    }
    restartTimeout = setTimeout(mix, 1000);
}





