<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/5/18
 * Time: 发送验证码
 */

$request = array_merge($_POST, $_GET);

include_once("./code/lib/Ucpaas.class.php");
require_once('./code/serverSid.php');
include_once("../LinkMySQL.php");


$appid = "3703cd312de448c0ab36609e016bd58f";    //应用的ID，可在开发者控制台内的短信产品下查看
$templateid = "463796";    //可在后台短信产品→选择接入的应用→短信模板-模板ID，查看该模板ID
//$templateid = "471200";    //可在后台短信产品→选择接入的应用→短信模板-模板ID，查看该模板ID
$param = ''; //多个参数使用英文逗号隔开（如：param=“a,b,c”），如为参数则留空
$mobile = $request['iphone'];
$uid = $request['uid'];
$mobile = '15801824890';
$uid = '12de09ea1560056766083b1bc58ed6e3';


//获取随机数
$number = rand(10000, 99999);  //验证码
$time = 3; //有效时间3分钟
$arr = array($number, $time); //合并字符串
$param = implode(',', $arr);  //分割数组


//70字内（含70字）计一条，超过70字，按67字/条计费，超过长度短信平台将会自动分割为多条发送。分割后的多条短信将按照具体占用条数计费。
$result = $ucpass->SendSms($appid, $templateid, $param, $mobile, $uid);

$result = json_decode($result, true);  //把json格式的字符转化为————key,value类型的数组
$code = $result['code'];


$msg = '';
$code = 0;
$info = '';

//$code = '000000';
if ($code == '000000') {  //发送成功
    //把验证码写入数据库
    $gain_time = date('Y-m-d h:i:s', time()); //当前时间
    $mysqlName = "ModifyCode";


    $sql = "insert into {$mysqlName} (code_id,iphone,codes,gain_time) values('$uid','$mobile','$number','$gain_time')";

    database_excute($sql);
    //先不判断是否插入成功

    $msg = '验证码发送成功,请注意查收';
    $code = 0;
    $info = '';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"uid\":\"$uid\",\"mobile\":\"$mobile\"
              }";
} else {
    $msg = '验证码发送失败,请重新发送';
    $code = 1;
    $info = '';
    echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\"
              }";
}


?>