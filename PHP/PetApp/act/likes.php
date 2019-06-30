<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 12:05 PM
 * brief: 点赞和取消点赞
 */
$request = array_merge($_POST, $_GET);
$mysqlName = 'Likes';
$likes_id = $request['likes_id'];
$data_id = $request['data_id'];
$login_id = $request['login_id'];
$type = $request['type'];//被点赞的类型
$like_time = date('Y-m-d h:i:s', time()); //当前时间

include_once("../LinkMySQL.php");
$msg = '';
$code = 0;
$info = '';

/*
 *  1、判断用户ID和要点赞的ID是否存在
 *  2、判断是否点赞
 *  3、点赞则取消点赞
 *  4、为点赞则点赞
 */

$sql = "select * from UserList where iphone = '$login_id'";
$is_user = database_query($sql);
$sql = "select * from DataList where id = '$data_id'";
$is_data = database_query($sql);


if (count($is_user, 0) > 0 && count($is_data, 0) > 0) { //两个都存在 进行点赞或取消操作
    $sql = "select * from {$mysqlName} where iphone = '$login_id' and be_like_id = '$data_id'";
    $is_like = database_query($sql);
    if(count($is_like,0) > 0){ //已经点赞 取消点赞
        $sql =  "select likes_id from {$mysqlName} where iphone = '$login_id' and be_like_id = '$data_id'";
        $like_id_ed = database_query($sql);
        $like_id_ed = $like_id_ed[0][0];  //已经存在的 ID 用于去掉点赞
        $sql = "delete from {$mysqlName} where likes_id = '$like_id_ed'";
        database_excute($sql);
        $sql =  "select likes_id from {$mysqlName} where likes_id = '$like_id_ed'";
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
            $sql = "select likes from DataList where id = '$data_id'";
            $like = database_query($sql);
            $like = $like[0][0] - 1;  //查询成功一次自加一次
            $sql = "update DataList set likes = '$like' where id = '$data_id'";
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
        $sql = "insert into {$mysqlName} (likes_id,iphone,be_like_id,type,likes_time)
                values('$likes_id','$login_id','$data_id','$type','$like_time')";
        database_excute($sql);
        $sql =  "select * from {$mysqlName}  where likes_id = '$likes_id'";
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
            $sql = "select likes from DataList where id = '$data_id'";
            $like = database_query($sql);
            $like = $like[0][0] + 1;  //查询成功一次自加一次
            $sql = "update DataList set likes = '$like' where id = '$data_id'";
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
    $msg = '操作失败';
    $code = 1;
    $info = '操作失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    //               \"likes_id\":\"$likes_id\",\"data_id\":\"$data_id\",\"user_id\":\"$user_id\",\"type\":\"$type\"
}


?>