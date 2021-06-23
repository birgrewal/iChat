<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
include_once "config.php";
include_once "_disInfect.php";

if($_SERVER['REQUEST_METHOD'] == "POST"){
    session_start();
    $senderId = $_SESSION['unique_id'];
    $receiverId = disInfect($_POST['receiver_id']);
    $message = disInfect($_POST['msg']);
    $sql = "INSERT INTO `chats`(`message_from`, `message_to`, `message`) VALUE('$senderId', '$receiverId', '$message')";
    $results = mysqli_query($conn, $sql);
    if($results){
        echo json_encode(array('message'=>"Message Added Successfully", "status"=>true));
    }else{
        echo json_encode(array('message'=>"Message Can't be added!", "status"=>false));
    }
}
?>