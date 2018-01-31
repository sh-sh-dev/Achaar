<?

//Token Token Token !!!

include "functions.php";

$Name = Clean($_POST["name"]);
$Password = Clean($_POST["password"]);
$Mobile = Clean($_POST["mobile"]);

if (empty($Name) || empty($Password) || empty($Mobile)) {
    die(Response("Fill all inputs.",false,-100));
}
if (strlen($Password) <= 6 || strlen($Password) >= 18) {
    $Re = strlen($Password) < 6 ? true : false;
    $ResD = $Re ? "Password length is lower than allowed." : "Password length is greater than the limit.";
    $ResC = $Re ? -101 : -102;
    die(Response($ResD,false,$ResC));
}
if (!preg_match("/^[0][9][0-4][0-9]{8,8}$/",$Mobile)) {
    die(Response("Mobile not valid.",false,-103));
}

$Password = md5(base64_encode($Password));
$Name = $db->real_escape_string($Name);
$Mobile = $db->real_escape_string($Mobile);

$RepeatabilityCheck =  $db->query("SELECT * FROM `Users` WHERE `mobile`='$Mobile'");
if ($RepeatabilityCheck->num_rows != 0) {
    die(Response("User exists.",false,-104));
}
$Signup = $db->query("INSERT INTO `Users` (`name`,`mobile`,`password`) VALUES ('$Name','$Mobile','$Password')");

if ($Signup) {
    Response("Signup Completed.",true,100);
}
else {
    Response("Signup Failed.",false,-105);
}