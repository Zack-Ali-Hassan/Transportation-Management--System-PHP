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
              <h5 class="card-title fw-semibold">User Table</h5>
            </div>
            <div>
            <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_user">Add New User</button>
            </div>
          </div>

          <div class="table-responsive">
            
            <table class="table" id="table_user">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
          <div class="modal" tabindex="-1" role="dialog" id="modal_user">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">User Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  
                  <form id="form_user" enctype="multipart/form-data">
                    <div class="row">
                      <div class="col-md-12">
                      <input type="hidden" name="update_info" id="update_info">
                    <div class="">
                      <div class="alert alert-success d-none" role="alert">
                        This is a success alert—check it out!
                      </div>
                      <div class="alert alert-danger d-none" role="alert">
                        This is a danger alert—check it out!
                      </div>
                    </div>
                      </div>
                    </div>
                  <div class="row">
                    <div class="col-md-6">
                    
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Username</label>
                      <input id="username" name="username" type="text" class="form-control username" placeholder="enter username">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Email</label>
                      <input id="email" name="email" type="email" class="form-control email" placeholder="enter email">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Password</label>
                      <input id="password" name="password" type="password" class="form-control password" placeholder="enter password">
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Image</label>
                      <input id="user_image" name="user_image" type="file" class="form-control image" placeholder="enter image">
                    </div>
                    <div class="row">
                      <div class="col-4">

                      </div>
                      <div class="col-8">
                      <div class="mb-3">
                      <img id="show_image" name="show_image" style="border: black solid 3px; width : 150px; height : 150px; border-radius : 50%; object-fit :cover;">
                    </div>
                      </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                   
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">User type</label>
                      <select class="form-control" name="type" id="type" name="type">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">Status</label>
                      <select class="form-control" name="status" id="status" name="status">
                        <option value="active">active</option>
                        <option value="inactive">in active</option>
                      </select>
                    </div>
                    </div>
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
<script src="../js/user.js"></script>