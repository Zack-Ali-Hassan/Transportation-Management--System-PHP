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
                            <h5 class="card-title fw-semibold">Category Table</h5>
                        </div>
                        <div>
                            <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_category">Add New Category</button>
                        </div>
                    </div>
                    <div class="table-responsive">

                        <table class="table" id="table_category">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Category Icon</th>
                                    <th>Role</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="modal" tabindex="-1" role="dialog" id="modal_category">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Category Information</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form id="form_category">
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
                                            <label class="form-label">Category Name</label>
                                            <input id="category_name" name="category_name" type="text" class="form-control category_name" placeholder="Enter category name">
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Category Icon</label>
                                            <input id="category_icon" name="category_icon" type="text" class="form-control category_icon" placeholder="Enter category icon">
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Category Role</label>
                                            <select class="form-control" name="role" id="role">
                                                <option value="">Select Role</option>
                                                <option value="Dashboard">Dashboard</option>
                                                <option value="Subscriber">Subscriber</option>
                                                <option value="Superadmin">Superadmin</option>
                                                <option value="Reports">Reports</option>
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

<script src="../js/category.js"></script>