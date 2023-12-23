let btn_Action = "Insert";
loadData();
fillVehicle();
$("#btn_add_maintenance_record").on("click", function () {
  $("#modal_maintenance_record").modal("show");
});
$("#form_maintenance_record").on("submit", (event) => {
  event.preventDefault();
  let Maintenance_type = $("#maintenance_type").val();
  let description = $("#description").val();
  let cost = $("#cost").val();
  let vehicle_id = $("#vehicle").val();
  let id = $("#update_info").val();
  let sending_data = {};
  if (btn_Action == "Insert") {
    sending_data = {
      action: "register_maintenance_record",
      Maintenance_type,
      description,
      cost,
      vehicle_id,
    };
  } else {
    sending_data = {
      id,
      Maintenance_type,
      description,
      cost,
      vehicle_id,
      action: "update_maintenance_record",
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/maintenance_record_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        displayAlert("success", response);
      
        btn_Action = "Insert";
        loadData();
      }
    },
    error: function (data) {
      alert("Unknown error...");
    },
  });
});

function loadData() {
  $("#table_maintenance_record tbody").html("");
  let send_data = {
    action: "read_maintenance_record",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/maintenance_record_api.php",
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
          tr += `<td class="d-flex"><a class="btn btn-primary update_info m-2" update_info =${item["maintenance_id"]} ><i class="fas fa-edit"></i></a>
                 <a class="btn btn-danger delete_info m-2" delete_info =${item["maintenance_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_maintenance_record tbody").append(tr);
        $("#table_maintenance_record").DataTable()
      }
    },
    error: function (data) {
      alert("Unknow error")
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
      let html ="";
      if (status) {
        html += ` <option value="0">Select vehicle</option>`;
        response.forEach((item) => {
        html += ` <option value=${item['vehicle_id']}>${item['vehicle_number']}</option>`;
        });
        $("#vehicle").append(html);
      }
    },
    error: function (data) {
      alert("Unknow error")
    },
  });
}

function delete_maintenance(id) {
  let sending_data = {
    action: "delete_maintenance_record",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/maintenance_record_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        Swal.fire({
          title: "Good job",
          text: response,
          icon: "success"
        });
        // alert(response);
        loadData();
      }
    },
    error: function (xhr, status, error) {
      alert("Unknown error...");
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}
function fetch_maintenance(id) {
  let sending_data = {
    action: "read_single_maintenance_record",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/maintenance_record_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_maintenance_record").modal("show");
        $("#update_info").val(response[0].maintenance_id);
        $("#maintenance_type").val(response[0].Maintenance_type);
        $("#description").val(response[0].description);
        $("#cost").val(response[0].cost);
        $("#vehicle").val(response[0].vehicle_id);
      }
    },
    error: function (xhr, status, error) {
      alert("Unknown error...");
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}

$("#table_maintenance_record").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_maintenance(id);
});
$("#table_maintenance_record").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this maintenance record id : ${id}`)) {
    delete_maintenance(id);
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

      $("#modal_maintenance_record").modal("hide");
      $("#form_maintenance_record")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}