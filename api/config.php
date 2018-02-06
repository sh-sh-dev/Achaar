<?
header('Access-Control-Allow-Origin: http://localhost:9559');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");

if (isset($_SERVER["REQUEST_METHOD"])) {
    $rm = $_SERVER["REQUEST_METHOD"];
    if ($rm == "GET" OR $rm == "PUT" || $rm == "PATCH" || $rm == "DELETE" || $rm == "HEAD") die("REQUEST METHOD NOT VALID");
    else if ($rm == "OPTIONS") die("Everything OK !");
    else if ($rm == "POST"){
        header('Content-Type: application/json; charset=UTF-8');
    }
    else {
        die("REQUEST METHOD NOT VALID");
    }
}

date_default_timezone_set("Asia/Tehran");


$db = new mysqli("localhost","root","mysql","Achaar");

$db->query("SET NAMES 'utf8'");
$db->query("SET CHARACTER SET 'utf8'");
$db->query("SET character_set_connection = 'utf8'");

//header('X-Powered-By:Achaar CMS');
header_remove('X-Powered-By');

global $db;