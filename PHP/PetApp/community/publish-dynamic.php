<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/20
 * Time: 10:37 AM
 * brief: 发布动态
 */

$request = array_merge($_POST, $_GET);
$mysqlName = 'DataList';
$type = 0;  //动态
$dynamic_type = $request['dynamic_type'];  //1:图文  2:视频
$id = $request['id'];
$iphone = $request['iphone'];
$brief = $request['brief'];
//$image = 'http://111.231.141.185/pet/image/pet-banner-5.jpgΩΩhttp://111.231.141.185/pet/image/pet-banner-1.jpgΩΩhttp://111.231.141.185/pet/image/pet-banner-7.jpgΩΩhttp://111.231.141.185/pet/image/pet-banner-1.jpgΩΩhttp://111.231.141.185/pet/image/pet-banner-7.jpg';//使用"ΩΩ"来作为图片的间隔用以分割数组
//$video = '';
$image = $request['image'];
//$image = 'http://111.231.141.185/pet/image/pet-banner-5.jpg';//使用"ΩΩ"来作为图片的间隔用以分割数组
$video = $request['video'];
$publish_time = date('Y-m-d h:i:s', time()); //当前时间

include_once("../LinkMySql.php");

$sql = "select * from {$mysqlName} where id = '$id'";

$result = database_query($sql);  //首先判断数据库里面是否已经发布过了

$msg = '';
$code = 0;
$info = '';


if(count($result,0) == 1) {   //数据库里面已经存在该ID的数据
    $msg = '重复发布';
    $code = 0;
    $info = '重复发布';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}else{  //数据库中没有该数据
    $sql = "insert into {$mysqlName} (id,type,dynamic_type,iphone,brief,image,video,publish_time)
        values('$id','$type',$dynamic_type,'$iphone','$brief','$image','$video','$publish_time')";

    database_excute($sql);

    $sql = "select * from {$mysqlName} where id = '$id'";

    $result = database_query($sql);

    if(count($result,0) == 1){
        $msg = '发布成功';
        $code = 0;
        $info = '发布成功';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }else{
        $msg = '发布失败';
        $code = 1;
        $info = '发布失败';
        echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
    }
}

?>