const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE =20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const enteredValue = prompt('Maximum life for you and the monster ', '100');

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_PLAYER_GAME_OVER = 'PLAYER_GAME_OVER';

let chosenMaxLife = parseInt(enteredValue);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

if(isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}
adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
    const damage = dealMonsterDamage(mode);
    currentMonsterHealth -= damage;
    endRound();
}

function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    const intialPlayerHealth = currentPlayerHealth;
    currentPlayerHealth -= playerDamage;
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('you won!');
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        if(hasBonusLife){
            removeBonusLife();
            hasBonusLife = false;
            currentPlayerHealth = intialPlayerHealth;
            alert('you would have died! The bonus life saved you from death');
            return;
        }
        alert('you lost!');
    }else if(currentPlayerHealth<=0 && currentMonsterHealth <= 0) {
        alert('Draw');
    }

    if(currentPlayerHealth <=0 || currentMonsterHealth <=0) {
        reset();
    }
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if(ev === PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    } else if(ev === PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER';
    } else if(ev === MONSTER_ATTACK){
        logEntry.target = 'PLAYER';
    } else if(ev === PLAYER_HEAL){
        logEntry.target = 'PLAYER'
    } else if(ev === PLAYER_GAME_OVER){
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }
    battleLog.push(logEntry);
}

function attackHandler() {
    attackMonster(ATTACK_VALUE);
}

function strongAttackHandler() {
   attackMonster(STRONG_ATTACK_VALUE);
}

function healPlayerHandler() {
    let healValue;

    if(currentPlayerHealth >= chosenMaxLife-HEAL_VALUE){
        alert('you cannot heal more than your chosen max health');
        healValue = chosenMaxLife-currentPlayerHealth;
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue; 
    endRound();
}

function printLogHandler(){
    console.log(battleLog);
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);
