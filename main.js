const play_board = document.querySelector('.play-board');
let player_score = document.querySelector('.score');
let display_gameOver = document.querySelector('.game-over');
let score_gameOver = document.querySelector('.score-gameOver');
let btn_restart = document.querySelector('.restart-game');
let score_init = 0;
// x = linha y = coluna
let apple_x, apple_y;
let snake_x = 5, snake_y = 5;
let snake_body=[0];
let move_x = 0, move_y = 0;
let speed_base = 110;
let game_over = false;
let set_interval;

function randomPositionApple (){
    apple_x = Math.floor(Math.random () * 30) + 1;
    apple_y = Math.floor(Math.random () * 30) + 1;
}

function keyPosition(e) {
    switch(e.key){
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

function endGame(){
    display_gameOver.style.display = 'flex';
    score_gameOver.textContent = `Você pegou ${score_init} maçãs.`;

    btn_restart.addEventListener('click', () => {
        display_gameOver.style.display = 'none';
        location.reload()
    })
};

function countScore(){
    score_init +=1;
    player_score.textContent = `${score_init}`;
};


function main() {
    if (game_over) {
        return endGame();
    };

    let initPosition = `<div class="apple" style="grid-area: ${apple_y} / ${apple_x}"></div>`;

    //Verificando se a cobra comeu a maçã
    if(snake_x === apple_x && snake_y === apple_y){
        snake_body.push([apple_x, apple_y])
        randomPositionApple();
        countScore();
    }

    for (let i = snake_body.length - 1; i > 0; i--){
        snake_body[i] = snake_body[i-1];
    };

    //Posição inicial da cobra
    snake_body[0] = [snake_x, snake_y];
    //Atualizando a posição da cobra com base na velocidade
    snake_x += move_x;
    snake_y += move_y;

    //condição para para gameover

    if(snake_x <= 0 || snake_y > 30 || snake_y <= 0 || snake_x > 30){
        game_over = true;
    }

    for(let i = 0; i < snake_body.length; i++){
        initPosition += `<div class="snake" style="grid-area: ${snake_body[i][1]} / ${snake_body[i][0]}"></div>`;

        if(i != 0 && snake_body[0][1] === snake_body[i][1] && snake_body[0][0] === snake_body[i][0]){
            game_over = true;
        }
    }
    //Atrinbuindo a posição inicial no tabuleiro
    play_board.innerHTML = initPosition;
    
}

randomPositionApple();
set_interval = setInterval(main,speed_base);
//Capturando o evento de pressionar uma tecla
document.addEventListener('keydown', keyPosition);