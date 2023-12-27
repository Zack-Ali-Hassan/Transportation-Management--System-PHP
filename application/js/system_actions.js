btn_Action = "Insert";
loadData();
fillLink();
$("#btn_add_system_action").on("click", function () {
  $("#modal_system_action").modal("show");
});
$("#form_system_action").on("submit", function (event) {
  event.preventDefault();

  let action_name = $("#action_name").val();
  let action_method = $("#action_method").val();
  let link_id = $("#link_id").val();
  let id = $("#update_info").val();
  let sending_data = {}
  if (btn_Action == "Insert") {
    sending_data = {
      action: "register_system_action",
      action_name,
      action_method,
      link_id,
    };
  } else {
    sending_data = {
      id,
      action_name,
      action_method,
      link_id,
      action: "update_system_action",
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_actions_api.php",
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
    //   alert("Unknown error...");
    },
  });
});

function loadData() {
  $("#table_system_action tbody").html("");
  let send_data = {
    action: "read_system_actions",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_actions_api.php",
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
          tr += `<td class="d-flex"><a class="btn btn-primary update_info m-2" update_info =${item["action_id"]} ><i class="fas fa-edit"></i></a>
              <a class="btn btn-danger delete_info m-2" delete_info =${item["action_id"]}><i class="fas fa-trash"></i></a></td>`;
          tr += "</tr>";
        });
        $("#table_system_action tbody").append(tr);

        $("#table_system_action").DataTable();
      }
      else{
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
function fillLink() {
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
        response.forEach((item) => {
          html +=`<option value="${item['link_id']}">${item['link_name']}</option>`;
         
        });
        $("#link_id").append(html);
      }
      else{
        displayAlert("error", response);
      }
    },
    error: function (data) {
        // displayAlert("error", data.responseText);
      alert(data.responseText);
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}

function delete_system_action(id) {
  let sending_data = {
    action: "delete_system_action",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_actions_api.php",
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
      }
      else{
        displayAlert("error", response);
      }
    },
    error: function (data) {
    //   alert("Unknown error...");
    displayAlert("error", data.responseText);
      // let errorMessage = xhr.responseText;
      // alert("Error: " + errorMessage);
    },
  });
}
function fetch_system_action(id) {
  let sending_data = {
    action: "read_single_system_action",
    id,
  };

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/system_actions_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        btn_Action = "Update";
        $("#modal_system_action").modal("show");
        $("#update_info").val(response[0].action_id);
        $("#action_name").val(response[0].action_name);
        $("#action_method").val(response[0].action);
        $("#link_id").val(response[0].link_id);
      }
      else{
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

$("#table_system_action").on("click", "a.update_info", function () {
  let id = $(this).attr("update_info");
  fetch_system_action(id);
});
$("#table_system_action").on("click", "a.delete_info", function () {
  let id = $(this).attr("delete_info");
  if (confirm(`Are you sure you want to delete this system action id : ${id}`)) {
    delete_system_action(id);
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
      $("#modal_system_action").modal("hide");
      $("#form_system_action")[0].reset();
    }, 3000);
  } else {
    error.classList = "alert alert-danger";
    success.classList = "alert alert-success d-none";
    error.innerHTML = message;
  }
}
