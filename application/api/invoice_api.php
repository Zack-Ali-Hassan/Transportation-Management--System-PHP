<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_invoices($conn){
    $data =array();
    $message =array();
    $query = "SELECT `invoice_id`, customers.name, `amount`, `payment_status`, DATE(due_date) AS due_date  FROM customers INNER JOIN `invoices` on invoices.customer_id = customers.customer_id;"; 
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

function read_single_invoice($conn){ 
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM invoices where invoice_id  = $id"; 
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
function register_invoice($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `invoices`(`customer_id`, `amount`, `payment_status`) VALUES ('$customer_id','$amount','$payment_status')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_invoice($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `invoices` SET `customer_id`='$customer_id',`amount`='$amount',`payment_status`='$payment_status' WHERE invoice_id =$id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_invoice($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `invoices` WHERE invoice_id =$id"; 
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