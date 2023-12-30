<?php
header('Content-Type: application/json');
include "../config/conn.php";
function get_total_fuel_cost($conn){
    $data =array();
    $message =array();
    $query = "SELECT SUM(fuelrecords.cost) total FROM `fuelrecords`"; 
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
function get_total_maintenance_cost($conn){
    $data =array();
    $message =array();
    $query = "SELECT sum(maintenancerecords.cost) total FROM `maintenancerecords`"; 
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
function get_last_orders($conn){
    $data =array();
    $message =array();
    $query = "SELECT orders.order_id, Customers.Name AS CustomerName, Orders.pickup_location, 
    Orders.delivery_location, Vehicles.vehicle_number AS AssignedVehicle, Orders.status,
    date(Orders.delivery_date) delivery_date FROM Orders
    LEFT JOIN Customers ON Orders.customer_id = Customers.customer_id
    LEFT JOIN Vehicles ON Orders.vehicle_id = Vehicles.vehicle_id ORDER BY orders.order_id DESC limit 5"; 
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
function get_customer_payment($conn){
    $data =array();
    $message =array();
    $query = "SELECT customers.name , payments.Amount FROM `payments` left join customers on payments.customer_id = customers.customer_id ORDER by payments.payment_id desc limit 5
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




if(isset($_POST['action'])){
    $action = $_POST['action'];
    $action($conn);
}
else{
    echo json_encode(array("status" => false, "data" => "Action is required..."));
}

?>