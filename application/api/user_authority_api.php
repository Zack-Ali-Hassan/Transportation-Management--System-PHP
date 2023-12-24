<?php
header('Content-Type: application/json');
include "../config/conn.php";
function fill_link($conn){
    $data =array();
    $data_array =array();
    $search_result =glob("../views/*.php");
    foreach($search_result as $sr){
       $pure_sr = explode("/", $sr);
       $data_array[] = $pure_sr[2];
    }
    if(count($search_result) > 0){
        $data = array("status" => true, "data" => $data_array);
    }
    else{
        $data = array("status" => false, "data" => "Not found");
    }
    echo json_encode($data);
}
function read_system_authority($conn){
    $data =array();
    $message =array();
    $query = "SELECT  * from system_authority_view"; 
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