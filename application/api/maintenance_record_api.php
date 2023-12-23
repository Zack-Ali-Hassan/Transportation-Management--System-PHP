<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_maintenance_record($conn){
    $data =array();
    $message =array();
    $query = "SELECT `maintenance_id`, `maintenance_type`, `description`, `cost`, vehicles.vehicle_number, DATE(maintenance_date) AS maintenance_date FROM vehicles INNER JOIN maintenancerecords ON vehicles.vehicle_id = maintenancerecords.vehicle_id;";  
    $result =$conn->query($query);
    if($result){
        while($row =$result->fetch_Assoc()){
            $data[] = $row;
        }
        $message = array("status" => true, "message" => $data);
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function read_single_maintenance_record($conn){ 
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM maintenancerecords where maintenance_id  = $id"; 
    $result =$conn->query($query);
    if($result){
        while($row =$result->fetch_Assoc()){
            $data[] = $row;
        }
        $message = array("status" => true, "message" => $data);
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function register_maintenance_record($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `maintenancerecords`(`Maintenance_type`, `description`, `cost`, `vehicle_id`) VALUES ('$Maintenance_type','$description','$cost','$vehicle_id')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_maintenance_record($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `maintenancerecords` SET `Maintenance_type`='$Maintenance_type',`description`='$description',`cost`='$cost',`vehicle_id`='$vehicle_id' WHERE maintenance_id =$id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_maintenance_record($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `maintenancerecords` WHERE maintenance_id =$id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Deleted successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}


if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}
else{
    echo json_encode(array("status" => false, "data" => "Action is required..."));
}

?>