loadData();
fillCustomer();
function loadData() {
  let send_data = {
    action: "read_system_authority",
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
            if (item['role'] !== role) {
              html += `
                </fitemeldset>
                </div>
                </div>
                <div class="col-sm-4">
                <fieldset class="border border-3 border-dark rounded-3 p-3">
                    <legend class="float-none w-auto px-3 text-dark fw-bold">
                        <input type="checkbox" id="system_links[]" name="system_links[]" class="me-3">
                        ${item['role']}
                    </legend>
                
                `;
              role = item['role'];
            }
            if(item['link_name'] !== system_link){
                html += `
                <div class="control-group">
                <label class="control-label input-label">
                <input type="checkbox" style =" margin-left : 45px; margin-bottom : 20px" id="system_links[]" name="system_links[]">
                ${item['link_name']}
                </label>
                </div>
                `;
                system_link = item['link_name'];
            }
            if(item['action_name'] !== system_action){
                html += `
                <div class="system_actions">
                <label class="control-label input-label">
                <input type="checkbox" style =" margin-left : 75px; margin-bottom : 20px" id="system_actions[]" name="system_actions[]">
                ${item['action_name']}
                </label>
                </div>
                `;
                system_action = item['action_name'];
            }
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
function fillCustomer() {
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
        let html ="";
        if (status) {
          response.forEach((item) => {
          html += ` <option value=${item['user_id']}>${item['username']}</option>`;
          });
          $("#user_id").append(html);
        }
        else{
            alert(response)
        }
      },
      error: function (data) {
        alert(data.responseText);
      },
    });
}