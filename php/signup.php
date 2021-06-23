<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
    include_once "config.php";    
    include_once "_disInfect.php";

    if($_SERVER['REQUEST_METHOD'] == "POST"){
    $name = disInfect($_POST['uname']);
    $email = disInfect($_POST['uemail']);
    $pass = disInfect($_POST['upass']);
    $city = disInfect($_POST['ucity']);
    $age = disInfect($_POST['uage']);
    $imgPath;
    if(isset($_FILES['uimg'])){
        $uimg = $_FILES['uimg'];
        $imgPath = 'userImgs/'.$email.$uimg['name'];
        move_uploaded_file($uimg['tmp_name'], '../'.$imgPath);
    }else{
        $imgPath = '';
    }
    $password;
    $checkSql = "SELECT * FROM `users` WHERE `email` = '$email'";
    $checkResult = mysqli_query($conn, $checkSql);
        if(mysqli_num_rows($checkResult) == 0){
            if($conn){
                $password = password_hash($pass, PASSWORD_DEFAULT);
                $uId = rand(time(), 10000000);
                $sql = "INSERT INTO `users` (`name`, `email`, `password`, `city`, `age`, `status`, `unique_id`, `user_img`) VALUE('$name', '$email', '$password', '$city', '$age', 'unknown', '$uId', '$imgPath')";
                $done = mysqli_query($conn, $sql);
                if($done){
                    echo json_encode(array('message' => 'SignUp Successful.', 'status' => true));
                }else{
                    echo json_encode(array('message' => 'Signup Un-Successful.', 'status' => false));
                }
            }else{
                echo json_encode(array('message' => 'Signup Un-Succesful.', 'status' => false));
            }    
        }else{
            echo json_encode(array('message' => 'User already Exists.', 'status' => false));
        }
    }
    
    function compress_image($source, $destination, $quality){
        $info = getimagesize($source);
        if($info['mime'] == 'image/jpeg'){
            $image = imagecreatefromjpeg($source);
        }elseif($info['mime'] == 'image/gif'){
            $image = imagecreatefromgif($source);
        }elseif($info['mime'] == 'image/png'){
            $image = imagecreatefrompng($source);
        }
        imagepng($image, $destination, $quality);
}
?>