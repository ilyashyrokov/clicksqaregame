let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false
let colors = ['red', 'blue', 'green', 'yellow', 'pink', 'violet', 'black', 'grey', 'turquoise', 'brown', 'beige', 'salmon', 'greenyellow', 'navy', 'coral', 'goldenrod' ]

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime)

function show($el){
$el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function randomColor(){
}

function startGame() {
score = 0
setGameTime()
$gameTime.setAttribute('disabled' , 'true')
isGameStarted = true
    console.log('Game started!')
    $game.style.backgroundColor = '#fff'
hide($start)
let interval = setInterval(function(){
    let time =parseFloat($time.textContent) 
if( time <= 0 ) {
    clearInterval(interval)
    endGame()
} else {
    $time.textContent = (time - 0.1).toFixed(1)
}
}, 100) 

renderBox()
}

function setGameScore() {
    $result.textContent= score.toString()
}

function setGameTime() {
    let time = +$gameTime.value 
    $time.textContent = time.toFixed(1)
    show($timeHeader)
hide($resultHeader)
}

function endGame() {
isGameStarted = false
setGameScore()
$gameTime.removeAttribute('disabled')
show($start)
$game.innerHTML = ''
$game.style.backgroundColor ='#ccc'
hide($timeHeader)
show($resultHeader)
}

function setRandomWidth(element) {
    let randomWidth = Math.floor(Math.random() * 61) + 20;
    element.style.width = randomWidth + 'px'
}

function setRandomHeight(element) {
    let randomHeight = Math.floor(Math.random() * 61) + 20;
    element.style.height  = randomHeight + 'px'
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function handleBoxClick(event){
    if (!isGameStarted) {
return
    }
if(event.target.dataset.box){
    score++
    renderBox() 
}
}

function renderBox() {
    $game.innerHTML = ''
let gameSize = $game.getBoundingClientRect()
console.log(gameSize)
let box = document.createElement('div')
let boxWidth = getRandom(15, 100)
box.style.width = boxWidth + 'px'
let boxHeight = getRandom(15, 100)
box.style.height = boxHeight + 'px'
box.style.position = 'absolute'
let randomColor = getRandom(0, colors.length)
box.style.backgroundColor = colors[randomColor]
let maxTop = gameSize.height - boxHeight 
box.style.top = getRandom(0, maxTop) + 'px'
let maxLeft = gameSize.width - boxWidth
box.style.left = getRandom(0, maxLeft) + 'px'
box.style.cursor = 'pointer'
box.setAttribute('data-box', 'true')

$game.insertAdjacentElement('afterbegin', box )
}
