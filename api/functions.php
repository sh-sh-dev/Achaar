<?
include_once "config.php";
include_once "vendor/jdf.php";
include_once "vendor/classes.php";

function strip_tags_content($text, $tags = '', $invert = FALSE) {
    preg_match_all('/<(.+?)[\s]*\/?[\s]*>/si', trim($tags), $tags);
    $tags = array_unique($tags[1]);

    if(is_array($tags) AND count($tags) > 0) {
        if($invert == FALSE) {
            return preg_replace('@<(?!(?:'. implode('|', $tags) .')\b)(\w+)\b.*?>.*?</\1>@si', '', $text);
        }
        else {
            return preg_replace('@<('. implode('|', $tags) .')\b.*?>.*?</\1>@si', '', $text);
        }
    }
    elseif($invert == FALSE) {
        return preg_replace('@<(\w+)\b.*?>.*?</\1>@si', '', $text);
    }
    return $text;
}

function xss_clean($data) {
// Fix &entity\n;
    $data = str_replace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $data);
    $data = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $data);
    $data = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $data);
    $data = html_entity_decode($data, ENT_COMPAT, 'UTF-8');

// Remove any attribute starting with "on" or xmlns
    $data = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $data);

// Remove javascript: and vbscript: protocols
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $data);
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $data);
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $data);

// Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $data);

// Remove namespaced elements (we do not need them)
    $data = preg_replace('#</*\w+:\w[^>]*+>#i', '', $data);

    do {
        // Remove really unwanted tags
        $old_data = $data;
        $data = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $data);
    }
    while ($old_data !== $data);

// we are done...
    return $data;
}

function Clean($value) {
    $value = strip_tags_content(xss_clean(htmlspecialchars($value)));
    return $value;
}

function Response($value , $ok = true , $code = null,$print = 0) {
    $res = [
        'ok'=>$ok,
        'result'=>$value
    ];
    if (!$ok && !empty($code)) $res['code'] = $code;
    $res = json_encode($res,JSON_UNESCAPED_UNICODE);
    if ($print) echo $res;
    else return $res;
}

function Token($value,$random_bytes = 5) {
    return md5(bin2hex($value . random_bytes($random_bytes)));
}

function getData($array = true) {
    return json_decode(file_get_contents("php://input"),$array);
}

function get($table,$req) {
    $db = $GLOBALS["db"];
    $query = $db->query("SELECT * FROM `$table`");
    $result = $query->fetch_assoc();
    return $result[$req];
}

function getCategory($n,$req) {
    $db = $GLOBALS["db"];
    $query = $db->query("SELECT * FROM `categories` WHERE `name`='$n' OR `n`='$n'");
    $result = $query->fetch_assoc();
    return $result[$req];
}

function getUser($n,$req) {
    $db = $GLOBALS["db"];
    $query = $db->query("SELECT * FROM `users` WHERE `mobile`='$n' OR `n`='$n'");
    $result = $query->fetch_assoc();
    return $result[$req];
}

function changeUser($user,$item,$value) {
    $db = $GLOBALS["db"];
    $change = $db->query("UPDATE `users` SET `$item`='$value' WHERE `n`='$user' OR `mobile`='$user'");
    if ($change) return true;
    else return false;
}

function getToken($n,$req) {
    $db = $GLOBALS["db"];
    $query = $db->query("SELECT * FROM `tokens` WHERE `token`='$n' OR `n`='$n'");
    $result = $query->fetch_assoc();
    return $result[$req];
}

function Discount($price, $percent) {
    $Discount = ($percent /100) * $price;
    return ($price - $Discount);
}

function CheckToken($token) {
    $db = $GLOBALS["db"];
    if (empty($token)) return false;
    $query = $db->query("SELECT * FROM `tokens` WHERE `token`='$token' AND `expiry_date`>UNIX_TIMESTAMP() AND `blocked`=0");
    if (!$query) return false;
    if ($query->num_rows == 1) {
        $User = $query->fetch_assoc();
        $User = $User["user"];
        if (getUser($User,'blocked')) return false;
        return true;
    }
    else {
        return false;
    }
}

function CheckProduct($product) {
    $db = $GLOBALS["db"];
    if (empty($product)) return false;
    $query = $db->query("SELECT `name` FROM `products` WHERE `n`='$product' AND `active`=1");
    if (!$query) return false;
    if ($query->num_rows == 1) return true;
    else return false;
}