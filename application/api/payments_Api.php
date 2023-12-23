<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_payment($conn){
    $data =array();
    $message =array();
    $query = "SELECT `payment_id`, customers.name, `Amount`, `payment_method`, DATE(date) AS date  FROM `payments` INNER JOIN customers on payments.customer_id = customers.customer_id;
    "; 
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

function read_single_payment($conn){ 
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM payments where payment_id  = $id"; 
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
function register_payment($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `payments`(`customer_id`, `Amount`, `payment_method`) VALUES ('$customer_id','$amount','$payment_method')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_payment($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `payments` SET `customer_id`='$customer_id',`Amount`='$amount',`payment_method`='$payment_method' WHERE payment_id = $id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_payment($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `payments` WHERE payment_id =$id"; 
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