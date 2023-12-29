btn_Action = "Insert";
loadData();
fillLink();
fillCategory();
$("#btn_add_system_link").on("click", function () {
  $("#modal_system_link").modal("show");
});
$("#form_system_link").on("submit", function (event) {
  event.preventDefault();

  let link_icon = $("#link_icon").val();
  let link_name = $("#link_name").val();
  let link = $("#link").val();
  let category_id = $("#category_id").val();
  let id = $("#update_info").val();
  if (link_icon == "") {
    displayAlert("error", "Please enter a link icon");
  } else if (link_name == "") {
    displayAlert("error", "Please enter a link name");
  } else if (link == "") {
    displayAlert("error", "Please select link");
  } else if (category_id == "") {
    displayAlert("error", "Please select a category");
  }
   else {
    let sending_data = {};
    if (btn_Action == "Insert") {
      sending_data = {
        action: "register_system_link",
        link_icon,
        link_name,
        link,
        category_id,
      };
    } else {
      sending_data = {
        id,
        link_icon,
        link_name,
        link,
        category_id,
        action: "update_system_link",
      };
    }

    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/system_links_api.php",
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
      },
    });
  }
});

function loadData() {
  $("#table_system_link tbody").html("");
  let send_data = {
    action: "read_system_links",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_links_api.php",
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
          tr += `<td class="d-flex"><a class="btn btn-primary update_info m-2" update_info =${item["link_id"]} ><i class="fas fa-edit"></i></a>
              <a class="btn btn-danger delete_info m-2" delete_info =${item["link_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_system_link tbody").append(tr);

        $("#table_system_link").DataTable();
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
function fillLink() {
  let send_data = {
    action: "fill_link",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_links_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        let html = "";
        response.forEach((item) => {
          html += `<option value="${item}">${item}</option>`;
        });
        $("#link").append(html);
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
function fillCategory() {
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
        response.forEach((item) => {
          html += `<option value="${item["category_id"]}">${item["category_name"]}</option>`;
        });
        $("#category_id").append(html);
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

function delete_system_link(id) {
  let sending_data = {
    action: "delete_system_link",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_links_api.php",
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
          title: "Error",
          text: response,
          icon: "warning",
        });
      }
    },
    error: function (data) {
      Swal.fire({
        title: "Error",
        text: data.responseText,
        icon: "warning",
      });
    },
  });
}
function fetch_system_link(id) {
  let sending_data = {
    action: "read_single_system_link",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_links_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_system_link").modal("show");
        $("#update_info").val(response[0].link_id);
        $("#link_icon").val(response[0].link_icon);
        $("#link_name").val(response[0].link_name);
        $("#link").val(response[0].link);
        $("#category_id").val(response[0].category_id);
      } else {
        displayAlert("error", response);
      }
    },
    error: function (data) {
      displayAlert("error", data.responseText);
      //   alert("Unknown error...");
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}

$("#table_system_link").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_system_link(id);
});
$("#table_system_link").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this system link id : ${id}`)) {
    delete_system_link(id);
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

      $("#modal_system_link").modal("hide");
      $("#form_system_link")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
