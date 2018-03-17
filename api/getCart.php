<?
include "functions.php";

$Data = getData();

$Token = Clean($Data["token"]);
if (!CheckToken($Token)) die(Response("توکن معتبر نیست",false,-2));

$User = getToken($Token,'user');

$getCart = $db->query("SELECT * FROM `cart` WHERE `user`='$User'");