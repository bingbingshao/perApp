/**
 * Created by bingPo on 2018/11/12.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    ScrollView, Modal,
} from 'react-native';
import ETTStatus from "../../compont/ETTStatus"
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Global from "../../compont/Global"
import {getFirstLetter} from "../../compont/Function"
import Style from '../../css/Style';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';

let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //数组长27  代表26个字母和#
let array_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']; //数组长27  代表26个字母和#

export default class FriendList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sid: '',
            plusSomething: false,
            friendList: [
                {id: '3', name: '蓝猫', pic: 'http://111.231.141.185/pet/image/pet-banner-12.jpg'},
                {id: '2', name: '哈士奇', pic: 'http://111.231.141.185/pet/image/pet-banner-3.jpg'},
                {id: '5', name: '小松鼠', pic: 'http://111.231.141.185/pet/image/pet-banner-2.jpg'},
                {id: '1', name: 'aa布偶', pic: 'http://111.231.141.185/pet/image/pet-banner-1.jpg'},
                {id: '4', name: 'b二哈', pic: 'http://111.231.141.185/pet/image/pet-banner-4.jpg'},
                {id: '6', name: '12wolf', pic: 'http://111.231.141.185/pet/image/pet-banner-5.jpg'},
                {id: '7', name: '@wolf', pic: 'http://111.231.141.185/pet/image/pet-banner-5.jpg'},
            ],
            re_array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//数组长27  代表26个字母和#
        }
        ;
    }

    /*
     * 初始调用
     */
    componentWillMount() {
        array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //数组长27  代表26个字母和#
        this.calculate_listMenus();
    };
    componentDidMount() {

    };

    /*
     * 点击事件
     */
    jump = (name, data) => {
    };
    calculate_listMenus = () => {
        /*
         *  计算右侧边栏字母导航的显示
         */
        let friendList = this.state.friendList;
        for (let i = 0; i < friendList.length ; i++) {
            if (i == friendList.length) {
                this.setState({
                    re_array: this.state.array
                })
            }
            let name = getFirstLetter(friendList[i].name);
            let firstChar = name.charAt(0); //获取第一个字
            console.log("name", name);
            // console.log("firstChar", firstChar);
            switch (firstChar) {
                case 'a':
                case 'A':
                    this.state.re_array[0] = 1;
                    break;
                case 'b':
                case 'B':
                    this.state.re_array[1] = 1;
                    break;
                case 'c':
                case 'C':
                    this.state.re_array[2] = 1;
                    break;
                case 'd':
                case 'D':
                    this.state.re_array[3] = 1;
                    break;
                case 'e':
                case 'E':
                    this.state.re_array[4] = 1;
                    break;
                case 'f':
                case 'F':
                    this.state.re_array[5] = 1;
                    break;
                case 'g':
                case 'G':
                    this.state.re_array[6] = 1;
                    break;
                case 'h':
                case 'H':
                    this.state.re_array[7] = 1;
                    break;
                case 'i':
                case 'I':
                    this.state.re_array[8] = 1;
                    break;
                case 'j':
                case 'J':
                    this.state.re_array[9] = 1;
                    break;
                case 'k':
                case 'K':
                    this.state.re_array[10] = 1;
                    break;
                case 'l':
                case 'L':
                    this.state.re_array[11] = 1;
                    break;
                case 'm':
                case 'M':
                    this.state.re_array[12] = 1;
                    break;
                case 'n':
                case 'N':
                    this.state.re_array[13] = 1;
                    break;
                case 'o':
                case 'O':
                    this.state.re_array[14] = 1;
                    break;
                case 'p':
                case 'P':
                    this.state.re_array[15] = 1;
                    break;
                case 'q':
                case 'Q':
                    this.state.re_array[16] = 1;
                    break;
                case 'r':
                case 'R':
                    this.state.re_array[17] = 1;
                    break;
                case 's':
                case 'S':
                    this.state.re_array[18] = 1;
                    break;
                case 't':
                case 'T':
                    this.state.re_array[19] = 1;
                    break;
                case 'u':
                case 'U':
                    this.state.re_array[20] = 1;
                    break;
                case 'v':
                case 'V':
                    this.state.re_array[21] = 1;
                    break;
                case 'w':
                case 'W':
                    this.state.re_array[22] = 1;
                    break;
                case 'x':
                case 'X':
                    this.state.re_array[23] = 1;
                    break;
                case 'y':
                case 'Y':
                    this.state.re_array[24] = 1;
                    break;
                case 'z':
                case 'Z':
                    this.state.re_array[25] = 1;
                    break;
                default:
                    this.state.re_array[26] = 1;
                    break;
            }
        }
    };

    /*
     *   界面视图
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
                        onPress={() =>{
                            this.props.navigation.goBack()
                        }}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                            <EvilIcons name="chevron-left" size={40} color={Global.colors.fontColor_1}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View>
                            <Text style={[Style.barText, Style.font_1]}>好友列表</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}

                    >
                        <View style={[Style.icon_1, Style.flexRowCenter, {marginRight: 10}]}>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    _searchOne = () => {
        /*
         *  指定搜索某一个人
         */
        return (
            <View style={[styles.search_text_1, Style.flexRowCenter]}>
                <View style={[styles.search_text_2, Style.flexRowCenter]}>
                    <AntDesign name={'search1'} size={18} color={Global.colors.fontColor_11}/>
                    <Text style={styles.search_font_1}>搜索</Text>
                </View>
            </View>
        )
    };

    _listChild = () => {
        /*
         *   子列表
         */
        // let chinese = /[^/u4e00-/u9fa5]/; //用于判断字符串是不是中文

        return (
            <View style={{marginTop: 10}}>
                {
                    this.state.friendList.map((info, i) => {
                        let name = getFirstLetter(info.name);
                        let firstChar = name.charAt(0); //获取第一个字
                        if (firstChar == 'a' || firstChar == 'A') {
                            array[0]++;
                            if (array[0] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('A')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'b' || firstChar == 'B') {
                            array[1]++;
                            if (array[1] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('B')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'c' || firstChar == 'C') {
                            array[2]++;
                            if (array[2] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('C')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'd' || firstChar == 'D') {
                            array[3]++;
                            if (array[3] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('D')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'e' || firstChar == 'E') {
                            array[4]++;
                            if (array[4] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('E')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'f' || firstChar == 'F') {
                            array[5]++;
                            if (array[5] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('F')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'g' || firstChar == 'G') {
                            array[6]++;
                            if (array[6] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('G')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'h' || firstChar == 'H') {
                            array[7]++;
                            if (array[7] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('H')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'i' || firstChar == 'I') {
                            array[8]++;
                            if (array[8] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('I')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'j' || firstChar == 'J') {
                            array[9]++;
                            if (array[9] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('J')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'k' || firstChar == 'K') {
                            array[10]++;
                            if (array[10] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('K')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'l' || firstChar == 'L') {
                            array[11]++;
                            if (array[11] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('L')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'm' || firstChar == 'M') {
                            array[12]++;
                            if (array[12] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('M')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'n' || firstChar == 'N') {
                            array[13]++;
                            if (array[13] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('N')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'o' || firstChar == 'O') {
                            array[14]++;
                            if (array[14] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('O')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'p' || firstChar == 'P') {
                            array[15]++;
                            if (array[15] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('P')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'q' || firstChar == 'Q') {
                            array[16]++;
                            if (array[16] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('Q')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'r' || firstChar == 'R') {
                            array[17]++;
                            if (array[17] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('R')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 's' || firstChar == 'S') {
                            array[18]++;
                            if (array[18] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('S')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 't' || firstChar == 'T') {
                            array[19]++;
                            if (array[19] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('T')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'u' || firstChar == 'U') {
                            array[20]++;
                            if (array[20] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('U')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'v' || firstChar == 'V') {
                            array[21]++;
                            if (array[21] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('V')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'w' || firstChar == 'W') {
                            array[22]++;
                            if (array[22] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('W')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'X' || firstChar == 'X') {
                            array[23]++;
                            if (array[23] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('X')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'y' || firstChar == 'Y') {
                            array[24]++;
                            if (array[24] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('Y')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else if (firstChar == 'z' || firstChar == 'Z') {
                            array[25]++;
                            if (array[25] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('z')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        } else {
                            array[26]++;
                            if (array[26] == 1) {
                                //第一次出现
                                return (
                                    <View>
                                        {this._listTitle('#')}
                                        {this._listContent(info)}
                                    </View>
                                )
                            } else {
                                return (
                                    this._listContent(info)
                                )

                            }
                        }
                    })
                }
            </View>
        )
    };
    _listTitle = (title) => {
        /*
         *  首字母标题
         */
        return (
            <View style={[styles.list_text_0, Style.flexRowStart]}>
                <Text style={styles.list_font_0}>{title}</Text>
            </View>
        )
    };
    _listContent = (data) => {
        /*
         * 好友列表视图
         */
        return (
            <View style={[styles.list_text_1, Style.flexRowStart]}>
                <Image style={styles.list_image_1} source={{uri: data.pic}}/>
                <Text style={styles.list_font_1}>{data.name}</Text>
            </View>
        )
    };
    _listMenus = () => {
        /*
         *  右侧字母导航
         */
        // console.log("re_array", this.state.re_array);
        return (
            <View style={[styles.list_menus_text_1, Style.flexColumnCenter]}>
                {
                    this.state.re_array.map((data, i) => {
                        if (data > 0) {
                            return (
                                <View style={[styles.list_menus_text_2, Style.flexColumnCenter]}>
                                    <Text style={styles.list_menus_font_1}>{array_A[i]}</Text>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    };


    render() {
        return (
            <View style={[styles.contains]}>
                {this._nav()}
                {this._searchOne()}
                <ScrollView>
                    {this._listChild()}
                </ScrollView>
                {this._listMenus()}
                {
                    this.state.loading ?
                        <Loading/>
                        : null
                }
                <Hint ref="hint"/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
        contains: {
            flex: 1,
            backgroundColor: Global.colors.fontColor_4,
        },

        search_text_1: {
            width: Global.window.width,
            height: 45,
            backgroundColor: Global.colors.fontColor_16
        },
        search_text_2: {
            width: Global.window.width - 30,
            height: 30,
            backgroundColor: Global.colors.fontColor_4,
            borderRadius: 5,
        },
        search_font_1: {
            fontSize: 14,
            color: Global.colors.fontColor_11,
            paddingLeft: 5,
        },

        list_text_0: {
            width: Global.window.width,
            height: 20,
            backgroundColor: Global.colors.fontColor_16,
            paddingLeft: 20,
        },
        list_text_1: {
            width: Global.window.width - 20,
            marginLeft: 20,
            padding: 10,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
            marginBottom: 5,
        },
        list_image_1: {
            width: 40,
            height: 40,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#eee'
        },
        list_font_0: {
            fontSize: 16,
            fontWeight: '500',
            color: '#888',
        },
        list_font_1: {
            fontSize: 16,
            fontWeight: '500',
            color: '#000',
            paddingLeft: 20,
        },

        list_menus_text_1: {
            position: 'absolute',
            top: 0,
            right: 5,
            width: 25,
            height: Global.window.height,
            zIndex: 100
        },
        list_menus_text_2: {
            width: 25,
            height: 25,
            // backgroundColor: 'rgba(0,0,0,0.1)'
        },
        list_menus_font_1: {
            color: '#555',
            fontSize: 16,
            fontWeight: '500',
        },

    })
;