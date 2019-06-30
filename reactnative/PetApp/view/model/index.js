import FetchNet from "./FetchNet";

const Model = {

    /*
     *  首页、、、
     */
    //轮播图
    banner(param, success, fail) {
        FetchNet.fetchPostJson("home/banner.php", param, success, fail);
    },
    //首页精品文章
    home_article(param, success, fail) {
        FetchNet.fetchPostJson("home/home-article.php", param, success, fail);
    },
    //首页视频
    home_video(param, success, fail) {
        FetchNet.fetchPostJson("home/home-video.php", param, success, fail);
    },
    //首页动态
    home_dynamic(param, success, fail) {
        FetchNet.fetchPostJson("home/home-dynamic.php", param, success, fail);
    },
    //首页更多文章
    more_article(param, success, fail) {
        FetchNet.fetchPostJson("home/more-article.php", param, success, fail);
    },
    //首页更多视频
    more_video(param, success, fail) {
        FetchNet.fetchPostJson("home/more-video.php", param, success, fail);
    },
    //首页更多动态
    more_dynamic(param, success, fail) {
        FetchNet.fetchPostJson("home/more-dynamic.php", param, success, fail);
    },
    //获取数据详情信息
    details_data(param, success, fail) {
        FetchNet.fetchPostJson("home/details-data.php", param, success, fail);
    },
    //获取指定数据的评论数据
    gain_comments(param, success, fail) {
        FetchNet.fetchPostJson("act/gain-comments.php", param, success, fail);
    },
    //删除数据
    delete_data(param, success, fail) {
        FetchNet.fetchPostJson("home/delete-data.php", param, success, fail);
    },
    //点赞取消点赞
    likes(param, success, fail) {
        FetchNet.fetchPostJson("act/likes.php", param, success, fail);
    },
    //点赞评论取消点赞
    likes_comments(param, success, fail) {
        FetchNet.fetchPostJson("act/likes-comments.php", param, success, fail);
    },
    //添加评论
    edit_comments(param, success, fail) {
        FetchNet.fetchPostJson("act/edit-comments.php", param, success, fail);
    },
    //删除评论
    delete_comments(param, success, fail) {
        FetchNet.fetchPostJson("act/delete-comments.php", param, success, fail);
    },
    //收藏和取消收藏
    collect(param, success, fail) {
        FetchNet.fetchPostJson("act/collect.php", param, success, fail);
    },
    //添加和取消关注
    attentions(param, success, fail) {
        FetchNet.fetchPostJson("act/attentions.php", param, success, fail);
    },

    /*
     * 发现
     */
    //社区页面,发现
    community_find(param, success, fail) {
        FetchNet.fetchPostJson("community/community-find.php", param, success, fail);
    },
    //社区页面,关注
    community_attention(param, success, fail) {
        FetchNet.fetchPostJson("community/community-attention.php", param, success, fail);
    },
    //发布图文动态
    publishDynamicImage(param, success, fail) {
        FetchNet.fetchPostJson("community/publish-dynamic.php", param, success, fail);
    },

    /*
     *  我的
     */
    //获取个人信息
    myPersonal(param, success, fail) {
        FetchNet.fetchPostJson("my/my-personal.php", param, success, fail);
    },
    //获取我的收藏
    myCollect(param, success, fail) {
        FetchNet.fetchPostJson("my/my-collect.php", param, success, fail);
    },
    //获取我的关注
    myAttention(param, success, fail) {
        FetchNet.fetchPostJson("my/my-attentions.php", param, success, fail);
    },
    //获取我的收藏
    myFans(param, success, fail) {
        FetchNet.fetchPostJson("my/my-fans.php", param, success, fail);
    },
    //获取我的发布
    myPublish(param, success, fail) {
        FetchNet.fetchPostJson("my/my-publish.php", param, success, fail);
    },
    //保存修改的个人信息
    savePersonal(param, success, fail) {
        FetchNet.fetchPostJson("my/edit-personal.php", param, success, fail);
    },
    //获取我的关注
    isAttention(param, success, fail) {
        FetchNet.fetchPostJson("my/is-attentions.php", param, success, fail);
    },

    /*
     *  登录
     */
    //登录
    register(param, success, fail) {
        FetchNet.fetchPostJson("login/register.php", param, success, fail);
    },
    //登录
    login(param, success, fail) {
        FetchNet.fetchPostJson("login/login.php", param, success, fail);
    },
    //获取验证码
    send_code(param, success, fail) {
        FetchNet.fetchPostJson("login/send-code.php", param, success, fail);
    },
    //验证验证码
    modify_code(param, success, fail) {
        FetchNet.fetchPostJson("login/modify-code.php", param, success, fail);
    },
    //修改密码
    modifyPassword(param, success, fail) {
        FetchNet.fetchPostJson("login/modify-password.php", param, success, fail);
    },
    /*
     *  上传数据到服务器
     */
    //上传图片
    upload(param, success, fail) {
        FetchNet.uploadImage("upload/upload.php", param, success, fail);
    },
};

export default Model;
