var accuracylist = [];
var speedlist = [];
var plotted = false;
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#scoreTable').style.display = 'none';
    document.querySelector('#scoreGraph').style.display = 'none';
    document.querySelector('#showGraph').style.display = 'none';
    document.querySelector('#showTable').style.display = 'none';
    document.addEventListener('submit',(event) => addScoreTable(event));
    document.addEventListener('click', (event) => ToggleView(event));    
});


function addScoreTable(event){
    event.preventDefault();
    document.querySelector('#scoreTable').style.display = 'block';
    document.querySelector('#scoreGraph').style.display = 'none';
    document.querySelector('#showGraph').style.display = 'none';
    document.querySelector('#showTable').style.display = 'none';
    document.querySelector('#tableBody').innerHTML = ' ';
    speedlist = [];
    accuracylist =[];
    plotted = false;
    tableBody.innerHTML = '';
    title = document.getElementById("selectChoice").value;
    console.log(`${title} is being selected`);
    fetch('/obtainScore/' + title)
    .then(response => response.json())
    .then(scores => {
        if (scores.length === 0){
            document.querySelector('#tableBody').innerHTML='No scores yet';
        }
        else {
            scores.forEach(append_table);
        }
        console.log(`Speedlist is ${speedlist}`);
        console.log(`AccuracyList is ${accuracylist}`)
        document.querySelector('#showGraph').style.display = 'block';
    })
}

function append_table(score){
    const tableBody = document.querySelector('#tableBody');
    var tableRow = document.createElement('tr');
    var col1 = document.createElement('td');
    col1.innerHTML = score["timeStamp"];
    var col2 = document.createElement('td');
    col2.innerHTML = score["title"];
    var col2 = document.createElement('td');
    col2.innerHTML = score["title"];
    var col3 = document.createElement('td');
    col3.innerHTML = score["speed"] + "/min";
    speedlist.unshift(score["speed"]);
    var col4 = document.createElement('td');
    col4.innerHTML = score["accuracy"] + "%";
    accuracylist.unshift(score["accuracy"]);
    tableRow.append(col1);
    tableRow.append(col2);
    tableRow.append(col3);
    tableRow.append(col4);
    tableBody.append(tableRow);
}

function add_graph(){
    const canvas = document.getElementById('dotGraph');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw speed----------------------------------------------------------
    // Set up some basic styling
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'blue';
    ctx.font = '14px Arial'

    // Calculate the width of each dot
    const dotRadius = 3;
    const shift = 5
    const dotSpacing = (canvas.width - 6 * shift - dotRadius * 2) / (speedlist.length - 1);

    // Draw the line and dots with labels
    ctx.beginPath();
    for (let i = 0; i < speedlist.length; i++) {
        const x = i * dotSpacing + dotRadius + shift;
        const y = canvas.height - speedlist[i];

        // Draw the line
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Add data label
        if (speedlist.length < 20){
            ctx.fillStyle = 'black';
            ctx.fillText(speedlist[i]+'/min', x - 5, y - dotRadius - 5);
            ctx.fillStyle = 'blue';
        }
        
    }
    ctx.strokeStyle = '#0000ff';  // Line color
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(dotRadius + shift, canvas.height - speedlist[0]);  // Move to the first dot
    for (let i = 1; i < speedlist.length; i++) {
        const x = i * dotSpacing + dotRadius + shift;
        const y = canvas.height - speedlist[i];  // Adjust for scaling
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    //Draw Accuracy
    // Set up some basic styling
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'red';
    ctx.font = '14px Arial'

    // Draw the line and dots with labels
    ctx.beginPath();
    for (let i = 0; i < speedlist.length; i++) {
        const x = i * dotSpacing + dotRadius + shift;
        const y = canvas.height - accuracylist[i] * 2;

        // Draw the line
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Add data label
        if (speedlist.length < 20){
            ctx.fillStyle = 'black';
            ctx.fillText(accuracylist[i]+'%', x - 5, y - dotRadius - 5);
            ctx.fillStyle = 'red';
        }        
    }
    ctx.strokeStyle = '#FF4500';  // Line color
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(dotRadius + shift, canvas.height - accuracylist[0]*2);  // Move to the first dot
    for (let i = 1; i < speedlist.length; i++) {
        const x = i * dotSpacing + dotRadius + shift;
        const y = canvas.height - accuracylist[i] * 2;  // Adjust for scaling
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    //Draw x, y axis
    // Set up some basic styling
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();

    plotted = true;
}

function ToggleView(event){
    const item = event.target;
    if (item.id == "showGraph"){
        console.log("switched to graph view");
        document.querySelector('#scoreTable').style.display = 'none';
        document.querySelector('#scoreGraph').style.display = 'block';
        document.querySelector('#showGraph').style.display = 'none';
        document.querySelector('#showTable').style.display = 'block';
        if (!plotted){
            add_graph();
            console.log("graph added");
        }
    }
    if (item.id == "showTable"){
        console.log("switched to table view");
        document.querySelector('#scoreTable').style.display = 'block';
        document.querySelector('#scoreGraph').style.display = 'none';
        document.querySelector('#showGraph').style.display = 'block';
        document.querySelector('#showTable').style.display = 'none';
    }
}
    
