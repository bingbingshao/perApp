<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/17
 * Time: 20:13 PM
 * brief: 用户注册
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserList';
$iphone = $request['iphone'];
$name = $request['name'];
$password = $request['password'];
$pic = $request['pic'];
$gender = $request['gender'];
$birth = '';
$motto = '';
$register_time = date('Y-m-d h:i:s', time()); //当前时间
$wechat = '';
$qq = 0;
$weibo = '';

include_once("../LinkMySQL.php");


$msg = '';
$code = 0;
$info = '';

$sql_select = "select * from {$mysqlName} where iphone = '$iphone'";
$result = database_query($sql_select);

if (count($result, 0) > 0) {  //该用户已存在
    $msg = '该用户已存在请登录';
    $code = 0;
    $info = '该用户已存在请登录';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
} else {  //该用户不存在可以注册

    $sql_register = "insert into {$mysqlName} (iphone,name,password,pic,gender,birth,motto,register_time,wechat,qq,weibo)
    values ('$iphone','$name','$password','$pic',$gender,'$birth','$motto','$register_time','$wechat',$qq,'$weibo')";

    database_excute($sql_register);

    $sql_select = "select * from {$mysqlName} where iphone = '$iphone'";
    $result = database_query($sql_select);


    if (count($result, 0) == 1) {
        $msg = '注册成功';
        $code = 200;
        $info = '注册成功';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    } else {
        $msg = '注册失败';
        $code = 1;
        $info = '注册失败';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }
}

?>