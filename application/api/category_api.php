<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_categorys($conn){
    $data =array();
    $message =array();
    $query = "SELECT `category_id`, `category_name`, `category_icon`, `role`, DATE(`date`) 'data' FROM `category` WHERE 1"; 
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

function read_single_category($conn){
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM category where category_id  = $id"; 
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
function register_category($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `category`(`category_name`, `category_icon`, `role`) VALUES ('$category_name', '$category_icon', '$role')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_category($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `category` SET `category_name`='$category_name',
    `category_icon`='$category_icon',`role`='$role' WHERE category_id = $id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_category($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `category` WHERE category_id =$id"; 
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