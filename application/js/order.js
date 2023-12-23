let btn_Action = "Insert";
loadData();
fillVehicle();
fillCustomer();
$("#btn_add_orders").on("click", function () {
  $("#modal_orders").modal("show");
});
$("#form_orders").on("submit", (event) => {
  event.preventDefault();
  let pickup_location = $("#pickup_location").val();
  let delivery_location = $("#delivery_location").val();
  let weight = $("#weight").val();
  let customer_id = $("#customer_name").val();
  let vehicle_id = $("#vehicle").val();
  let status = $("#type").val();
  let id = $("#update_info").val();
  let sending_data = {};
  if (btn_Action == "Insert") {
    sending_data = {
      action: "register_order",
      pickup_location,
      delivery_location,
      weight,
      vehicle_id,
      customer_id,
      status
    };
  } else {
    sending_data = {
      id,
      pickup_location,
      delivery_location,
      weight,
      vehicle_id,
      customer_id,
      status,
      action: "update_order",
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/order_api.php",
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
  $("#table_orders tbody").html("");
  let send_data = {
    action: "read_orders",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/order_api.php",
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
          tr += `<td><a class="btn btn-primary update_info" update_info =${item["order_id"]} ><i class="fas fa-edit"></i></a>
         &nbsp;&nbsp<a class="btn btn-danger delete_info" delete_info =${item["order_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_orders tbody").append(tr);
        $("#table_orders").DataTable()
      }
    },
    error: function (data) {
      alert("Unknow error")
    },
  });
}
function fillCustomer() {
  let send_data = {
    action: "read_customers",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/customers_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      let html ="";
      if (status) {
        html += ` <option value="0">Select Customer</option>`;
        response.forEach((item) => {
        html += ` <option value=${item['customer_id']}>${item['name']}</option>`;
        });
        $("#customer_name").append(html);
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

function delete_order(id) {
  let sending_data = {
    action: "delete_order",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/order_api.php",
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
function fetch_order(id) {
  let sending_data = {
    action: "read_single_order",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/order_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_orders").modal("show");
        $("#update_info").val(response[0].order_id);
        $("#pickup_location").val(response[0].pickup_location);
        $("#delivery_location").val(response[0].delivery_location);
        $("#weight").val(response[0].weight);
        $("#customer_name").val(response[0].customer_id);
        $("#vehicle").val(response[0].vehicle_id);
        // console.log("Customer id is : " + response[0].customer_id);
        // console.log("Vehicle id is : " + response[0].vehicle_id);
        $("#type").val(response[0].status);
      }
    },
    error: function (xhr, status, error) {
      alert("Unknown error...");
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}

$("#table_orders").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_order(id);
});
$("#table_orders").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this order id : ${id}`)) {
    delete_order(id);
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

      $("#modal_orders").modal("hide");
      $("#form_orders")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}