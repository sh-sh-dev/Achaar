<?
include "functions.php";

$Data = getData();

$Product = Clean($Data["product"]);

if (empty($Product)) die(Response("لطفا همه فیلد ها را پر نمایید",false,-400));

$Product = $db->real_escape_string($Product);

$getProduct = $db->query("SELECT * FROM `Products` WHERE `name`='$Product' AND `active`=1");

if (!$getProduct) die(Response("خطای غیر منتظره رخ داد",false,-401));

if ($getProduct->num_rows == 0) die(Response("محصول مورد نظر وجود ندارد",false,-402));

$Product = $getProduct->fetch_assoc();

$getComments = $db->query("SELECT * FROM `Comments` WHERE `product`='$Product[n]' AND `approved`=1 ORDER BY `date` DESC ");
$getWarranties = $db->query("SELECT * FROM `Warranties` WHERE `product`='$Product[n]' AND `active`=1");

if (!$getComments || !$getWarranties) die(Response("خطای غیر منتظره رخ داد",false,-401));

$Comments = [];
while ($CommentsROW = $getComments->fetch_assoc()) {
    $CommentsArray = [
        'title'=>$CommentsROW['title'],
        'text'=>$CommentsROW['text'],
        'date'=>tr_num(jdate('o/n/j G:i',$CommentsROW['date'])), # or : G:i o/m/d
        'score'=>$CommentsROW['score'],
        'user'=>getUser($CommentsROW['user'],'name')
    ];
    $Comments[] = $CommentsArray;
}

$Warranties = [];
while ($WarrantiesROW = $getWarranties->fetch_assoc()) {
    $WarrantiesArray = [
        'name'=>$WarrantiesROW['name'],
        'period'=>$WarrantiesROW['period'],
        'full'=>$WarrantiesROW['name'] . ' | ' . $WarrantiesROW["period"]
    ];
    $Warranties[] = $WarrantiesArray;
}

$result = [
    'name'=>$Product["name"],
    'price'=>$Product["price"],
    'category'=>getCategory($Product["category"],'name'),
    'warranties'=>$Warranties,
    'comments'=>$Comments
];

Response($result,true,400,true);