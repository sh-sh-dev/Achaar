<?
include "functions.php";

$Data = getData();

$SearchQ = Clean($Data["search"]);

if (empty($SearchQ) || is_int($SearchQ)) {
    die(Response("همه فیلد ها را پر کنید",false,-600));
}

$SearchQ = $db->real_escape_string($SearchQ);

$Search = $db->query("SELECT * FROM `products` WHERE `name` LIKE '%$SearchQ%' and `active`=1");
if (!$Search) die(Response("",false,-601));
if ($Search->num_rows == 0) die(Response("محصول مورد نظر پیدا نشد",false,-602));

$result = [];
while ($SearchROW = $Search->fetch_assoc()) {
    $getDiscount = $db->query("SELECT * FROM `discounts` WHERE `product`='$SearchROW[n]' AND `active`=1 AND `expiry_date`>UNIX_TIMESTAMP()");

    $SearchArray = [
        'name'=>$SearchROW['name'],
        'price'=>$SearchROW['price'],
        'category'=>getCategory($SearchROW['category'],'name'),
        'has_discount'=>false
    ];

    if ($getDiscount->num_rows != 0) {
        $DiscountROW = $getDiscount->fetch_assoc();

        $Discount = Discount($SearchArray['price'],$DiscountROW["percent"]);
        $SearchArray['has_discount'] = true;
        $Special = $DiscountROW['special'] ? true : false;

        $SearchArray['discount'] = [
            'price'=>$SearchArray['price'] - $Discount,
            'discounted_price'=>$Discount,
            'percent'=>$DiscountROW["percent"],
            'special'=>$Special
        ];
    }

    $result[] = $SearchArray;
}

Response($result,true,null,1);