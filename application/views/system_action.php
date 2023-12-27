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
                            <h5 class="card-title fw-semibold">System Action Table</h5>
                        </div>
                        <div>
                            <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_system_action">Add New Action</button>
                        </div>
                    </div>
                    <div class="table-responsive">

                        <table class="table" id="table_system_action">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Action Name</th>
                                    <th>Action</th>
                                    <th>Link</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="modal" tabindex="-1" role="dialog" id="modal_system_action">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">System Action Information</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form id="form_system_action">
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
                                            <label class="form-label">Action Name</label>
                                            <input id="action_name" name="action_name" type="text" class="form-control action_name" placeholder="Enter action name">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Action</label>
                                            <input id="action_method" name="action_method" type="text" class="form-control action_method" placeholder="Enter action">
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Link</label>
                                            <select class="form-control" name="link_id" id="link_id">
                                                <option value="0">Select Link</option>
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

<script src="../js/system_actions.js"></script>