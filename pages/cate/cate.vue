<template>
  <view>
    <!-- 所搜组件 -->
    <view class="search-box">
      <my-search :bgcolor="'pink'" :radius="15" @myClick='gotoSearch'></my-search>
    </view>
    <!-- 滑动区域 -->
    <view class="scroll-view-container">
           <!-- 左侧的滚动视图区域 -->
           <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active? 'active':'']" @click="activeChanged(i)">{{item.cat_name}}
          </view>
        </block>
           
      </scroll-view>
           <!-- 右侧的滚动视图区域 -->
           <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <!-- 二级分类 -->
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-title">{{item2.cat_name}}</view>
          <!-- 三级分类 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
              <!-- 三级分类图片 -->
              <image :src="item3.cat_icon"></image>
              <!-- 三级分类文本 -->
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
           
      </scroll-view>
         </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoAsync()
      sysInfo.then(async => {
        // console.log(async);
        this.wh = async [1].windowHeight - 50
      });
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        // 判断是否获取失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 转存数据
        this.cateList = res.message;
        // 二级分类赋值
        this.cateLevel2 = res.message[0].children
      },
      activeChanged(i) {
        this.active = i;
        // 为二级分类重新赋值
        this.cateLevel2 = this.cateList[i].children
        // 重置滚动条的位置
        this.scrollTop = this.scrollTop == 0 ? 1 : 0
      },
      // 跳转到商品列表页面
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;
    }

    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
    }

    .active {
      background-color: #ffffff;
      position: relative;
    }

    .active::before {
      content: ' ';
      display: block;
      width: 3px;
      height: 30px;
      background-color: #c00000;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }

  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      display: flex;
      margin-bottom: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>