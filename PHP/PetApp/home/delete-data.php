<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/20
 * Time: 13:35 PM
 * brief: 删除文章、视频、动态
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'DataList';
$Likes = 'Likes';
$Collect = 'Collect';
$Comments = 'Comments';
$Likes_comments = 'Likes_comments';
$data_id = $request['data_id'];

include_once("../LinkMySql.php");

$msg = '';
$code = 0;
$info = '';


/*
 *   1、查询数据是否存在
 *   2、删除数据对应的所有的点赞,评论,收藏,评论点赞的数据
 *   3、删除数据
 *   4、查看删除是否成功
 */

//1、查询数据是否存在
$sql = "select * from {$mysqlName} where id = '$data_id'";

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

    //2、删除数据对应的所有的点赞,评论,收藏,评论点赞的数据
    //  点赞
    $sql = "select likes_id from {$Likes} where be_like_id = '$data_id'";
    $arrayLikes = database_query($sql);

    foreach($arrayLikes as $row){
        $sql = "delete from {$Likes} where likes_id = '{$row['likes_id']}'";
        database_excute($sql);
    }

    //  收藏
    $sql = "select collect_id from {$Collect} where be_collect_id = '$data_id'";
    $arrayCollect = database_query($sql);
    foreach($arrayCollect as $row){
        $sql = "delete from {$Collect} where collect_id = '{$row['collect_id']}'";
        database_excute($sql);
    }
//    //  评论
    $sql = "select comment_id from {$Comments} where be_commend_id ='$data_id'";
    $arrayComments = database_query($sql);
    foreach($arrayComments as $row){
        //评论点赞
        $sql = "select likes_comments_id from {$Likes_comments} where be_likes_comments_id = '{$row['comment_id']}'";
        $arrayLikesComment = database_query($sql);
        foreach($arrayLikesComment as $row){
            $sql = "delete from {$Likes_comments} where likes_comments_id = '{$row['likes_comments_id']}'";
            database_excute($sql);
        }
        $sql = "delete from {$Comments} where comment_id = '{$row['comment_id']}'";
        database_excute($sql);
    }
    //3、删除数据
    $sql = "delete from {$mysqlName} where id = '$data_id'";
    database_excute($sql);
    //4、查看删除是否成功
    $sql = "select * from {$mysqlName} where id = '$data_id'";
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