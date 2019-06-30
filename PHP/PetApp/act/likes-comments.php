<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 12:05 PM
 * brief: 点赞和取消点赞  (评论)
 */
$request = array_merge($_POST, $_GET);
$mysqlName = 'Likes_comments';
$likes_comments_id = $request['likes_comments_id'];
$comment_id = $request['comment_id'];
$user_id = $request['login_id'];
$like_time = date('Y-m-d h:i:s', time()); //当前时间

include_once("../LinkMySQL.php");
$msg = '';
$code = 0;
$info = '';

/*
 *  1、判断用户ID和要点赞的数据ID是否存在
 *  2、判断是否点赞
 *  3、点赞则取消点赞
 *  4、为点赞则点赞
 */

$sql = "select * from UserList where iphone = '$user_id'";
$is_user = database_query($sql);
$sql = "select * from Comments where comment_id = '$comment_id'";
$is_data = database_query($sql);


if (count($is_user, 0) > 0 && count($is_data, 0) > 0) { //两个都存在 进行点赞或取消操作
    $sql = "select * from {$mysqlName} where iphone = '$user_id' and be_likes_comments_id = '$comment_id'";
    $is_like = database_query($sql);
    if(count($is_like,0) > 0){ //已经点赞 取消点赞
        $sql =  "select likes_comments_id from {$mysqlName} where iphone = '$user_id'and be_likes_comments_id = '$comment_id'";
        $like_id_ed = database_query($sql);
        $like_id_ed = $like_id_ed[0][0];  //已经存在的 ID 用于去掉点赞
        $sql = "delete from {$mysqlName} where likes_comments_id = '$like_id_ed'";
        database_excute($sql);
        $sql =  "select * from {$mysqlName} where likes_comments_id = '$like_id_ed'";
        $like_id_ed = database_query($sql);
        if(count($like_id_ed,0) == 0){ //删除点赞成功
            $msg = '删除点赞成功';
            $code = 0;
            $info = '删除点赞成功';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";

            //删除点赞成功 然后把该条数据的被点赞数 减1
            $sql = "select likes from Comments where comment_id = '$comment_id'";
            $like = database_query($sql);
            $like = $like[0][0] - 1;  //查询成功一次自减一次
            $sql = "update Comments set likes = '$like' where comment_id = '$comment_id'";
            database_excute($sql);

        }else{//删除点赞失败
            $msg = '删除点赞失败';
            $code = 1;
            $info = '删除点赞失败';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
        }

    }else{ //为点赞 添加点赞
        $sql = "insert into {$mysqlName} (likes_comments_id,iphone,be_likes_comments_id,likes_comments_time)
                values('$likes_comments_id','$user_id','$comment_id','$like_time')";
        database_excute($sql);
        $sql =  "select * from {$mysqlName} where likes_comments_id = '$likes_comments_id'";
        $like_id_ed = database_query($sql);
        if(count($like_id_ed,0) > 0){ //添加点赞成功
            $msg = '添加点赞成功';
            $code = 0;
            $info = '添加点赞成功';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";

            //添加点赞成功 然后把该条数据的被点赞数 +1
            $sql = "select likes from Comments where comment_id = '$comment_id'";
            $like = database_query($sql);
            $like = $like[0][0] + 1;  //查询成功一次自加一次
            $sql = "update Comments set likes = '$like' where comment_id = '$comment_id'";
            database_excute($sql);

        }else{//添加点赞失败
            $msg = '添加点赞失败';
            $code = 1;
            $info = '添加点赞失败';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
        }
    }

} else {
    $msg = '操作失败,请过会再试';
    $code = 1;
    $info = '操作失败,请过会再试';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>