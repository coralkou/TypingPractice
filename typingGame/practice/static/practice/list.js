document.addEventListener('click', event => {
    const element = event.target;
    const parent = element.parentElement;
    const docId = parent.id;
    if (element.innerHTML === 'Edit'){
        //console.log("edit got clicked");
        window.location.href = '/edit/' + docId;
    }
    if (element.className === 'item') {
        //console.log("To start typing $`docId`");
        window.location.href = '/typing/' + docId;
    }
});