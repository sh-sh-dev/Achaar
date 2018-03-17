<?
include "functions.php";

$Data = getData();

$Token = $db->real_escape_string(Clean($Data["token"]));

if (!CheckToken($Token)) die(Response("توکن معتبر نیست",false,-2));