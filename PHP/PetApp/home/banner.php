<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/16
 * Time: 20:33 PM
 * brief: 首页轮播图
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'Banner';

include_once("../LinkMySQL.php");

$sql = "select * from {$mysqlName}";

$result = database_query($sql);

$msg = '';
$code = 0;
$info = '';


if(count($result,0) > 1){
    $msg = '获取成功';
    $code = 0;
    $info = count($result,0);
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
    foreach($result as $row)
    {
        if($row == end($result)){  //最后一个
            echo "{\"id\":\"{$row['id']}\",\"url\":\"{$row['url']}\",\"link\":\"{$row['link']}\",\"brief\":\"{$row['brief']}\"}";
        }else{  //不是最后一个
            echo "{\"id\":\"{$row['id']}\",\"url\":\"{$row['url']}\",\"link\":\"{$row['link']}\",\"brief\":\"{$row['brief']}\"},";
        }
    }
    echo "]}";


}else{
    $msg = '获取失败';
    $code = 1;
    $info = '获取失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>