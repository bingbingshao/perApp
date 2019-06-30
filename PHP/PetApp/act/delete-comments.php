<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/20
 * Time: 13:35 PM
 * brief: 删除评论
 */

$request = array_merge($_POST, $_GET);
$Comments = 'Comments';
$DataList = 'DataList';
$Likes_comments = 'Likes_comments';
$comment_id = $request['comments_id'];
//$comment_id = '3b56-1558525391618-05170';

include_once("../LinkMySql.php");

$msg = '';
$code = 0;
$info = '';

$sql = "select * from {$Comments} where comment_id = '$comment_id'";

$result = database_query($sql);

if (count($result, 0) == 0) {   //数据库里面无该ID的数据
    $msg = '该数据不存在';
    $code = 0;
    $info = '该数据不存在';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
} else {  //数据库中有该数据

    //评论点赞
    $sql = "select likes_comments_id from {$Likes_comments} where be_likes_comments_id = '$comment_id'";
    $arrayLikesComment = database_query($sql);
    foreach ($arrayLikesComment as $row) {
        $sql = "delete from {$Likes_comments} where likes_comments_id = '{$row['likes_comments_id']}'";
        database_excute($sql);
    }

    $sql = "delete from {$Comments} where comment_id = '$comment_id'";
    database_excute($sql);

    $sql = "select * from {$Comments} where comment_id = '$comment_id'";
    $result = database_query($sql);
    if (count($result, 0) == 1) {
        $msg = '删除失败';
        $code = 1;
        $info = '删除失败';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    } else {

        //把DataList表中的评论数减1
        $sql = "select comments from {$DataList} where id = '$data_id'";
        $comment = database_query($sql);
        $comments = $comment[0][0] - 1;  //查询成功一次自加一次
        $sql = "update {$DataList} set comments = '$comments' where id = '$data_id'";
        database_excute($sql);


        $msg = '删除成功';
        $code = 0;
        $info = '删除成功';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }
}


?>