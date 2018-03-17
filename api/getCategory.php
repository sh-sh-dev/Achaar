<?
include "functions.php";

$Data = getData();

$Category = Clean($Data["category"]);

if (empty($Category)) die(Response("دسته بندی وارد نشده است",false,-3));

$Category = $db->real_escape_string($Category);

$getCategory = $db->query("SELECT * FROM `categories` WHERE `ename`='$Category' AND `active`=1");

if ($getCategory->num_rows == 0) die(Response("دسته بندی یافت نشد",false,-701));

$Category = $getCategory->fetch_assoc();

$getProducts = $db->query("SELECT * FROM `products` WHERE `category`=$Category[n] and `active`=1");

$Products = [];
while ($ProductsROW = $getProducts->fetch_assoc()) {
    $getDiscount = $db->query("SELECT * FROM `discounts` WHERE `product`='$ProductsROW[n]' AND `active`=1 AND `expiry_date`>UNIX_TIMESTAMP()");

    $Score = $db->query("SELECT AVG(score) FROM comments WHERE `product`='$ProductsROW[n]' AND `approved`=1");
    $Score = $Score->fetch_assoc();
    $Score = (int)round($Score["AVG(score)"]);

    $ProductsArray = [
        'id'=>$ProductsROW['n'],
        'name'=>$ProductsROW["name"],
        'score'=>$Score,
        'price'=>$ProductsROW["price"],
        'has_discount'=>false,
        'available'=>$ProductsROW['available'] ? true : false
    ];

    if ($getDiscount->num_rows != 0) {
        $DiscountROW = $getDiscount->fetch_assoc();

        $Discount = Discount($ProductsArray['price'],$DiscountROW["percent"]);
        $ProductsArray['has_discount'] = true;
        $Special = $DiscountROW['special'] ? true : false;

        $ProductsArray['discount'] = [
            'price'=>$ProductsArray['price'] - $Discount,
            'discounted_price'=>$Discount,
            'percent'=>$DiscountROW["percent"],
            'special'=>$Special
        ];
    }

    $Products[] = $ProductsArray;
}

$result = [
    'name'=>$Category["name"],
    'products'=>$Products
];

Response($result,true,null,true);