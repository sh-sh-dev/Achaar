<?
include "vendor/jwt.php";
use \Firebase\JWT\JWT;

$key = "M@AhmadiNezhad88!";

if (isset($_GET["token"])) {
    $token = JWT::decode($_GET["token"], $key ,array('HS256'));
    try {
        var_dump($token);
    }
    catch (Exception $e) {
        echo "Token Invalid";
    }
}
else {
    $token = array();
    $token['n'] = 1;
    $token['mobile'] = "09357778351";
    $token['password'] = "123456";
    $token['name'] = "شایگان شکرالهی";
    $JWT = JWT::encode($token,$key);
}