<?php
header('Content-Type: application/json');
include "../config/conn.php";
function read_users($conn)
{
    $data = array();
    $message = array();
    $query = "SELECT `user_id`, `username`, `email`, `user_image`, `type`, `status`, DATE(date) as `date` FROM `users` ";
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

function update_user($conn)
{
    extract($_POST);
    $message = array();
    if (!empty($_FILES['user_image']['tmp_name'])) {
        $saved_name = $update_info . ".png";
        $file_name = $_FILES['user_image']['name'];
        $file_type = $_FILES['user_image']['type'];
        $file_size = $_FILES['user_image']['size'];
        $allowed_image = ['image/jpg', 'image/png', 'image/jpeg'];
        $max_size = 6 * 1024 * 1024;
        $error_array = array();
        if (in_array($file_type, $allowed_image)) {
            if ($file_size > $max_size) {
                $error_array[] = "File size must be less than $max_size";
            }
        } else {
            $error_array[] = "This file type $file_type is not allowed please change this type..";
        }

        if (count($error_array) <= 0) {

            $query = "UPDATE `users` SET `Username`='$username',`Email`='$email',`Password`= MD5('$password'),`Type`='$type',`Status`='$status' WHERE user_id = '$update_info'";
            $result = $conn->query($query);
            if ($result) {
                move_uploaded_file($_FILES['user_image']['tmp_name'], '../uploads/' . $saved_name);
                $message = array("status" => true, "message" => "Updated image successfully");
            } else {
                $message = array("status" => false, "message" => $conn->error);
            }
        } else {
            $message = array("status" => false, "message" => $error_array);
        }
    } else {
        $query = "UPDATE `users` SET `Username`='$username',`Email`='$email',`Password`=MD5('$password'),`Type`='$type',`Status`='$status' WHERE user_id = '$update_info'";
        $result = $conn->query($query);
        if ($result) {
            $message = array("status" => true, "message" => "Updated successfully");
        } else {
            $message = array("status" => false, "message" => $conn->error);
        }
        // echo json_encode($message);
    }

    echo json_encode($message);
}




if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "message" => "Action is required..."));
}
