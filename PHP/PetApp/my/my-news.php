<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/5/1
 * Time: 10:23 PM
 * brief: 我的消息
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserAttention';
$mysqlName_user = 'UserList';
$login_id = 13381765960;

include_once("../LinkMySql.php");
$msg = '';
$code = 0;
$info = '';

/*
 *  1、判断该ID是否存在
 *  2、查找我发布的
 *  3、根据我的发布查找是否有评论,筛选出不是自己的发的评论
 *  5、按顺序时间排列
 */

//1、判断该ID是否存在
$sql = "select iphone from {$mysqlName_user} where iphone = '$login_id'";
$is_user = database_query($sql);

if(count($is_user,0) > 0){  //存在该用户

    // 2、查找我发布的
    $sql = "select id,type,dynamic_type,title,brief,image,video,publish_time
            from DataList 
            where iphone = {$login_id} 
            order by publish_time ";
    $result = database_query($sql);

    //3、根据我的发布查找是否有评论
    $array_sum = Array();
    foreach($result as $row){
        $sql = "select comment_id,user_id,user_name,user_pic,be_commend_id,comment_time,content,likes
                from Comments 
                where user_id != {$login_id} and be_commend_id = '{$row['id']}'";
        $result = database_query($sql);
        $array_sum = array_merge($array_sum,$result);  //合并数组
    }
    //按时间顺序排序
    $time_str = Array();
    foreach ($array_sum as $key =>$v){
        $array_sum[$key]['time_str'] = strtotime($v['comment_time']);
        $time_str[] = $array_sum[$key]['time_str'];
    }
    array_multisort($time_str, SORT_DESC, $array_sum);

    if(count($array_sum,0) > 0){  //有消息的内容
        $msg = '消息内容';
        $code = 0;
        $info = count($array_sum,0);
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
        foreach($array_sum as $row){
            echo "{\"comment_id\":\"{$row['comment_id']}\",\"user_id\":\"{$row['user_id']}\",
                \"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                \"be_commend_id\":\"{$row['be_commend_id']}\",\"comment_time\":\"{$row['comment_time']}\",
                 \"content\":\"{$row['content']}\",\"likes\":\"{$row['likes']}\"},";
        }
        echo "]}";
    }else{  //没有消息的内容
        $msg = '没有消息';
        $code = 0;
        $info = count($result,0);
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }
}else{  //不存在该用户
    $msg = '操作失败';
    $code = 1;
    $info = '操作失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}

?>