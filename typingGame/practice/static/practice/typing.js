var row_index = 1;
var total = 0;
var remain = 80;
var typed = 0;
var cur = '';
var index = 0;
var error = 0;
var curLine = '';
var timer;
var timerValue = 0;
var needShift = {
    "~": "``", "!": "1", "@": "2", "#": "3", "$": "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", "_":"-", "+": "=",
    "Q": "q", "W":"w", "E": "e", "R":"r", "T":"t", "Y": "y", "U": "u", "I": "i", "O": "o", "P": "p", "{": "[", "}":"]", "|":"\\",
    "A": "a", "S": "s", "D": "d", "F": "f", "G": "g", "H": "h", "J": "j", "K": "k", "L": "l", ":": ";", "\"": "'",
    "Z": "z", "X": "x", "C": "c", "V": "v", "B": "b", "N": "n", "M": "m", "<": ",", ">": ".", "?": "/"
}

document.addEventListener('DOMContentLoaded', function(){
    load_view();    
});

document.addEventListener('click', event => {
    const element = event.target;
    if (element.className === 'ops'){
        if (element.innerHTML === 'Cancel'){
            window.location.href = '/list/myList';
        }
        else {
            if (element.innerHTML === 'Go!'){
                element.innerHTML = 'Restart';
            }
            else {
                if (needShift[cur]){
                    document.getElementById(`${needShift[cur].charCodeAt(0)}`).className = "key";
                    document.querySelector(`#shift1`).className = "key";
                    document.querySelector(`#shift2`).className = "key";
                }
                else {
                    document.getElementById(`${cur.charCodeAt(0)}`).className = "key";            
                }
            }
            row_index = 1;
            remain = 80;
            typed = 0;
            index = 0;
            var lineItem = document.querySelector('#line');
            lineItem.innerHTML = '';
            startTyping();
        }
    }
});



function handleKeyPress(event) {
    // Check if the pressed key is 'Enter' (key code 13)
    var sound = document.getElementById("errorSound");
    const sandboxItem = document.querySelector('#line');
    if (event.keyCode === 13) {
        if (total === typed){
            document.getElementById('enter').className = "key";
            document.removeEventListener("keydown", handleKeyPress);
            endTimer();
            var finishSound = document.getElementById("finishSound");
            finishSound.play();
            recordScore();
            sandboxItem.innerHTML = '';
        }
        else if (remain === 0){
            sandboxItem.innerHTML = '';
            row_index += 1
            type_row(row_index);
        }
    }
    else {
        if (event.key === cur) {
            if (needShift[cur]){
                document.getElementById(`${needShift[cur].charCodeAt(0)}`).className = "key";
                document.querySelector(`#shift1`).className = "key";
                document.querySelector(`#shift2`).className = "key";
            }
            else {
                document.getElementById(`${cur.charCodeAt(0)}`).className = "key";            
            }            
            typed++;
            remain--;
            cur='';
            var letters = document.getElementById("line").querySelectorAll("span");
            letters[index].className = 'correct';
            index++;
            if (remain !== 0){
                letters[index].className = 'current';
                cur = curLine[index];
                if (needShift[cur]){
                    document.getElementById(`${needShift[cur].charCodeAt(0)}`).className = "key nextKey";
                    document.querySelector(`#shift1`).className = "key nextKey";
                    document.querySelector(`#shift2`).className = "key nextKey";
                }
                else {
                    document.getElementById(`${cur.charCodeAt(0)}`).className = "key nextKey";               
                }
            }
            else
            {
                document.getElementById('enter').className = "key nextKey";
            }
            document.querySelector('#typed').innerHTML = typed;
        }
        else {
            if (event.keyCode !== 16)
            {
                sound.play();
                error++;
                document.querySelector('#error').innerHTML = error;
            }
            
        }
    }
}

function startTyping(){
    document.querySelector('#content').style.display = 'none';
    document.querySelector('#keyboard').style.display = 'block';
    document.querySelector('#sandbox').style.display = 'block';
    startTimer();
    type_row(1);
    document.addEventListener("keydown", handleKeyPress);
}

function type_row(row_index){
    const row_id = 'row' + String(row_index);
    const line = document.querySelector(`#${row_id}`).innerHTML;
    var decoded = new DOMParser().parseFromString(line, "text/html").body.textContent;
    curLine = decoded;
    //console.log(`The decoded line in the sandbox is ${decoded}`);
    document.getElementById('enter').className = "key";
    const sandboxItem = document.querySelector('#line');
    var number = decoded.length;
    //console.log(`There are ${number} charactors in this line`);
    remain = number;
    index = 0;
    for(var i = 0;i < number;i++){
        const charactor = document.createElement('span');
        charactor.innerHTML = curLine[i];
        if (i === 0){
            charactor.className = 'current';
            cur = curLine[i];
            if (needShift[cur]){
                document.getElementById(`${needShift[cur].charCodeAt(0)}`).className = "key nextKey";
                document.querySelector(`#shift1`).className = "key nextKey";
                document.querySelector(`#shift2`).className = "key nextKey";
            }
            else {
                document.getElementById(`${cur.charCodeAt(0)}`).className = "key nextKey";
            }         
        }
        else {
            charactor.className = 'letter';
        }
        sandboxItem.append(charactor);        
    }
}

function startTimer(){
    //console.log("start timer");
    timerValue = 0;
    timer = setInterval(function() {
        timerValue++;
        var minutes = Math.floor(timerValue / 60);
        var remainingSeconds = timerValue % 60;
        var minutesString = minutes < 10 ? "0" + minutes : minutes;
        var secondsString = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
        document.getElementById('timer').innerText = minutesString + ":" + secondsString;
    }, 1000);
}


function endTimer(){
    clearInterval(timer);
    //console.log("end timer");
}

function recordScore(){
    var speed = Math.floor(total/timerValue*60);
    var accuracy = Math.floor((total - error)/total*100);
    title = document.querySelector('#title').innerHTML;
    const message = document.querySelector('#endMessage');
    message.innerHTML = `Finished! Average speed is ${speed}/min and the accuracy is ${accuracy}%.`;
    fetch('/recordScore', {
        method: 'POST',
        body: JSON.stringify({
            speed:speed,
            accuracy:accuracy,
            title:title
        })
    });
    console.log("Score recorded successfully");
}

function load_view(){
    document.querySelector('#keyboard').style.display = 'none';
    const content_section = document.querySelector('#content');
    document.querySelector('#sandbox').style.display='none';
    const totalItem = document.querySelector('#total');
    var row_index = 1;
    var cur_count = 0;
    docId = document.querySelector('.hidden').innerHTML;
    fetch('/read/'+ docId)
    .then(response => response.json())
    .then(lines => {
        console.log(lines);
        lines.forEach(function(line){
            const row = document.createElement('p');
            row.textContent = line;
            row.id = "row" + String(row_index);
            row_index++;
            cur_count += line.length;
            content_section.append(row);
        })
    })
    .then(() => {
        total = cur_count;
        totalItem.innerHTML = cur_count;
    })
}
