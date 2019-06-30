<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/5/1
 * Time: 10:23 PM
 * brief: 获取我的个人信息
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserList';
$login_id = $request['login_id'];

include_once("../LinkMySql.php");
$msg = '';
$code = 0;
$info = '';


//1、判断该ID是否存在
$sql = "select name,pic,gender,birth,motto,address,register_time from {$mysqlName} where iphone = '$login_id'";
$result = database_query($sql);


if (count($result, 0) > 0) {  //存在该用户
    $msg = '获取成功';
    $code = 0;
    $info = count($result, 0);
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
    foreach ($result as $row) {
        echo "{\"name\":\"{$row['name']}\",\"pic\":\"{$row['pic']}\",
                \"gender\":\"{$row['gender']}\",\"birth\":\"{$row['birth']}\",
                \"motto\":\"{$row['motto']}\",\"address\":\"{$row['address']}\",
                 \"register_time\":\"{$row['register_time']}\"}";
    }
    echo "]}";

} else {  //不存在该用户
    $msg = '操作失败';
    $code = 1;
    $info = '操作失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}

?>