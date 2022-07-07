var game = document.querySelector('cards');
var cards = document.querySelectorAll('.card');
var index = 0;
var card1;
var card2;
var flipped = document.getElementsByClassName('flipped');
var unflipTimeout;
var hasFlippedCard = false;




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

        card1.classList.remove('flipped')
        card2.classList.remove('flipped')

        card1.classList.add('matched')
        card2.classList.add('matched')

        disableCards()
        
        // console.log(index);
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
btn.addEventListener('click',function () {
    for (let i = 0; i < cards.length; i++) {
     cards[i].classList.remove('matched')
    }
    mix()
});