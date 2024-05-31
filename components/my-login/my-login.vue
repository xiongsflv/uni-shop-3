<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo','updateToken']),
      // 获取微信用户的基本信息
      getUserInfo(e) {
        // 判断是否获取用户信息成功
        if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！');
        // 3. 将用户的基本信息存储到 vuex 中
        this.updateUserInfo(e.detail.userInfo);
        this.getToken(e.detail)
      },
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 wx.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！');
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 换取 token
        const { data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        debugger
        if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // uni.$showMsg('登录成功');
        this.updateToken(loginResult.message.token)
      }
    }
  }
  
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 40px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>