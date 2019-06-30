<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/14
 * Time: 3:47 PM
 * brief: 用户登录验证
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserList';
$iphone = $request['iphone'];
$password = $request['password'];

include_once("../LinkMySQL.php");




$sql = "select * from {$mysqlName} where iphone='$iphone' and password='$password'";

$result = database_query($sql);

$msg = '';
$code = 0;
$info = '';


if(count($result,0) == 1){
    $msg = '登陆成功';
    $code = 0;
    $info = '登陆成功';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}else{
    $msg = '用户名或密码不正确';
    $code = 1;
    $info = '用户名或密码不正确';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>