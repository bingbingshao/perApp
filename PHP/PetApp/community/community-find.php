<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/21
 * Time: 5:49 PM
 * brief: 社区页面,发现
 */
$request = array_merge($_POST, $_GET);
$mysqlName = 'DataList';
$login_id = $request['login_id'];

include_once("../LinkMySQL.php");

//搜索数据不分类别,按时间和点赞次数排序 不显示没有图片的
$sql = "select id,type,dynamic_type,u.iphone as user_id,u.name as user_name,
        u.pic as user_pic,title,brief,image,video,txt,publish_time,likes
        from DataList d,UserList u
        where d.iphone = u.iphone and d.image != ''
        order by likes DESC ";

$result = database_query($sql);

$msg = '';
$code = 0;
$info = '';
$is_like = 0;



if(count($result,0) > 1){
    $msg = '获取成功';
    $code = 0;
    $info = count($result,0);  //数据长度
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"retData\":[";
    foreach($result as $row)
    {
        if($login_id  != ''){ //用户登录状态
            $sql = "select * from Likes where iphone = '$login_id' and be_Like_id = '{$row['id']}'";
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
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                \"user_id\":\"{$row['user_id']}\",\"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                \"video\":\"{$row['video']}\",\"txt\":\"{$row['txt']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"likes\":\"{$row['likes']}\",\"is_like\":\"{$is_like}\"}";
        }else{  //不是最后一个
            echo "{\"id\":\"{$row['id']}\",\"type\":\"{$row['type']}\",\"dynamic_type\":\"{$row['dynamic_type']}\",
                \"user_id\":\"{$row['user_id']}\",\"user_name\":\"{$row['user_name']}\",\"user_pic\":\"{$row['user_pic']}\",
                \"title\":\"{$row['title']}\",\"brief\":\"{$row['brief']}\",\"image\":\"{$row['image']}\",
                \"video\":\"{$row['video']}\",\"txt\":\"{$row['txt']}\",
                \"publish_time\":\"{$row['publish_time']}\",\"likes\":\"{$row['likes']}\",\"is_like\":\"{$is_like}\"},";
        }

    }
    echo "]}";
}else{
    $msg = '获取失败';
    $code = 1;
    $info = '获取失败';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>