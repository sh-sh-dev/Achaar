<?
include "functions.php";

$Data = getData();

if (empty(Clean($Data["product"]))) die(Response("لطفا همه فیلد ها را پر نمایید",false,-400));

$Product = (int)Clean($Data["product"]);

if ($Product == 0) die(Response("کالا باید یک عدد باشد",false,-401));

if (!is_int($Product)) die(Response("کالا باید یک عدد باشد",false,-401));

$Product = (int)$db->real_escape_string($Product);

$getProduct = $db->query("SELECT * FROM `products` WHERE `n`='$Product' AND `active`=1");

if (!$getProduct) die(Response("خطای غیر منتظره رخ داد",false,-402));

if ($getProduct->num_rows == 0) die(Response("محصول مورد نظر وجود ندارد",false,-403));

$Product = $getProduct->fetch_assoc();

$getComments = $db->query("SELECT * FROM `comments` WHERE `product`='$Product[n]' AND `approved`=1 ORDER BY `date` DESC LIMIT 5");
$getWarranties = $db->query("SELECT * FROM `warranties` WHERE `product`='$Product[n]' AND `active`=1");
$getDiscount = $db->query("SELECT * FROM `discounts` WHERE `product`='$Product[n]' AND `active`=1 AND `expiry_date`>UNIX_TIMESTAMP()");
$getTechnicalSpecifications = $db->query("SELECT * FROM `technical_specifications` WHERE `product`='$Product[n]' and `active`=1");

if (!$getComments || !$getWarranties || !$getDiscount || !$getTechnicalSpecifications) die(Response("خطای غیر منتظره رخ داد",false,-402));

$Comments = [];
while ($CommentsROW = $getComments->fetch_assoc()) {
    $CommentText = preg_replace("/\r|\n/", "\n",$CommentsROW['text']);
    $CommentsArray = [
        'title'=>$CommentsROW['title'],
        'text'=>$CommentText,
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
        'full'=>$WarrantiesROW['name'] . ' | ' . $WarrantiesROW['period']
    ];
    $Warranties[] = $WarrantiesArray;
}

$TechnicalSpecifications = [];
while ($TechnicalSpecificationsROW = $getTechnicalSpecifications->fetch_assoc()) {
    $TechnicalSpecificationsArray = [
        'item'=>$TechnicalSpecificationsROW['item'],
        'value'=>$TechnicalSpecificationsROW['value']
    ];
    $TechnicalSpecifications[] = $TechnicalSpecificationsArray;
}

$Score = $db->query("SELECT AVG(score) FROM comments WHERE `product`=1 AND `approved`=1");
$Score = $Score->fetch_assoc();

$result = [
    'name'=>$Product['name'],
    'description'=>$Product['description'],
    'technical_specifications'=>$TechnicalSpecifications,
    'price'=>$Product['price'],
    'score'=>(int)round($Score["AVG(score)"]),
    'category'=>getCategory($Product['category'],'name'),
    'warranties'=>$Warranties,
    'comments'=>$Comments,
    'has_discount'=>false,
    'available'=>$Product['available'] ? true : false
];

if ($getDiscount->num_rows == 1) {
    $DiscountROW = $getDiscount->fetch_assoc();

    $Discount = Discount($result['price'],$DiscountROW['percent']);
    $result['has_discount'] = true;
    $Special = $DiscountROW['special'] ? true : false;

    $result['discount'] = [
        'price'=>$result['price'] - $Discount,
        'discounted_price'=>$Discount,
        'percent'=>$DiscountROW['percent'],
        'special'=>$Special
    ];
}

Response($result,true,null,true);
