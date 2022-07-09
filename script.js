var game = document.querySelector('cards');
var cards = document.querySelectorAll('.card');
var index = 0;
var card1;
var card2;
var flipped = document.getElementsByClassName('flipped');
var unflipTimeout;
var hasFlippedCard = false;
var restartTimeout;
var scoreTimeout;
var sum = 700;
var a = 0;
var clap = 0;

// const audioObj = new Audio('tetris.mp3')
// this.sound = document.getElementById('tetris')
// this.sound.play()
// // if(this.sound.paused){
// //     this.sound.play()
// // }


let myPriceAudio = new Audio('tetris.mp3');

myPriceAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myPriceAudio.play();

// let myAudio = new Audio('audio.mp3')
// myAudio.play()
// document.getElementById('tetris').loop = true;
// setTimeout(() => {
//     document.getElementById('tetris').play();
//   }, 100)

// function myFunction() {
//     var x = document.getElementById("tetris").autoplay;
//     document.getElementById("demo").innerHTML = x;
//   }
//   myFunction()

// window.onload=function (){
//     document.getElementById('tetris').play();
// }

// document.getElementById('tetris').play()








  
//mix the cards

var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function mix() {
    for (i=0; i<cards.length; i++){
        
        randomPos = arr[Math.floor(Math.random() * arr.length)];
        cards[i].style.order = randomPos;
        arr.splice(randomPos, 1);
    }
    cards.forEach(x => x.addEventListener('click', flip));
}
mix()




//flip the card when clicked
// cards.forEach(x => x.addEventListener('click', flip));

function flip() {
    
    this.classList.add('flipped');

    compare();
}

//compare two flipped cards\


function compare() {
    card1 = flipped[index];
    card2 = flipped[index+1];
    if (card1.className.split(" ")[1] === card2.className.split(" ")[1]){
    
        clap++;


        card1.classList.remove('flipped')
        card2.classList.remove('flipped')

        card1.classList.add('matched')
        card2.classList.add('matched')

        scoreTimeout = setTimeout(score, 700)
        disableCards();

        // clap when win
        if (clap == 6) {
        document.getElementById('mySound').play();
        }
    }

    else if (card1.className.split(" ")[1] !== card2.className.split(" ")[1]){
        cards.forEach(x => x.removeEventListener('click', flip));
        unflipTimeout = setTimeout(unflip, 800);
       
    }

    
}

//unflip the cards whn they do not match

function unflip() {
    
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    cards.forEach(x => x.addEventListener('click', flip));
    
};

// what happends when cards match

function disableCards () {
    card1.removeEventListener("click", flip);
    card2.removeEventListener("click", flip);

}

// restart

let btn = document.getElementById('start');
btn.addEventListener('click',restartFun);



function restartFun() {
    for (let i = 0; i < cards.length; i++) {
     cards[i].classList.remove('matched')
     cards[i].classList.remove('flipped')
    }
    restartTimeout = setTimeout(mix, 1000);
}

//add score
function score() {
    a += sum
    document.querySelector("#score").innerText = a;
    sum -= 100
    
}


  
