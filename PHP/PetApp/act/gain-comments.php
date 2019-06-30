<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 4:57 PM
 */
$request = array_merge($_POST, $_GET);

$mysqlName = 'Comments';
$be_commend_id = $request['data_id'];
$login_id = $request['login_id'];//登录用户的ID

$msg = '';
$code = 0;
$info = '';

include_once("../LinkMySql.php");

$is_like = 0;

//获取点赞信息 按时间顺序排列
$sql = "select * from {$mysqlName} where be_commend_id = '$be_commend_id' order by comment_time";

$result = database_query($sql);



if(count($result,0) > 0) {
    $msg = '获取成功';
    $code = 0;
    $info = count($result,0);  //数据长度
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
    foreach ($result as $row) {
        if($login_id  != ''){ //用户登录状态
            $sql = "select * from Likes_comments where iphone = '$login_id' and be_likes_comments_id = '{$row['comment_id']}'";
            $type_co = database_query($sql);
            if(count($type_co,0) > 0){  //有点赞记录
                $is_like = 1;
            }else{
                $is_like = 0;
            }
        }else{//用户未登录
            //不进行操作
        }

        if($row == end($result)){  //数组的最后一个
            echo "{\"comment_id\":\"{$row['comment_id']}\",\"be_commend_id\":\"{$row['be_commend_id']}\",\"user_id\":\"{$row['user_id']}\",
                \"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                \"content\":\"{$row['content']}\",\"comment_time\":\"{$row['comment_time']}\",
                \"likes\":\"{$row['likes']}\",\"is_like\":\"{$is_like}\"}";
        }else{  //不是最后一个
            echo "{\"comment_id\":\"{$row['comment_id']}\",\"be_commend_id\":\"{$row['be_commend_id']}\",\"user_id\":\"{$row['user_id']}\",
                \"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                \"content\":\"{$row['content']}\",\"comment_time\":\"{$row['comment_time']}\",
                \"likes\":\"{$row['likes']}\",\"is_like\":\"{$is_like}\"},";
        }


    }
    echo "]}";
}else{
    $msg = '还没有评论';
    $code = 1;
    $info = count($result,0);
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}



?>