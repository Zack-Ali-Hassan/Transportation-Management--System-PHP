<?php

header('Content-Type: application/json');
include "../config/conn.php";
function login($conn)
{
    extract($_POST);
    $message = array();
    $query = "CALL login_sp('$username', '$password')";
    $result = $conn->query($query);
    if ($result) {
        $row = $result->fetch_Assoc();
        $data[] = $row;
        if(isset($row['Msg'])){
            if($row['Msg'] == 'Deny'){
                $message = array("status" => false, "message" => "Username or password are valid....");
            }
            
            else{
                $message = array("status" => false, "message" => "User are locked, can not access system....");
            }
        }   
        else{
            session_start();
            
            $_SESSION['user_id']=$row['user_id'];
            $_SESSION['username']=$row['username'];
            $_SESSION['user_image']=$row['user_image'];
            // foreach($row as $key =>$value){
            //     $_SESSION[$key] = $value;
            // }
            $message = array("status" => true, "message" => "Login successfull..");
        }
       
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
