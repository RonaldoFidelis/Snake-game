const play_board = document.querySelector('.play-board');
let player_score = document.querySelector('.score');
let display_gameOver = document.querySelector('.game-over');
let score_gameOver = document.querySelector('.score-gameOver');
let btn_restart = document.querySelector('.restart-game');
let form = document.querySelector('.start-game');
let display_game = document.querySelector('.container');
let btn_start = document.querySelector('.btn-start');

// x = linha y = coluna
let apple_x, apple_y;
let snake_x = 5, snake_y = 5;
let snake_body = [0];
let move_x = 0, move_y = 0;
let score_init = 0;
let speed_base = 0;
let game_over = false;

function randomPositionApple() {
    apple_x = Math.floor(Math.random() * 30) + 1;
    apple_y = Math.floor(Math.random() * 30) + 1;
}

function keyPosition(e) {
    switch (e.key) {
        case "ArrowUp":
            move_x = 0
            move_y = -1
            break;
        case "ArrowDown":
            move_x = 0
            move_y = 1
            break;
        case "ArrowLeft":
            move_x = -1
            move_y = 0
            break;
        case "ArrowRight":
            move_x = 1
            move_y = 0
            break;
    }
}

function countScore() {
    score_init += 1;
    player_score.textContent = `${score_init}`;
};

function checkEatApple(sx, sy, ax, ay) {

    if (sx === ax && sy === ay) {
        randomPositionApple();
        countScore();
        return true;
    }

    return false;
}

function checkIfSnakeOutDisplay(sx, sy) {

    if (sx <= 0 || sy > 30 || sy <= 0 || sx > 30) {
        return true;
    }

    return false;
};

function checkHitBodySnake(x, sb) {

    if (x != 0 && sb[0][1] === sb[x][1] && sb[0][0] === sb[x][0]) {
        return true;
    }

    return false;
};

function endGame() {
    display_gameOver.style.display = 'flex';
    score_gameOver.textContent = `Você pegou ${score_init} maçãs.`;

    btn_restart.addEventListener('click', () => {
        display_gameOver.style.display = 'none';
        location.reload()
    })
};

function main() {
    if (game_over) {
        return endGame();
    };

    let initPosition = `<div class="apple" style="grid-area: ${apple_y} / ${apple_x}"></div>`;

    if (checkEatApple(snake_x, snake_y, apple_x, apple_y)) {
        snake_body.push([apple_x, apple_y]);
    }

    for (let i = snake_body.length - 1; i > 0; i--) {
        snake_body[i] = snake_body[i - 1];
    };

    //Posição inicial da cobra
    snake_body[0] = [snake_x, snake_y];

    //Atualizando a posição da cobra com base na velocidade
    snake_x += move_x;
    snake_y += move_y;

    if (checkIfSnakeOutDisplay(snake_x, snake_y)) {
        game_over = true;
    };

    for (let i = 0; i < snake_body.length; i++) {
        initPosition += `<div class="snake" style="grid-area: ${snake_body[i][1]} / ${snake_body[i][0]}"></div>`;
        if (checkHitBodySnake(i, snake_body)) {
            game_over = true;
        };
    }

    //Atrinbuindo a posição inicial no tabuleiro
    play_board.innerHTML = initPosition;
}

randomPositionApple();

btn_start.addEventListener('click', () => {
    console.log(document.querySelector('input[name="mod-game"]:checked').value);

    if (document.querySelector('input[name="mod-game"]:checked').value == 'Dificil'){
        form.style.display = 'none';
        display_game.style.display = 'flex';
        setInterval(main,100);
    } else if (document.querySelector('input[name="mod-game"]:checked').value == 'Normal'){
        form.style.display = 'none';
        display_game.style.display = 'flex';
        setInterval(main,135);
    } else if (document.querySelector('input[name="mod-game"]:checked').value == 'Fácil'){
        form.style.display = 'none';
        display_game.style.display = 'flex';
        setInterval(main,165);
    }else if (document.querySelector('input[name="mod-game"]:checked')){
        form.style.display = 'none';
        display_game.style.display = 'flex';
        setInterval(main,135);
    }
})

document.addEventListener('keydown', keyPosition);