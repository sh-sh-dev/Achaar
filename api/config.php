<?
$Database = [
    'host'=>"localhost",
    'user'=>"root",
    'password'=>"mysql",
    'database'=>"Achaar"
];
$Headers = [
    'AllowOrigin'=>"http://localhost:9559",
    'AllowHeaders'=>"*",
    'AllowMethods'=>"POST, OPTIONS",
    'XPoweredBy'=>"Achaar CMS"
];
const TimeZone = "Asia/Tehran";
$TokenExpireTime = 86400 * 50;

header("Access-Control-Allow-Origin: $Headers[AllowOrigin]");
header("Access-Control-Allow-Headers: $Headers[AllowHeaders]");
header("Access-Control-Allow-Methods: $Headers[AllowMethods]");
header("X-Powered-By: $Headers[XPoweredBy]");
//header_remove('X-Powered-By');

if (isset($_SERVER["REQUEST_METHOD"])) {
    $rm = $_SERVER["REQUEST_METHOD"];
    if ($rm == "OPTIONS") die("Everything OK !");
    else if ($rm == "POST") header('Content-Type: application/json; charset=UTF-8');
    else {
        //Block IP !
        $IP = $_SERVER["REMOTE_ADDR"];
        die("#REQUEST_METHOD_NOT_VALID <br> IP: $IP");
    }
}

date_default_timezone_set(TimeZone);

$db = new mysqli($Database['host'],$Database['user'],$Database['password'],$Database['database']);

//Submit error
if ($db->connect_errno) die(Response("مشکل فنی رخ داد"."\nتوضیحات: ارور ".$db->connect_errno,false,-1));

$db->query("SET NAMES 'utf8'");
$db->query("SET CHARACTER SET 'utf8'");
$db->query("SET character_set_connection = 'utf8'");

global $db,$TokenExpireTime;