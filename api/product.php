<?
include "functions.php";

$Data = getData();

$Product = Clean($Data["product"]);

if (empty($Product)) die(Response("لطفا همه فیلد ها را پر نمایید",false,-400));

if (!is_int($Product)) die(Response("کالا باید یک عدد باشد",false,-401));

$Product = (int)$db->real_escape_string($Product);

$getProduct = $db->query("SELECT * FROM `products` WHERE `n`='$Product' AND `active`=1");

if (!$getProduct) die(Response("خطای غیر منتظره رخ داد",false,-402));

if ($getProduct->num_rows == 0) die(Response("محصول مورد نظر وجود ندارد",false,-403));

$Product = $getProduct->fetch_assoc();

$getComments = $db->query("SELECT * FROM `comments` WHERE `product`='$Product[n]' AND `approved`=1 ORDER BY `date` DESC ");
$getWarranties = $db->query("SELECT * FROM `warranties` WHERE `product`='$Product[n]' AND `active`=1");
$getDiscount = $db->query("SELECT * FROM `discounts` WHERE `product`='$Product[n]' AND `active`=1 AND `expiry_date`>UNIX_TIMESTAMP()");

if (!$getComments || !$getWarranties || !$getDiscount) die(Response("خطای غیر منتظره رخ داد",false,-402));

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
    'comments'=>$Comments,
    'has_discount'=>false
];

if ($getDiscount->num_rows == 1) {
    $DiscountROW = $getDiscount->fetch_assoc();

    $Discount = Discount($result['price'],$DiscountROW["percent"]);
    $result['has_discount'] = true;
    $Special = $DiscountROW['special'] ? true : false;

    $result['discount'] = [
        'price'=>$result['price'] - $Discount,
        'discounted_price'=>$Discount,
        'percent'=>$DiscountROW["percent"],
        'special'=>$Special
    ];
}

Response($result,true,400,true);