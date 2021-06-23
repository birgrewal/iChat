<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
    include_once "config.php"; 
    include_once "_disInfect.php";
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $uemail = disInfect($_POST['uemail']);
        $upass = disInfect($_POST['upass']);
        $sql = "SELECT * FROM `users` WHERE `email` = '$uemail'";
        $result = mysqli_query($conn, $sql);
            if(mysqli_num_rows($result) == 1){
                while($row = mysqli_fetch_assoc($result)){
                    if(password_verify($upass, $row['password'])){
                        $activeSql = "UPDATE `users` SET `status` = 'active'  WHERE `email` = '$uemail'";
                        if(mysqli_query($conn, $activeSql)){
                            session_start();
                            $_SESSION['name'] = $row['name'];
                            $_SESSION['email'] = $row['email'];
                            $_SESSION['unique_id'] = $row['unique_id'];
                            $_SESSION['user_img'] = $row['user_img'];
                            echo json_encode(array("message" => "Login Successful", "status" => true));
                        }else{
                            echo json_encode(array("message" => "Some Problem Occured", "status" => false));
                        }
                    }else{
                        echo json_encode(array("message" => "Login Un-Successful", "status" => false));
                    }
                }
            }else{
                echo json_encode(array("message" => "User don't exists", "status" => false));
            }
    }
?>