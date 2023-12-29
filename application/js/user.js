btn_Action = "Insert";
loadData();
let file_image = document.querySelector("#user_image");
let show_image = document.querySelector("#show_image");
let reader = new FileReader();
file_image.addEventListener("change", (event) => {
  let select_file = event.target.files[0];
  reader.readAsDataURL(select_file);
});
reader.onload = (e) => {
  show_image.src = e.target.result;
};
$("#btn_add_user").on("click", function () {
  $("#modal_user").modal("show");
});
$("#form_user").on("submit", function (event) {
  event.preventDefault();

  let name = $("#username").val();
  let email = $("#email").val();
  let password = $("#password").val();
  // let user_image = $("#user_image").files[0]();
  let type = $("#type").val();
  let status = $("#status").val();
  let id = $("#update_info").val();
  let sending_data = new FormData($("#form_user")[0]);
  //checking inputs
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
    if (btn_Action == "Insert") {
      sending_data.append("action", "register_user");
      // sending_data = {
      //   action: "register_user",
      //   email,
      //   password,
      //   user_image,
      //   type,
      //   status,
      // };
    } else {
      sending_data.append("action", "update_user");
      // sending_data = {
      //   id,
      //   name,
      //   gender,
      //   address,
      //   mobile,
      //   email,
      //   action: "update_user",
      // };
    }

    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/user_api.php",
      data: sending_data,
      processData: false,
      contentType: false,
      success: function (data) {
        let status = data.status;
        let response = data.message;
        if (status) {
          displayAlert("success", response);

          btn_Action = "Insert";
          loadData();
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

function loadData() {
  $("#table_user tbody").html("");
  let send_data = {
    action: "read_users",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/user_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;

      if (status) {
        let html = "";
        let tr = "";
        response.forEach((item) => {
          tr += "<tr>";
          for (let data in item) {
            if (data == "user_image") {
              tr += `<td> <img src="../uploads/${item[data]}" style="width : 50px; height: 50px; object-fit:cover;"> </td>`;
            } else {
              tr += `<td>${item[data]}</td>`;
            }
            // else if (data == "Status") {
            //   if (item[data] == "active") {
            //     tr+=`<td ><span class="badge badge-success" style="color : red;"> ${item[data]} </span> </td>`;
            //   } else {
            //     tr += `<td ><span class="badge badge-danger"> ${item[data]} </span> </td>`;
            //   }
            // }
          }
          tr += `<td class="d-flex"><a class="btn btn-primary update_info m-2" update_info =${item["user_id"]} ><i class="fas fa-edit"></i></a>
              <a class="btn btn-danger delete_info m-2" delete_info =${item["user_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_user tbody").append(tr);

        $("#table_user").DataTable();
      } else {
        Swal.fire({
          title: "Warning",
          text: response,
          icon: "warning",
        });
      }
    },
    error: function (data) {
      Swal.fire({
        title: "Warning",
        text: data.responseText,
        icon: "warning",
      });
    },
  });
}

function delete_user(id) {
  let sending_data = {
    action: "delete_user",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/user_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        Swal.fire({
          title: "Good job",
          text: response,
          icon: "success",
        });
        // alert(response);
        loadData();
      } else {
        Swal.fire({
          title: "Warning",
          text: response,
          icon: "warning",
        });
      }
    },
    error: function (data) {
      Swal.fire({
        title: "Warning",
        text: data.responseText,
        icon: "warning",
      });
    },
  });
}
function fetch_user(id) {
  let sending_data = {
    action: "read_single_user",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/user_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_user").modal("show");
        $("#update_info").val(response[0].user_id);
        $("#username").val(response[0].username);
        $("#email").val(response[0].email);
        $("#password").val(response[0].password);
        $("#show_image").attr("src", `../uploads/${response[0].user_image}`);
        $("#type").val(response[0].type);
        $("#status").val(response[0].status);
      } else {
        displayAlert("error", response);
      }
    },
    error: function (xhr, status, error) {
      displayAlert("error", data.responseText);
    },
  });
}

$("#table_user").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_user(id);
});
$("#table_user").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this user id : ${id}`)) {
    delete_user(id);
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

      $("#modal_user").modal("hide");
      $("#form_user")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
