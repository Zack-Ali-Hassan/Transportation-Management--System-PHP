<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_maintenance_report($conn)
{
    extract($_POST);
    $data = array();
    $message = array();
    if ($report_type == "All") {
        $query = "
        SELECT
            Vehicles.vehicle_number,
            MaintenanceRecords.Maintenance_type,
            MaintenanceRecords.Description,
            MaintenanceRecords.Cost,
            DATE(MaintenanceRecords.maintenance_date) AS maintenance_date
        FROM
            MaintenanceRecords
        LEFT JOIN
            Vehicles ON MaintenanceRecords.vehicle_id = Vehicles.vehicle_id
        WHERE
            MaintenanceRecords.vehicle_id = '$vehicle_id'

        UNION ALL
        SELECT
            'Total',
            '',
            '',
            COALESCE(SUM(MaintenanceRecords.Cost), 0),
            ''
        FROM
            MaintenanceRecords
        LEFT JOIN
            Vehicles ON MaintenanceRecords.vehicle_id = Vehicles.vehicle_id
        WHERE
        MaintenanceRecords.vehicle_id = '$vehicle_id'";
        // $query = "
        // SELECT
        //     Vehicles.vehicle_number,
        //     MaintenanceRecords.Maintenance_type,
        //     MaintenanceRecords.Description,
        //     MaintenanceRecords.Cost,
        //     date(MaintenanceRecords.maintenance_date) maintenance_date
        // FROM
        //     MaintenanceRecords
        // LEFT JOIN
        //     Vehicles ON MaintenanceRecords.vehicle_id = Vehicles.vehicle_id
        //     WHERE maintenancerecords.vehicle_id like '%$vehicle_id'";
    } else {
        $query = "
        SELECT
            Vehicles.vehicle_number,
            MaintenanceRecords.Maintenance_type,
            MaintenanceRecords.Description,
            MaintenanceRecords.Cost,
            DATE(MaintenanceRecords.maintenance_date) AS maintenance_date
        FROM
            MaintenanceRecords
        LEFT JOIN
            Vehicles ON MaintenanceRecords.vehicle_id = Vehicles.vehicle_id
            WHERE
            MaintenanceRecords.vehicle_id LIKE '%$vehicle_id%' and 
            MaintenanceRecords.maintenance_date BETWEEN '$start_date' and '$end_date'

        UNION ALL
        SELECT
            'Total',
            '',
            '',
            COALESCE(SUM(MaintenanceRecords.Cost), 0),
            ''
        FROM
            MaintenanceRecords
        LEFT JOIN
            Vehicles ON MaintenanceRecords.vehicle_id = Vehicles.vehicle_id
        WHERE
            MaintenanceRecords.vehicle_id LIKE '%$vehicle_id%' and 
            MaintenanceRecords.maintenance_date BETWEEN '$start_date' and '$end_date'";
        // $query = "
        // SELECT
        //     Vehicles.vehicle_number,
        //     MaintenanceRecords.Maintenance_type,
        //     MaintenanceRecords.Description,
        //     MaintenanceRecords.Cost,
        //     date(MaintenanceRecords.maintenance_date) maintenance_date
        // FROM
        //     MaintenanceRecords
        // LEFT JOIN
        //     Vehicles ON MaintenanceRecords.vehicle_id = Vehicles.vehicle_id
        //     WHERE maintenancerecords.vehicle_id like '%$vehicle_id' and 
        //     MaintenanceRecords.maintenance_date BETWEEN '$start_date' and '$end_date'";
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
