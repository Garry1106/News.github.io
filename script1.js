const form = document.getElementById('form');
const userMsg = document.getElementById("user-error");
const passMsg = document.getElementById("pass-error");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const user = document.getElementById("username");
    const password = document.getElementById("password");

    if(user.value == "")
    {
        user.focus();
        alert("Enter your Username")
        return false;
    }
    if(password.value == "")
    {
        password.focus();
        alert("Enter Your Password")
        return false;

    }
    if(user.value == "admin" && password.value == "password")
    {
        window.location.href = "index1.html";
        return true;
    }
    else{
        alert("Enter Correct Details")
        user.value = "";
        password.value = "";
        return false
    }
})