function addElement(){
    var inputValue = document.getElementById("newItemText").value.trim();
    var inputDate = document.getElementById("date").value;
    if(inputValue=="" || inputValue.length<3 || inputValue.length>255){
        alert("Niepoprawna długość tekstu\nDługość tekstu musi zawierać się w przedziale <3, 255>");
        return;
    }
    
    if(inputDate!="" && Date.parse(inputDate)<(Date.now()-86400000)){
        alert("Data musi być większa od dzisiaj");
        return;
    }

    id = Date.now();
    newListEl(inputValue,inputDate,id);
    var task = {
        text: inputValue,
        date: inputDate
    } 
    localStorage.setItem(id, JSON.stringify(task));
    document.getElementById("newItemText").value = "";
    document.getElementById("date").value = "";
}



function newListEl(inText, inDate, id) {
    //wiersz tabeli
    var row = document.createElement("tr");
    row.id = id;
    
    //kolumna z tekstem
    var cellText = document.createElement("td");
    cellText.className = "firstCol";
    cellText.setAttribute("onfocusout", "editEl("+id+")");
    cellText.setAttribute("contenteditable", "true");
    var text = document.createTextNode(inText);
    cellText.appendChild(text);
    row.appendChild(cellText);
    
    //kolumna z datą
    var cellDate = document.createElement("td");
    var date = document.createTextNode(inDate);
    cellDate.appendChild(date);
    row.appendChild(cellDate);

    //kolumna z przyciskiem
    const cellBtn = document.createElement("td");

    //przycisk
    var btn = document.createElement("button");
    btn.className = "btnDel";
    btn.setAttribute("onclick", "delEl("+id+")");
    var btnText = document.createTextNode("Usuń");
    btn.appendChild(btnText)
    cellBtn.appendChild(btn);
    row.appendChild(cellBtn);

    document.getElementById("tasks").appendChild(row);
}

function delEl(id){
    var elem = document.getElementById(id).style.display="none";
    localStorage.removeItem(id);
}


function showAll(){
    var items = { ...localStorage };
    for(var i in items){
        let elem = JSON.parse(localStorage.getItem(i));
        newListEl(elem['text'],elem['date'],i);
    }
}

function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search').value;
    if(input.length<3){
        return;
    }
    filter = input.toUpperCase();
    table = document.getElementById("tasks");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                td.innerHTML = txtValue.replace(input,"<mark>"+input+"</mark>");
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function editEl(id){
    var elem = document.getElementById(id).firstChild;

    var newText = elem.textContent || elem.innerText;
    var storageElement = localStorage.getItem(id);
    storageElement = JSON.parse(storageElement)
    
    if(newText=="" || newText.length<3 || newText.length>255){
        // jeżeli niepoprawny input to przywracamy poprzedni tekst;
        alert("Niepoprawna długość tekstu\nDługość tekstu musi zawierać się w przedziale <3, 255>");
        oldText = storageElement['text'];
        elem.textContent = oldText;
        return;
    }
    
    //nadpisanie tekstu w localStorage
    storageElement['text'] = newText;
    localStorage.setItem(id, JSON.stringify(storageElement));
}