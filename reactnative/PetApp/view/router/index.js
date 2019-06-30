/**
 * Created by bingPo on 2018/11/12.
 */
import React, {Component} from 'react';
import {createStackNavigator, createBottomTabNavigator, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Global from '../compont/Global';

/*
 *  主页
 */
import Home from '../page/home';
import More from '../page/home/More';
import VideoDetails from '../page/home/VideoDetails';
import ArticleDetails from '../page/home/ArticleDetails';
import ArticleDetailsOld from '../page/home/ArticleDetails-old';
import DynamicDetails from '../page/home/DynamicDetails';
/*
 *  社区
 */
import Community from '../page/community';
import PublishDynamicImage from '../page/community/PublishDynamicImage';
import PublishDynamicVideo from '../page/community/PublishDynamicVideo';
/*
 *  消息
 */
import Information from '../page/information';
import FriendList from '../page/information/FriendList';
import GroupList from '../page/information/GroupList';
import ChatRoomList from '../page/information/ChatRoomList';
import Chat from '../page/information/Chat';
import Chat1 from '../page/information/Chat1';
/*
 *  我的
 */
import My from '../page/my';
import Personal from '../page/my/Personal';
import Setting from '../page/my/Setting';
import EditData from '../page/my/EditData';
import Collect from '../page/my/Collect';
import Attention from '../page/my/Attention';
import Fans from '../page/my/Fans';
import News from '../page/my/News';
import MyPublish from '../page/my/MyPublish';
import Qrcode from '../page/my/Qrcode';
import Service from '../page/my/Service';
import Policy from '../page/my/Policy';
import AboutUs from '../page/my/AboutUs';
import Feedback from '../page/my/Feedback';
import OtherInform from '../page/my/OtherInform';
import OtherPersonal from '../page/my/OtherPersonal';
/*
 *  登录
 */
import Login from '../page/login/Login';
import Register from '../page/login/Register';
import Forget from '../page/login/Forget';
import LoginPhone from '../page/login/Login_phone';
import EditMessage from '../page/login/Edit_message';
/*
 *  其他
 */
import ShowImage from '../compont/ShowImage';


const RootTabs = createBottomTabNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={'home'}
                        size={focused ? 26:24}
                        style={{color: tintColor, padding: 0, margin: 0}}
                    />
                ),
            }
        },
        Community: {
            screen: Community,
            navigationOptions: {
                tabBarLabel: '社区',
                tabBarIcon: ({tintColor, focused}) => (
                    <MaterialIcons
                        name={'assistant'}
                        size={focused ? 26:24}
                        style={{color: tintColor, padding: 0, margin: 0}}
                    />
                ),
            }
        },
        Information: {
            screen: Information,
            navigationOptions: {
                tabBarLabel: '消息',
                tabBarIcon: ({tintColor, focused}) => (
                    <MaterialIcons
                        name={'chat'}
                        size={focused ? 26:24}
                        style={{color: tintColor, padding: 0, margin: 0}}
                    />
                ),
            }
        },
        My: {
            screen: My,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'user-secret':'user'}
                        size={focused ? 26:24}
                        style={{color: tintColor, padding: 0, margin: 0}}
                    />

                ),
            }
        },
    },
    {

        swipeEnabled: true, // 是否允许横向滑动
        initialRouteName: 'Home', // 设置默认的页面组件ss
        lazy: true, // 在app打开的时候将底部标签栏全部加载，默认false,推荐改成true
        tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')

        initialRouteParams: {data: 12},
        tabBarOptions: {
            showIcon: true, // 是否显示图标，默认关闭。
            showLabel: true, //是否显示label，默认开启。
            activeTintColor: Global.colors.fontColor_1,
            inactiveTintColor: Global.colors.fontColor_2,
            style: {
                // marginTop:10,
                padding: 0,
                backgroundColor: '#fff',
                height: 50,
                zIndex: 0,
                position: 'relative'
            },
            labelStyle: {
                fontSize: 14,
                paddingVertical: 0,
                marginTop: -4
            },
            iconStyle: {
                marginTop: 0
            },
        },
        animationEnabled: true,
    }
);

const RootNavigator = createStackNavigator(
    {
        Home: {
            screen: RootTabs,
            navigationOptions: {
                header: null
            }
        },
        //首页
        More: {
            screen: More,
            navigationOptions: {
                header: null
            }
        },
        VideoDetails: {
            screen: VideoDetails,
            navigationOptions: {
                header: null
            }
        },
        ArticleDetails: {
            screen: ArticleDetails,
            navigationOptions: {
                header: null
            }
        },
        ArticleDetailsOld: {
            screen: ArticleDetailsOld,
            navigationOptions: {
                header: null
            }
        },
        DynamicDetails: {
            screen: DynamicDetails,
            navigationOptions: {
                header: null
            }
        },
        //社区
        PublishDynamicImage: {
            screen: PublishDynamicImage,
            navigationOptions: {
                header: null
            }
        },
        PublishDynamicVideo: {
            screen: PublishDynamicVideo,
            navigationOptions: {
                header: null
            }
        },
        //消息
        FriendList: {
            screen: FriendList,
            navigationOptions: {
                header: null
            }
        },
        GroupList: {
            screen: GroupList,
            navigationOptions: {
                header: null
            }
        },
        ChatRoomList: {
            screen: ChatRoomList,
            navigationOptions: {
                header: null
            }
        },
        Chat: {
            screen: Chat,
            navigationOptions: {
                header: null
            }
        },
        Chat1: {
            screen: Chat1,
            navigationOptions: {
                header: null
            }
        },
        //我的、、、
        Personal: {
            screen: Personal,
            navigationOptions: {
                header: null
            }
        },
        Setting: {
            screen: Setting,
            navigationOptions: {
                header: null
            }
        },
        EditData: {
            screen: EditData,
            navigationOptions: {
                header: null
            }
        },
        Collect: {
            screen: Collect,
            navigationOptions: {
                header: null
            }
        },
        Attention: {
            screen: Attention,
            navigationOptions: {
                header: null
            }
        },
        Fans: {
            screen: Fans,
            navigationOptions: {
                header: null
            }
        },
        News: {
            screen: News,
            navigationOptions: {
                header: null
            }
        },
        MyPublish: {
            screen: MyPublish,
            navigationOptions: {
                header: null
            }
        },
        Qrcode: {
            screen: Qrcode,
            navigationOptions: {
                header: null
            }
        },
        Service: {
            screen: Service,
            navigationOptions: {
                header: null
            }
        },
        Policy: {
            screen: Policy,
            navigationOptions: {
                header: null
            }
        },
        AboutUs: {
            screen: AboutUs,
            navigationOptions: {
                header: null
            }
        },
        Feedback: {
            screen: Feedback,
            navigationOptions: {
                header: null
            }
        },
        OtherPersonal: {
            screen: OtherPersonal,
            navigationOptions: {
                header: null
            }
        },
        OtherInform: {
            screen: OtherInform,
            navigationOptions: {
                header: null
            }
        },
        //登录
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                header: null
            }
        },
        Forget: {
            screen: Forget,
            navigationOptions: {
                header: null
            }
        },
        LoginPhone: {
            screen: LoginPhone,
            navigationOptions: {
                header: null
            }
        },
        EditMessage: {
            screen: EditMessage,
            navigationOptions: {
                header: null
            }
        },
        //其他
        ShowImage: {
            screen: ShowImage,
            navigationOptions: {
                header: null
            }
        },
    },
    {
        // initialRouteName: 'Home', // 默认显示界面
        // mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        // headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    });
export default RootNavigator;