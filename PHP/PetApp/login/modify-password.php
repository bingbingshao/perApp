<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/14
 * Time: 3:47 PM
 * brief:
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserList';
$iphone = $request['iphone'];
$password = $request['password'];

include_once("../LinkMySQL.php");
$msg = '';
$code = 0;
$info = '';

$sql = "select * from {$mysqlName} where iphone='$iphone'";

$result = database_query($sql);

if (count($result) > 0) {

    $sql = "update {$mysqlName} set password = '$password' where iphone = '$iphone'";
    database_excute($sql);

    $sql = "select * from {$mysqlName} where iphone='$iphone' and password = '$password'";
    $result1 = database_query($sql);

    if (count($result1) > 0) {

        $msg = '密码修改成功';
        $code = 200;
        $info = '密码修改成功';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    } else {
        $msg = '密码修改失败';
        $code = 0;
        $info = '密码修改失败';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }

} else {
    $msg = '该用户不存在';
    $code = 1;
    $info = '该用户不存在';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}
?>