let btn_Action = "Insert";
loadData();
fillCustomer();
$("#btn_add_invoice").on("click", function () {
  $("#modal_invoice").modal("show");
});
$("#form_invoice").on("submit", (event) => {
  event.preventDefault();
  let customer_id = $("#customer_name").val();
  let amount = $("#amount").val();
  let payment_status = $("#payment_status").val();
  let id = $("#update_info").val();
  let sending_data = {};
  if (btn_Action == "Insert") {
    sending_data = {
      action: "register_invoice",
      customer_id,
      amount,
      payment_status
    };
  } else {
    sending_data = {
      id,
      customer_id,
      amount,
      payment_status,
      action: "update_invoice",
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/invoice_api.php",
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
  $("#table_invoice tbody").html("");
  let send_data = {
    action: "read_invoices",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/invoice_api.php",
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
          tr += `<td><a class="btn btn-primary update_info" update_info =${item["invoice_id"]} ><i class="fas fa-edit"></i></a>
         &nbsp;&nbsp<a class="btn btn-danger delete_info" delete_info =${item["invoice_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_invoice tbody").append(tr);
        $("#table_invoice").DataTable()
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

function delete_invoice(id) {
  let sending_data = {
    action: "delete_invoice",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/invoice_api.php",
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
function fetch_invoice(id) {
  let sending_data = {
    action: "read_single_invoice",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/invoice_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_invoice").modal("show");
        $("#update_info").val(response[0].invoice_id);
        $("#customer_name").val(response[0].customer_id);
        $("#amount").val(response[0].amount);
        $("#payment_status").val(response[0].payment_status);
      }
    },
    error: function (xhr, status, error) {
      alert("Unknown error...");
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}

$("#table_invoice").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_invoice(id);
});
$("#table_invoice").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this invoice id : ${id}`)) {
    delete_invoice(id);
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

      $("#modal_invoice").modal("hide");
      $("#form_invoice")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}