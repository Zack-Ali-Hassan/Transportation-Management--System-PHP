<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_vehicles($conn){
    $data =array();
    $message =array();
    $query = "SELECT * FROM vehicles"; 
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

function read_single_vehicle($conn){
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM vehicles where vehicle_id  = $id"; 
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
function register_vehicle($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `vehicles`(`vehicle_number`, `type`, `fual_type`, `capacity`, `location`, `status`) VALUES ('$vehicle_number','$type','$fuel_type','$capacity','$location','$status')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_vehicle($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `vehicles` SET `vehicle_number`='$vehicle_number',`type`='$type',`fual_type`='$fuel_type',`capacity`='$capacity',`location`='$location',`status`='$status' WHERE vehicle_id = $id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_vehicle($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `vehicles` WHERE vehicle_id =$id"; 
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