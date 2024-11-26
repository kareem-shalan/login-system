window.onload = function () {
  document.querySelector("#wait").classList.remove("d-none");
  document.querySelector("#win").classList.add("d-none");
  var sound = document.querySelector("#sound");
  var soung = document.querySelector("#soung");

  soung.addEventListener("click", function () {
    sound.play();
  });
};

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if (e.key == "F12") {
    e.preventDefault();
  }
});

var userNameInput = document.querySelector("#userName");
var passwordInput = document.querySelector("#password");
var fnameInput = document.querySelector("#fname");
var mainButton = document.querySelector("#Sign-Up");
var showData = document.querySelector("#showData");

var collectData = JSON.parse(localStorage.getItem("information")) || [];

mainButton.addEventListener("click", function (event) {
  event.preventDefault();
  allData();
  viewData();
  validateForm();
  clear();
});
validateForm();
function allData() {
  if (userNameInput.value && passwordInput.value && fnameInput.value) {
    var info = {
      Name: fnameInput.value,
      userName: userNameInput.value,
      pass: passwordInput.value,
    };

    var existingUser = collectData.find(function (user) {
      return user.userName === userNameInput.value;
    });
    if (existingUser) {
      alert("Username already exists!");
      userNameInput.classList.add("is-invalid");
    } else {
      collectData.push(info);
      localStorage.setItem("information", JSON.stringify(collectData));

      alert("User created successfully! Please login.");
    }
  } else {
    alert("Please fill all fields!");
    validateForm();
  }
}

function viewData() {
  var userName = userNameInput.value;
  var password = passwordInput.value;

  var isUserValid = false;

  collectData.forEach(function (user) {
    if (user.userName === userName && user.pass === password) {
      isUserValid = true;
      document.querySelector("#win").classList.remove("d-none");
      document.querySelector("#wait").classList.add("d-none");

      var welcomeUser = document.createElement("p");
      welcomeUser.textContent = "Welcome, " + user.Name;
      showData.innerHTML = "";
      showData.appendChild(welcomeUser);
    }
  });

  if (!isUserValid) {
    alert("Invalid username or password.");

    userNameInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
  }
}
var usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var fnameRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]{3,14}$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

function validateForm() {
  userNameInput.addEventListener("keydown", function () {
    if (!usernameRegex.test(userNameInput.value)) {
      userNameInput.classList.add("is-invalid");
      userNameInput.classList.remove("is-valid");
    } else {
      userNameInput.classList.remove("is-invalid");
      userNameInput.classList.add("is-valid");
    }
  });
  passwordInput.addEventListener("keydown", function () {
    if (!passwordRegex.test(passwordInput.value)) {
      passwordInput.classList.add("is-invalid");

      passwordInput.classList.remove("is-valid");
    } else {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid");
    }
  });
  fnameInput.addEventListener("keydown", function () {
    if (!fnameRegex.test(fnameInput.value)) {
      fnameInput.classList.add("is-invalid");
      fnameInput.classList.remove("is-valid");
    } else {
      fnameInput.classList.remove("is-invalid");
      fnameInput.classList.add("is-valid");
    }
  });
}

function clear() {
  userNameInput.value = "";
  passwordInput.value = "";
  fnameInput.value = "";
  userNameInput.classList.remove("is-invalid", "is-valid");
  passwordInput.classList.remove("is-invalid", "is-valid");
  fnameInput.classList.remove("is-invalid", "is-valid");
}

document.querySelector("#Sign-in").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".hiddenmy").classList.remove("d-none");
  document.querySelector("#Sign-in").classList.add("d-none");
  document.querySelector("#singUp").classList.remove("d-none");
  mainButton.textContent = "SIGN UP";
});

document.querySelector("#singUp").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".hiddenmy").classList.add("d-none");
  document.querySelector("#singUp").classList.add("d-none");
  document.querySelector("#Sign-in").classList.remove("d-none");
  mainButton.textContent = "SIGN IN";
});
