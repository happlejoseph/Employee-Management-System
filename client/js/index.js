

let employees = [];

async function getEmployees() {

    const res = await fetch('http://localhost:3001/getEmployees');
    const data = await res.json();

    employees = data

    const tbody = document.getElementById('employeeTableBody');

    tbody


}