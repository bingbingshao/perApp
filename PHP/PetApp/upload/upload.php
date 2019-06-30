<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/20
 * Time: 10:59 AM
 * brief: 上传图片
 */


$request = array_merge($_POST, $_GET);
$file = $request['file'];
$dir = $request['dir'];



// 获取图片后缀
$value = explode(".", $file);
$extension = strtolower(array_pop($value));


// 生成本地临时存储路径，并生成相应文件夹
$save_path = 'uploads/'.$dir.'/'.date('Y').'/'.date('md').'/';
$save_rule = md5(uniqid(mt_rand(), true));
if(!is_dir($save_path)){
    if(false === mkdir($save_path, 0700, true)){
        exit('创建文件夹失败');
    }
}
$save_image_file = $save_path.$save_rule.".$extension";


// 把图片存储到临时路径
file_put_contents($save_image_file, file_get_contents($file));

// 获取临时保存的图片的真实地址(绝对路径)
$realpath = realpath($save_image_file);

$msg = '上传成功';
$code = 0;
$info = '上传成功';
echo "{
               \"msg\":\"$msg\",\"code\":\"$code\",
               \"info\":\"$info\",\"url\":\"$realpath\"
  
        }";


?>