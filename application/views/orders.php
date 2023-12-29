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
              <h5 class="card-title fw-semibold">Orders Table</h5>
            </div>
            <div>
              <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_orders">Add New Order</button>
            </div>
          </div>


          <div class="table-responsive">
            <table class="table" id="table_orders">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pickup location</th>
                  <th>Delivery location</th>
                  <th>Weight</th>
                  <th>Customer name</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Delivery Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
          <div class="modal" tabindex="-1" role="dialog" id="modal_orders">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Orders Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form id="form_orders">
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
                      <label for="exampleFormControlInput1" class="form-label">Pickup location</label>
                      <input id="pickup_location" type="text" class="form-control pickup_location" placeholder="Enter pickup location">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Delivery location</label>
                      <input id="delivery_location" type="text" class="form-control delivery_location" placeholder="Enter delivery location">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Weight</label>
                      <input id="weight" type="text" class="form-control weight" placeholder="Enter weight">
                    </div>


                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Customer name</label>
                      <select class="form-control" name="customer_name" id="customer_name">

                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Vehicle</label>
                      <select class="form-control" name="vehicle" id="vehicle">

                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Status</label>
                      <select class="form-control" name="type" id="type">
                        <option value="pending">Pending</option>
                        <option value="intransit">In Transit</option>
                        <option value="delivered">Delivered</option>
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
<script src="../js/order.js"></script>