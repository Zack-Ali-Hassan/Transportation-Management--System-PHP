<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_fuel_record($conn){
    $data =array();
    $message =array();
    $query = "SELECT `fuel_id`, `fuel_type`, `quantity`, `cost`, vehicles.vehicle_number, DATE(fueling_date) AS fueling_date  FROM vehicles INNER JOIN fuelrecords ON vehicles.vehicle_id = fuelrecords.vehicle_id;"; 
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

function read_single_fuel_record($conn){ 
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM fuelrecords where fuel_id  = $id"; 
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
function register_fuel_record($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `fuelrecords` (`fuel_type`, `quantity`, `cost`,  `vehicle_id`) VALUES ('$fuel_type','$quantity','$cost','$vehicle_id')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_fuel_record($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `fuelrecords` SET `fuel_type`='$fuel_type',`quantity`='$quantity',`cost`='$cost',`vehicle_id`='$vehicle_id' WHERE fuel_id =$id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_fuel_record($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `fuelrecords` WHERE fuel_id =$id"; 
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