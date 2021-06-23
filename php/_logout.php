<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
include "config.php";

if($_SERVER['REQUEST_METHOD'] == "POST"){
    session_start();
    if(isset($_SESSION['unique_id']) && isset($_SESSION['email'])){
        $unactiveSql = "UPDATE `users` SET `status` = 'unactive'  WHERE `email` = '".$_SESSION['email']."'";
        if(mysqli_query($conn, $unactiveSql)){
            session_unset();
            session_destroy();
            if(isset($_SESSION['unique_id'])){
                echo json_encode(array('message' => "Logout Unsuccessful!", 'status' => false));
            }else{
                echo json_encode(array('message' => "Logout Successful!", 'status' => true));
            }
        }
    }else{
        echo json_encode(array('message' => "Not logged in", 'status' => false));
    }
}
?>