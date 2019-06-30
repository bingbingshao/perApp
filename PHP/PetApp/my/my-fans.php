<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/5/1
 * Time: 10:23 PM
 * brief: 我的粉丝
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'UserAttention';
$mysqlName_user = 'UserList';
$login_id = $request['login_id'];

include_once("../LinkMySql.php");
$msg = '';
$code = 0;
$info = '';

/*
 *  1、判断该ID是否存在
 *  2、查找我的关注
 */

$sql = "select iphone from {$mysqlName_user} where iphone = '$login_id'";
$is_user = database_query($sql);

if(count($is_user,0) > 0){  //存在该用户
    $sql = "select attention_id, ua.iphone_1 as user_id, ul.name as user_name, 
			 ul.pic as user_pic,ul.motto as user_motto,attention_time
            from UserAttention ua,UserList ul
            where ua.iphone_2 = {$login_id} and ua.iphone_1 = ul.iphone
            order by attention_time";
    $result = database_query($sql);

    if(count($result,0) > 0){  //有关注的内容
        $msg = '粉丝列表';
        $code = 0;
        $info = count($result,0);
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
        foreach($result as $row){
            if($row == end($result)) {
                echo "{\"attention_id\":\"{$row['attention_id']}\",\"user_id\":\"{$row['user_id']}\",
                \"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                \"user_motto\":\"{$row['user_motto']}\",\"attention_time\":\"{$row['attention_time']}\"}";
            }else{
                echo "{\"attention_id\":\"{$row['attention_id']}\",\"user_id\":\"{$row['user_id']}\",
                \"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                \"user_motto\":\"{$row['user_motto']}\",\"attention_time\":\"{$row['attention_time']}\"},";
            }
        }
        echo "]}";
    }else{  //没有关注的内容
        $msg = '没有粉丝';
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