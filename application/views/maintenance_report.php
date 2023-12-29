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
                            <h5 class="card-title fw-semibold">Maintenance report</h5>
                        </div>

                    </div>
                    <form id="form_maintenance_report" method="post">
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

                        </div>
                        <div>
                            <button class="btn btn-primary mt-4 mb-5"  id="generate">Generate</button>
                        </div>
                        <div id="report_area">
                        <h2 align="center" class="mb-3 "> <b> Maintenance Report</b> </h2>
                            <div class="table-responsive">

                                <table class="table table-bordered" id="table_maintenance_report" border="1" cellspacing="0" cellpadding="5px" width="100%" style="border-collapse: collapse;">
                                    <thead>
                                        <tr>
                                            <th>Vehicle number</th>
                                            <th>Maintenance type</th>
                                            <th>Maintenance description</th>
                                            <th>Cost</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-success mt-4 mb-5 me-3" type="button" id="print">Print</button>
                            <button class="btn btn-secondary mt-4 mb-5" type="button" id="export">Export</button>
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

<script src="../js/maintenance_report.js"></script>