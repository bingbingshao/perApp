<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 12:05 PM
 * brief: 评论和取消评论
 */
$request = array_merge($_POST, $_GET);
$mysqlName = 'Comments';
$comments_id = $request['comments_id'];
$data_id = $request['data_id'];
$login_id = $request['login_id'];
$type = $request['type'];//被评论的类型
$content = $request['content'];//评论的内容
$comments_time = date('Y-m-d h:i:s', time()); //当前时间

include_once("../LinkMySQL.php");
$msg = '';
$code = 0;
$info = '';

/*
 *  1、判断用户ID和要评论的数据的ID是否存在
 */

$sql = "select * from UserList where iphone = '$login_id'";
$is_user = database_query($sql);
$sql = "select * from DataList where id = '$data_id'";
$is_data = database_query($sql);


if (count($is_user, 0) > 0 && count($is_data, 0) > 0) { //两个都存在 进行评论或取消操作

    $sql = "select name,pic from UserList where iphone = '$login_id'";
    $result_user = database_query($sql);
    $user_name = $result_user[0][0];
    $user_pic = $result_user[0][1];

    $sql = "insert into {$mysqlName} (comment_id,user_id,user_name,user_pic,be_commend_id,comment_time,content)
            values('$comments_id','$login_id','$user_name','$user_pic','$data_id','$comments_time','$content')";
    database_excute($sql);
    $sql = "select * from {$mysqlName} where comment_id = '$comments_id'";
    $result = database_query($sql);
    if(count($result,0) > 0){  //评论成功
        //把DataList表中的评论数加1
        $sql = "select comments from DataList where id = '$data_id'";
        $comment = database_query($sql);
        $comments = $comment[0][0] + 1;  //查询成功一次自加一次
        $sql = "update DataList set comments = '$comments' where id = '$data_id'";
        database_excute($sql);

        $msg = '评论成功';
        $code = 0;
        $info = '评论成功';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }else{ //评论失败
        $msg = '评论失败';
        $code = 1;
        $info = '评论失败';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }

} else {
    $msg = '操作失败';
    $code = 200;
    $info = '操作失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>