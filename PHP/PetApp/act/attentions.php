<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 12:05 PM
 * brief: 关注和取消关注
 */
$request = array_merge($_POST, $_GET);
$mysqlName = 'UserAttention';
$attention_id = $request['attention_id'];
$iphone_1 = $request['login_id'];  //关注的人的ID
$iphone_2 = $request['user_id'];  //被关注人的ID
$attention_time = date('Y-m-d h:i:s', time()); //当前时间

include_once("../LinkMySQL.php");
$msg = '';
$code = 0;
$info = '';
$sql = '';

/*
 *  1、判断两个用户ID是否相同
 *  2、判断这两个ID是否存在
 *  3、查询是否已经存在
 *  4、是取关,否添加关注
 *  5、查询关注是否成功
 */

$sql = "select * from UserList where iphone = '$iphone_1'";
$is_iphone_1 = database_query($sql);
$sql = "select * from UserList where iphone = '$iphone_2'";
$is_iphone_2 = database_query($sql);


if ($iphone_1 != $iphone_2 && count($is_iphone_1,0) > 0 && count($is_iphone_2,0) > 0) { //两个ID不相同 且都存在

    $sql = "select attention_id from {$mysqlName} where iphone_1 = '$iphone_1' and iphone_2 = '$iphone_2'";
    $attention_id_ed = database_query($sql);
    $attention_id_ed = $attention_id_ed[0][0];
    if(count($attention_id_ed,0) > 0){  //已关注
        $sql = "delete from {$mysqlName} where attention_id = '$attention_id_ed'";
        database_excute($sql);
        $sql =  "select * from {$mysqlName} where attention_id = '$attention_id'";
        $attention_ed = database_query($sql);
        if(count($attention_ed,0) == 0){ //取关成功
            $msg = '取关成功';
            $code = 0;
            $info = '取关成功';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";

        }else{//关注失败
            $msg = '取关失败';
            $code = 1;
            $info = '取关失败';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
        }
    }else{  //未关注
        $sql = "insert into {$mysqlName} (attention_id,iphone_1,iphone_2,attention_time)
            values('$attention_id','$iphone_1','$iphone_2','$attention_time')";
        database_excute($sql);
        $sql =  "select * from {$mysqlName} where attention_id = '$attention_id'";
        $attention_ed = database_query($sql);
        if(count($attention_ed,0) > 0){ //关注成功
            $msg = '关注成功';
            $code = 0;
            $info = '关注成功';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";

        }else{//关注失败
            $msg = '关注失败';
            $code = 1;
            $info = '关注失败';
            echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
        }
    }

} else {//两个ID相同
    $msg = '操作失败';
    $code = 1;
    $info = '操作失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>