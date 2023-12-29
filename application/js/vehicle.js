let btn_Action = "Insert";
loadData();
$("#btn_add_vehicle").on("click", function () {
  $("#modal_vehicle").modal("show");
});
$("#form_vehicle").on("submit", (event) => {
  event.preventDefault();

  let vehicle_number = $("#vehicle_number").val();
  let type = $("#type").val();
  let fuel_type = $("#fuel_type").val();
  let capacity = $("#capacity").val();
  let location = $("#location").val();
  let status = $("#status").val();
  let id = $("#update_info").val();
  if (vehicle_number == "") {
    displayAlert("error", "Please enter a vehicle number");
  } else if (capacity == "") {
    displayAlert("error", "Please enter a capacity");
  } else if (location == "") {
    displayAlert("error", "Please enter a location");
  } else {
    let sending_data = {};
    if (btn_Action == "Insert") {
      sending_data = {
        action: "register_vehicle",
        vehicle_number,
        type,
        fuel_type,
        capacity,
        location,
        status,
      };
    } else {
      sending_data = {
        id,
        vehicle_number,
        type,
        fuel_type,
        capacity,
        location,
        status,
        action: "update_vehicle",
      };
    }

    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/vehicle_api.php",
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
  $("#table_vehicle tbody").html("");
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

      if (status) {
        let html = "";
        let tr = "";
        response.forEach((item) => {
          tr += "<tr>";
          for (let data in item) {
            tr += `<td>${item[data]}</td>`;
          }
          tr += `<td>
          <a class="btn btn-primary update_info" update_info =${item["vehicle_id"]} ><i class="fas fa-edit"></i></a>
          &nbsp;&nbsp <a class="btn btn-danger delete_info" delete_info =${item["vehicle_id"]}><i class="fas fa-trash"></i></a>
            
            </td>`;
          tr += "</tr>";
        });
        $("#table_vehicle tbody").append(tr);
        $("#table_vehicle").DataTable();
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

function delete_vehicle(id) {
  let sending_data = {
    action: "delete_vehicle",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/vehicle_api.php",
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
function fetch_vehicle(id) {
  let sending_data = {
    action: "read_single_vehicle",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/vehicle_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_vehicle").modal("show");
        $("#update_info").val(response[0].vehicle_id);
        $("#vehicle_number").val(response[0].vehicle_number);
        $("#type").val(response[0].type);
        $("#fuel_type").val(response[0].fual_type);
        $("#capacity").val(response[0].capacity);
        $("#location").val(response[0].location);
        $("#status").val(response[0].status);
      } else {
        displayAlert("error", response);
      }
    },
    error: function (data) {
      displayAlert("error", data.responseText);
    },
  });
}

$("#table_vehicle").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_vehicle(id);
});
$("#table_vehicle").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this vehicle id : ${id}`)) {
    delete_vehicle(id);
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

      $("#modal_vehicle").modal("hide");
      $("#form_vehicle")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
