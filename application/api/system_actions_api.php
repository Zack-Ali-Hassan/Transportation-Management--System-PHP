<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_system_actions($conn){
    $data =array();
    $message =array();
    $query = "SELECT `action_id`, `action_name`, `action`, system_links.link_name, date(system_actions.date) as date
     FROM `system_actions` INNER JOIN system_links on system_actions.link_id = system_links.link_id"; 
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

function read_single_system_action($conn){
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM system_actions where action_id  = $id"; 
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
function register_system_action($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `system_actions`(`action_name`, `action`, `link_id`)  VALUES ('$action_name', '$action_method', '$link_id')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_system_action($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `system_actions` SET `action_name`='$action_name',
    `action`='$action',`link_id`='$link_id' WHERE action_id = $id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_system_action($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `system_actions` WHERE action_id =$id"; 
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