<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/5/1
 * Time: 10:23 PM
 * brief: 我的发布
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserAttention';
$mysqlName_user = 'UserList';
$login_id = $request['login_id'];

include_once("../LinkMySql.php");
$msg = '';
$code = 0;
$info = '';
$is_like = 0;
$is_collect = 0;

/*
 *  1、判断该ID是否存在
 *  2、查找我的发布
 */

$sql = "select iphone from {$mysqlName_user} where iphone = '$login_id'";
$is_user = database_query($sql);

if(count($is_user,0) > 0){  //存在该用户
    $sql = "select id,type,dynamic_type,title,brief,image,video,publish_time,reading,likes,collect,comments
            from DataList 
            where iphone = {$login_id}
            order by publish_time ";
    $result = database_query($sql);

    if(count($result,0) > 0){  //有发布的内容
        $msg = '发布内容';
        $code = 0;
        $info = count($result,0);
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
        foreach($result as $row){

            //判断自己是否点赞收藏
            $sql = "select * from Likes where iphone = '$login_id' and be_Like_id = '{$row['id']}'";
            $type_co = database_query($sql);
            if(count($type_co,0) > 0){  //有点赞记录
                $is_like = 1;
            }else{
                $is_like = 0;
            }
            $sql = "select * from Collect where iphone = '$login_id' and be_collect_id = '{$row['id']}'";
            $type_co = database_query($sql);
            if(count($type_co,0) > 0){  //有收藏记录
                $is_collect = 1;
            }else{
                $is_collect = 0;
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
    }else{  //没有发布的内容
        $msg = '没有发布';
        $code = 0;
        $info = count($result,0);
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[]}";
    }
}else{  //不存在该用户
    $msg = '操作失败';
    $code = 1;
    $info = '操作失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[]}";
}

?>