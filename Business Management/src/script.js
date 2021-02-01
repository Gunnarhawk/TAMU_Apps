var phoneDBElements = 0;
var deleteModeActive = false;
var editModeActive = false;
var currentPageStr = "";
var currentSortIndex = 0;
var sortIndex = 0;
var sorted = false;

const ToggleEditMode = (wishstate) =>{
    let editModeSelection = document.getElementById(`${currentPageStr}-collapse4`);
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
        let currentTable;
        let innerTextArray;

        const UpdateElement = () =>{
            // EDIT MODE
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
                for(let c = 0; c < currentTable.childElementCount; c++){
                    if(currentTable.children[c].classList.contains('tr-active')){
                        currentTable.children[c].classList.remove('tr-active');
                    }
                }
                this.classList.add('tr-active');
            }

            // Activate Edit Mode
            ToggleEditMode('enable');
            

            // Update Background Color
            let selectedBackgroundColor = "rgb(108, 117, 125)";
            for(j = 0; j < currentTable.childElementCount; j++){
                if(currentTable.children[j].style.backgroundColor == selectedBackgroundColor){
                    currentTable.children[j].style.backgroundColor = "transparent";
                    currentTable.children[j].addEventListener('mouseover', function(){
                        if(this.style.backgroundColor != selectedBackgroundColor){
                            this.style.backgroundColor ="#e4e4e4";
                        }
                    });
                    currentTable.children[j].addEventListener('mouseout', function(){
                        if(this.style.backgroundColor != selectedBackgroundColor){
                            this.style.backgroundColor = "transparent";
                        }
                    });
                }
            }
            this.style.backgroundColor = selectedBackgroundColor;
        }

        switch (currentPageStr){
            case "phone":
                // Phones
                currentTable = document.getElementsByClassName('phone-table-body')[0];

                UpdateElement();
    
                // Update Forms
                innerTextArray = this.innerText.split('\t');
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
            case "key":
                // Keys
                currentTable = document.getElementsByClassName('key-table-body')[0];

                UpdateElement();

                // Update Forms
                innerTextArray = this.innerText.split('\t');
                for(let i = 1; i <= 9; i++){
                    let formInput = `keyInput${i}`;
                    let inputID = document.getElementById(formInput);
                    inputID.value = innerTextArray[i-1].toString();
                }
                break;
            case "nitrogen":
                // Nitrogen
                currentTable = document.getElementsByClassName('nitrogen-table-body')[0];

                UpdateElement();

                // Update Forms
                innerTextArray = this.innerText.split('\t');
                for(let i = 1; i <= 7; i++){
                    let formInput = `nitrogenInput${i}`;
                    let inputID = document.getElementById(formInput);
                    inputID.value = innerTextArray[i-1].toString();
                }
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
    if(document.getElementsByClassName('phone-table-body')[0] != null){
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
    
        document.getElementsByClassName('phone-directory-name')[0].innerHTML = `Phone Table (${numElements} results)`;
    } else if(document.getElementsByClassName('key-table-body')[0] != null){
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
    
                row.addEventListener('click', TableElement_OnClick);
            }
            document.getElementsByClassName('key-table-body')[0].appendChild(row);
        }
    
        document.getElementsByClassName('key-directory-name')[0].innerHTML = `Key Table (${numElements} results)`;
    } else if(document.getElementsByClassName('nitrogen-table-body')[0] != null){
        for(let j = 0; j < numElements; j++){
            var row = document.createElement('tr');
            let roomNum =  Math.floor((Math.random() * 9) + 1).toString() + Math.floor((Math.random() * 9) + 1).toString() + Math.floor((Math.random() * 9) + 1).toString();
            for(let i = 0; i < 7; i++){
                var cell = document.createElement('td');
                if(i == 0){
                    // first element
                    cell.style.fontWeight = 'bold';
                    var cellText = document.createTextNode(roomNum.toString());
                } else {
                    var cellText = document.createTextNode('NA');
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                row.classList.add('nitrogen-row');
    
                row.addEventListener('click', TableElement_OnClick);
            }
            document.getElementsByClassName('nitrogen-table-body')[0].appendChild(row);
        }
    
        document.getElementsByClassName('nitrogen-directory-name')[0].innerHTML = `Nitrogen Table (${numElements} results)`;
    }
}

function NitrogenDateTable_OnClick(){
    if(this != window && deleteModeActive == false){
        const currentTable = document.getElementsByClassName('nitrogen-date-table-body')[0];
        
        const UpdateElement = () =>{
            // EDIT MODE
            if(this.classList.contains('tr-active')){
                // Second Click
                this.classList.remove('tr-active');

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
                for(let c = 0; c < currentTable.childElementCount; c++){
                    if(currentTable.children[c].classList.contains('tr-active')){
                        currentTable.children[c].classList.remove('tr-active');
                    }
                }
                this.classList.add('tr-active');
            }

            // Update Background Color
            let selectedBackgroundColor = "rgb(108, 117, 125)";
            for(j = 0; j < currentTable.childElementCount; j++){
                if(currentTable.children[j].style.backgroundColor == selectedBackgroundColor){
                    currentTable.children[j].style.backgroundColor = "transparent";
                    currentTable.children[j].addEventListener('mouseover', function(){
                        if(this.style.backgroundColor != selectedBackgroundColor){
                            this.style.backgroundColor ="#e4e4e4";
                        }
                    });
                    currentTable.children[j].addEventListener('mouseout', function(){
                        if(this.style.backgroundColor != selectedBackgroundColor){
                            this.style.backgroundColor = "transparent";
                        }
                    });
                }
            }
            this.style.backgroundColor = selectedBackgroundColor;
        }
        UpdateElement();

        // Update secondary table for Nitrogen
        // TODO ----------

        // Update start and end date in form
        let startDateInput = document.getElementById('nitrogenDateInput1');
        let endDateInput = document.getElementById('nitrogenDateInput2');

        startDateInput.value = this.children[0].innerText;
        endDateInput.value = this.children[1].innerText;
        
    }
}

const FillNitrogenTableLeft = () =>{
    const monthArray = [31,28,31,30,31,30,31,31,30,31,30,31];
    let date = new Date();
    monthArray[1] = (date.getFullYear().toString()) % 4 == 0 ? 29 : 28;
    const nitrogenDateTable = document.getElementsByClassName('nitrogen-date-table-body')[0];

    const _buildDate = (day, month, year) =>{
        if(day.toString().length <= 1){
            day = `0${day}`;
        }
        return `${month}/${day}/${year}`;
    }

    let startEndDates = new Array();

    let startYear = 2000;

    for(let i = 0; i < (date.getFullYear() - startYear)+1; i++){
        for(let month = 1; month <= 12; month++){
            // Only display up to the current date
            if((startYear+i) == date.getFullYear() && month > date.getMonth()+1){
                break;
            }
            let startDate = _buildDate(1, month, startYear+i);
            let endDate = _buildDate(monthArray[month-1], month, startYear+i);

            var row = document.createElement('tr');
            for(let i = 0; i < 2; i++){
                var cell = document.createElement('td');
                if(i == 0){
                    // first element
                    cell.style.fontWeight = 'bold';
                    var cellText = document.createTextNode(startDate.toString());
                } else {
                    var cellText = document.createTextNode(endDate.toString());
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                row.classList.add('nitrogen-row');
        
                row.addEventListener('click', NitrogenDateTable_OnClick);
            }
            startEndDates.push(row);
        }
    }

    for(let j = startEndDates.length -1; j >= 0; j--){
        nitrogenDateTable.appendChild(startEndDates[j]);
    }
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
            currentTable = document.getElementsByClassName('key-table-body')[0];
            inputType = "keyInput";
            break;
        case "nitrogen":
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
            currentTable = document.getElementsByClassName('key-table-body')[0];
            inputType = "keyInput";
            rowType = "key";
            break;
        case "nitrogen":
            currentTable = document.getElementsByClassName('nitrogen-table-body')[0];
            inputType = "nitrogenInput";
            rowType = "nitrogen";
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
        alert('You must have a first value to add to the table!');
        return;
    }

    if(rowType == 'phone' && !formInputValueArray[0].toString().includes('-')){
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

    if(sorted == true){
        wishdir = "up";
        sorted = false;
    } else {
        sorted = true;
    }

    currentSortIndex = sort_index;

    // Check if it is the body call
    if(currentElement == null){
        currentElement = document.getElementsByClassName(`${table}-table-body`)[0].parentElement.children[0].children[0].children[0];
        switchcount = 1;
    }

    // Check current table
    switch (table){
        case "phone":
            // Phone table
            currentTable = document.getElementsByClassName('phone-table-body')[0];
            break;
        case "key":
            currentTable = document.getElementsByClassName('key-table-body')[0];
            break;
        case "nitrogen":
            currentTable = document.getElementsByClassName('nitrogen-table-body')[0];
            break;
        case "nitrogen-date":
            currentTable = document.getElementsByClassName('nitrogen-date-table-body')[0];
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
    rows = currentTable.rows;

    sortIndex = sort_index;

    // convert the collection into an array and sort it
    const init_array = [...rows];
    const result = MergeSort(init_array);

    // Remove and then add the rows back in
    for(let z = 0; z < rows.length; z++){
        currentTable.removeChild(rows[z]);
    }

    if(wishdir == "down"){
        for(let c = 0; c < result.length; c++){
            currentTable.appendChild(result[c]);
        }
    } else if(wishdir == "up"){
        result.reverse();
        for(let c = 0; c < result.length; c++){
            currentTable.appendChild(result[c]);
        }
    }
}

const Merge = (left_arr, right_arr) =>{
    let arr = [];
    while (left_arr.length && right_arr.length) {
        let variable1 = left_arr[0].getElementsByTagName("td")[sortIndex].innerText;
        let variable2 = right_arr[0].getElementsByTagName("td")[sortIndex].innerText;
        if(isNaN(variable1) && isNaN(variable2)){
            let len = (variable1.length <= variable2.length ? variable1.length : variable2.length);
            for(let i = 0; i < len; i++){
                if (variable1[i] < variable2[i]) {
                    arr.push(left_arr.shift());
                    break;
                } else if(variable1[i] > variable2[i]){
                    arr.push(right_arr.shift());
                    break;
                } else if(variable1[i] == variable2[i]){
                    if(i == len-1){
                        arr.push(right_arr.shift());
                        break;
                    } else {
                        continue;
                    }
                }
            }
        } else {
            variable1 = Number(variable1);
            variable2 = Number(variable2);
            if(variable1 < variable2){
                arr.push(left_arr.shift());
            } else {
                arr.push(right_arr.shift());
            }
        }
        
    }
    return [...arr, ...left_arr, ...right_arr];
}

const MergeSort = (array) =>{
    const half = array.length / 2;
    if(array.length < 2){
        return array;
    }
    const left = array.splice(0, half);
    return Merge(MergeSort(left), MergeSort(array));
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
        td = tr[i].getElementsByTagName("td")[currentSortIndex];
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
            _table = document.getElementsByClassName('nitrogen-table-body')[0];
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
