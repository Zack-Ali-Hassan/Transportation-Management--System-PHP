<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_drivers($conn)
{
    $data = array();
    $message = array();
    $query = "SELECT drivers.driver_id, drivers.name, drivers.mobile, drivers.email, vehicles.vehicle_number FROM vehicles INNER JOIN drivers ON vehicles.vehicle_id = drivers.VehicleID;";
    $result = $conn->query($query);
    if ($result) {
        while ($row = $result->fetch_Assoc()) {
            $data[] = $row;
        }
        $message = array("status" => true, "message" => $data);
    } else {
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function read_single_driver($conn)
{
    extract($_POST);
    $data = array();
    $message = array();
    $query = "SELECT * FROM drivers where driver_id  = $id";
    $result = $conn->query($query);
    if ($result) {
        while ($row = $result->fetch_Assoc()) {
            $data[] = $row;
        }
        $message = array("status" => true, "message" => $data);
    } else {
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function register_driver($conn)
{
    extract($_POST);
    $message = array();
    $query = "INSERT INTO `drivers`( `name`, `mobile`, `email`, `VehicleID`) VALUES ('$name','$mobile','$email','$vehicle_id')";
    $result = $conn->query($query);
    if ($result) {
        $message = array("status" => true, "message" => "Register successfully");
    } else {
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_driver($conn)
{
    extract($_POST);
    $message = array();
    $query = "UPDATE `drivers` SET `name`='$name',`mobile`='$mobile',`email`='$email',`VehicleID`='$vehicle_id' WHERE driver_id =$id";
    $result = $conn->query($query);
    if ($result) {
        $message = array("status" => true, "message" => "Updated successfully");
    } else {
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_driver($conn)
{
    extract($_POST);
    $message = array();
    $query = "DELETE FROM `drivers` WHERE driver_id =$id";
    $result = $conn->query($query);
    if ($result) {
        $message = array("status" => true, "message" => "Deleted successfully");
    } else {
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}


if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action is required..."));
}
