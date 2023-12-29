btn_Action = "Insert";
loadData();
$("#btn_add_category").on("click", function () {
  $("#modal_category").modal("show");
});
$("#form_category").on("submit", function (event) {
  event.preventDefault();

  let category_name = $("#category_name").val();
  let category_icon = $("#category_icon").val();
  let role = $("#role").val();
  let id = $("#update_info").val();
  if (category_name == "") {
    displayAlert("error", "Please enter a category name");
  } else if (category_icon == "") {
    displayAlert("error", "Please enter a category icon");
  } else if (role == "") {
    displayAlert("error", "Please select a role");
  } else {
    let sending_data = {};
    if (btn_Action == "Insert") {
      sending_data = {
        action: "register_category",
        category_name,
        category_icon,
        role,
      };
    } else {
      sending_data = {
        id,
        category_name,
        category_icon,
        role,
        action: "update_category",
      };
    }

    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/category_api.php",
      data: sending_data,
      success: function (data) {
        let status = data.status;
        let response = data.message;
        if (status) {
          displayAlert("success", response);

          btn_Action = "Insert";
          loadData();
        } else {
          displayAlert("error", data.data);
        }
      },
      error: function (data) {
        displayAlert("error", data);
        //   alert("Unknown error...");
      },
    });
  }
});

function loadData() {
  $("#table_category tbody").html("");
  let send_data = {
    action: "read_categorys",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/category_api.php",
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
          tr += `<td class="d-flex"><a class="btn btn-primary update_info m-2" update_info =${item["category_id"]} ><i class="fas fa-edit"></i></a>
              <a class="btn btn-danger delete_info m-2" delete_info =${item["category_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_category tbody").append(tr);

        $("#table_category").DataTable();
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

function delete_category(id) {
  let sending_data = {
    action: "delete_category",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/category_api.php",
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
function fetch_category(id) {
  let sending_data = {
    action: "read_single_category",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/category_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_category").modal("show");
        $("#update_info").val(response[0].category_id);
        $("#category_name").val(response[0].category_name);
        $("#category_icon").val(response[0].category_icon);
        $("#role").val(response[0].role);
      } else {
        displayAlert("error", response);
      }
    },
    error: function (data) {
      displayAlert("error", data.responseText);
    },
  });
}

$("#table_category").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_category(id);
});
$("#table_category").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this category id : ${id}`)) {
    delete_category(id);
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

      $("#modal_category").modal("hide");
      $("#form_category")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
