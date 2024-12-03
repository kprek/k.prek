
let persons = [];
let currentId = 1;

class Person {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    add_new_person() {
        persons.push(this);
        appendRow(this);
        clearInputFields();
    }

    edit_person() {
        var personIndex = persons.findIndex((person) => person.id === this.id);
        if (personIndex !== -1) {
            persons[personIndex].name = this.name;
            persons[personIndex].email = this.email;
            updateTable();
        }
        clearInputFields();
    }
}

function personAdd() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    if (!name || !email) {
        alert('Name and email cannot be empty.');
        return;
    }
    var person = new Person(currentId++, name, email);
    person.add_new_person();
}

function personEdit() {
    var checkboxes = document.querySelectorAll('#dataTable tbody input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select one row to edit.');
        return;
    }
    if (checkboxes.length > 1) {
        alert('You can edit only one row at a time.');
        return;
    }

    var selectedRow = checkboxes[0].closest('tr');
    var id = Number(selectedRow.getAttribute('data-id'));
    var person = persons.find((p) => p.id === id);

    if (person) {
        document.getElementById('id').value = person.id;
        document.getElementById('name').value = person.name;
        document.getElementById('email').value = person.email;
    } else {
        alert('Selected person not found.');
    }
}

function deletePerson() {
    var checkboxes = document.querySelectorAll('#dataTable tbody input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one row to delete.');
        return;
    }

    checkboxes.forEach((checkbox) => {
        var row = checkbox.closest('tr');
        var id = Number(row.getAttribute('data-id'));
        persons = persons.filter((person) => person.id !== id);
    });
    updateTable();
}

function appendRow(person) {
    var tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    var newRow = tableBody.insertRow();
    newRow.setAttribute('data-id', person.id);

    var checkboxCell = newRow.insertCell(0);
    checkboxCell.innerHTML = `<input type="checkbox">`;

    newRow.insertCell(1).innerText = person.id;
    newRow.insertCell(2).innerText = person.name;
    newRow.insertCell(3).innerText = person.email;
}

function updateTable() {
    var tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows
    persons.forEach((person) => appendRow(person));
}

function toggleSelectAll() {
    var selectAllCheckbox = document.getElementById('selectAll');
    var checkboxes = document.querySelectorAll('#dataTable tbody input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}

function clearInputFields() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}
