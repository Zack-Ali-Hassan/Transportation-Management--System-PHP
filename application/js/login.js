$("#login_form").on("submit", function(e){
    e.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();
    if(username == ''){
        displayAlert("error","plese, fill username")
    }
    else if(password == ''){
        displayAlert("error","plese, fill password")
    }
    else{
    let send_data = {
        action: "login",
        username,
        password
      };
      $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "../api/login_api.php",
        data: send_data,
        success: function (data) {
          let status = data.status;
          let response = data.message;
          if (status) {
            // console.log("response is : " + response);
            displayAlert("success",response)
            window.location.href = "../views/index.php";
            // response.forEach((item) => {
            
            // });
          } else {
            displayAlert("error",response)
          }
        },
        error: function (data) {
            displayAlert("error", data.responseText)
        //   alert(data.responseText);
        },
      });}
})



function displayAlert(type, message) {
    let success = document.querySelector(".alert-success");
    let error = document.querySelector(".alert-danger");
    if (type == "success") {
      success.classList = "alert alert-success";
      error.classList = "alert alert-danger d-none";
      success.innerHTML = message;
      setTimeout(() => {
        success.classList = "alert alert-success d-none";
  
        $("#modal_orders").modal("hide");
      
      }, 3000);
    } else {
      error.classList = "alert alert-danger";
      success.classList = "alert alert-success d-none";
      error.innerHTML = message;
      $("#password").val("")
      setTimeout(() => {
        error.classList = "alert alert-danger d-none";
      }, 4000);
    }
  }