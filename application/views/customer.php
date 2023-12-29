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
              <h5 class="card-title fw-semibold">Customer Table</h5>
            </div>
            <div>
              <button class="btn btn-outline-primary float-left mt-4 mb-5" type="submit" id="btn_add_customer">Add New Customer</button>
            </div>
          </div>


          <div class="table-responsive">

            <table class="table" id="table_customer">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <div class="modal" tabindex="-1" role="dialog" id="modal_customer">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Customer Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="form_customer">

                    <input type="hidden" name="update_info" id="update_info">
                    <div>
                      <div class="alert alert-success d-none" role="alert">
                        This is a success alert—check it out!
                      </div>
                      <div class="alert alert-danger d-none" role="alert">
                        This is a danger alert—check it out!
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Name</label>
                      <input id="name" name="name" type="text" class="form-control name" placeholder="Enter name" >
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Gender</label>
                      <select class="form-control" name="gender" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Address</label>
                      <input type="text" class="form-control address" id="address" name="address" placeholder="Enter address" >
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Mobile</label>
                      <input type="tel" class="form-control mobile" id="mobile" name="mobile" placeholder="Enter mobile" >
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Email</label>
                      <input type="email" class="form-control email" id="email" name="email" placeholder="Enter email" >
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
<script src="../js/customer.js"></script>