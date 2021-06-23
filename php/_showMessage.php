<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
include_once "config.php";
include_once "_disInfect.php";

if($_SERVER['REQUEST_METHOD'] == "POST"){
    session_start();
    $senderId = $_SESSION['unique_id'];
    $receiverId = disInfect($_POST['receiver_id']);
    $sql = "SELECT * FROM `chats` WHERE `message_from`='$senderId' AND `message_to`='$receiverId' OR `message_from`='$receiverId' AND `message_to`='$senderId'";
    $results = mysqli_query($conn, $sql);
    if(mysqli_num_rows($results) > 0){
        $data = array();
        while($row = mysqli_fetch_assoc($results)){
            array_push($data, $row);
        }
        echo json_encode(array('message'=>"Message Found!", "status"=>true, "data"=>$data));
    }elseif(mysqli_num_rows($results) == 0){
        echo json_encode(array('message'=>"Messages Not Found!", "status"=>false));
    }else{
        echo json_encode(array('message'=>"Error!!", "status"=>false));
    }
}

?>