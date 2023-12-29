let file_image = document.querySelector("#user_image");
let show_image = document.querySelector("#show_image");
let reader = new FileReader();
file_image.addEventListener("change", (event) => {
  let selected_file = event.target.files[0];
  reader.readAsDataURL(selected_file);
});
reader.onload = (e) => {
  show_image.src = e.target.result;
};
$("#form_user_profile").on("submit", function (event) {
  event.preventDefault();

  let sending_data = new FormData($("#form_user_profile")[0]);
  let name = $("#username").val();
  let email = $("#email").val();
  let password = $("#password").val();
  // let user_image = $("#user_image").files[0]();
  let type = $("#type").val();
  let status = $("#status").val();
  let id = $("#update_info").val();
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  const isValid = isValidEmail(email);
  if (name == "") {
    displayAlert("error", "Please enter a username");
  } else if (email == "") {
    displayAlert("error", "Please enter a email");
  } else if (password == "") {
    displayAlert("error", "Please enter a password");
  } else if (!isValid) {
    displayAlert("error", "Please enter a valid email");
  } else {
    sending_data.append("action", "update_user");
    //   let username = $("#username").val();
    //   let email = $("#email").val();
    //   let password = $("#password").val();
    //   let user_image = $("#user_image").prop('files')[0];
    //   let type = $("#type").val();
    //   let status = $("#status").val();
    //   let update_info = $("#update_info").val();
    //   let sending_data = {
    //     update_info,
    //     username,
    //     email,
    //     password,
    //     user_image,
    //     type,
    //     status,
    //     "action": "update_user",
    //   };
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/user_profile_api.php",
      data: sending_data,
      processData: false,
      contentType: false,
      success: function (data) {
        let status = data.status;
        let response = data.message;
        if (status) {
          displayAlert("success", response);
        } else {
          displayAlert("error", response);
        }
      },
      error: function (data) {
        displayAlert("error", data.responseText);
      },
    });
  }
});


function displayAlert(type, message) {
  let success = document.querySelector(".alert-success");
  let error = document.querySelector(".alert-danger");
  if (type == "success") {
    success.classList = "alert alert-success";
    error.classList = "alert alert-danger d-none";
    success.innerHTML = message;
    setTimeout(() => {
      success.classList = "alert alert-success d-none";
      window.location.href = "login.php";
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
