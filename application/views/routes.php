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
              <h5 class="card-title fw-semibold">Routes Table</h5>
            </div>
            <div>
              <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_routes">Add New Routes</button>
            </div>
          </div>
          <div class="table-responsive">

            <table class="table" id="table_routes">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Source location</th>
                  <th>Destination location</th>
                  <th>Distance</th>
                  <th>Estimated time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
          <div class="modal" tabindex="-1" role="dialog" id="modal_routes">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Routes Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="form_route">
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
                      <label class="form-label">Source location</label>
                      <input id="source_location" name="source_location" type="text" class="form-control source_location" placeholder="Enter source location">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Destination location</label>
                      <input id="destination_location" name="destination_location" type="text" class="form-control destination_location" placeholder="Enter destination location">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Distance</label>
                      <input id="distance" name="distance" type="text" class="form-control distance" placeholder="Enter distance">
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Estimated time</label>
                      <input id="estimated_time" name="estimated_time" type="text" class="form-control estimated_time" placeholder="Enter estimated time">
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

<script src="../js/routes_table.js"></script>