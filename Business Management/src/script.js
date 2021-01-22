var phoneDBElements = 0;
var currentPage = 1;

const UpdateCurrentPage = (page) =>{
    currentPage = page;
    console.log(currentPage);
}

function TableElement_OnClick(){
    if(this == window){
        return;
    }
    switch (currentPage){
        case 1:
            // Phones

            // Activate Edit Mode
            /*
            this.dataToggle = "collapse";
            this.role = "button";
            let editModeSelection = document.getElementById('collapse4');
            let deleteModeSelectin = document.getElementById('collapse2');
            editModeSelection.style.position = "relative";
            editModeSelection.style.display = "flex";
            editModeSelection.style.flexDirection = "column";
            */

            // Update Background Color
            let selectedBackgroundColor = "rgb(108, 117, 125)";
            const phoneTable = document.getElementsByClassName('phone-table-body')[0];
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
                if(i == 8){
                    var isYes = (innerTextArray[8] == "Yes") ? true : false;
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
            console.log("Error | Table Element");
            break;
    }
}

const FillTable = () =>{
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
            if(i == 8){
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

const TableSearch = (db) =>{
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(`myInput${db}`);
    filter = input.value.toUpperCase();
    table = document.getElementById(`searchable${db}`);
    tr = table.getElementsByTagName("tr");

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

    if(deleteMode == true){
        deleteMode = false;
    } else {
        deleteMode = true;
    }

    for(let i = 0; i < phoneDBElements; i++){
        _table.children[i].addEventListener('click', function(){
            if(deleteMode == true){
                var result = confirm("Do you really want to delete this element? It will be gone forever.");
                if(result == true){
                    _table.children[i].style.display = "none";
                }
            }
        });
    }
}
