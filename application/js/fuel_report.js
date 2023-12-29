fillVehicle();
let generate =false;
$("#start_date").attr("disabled", true);
$("#end_date").attr("disabled", true);

$("#report_type").on("change", function () {
  if ($("#report_type").val() == "All") {
    $("#start_date").attr("disabled", true);
    $("#end_date").attr("disabled", true);
  } else {
    $("#start_date").attr("disabled", false);
    $("#end_date").attr("disabled", false);
  }
});
$("#form_fuel_report").on("submit", (event) => {
    generate=true;
  event.preventDefault();
  $("#table_fuel_report tbody").html("");
  let report_type = $("#report_type").val();
  let vehicle_id = $("#vehicle_id").val();
  let start_date = $("#start_date").val();
  let end_date = $("#end_date").val();
  let sending_data = {};
  if (report_type != "All") {
    if(start_date == ""){
        displayAlert("error", "please select a start date")
    }
    else if(end_date == ""){
        displayAlert("error", "please select a end date")
    }
    sending_data = {
      action: "read_fuel_report",
      report_type,
      vehicle_id,
      start_date,
      end_date,
    };
  } else {
    sending_data = {
      report_type,
      vehicle_id,
      start_date: "",
      end_date: "",
      action: "read_fuel_report",
    };
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/fuel_report_api.php",
    data: sending_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      if (status) {
        let tr = "";
        response.forEach((item) => {
          tr += "<tr>";
          for (let data in item) {
            tr += `<td>${item[data]}</td>`;
          }
        });
        $("#table_fuel_report tbody").append(tr);
      } else {
        displayAlert("error", response)
      }
    },
    error: function (data) {
      displayAlert("error", data.responseText)
    },
  });
});

$("#print").on("click", function(){
    if(generate){
        var report_area = $("#report_area").html();
        var win = window.open("");
        win.document.write("<html><body>")
        win.document.write(report_area)
        win.document.write("</body></html>")
        win.print();
        win.close();
    }
    else{
        displayAlert("error", "please generate report before print...")
    }
   
})
$('#export').on('click', function() {
    if(generate){
        $("#search").hide();
        let file = new Blob([$('#report_area').html()], {type:"application/vnd.ms-excel"});
        let url = URL.createObjectURL(file);
        let a = $("<a />", {
          href: url,
          download: "OrderReport.xls"}).appendTo("body").get(0).click();
    }else{
        displayAlert("error", "please generate report before export...")
    }
   
});
function fillVehicle() {
  let send_data = {
    action: "read_vehicles",
  };
  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "../api/vehicle_api.php",
    data: send_data,
    success: function (data) {
      let status = data.status;
      let response = data.message;
      let html = "";
      if (status) {
        html += ` <option value="">All Vehicles</option>`;
        response.forEach((item) => {
          html += ` <option value=${item["vehicle_id"]}>${item["vehicle_number"]}</option>`;
        });
        $("#vehicle_id").append(html);
      }
    },
    error: function (data) {
      alert("Unknow error");
    },
  });
}
function displayAlert(type, message) {
    let success = document.querySelector(".alert-success");
    let error = document.querySelector(".alert-danger");
    if (type == "success") {
      success.classList = "alert alert-success";
      error.classList = "alert alert-danger d-none";
      success.innerHTML = message;
      setTimeout(() => {
        success.classList = "alert alert-success d-none";
  
        $("#modal_vehicle").modal("hide");
        $("#form_vehicle")[0].reset();
      }, 3000);
    } else {
      error.classList = "alert alert-danger";
      success.classList = "alert alert-success d-none";
      error.innerHTML = message;
      setTimeout(() => {
        error.classList = "alert alert-danger d-none";
      }, 3000)
    }
  }