<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 9:46 AM
 * brief: 首页更多视频
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'DataList';
$type = 2;//视频
$login_id = 13381765960;

$msg = '';
$code = 0;
$info = '';
$is_like = 0;
$is_collect = 0;

include_once("../LinkMySql.php");

//按阅读次数排序
$sql = "select id,type,title,brief,image,video,publish_time,reading,likes,collect,comments
        from {$mysqlName}   where type = '$type'
        order by reading desc;";

$result = database_query($sql);

if(count($result,0) > 0){
    $msg = '获取成功';
    $code = 0;
    $info = '数据展示';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
    foreach($result as $row)
    {
        //判断是否点赞 收藏  在登录的状态下
        if($login_id  != ""){ //用户登录状态
            $sql = "select * from Likes where iphone = '$login_id' and be_Like_id = '{$row['id']}'";
            $type_co = database_query($sql);
            if(count($type_co,0) > 0){  //有点赞记录
                $is_like = 1;
            }else{
                $is_like = 0;
            }
            $sql = "select * from Collect where iphone = '$login_id' and be_collect_id = '{$row['id']}'";
            $type_co = database_query($sql);
            if(count($type_co,0) > 0){  //有点赞记录
                $is_collect = 1;
            }else{
                $is_collect = 0;
            }
        }else{//用户未登录
            //不进行操作
        }
        if($row == end($result)){  //数组的最后一个
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"title\":\"{$row['title']}\",
                \"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",\"video\":\"{$row['video']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"reads\":\"{$row['reading']}\",\"likes\":\"{$row['likes']}\",\"is_like\":{$is_like},
                \"collect\":\"{$row['collect']}\",\"is_collect\":{$is_collect},\"comments\":\"{$row['comments']}\"}";
        }else{  //不是最后一个
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"title\":\"{$row['title']}\",
                \"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",\"video\":\"{$row['video']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"reads\":\"{$row['reading']}\",\"likes\":\"{$row['likes']}\",\"is_like\":{$is_like},
                \"collect\":\"{$row['collect']}\",\"is_collect\":{$is_collect},\"comments\":\"{$row['comments']}\"},";
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