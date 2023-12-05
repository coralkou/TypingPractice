var row_index = 1;
var total = 0;
var remain = 80;
var typed = 0;
var cur = '';
var index = 0;
var error = 0;

document.addEventListener('DOMContentLoaded', function(){
    //console.log("Welcome to typing page");
    load_view();    
});

document.addEventListener('click', event => {
    const element = event.target;
    //console.log("clicked");
    if (element.className === 'ops'){
        if (element.innerHTML === 'Cancel'){
            //console.log("Cancel");
            window.location.href = '/list/myList';
        }
        else {
            if (element.innerHTML === 'Go!'){
                element.innerHTML = 'Restart';
            }
            row_index = 1;
            remain = 80;
            typed = 0;
            index = 0;
            document.querySelector('#line').innerHMTL='';
            startTyping();
        }
    }
});



function handleKeyPress(event) {
    // Check if the pressed key is 'Enter' (key code 13)
    const sandboxItem = document.querySelector('#line');
    if (event.keyCode === 13) {
        console.log("Key 'Enter' pressed.");
        if (total === typed){
            console.log("Completed the whole document");
            document.removeEventListener("keydown", handleKeyPress);
            endTimer();
            recordScore();
            sandboxItem.innerHTML = '';
            const endMessage = document.createElement('h2');
            endMessage.innerHTML = "You did it! Don't forget to check your score.";
            sandboxItem.append(endMessage);
        }
        else if (remain === 0){
            sandboxItem.innerHTML = '';
            row_index += 1
            type_row(row_index);
        }
    }
    else {
        if (event.key === cur) {
            typed++;
            remain--;
            var letters = document.getElementById("line").querySelectorAll("span");
            letters[index].className = 'correct';
            index++;
            if (remain !== 0){
                letters[index].className = 'current';
                cur = letters[index].innerHTML;
            }
            document.querySelector('#typed').innerHTML = typed;

        }
        else {
            error++;
            document.querySelector('#error').innerHTML = error;
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
    const sandboxItem = document.querySelector('#line');
    var number = line.length;
    console.log(`There are ${number} charactors in this line`);
    remain = number;
    index = 0;
    console.log('Reset remain');
    for(var i = 0;i < number;i++){
        const charactor = document.createElement('span');
        charactor.innerHTML = line[i];
        if (i === 0){
            charactor.className = 'current';
            cur = line[i];
            console.log("First Charactor");
        }
        else {
            charactor.className = 'letter';
        }
        sandboxItem.append(charactor);        
    }
}

function startTimer(){
    console.log("start timer");
}

function endTimer(){
    console.log("end timer");
}

function recordScore(){
    console.log("score has been recorded");
}

function load_view(){
    document.querySelector('#keyboard').style.display = 'none';
    const content_section = document.querySelector('#content');
    document.querySelector('#sandbox').style.display='none';
    const totalItem = document.querySelector('#total');
    var row_index = 1;
    var cur_count = 0;
    docId = document.querySelector('.hidden').innerHTML;
    //console.log(docId);
    fetch('/read/'+ docId)
    .then(response => response.json())
    .then(lines => {
        //console.log(lines);
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
        //console.log("Reading document completed");
    })
}
