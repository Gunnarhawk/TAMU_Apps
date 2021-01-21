var phoneDBElements = 0;



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
            cell.appendChild(cellText);
            row.appendChild(cell);
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
        }
        document.getElementsByClassName('key-table-body')[0].appendChild(row);
    }

    document.getElementsByClassName('key-directory-name')[0].innerHTML = `Key Database (${numElements} results)`;
}

const PhoneTableSearch = () =>{
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("searchable");
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

const KeyTableSearch = () =>{
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    table = document.getElementById("searchable2");
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

const DeleteButton = () =>{
    var phoneTable = document.getElementsByClassName('phone-table-body')[0];
    if(deleteMode == true){
        deleteMode = false;
    } else {
        deleteMode = true;
    }

    for(let i = 0; i < phoneDBElements; i++){
        phoneTable.children[i].addEventListener('click', function(){
            if(deleteMode == true){
                var result = confirm("Do you really want to delete this number? It will be gone forever");
                if(result == true){
                    phoneTable.children[i].style.display = "none";
                }
            }
        });
    }
}
