<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/6/9
 * Time: 1:14 PM
 * 验证验证码输入是不是正确
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'ModifyCode';
$code_id = $request['code_id'];
$codes = $request['codes'];


include_once("../LinkMySQL.php");

$msg = '';
$code = 0;
$info = '';

$sql = "select * from {$mysqlName} where code_id = '$code_id' and codes = '$codes'";
$result = database_query($sql);

if(count($result,0) > 0){
    $msg = '验证成功';
    $code = 0;
    $info = '验证成功';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}else{
    $msg = '验证失败';
    $code = 1;
    $info = '验证失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>