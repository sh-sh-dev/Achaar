<?

//Token Token Token !!!

include "functions.php";

$Name = Clean($_REQUEST["name"]);
$Password = Clean($_REQUEST["password"]);
$Mobile = Clean($_REQUEST["mobile"]);

if (empty($Name) || empty($Password) || empty($Mobile)) {
    die(Response("Fill all inputs.",false,-1));
}

if (!preg_match("/^[0][9][0-4][0-9]{8,8}$/g",$Mobile)) {
    die(Response("Mobile not valid",false,-2));
}

$Password = md5($Password);
$Name = $db->real_escape_string($Name);
$Mobile = $db->real_escape_string($Mobile);

$Signup = $db->query("INSERT INTO `Users` (`name`,`mobile`,`password`) VALUES ('$Name','$Mobile','$Password')");

if ($Signup) {
    Response("Signup Completed.",true,1);
}
else {
    Response("Signup Failed.",false,-3);
}