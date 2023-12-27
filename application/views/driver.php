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
              <h5 class="card-title fw-semibold">Driver Table</h5>
            </div>
            <div>
              <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_driver">Add New Driver</button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table" id="table_driver">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Vehicle</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
          <div class="modal" tabindex="-1" role="dialog" id="modal_driver">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Driver Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="form_driver">
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
                      <label for="exampleFormControlInput1" class="form-label">Name</label>
                      <input id="name" name="name" type="text" class="form-control name" placeholder="Enter name">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Mobile</label>
                      <input id="mobile" name="mobile" type="tel" class="form-control mobile" placeholder="Enter mobile">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Email</label>
                      <input id="email" name="email" type="email" class="form-control email" placeholder="Enter email">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Vehicle</label>
                      <select class="form-control" name="vehicle" id="vehicle">

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


<script src="../js/driver.js"></script>