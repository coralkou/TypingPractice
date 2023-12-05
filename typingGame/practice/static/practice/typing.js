var lines = {{ lines }};
var content = document.getElementById('#content');
console.log(lines);
lines.forEach(function(value) {
var li = document.createElement('p');
li.appendChild(document.createTextNode(value));
    content.appendChild(li);
});


document.addEventListener('DOMContentLoaded', function(){
    //By default, filL-contents
    //console.log("page_loaded");
    get_texts();
    resetpage();
    //console.log("contents_filled");
    //No matter what being clicked, use dispatch to analysis the action needed to be taken. Including all the buttions and link
});

function get_texts(){
    const doc_name = document.querySelector('h1').innerHTML;
    fetch('/files/' + doc_name)
        .then(response => response.json())
        .then(text => {//use for each is better, so the response should be an array
        .then( () => {
            resetpage();
        })
}

function resetpage(){
    let minutes = 0;
    let seconds = 0;
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    function updateTimer() {
        document.getElementById('timer').innerText = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }
    function startTimer() {
        timerInterval = setInterval(function() {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateTimer();
        }, 1000);
    }
    function stopTimer() {
        clearInterval(timerInterval);
    }
    startTimer();
}

