/**
 * Created by bingPo on 2019/1/10.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ETTStatus from './ETTStatus'

export default class ImageShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageIndex: 0,
        };
    }

    componentWillMount() {
        // 上个界面传来的照片集合
        this.start();
    }

    start = ()=> {
        /*
         * 数据处理
         */
        let images = this.props.navigation.state.params.imageData;
        let temp_images = [];
        for (let data of images) {
            temp_images.push({url: data})
            this.setState({
                images: temp_images,
                imageIndex: this.props.navigation.state.params.number,
            })
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <ETTStatus barStyle={'light-content'}/>
                <ImageViewer
                    imageUrls={this.state.images} // 照片路径
                    enableImageZoom={true} // 是否开启手势缩放
                    index={this.state.imageIndex} // 初始显示第几张
                    failImageSource={"aaa"} // 加载失败图片
                    onChange={(index) => {
                    }} // 图片切换时触发
                    onClick={() => { // 图片单击事件
                        this.props.navigation.goBack();
                    }}
                />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    // nav
});