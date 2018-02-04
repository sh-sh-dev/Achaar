<?php
include "functions.php";

$_POST = json_decode(file_get_contents("php://input"),true);

$Mobile = Clean($_POST["mobile"]);
$Password = Clean($_POST["password"]);

if (empty($Mobile) || empty($Password)) {
    die(Response("Fill all inputs.",false,-200));
}
if (strlen($Password) < 6 || strlen($Password) > 18) {
    die(Response("Password isn't valid",false,-201));
}
if (!preg_match("/^[0][9][0-4][0-9]{8,8}$/",$Mobile)) {
    die(Response("Username isn't valid.",false,-202));
}

$Password = md5(base64_decode($Password));
$Mobile = $db->real_escape_string($Mobile);

$Login = $db->query("SELECT * FROM `Users` WHERE `Password`='$Password' && `Mobile`='$Mobile'");

if (!$Login) {
    die(Response("Login failed",false,-203));
}
else {
    if ($Login->num_rows == 1) {
        Response("Login successful",true,200,true);
    }
    else {
        die(Response("Username or Password isn't valid",false,-204));
    }
}