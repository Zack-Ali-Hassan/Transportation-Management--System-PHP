<?php
include_once "../includes/sessions.php";
include_once "../includes/sidebar.php";

include_once "../includes/header.php";

?>




<div class="container-fluid">
  <!--  Row 1 -->
  <div class="row">
    <div class="col-lg-12 d-flex align-items-strech">
      <div class="card w-100">
        <div class="card-body">
        <div class="d-sm-flex d-flex align-items-center justify-content-between mb-9" style="border-bottom : solid 2px black">
            <div class="mb-3 mb-sm-0">
            <h5 class="card-title fw-semibold">Vehicle Table</h5>
            </div>
            <div>
            <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_vehicle">Add New Vehicle</button>            </div>
          </div>
          <div class="table-responsive">
            <table class="table" id="table_vehicle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Vehicle number</th>
                  <th>Type</th>
                  <th>Fuel type</th>
                  <th>Capacity</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
          <div class="modal" tabindex="-1" role="dialog" id="modal_vehicle">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Vehicle Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="form_vehicle">
                    <input type="hidden" name="update_info" id="update_info">
                    <div class="">
                      <div class="alert alert-success d-none" role="alert">
                        This is a success alert—check it out!
                      </div>
                      <div class="alert alert-danger d-none" role="alert">
                        This is a danger alert—check it out!
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Vehicle number</label>
                      <input id="vehicle_number" name="vehicle_number" type="text" class="form-control vehicle_number" placeholder="Enter vehicle number">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Type</label>
                      <select class="form-control" name="type" id="type">
                        <option value="bajaaj">Bajaaj</option>
                        <option value="diyaarad">Diyaarad</option>
                        <option value="tareen">Tareen</option>
                        <option value="bmw">Bmw</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Fuel Type</label>
                      <select class="form-control" name="fuel_type" id="fuel_type">
                        <option value="Baasin">Baasin</option>
                        <option value="Naafto">Naafto</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Capacity</label>
                      <input id="capacity" name="capacity" type="text" class="form-control capacity" placeholder="Enter capacity">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Location</label>
                      <input id="location" name="location" type="text" class="form-control location" placeholder="Enter location">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Status</label>
                      <select class="form-control" name="status" id="status">
                        <option value="active">Active</option>
                        <option value="inactive">In active</option>
                      </select>
                    </div>
                </div>
                <div class="modal-footer">
                  
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>






<?php
include_once "../includes/footer.php";
?>
<script src="../js/vehicle.js"></script>