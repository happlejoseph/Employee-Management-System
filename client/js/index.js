

let employees = [];

async function getEmployees() {

    const res = await fetch('http://localhost:3002/getEmployees');
    const data = await res.json();

    employees = data;

    const tbody = document.getElementById('employeeTableBody');

    tbody.innerHTML = "";

    employees.forEach((employee)=> {

        tbody.innerHTML +=

            `
                <tr>
                    <td>${employee.name}</td>   
                    <td>${employee.email}</td>
                    <td>${employee.role}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>

                    <td>
                        <span class="status active">
                            ${employee.status}
                        </span>
                    </td>
                    
                    <td class="actions">
                        <button class="editBtn" onclick="editEmployee('${employee._id}')">Edit</button>
                        <button class="deleteBtn" onclick="deleteEmployee('${employee._id}')">Delete</button>
                    </td>
                </tr>        
            `
    });

    


}

function editEmployee(id) {
    window.location.href = `/editEmployee?id=${id}`;
}

getEmployees();


// delete //
async function deleteEmployee(id) {
    const confirmDelete = confirm('Are you sure you want to delete this employee')

    if(!confirmDelete) return;

    const res = await fetch(`/deleteEmployee?id=${id}`, {
        method: 'DELETE'
    });

    const result = await res.text();

    if(result === 'success') {

        alert('Employee deleted successfully!');
        getEmployees();

    }
    else {
        alert('Delete failed');
    }
}