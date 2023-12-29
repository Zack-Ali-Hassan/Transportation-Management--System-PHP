let btn_Action = "Insert";
loadData();
fillVehicle();
$("#btn_add_fuel_record").on("click", function () {
  $("#modal_fuel_record").modal("show");
});
$("#form_fuel_record").on("submit", (event) => {
  event.preventDefault();

  let fuel_type = $("#fuel_type").val();
  let quantity = $("#quantity").val();
  let cost = $("#cost").val();
  let vehicle_id = $("#vehicle").val();
  let id = $("#update_info").val();
  if (quantity == "") {
    displayAlert("error", "Please enter a quantity fuel");
  } else if (cost == "") {
    displayAlert("error", "Please enter a cost");
  } else if (vehicle_id == "") {
    displayAlert("error", "Please select a vehicle");
  }else {
    let sending_data = {};
    if (btn_Action == "Insert") {
      sending_data = {
        action: "register_fuel_record",
        fuel_type,
        quantity,
        cost,
        vehicle_id,
      };
    } else {
      sending_data = {
        id,
        fuel_type,
        quantity,
        cost,
        vehicle_id,
        action: "update_fuel_record",
      };
    }

    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/fuel_record_api.php",
      data: sending_data,
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
  $("#table_fuel_record tbody").html("");
  let send_data = {
    action: "read_fuel_record",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/fuel_record_api.php",
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
          tr += `<td><a class="btn btn-primary update_info" update_info =${item["fuel_id"]} ><i class="fas fa-edit"></i></a>
         &nbsp;&nbsp <a class="btn btn-danger delete_info" delete_info =${item["fuel_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_fuel_record tbody").append(tr);
        $("#table_fuel_record").DataTable();
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
        html += ` <option value="">Select vehicle</option>`;
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

function delete_fuel(id) {
  let sending_data = {
    action: "delete_fuel_record",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/fuel_record_api.php",
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
function fetch_fuel(id) {
  let sending_data = {
    action: "read_single_fuel_record",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/fuel_record_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_fuel_record").modal("show");
        $("#update_info").val(response[0].fuel_id);
        $("#fuel_type").val(response[0].fuel_type);
        $("#quantity").val(response[0].quantity);
        $("#cost").val(response[0].cost);
        $("#vehicle").val(response[0].vehicle_id);
      } else {
        displayAlert("error", response);
      }
    },
    error: function (data) {
      displayAlert("error", data.responseText);
    },
  });
}

$("#table_fuel_record").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_fuel(id);
});
$("#table_fuel_record").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this fuel record id : ${id}`)) {
    delete_fuel(id);
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

      $("#modal_fuel_record").modal("hide");
      $("#form_fuel_record")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
