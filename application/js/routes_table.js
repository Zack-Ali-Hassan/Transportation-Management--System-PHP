let btn_Action = "Insert";
loadData();
$("#btn_add_routes").on("click", function () {
  $("#modal_routes").modal("show");
});
$("#form_route").on("submit", (event) => {
  event.preventDefault();

  let source_location = $("#source_location").val();
  let destination_location = $("#destination_location").val();
  let distance = $("#distance").val();
  let estimated_time = $("#estimated_time").val();
  let id = $("#update_info").val();
  if (source_location == "") {
    displayAlert("error", "Please enter a source location");
  } else if (destination_location == "") {
    displayAlert("error", "Please enter a destination location");
  } else if (distance == "") {
    displayAlert("error", "Please enter a distance");
  } else if (estimated_time == "") {
    displayAlert("error", "Please enter a estimated time");
  } else {
    let sending_data = {};
    if (btn_Action == "Insert") {
      sending_data = {
        action: "register_route",
        source_location,
        destination_location,
        distance,
        estimated_time,
      };
    } else {
      sending_data = {
        id,
        source_location,
        destination_location,
        distance,
        estimated_time,
        action: "update_route",
      };
    }

    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/routes_api.php",
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
  $("#table_routes tbody").html("");
  let send_data = {
    action: "read_routes",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/routes_api.php",
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
          <a class="btn btn-primary update_info" update_info =${item["route_id"]} ><i class="fas fa-edit"></i></a>
          &nbsp;&nbsp <a class="btn btn-danger delete_info" delete_info =${item["route_id"]}><i class="fas fa-trash"></i></a>
            
            </td>`;
          tr += "</tr>";
        });
        $("#table_routes tbody").append(tr);
        $("#table_routes").DataTable();
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

function delete_route(id) {
  let sending_data = {
    action: "delete_route",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/routes_api.php",
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
function fetch_route(id) {
  let sending_data = {
    action: "read_single_route",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/routes_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      console.log("Status is : " + status);
      if (status) {
        btn_Action = "Update";
        $("#modal_routes").modal("show");
        $("#update_info").val(response[0].route_id);
        $("#source_location").val(response[0].source_location);
        $("#destination_location").val(response[0].destination_location);
        $("#distance").val(response[0].distance);
        $("#estimated_time").val(response[0].estimated_time);
      } else {
        displayAlert("error", response);
      }
    },
    error: function (data) {
      displayAlert("error", data.responseText);
    },
  });
}

$("#table_routes").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_route(id);
});
$("#table_routes").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this route id : ${id}`)) {
    delete_route(id);
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

      $("#modal_routes").modal("hide");
      $("#form_route")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
