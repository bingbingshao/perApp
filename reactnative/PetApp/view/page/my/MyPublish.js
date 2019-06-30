/**
 * Created by bingPo on 2018/11/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableHighlight,
    ScrollView,
    Image
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';


export default class MyPublish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            variety: [
                {id: 'id_1', name: '动态'},
                {id: 'id_2', name: '文章'},
                {id: 'id_3', name: '视频'},
            ],
            variety_id: '',
        }
    }

    componentDidMount() {
        this.setState({  //初始化选中参数
            variety_id: this.state.variety[0].id
        });
    }

    /*
     * 点击事件
     */
    select_variety = (id) => {  //选择分菜单显示的种类
        this.setState({  //重新设置选中的菜单种类
            variety_id: id
        });
    };

    /*
     * 界面视图
     */
    _nav() {
        /*
         *  顶部导航
         */
        return (
            <View style={[Style.barTop]}>
                <ETTStatus/>
                <View style={[Style.barView, Style.flexRowBetween]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                            <EvilIcons name="chevron-left" size={40} color={Global.colors.fontColor_1}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}>
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>我的发布</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    _childMenu = () => {
        /*
         *  子菜单
         */
        return (
            <View style={[{width: Global.window.width}]}>
                <ScrollView
                    horizontal={true}
                >
                    <View style={[Style.flexRowAround, {width: Global.window.width}]}>
                        {
                            this.state.variety.map((info, i) => {
                                if (this.state.variety_id === info.id) {
                                    return (
                                        <TouchableHighlight underlayColor={'transparent'}>
                                            <View style={[Style.flexRowCenter, {
                                                height: 30,
                                                borderBottomColor: '#7D26CD',
                                                borderBottomWidth: 1
                                            }]}>
                                                <Text style={[Style.color_4]}>{info.name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                } else {
                                    return (
                                        <TouchableHighlight underlayColor={'transparent'}
                                                            onPress={() => this.select_variety(info.id)}>
                                            <View style={[Style.flexRowCenter, {height: 30}]}>
                                                <Text style={[Style.color_2]}>{info.name}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    };

    render() {

        return (
            <View style={[styles.contains, Style.backgroundColor_5]}>
                {this._nav()}
                {this._childMenu()}
                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }
                <Hint ref="hint"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contains: {
        flex: 1,
        backgroundColor: Global.colors.fontColor_4,
    },
    contains_center: {
        width: Global.window.width,
        position: 'relative',
    },

});
