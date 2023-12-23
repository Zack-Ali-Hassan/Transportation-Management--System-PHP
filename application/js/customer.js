btn_Action = "Insert";
loadData();
$("#btn_add_customer").on("click", function () {
  $("#modal_customer").modal("show");
});
$("#form_customer").on("submit", (event) => {
  event.preventDefault();

  let name = $("#name").val();
  let gender = $("#gender").val();
  let address = $("#address").val();
  let mobile = $("#mobile").val();
  let email = $("#email").val();
  let id = $("#update_info").val();
  let sending_data = {};
  if (btn_Action == "Insert") {
    sending_data = {
      action: "register_customer",
      name,
      gender,
      address,
      mobile,
      email,
    };
  } else {
    sending_data = {
      id,
      name,
      gender,
      address,
      mobile,
      email,
      action: "update_customer",
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/customers_api.php",
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
  $("#table_customer tbody").html("");
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

      if (status) {
        let html = "";
        let tr = "";
        response.forEach((item) => {
          
          tr += "<tr>";
          for (let data in item) {
            tr += `<td>${item[data]}</td>`;
          }
          tr += `<td><a class="btn btn-primary update_info" update_info =${item["customer_id"]} ><i class="fas fa-edit"></i></a>
         &nbsp;&nbsp <a class="btn btn-danger delete_info" delete_info =${item["customer_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        console.log(tr)
        $("#table_customer tbody").append(tr);
      
        $("#table_customer").DataTable()
      }
    
    },
    error: function (data) {
      console.log("errror: " + data);
    },
  });
}

function delete_customer(id) {
  let sending_data = {
    action: "delete_customer",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/customers_api.php",
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
function fetch_customer(id) {
  let sending_data = {
    action: "read_single_customer",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/customers_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_customer").modal("show");
        $("#update_info").val(response[0].customer_id);
        $("#name").val(response[0].name);
        $("#gender").val(response[0].gender);
        $("#address").val(response[0].address);
        $("#mobile").val(response[0].mobile);
        $("#email").val(response[0].email);
      }
    },
    error: function (xhr, status, error) {
      alert("Unknown error...");
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}

$("#table_customer").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_customer(id);
});
$("#table_customer").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this customer id : ${id}`)) {
    delete_customer(id);
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

      $("#modal_customer").modal("hide");
      $("#form_customer")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}