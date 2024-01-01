<?php
// header('Content-Type: application/json');    
include "../config/conn.php";
function auth_link($user_id){
    global $conn;
    $query = "SELECT system_links.link  FROM `user_authority` 
            JOIN system_links
            ON user_authority.action=system_links.link_id
            WHERE user_authority.user_id='$user_id'";
            $result =  $conn->query($query);
            $row =  $result->fetch_Assoc();
            
            $filename = basename($_SERVER['PHP_SELF']);
            foreach($row as $r){
                if($r != $filename){
                    json_encode("File not authorized");
                   
                }
                echo json_encode($r);
            }
        }
auth_link('hl001')
?>