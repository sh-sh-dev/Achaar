<?
include "functions.php";

$Data = getData();

$Mobile = Clean($Data["mobile"]);
$Password = Clean($Data["password"]);

if (empty($Mobile) || empty($Password)) {
    die(Response("لطفا همه فیلد ها را پر نمایید",false,-200));
}
if (strlen($Password) < 6 || strlen($Password) > 18) {
    die(Response("پسورد معتبر نمی‌باشد",false,-201));
}
if (!preg_match("/^[0][9][0-4][0-9]{8,8}$/",$Mobile)) {
    die(Response("نام کاربری معتبر نمی‌باشد",false,-202));
}

$Password = md5(base64_encode($Password));
$Mobile = $db->real_escape_string($Mobile);
$Date = time();

$Login = $db->query("SELECT * FROM `users` WHERE `Password`='$Password' AND `Mobile`='$Mobile' AND `blocked`=0");

if (!$Login) {
    die(Response("خطای غیر منتظره رخ داد",false,-203));
}
else {
    if ($Login->num_rows == 1) {
        $Token = Token($Mobile);
        $IToken = $db->query("INSERT INTO `token` (`token`,`user`,`date`) VALUES ('$Token','$Mobile','$Date')");
        if ($IToken) Response($Token,true,200,true);
        else die(Response("خطای غیر منتظره رخ داد",false,-204));
    }
    else {
        die(Response("نام کاربری یا رمز عبور معتبر نمی‌باشد",false,-205));
    }
}
