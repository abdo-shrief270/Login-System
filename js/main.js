var
    nameUp = document.getElementById("name"),
    emailUp = document.getElementById("email"),
    passwordUp = document.getElementById("password"),


    signUpBtn = document.getElementById("signUpBtn"),
    signInBtn = document.getElementById("signInBtn"),


    showSignUpBtn = document.getElementById("showSignUp"),
    showSignInBtn = document.getElementById("showSignIn"),


    showPassInBtn = document.getElementById("showPassInBtn"),
    showPassUpBtn = document.getElementById("showPassUpBtn"),


    emailsArray = [],
    userArray = [],
    userName,


    nameRegex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
    emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,


    nameUpError = document.getElementById("nameUpError"),
    emailUpError = document.getElementById("emailUpError"),
    passUpError = document.getElementById("passUpError"),


    emailInError = document.getElementById("emailInError"),
    passInError = document.getElementById("passInError")
;

//// check availablity of users-array ////

if (localStorage.getItem("usersList") == null) {
    var users = [];
}
else {
    users = JSON.parse(localStorage.getItem("usersList"));
}

/// show password in sign-up form  ///

showPassUpBtn.addEventListener("click", function () {
    var passInputType = passwordUp.getAttribute("type");
    if (passInputType == "password") {
        passwordUp.setAttribute("type", "text");
        showPassUpBtn.classList.replace("fa-eye", "fa-eye-slash")
    } else {
        passwordUp.setAttribute("type", "password");
        showPassUpBtn.classList.replace("fa-eye-slash", "fa-eye")

    }
});

/// show password in sign-in form  ///
showPassInBtn.addEventListener("click", function () {
    var passwordIn = document.getElementById("chPassword");
    var passInputType = passwordIn.getAttribute("type");
    if (passInputType == "password") {
        passwordIn.setAttribute("type", "text");
        showPassInBtn.classList.replace("fa-eye", "fa-eye-slash")
    } else {
        passwordIn.setAttribute("type", "password");
        showPassInBtn.classList.replace("fa-eye-slash", "fa-eye")

    }
});


// to show sign-up form and close sign-in form with animation  //
showSignUpBtn.addEventListener("click", showSignUp);
function showSignUp() {

    var signUpDiv = document.getElementById("signUpDiv"),
        signInDiv = document.getElementById("signInDiv");

    signInDiv.classList.remove("animate__backInLeft");
    signInDiv.classList.remove("animate__backOutRight");
    signInDiv.classList.add("animate__backOutRight");
    setTimeout(function () { signInDiv.style.display = "none"; }, 400)
    setTimeout(function () { signUpDiv.classList.remove("animate__backOutRight"), signUpDiv.classList.add("animate__backInLeft"); }, 400)
    setTimeout(function () { signUpDiv.style.display = "flex"; }, 400)
};

// to show sign-in form and close sign-up form with animation  //
showSignInBtn.addEventListener("click", showSignIn);
function showSignIn() {
    var signUpDiv = document.getElementById("signUpDiv"),
        signInDiv = document.getElementById("signInDiv");

    signUpDiv.classList.remove("animate__backInLeft");
    signUpDiv.classList.remove("animate__backOutRight");
    signUpDiv.classList.add("animate__backOutRight");
    setTimeout(function () { signUpDiv.style.display = "none" }, 400);
    setTimeout(function () { signInDiv.classList.remove("animate__backOutRight"), signInDiv.classList.add("animate__backInLeft") }, 400)
    setTimeout(function () { signInDiv.style.display = "flex"; }, 400)
};


signUpBtn.addEventListener("click", addUser);
function addUser() {
    var condation = true; // the email is free to use :) //
    for (i = 0; i < users.length; i++) {

        /// check availablity of email-input ///

        if (emailUp.value.toLowerCase() == users[i].email.toLowerCase()) {

            //// the email isn't free to use :( ////

            emailUpError.classList.remove("d-none");
            emailUpError.innerHTML = `<span class="text-primary">${emailUp.value}</span> is already registered`;
            emailUp.focus();
            condation = false; // the email isn't free to use :( //
            break;
        }
    }
    if (condation == true) {

        // the email is free to use :) //

        addValues();

    }
};

// To sign-up and go to welcome page //

function addValues() {

    ///// check regex to inputs in sign-up /////

    if (nameRegex.test(nameUp.value) && emailRegex.test(emailUp.value) && passRegex.test(passwordUp.value)) {

        // all is good :) //

        var user =  // to add user object //
        {
            name: nameUp.value,
            email: emailUp.value,
            password: passwordUp.value
        }

        users.push(user); // to add user object //
        localStorage.setItem("usersList", JSON.stringify(users)); // to add new user in local storge //
        userName = localStorage.setItem("userName", users[i].name); // to show name in welcome page //
        signUpBtn.href = "welcomePage.html"; // to go to welcome page //

    }
    else if (nameRegex.test(nameUp.value) == false) {
      
        // name is bad :( //

        nameUp.focus();
        nameUp.classList.add("is-invalid");
        nameUpError.classList.remove("d-none");
    }
    else if (emailRegex.test(emailUp.value) == false) {

        // email is bad :( //

        emailUp.focus();
        emailUpError.classList.remove("d-none");

        /// check display to name-error ///

        if (nameUpError.classList.contains("d-none") == false) {
            nameUpError.classList.add("d-none");
        };
        emailUpError.innerHTML = "Email value is in-valid";
    }
    else {

        // password is bad :( //

        /// check display to name-error ///

        if (nameUpError.classList.contains("d-none") == false) {
            nameUpError.classList.add("d-none");
        };

        /// check display to email-error ///

        if (emailUpError.classList.contains("d-none") == false) {
            emailUpError.classList.add("d-none");
        };

        passwordUp.focus();
        passUpError.classList.remove("d-none");

    }
};

//// check user in login ////

signInBtn.addEventListener("click", checkUser);
function checkUser() {
    var emailIn = document.getElementById("chEmail");
    var passwordIn = document.getElementById("chPassword");

    var cond = false; //  ------> the email and password is in-correct :(  //

    for (i = 0; i < users.length; i++) {

        if (emailIn.value.toLowerCase() == users[i].email.toLowerCase() && passwordIn.value == users[i].password) {
            cond = true;  //  ------> the email and password is correct :)  //
            break; // to exit from for loop  //
        }
    };

    if (cond == true)  //  ------> the email and password is correct :)  //
    {

        // go to welcome page //

        userName = localStorage.setItem("userName", users[i].name);
        signInBtn.href = "welcomePage.html";
    }
    else {

        var cond2 = false; //  ------> the email  is in-correct :( //
        for (i = 0; i < users.length; i++) {

            if (emailIn.value == users[i].email) {
                cond2 = true; //  ------> the email  is correct :) //
                break; // To exist from loop //
            }
        }
        if (cond2 == true) {

            // check email-error --->> display

            if (emailInError.classList.contains("d-none") == false) {

                // To hide email-error //

                emailInError.classList.add("d-none");
            };

            /////////// check regex to password in login //////////////

            if (passRegex.test(passwordIn.value)) {

                //// when password is in-correct ////

                passInError.classList.remove("d-none");
                passInError.innerHTML = "incorrect password";

            }
            else {

                //// when password regex is false ////

                passInError.classList.remove("d-none");
                passInError.innerHTML = `This password isn't valid`;

            }
        }
        else {

            // check the regex and availablity to email-input //

            if (emailRegex.test(emailIn.value)) {

                // regex for email is correct :)    //

                emailInError.classList.remove("d-none");
                emailInError.innerHTML = `This email("<span class="text-primary">${emailIn.value}</span>") dosen't exist`;
            }
            else {

                // regex for email is in-correct :(    //

                emailInError.classList.remove("d-none");
                emailInError.innerHTML = `This email ("<span class="text-primary">${emailIn.value}</span>") isn't valid`;
            }
        }
    }

};