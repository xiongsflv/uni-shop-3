<template>
  <view>
    <!-- 最外层的容器 -->
    <view class="my-settle-container">
      <!-- 全选区域 -->
      <label class="radio" @click="changeAllState">
        <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
      </label>
      <!-- 合计区域 -->
      <view class="amount-box">
        合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="btn-settle">结算({{checkedCount}})</view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from "vuex"
  export default {
    name: "my-settle",
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total','checkedGoodsAmount']),
      // 判断是否全选
      isFullCheck() {
        return this.checkedCount == this.total
      }
    },
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('m_cart',['updateAllGoodsState']),
      // 全选/反选
      changeAllState(){
        this.updateAllGoodsState(!this.isFullCheck)
      }
    },
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    height: 50px;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;
    background-color: white;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount-box {
      .amount {
        color: #c00000;
        font-weight: bold;
      }
    }

    .btn-settle {
      background: #c00000;
      height: 50px;
      color: white;
      line-height: 50px;
      padding: 0 10px;
      min-width: 100px;
      text-align: center;
    }
  }
</style>