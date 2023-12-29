loadData();
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
      }
    },
    error: function (xhr, status, error) {
      alert("Unknown error...");
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}

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
