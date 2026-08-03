function check() {

    var uid = document.getElementById("userid").value;
    var pwd = document.getElementById("passwd").value;

    var msg = "";

    if (uid.length <= 0) {
        msg += "Username cannot be empty\n";
    }

    if (pwd.length <= 0) {
        msg += "Password cannot be empty\n";
    }

    if (msg.length > 0) {
        alert(msg);
        return false;
    }

    if (pwd.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }

    if (uid === "admin" && pwd === "password123") {
        alert("Login Successful!");
    } else {
        alert("Invalid Username or Password.");
    }

    return false;
    
}