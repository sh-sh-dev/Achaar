<?
include "functions.php";

$Data = getData();

$Token = Clean($Data["token"]);
if (!CheckToken($Token)) die(Response("توکن معتبر نیست",false,-2));