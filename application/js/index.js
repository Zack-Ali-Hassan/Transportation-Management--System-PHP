loadData();
total_fuel();
total_maintenance();
function total_fuel() {
  let send_data = {
    action: "get_total_fuel_cost",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/index_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;

      if (status) {
        document.querySelector("#total_fuel_cost").innerHTML =
          "$ " + response[0].total;
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
function total_maintenance() {
  let send_data = {
    action: "get_total_maintenance_cost",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/index_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;

      if (status) {
        document.querySelector("#total_maintenance_cost").innerHTML =
          "$ " + response[0].total;
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
function loadData() {
  $("#last_order_table tbody").html("");
  let send_data = {
    action: "get_last_orders",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/index_api.php",
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
            if (data == "status") {
              if (item["status"] == "pending") {
                tr += `<td class="border-bottom-0"><div class="d-flex align-items-center gap-2">
                        <span class="badge bg-danger rounded-3 fw-semibold">${item[data]}</span>
                      </div> </td>`;
              } else if (item["status"] == "intransit") {
                tr += `<td class="border-bottom-0"><div class="d-flex align-items-center gap-2">
                        <span class="badge bg-primary rounded-3 fw-semibold">${item[data]}</span>
                      </div> </td>`;
              } else if (item["status"] == "delivered") {
                tr += `<td class="border-bottom-0"><div class="d-flex align-items-center gap-2">
                        <span class="badge bg-success rounded-3 fw-semibold">${item[data]}</span>
                      </div> </td>`;
              }
            } else {
              tr += `<td class="border-bottom-0"> ${item[data]}</td>`;
            }
          }
        });
        $("#last_order_table tbody").append(tr);
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
