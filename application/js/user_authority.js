loadData();
fillUser();
$("#user_id").on("change", function () {
  let value = $(this).val();
  loadUserPermissions(value);
});
$("#all_authority").on("change", function () {
  if ($(this).is(":checked")) {
    $("input[type = 'checkbox']").prop("checked", true);
  } else {
    $("input[type = 'checkbox']").prop("checked", false);
  }
});
$("#authority_area").on(
  "change",
  "input[name='role_authority[]']",
  function () {
    let value = $(this).val();
    if ($(this).is(":checked")) {
      $(`#authority_area input[type = 'checkbox'][role= '${value}']`).prop(
        "checked",
        true
      );
    } else {
      $(`#authority_area input[type = 'checkbox'][role= '${value}']`).prop(
        "checked",
        false
      );
    }
  }
);
$("#authority_area").on("change", "input[name='system_links[]']", function () {
  let value = $(this).val();
  if ($(this).is(":checked")) {
    $(`#authority_area input[type = 'checkbox'][link_id= '${value}']`).prop(
      "checked",
      true
    );
  } else {
    $(`#authority_area input[type = 'checkbox'][link_id= '${value}']`).prop(
      "checked",
      false
    );
  }
});

function loadData() {
  let send_data = {
    action: "read_system_authority_view",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/user_authority_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;

      if (status) {
        let html = "";
        let role = "";
        let system_link = "";
        let system_action = "";
        response.forEach((item) => {
          for (let i in item) {
            if (item["role"] !== role) {
              html += `
                </fitemeldset>
                </div>
                </div>
                <div class="col-sm-3">
                <fieldset class="border border-3 border-dark rounded-3 p-3">
                    <legend class="float-none w-auto px-3 text-dark fw-bold">
                        <input type="checkbox" id="role_authority[]" name="role_authority[]" class="me-3"
                        value="${item["role"]}">
                        ${item["role"]}
                    </legend>
                
                `;
              role = item["role"];
            }
            if (item["link_name"] !== system_link) {
              html += `
                <div class="control-group">
                <label class="control-label input-label">
                <input type="checkbox" style =" margin-left : 45px; margin-bottom : 20px" id="system_links[]" name="system_links[]"
                value = "${item["link_id"]}" link_id = "${item["link_id"]}" role = "${item["role"]}" category_id ="${item["category_id"]}">
                ${item["link_name"]}
                </label>
                </div>
                `;
              system_link = item["link_name"];
            }
            // if (item["action_name"] !== system_action) {
            //   html += `
            //     <div class="system_actions">
            //     <label class="control-label input-label">
            //     <input type="checkbox" style =" margin-left : 75px; margin-bottom : 20px" id="system_actions[]" name="system_actions[]"
            //     value = "${item["action_id"]}" link_id = "${item["link_id"]}" role = "${item["role"]}" category_id ="${item["category_id"]}" action_id = "${item["action_id"]}">
            //     ${item["action_name"]}
            //     </label>
            //     </div>
            //     `;
            //   system_action = item["action_name"];
            // }
          }
        });

        $("#authority_area").append(html);
      } else {
        alert(response);
      }
    },
    error: function (data) {
      alert(data.responseText);
    },
  });
}
function fillUser() {
  let send_data = {
    action: "read_users",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/user_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      let html = "";
      if (status) {
        html += ` <option value="">Select User</option>`;
        response.forEach((item) => {
          html += ` <option value="${item["user_id"]}">${item["username"]}</option>`;
        });
        $("#user_id").append(html);
      } else {
        alert(response);
      }
    },
    error: function (data) {
      alert(data.responseText);
    },
  });
}
function loadUserPermissions(id) {
  let send_data = {
    action: "get_system_authority_sp",
    user_id: id,
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/user_authority_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        if (response.length >= 1) {
          response.forEach((user) => {
            $(
              `input[type = 'checkbox'][name = 'role_authority[]'][value = '${user["role"]}']`
            ).prop("checked", true);
            $(
              `input[type = 'checkbox'][name = 'system_links[]'][value = '${user["link_id"]}']`
            ).prop("checked", true);
            // $(`input[type = 'checkbox'][name = 'system_actions[]'][value = '${user['action_id']}']`).prop('checked', true);
          });
        } else {
          $("input[type = 'checkbox']").prop("checked", false);
        }
      } else {
        alert(response);
      }
    },
    error: function (data) {
      alert(data.responseText);
    },
  });
}

$("#form_user_authority").on("submit", function (event) {
  event.preventDefault();

  let user_id = $("#user_id").val();
  if (user_id == "") {
    $(".alert-danger").removeClass("d-none");
    $(".alert-success").addClass("d-none");
    $(".alert-danger").html("Please select user");
    setTimeout(() => {
      $(".alert-danger").addClass("d-none");
    }, 4000);
  } else {
    let actions = [];
    $("input[name='system_links[]']").each(function () {
      // console.log("Links clicked is : " + $(this).val());
      if ($(this).is(":checked")) {
        actions.push($(this).val());
      }
    });
    let sending_data = {};
    sending_data = {
      action: "register_user_authority",
      user_id,
      action_id: actions,
    };
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "../api/user_authority_api.php",
      data: sending_data,
      success: function (data) {
        let status = data.status;
        let response = data.message;
        if (status) {
          $(".alert-success").removeClass("d-none");
          $(".alert-danger").addClass("d-none");
          $(".alert-success").html(response);
          setTimeout(() => {
            $(".alert-success").addClass("d-none");
          }, 3000);
        } else {
          let ul = "<ul>";
          $(".alert-danger").removeClass("d-none");
          $(".alert-success").addClass("d-none");
          response.forEach((res) => {
            ul += `<li>${res["message"]}</li>`;
          });
          ul += "</ul>";
          $(".alert-danger").html(ul);
        }
      },
      error: function (data) {
        // displayAlert("error", data);
        // alert("Unknown error..." + data.responseText);
      },
    });
  }
});
