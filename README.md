#PerApp
### 0.介绍

> 写在文前：
>
> 该项目是一个新手，断断续续通过两个月的时间在工作闲暇之余做的。比较垃圾的一个练手项目。
>
> 若有大神不小心看到请随便批评与指正(本人属小强、抗击打能力贼强。)

> 这是一个应届生的毕业设计(比较水)。其中包含移动端(主要适配的iOS，Android后期没有处理)。
>
> 主要可以浏览动态，发布动态等吧。

### 1.环境配置

> 基础的ReactNative环境，可取官网配置https://reactnative.cn/
>
> 下载完项目后，在根目录npm 一下就好。
>
> 若有报错内容都可询问度娘，基本都有解答。

### 2.简单页面介绍

> 下面贴上几张图就不一一介绍了

<div alig="center" style="display:flex;flex-wrap: wrap;">
  <img src="./image/1.png" width = "200" height = "406" alt="图片名称" align=center />
   <img src="./image/2.png" width = "200" height = "406" alt="图片名称" align=center />
   <img src="./image/3.png" width = "200" height = "406" alt="图片名称" align=center />
  <img src="./image/4.png" width = "200" height = "406" alt="图片名称" align=center />
   <img src="./image/5.png" width = "200" height = "406" alt="图片名称" align=center />
   <img src="./image/6.png" width = "200" height = "406" alt="图片名称" align=center />
   <img src="./image/7.png" width = "200" height = "406" alt="图片名称" align=center />
</div>

### 3.ReactNative添加组件

#### 3.1 react-native-picker

> 时间地址选择器
>
> 支持省市级的选择，已经日期选择和时分秒的选择

1.添加

~~~bash
npm install react-native-picker --save
yarn add react-native-picker
~~~

2.link

~~~bash 
react-native link react-native-picker
~~~

3.使用

~~~bash
import Picker from 'react-native-picker';
~~~

#### 3.2 react-navigation

> 页面导航跳转

1.添加

```bash
npm install react-navigation --save
yarn add react-navigation
```

2.link

```bash 
react-native link react-navigation
```

3.使用

```bash
import {createStackNavigator, createBottomTabNavigator, TabBarBottom} from 'react-navigation';
```

#### 3.3 react-native-vector-icons

> 页面导航跳转

1.添加

```bash
npm install react-native-vector-icons --save
yarn add react-native-vector-icons
```

2.link

```bash 
react-native link react-native-vector-icons
```

3.使用

```bash
import Icon from 'react-native-vector-icons/FontAwesome';
```

####  3.4 react-native-input-scroll-view

> 键盘遮挡问题

1.添加

```bash
npm install react-native-input-scroll-view --save
yarn add react-native-input-scroll-view
```

2.link

```bash 
react-native link react-native-input-scroll-view
```

3.使用

```bash
import InputScrollView from 'react-native-input-scroll-view';
```

####  3.5 react-native-timer-countdown

> 时间计时器

1.添加

```bash
npm install react-native-timer-countdown --save
yarn add react-native-timer-countdown
```

2.link

```bash 
react-native link react-native-timer-countdown
```

3.使用

```bash
import TimerCountdown from 'react-native-timer-countdown';

//内容更改--返回数据更改
  this.getFormattedTime = (milliseconds) => {
            if (this.props.formatSecondsRemaining) {
                return this.props.formatSecondsRemaining(milliseconds);
            }
            const remainingSec = Math.round(milliseconds / 1000);
            const seconds = parseInt((remainingSec % 60).toString(), 10);
            const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
            const hours = parseInt((remainingSec / 3600).toString(), 10);
            let s = seconds < 10 ? '0' + seconds : seconds;
            let m = minutes < 10 ? '0' + minutes : minutes;
            let h = hours < 10 ? '0' + hours : hours;
            h = h === '00' ? '' : h + ':';
            m = m === '00' ? '' : m + ':';
            if (h == '' && m == '') {
                return s + "s";
            }
            return h + m + s;
        };
```

#### 3.6 react-native-http-cache

> 清除缓存

1.添加

```bash
npm install react-native-http-cache --save
yarn add react-native-http-cache
```

2.link

```bash 
react-native link react-native-http-cache
```

3.使用

```bash
import * as CacheManager from 'react-native-http-cache';

CacheManager.getCacheSize()    返回网络缓存大小和图片缓存大小

CacheManager.getImageCacheSize()    返回的是一个 promise 对象

CacheManager.getHttpCacheSize()    返回的是一个 promise 对象

CacheManager.clearImageCache()    返回的是一个 promise 对象

CacheManager.clearHttpCache()    返回的是一个 promise 对象

CacheManager.clearCache()     清除缓存


#if __has_include(<React/RCTHttpCache.h>)
#import <React/RCTHttpCache.h>
#else
#import "RCTHttpCache.h"
#endif
#if __has_include(<React/RCTImageLoader.h>)
#import <React/RCTImageLoader.h>
#else
#import "RCTImageLoader.h"
#endif
#if __has_include(<RCTImage/RCTImageCache.h>)
#import <RCTImage/RCTImageCache.h>
#else
#import "RCTImageCache.h"
#endif
#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#else
#import "RCTBridge.h"
#endif
```

#### 3.7 react-native-snap-carousel

> 轮播图

1.添加

```bash
npm install react-native-snap-carousel --save
yarn add react-native-snap-carousel
```

2.link

```bash 
react-native link react-native-snap-carousel
```

3.使用

~~~bash
import Carousel from 'react-native-snap-carousel';

export class MyCarousel extends Component {

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }
    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
        );
    }
}
~~~

#### 3.8 react-native-swiper

> 轮播图

1.添加

```bash
npm install react-native-swiper --save
yarn add react-native-swiper
```

2.link

```bash 
react-native link react-native-swiper
```

3.使用

```bash

```

#### 3.9 react-native-linear-gradient

> 颜色渐变

1.添加

```bash
npm install react-native-linear-gradient --save
yarn add react-native-linear-gradient
```

2.link

```bash 
react-native link react-native-linear-gradient
```

3.使用

~~~bash
import LinearGradient from 'react-native-linear-gradient';

<LinearGradient
    start={{x: 0.25, y: 0.25}} 
    end={{x: 0.75, y: 0.75}}
    colors={['red', 'green', 'black']}
    style={{height: 150, flex: 1}}>
</LinearGradient>
~~~

#### 3.10 react-native-timer-countdown

> 倒计时

1.添加

```bash
npm install react-native-timer-countdown --save
yarn add react-native-timer-countdown
```

2.link

```bash 
react-native link react-native-timer-countdown
```

3.使用

```bash
import TimerCountdown from 'react-native-timer-countdown';

<TimerCountdown
     style={[Style.font_1, Style.color_1,]}
     initialSecondsRemaining={1000 * Global.getTime.phone_time}    //倒计时的剩余时间(ms)
     interval={1000}    //计时器时间间隔(ms)
     //allowFontScaling={true}   //字体缩放
     //onTick={secondsRemaining => console.log("secondsRemaining", secondsRemaining)}  //调用每个刻度的函数。它返回剩余的秒数。
     onTimeElapsed={()=>this.get_verify()}   //倒计时完成时调用的函数
      //formatSecondsRemaining={() => console.log('complete')}   //格式化剩余时间
 />
```

#### 3.11 react-native-image-zoom-viewer

> 图片展示

1.添加

```bash
npm install react-native-image-zoom-viewer --save
yarn add react-native-image-zoom-viewer
```

2.link

```bash 
react-native link react-native-image-zoom-viewer
```

3.使用

```bash
import ImageViewer from 'react-native-image-zoom-viewer';

<ImageViewer
        imageUrls={this.state.images} // 照片路径
        enableImageZoom={true} // 是否开启手势缩放
        index={this.state.imageIndex} // 初始显示第几张
        failImageSource={"aaa"} // 加载失败图片
        onChange={(index) => {}} // 图片切换时触发
        onClick={() => { // 图片单击事件
        	this.props.navigation.goBack();
        }}
 />
```

#### 3.12 react-native-video

> 视频播放

1.添加

```bash
npm install react-native-video --save
yarn add react-native-video
```

2.link

```bash 
react-native link react-native-video
```

3.使用

```bash
import Video from 'react-native-video';

onLoad = (data) => {
	this.setState({duration: data.duration});
}
onProgress = (data) => {
	this.setState({currentTime: data.currentTime});
}
onEnd = () => {
	this.setState({paused: true});
	this.player.seek(0);
}
onError = () => {
	this.setState({paused: true});
}
onBuffer = ({isBuffering}: { isBuffering: boolean }) => {
	this.setState({isBuffering});
}

<Video
    ref={(ref) => {
    this.player = ref
    }}
    style={styles.videoBox}
    source={{uri: 'http://111.231.141.185/pet/videos/birdie.mp4'}}
    paused={this.state.paused}//暂停
    rate={1}//播放速度
    volume={1}//音量
    muted={false}//是否静音
    repeat={true}//确定在到达结尾时是否重复播放视频
    controls={true}//视频打开 是否显示控制
    playInBackground={false}//后台是否继续播放
    resizeMode={'contain'}//视频屏幕适配
    //ignoreSilentSwitch={'inherit'}//控制iOS静默开关行为
    allowsExternalPlayback={false}//指示播放器是否允许切换到AirPlay或HDMI等外部播放模式
    onLoad={this.onLoad}//加载
    onProgress={this.onProgress}//视频每帧的回调
    onBuffer={this.onBuffer}//远程视频缓存时的回调
    onEnd={this.onEnd}//播放结束
    onError={this.onError}// 当视频不能加载，或出错后的回调函数
/>
```

#### 3.13 打开本地远程文件文件

~~~bash
npm i react-native-doc-viewer --save
react-native link react-native-doc-viewer
~~~

#### 3.14 teaset

~~~basic
npm i teaset
import { Theme, Toast } from 'teaset';  //等
~~~

#### 3.14 二维码

```basic
npm install react-native-svg --save
react-native link react-native-svg
npm install react-native-qrcode-svg --save


   <QRCode
    value="这是一个测试二维码..."
logo={logoImg}  //中心图片
    logoBorderRadius={1}
    color={'#191919'}
      backgroundColor={'#ffffff'}
        logoSize={30}
        size={150}
        />

```



### 4.数据库

> 创建数据库

~~~mysql
CREATE DATABASE PrtApp;
~~~

#### 4.1首页轮播图(Banner)

> **表结构**
>
> 唯一编号	id	char(24)	主键
>
> 图片地址	url	varchar(100)
>
> 图片链接	link	varchar(100)
>
> 描述		brief	varchar(100)

~~~mysql
create table Banner
(
		id char(24) not null primary key,
    url varchar(100) not null,
    link varchar(100),
    brief varchar(100)
);
insert into Banner values ('1202-1528457643586-00003','http://111.231.141.185/pet/image/pet-banner-3.jpg','','首页轮播');
insert into Banner values ('1202-1528457643586-00004','http://111.231.141.185/pet/image/pet-banner-4.jpg','','首页轮播');
~~~

#### 4.2用户表(UserList)

> **表结构**
>
> 手机号		iphone	char(11)   主键
>
> 用户名		   name	   varchar(30)
>
> 密码 			password	varchar(50)  必填项
>
> 头像			pic		varchar(50)
>
> 性别		      gender	    int 	// 默认 0 ；男：1；女：2；
>
> 出生年月		birth		date	
>
> 所在地		  address		varchar(50)
>
> 格言			motto 		varchar(200)   
>
> 注册时间		register_time		datetime
>
> 微信号		wechat	char(24)
>
> qq			qq		int
>
> 微博			weibo	char(24)

> sql语句

~~~mysql
create table UserList
(
  	iphone	char(11) not null primary key,
    name varchar(20) not null,
    password varchar(20),
    pic varchar(100),
  	gender	int default 0,
  	birth		date,
  	motto		varchar(200),
  	address		varchar(50),
  	register_time		datetime,
  	wechat	char(24),
  	qq	int,
  	weibo	char(24)
);

少了一个存放 用户聊天的ID
~~~

#### 4.3用户之间关注表(UserAttention)

> **表结构**
>
> 关注编号	attention_id	char(24)	主键
>
> 关注用户	att_user_id_1	char(11)	外键(iphone)
>
> 被关注用户	att_user_id_2	char(11)	外键(iphone)
>
> 关注时间	attention_time	datetime 

>sql语句

~~~mysql
create table UserAttention
(
		attention_id char(24) not null primary key,
    iphone_1 char(11),
    iphone_2 char(11),
  	attention_time	datetime,
  	constraint fk_u_id_1 foreign key(iphone_1) references UserList(iphone),
  	constraint fk_u_id_2 foreign key(iphone_2) references UserList(iphone)
);
~~~

2.4动态列表(Dynamic)

> 动态分为视频动态和图文动态

>**表结构**
>
>动态编号	dynamic_id	char(24)	主键
>
>动态类型	dynamic_type	int 	0：普通类型(有图片或者无图片)；1：含视频的动态
>
>发布人	   iphone	 char(11)	外键(iphone)
>
>类型		type		int		//0:dynamic;1:article;2:video;	***默认 0***
>
>发布时间	publish_time	datetime	
>
>文本内容	publish_text	varchar(2000)	//最大值
>
>图片		image 	varchar(2000)	//如果是好几张照片的话用特殊符号分割
>
>视频		video 	varchar(200)	//图片和视频相互冲突
>
>阅读次数	reading 	int     默认0
>
>点赞次数	likes	int	默认0
>
>收藏次数	collect	int	默认0
>
>评论次数	comments	int 	默认0

>sql语句

~~~mysql
create table Dynamic
(
		dynamic_id char(24) not null primary key,
    iphone char(11),
  	dynamic_type	int default 0,
  	type int default 0,
  	publish_time	datetime,
  	publish_text	varchar(2000),
  	image	varchar(2000),
  	video	varchar(100),
  	reading	int 	default	0,
  	likes	int 	default 0,
  	collect	int default 0,
  	comments		int		default 0,
  	constraint fk_D_id_1 foreign key(iphone) references UserList(iphone)
);

insert into Article (dynamic_id,user_id,dynamic_type,publish_time,publish_text,image,video)
values('1202-1528457643586-10001','',0,'测试','希望查重一次过','','');
~~~

2.5发布的文章列表(Article)

> **表结构**
>
> 文章编号	artice_id   char(24)	主键
>
> 文章标题	title	 varchar(100)	
>
> 发布人	   user_id	 int	外键(user_id)
>
> 类型		type		int		//0:dynamic;1:article;2:video;***默认 1***
>
> 发布时间	publish_time	datetime	
>
> 文章简介	brief	varchar(500)
>
> 文章展示图片 image	varchar(100)  //存放网址
>
> 文章内容	txt	varchar(100)  //存放网址
>
> 阅读次数	read 	int     默认0
>
> 点赞次数	like	int	默认0
>
> 收藏次数	collect	int	默认0
>
> 评论次数	comment	int 	默认0

> sql

~~~mysql
create table Article
(
		article_id char(24) not null primary key,
    iphone char(11),
  	type int default 1,
  	title varchar(50) not null,
  	brief		varchar(200),
  	publish_time	datetime,
  	image	varchar(200),
  	txt varchar(200) not null,
  	reading	int 	default	0,
  	likes	int 	default 0,
  	collect	int default 0,
  	comments		int		default 0,
  	constraint fk_A_id_1 foreign key(iphone) references UserList(iphone)
);
//添加一列
alter table Article add column txt varchar(200) not null;

insert into Article (article_id,user_id,title,brief,publish_time,image,txt)
values('1202-1528457643586-10001','','测试','希望查重一次过','','','');

//备注 当每次调用这个方法的时候，都要自加一次reading
select reading from Article where article_id = '1202-1528457643586-10001';
update Article set reading = 
~~~

2.6发布的视频列表(Video)

> **表结构**
>
> 动态编号	video_id	char(24)	主键
>
> 视频标题	title	varchar(100)
>
> 发布人	   user_id	 int	外键(user_id)
>
> 类型		type		int		//0:dynamic;1:article;2:video;***默认 2***
>
> 发布时间	publish_time	datetime	
>
> 视频简介	brief	varchar(2000)	//最大值
>
> 视频展示图片 image 	varchar(100)
>
> 视频		video 	varchar(200)	
>
> 阅读次数	reading 	int     默认0
>
> 点赞次数	likes	int	默认0
>
> 收藏次数	collect	int	默认0
>
> 评论次数	comments	int 	默认0

~~~mysql
create table Video
(
		video_id char(24) not null primary key,
    iphone char(11),
  	type int default 2,
  	title varchar(50) not null,
  	brief		varchar(200),
  	publish_time	datetime,
  	image	varchar(200),
  	video varchar(200),
  	reading	int 	default	0,
  	likes	int 	default 0,
  	collect	int default 0,
  	comments		int		default 0,
  	constraint fk_V_id_1 foreign key(iphone) references UserList(iphone)
);

insert into Video (video_id,user_id,title,brief,publish_time,image,video)
values('1202-1528457643586-10001','','测试','希望查重一次过','','','');
~~~

#### 4.4\5\6 动态、视频、文章的列表(DataList)

> 三种放在一起，未用到的放空值

> **表结构**
>
> 编号	id	char(24)	主键
>
> 类型		type		int		//0:dynamic;    1:article;    2:video;***默认 0***
>
> 动态类型     dynamic_id	int 		//真对动态中的视频和图片
>
> 发布人	   iphone	 cahr(11)	外键(iphone)
>
> 标题	title	varchar(100)
>
> 简介	brief	varchar(2000)	//最大值
>
> 图片 	image 	varchar(2000)
>
> 视频		video 	varchar(200)	
>
> 文本		txt 	varchar(200)
>
> 发布时间	publish_time	datetime	
>
> 阅读次数	reading 	int     默认0
>
> 点赞次数	likes	int	默认0
>
> 收藏次数	collect	int	默认0
>
> 评论次数	comments	int 	默认0

```mysql 
create table DataList
(
		id char(24) not null primary key,
  	type int default 0,
  	dynamic_type int default 0,
    iphone char(11),
  	title varchar(50),
  	brief		varchar(200),
  	image	varchar(2000),
  	video varchar(200),
  	txt varchar(200),
  	publish_time	datetime,
  	reading	int 	default	0,
  	likes	int 	default 0,
  	collect	int default 0,
  	comments		int		default 0,
  	constraint fk_DataList_id_1 foreign key(iphone) references UserList(iphone)
);

insert into Video (video_id,user_id,title,brief,publish_time,image,video)
values('1202-1528457643586-10001','','测试','希望查重一次过','','','');


```

#### 4.7评论列表(Comments)

> 文章 视频 动态 的格式都是这样的

>**表结构**
>
>评论的唯一编号	comment_id	cahr(24)	主键
>
>评论的对象id		be_commend_id	cahr(24)	外键  (包括：动态，文章，视频)
>
>发表评论的用户ID	 user_id		char(11)	外键
>
>发表评论的用户名	user_name	varchar(20)
>
>发表评论的用户的头像 	user_pic 	varchar(100) 
>
>评论发布时间		comment_time	datetime
>
>评论内容		    content	varchar(500)	
>
>评论点赞		likes	int 	默认0

~~~mysql
create table Comments
(
  	comment_id 		char(24)	not null primary key,
  	user_id char(11),
  	user_name varchar(20),
  	user_pic varchar(100),
  	be_commend_id		char(24),
  	comment_time	datetime,
  	content	varchar(500),
  	likes 	int  	default 0,
  	constraint fk_C_id_1 foreign key(be_commend_id) references DataList(id),
  	constraint fk_C_id_4 foreign key(user_id) references UserList(iphone)
)

~~~

#### 4.8用户收藏列表(Collect)

> 用户的收藏数据表(动态、文章、视频)

> **表结构**
>
> 收藏编号	collect_id	char(24)	 主键
>
> 收藏的用户	iphone	char(11) 	外键
>
> 被收藏的对象	be_collect_id	char(24)	外键
>
> 收藏的类型	type 	int	/////0：dynamic；1：article；2：video
>
> 收藏时间	collect_time 	datetime

~~~mysql
create table Collect
(
		collect_id	char(24)	not null primary key,
  	iphone			char(11),
  	be_collect_id	char(24),
  	type	int default 0,
  	collect_time datetime,
  	constraint fk_Co_id_1 foreign key(be_collect_id) references DataList(id),
  	constraint fk_Co_id_4 foreign key(iphone) references UserList(iphone)
)
~~~

#### 4.9 用户点赞列表(Likes)

> 用户的点赞数据表(动态、文章、视频)

> **表结构**
>
> 点赞编号	likes_id	char(24)	 主键
>
> 点赞的用户	iphone	char(11) 	外键
>
> 被点赞的对象	be_collect_id	char(24)	外键
>
> 点赞的类型	type 	int	/////0：dynamic；1：article；2：video
>
> 点赞时间	collect_time 	datetime

```mysql
create table Likes
(
		likes_id	char(24)	not null primary key,
  	iphone			char(11),
  	be_Like_id	char(24),
  	type	int default 0,
  	likes_time datetime,
  	constraint fk_Li_id_1 foreign key(be_Like_id) references DataList(id),
  	constraint fk_Li_id_4 foreign key(iphone) references UserList(iphone)
)
```

#### 4.10 用户评论点赞列表(Likes_comments)

> 用户的点赞数据表(动态、文章、视频)

> **表结构**
>
> 点赞编号	Likes_comments_id	char(24)	 主键
>
> 点赞的用户	iphone	char(11) 	外键
>
> 被点赞的对象	be_likes_comments_id	char(24)	外键
>
> 点赞时间	likes_comments_time 	datetime

```mysql
create table Likes_comments
(
		likes_comments_id	char(24)	not null primary key,
  	iphone			char(11),
  	be_likes_comments_id	char(24),
  	likes_comments_time datetime,
  	constraint fk_Li_Co_id_1 foreign key(be_likes_comments_id) references Comments(comment_id),
  	constraint fk_Li_Co_id_2 foreign key(iphone) references UserList(iphone)
)
```

#### 4.11 用户注册存储验证码列表(ModifyCode)

> 存储用户获取验证码的时间，用于判断验证码是否过期，以及判断验证码是否正确

> 编号  	code_id 	char(24)   验证码唯一编号
>
> 手机号	iphone	char(11)	
>
> 验证码	codes 	int
>
> 时间	gain_time	time	

~~~mysql
create table ModifyCode
(
		code_id	char(32)	not null primary key,
  	iphone			char(11),
  	codes	 int,
  	gain_time	time
)
~~~



### 5.所需接口(API)

#### #5.1 首页轮播图(banner) 

> 数据格式
>
> 请求类型 GET
>
> ***所需数据库  :***	Banner

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		id:'',//图片的ID
    		url:'',//图片地址
    		link:'',//图片跳转链接
    ]
  }
}
~~~

#### #5.2 首页精品文章(home-article)

> 数据格式
>
> 请求类型 GET
>
> 限制传参在3-5个
>
> ***所需数据库  :***	Article

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		article_id:'',//文章ID
    		title:'',//文章的标题
    		brief:'',//文章的简介
    		image:'',//展示图片
    		publish_time:'',//文章发布时间S
    		likes:0,//文章点赞次数
    ],
    .
    .
    .
  }
}
~~~

> sql
>
> 按点赞排序 获取五条数据

~~~mysql
select article_id,title,brief,image,publish_time,likes
from Article 
order by likes desc
limit 5;
~~~



#### #5.3 首页热门动态(home-dynamic)

> 数据格式
>
> 请求类型 GET
>
> 限制传参在3-5个
>
> ***所需数据库  :***	Dynamic

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		dynamc_id:'',//动态ID
    		publish_text:'',//动态文本
   			image:[],//展示图片   存放该动态的全部图片 展示第一张
    		video:'',//视频
    		publish_time:'',//动态发布时间
    		likes:0,//动态点赞次数
    ],
    .
    .
    .
  }
}
~~~

> sql
>
> 按点赞排序 获取五条数据

~~~MySQL
select dynamic_id,publish_text,image,video,publish_time,likes
from Dynamic 
order by likes desc
limit 5;
~~~



#### #5.4 首页精彩视频(home-video)

> 数据格式
>
> 请求类型 GET
>
> 限制传参在3-5个
>
> ***所需数据库  :***	Video

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		video_id:'',//视频ID
    		title:'',//视频标题
    		brief:'',//视频的简介
   			image:'',//展示图片
    		video:'',//视频
    		publish_time:'',//视频发布时间
    		likes:0,//视频点赞次数
    ],
    .
    .
    .
  }
}
~~~

> sql
>
> 按点赞排序 获取五条数据

~~~mysql
select video_id,title,brief,image,video,publish_time,likes
from Video 
order by likes desc
limit 5;
~~~

#### #5.5 更多文章(more-article)

> 数据格式
>
> 请求类型 GET
>
> ***所需数据库  :***	Artice

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		article_id:'',//文章ID
    		title:'',//文章的标题
    		brief:'',//文章的简介
    		image:'',//展示图片
    		publish_time:'',//文章发布时间S
    		reading:0,//阅读次数
    		likes:0,//点赞次数
    		collect:0,//收藏次数
    		comments:0,//评论次数
    ],
    .
    .
    .
  }
}
~~~

~~~mysql
select article_id,title,brief,image,video,publish_time,reading,likes,collect,comments
from Article
order by reading desc;
~~~

#### #5.6 更多动态(more-dynamic)

> 数据格式
>
> 请求类型 GET
>
> ***所需数据库  :***	Dynamic

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		dynamic_id:'',//动态ID
    		dynamic_type:0,//动态类型
    		publish_text:'',//动态的简介
   			image:'',//展示图片
    		video:'',//视频
    		publish_time:'',//动态发布时间
    		reading:0,//阅读次数
    		likes:0,//点赞次数
    		collect:0,//收藏次数
    		comments:0,//评论次数
    ],
    .
    .
    .
  }
}
~~~

~~~mysql
select dynamic_id,dynamic_type,publish_text,image,video,publish_time,reading,likes,collect,comments
from Dynamic 
order by reading desc;
~~~

#### #5.7更多视频(more-video)

> 数据格式
>
> 请求类型 GET
>
> ***所需数据库  :***	Video

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		video_id:'',//视频ID
    		title:'',//视频标题
    		brief:'',//视频的简介
   			image:'',//展示图片
    		video:'',//视频
    		publish_time:'',//视频发布时间
    		reading:0,//阅读次数
    		likes:0,//点赞次数
    		collect:0,//收藏次数
    		comments:0,//评论次数
    ],
    .
    .
    .
  }
}
~~~

~~~MySQL
select video_id,title,brief,image,video,publish_time,reading,likes,collect,comments
from Video 
order by reading desc;
~~~

#### #5.8 文章详情(details-article)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 article_id & user_id(登录的用户ID可为空)
>
> ***所需数据库  :***	Article

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		article_id:'',//文章ID
    		user_id:'',//发布人id
    		user_name:'',//发布人姓名
    		user_pic:'',//发布人头像
    		user_motto:'',//作者座右铭
    		title:'',//文章的标题
    		brief:'',//文章的简介
    		image:'',//展示图片
    		txt:'',//文章内容**(待定)**
    		publish_time:'',//文章发布时间
    		is_like:0,//是否点赞 0：没点赞；1：点赞(当未登录时返回0)
    		is_collect:0,//是否收藏 0：没收藏；1：收藏(当未登录时返回0)
    		reading:0,//阅读次数
    		likes:0,//点赞次数
    		collect:0,//收藏次数
    		comments:0,//评论次数
    ],
    .
    .
    .
  }
}
~~~

~~~MySQL
select article_id,a.iphone as user_id,name as user_name,pic as user_pic,motto as user_motto,title,
brief,image,txt,publish_time,reading,likes,collect,comments
from Article a,UserList u
where a.article_id = '1202-1528457643586-20000' and a.iphone = u.iphone;

select * from Likes where iphone='' and be_like_id='';
select * from collect where iphone='' and be_collect_id='';
~~~

#### #5.9 动态详情(details-dynamic)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 dynamic_id & user_id(登录的用户ID可为空)
>
> ***所需数据库  :***	Dynamic

~~~json 
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		dynamic_id:'',//动态ID
    		user_id:'',//发布人id
    		user_name:'',//发布人姓名
    		user_pic:'',//发布人头像
    		user_motto:'',//作者座右铭
    		publish_text:'',//动态的文本内容
    		image:[],//动态的图片内容
    		time:'',//动态发布时间
    		is_like:0,//是否点赞 0：没点赞；1：点赞(当未登录时返回0)
    		is_collect:0,//是否收藏 0：没收藏；1：收藏(当未登录时返回0)
    		read:0,//阅读次数
    		like:0,//点赞次数
    		collect:0,//收藏次数
    		comment:0,//评论次数
    ],
    .
    .
    .
  }
}
~~~

~~~mysql
select dynamic_id,u.iphone as user_id,name as user_name,pic as user_pic,motto as user_motto,dynamic_type,publish_text,image,video,publish_time,reading,likes,collect,comments
from Dynamic d,UserList u
where d.dynamic_id = '1202-1528457643586-20000' and d.iphone = u.iphone;

select * from Likes where iphone='' and be_like_id='';
select * from collect where iphone='' and be_collect_id='';
~~~

#### #5.10 视频详情(details-video)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 video_id & user_id(登录的用户ID可为空)
>
> ***所需数据库  :***	Video

~~~json 
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		video_id:'',//视频ID
    		user_id:'',//发布人id
    		user_name:'',//发布人姓名
    		user_pic:'',//发布人头像
    		user_motto:'',//作者座右铭
    		title:'',//视频标题
    		brief:'',//视频简介
    		image:,//展示图片
    		video:'',//视频
    		publish_time:'',//视频发布时间
    		reading:0,//阅读次数
    		likes:0,//点赞次数
    		collect:0,//收藏次数
    		comments:0,//评论次数
        is_like:0,//是否点赞 0：没点赞；1：点赞(当未登录时返回0)
    		is_collect:0,//是否收藏 0：没收藏；1：收藏(当未登录时返回0)
    ],
    .
    .
    .
  }
}
~~~

~~~mysql 
select video_id,a.iphone as user_id,name as user_name,pic as user_pic,motto as user_motto,title,
brief,image,video,publish_time,reading,likes,collect,comments
from Video v,UserList u
where v.article_id = '1202-1528457643586-20000' and v.iphone = u.iphone;

select * from Likes where iphone='' and be_like_id='';
select * from collect where iphone='' and be_collect_id='';
~~~

#### #5.11评论(comment)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 id(文章、动态、视频) & user_id(登录的用户ID可为空)
>
> ***所需数据库  :***	Comment

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		comment_id:'',//评论的ID
    		be_comment_id:'',//被评论对象的ID,
    		user_id:'',//评论人的ID
    		user_name:'',//评论人的名字
    		user_pic:'',//评论人的头像
    		comment_time:'',//评论时间
    		content:'',//评论内容
    		is_like:0,//是否点赞
    		likes:0,//点赞次数
    ],
    .
    .
    .
  }
}
~~~

~~~mysql
select comment_id,be_comment_id,user_id,user_name, user_pic,
				content,likes,comment_time
from Comments
where c.be_comment_id = '1202-1528457643586-10000';

delete from Comments where comment_id = '1202-1528457643586-60000';
delete from Comments where comment_id = '1202-1528457643586-60001';
delete from Comments where comment_id = '1202-1528457643586-60002';
delete from Comments where comment_id = '8121-1556953294740-65617'
~~~

#### #5.12 社区发现(communtiy-find)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 id(文章、动态、视频) & user_id(登录的用户ID可为空)
>
> ***所需数据库  :***	Article、Dynamic、Video	三表合一按点赞数排序	***需建立视图***

~~~json 
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		id:'',//文章、动态、视频的ID
    		type:0,//类型
    		user_id:'',//发布人的ID
    		user_name:'',//发布人的名字
    		user_pic:'',//发布人的头像
    		title:'',//标题
    		brief:'',//简介
    		image:'',//展示图片
    		video:'',//视频使用
    		txt:'',//文本
    		is_like:0,//是否点赞
    		likes:1,//点赞次数
    ],
    .
    .
    .
  }
}
~~~

~~~mysql
select id,type,dynamic_type,u.iphone as user_id,u.name as user_name,u.pic as user_pic,title,brief,image,video,txt,publish_time,likes
from DataList d,UserList u
where d.iphone = u.iphone
order by publish_time,likes;
~~~

#### #5.13 社区关注(Communtiy-attention)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 id(文章、动态、视频) & user_id(登录的用户ID可为空)
>
> ***所需数据库  :***	Article、Dynamic、Video	三表合一按点赞数排序	***需建立视图***
>
> 操作方法  三表整合以后  根据自己的关注列表获取关注人发布的动态 而后排序

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{ //所需数据
    [
    		id:'',//文章、动态、视频的ID
    		type:0,//类型
    		user_id:'',//发布人的ID
    		user_name:'',//发布人的名字
    		user_pic:'',//发布人的头像
    		image:'',//展示图片
    		video:'',//视频使用
    		title:'',//标题
    		brief:'',//简介
    		is_like:0,//是否点赞
    		like:1,//点赞次数
    ],
    .
    .
    .
  }
}
~~~

~~~MySQL
select id,type,dynamic_type,u.iphone as user_id,u.name as user_name,u.pic as user_pic,title,brief,image,video,txt,publish_time,likes
from DataList d,UserList u
where d.iphone = u.iphone and d.iphone = ''
order by publish_time;
~~~

#### #5.14发布动态(publish-dynamic)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 动态ID、用户ID、动态类型、发布时间、文本内容、图片、视频、

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### #5.15 注册(register)

> 数据类型 
>
> 请求格式 POST 
>
> 传参 手机号，验证码

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### 5.16 编写信息(register-edit)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  手机号(ID)  头像  昵称  性别   密码

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### #5.17 登录(login)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  手机号(ID)  密码

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### 5.18 忘记密码(forget)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### 5.19 获取个人信息(gain-massage)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  手机号(ID) 

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{
  		name:'',
    	pic:'',
    	gender:'',
    	birth:'',
    	address:'',
    	motto:'',
	}
}
~~~

#### 5.20 修改个人信息(edit-massage)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  手机号(ID)  头像 昵称 性别 出生年月  城市  简介

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### #5.22 我的收藏(my-collect)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  用户ID   

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{
    [
     		id:'',//文章、动态、视频的ID
    		type:0,//类型
    		user_id:'',//发布人ID
    		user_name:'',//发布人名字
    		user_pic:'',//发布人头像
    		image:'',//展示图片
    		video:'',//视频使用
    		title:'',//标题
    		brief:'',//简介
    		publish_time:'', //发布时间
    ], ...,[...],
  }
}
~~~

~~~mysql
select c.collect_id as collect_id,c.type as type,c.iphone as user_id,
			u.name as user_name,u.pic as user_pic,d.id as data_id,d.image as image,d.video as video,d.title as title,
			d.brief as brief,d.publish_time as publish_time
from UserList u,Collect c,DataList d
where c.iphone = '13381765960' and c.iphone = u.iphone and c.be_collect_id = d.id
order by publish_time
~~~

#### #5.23 添加取消收藏(collect)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  用户ID   收藏的ID

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### #5.24 我的关注(my-attention)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  用户ID   

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{
    [
    		ID:'',//被关注用户的ID
    		name:'',
    		pic:'',
    		motto:'',
    ],
  }
}
~~~

~~~mysql
select attention_id, ua.iphone_2 as user_id, ul.name as user_name, 
			 ul.pic as user_pic,ul.motto as user_motto,attention_time
from UserAttention ua,UserList ul
where ua.iphone_1 = '13381765960' and ua.iphone_2 = ul.iphone
order by attention_time
~~~

#### #5.25 添加取消关注(attention)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  用户ID   被关注的用户ID

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### #5.26 点赞取消点赞(like)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  用户ID   点赞的ID

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
}
~~~

#### #5.27 我的发布(my-publish)

> 数据类型 
>
> 请求格式 POST 
>
> 传参  用户ID   

~~~json
//返回数据格式
{
  msg:'',//(待定)
  code:0,// 0:表示正常；1：表示参数不正常(待定)
  retData:{
    [
    		ID:'',//动态、文章、视频的ID
    		type:'',  //类型
    		image:'', //展示图片
    		video:'',	//视频
    		title:'',  //标题
    		breif:'',//简介
    		time:'',//发布时间
    ],
  }
}
~~~

~~~MySQL
select id,type,dynamic_type,title,brief,image,video,publish_time
from DataList 
where iphone = '13381765960' 
order by publish_time 
~~~



#### #5.28 发布视频(publish-video)

#### #5.29 发布文章(publish-article)

#### #5.30 删除视频(delete-video)

#### #5.31 删除文章(delete-article)

#### #5.32 删除动态(delete-dynamic)

#### #5.33 我的消息(my-news)

~~~mysql
select id,type,dynamic_type,title,brief,image,video,publish_time
from DataList 
where iphone = '13381765960' 
order by publish_time 


select comment_id,user_id,user_name,user_pic,be_commend_id,comment_time,content,likes
from Comments 
where user_id != 13381765960 and be_commend_id = '1202-1528457643586-10000'
select comment_id,user_id,user_name,user_pic,be_commend_id,comment_time,content,likes from Comments where user_id != 13381765960 and be_commend_id = 1202-1528457643586-10000
~~~

