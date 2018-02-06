<?
include "functions.php";

$Data = getData();

$Name = Clean($Data["name"]);
$Password = Clean($Data["password"]);
$Mobile = Clean($Data["mobile"]);

if (empty($Name) || empty($Password) || empty($Mobile)) {
    die(Response("لطفا همه فیلد ها را پر نمایید",false,-100));
}
if (mb_strlen($Password) < 6 || mb_strlen($Password) > 18) {
    $Re = strlen($Password) < 6 ? true : false;
    $ResD = $Re ? "کمتر" : "بیشتر";
    $ResC = $Re ? -101 : -102;
    die(Response("طول رمز عبور $ResD از حد مجاز است",false,$ResC));
}
if (!preg_match("/^[0][9][0-4][0-9]{8,8}$/",$Mobile)) {
    die(Response("موبایل معتبر نمی‌باشد",false,-103));
}

$Password = md5(base64_encode($Password));
$Name = $db->real_escape_string($Name);
$Mobile = $db->real_escape_string($Mobile);
$Time = time();
$Token = Token($Mobile);

$RepeatabilityCheck =  $db->query("SELECT * FROM `Users` WHERE `mobile`='$Mobile'");
if ($RepeatabilityCheck->num_rows != 0) {
    die(Response("کاربر وجود دارد",false,-104));
}

$Signup = $db->query("INSERT INTO `users` (`name`,`mobile`,`password`,`date`) VALUES ('$Name','$Mobile','$Password','$Time')");
$IToken = $db->query("INSERT INTO `token` (`token`,`user`,`date`) VALUES ('$Token','$Mobile','$Time')");

if ($Signup && $IToken) {
    Response($Token,true,100,true);
}
else {
    Response("ثبت نام موفقیت آمیز نبود",false,-105,true);
}
