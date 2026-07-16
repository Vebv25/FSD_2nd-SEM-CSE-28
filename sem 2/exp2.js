let employees = []
function addemployee() {

    let name = document.getElementById("name").value;
    let empId = document.getElementById("empid").value;
    let salary = parseFloat.getElementById("salary").value;
    let dept = document.getElementById("dept").value;
    if (name === " " || empId === " " || isNaN(salary) || d )
    alert("please fill all files properly");
    return ;
}  

let employee = {
    name: name,
    id : empId,
    salary: salary,
    department: dept}

{ employees.push(employee);
    alert("employee Added Successfully!");
    document.getElementById("name").value=" ";
    document.getElementById("empId").value=" ";
    document.getElementById("salary").value=" ";
    document.getElementById("department").value=" ";
}

function displayEmployees() {
    let output = "<h3> All Employees</h3>";
    employees.forEach(emp => 
        output += 'ID'
        Name: ${emp.name} |
        ID: ${emp.id} |
        Salary: ${emp.salary} | )
        
    }

