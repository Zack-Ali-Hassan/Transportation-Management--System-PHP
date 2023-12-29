let btn_Action = "Insert";
loadData();
fillVehicle();
$("#btn_add_driver").on("click", function () {
  $("#modal_driver").modal("show");
});
$("#form_driver").on("submit", (event) => {
  event.preventDefault();

  let name = $("#name").val();
  let mobile = $("#mobile").val();
  let email = $("#email").val();
  let vehicle_id = $("#vehicle").val();
  let id = $("#update_info").val();


   //checking inputs
   const isValidMobile = /^61\d{7}$/.test(mobile);
   function isValidEmail(email) {
     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     return emailPattern.test(email);
   } 
   const isValid = isValidEmail(email);
  if (name == "") {
    displayAlert("error", "Please enter a driver name");
  } else if (mobile == "") {
    displayAlert("error", "Please enter a mobile");
  } else if (email == "") {
    displayAlert("error", "Please enter a email");
  } else if (vehicle_id == '') {
    displayAlert("error", "Please select a vehicle");
  } else if (!isValidMobile) {
    displayAlert("error", "Please enter a valid mobile");
  } else if (!isValid) {
    displayAlert("error", "Please enter a valid email");
  } else {
    let sending_data = {};
    if (btn_Action == "Insert") {
      sending_data = {
        action: "register_driver",
        name,
        mobile,
        email,
        vehicle_id,
      };
    } else {
      sending_data = {
        id,
        name,
        mobile,
        email,
        vehicle_id,
        action: "update_driver",
      };
    }

    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/driver_api.php",
      data: sending_data,
      success: function (data) {
        let status = data.status;
        let response = data.message;
        if (status) {
          displayAlert("success", response);

          btn_Action = "Insert";
          loadData();
        }
        else {
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
  $("#table_driver tbody").html("");
  let send_data = {
    action: "read_drivers",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/driver_api.php",
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
            tr += `<td>${item[data]}</td>`;
          }
          tr += `<td><a class="btn btn-primary update_info" update_info =${item["driver_id"]} ><i class="fas fa-edit"></i></a>
         &nbsp;&nbsp <a class="btn btn-danger delete_info" delete_info =${item["driver_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_driver tbody").append(tr);
        $("#table_driver").DataTable();
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
function fillVehicle() {
  let send_data = {
    action: "read_vehicles",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/vehicle_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      let html = "";
      if (status) {
        html += `<option value="">Select vehicle</option>`;
        response.forEach((item) => {
          html += ` <option value=${item["vehicle_id"]}>${item["vehicle_number"]}</option>`;
        });
        $("#vehicle").append(html);
      }
    },
    error: function (data) {
      alert("Unknow error");
    },
  });
}

function delete_driver(id) {
  let sending_data = {
    action: "delete_driver",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/driver_api.php",
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
function fetch_driver(id) {
  let sending_data = {
    action: "read_single_driver",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/driver_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_driver").modal("show");
        $("#update_info").val(response[0].driver_id);
        $("#name").val(response[0].name);
        $("#mobile").val(response[0].mobile);
        $("#email").val(response[0].email);
        $("#vehicle").val(response[0].VehicleID);
      } else {
        displayAlert("error", response);
      }
    },
    error: function (data) {
      displayAlert("error", data.responseText);
    },
  });
}

$("#table_driver").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_driver(id);
});
$("#table_driver").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this driver id : ${id}`)) {
    delete_driver(id);
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

      $("#modal_driver").modal("hide");
      $("#form_driver")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
