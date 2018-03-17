<?
include "functions.php";

$Data = getData();

$Token = $db->real_escape_string(Clean($Data["token"]));
$Title = $db->real_escape_string(Clean($Data["title"]));
$Text = $db->real_escape_string(Clean($Data["text"]));
$Score = (int)Clean($Data["score"]);
$Product = (int)Clean($Data["product"]);

if (!CheckToken($Token)) die(Response("توکن معتبر نیست",false,-2));
if (empty($Title) || empty($Text) || empty($Score) || empty($Product) || $Product == 0) die(Response("لطفا همه فیلد ها را پر کنید",false,-3));

$User = getToken($Token,'user');
$canComment = getUser($User,'canComment');

if (!CheckProduct($Product)) {
    changeUser($User,'canComment',0);
    die(Response("محصول مورد نظر وجود ندارد",false,-800));
}
if ($Score < 1 || $Score > 5) {
    changeUser($User,'canComment',0);
    die(Response("امتیاز معتبر نیست",false,-801));
}
if (!$canComment) die(Response("شما اجازه درج نظر را ندارید",false,-802));

$addComment = $db->query("INSERT INTO `comments` (`user`,`product`,`title`,`text`,`score`,`date`) VALUES ($User,$Product,'$Title','$Text',$Score,UNIX_TIMESTAMP())");

if (!$addComment) die(Response("ثبت نظر مقدور نبود",false,-803));

Response("نظر شما ثبت شد و بعد از تایید نمایش داده خواهد شد",true,null,true);