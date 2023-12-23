<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_routes($conn){
    $data =array();
    $message =array();
    $query = "SELECT * FROM routes"; 
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

function read_single_route($conn){
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM routes where route_id  = $id"; 
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
function register_route($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `routes`(`source_location`, `destination_location`, `distance`, `estimated_time`) VALUES ('$source_location','$destination_location','$distance','$estimated_time')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_route($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `routes` SET `source_location`='$source_location',`destination_location`='$destination_location',`distance`='$distance',`estimated_time`='$estimated_time' WHERE route_id =$id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_route($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `routes` WHERE route_id =$id"; 
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