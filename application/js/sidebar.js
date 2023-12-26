loadUserMenu();
function loadUserMenu() {
  let send_data = {
    action: "get_system_menu_sp",
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
        let menuElement = "";
        let category = "";
        response.forEach((menu) => {
          if (menu["category_name"] !== category) {
            if (category !== "") {
              menuElement += "</ul></li>";
            }
            menuElement += `
           
         
          <li class="nav-small-cap">
          <i class=""></i>
          <span class="hide-menu "> ${menu['category_name']}</span>
        </li>
        


            `;
            category = menu["category_name"];
          }
          menuElement +=`
          
          <li class="sidebar-item">
          <a class="sidebar-link" href="${menu['link']}" aria-expanded="false">
            <span>
              <i class="${menu['link_icon']}"></i>
            </span>
            <span class="hide-menu  mx-2">${menu['link_name']}</span>
          </a>
        </li>
          `;
        });
        $("#user_menu").append(menuElement);
      } else {
        alert(response);
      }
    },
    error: function (data) {
      alert(data.responseText);
    },
  });
}
