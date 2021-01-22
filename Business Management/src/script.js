var phoneDBElements = 0;
var currentPage = 1;
var deleteModeActive = false;

const UpdateCurrentPage = (page) =>{
    // Set the current page for other functions
    currentPage = page;
}

function TableElement_OnClick(){
    // Return if window or if delete mode is active
    if(this != window && deleteModeActive == false){
        switch (currentPage){
            case 1:
                // Phones
                const phoneTable = document.getElementsByClassName('phone-table-body')[0];
    
                if(this.classList.contains('tr-active')){
                    // Second Click
                    this.classList.remove('tr-active');
                    // Dissable Edit Mode
                    let editModeSelection = document.getElementById('collapse4');
                    editModeSelection.style.display = "none";
    
                    // Update Background Color
                    let selectedBackgroundColor = "rgb(108, 117, 125)";
                    this.style.backgroundColor = "transparent";
                    this.addEventListener('mouseover', function(){
                        if(this.style.backgroundColor != selectedBackgroundColor){
                            this.style.backgroundColor ="#e4e4e4";
                        }
                    });
                    this.addEventListener('mouseout', function(){
                        if(this.style.backgroundColor != selectedBackgroundColor){
                            this.style.backgroundColor = "transparent";
                        }
                    });
                    return;
                } else {
                    // First Click
                    // Add active class
                    for(let c = 0; c < phoneTable.childElementCount; c++){
                        if(phoneTable.children[c].classList.contains('tr-active')){
                            phoneTable.children[c].classList.remove('tr-active');
                        }
                    }
                    this.classList.add('tr-active');
                }
    
                // Activate Edit Mode
                let editModeSelection = document.getElementById('collapse4');
                editModeSelection.style.display = "flex";
                
    
                // Update Background Color
                let selectedBackgroundColor = "rgb(108, 117, 125)";
                for(j = 0; j < phoneTable.childElementCount; j++){
                    if(phoneTable.children[j].style.backgroundColor == selectedBackgroundColor){
                        phoneTable.children[j].style.backgroundColor = "transparent";
                        phoneTable.children[j].addEventListener('mouseover', function(){
                            if(this.style.backgroundColor != selectedBackgroundColor){
                                this.style.backgroundColor ="#e4e4e4";
                            }
                        });
                        phoneTable.children[j].addEventListener('mouseout', function(){
                            if(this.style.backgroundColor != selectedBackgroundColor){
                                this.style.backgroundColor = "transparent";
                            }
                        });
                    }
                }
                this.style.backgroundColor = selectedBackgroundColor;
    
                // Update Forms
                let innerTextArray = this.innerText.split('\t');
                for(let i = 1; i <= 12; i++){
                    // 8 is the index for the radio
                    if(i == 8){
                        var isYes = (innerTextArray[7] == "Yes") ? true : false;
                        var yes = document.getElementsByClassName('radio-yes')[0];
                        var no = document.getElementsByClassName('radio-no')[0];
                        if(isYes){
                            yes.checked = true;
                            no.checked = false;
                        } else if(!isYes){
                            no.checked = true;
                            yes.checked = false;
                        }
                    } else {
                        // Every other index, put content in text box
                        let formInput = `phoneInput${i}`;
                        let inputID = document.getElementById(formInput);
                        inputID.value = innerTextArray[i-1].toString();
                    }
                    
                }
                break;
            case 2:
                // Keys
                break;
            case 3:
                // Accounts
                break;
            case 4:
                // Maintenance
                break;
            default:
                console.log("Error | Table Element {Current Page Not Found}");
                break;
        }
    }
}

const FillTable = () =>{
    // This is a temp function, will be removed when tables can be added via DB query
    let numElements = 100;
    phoneDBElements = numElements;
    for(let j = 0; j < numElements; j++){
        var row = document.createElement('tr');
        let phoneNumStart = Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString();
        let phoneNumEnd = Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString();
        let phoneNum = phoneNumStart +'-'+ phoneNumEnd;
        for(let i = 0; i < 12; i++){
            var cell = document.createElement('td');
            if(i == 0){
                // first element
                cell.style.fontWeight = 'bold';
                var cellText = document.createTextNode(phoneNum.toString());
            } else {
                var cellText = document.createTextNode('NA');
            }
            if(i == 7){
                // y/n element
                let randNum = Math.floor((Math.random() * 2) + 1);
                var cellText = (randNum == 1) ? document.createTextNode('Yes') : document.createTextNode('No');
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
            row.classList.add('phone-row');

            row.addEventListener('click', TableElement_OnClick);
        }
        document.getElementsByClassName('phone-table-body')[0].appendChild(row);
    }

    document.getElementsByClassName('phone-directory-name')[0].innerHTML = `Phone Database (${numElements} results)`;

    for(let j = 0; j < numElements; j++){
        var row = document.createElement('tr');
        let keyNum = Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString();
        for(let i = 0; i < 9; i++){
            var cell = document.createElement('td');
            if(i == 0){
                // first element
                cell.style.fontWeight = 'bold';
                var cellText = document.createTextNode(keyNum.toString());
            } else {
                var cellText = document.createTextNode('NA');
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
            row.classList.add('key-row');

            row.addEventListener('click', TableElement_OnClick(row));
        }
        document.getElementsByClassName('key-table-body')[0].appendChild(row);
    }

    document.getElementsByClassName('key-directory-name')[0].innerHTML = `Key Database (${numElements} results)`;

    for(let j = 0; j < numElements; j++){
        var row = document.createElement('tr');
        let keyNum = Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString();
        for(let i = 0; i < 6; i++){
            var cell = document.createElement('td');
            if(i == 0){
                // first element
                cell.style.fontWeight = 'bold';
                var cellText = document.createTextNode(keyNum.toString());
            } else {
                var cellText = document.createTextNode('NA');
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
            row.classList.add('account-row');

            row.addEventListener('click', TableElement_OnClick(row));
        }
        document.getElementsByClassName('account-table-body')[0].appendChild(row);
    }

    document.getElementsByClassName('account-directory-name')[0].innerHTML = `Account Database (${numElements} results)`;

    for(let j = 0; j < numElements; j++){
        var row = document.createElement('tr');
        let keyNum = "CHEM" + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString() + Math.floor((Math.random() * 9) + 0).toString();
        for(let i = 0; i < 15; i++){
            var cell = document.createElement('td');
            if(i == 0){
                // first element
                cell.style.fontWeight = 'bold';
                var cellText = document.createTextNode(keyNum.toString());
            } else {
                var cellText = document.createTextNode('NA');
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
            row.classList.add('maintenance-row');

            row.addEventListener('click', TableElement_OnClick(row));
        }
        document.getElementsByClassName('maintenance-table-body')[0].appendChild(row);
    }

    document.getElementsByClassName('maintenance-directory-name')[0].innerHTML = `Maintenance Database (${numElements} results)`;
}

const SortTable = (table, sort_index, currentElement) =>{
    var currentTable;
    let rows;
    let switching = true;
    let shouldSwitch;
    let switchcount = 0;
    let wishdir = "down"; // lowest first (A or 0)
    let x,y; // two compared elements, will be set while compairing
    let i; // indexer whose scope must be exterior the loop

    // Check current table
    switch (table){
        case "phone":
            // Phone table
            currentTable = document.getElementsByClassName('phone-table-body')[0];
            break;
        case "key":
            currentTable = document.getElementsByClassName('key-table-body')[0];
            break;
        case "account":
            currentTable = document.getElementsByClassName('account-table-body')[0];
            break;
        case "maintenance":
            currentTable = document.getElementsByClassName('maintenance-table-body')[0];
            break;
        default:
            return;
    }

    // Update Color
    for(let z = 0; z < currentElement.parentNode.childElementCount; z++){
        if(currentElement.parentNode.children[z].style.color == "rgb(0, 123, 255)"){
            currentElement.parentNode.children[z].style.color = "rgb(33, 37, 41)";
        }
    }
    currentElement.style.color = "rgb(0, 123, 255)";

    // Loop until no switching needs to be done
    while (switching){
        // the loop goes through a cycle, but will not again
        switching = false;
        rows = currentTable.rows;

        // loop through all table rows
        for(i = 0; i < (rows.length-1); i++){
            shouldSwitch = false;
            // get compare elements
            x = rows[i].getElementsByTagName("td")[sort_index];
            y = rows[i + 1].getElementsByTagName("td")[sort_index];

            // check if the rows should switch based on wishdir
            if(wishdir == "down"){
                if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
                    shouldSwitch = true;
                    break;
                }
            } else if(wishdir == "up"){
                if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
                    shouldSwitch = true;
                    break;
                }
            }
        }
        
        // check if it should switch the elements, or the wishdir
        if(shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if(switchcount == 0 && wishdir == "down"){
                wishdir = "up";
                switching = true;
            }
        }
    }
}

const TableSearch = (db) =>{
    // init values
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(`myInput${db}`);
    filter = input.value.toUpperCase();
    table = document.getElementById(`searchable${db}`);
    tr = table.getElementsByTagName("tr");

    // check table row for value of text in search bar
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
  }
}

var deleteMode = false;

const DeleteButton = (db) =>{
    // See which table is active
    var _table;
    switch(db){
        case 1:
            _table = document.getElementsByClassName('phone-table-body')[0];
            break;
        case 2:
            _table = document.getElementsByClassName('key-table-body')[0];
            break;
        case 3:
            _table = document.getElementsByClassName('account-table-body')[0];
            break;
        case 4:
            _table = document.getElementsByClassName('maintenance-table-body')[0];
            break;
    }

    // Toggle 'delete mode'
    if(deleteMode == true){
        deleteMode = false;
    } else {
        deleteMode = true;
    }

    deleteModeActive = deleteMode;

    // If an elemtn in the table is clicked, it will ask the user if they wish to delete it. If yes, delete element
    for(let i = 0; i < phoneDBElements; i++){
        _table.children[i].addEventListener('click', function(){
            if(deleteMode == true){
                var result = confirm("Do you really want to delete this element? It will be gone forever.");
                if(result == true){
                    // Delete Element
                    _table.children[i].style.display = "none";
                }
            }
        });
    }
}
