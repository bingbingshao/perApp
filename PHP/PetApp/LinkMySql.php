<?php
/**
 * Created by PhpStorm.
 * User: bingPo
 * Date: 2019/4/14
 * Time: 3:43 PM
 * brief: 连接数据库
 */

$mysql_server_name = "127.0.0.1:8889";
$mysql_username = "root";
$mysql_password = "root";
$mysql_database = "PrtApp";

function database_excute($sql)
{
    global $mysql_server_name, $mysql_username, $mysql_password, $mysql_database;
    $con = @mysqli_connect($mysql_server_name, $mysql_username, $mysql_password) or die("die1_1");
    mysqli_query("SET NAMES 'utf8'", $con);
    mysqli_select_db($con, $mysql_database);
    $query = @mysqli_query($con, $sql) ;
    mysqli_close($con);
}

function database_query($sql)
{
    $rs = array();
    global $mysql_server_name, $mysql_username, $mysql_password, $mysql_database;
    $con = @mysqli_connect($mysql_server_name, $mysql_username, $mysql_password) or die("die2_1");
    mysqli_select_db($con, $mysql_database);
    $query = @mysqli_query($con, $sql) ;
    $i = 0;
    while ($row = $query->fetch_array()) {
        $rs[$i++] = $row;
    }
    mysqli_close($con);
    return $rs;
}

function database_query_one($sql)
{
    global $mysql_server_name, $mysql_username, $mysql_password, $mysql_database;
    $con = @mysqli_connect($mysql_server_name, $mysql_username, $mysql_password);
    mysqli_select_db($con, $mysql_database);
    $query = @mysqli_query($con, $sql) or die("died3_2");
    while ($row = $query->fetch_array()) {
        $one = $row;
        break;
    }
    mysqli_close($con);
    return $one;
}

function database_query_two($sql)
{
    global $mysql_server_name, $mysql_username, $mysql_password, $mysql_database;
    $con = @mysqli_connect($mysql_server_name, $mysql_username, $mysql_password) or die("die4_1");
    mysqli_select_db($con, $mysql_database);
    $query = @mysqli_query($con, $sql) or die("died4_2");
    mysqli_close($con);
    return $query;
}

?>