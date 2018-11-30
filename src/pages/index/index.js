import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      canGo: false,
      canIUse: Taro.canIUse('Button.open-type.getUserInfo')
    }
  }

    config = {
    navigationBarTitleText: 'PickMee'
  }

  componentWillMount () {
    const self = this;
    Taro.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          Taro.getUserInfo({
            success: function(res) {
              self.setState({ canIUse: true })
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick = () => {
    const self = this;
    if (this.state.canIUse) {
      Taro.navigateTo({
        url: '/pages/home/index'
      })
    } else {
      Taro.showToast({
        title: '正在识别你的身份，再次点击进入哦',
        icon: 'none',
        duration: 2000
      })
      Taro.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            Taro.getUserInfo({
              success: function(res) {
                Taro.showToast({
                  title: '获取信息成功',
                  icon: 'none',
                  duration: 2000
                })
                self.setState({ canIUse: true })
                console.log(res.userInfo)
              }
            })
          }
        }
      })
    }
  }

  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }

  render () {
    return (
      <View className='index'>
        {/* <AtButton type='primary' size='normal' onClick={this.handleClick}>Pick me!</AtButton> */}
        {/* <Button className='index-btn' onClick={this.handleClick}>Pick me!</Button> */}
        <Button Taro-if='{{canIUse}}' onClick={this.handleClick} open-type='getUserInfo'>Pick Me!</Button>
      </View>
    )
  }
}

export default Index
