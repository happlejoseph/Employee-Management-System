

let employees = [];

async function getEmployees() {

    const res = await fetch('http://localhost:3001/getEmployees');
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
                        <button class="deleteBtn">Delete</button>
                    </td>
                </tr>        
            `
    });
    getEmployees();


}

// edit function //
async function editEmployee(id) {
    
}