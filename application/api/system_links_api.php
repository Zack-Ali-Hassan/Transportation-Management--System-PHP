<?php
header('Content-Type: application/json');
include "../config/conn.php";
function fill_link($conn){
    $data =array();
    $data_array =array();
    $search_result =glob("../views/*.php");
    foreach($search_result as $sr){
       $pure_sr = explode("/", $sr);
       $data_array[] = $pure_sr[2];
    }
    if(count($search_result) > 0){
        $data = array("status" => true, "data" => $data_array);
    }
    else{
        $data = array("status" => false, "data" => "Not found");
    }
    echo json_encode($data);
}
function read_system_links($conn){
    $data =array();
    $message =array();
    $query = "SELECT `link_id`, `link_icon`, `link_name`, `link`, `category_name`, date(system_links.date) as `date` 
    FROM `system_links` INNER JOIN category on system_links.category_id = category.category_id"; 
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

function read_single_system_link($conn){
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM system_links where link_id  = $id"; 
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
function register_system_link($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `system_links`(`link_icon`,`link_name`, `link`, `category_id`) VALUES ('$link_icon','$link_name', '$link', '$category_id')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_system_link($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `system_links` SET `link_icon`='$link_icon',
    `link_name`='$link_name',`link`='$link',`category_id`='$category_id' WHERE link_id = $id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_system_link($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `system_links` WHERE link_id =$id"; 
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