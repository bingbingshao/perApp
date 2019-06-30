<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/6/8
 * Time: 10:09 AM
 */

declare(strict_types = 1);
include 'upload1.php';
$config = [
    'host' => '192.168.0.148',
    'user' => 'ubuntu',
    'pass' => 'msb19940928'
];
$ftp = new Ftp($config);
$result = $ftp->connect();
if (!$result) {
    echo $ftp->get_error_msg();
}

$local_file = 'video3.mp4';
$remote_file = date('Y-m') . '/video3.mp4';

//上传文件
if ($ftp->upload($local_file, $remote_file)) {
    echo "上传成功";
} else {
    echo "上传失败";
}
//删除文件
if ($ftp->delete_file($remote_file)) {
    echo "删除成功";
} else {
    echo "删除失败";
}

//删除整个目录
$remote_path = '2018-09-19';
if ($ftp->delete_dir($remote_path)) {
    echo "目录删除成功";
} else {
    echo "目录删除失败";
}

//下载文件
$local_file2 = 'video5.mp4';
$remote_file2 = 'video3.mp4';
if ($ftp->download($local_file2, $remote_file2)) {
    echo "下载成功";
} else {
    echo "下载失败";
}

//移动文件|重命名文件
$local_file3 = 'video3.mp4';
$remote_file3 = 'shangchuan3/video3.mp4';
if ($ftp->remane($local_file3, $remote_file3)) {
    echo "移动成功";
} else {
    echo "移动失败";
}
$ftp->close();
//p($result);

function p($data = '')
{
    echo '<pre>';
    print_r($data);
    echo '</pre>';
}

?>