<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 5:49 PM
 * brief: 社区页面,关注
 */
$request = array_merge($_POST, $_GET);
$mysqlName_data = 'DataList';
$mysqlName_user = 'UserList';
$mysqlName_attention = 'UserAttention';
$login_id = $request['login_id'];
//$login_id = 13381765962;

include_once("../LinkMySQL.php");

$msg = '';
$code = 0;
$info = '';
$is_like = 0;

/*
 *  1、判断该用户是否存在
 *  2、查找该用户关注的用户
 *  3、获取关注用户的发帖
 *  4、合并数组,并案时间先后排序
 */


$sql = "select * from {$mysqlName_user} where iphone = '$login_id'";
$result_1 = database_query($sql);

if (count($result_1, 0) > 0) {  //用户存在
    $sql = "select iphone_2 from {$mysqlName_attention} where iphone_1 = '$login_id'";
    $result_2 = database_query($sql);

    $array_sum = Array();
    //获取自己发表的数据
    $sql = "select id,type,dynamic_type,u.iphone as user_id,u.name as user_name,
                    u.pic as user_pic,title,brief,image,video,txt,publish_time,likes
                    from DataList d,UserList u
                    where d.iphone = u.iphone and d.iphone = '{$login_id}'";
    $result_3 = database_query($sql);
    $array_sum = array_merge($array_sum, $result_3);  //合并数组

    foreach ($result_2 as $row) {  //根据关注人的ID分别获取发布的数据
        //搜索数据不分类别、获取所有的数据
        $sql = "select id,type,dynamic_type,u.iphone as user_id,u.name as user_name,
                    u.pic as user_pic,title,brief,image,video,txt,publish_time,likes
                    from DataList d,UserList u
                    where d.iphone = u.iphone and d.iphone = '{$row['iphone_2']}'";
        $result_3 = database_query($sql);
        $array_sum = array_merge($array_sum, $result_3);  //合并数组
    }
    //按时间顺序排序
    $time_str = Array();
    foreach ($array_sum as $key => $v) {
        $array_sum[$key]['time_str'] = strtotime($v['publish_time']);
        $time_str[] = $array_sum[$key]['time_str'];
    }
    array_multisort($time_str, SORT_DESC, $array_sum);

    if (count($array_sum, 0) > 0) {  //所关注的人存在数据(动态,文章,视频)
        $msg = '发布的数据';
        $code = 0;
        $info = count($array_sum, 0);
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
        //输出
        foreach ($array_sum as $row) {
            if ($login_id != '') { //用户登录状态 查询是否点赞该条数据
                $sql = "select * from Likes where iphone = '$login_id' and be_Like_id = '{$row['id']}'";
                $type_co = database_query($sql);
                if (count($type_co, 0) > 0) {  //有点赞记录
                    $is_like = 1;
                } else {
                    $is_like = 0;
                }
            } else {//用户未登录
                //不进行操作
            }
            if ($row == end($array_sum)) {  //数组的最后一个
                echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                            \"user_id\":\"{$row['user_id']}\",\"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                            \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                            \"video\":\"{$row['video']}\",\"txt\":\"{$row['txt']}\",
                            \"publish_time\":\"{$row['publish_time']}\",\"likes\":\"{$row['likes']}\",\"is_like\":\"{$is_like}\"}";
            } else {  //不是最后一个
                echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                            \"user_id\":\"{$row['user_id']}\",\"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                            \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                            \"video\":\"{$row['video']}\",\"txt\":\"{$row['txt']}\",
                            \"publish_time\":\"{$row['publish_time']}\",\"likes\":\"{$row['likes']}\",\"is_like\":\"{$is_like}\"},";
            }

        }
        echo "]}";
    } else { //所关注的人无数据(动态,文章,视频)发布
        $msg = '没有数据';
        $code = 0;
        $info = count($array_sum, 0);
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