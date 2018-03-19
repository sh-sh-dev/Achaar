<?
include "functions.php";

$Data = getData();

$Token = $db->real_escape_string(Clean($Data["token"]));

if (!CheckToken($Token)) die(Response("توکن معتبر نیست",false,-2));

$User = getToken($Token,'user');

$getUser = $db->query("SELECT `name`,`mobile`,`date` FROM `users` WHERE `n`=$User");

$User = $getUser->fetch_assoc();

$result = [
    'name'=>$User["name"],
    'mobile'=>$User["mobile"],
    'created_at'=>$User["date"]
];

Response($result,true,null,true);