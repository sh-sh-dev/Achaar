<?
include "functions.php";

$getCategories = $db->query("SELECT * FROM `categories` WHERE `active`=1");

if (!$getCategories) die(Response("خطا در دریافت دسته بندی ها",false,-500));

//if ($getCategories->num_rows == 0) die(Response("دسته بندی ای وجود ندارد !",false,-501));
if ($getCategories->num_rows == 0) die(Response([],false,-501));

$Categories = [];
while ($CategoriesROW = $getCategories->fetch_assoc()) {
    $CategoriesArray = [
        'name'=>$CategoriesROW['name'],
        'english_name'=>$CategoriesROW['ename']
    ];
    $Categories[] = $CategoriesArray;
}

Response($Categories,true,null,true);