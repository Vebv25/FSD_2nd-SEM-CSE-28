const form = document.getElementById("studentForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    let admission = document.getElementById("admission").value.trim();
    let name = document.getElementById("fname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    if(admission.length < 5){
        alert("Admission Number must be at least 5 characters.");
        return;
    }

    if(name==""){
        alert("Enter First Name");
        return;
    }

    if(phone.length!=10 || isNaN(phone)){
        alert("Enter a valid 10-digit phone number.");
        return;
    }

    if(password!==confirm){
        alert("Passwords do not match.");
        return;
    }

    alert("Student Registered Successfully!");

    form.reset();

});