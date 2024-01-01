<?php
include_once "../includes/sessions.php";
include_once "../includes/sidebar.php";

include_once "../includes/header.php";

?>


<style>
    fieldset.authority-border {
        border: 1px groove #ddd !important;
        padding: 0 1.4em 1.4em 1.4em !important;
        margin: 0 0 1.5em !important;
        -webkit-box-shodow: 0px 0px 0px 0px #ea0707;
    }



    legend.authority-border {
        width: inherit;
        padding: 0 10px;
        border-bottom: none;

    }

    input[type=checkbox] {
        transform: scale(1.5);
        margin: 5px;
    }

    #all_authority {
        transform: scale(2);
        margin: 10px;
    }
</style>

<div class="container-fluid">
    <!--  Row 1 -->
    <div class="row">
        <div class="col-lg-12 d-flex align-items-strech">
            <div class="card w-100">
                <div class="card-body">
                    <div class="d-sm-flex d-flex align-items-center justify-content-between mb-9" style="border-bottom : solid 2px black">
                        <div class="mb-3 mb-sm-0">
                            <h5 class="card-title fw-semibold">User Authority</h5>
                        </div>

                    </div>
                    <form action="" id="form_user_authority">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="alert alert-success d-none" role="alert">
                                    This is a success alert—check it out!
                                </div>
                                <div class="alert alert-danger d-none" role="alert">
                                    This is a danger alert—check it out!
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="mb-3">
                                    <select class="form-control" name="user_id" id="user_id">

                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset class="border border-3 border-dark rounded-1 p-3">
                                    <legend class="float-none w-auto px-3 text-dark fw-bold">
                                        <input type="checkbox" id="all_authority" name="all_authority" class="me-3">
                                        All Authorities
                                    </legend>
                                    <div class="row" id="authority_area" name="authority_area">
                                    </div>
                                    <div>
                                        <button class="btn btn-outline-primary float-right mt-4 mb-5" type="submit" id="btn_add_user_authority">Authorize user</button>
                                    </div>
                                </fieldset>
                            </div>
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

<script src="../js/user_authority.js"></script>