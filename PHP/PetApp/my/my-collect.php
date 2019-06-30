<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/25
 * Time: 8:53 PM
 * brief: 我的收藏
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'Collect';
$mysqlName_user = 'UserList';
$login_id = $request['login_id'];

include_once("../LinkMySql.php");
$msg = '';
$code = 0;
$info = '';

/*
 *  1、判断该ID是否存在
 *  2、查找我的收藏
 */

$sql = "select iphone from {$mysqlName_user} where iphone = '$login_id'";
$is_user = database_query($sql);

if(count($is_user,0) > 0){  //存在该用户
    $sql = "select c.collect_id as collect_id,c.type as type,c.iphone as user_id,
			u.name as user_name,u.pic as user_pic,d.id as data_id,d.title as title,
			d.brief as brief,d.image as image,d.video as video,d.publish_time as publish_time
            from UserList u,Collect c,DataList d
            where c.iphone = {$login_id} and c.iphone = u.iphone and c.be_collect_id = d.id
            order by collect_time";
    $result = database_query($sql);

    if(count($result,0) > 0){  //有收藏的内容
        $msg = '收藏内容';
        $code = 0;
        $info = count($result,0);
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
        foreach($result as $row){

            if($row == end($result)){  //数组的最后一个
                echo "{\"collect_id\":\"{$row['collect_id']}\",\"type\":\"{$row['type']}\",\"user_id\":\"{$row['user_id']}\",
                \"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",\"data_id\":\"{$row['data_id']}\",
                \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                \"video\":\"{$row['video']}\",\"publish_time\":\"{$row['publish_time']}\"}";
            }else{  //不是最后一个
                echo "{\"collect_id\":\"{$row['collect_id']}\",\"type\":\"{$row['type']}\",\"user_id\":\"{$row['user_id']}\",
                \"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",\"data_id\":\"{$row['data_id']}\",
                \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                \"video\":\"{$row['video']}\",\"publish_time\":\"{$row['publish_time']}\"},";
            }
        }
        echo "]}";
    }else{  //没有收藏的内容
        $msg = '没有收藏';
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