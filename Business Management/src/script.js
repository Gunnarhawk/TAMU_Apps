var phoneDBElements = 0;
var currentPage = 1;
var deleteModeActive = false;
var editModeActive = false;

const UpdateCurrentPage = (page) =>{
    // Set the current page for other functions
    currentPage = page;
}

const ToggleEditMode = (wishstate) =>{
    let editModeSelection = document.getElementById('collapse4');
    switch (wishstate){
        case "enable":
            // activate edit mode
            editModeSelection.style.display = "flex";
            editModeActive = true;
            break;
        case "dissable":
            // dissable edit mode
            editModeSelection.style.display = "none";
            editModeActive = false;
            break;
        default:
            return;
    }
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
                    ToggleEditMode('dissable');
    
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

                    // Remove form data / restore to defaults
                    for(let i = 1; i <= 12; i++){
                        // 8 is the index for the radio
                        if(i == 8){
                            var yes = document.getElementsByClassName('radio-yes')[0];
                            var no = document.getElementsByClassName('radio-no')[0];
                            yes.checked = false;
                            no.checked = true;
                        } else {
                            // Every other index, put content in text box
                            let formInput = `phoneInput${i}`;
                            let inputID = document.getElementById(formInput);
                            inputID.value = "";
                        }
                    }
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
                ToggleEditMode('enable');
                
    
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

const SaveEditedFormData = (table) =>{
    var currentTable;
    var selectedRow;
    let inputType;

    // Select current table
    switch (table){
        case "phone":
            currentTable = document.getElementsByClassName('phone-table-body')[0];
            inputType = "phoneInput";
            break;
        case "key":
            break;
        case "account":
            break;
        case "maintenance":
            break;
        default:
            return;
    }

    // Get selected table row
    for(let i = 0; i < currentTable.childElementCount; i++){
        if(currentTable.children[i].classList.contains('tr-active')){
            selectedRow = currentTable.children[i];
        }
    }

    let indexer = 1;
    let availableElements = true;
    let inputValue;
    let formInputValueArray = new Array();
    while(availableElements){
        try {
            let formInput = document.getElementById((inputType+indexer).toString());
            if(formInput.classList.contains('form-check-input')){
                // Radio
                let yes = document.getElementsByClassName('radio-yes')[0];
                let no = document.getElementsByClassName('radio-no')[0];
                if(yes.checked){
                    inputValue = "Yes";
                } else if(no.checked){
                    inputValue = "No";
                } else {
                    inputValue = "NA";
                    console.log("Error | Edit Form Data {yes/no does not exist}");
                }
            } else {
                inputValue = formInput.value;
            }
            formInputValueArray.push(inputValue);

            indexer++;
        } catch (error) {
            availableElements = false;
            break;
        }
    }

    // Loop through selected row and replace elements
    for(let c = 0; c < selectedRow.childElementCount; c++){
        selectedRow.children[c].innerText = formInputValueArray[c];
    }
}

const AddTableElement = (table) =>{
    var currentTable;
    var inputType;
    var rowType;

    if(editModeActive == true){
        ToggleEditMode('dissable');
    }

    // Select current table
    switch (table){
        case "phone":
            currentTable = document.getElementsByClassName('phone-table-body')[0];
            inputType = "phoneInput";
            rowType = "phone";
            break;
        case "key":
            break;
        case "account":
            break;
        case "maintenance":
            break;
        default:
            return;
    }

    // Get form inputs
    let indexer = 1;
    let availableElements = true;
    let inputValue;
    let formInputValueArray = new Array();
    while(availableElements){
        try {
            let formInput = document.getElementById((inputType+indexer).toString());
            if(formInput.classList.contains('form-check-input')){
                // Radio
                let yes = document.getElementsByClassName('radio-yes')[0];
                let no = document.getElementsByClassName('radio-no')[0];
                if(yes.checked){
                    inputValue = "Yes";
                } else if(no.checked){
                    inputValue = "No";
                } else {
                    inputValue = "NA";
                    console.log("Error | Add Form Data {yes/no does not exist}");
                }
            } else {
                inputValue = formInput.value;
            }
            formInputValueArray.push(inputValue);

            indexer++;
        } catch (error) {
            availableElements = false;
            break;
        }
    }

    // Check required elements
    if(formInputValueArray[0] == undefined || formInputValueArray[0] == null || formInputValueArray[0] == ""){
        alert('You must add a phone number to add to the table!');
        return;
    }

    if(!formInputValueArray[0].toString().includes('-')){
        let newPhoneNum = formInputValueArray[0].toString().substring(0, 3) + '-' + formInputValueArray[0].toString().substring(3, formInputValueArray[0].length);
        formInputValueArray[0] = newPhoneNum;
    }

    // Build element
    var row = document.createElement('tr');
    for(let i = 0; i < formInputValueArray.length; i++){
        var cell = document.createElement('td');
        if(i == 0){
            // first element
            cell.style.fontWeight = 'bold';
        } 

        var cellText = document.createTextNode(formInputValueArray[i].toString());

        cell.appendChild(cellText);
        row.appendChild(cell);
        row.classList.add(`${rowType}-row`);

        row.addEventListener('click', TableElement_OnClick);
    }

    // Add element to table
    currentTable.insertBefore(row, currentTable.children[0]);

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
