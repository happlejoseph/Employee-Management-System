

const params = new URLSearchParams(window.location.search);

const employeeId = params.get('id');

function editEmployee(id) {
    window.location.href = `/editEmployee?id=${id}`;
    const res = await fetch(`http://localhost:3002/getEmployeeById?id=${employeeId}`)
};

const employee = await res.json();

document.getElementById('name').value = employee.name;
document.getElementById('email').value = employee.email;
document.getElementById('role').value = employee.role;
document.getElementById('department').value = employee.department;
document.getElementById('salary').value = employee.salary;

const updatedEmployee = {
    id: employeeId,
    name,
    email,
    role,
    department,
    salary
};

await fetch('/updateEmployee', {
    method: 'PUT',
    headers: {
        'content-Type': 'application/json'
    },
    body: JSON.stringify(updatedEmployee)
});

const message = await res.text();

if(message === 'success') {
    alert('Employee updated successfully!')
}
else {
    alert('Failed to update employee.')
}