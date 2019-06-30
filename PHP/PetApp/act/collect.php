<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 12:05 PM
 * brief: 收藏和取消收藏
 */
$request = array_merge($_POST, $_GET);
$mysqlName = 'Collect';
$collect_id = $request['collect_id'];
$data_id = $request['data_id'];
$login_id = $request['login_id'];
$type = $request['type'];//被点赞的类型
$collect_time = date('Y-m-d h:i:s', time()); //当前时间

include_once("../LinkMySQL.php");
$msg = '';
$code = 0;
$info = '';

/*
 *  1、判断用户ID和要收藏的ID是否存在
 *  2、判断是否收藏
 *  3、收藏则取消收藏
 *  4、为收藏则收藏
 */

$sql = "select * from UserList where iphone = '$login_id'";
$is_user = database_query($sql);
$sql = "select * from DataList where id = '$data_id'";
$is_data = database_query($sql);


if (count($is_user, 0) > 0 && count($is_data, 0) > 0) { //两个都存在 进行收藏或取消操作
    $sql = "select * from {$mysqlName} where iphone = '$login_id' and be_collect_id = '$data_id'";
    $is_collect = database_query($sql);
    if(count($is_collect,0) > 0){ //已经收藏 取消收藏
        $sql =  "select collect_id from {$mysqlName} where iphone = '$login_id' and be_collect_id = '$data_id'";
        $collect_id_ed = database_query($sql);
        $collect_id_ed = $collect_id_ed[0][0];  //已经存在的 ID 用于去掉收藏
        $sql = "delete from {$mysqlName} where collect_id = '$collect_id_ed'";
        database_excute($sql);
        $sql =  "select collect_id from {$mysqlName} where collect_id = '$collect_id_ed'";
        $collect_id_ed = database_query($sql);
        if(count($collect_id_ed,0) == 0){ //删除收藏成功
            $msg = '删除收藏成功';
            $code = 0;
            $info = '删除收藏成功';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";

            //删除收藏成功 然后把该条数据的被收藏数 减1
            $sql = "select collect from DataList where id = '$data_id'";
            $collect = database_query($sql);
            $collect = $collect[0][0] - 1;  //查询成功一次自加一次
            $sql = "update DataList set collect = '$collect' where id = '$data_id'";
            database_excute($sql);

        }else{//删除收藏失败
            $msg = '删除收藏失败';
            $code = 1;
            $info = '删除收藏失败';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
        }

    }else{ //为收藏 添加收藏
        $sql = "insert into {$mysqlName} (collect_id,iphone,be_collect_id,type,collect_time)
                values('$collect_id','$login_id','$data_id','$type','$collect_time')";
        database_excute($sql);
        $sql =  "select collect_id from {$mysqlName} where collect_id = '$collect_id'";
        $collect_id_ed = database_query($sql);
        if(count($collect_id_ed,0) > 0){ //添加收藏成功
            $msg = '添加收藏成功';
            $code = 0;
            $info = '添加收藏成功';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";

            //添加收藏成功 然后把该条数据的被收藏数 +1
            $sql = "select collect from DataList where id = '$data_id'";
            $collect = database_query($sql);
            $collect = $collect[0][0] + 1;  //查询成功一次自加一次
            $sql = "update DataList set collect = '$collect' where id = '$data_id'";
            database_excute($sql);

        }else{//添加收藏失败
            $msg = '添加收藏失败';
            $code = 1;
            $info = '添加收藏失败';
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
}


?>