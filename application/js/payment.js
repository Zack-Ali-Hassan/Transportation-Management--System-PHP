let btn_Action = "Insert";
loadData();
fillCustomer();
$("#btn_add_payments").on("click", function () {
  $("#modal_payments").modal("show");
});
$("#form_payments").on("submit", (event) => {
  event.preventDefault();
  let customer_id = $("#customer_name").val();
  let amount = $("#amount").val();
  let payment_method = $("#payment_method").val();
  let id = $("#update_info").val();
  if (customer_id == "") {
    displayAlert("error", "Please enter a customer");
  } else if (amount == "") {
    displayAlert("error", "Please enter amount");
  }  else {
  let sending_data = {};
  if (btn_Action == "Insert") {
    sending_data = {
      action: "register_payment",
      customer_id,
      amount,
      payment_method
    };
  } else {
    sending_data = {
      id,
      customer_id,
      amount,
      payment_method,
      action: "update_payment",
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/payments_Api.php",
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
  });}
});

function loadData() {
  $("#table_payments tbody").html("");
  let send_data = {
    action: "read_payment",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/payments_Api.php",
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
          tr += `<td><a class="btn btn-primary update_info" update_info =${item["payment_id"]} ><i class="fas fa-edit"></i></a>
         &nbsp;&nbsp<a class="btn btn-danger delete_info" delete_info =${item["payment_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_payments tbody").append(tr);
        $("#table_payments").DataTable()
      }
      else {
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
        html += ` <option value="">Select Customer</option>`;
        response.forEach((item) => {
        html += ` <option value=${item['customer_id']}>${item['name']}</option>`;
        });
        $("#customer_name").append(html);
      }
      else {
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

function delete_payment(id) {
  let sending_data = {
    action: "delete_payment",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/payments_Api.php",
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
      else {
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
function fetch_payment(id) {
  let sending_data = {
    action: "read_single_payment",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/payments_Api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_payments").modal("show");
        $("#update_info").val(response[0].payment_id);
        $("#customer_name").val(response[0].customer_id);
        $("#amount").val(response[0].Amount);
        $("#payment_method").val(response[0].payment_method);
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

$("#table_payments").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_payment(id);
});
$("#table_payments").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this payment id : ${id}`)) {
    delete_payment(id);
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

      $("#modal_payments").modal("hide");
      $("#form_payments")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}