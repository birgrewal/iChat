<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
include_once "config.php";
include_once "_disInfect.php";

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $unique_id = disInfect($_POST['unique_id']);
    $sql = "SELECT * FROM `users` WHERE `unique_id` = '$unique_id'";
    $results = mysqli_query($conn, $sql);
    if(mysqli_num_rows($results) == 1){
        $row = mysqli_fetch_assoc($results);
        echo json_encode(array("message"=>"User Found!", "status"=>true, "userInfo"=>$row));
    }else{
        echo json_encode(array("message"=>"User Not Found!","status"=>false));
    }
}
?>