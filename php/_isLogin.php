<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

if($_SERVER['REQUEST_METHOD'] == "POST"){
    session_start();
    if(isset($_SESSION['name']) && isset($_SESSION['email']) && isset($_SESSION['unique_id'])){
        $userInfo = array("name"=>$_SESSION['name'], "email"=>$_SESSION['email'], "unique_id"=>$_SESSION['unique_id'], "user_img"=>$_SESSION['user_img']);
        echo json_encode(array("message" => "YES", "status" => true, "userInfo"=>$userInfo));
    }else{
        echo json_encode(array("message" => "NO", "status" => false));
    }
}
?>