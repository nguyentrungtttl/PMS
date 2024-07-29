function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("togglePasswordIcon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}


async function submitForm(event) {
  event.preventDefault();


  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");


  emailError.textContent = "";
  passwordError.textContent = "";


  const formData = {
    Email: emailInput.value,
    Password: passwordInput.value,
  };


  const response = await fetch("https://api2-pnv.bluejaypos.vn/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });


  if (response.ok) {
    const data = await response.json();
    console.log(data);

    
    sessionStorage.setItem("hotelId", data.hotelId);
    var hotelId = sessionStorage.getItem("hotelId");


    window.location.href = "/home";
    // alert(hotelId );


  } else if (response.status === 400) {
    const errorData = await response.json();
    console.log(errorData.errors.Password);
    if (errorData.errors.Email) {
      emailError.textContent = errorData.errors.Email;
    }
    if (errorData.errors.Password) {
      passwordError.textContent = errorData.errors.Password;
    }
  }
}


