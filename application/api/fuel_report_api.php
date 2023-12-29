<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_fuel_report($conn)
{
    extract($_POST);
    $data = array();
    $message = array();
    if ($report_type == "All") {
        $query = "
        SELECT
        Vehicles.vehicle_number,
        fuelrecords.fuel_type,
        fuelrecords.Quantity,
        fuelrecords.Cost,
        DATE(fuelrecords.fueling_date) AS fuel_date
    FROM
        fuelrecords
    LEFT JOIN
        Vehicles ON fuelrecords.vehicle_id = Vehicles.vehicle_id
    WHERE
        fuelrecords.vehicle_id LIKE '%$vehicle_id%'
    
    UNION ALL
    
    SELECT
        'Total',
        '',
        '',
        COALESCE(SUM(fuelrecords.Cost), 0),
        ''
    FROM
        fuelrecords
    LEFT JOIN
        Vehicles ON fuelrecords.vehicle_id = Vehicles.vehicle_id
    WHERE
        fuelrecords.vehicle_id LIKE '%$vehicle_id%'";
        // $query = "
        // SELECT
        // Vehicles.vehicle_number,
        // fuelrecords.fuel_type,
        // fuelrecords.Quantity,
        // fuelrecords.Cost,
        // date(fuelrecords.fueling_date) as fuel_date
        // FROM
        // fuelrecords
        // LEFT JOIN
        //     Vehicles ON fuelrecords.vehicle_id = Vehicles.vehicle_id
        //     WHERE fuelrecords.vehicle_id like '%$vehicle_id'";
    } else {
        $query = "SELECT
        Vehicles.vehicle_number,
        fuelrecords.fuel_type,
        fuelrecords.Quantity,
        fuelrecords.Cost,
        DATE(fuelrecords.fueling_date) AS fuel_date
    FROM
        fuelrecords
    LEFT JOIN
        Vehicles ON fuelrecords.vehicle_id = Vehicles.vehicle_id
    WHERE
        fuelrecords.vehicle_id LIKE '%$vehicle_id%' and 
        fuelrecords.fueling_date BETWEEN '$start_date' and '$end_date'
    
    UNION ALL
    
    SELECT
        'Total',
        '',
        '',
        COALESCE(SUM(fuelrecords.Cost), 0),
        ''
    FROM
        fuelrecords
    LEFT JOIN
        Vehicles ON fuelrecords.vehicle_id = Vehicles.vehicle_id
    WHERE
        fuelrecords.vehicle_id LIKE '%$vehicle_id%' and 
            fuelrecords.fueling_date BETWEEN '$start_date' and '$end_date'";
        //  $query = "
        //  SELECT
        //  Vehicles.vehicle_number,
        //  fuelrecords.fuel_type,
        //  fuelrecords.Quantity,
        //  fuelrecords.Cost,
        //  date(fuelrecords.fueling_date) as fuel_date
        //  FROM
        //  fuelrecords
        //  LEFT JOIN
        //      Vehicles ON fuelrecords.vehicle_id = Vehicles.vehicle_id
        //      WHERE fuelrecords.vehicle_id like '%$vehicle_id' and 
        //      fuelrecords.fueling_date BETWEEN '$start_date' and '$end_date'";
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
