<?
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

date_default_timezone_set("Asia/Tehran");

$db = new mysqli("localhost","root","mysql","Achaar");

//$db->query("SET NAMES 'utf8'");
//$db->query("SET CHARACTER SET 'utf8'");
//$db->query("SET character_set_connection = 'utf8'");

header('X-Powered-By:Achaar CMS');

global $db;