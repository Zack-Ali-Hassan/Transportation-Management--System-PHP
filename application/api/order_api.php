<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_orders($conn){
    $data =array();
    $message =array();
    $query = "SELECT `order_id`, `pickup_location`, `delivery_location`, `weight`, customers.name, vehicles.vehicle_number, orders.status, DATE(delivery_date) AS delivery_date  FROM vehicles INNER JOIN `orders` on vehicles.vehicle_id = orders.vehicle_id INNER JOIN customers on orders.customer_id = customers.customer_id;
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

function read_single_order($conn){ 
    extract($_POST);
    $data =array();
    $message =array();
    $query = "SELECT * FROM orders where order_id  = $id"; 
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
function register_order($conn){
    extract($_POST);
    $message =array();
    $query = "INSERT INTO `orders`(`pickup_location`, `delivery_location`, `weight`, `status`,`customer_id`, `vehicle_id`) VALUES ('$pickup_location','$delivery_location','$weight','$status','$customer_id','$vehicle_id')"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Register successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}
function update_order($conn){
    extract($_POST);
    $message =array();
    $query = "UPDATE `orders` SET `pickup_location`='$pickup_location',`delivery_location`='$delivery_location',`weight`='$weight',`status`='$status',`customer_id`='$customer_id',`vehicle_id`='$vehicle_id' WHERE order_id =$id"; 
    $result =$conn->query($query);
    if($result){
        $message = array("status" => true, "message" => "Updated successfully");
    }
    else{
        $message = array("status" => false, "message" => $conn->error);
    }
    echo json_encode($message);
}

function delete_order($conn){
    extract($_POST);
    $message =array();
    $query = "DELETE FROM `orders` WHERE order_id =$id"; 
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