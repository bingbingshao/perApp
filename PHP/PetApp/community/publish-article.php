<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/20
 * Time: 10:37 AM
 * brief: 发布文章
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'DataList';
$id = '1202-1528457643586-20003';
$type = 1;
$iphone = '13381765963';
$title = '青帝';
$brief = '万古青天一株莲';
$publish_time = date('Y-m-d h:i:s', time()); //当前时间
$image = 'http://111.231.141.185/pet/image/pet-banner-5.jpg';
$txt = 'http://111.231.141.185/pet/txt/test.docx';

include_once("../LinkMySql.php");

$msg = '';
$code = 0;
$info = '';

$sql = "select * from {$mysqlName} where id = '$id'";

$result = database_query($sql);

if (count($result, 0) == 1) {   //数据库里面已经存在该ID的数据
    $msg = '重复添加';
    $code = 0;
    $info = '重复添加';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
} else {  //数据库中没有该数据

    $sql = "insert into {$mysqlName} (id,type,iphone,title,brief,image,txt,publish_time) 
        values('$id','$type','$iphone','$title','$brief','$image','$txt','$publish_time')";

    database_excute($sql);

    $sql = "select * from {$mysqlName} where id = '$id'";

    $result = database_query($sql);


    if (count($result, 0) == 1) {
        $msg = '添加成功';
        $code = 0;
        $info = '添加成功';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    } else {
        $msg = '添加失败';
        $code = 1;
        $info = '添加失败';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }
}


?>