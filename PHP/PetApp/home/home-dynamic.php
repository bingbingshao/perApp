<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 9:31 AM
 * brief: 首页热门动态
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'DataList';
$type = 0;//动态
$msg = '';
$code = 0;
$info = '';

include_once("../LinkMySql.php");

//按点赞多少排序 取前五条
$sql = "select id,type,dynamic_type,brief,image,video,publish_time,reading
        from {$mysqlName} where type = '$type'
        order by reading desc
        limit 5";

$result = database_query($sql);

if(count($result,0) > 0){
    $msg = '获取成功';
    $code = 0;
    $info = count($result,0);
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
    foreach($result as $row)
    {
       // $row['image'] = explode("ΩΩ",$row['image']);  //把字符串分割为数组
        if($row == end($result)){  //最后一个
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                \"brief\":\"{$row['brief']}\",\"video\":\"{$row['video']}\",\"image\":\"{$row['image']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"reads\":\"{$row['reading']}\"}";
        }else{  //不是最后一个
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                \"brief\":\"{$row['brief']}\",\"video\":\"{$row['video']}\",\"image\":\"{$row['image']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"reads\":\"{$row['reading']}\"},";
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