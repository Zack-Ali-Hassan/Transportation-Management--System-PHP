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
                            <h5 class="card-title fw-semibold">User profile</h5>
                        </div>

                    </div>
                    <form id="form_user_profile" method="post">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-success d-none" role="alert">
                                    This is a success alert—check it out!
                                </div>
                                <div class="alert alert-danger d-none" role="alert">
                                    This is a danger alert—check it out!
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <input type="hidden" name="update_info" id="update_info" value="<?php echo $_SESSION['user_id'] ?>">
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
                                    <input id="username" name="username" type="text" class="form-control username" placeholder="enter username" value="<?php echo $_SESSION['username'] ?>">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                                    <input id="email" name="email" type="email" class="form-control email" placeholder="enter email" value="<?php echo $_SESSION['email'] ?>">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Password</label>
                                    <input id="password" name="password" type="password" class="form-control password" placeholder="enter password" value="<?php echo $_SESSION['password'] ?>">
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
                                            <img src="<?php echo "../uploads/" . $_SESSION['user_image'] ?>" id="show_image" name="show_image" style="border: black solid 3px; width : 150px; height : 150px; border-radius : 50%; object-fit :cover;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">

                                <div class="mb-3">
                                    <label for="type" class="form-label">User type</label>
                                    <select class="form-control" name="type" id="type">
                                        <option value="user" <?php echo ($_SESSION['type'] == 'user') ? 'selected' : ''; ?>>user</option>
                                        <option value="admin" <?php echo ($_SESSION['type'] == 'admin') ? 'selected' : ''; ?>>admin</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status</label>
                                    <select class="form-control" name="status" id="status">
                                        <option value="active" <?php echo ($_SESSION['status'] == 'active') ? 'selected' : ''; ?>>Active</option>
                                        <option value="inactive" <?php echo ($_SESSION['status'] == 'inactive') ? 'selected' : ''; ?>>Inactive</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label for="" class="form-label">Type</label>
                                    <select class="form-control" name="report_type" id="report_type">
                                        <option value="All">All</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </div>
                            </div>
                          
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label for="" class="form-label">Vehicle</label>
                                    <select class="form-control" name="vehicle_id" id="vehicle_id">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label for="" class="form-label">Start date</label>
                                    <input type="date" class="form-control" name="start_date" id="start_date">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label for="" class="form-label">End date</label>
                                    <input type="date" class="form-control" name="end_date" id="end_date">
                                </div>
                            </div>

                        </div> -->

                        <div class="d-flex justify-content-end">
                            <button class="btn btn-secondary mt-4 mb-5 me-3" type="submit" id="edit_user_profile">Edit profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>






<?php
include_once "../includes/footer.php";
?>

<script src="../js/user_profile.js"></script>