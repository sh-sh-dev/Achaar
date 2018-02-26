<?
include "functions.php";

$Data = getData();

$Token = Clean($Data["token"]);
$Product = (int)Clean($Data["product"]);

if (!CheckToken($Token)) die(Response("توکن معتبر نیست",false,-2));

$User = getToken($Token,'user');

$getCart = $db->query("SELECT * FROM `cart` WHERE `user`='$User' AND `status`=0");

if ($getCart->num_rows == 0) {
    //Create new cart
//    $createCart = $db->query("INSERT INTO `cart` () VALUES ()");
//    $addToCart = $db->query("INSERT INTO `card_products` () VALUES ()");

}
else {
    //Add to cart
    //    $addToCart = $db->query("INSERT INTO `card_products` () VALUES ()");
}