async function loadEmployee() {

    const params = new URLSearchParams(window.location.search);

    const employeeId = params.get('id');

    console.log(employeeId);

    const res = await fetch(`/getEmployeeById?id=${employeeId}`);

    const employee = await res.json();

    console.log(employee);

    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('role').value = employee.role;
    document.getElementById('department').value = employee.department;
    document.getElementById('salary').value = employee.salary;
}

loadEmployee();


async function updateEmployee() {
    console.log("Update clicked");

    const params = new URLSearchParams(window.location.search);
    const employeeId = params.get('id');

    const updatedData = {
        id: employeeId,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        department: document.getElementById('department').value,
        salary: document.getElementById('salary').value
    };

    const res = await fetch('/updateEmployee', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });

    const result = await res.text();

    if (result === "success") {
        alert("Updated successfully!");
    }
}