<?php
$conn = new mysqli("localhost","root", "", "transportation");

if($conn->connect_error){
   echo $conn->error;
}



?>