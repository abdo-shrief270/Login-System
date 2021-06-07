var userName = localStorage.getItem("userName");

var logOutBtn = document.getElementById("logOut");

var parameterName = document.getElementById("parameterName");

parameterName.innerHTML = userName;

if (localStorage.getItem("userName") == null) {
    document.body.innerHTML = ` <div class="h-100 w-100 bg-dark d-flex justify-content-center align-items-center">
    <span class=" fa-2x pr-5">Please sign-in from here </span>
    <a class="nav-link btn btn-outline-danger" href="index.html">Sign in</a>
    
     </div>`
}

logOutBtn.addEventListener("click", logOut);

function logOut() {
    localStorage.removeItem("userName");
}
