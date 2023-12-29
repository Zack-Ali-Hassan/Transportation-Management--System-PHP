<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_order_report($conn)
{
    extract($_POST);
    $data = array();
    $message = array();
    if($report_type == "All"){
        $query = "SELECT Orders.status, Customers.Name AS CustomerName, Orders.pickup_location, 
    Orders.delivery_location, Orders.Weight, Vehicles.vehicle_number AS AssignedVehicle, 
    date(Orders.delivery_date) delivery_date FROM Orders
    LEFT JOIN Customers ON Orders.customer_id = Customers.customer_id
    LEFT JOIN Vehicles ON Orders.vehicle_id = Vehicles.vehicle_id
    WHERE orders.customer_id like '%$customer_id%' and orders.status like '%$status_order%'
    and orders.vehicle_id like '%$vehicle_id'";
    }
    else{
        $query = "SELECT Orders.status, Customers.Name AS CustomerName, Orders.pickup_location, 
    Orders.delivery_location, Orders.Weight, Vehicles.vehicle_number AS AssignedVehicle, 
    date(Orders.delivery_date) delivery_date FROM Orders
    LEFT JOIN Customers ON Orders.customer_id = Customers.customer_id
    LEFT JOIN Vehicles ON Orders.vehicle_id = Vehicles.vehicle_id
    WHERE orders.customer_id like '%$customer_id%' and orders.status like '%$status_order%'
    and orders.vehicle_id like '%$vehicle_id' and Orders.delivery_date BETWEEN '$start_date' and '$end_date'";
    }
    $result = $conn->query($query);
    if ($result) {
        while ($row = $result->fetch_Assoc()) {
            $data[] = $row;
        }
        $message = array("status" => true, "message" => $data);
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
