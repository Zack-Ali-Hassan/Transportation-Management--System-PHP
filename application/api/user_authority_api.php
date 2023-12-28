<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_system_authority_view($conn){
    $data =array();
    $message =array();
    $query = "SELECT  * from system_auth_view"; 
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
function register_user_authority($conn){
    extract($_POST);
    $message =array();
    $error_array =array();
    $success_array = array();
    $conn = new mysqli("localhost","root", "", "transportation");
    $del = "DELETE FROM user_authority where user_id ='$user_id'";
    $res = $conn->query($del);
    if($res){
        for($i=0; $i< count($action_id); $i++){
            $query = "INSERT INTO `user_authority`(`user_id`, `action`) VALUES ('$user_id', '$action_id[$i]')"; 
            $result =$conn->query($query);
            if($result){
                $success_array [] = array("status" => true, "message" => "Register successfully");
            }
            else{
                $error_array [] = array("status" => false, "message" => $conn->error);
            }
        }    
    }
    else{
        $error_array = array("status" => false, "message" => $conn->error);
    }
    if(count($success_array) > 0 && count($error_array) == 0){
        $message = array("status" => true, "message" => "User has been authorized");
    }
    elseif(count($success_array) > 0){
        $message = array("status" => false, "message" => $error_array);
    }

    if(count($error_array) > 0 && count($success_array) == 0){
        $message = array("status" => false, "message" => $error_array);
    }
    echo json_encode($message);
}
function get_system_authority_sp($conn){
    extract($_POST);
    $data =array();
    $message =array();
    $query = "CALL get_system_authority_sp('$user_id')"; 
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
function get_system_menu_sp($conn){
    extract($_POST);
    $data =array();
    $message =array();
    session_start();
    $user_id =  $_SESSION['user_id'];
    $query = "CALL get_system_menu_sp('$user_id')"; 
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



if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}
else{
    echo json_encode(array("status" => false, "data" => "Action is required..."));
}

?>