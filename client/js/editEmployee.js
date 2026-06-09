

const params = new URLSearchParams(window.location.search);

const id = params.get('id');

// console.log(id);

// edit //
async function getEmployee() {
    
    const res = await fetch(`/getEmployee?id=${id}`);

    const employee = await res.json();

    // console.log(employee);
    
}

