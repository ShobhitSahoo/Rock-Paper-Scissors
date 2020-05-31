var playerSelection, botSelection, wins, losses, result, playing, playerName;

playerName = window.prompt('Enter your name please: ')
document.querySelector('.player').textContent = playerName;

window.alert('Zoom out the screen for better experience! OR use desktop site option of chrome!');

const arenaText = document.querySelector('.arena-text');
const arena = document.querySelector('.arena');
const playerImage = document.querySelector('.player-selection');
const botImage = document.querySelector('.bot-selection');
const playerScore = document.querySelector('.player-score');
const botScore = document.querySelector('.bot-score');

wins = 0;
losses = 0;
resetGame();

//Getting the button played by user
var btns = Array.from(document.querySelectorAll('.btn'));
btns.forEach(btn => btn.addEventListener('click', play));

//For reseting the game
document.querySelector('.restart').addEventListener('click', resetGame);


function play(e) {
    if (playing) {
        //Bot plays his round
        botSelection = botPlays();
        //console.log('Bot selects ' + botSelection);

        //Get player's selection
        playerSelection = e.target.textContent;
        //console.log('Player selects ' + playerSelection);

        //Comparing both their selection
        result = playRound(playerSelection, botSelection);
        //console.log(result);

        document.querySelector('.' + playerSelection).classList.toggle('rotate');

        //Updating the scores and arena text field
        if (result === 'WIN') {
            wins += 1;
            updateArena(result, playerSelection, botSelection);
        } else if (result === 'LOSE') {
            losses += 1;
            updateArena(result, botSelection, playerSelection);
        } else {
            updateArena(result, 'none', 'none');
        }

        //Rotating animation for the image
        playerImage.classList.toggle('.rotate');
        botImage.classList.toggle('.rotate');

        //Updating the image
        updateImage(playerSelection, botSelection);

        //Updating the score
        playerScore.textContent = wins;
        botScore.textContent = losses;

        //Checking if anyone wins
        if (wins === 5 || losses === 5) {
            //End the game
            playing = false;
            endGame();
        }
    }

}


function resetGame(auto) {
    playing = true;
    wins = 0;
    losses = 0;
    if (auto !== 'auto') {
        playerImage.classList.toggle('.rotate');
        botImage.classList.toggle('.rotate');
    }

    arena.classList.remove('.game-over');
    playerScore.classList.remove('.game-over');
    botScore.classList.remove('.game-over');
    arenaText.classList.remove('.arena-active');
    arenaText.classList.add('.arena-text');
    arenaText.textContent = 'Make a move to being!!!';
    playerScore.textContent = wins;
    botScore.textContent = losses;
    updateImage('Waiting', 'Waiting');
}


function endGame() {
    //playing = false;
    arena.classList.add('.game-over');
    arenaText.innerHTML = arenaText.innerHTML + '<br>Game over!'

    if (wins === 5) {
        playerScore.classList.add('.game-over');
    } else {
        botScore.classList.add('.game-over');
    }
}


function updateImage(playerSelection, botSelection) {
    playerImage.src = 'images/' + playerSelection + '.png';
    botImage.src = 'images/' + botSelection + '.png';
}


function updateArena(res, winner, losser) {
    arenaText.classList.remove('.arena-text');
    arenaText.classList.add('.arena-active');

    if (res !== 'TIE') {
        arenaText.innerHTML = 'You ' + res + '! <br>' + winner + ' beats ' + losser;
        return;
    }
    arenaText.innerHTML = 'TIE! <br> Great minds think alike.';
    return;
}


function botPlays() {
    var botSelection1;
    var x = Math.floor(Math.random() * 3) + 1;
    if (x == 1) {
        botSelection1 = 'ROCK';
    } else if (x == 2) {
        botSelection1 = 'PAPER';
    } else {
        botSelection1 = 'SCISSORS';
    }
    return botSelection1;
}


function playRound(pSelect, bSelect) {
    switch (pSelect) {
        case 'ROCK':
            if (bSelect === 'PAPER') {
                return 'LOSE';
            } else if (bSelect === 'SCISSORS') {
                return 'WIN';
            }
            break;

        case 'PAPER':
            if (bSelect === 'ROCK') {
                return 'WIN';
            } else if (bSelect === 'SCISSORS') {
                return 'LOSE';
            }
            break;

        case 'SCISSORS':
            if (bSelect === 'PAPER') {
                return 'WIN';
            } else if (bSelect === 'ROCK') {
                return 'LOSE';
            }
            break;
    }
    return 'TIE';
}
