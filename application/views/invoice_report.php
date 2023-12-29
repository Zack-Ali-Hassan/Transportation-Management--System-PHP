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
                            <h5 class="card-title fw-semibold">Invoice report</h5>
                        </div>

                    </div>
                    <form id="form_invoice_report">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <select class="form-control" name="role" id="role">
                                        <option value="">All Customers</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <select class="form-control" name="role" id="role">
                                        <option value="">All Customers</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary mt-4 mb-5" type="submit" id="generate">Generate</button>
                        </div>
                    </form>

                    <div class="report_area">
                        <div class="table-responsive">

                            <table class="table" id="table_invoice_report">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Customer Name</th>
                                        <th>Pickup_location</th>
                                        <th>Delivery_location</th>
                                        <th>Weight</th>
                                        <th>Vehicle number</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
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

<script src="../js/invoice_report.js"></script>