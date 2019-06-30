<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/5/1
 * Time: 10:23 PM
 * brief: 查询是否关注
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserAttention';
$login_id = $request['login_id'];
$user_id = $request['user_id'];

include_once("../LinkMySql.php");

$msg = '';
$code = 0;
$info = '';


$sql = "select * from {$mysqlName} where iphone_1 = '$login_id' and iphone_2 = '$user_id'";
$result = database_query($sql);

if(count($result) > 0) {
    $msg = '已关注';
    $code = 200;
    $info = '已关注';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[]}";
}else{
    $msg = '未关注';
    $code = 1;
    $info = '未关注';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[]}";
}

?>