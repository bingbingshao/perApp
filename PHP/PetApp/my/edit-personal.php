<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/5/1
 * Time: 10:23 PM
 * brief: 修改个人信息
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserList';
$login_id = $request['login_id'];
$name = $request['name'];
$pic = $request['pic'];
$gender = $request['gender'];
$birth = $request['birth'];
$motto = $request['motto'];
$address = $request['address'];

include_once("../LinkMySql.php");
$msg = '';
$code = 0;
$info = '';


//1、判断该ID是否存在
$sql = "update {$mysqlName} 
        set name='{$name}',pic='{$pic}',gender={$gender},birth='{$birth}',motto='{$motto}',address='{$address}'
        where iphone = '$login_id'";
database_excute($sql);

$sql = "select * from {$mysqlName}
        where iphone = '$login_id' and name='{$name}'and pic='{$pic}'
        and gender={$gender} and birth='{$birth}' and motto='{$motto}'and address='{$address}'";
$result = database_query($sql);

if (count($result, 0) > 0) {  //存在该用户
    $msg = '保存成功';
    $code = 0;
    $info = '保存成功';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";

} else {  //不存在该用户
    $msg = '保存失败';
    $code = 1;
    $info = '保存失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}

?>