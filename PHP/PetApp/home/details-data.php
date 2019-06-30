<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 10:13 AM
 * brief: 首页文章、视频、动态详情
 */

$request = array_merge($_POST, $_GET);

$id = $request['data_id'];
$login_id = $request['login_id'];//登录用户的ID
//$id = '1202-1528457643586-10003';
//$login_id = 13381765960;//登录用户的ID

$msg = '';
$code = 0;
$info = '';

include_once("../LinkMySql.php");


$sql = "select id,type,dynamic_type,u.iphone as user_id,name as user_name,pic as user_pic,motto as user_motto,title,
        brief,image,video,txt,publish_time,reading,likes,collect,comments
        from DataList d,UserList u
        where d.id = '$id' and d.iphone = u.iphone;";

$result = database_query($sql);

$is_like = 0; //是否点赞
$is_collect = 0; //是否收藏
$is_attention = 0; //是否关注该用户

if ($login_id == '') { //如果用户没有登录
    //不进行操作
} else { //当有用户登录的时候,判断用户是否已点赞或已收藏
    $sql = "select * from Likes where iphone='$login_id' and be_like_id = '$id'";
    $type_like = database_query($sql);
    if (count($type_like, 0) > 0) {  //已点赞
        $is_like = 1;
    } else { //未点赞
        //不进行操作
    }
    $sql = "select * from Collect where iphone='$login_id' and be_collect_id = '$id'";
    $type_collect = database_query($sql);
    if (count($type_collect, 0) > 0) {  //已收藏
        $is_collect = 1;
    } else { //未收藏
        //不进行操作
    }
}

if (count($result, 0) > 0) {
    $msg = '获取成功';
    $code = 0;
    $info = count($result, 0);
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
    foreach ($result as $row) {
        if ($login_id == '') { //如果用户没有登录
            //不进行操作
            //数据只有一个
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                \"user_id\":\"{$row['user_id']}\",\"user_name\":\"{$row['user_name']}\",
                \"user_pic\":\"{$row['user_pic']}\",\"user_motto\":\"{$row['user_motto']}\",
                \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                \"video\":\"{$row['video']}\",\"txt\":\"{$row['txt']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"reads\":\"{$row['reading']}\",\"likes\":\"{$row['likes']}\",
                \"collect\":\"{$row['collect']}\",\"comments\":\"{$row['comments']}\",
                \"is_like\":\"{$is_like}\",\"is_collect\":\"{$is_collect}\",\"is_attention\":\"{$is_attention}\"}";
        } else { //当有用户登录的时候,判断用户是否关注该用户
            $sql = "select * from  UserAttention where iphone_1 = '$login_id' and iphone_2 = '{$row['user_id']}'";
            $type_attention = database_query($sql);
            if (count($type_attention, 0) > 0) {  //已关注
                $is_attention = 1;
            }
            //数据只有一个
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                \"user_id\":\"{$row['user_id']}\",\"user_name\":\"{$row['user_name']}\",
                \"user_pic\":\"{$row['user_pic']}\",\"user_motto\":\"{$row['user_motto']}\",
                \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                \"video\":\"{$row['video']}\",\"txt\":\"{$row['txt']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"reads\":\"{$row['reading']}\",\"likes\":\"{$row['likes']}\",
                \"collect\":\"{$row['collect']}\",\"comments\":\"{$row['comments']}\",
                \"is_like\":\"{$is_like}\",\"is_collect\":\"{$is_collect}\",\"is_attention\":\"{$is_attention}\"}";
        }


    }
    echo "]}";

    //备注 当每次调用成功这个方法的时候，都要自加一次reading
    //获取 reading 的原始值
    $sql = "select reading from DataList where id = '$id'";
    $reads = database_query($sql);
    $reading = $reads[0][0] + 1;  //查询成功一次自加一次
    $sql = "update DataList set reading = '$reading' where id = '$id'";
    database_excute($sql);
} else {
    $msg = '获取失败';
    $code = 1;
    $info = '获取失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}
?>