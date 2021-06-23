<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
include_once "config.php";

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $sql = "SELECT * FROM `users` WHERE `status`='active'";
    $results = mysqli_query($conn, $sql);
    if($results){
        $activeUsers = array();
        while($row = mysqli_fetch_assoc($results)){
            $user = array("userImg"=>$row['user_img'], "name"=>$row['name'], "email"=>$row['email'], "unique_id"=>$row['unique_id']);
            array_push($activeUsers,$user);
        }
        if(count($activeUsers) == 0){
            echo json_encode(array("message" => "No User Found", "status" => false));
        }elseif(count($activeUsers) > 0){
            echo json_encode(array("message" => "Users Are Available", "status" => true, "users" => $activeUsers));
        }
    }else{
        echo json_encode(array("message" => "Error!!", "status" => false));
    }
}

?>