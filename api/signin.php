<?
include "functions.php";
$LoginAttempts = new LoginAttempts($_SERVER["REMOTE_ADDR"],$db);
$Attempts = $LoginAttempts->getAttempts();

if ($Attempts == 3) die(Response("شما به علت 3 اشتباه متوالی، به مدت 15 دقیقه اجازه ورود را ندارید"."\nدر این زمان، با هر تکرار مجدد زمان انتظار شما 15 دقیقه بیشتر خواهد شد (حتی در صورت درست بودن اطلاعات)",false,-200));

switch ($Attempts) {
    case 0:
        $LoginAttempts->addAttempt();
        $extraDetails = "\nشما 2 فرصت دیگر دارید";
        break;
    case 1:
        $LoginAttempts->addAttempt();
        $extraDetails = "\nاین آخرین فرصت شماست";
        break;
    case 2:
        $LoginAttempts->addAttempt();
        $time = tr_num(jdate('o/n/j G:i',time() + 900));
        $extraDetails = "\nشما تا $time مسدود شده اید\nاگر قبل از این زمان اقدام به ورود مجدد کنید، با هر تلاش 15 دقیقه به این زمان اضافه خواهد شد";
        break;
}

$Data = getData();

$Mobile = Clean($Data["mobile"]);
$Password = Clean($Data["password"]);

if (empty($Mobile) || empty($Password)) {
    die(Response("لطفا همه فیلد ها را پر نمایید",false,-201));
}
if (strlen($Password) < 6 || strlen($Password) > 18) {
    die(Response("پسورد معتبر نمی‌باشد",false,-202));
}
if (!preg_match("/^[0][9][0-4][0-9]{8,8}$/",$Mobile)) {
    die(Response("نام کاربری معتبر نمی‌باشد",false,-203));
}

$Password = md5(base64_encode($Password));
$Mobile = $db->real_escape_string($Mobile);

$Login = $db->query("SELECT * FROM `users` WHERE `Password`='$Password' AND `Mobile`='$Mobile' AND `blocked`=0");

if (!$Login) {
    die(Response("خطای غیر منتظره رخ داد",false,-204));
}
else {
    if ($Login->num_rows == 1) {
        $LoginAttempts->deleteAttempts();
        $Token = Token($Mobile);
        $IToken = $db->query("INSERT INTO `token` (`token`,`user`,`date`) VALUES ('$Token','$Mobile',UNIX_TIMESTAMP())");
        if ($IToken) Response($Token,true,200,true);
        else die(Response("خطای غیر منتظره رخ داد",false,-205));
    }
    else {
        die(Response("نام کاربری یا رمز عبور معتبر نمی‌باشد.$extraDetails",false,-206));
    }
}
