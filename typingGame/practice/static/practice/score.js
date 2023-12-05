// Sample array of numbers
var data = [10, 20, 30, 40, 50];

// Get the canvas element
var ctx = document.getElementById('myChart').getContext('2d');

// Create a line chart
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.map((_, index) => index + 1), // Assuming x-axis is index+1
        datasets: [{
            label: 'My Dataset',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});