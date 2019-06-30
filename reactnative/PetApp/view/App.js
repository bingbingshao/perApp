import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import Root from './router';


export default class App extends Component {

  componentWillMount() {
    console.disableYellowBox = true; // 关闭全部黄色警告
  }

  render() {
    return (
        <View style={{flex:1}}>
          <Root />
        </View>
    );
  }
}