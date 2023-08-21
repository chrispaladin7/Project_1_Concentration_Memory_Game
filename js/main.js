/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
const CARD_LOOKUP = [
    { img: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/442/AS__68652__03825.1681313264.png?c=1", matched: false },
    { img: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/123/446/KH__01216__30660.1681470474.png?c=1", matched: false },
    { img: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/80w/products/123/448/QD__14920__31462.1681313265.jpg?c=1", matched: false },
    { img: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/80w/products/123/447/JC__86231__74895.1681313265.jpg?c=1", matched: false },
    { img: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/80w/products/123/439/10H__11470__91447.1681313264.jpg?c=1", matched: false },
    { img: "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/80w/products/123/444/3C__99122__01407.1681313264.jpg?c=1", matched: false },

];

const CARD_BACK = "https://cdn11.bigcommerce.com/s-spem6oukby/images/stencil/1280x1280/products/118/398/purple_back__35358.1681245806.png?c=1";

/*----- state variables -----*/
let cards;
let firstCard;
let isNotFlipped;
let wrongNumChoices = 10;
let winner = null;
let matchedCards = 0;



/*----- cached elements  -----*/
const boardEl = document.getElementById("game-board");
const msgEl = document.querySelector('h2');



/*----- event listeners -----*/
document.querySelector("main").addEventListener("click", handleChoice);
document.querySelector("button").addEventListener("click", replayBoard);




/*----- functions -----*/

init();
handleChoice();
replayBoard();

function init() {
    cards = getShuffleCards();
    firstCard = null;
    isNotFlipped = false;
    msgEl.innerHTML = `Number of left Choice ${wrongNumChoices}`;
    render();

}

function replayBoard() {
    wrongNumChoices = 10;
    msgEl.innerHTML = `Number of left Choice ${wrongNumChoices}`;
    cards = getShuffleCards();
    document.querySelector("main").addEventListener("click", handleChoice);
    firstCard = null;
    isNotFlipped = false;
    winner = null;
    matchedCards = 0;
    render();

}

function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    if (isNaN(cardIdx) || isNotFlipped) return;
    const card = cards[cardIdx];
    if (firstCard) {
        if (firstCard.img === card.img) {
            firstCard.matched = card.matched = true;
            ++matchedCards;
        } else {

            if (wrongNumChoices <= 10 && wrongNumChoices > 1) {
                --wrongNumChoices;
                msgEl.innerHTML = `Number of left Choice ${wrongNumChoices}`;
                // winCondition();
            } else {
                for (let card of cards) {
                    card.matched = false;
                    msgEl.innerHTML = "Too Bad...Try Again";
                    wrongNumChoices = 0;
                    document.querySelector("main").removeEventListener("click", handleChoice);

                }
                matchedCards = 0;
            }
        }

        firstCard = null;

        console.log(wrongNumChoices);
        winCondition();
    } else {
        firstCard = card;

    };
    render();
}


function render() {
    cards.forEach(function (card, idx) {

        const imgEl = document.getElementById(`${idx}`);
        const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
        imgEl.src = src;
    });


};

function getShuffleCards() {
    let tempCard = [];
    let cards = [];
    for (let card of CARD_LOOKUP) {
        tempCard.push({ ...card }, { ...card });
    }

    while (tempCard.length) {
        let random = Math.floor(Math.random() * tempCard.length);
        let card = tempCard.splice(random, 1)[0];
        cards.push(card);
    }
    return cards;
}

function winCondition() {

    if (matchedCards === 6) {
        wrongNumChoices = 10;
        msgEl.innerHTML = "Congratulations, You Win!";
        cards = getShuffleCards();
        document.querySelector("main").addEventListener("click", handleChoice);
        firstCard = null;
        isNotFlipped = true;
        winner = null;
        matchedCards = 0;
        render();
    }


}


