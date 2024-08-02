showNotes();
//if a user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text:  addTxt.value,
        stared: false,
    }

    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    // console.log(notesObj);

    showNotes();
    
});



// Function to show notes from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        let stared = element.stared;
        let cardBgCss;
        let starHtml;
        let starTitle;
		let starColor;
        let cardTextColor;
        if(stared == true){
             cardBgCss = "background-color: yellow";
             cardTextColor = "black";
             starHtml = "&starf;";
             starTitle = "Unstar";
			 starColor = "blue";
        }else{
             cardBgCss = "background-color: white";
             starHtml = "&star;";
             starTitle = "Star";
			 starColor = "black";
             cardTextColor = "black";

        }

        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem; ${cardBgCss}; color:${cardTextColor};">
        <div class="card-body">
            <h5 class="card-title">${element.title}<span id="star-${index}" title="${starTitle}" style="position:absolute; top:5px; right:10px; cursor:pointer; color:${starColor}; " onclick="markImportant(this.id)">${starHtml}</span></h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
    </div>
        
        `;
    });

    let notesElm = document.getElementById('notes');

    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No notes to show! Use Add a note section above to add notes`;
    }


}



// Function to delete a note

function deleteNote(index) {
    // console.log("I am deleting ", index)
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    
}


let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log("input event fires", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        // console.log(cardTitle);
        if (cardTitle.includes(inputVal) ||cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});




//////////////////////////////////////////.............................//////////////




/*
Further features

1.Add Title
2.Mark a note as important
3. separate notes for each user
4. Sync and host to a web server


*/



function markImportant(starid){
    let notes = localStorage.getItem('notes');
    if(notes== null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    let index = starid.substr(5);
    let markedObj = notesObj[index];
    let stared = markedObj.stared;
    if(stared== true){
        markedObj.stared = false;
    }else{
        markedObj.stared = true;
    }

    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}







