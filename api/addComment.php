<?
include "functions.php";

$Data = getData();

$Token = $db->real_escape_string(Clean($Data["token"]));
$Title = $db->real_escape_string(Clean($Data["title"]));
$Text = $db->real_escape_string(Clean($Data["text"]));
//$Score = (int)Clean($Data["score"]);
$Score = 100;
$Product = (int)Clean($Data["product"]);

if (!CheckToken($Data["token"])) die(Response("توکن معتبر نیست",false,-2));
if (empty($Title) || empty($Text) || empty($Score) || empty($Product) || $Product == 0) die(Response("لطفا همه فیلد ها را پر کنید",false,-3));

$User = getToken($Token,'user');
$canComment = getUser($User,'canComment');

if (!CheckProduct($Product)) {
    changeUser($User,'canComment',0);
    die(Response("محصول مورد نظر وجود ندارد",false,-800));
}
if (!$canComment) die(Response("شما اجازه درج نظر را ندارید",false,-801));

$addComment = $db->query("INSERT INTO `comments` (`user`,`product`,`title`,`text`,`score`,`date`) VALUES ($User,$Product,'$Title','$Text',$Score,UNIX_TIMESTAMP())");

if (!$addComment) die(Response("ثبت نظر مقدور نبود",false,-802));

Response("نظر ثبت شد",true,null,true);