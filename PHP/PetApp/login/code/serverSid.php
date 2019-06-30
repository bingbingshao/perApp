<?php
//载入ucpass类
require_once('lib/Ucpaas.class.php');

//初始化必填
//填写在开发者控制台首页上的Account Sid
$options['accountsid']='a3fd3d6d49eed1f3a4b39b3b05cf89be';
//填写在开发者控制台首页上的Auth Token
$options['token']='aba6f7af3d8bd8f11880a02e2e4ef42e';

//初始化 $options必填
$ucpass = new Ucpaas($options);