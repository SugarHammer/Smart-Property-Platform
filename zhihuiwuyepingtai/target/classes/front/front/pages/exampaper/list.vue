<template>
    <mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
        <view class="uni-padding-wrap">
            <!--header end-->
            <view class="list">
                <view class="flex flex-between flex-align-center pl15 pb30">
                    <text class="f28 col3">问卷列表</text>
                    <!-- <text class="f24 col9">查看全部</text> -->
                </view>
                <view @tap="onDetailTap(item.id)" v-for="(item,index) in list " v-bind:key="index" class="listm flex flex-between">
                    <image src="/static/exam-index/paper.png" mode="widthFix" class="listmpic mt10"></image>
                    <view class="listmr">
                        <view class="col3 f30 elip mb15">{{item.exampaperName}} <view style="float: right;">{{item.exampaperMyscore}}分</view></view>
                        <view class="colb f24 lh35">问卷时长：{{item.exampaperDate}}分钟</view>
                        <view class="flex flex-align-center mt20" style="float: right;">
                            <text class="colb f25">
                                <button class="cu-btn bg-green shadow">点击问卷</button>
                            </text>
                        </view>
                    </view>
                </view>
            </view>
            <!--list end-->
        </view>
    </mescroll-uni>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                mescroll: null, //mescroll实例对象
                downOption: {
                    auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
                },
                upOption: {
                    noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                    textNoMore: '~ 没有更多了 ~',
                },
                hasNext: true,
                searchForm: {},
                CustomBar: '0',
                userid: ''
            };
        },
        onLoad(options) {
            this.userid = options.userid
            this.hasNext = true
            // 重新加载数据
            if (this.mescroll) this.mescroll.resetUpScroll()
        },
        methods: {
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit(mescroll) {
                this.mescroll = mescroll;
            },
            /*下拉刷新的回调 */
            downCallback(mescroll) {
                this.hasNext = true
                // 重置分页参数页数为1
                mescroll.resetUpScroll()
            },
            /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
            async upCallback(mescroll) {
                let res = await this.$api.page(`exampaper`, {
                    page: mescroll.num,
                    limit: mescroll.size
                });
                // 如果是第一页数据置空
                if (mescroll.num == 1) this.list = [];
                this.list = this.list.concat(res.data.list);
                if (res.data.list.length == 0) this.hasNext = false;
                mescroll.endSuccess(mescroll.size, this.hasNext);
            },
            // 详情
            async onDetailTap(id) {
                let value = [
                    {
                        'key':'exampaperId',
                        'val':id
                    }
                ]
                this.$utils.jump("./exam?exampaperId="+id)
            },
            // 搜索
            async search() {
                this.mescroll.num = 1
                let searchForm = {
                    page: this.mescroll.num,
                    limit: this.mescroll.size
                }
                let res = await this.$api.page(`exampaper`, searchForm);
                // 如果是第一页数据置空
                if (this.mescroll.num == 1) this.list = [];
                this.list = this.list.concat(res.data.list);
                if (res.data.list.length == 0) this.hasNext = false;
                this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
            }
        }
    };
</script>

<style>
    view {
        font-family: '\5FAE\8F6F\96C5\9ED1';
        font-size: 30upx;
    }

    page {
        background: #ededed;
    }

    .header {
        background: #f39800;
        padding: 15upx 20upx 255upx;
        position: relative;
    }

    .ssbox {
        background: rgba(255, 255, 255, 0.35);
        width: 530upx;
        border-radius: 60rpx;
        padding: 10upx 15upx;
        box-sizing: border-box;
    }

    .ss_input {
        border: none;
        width: 450upx;
        font-size: 30upx;
        color: #fff;
        background: none;
        height: 45upx;
        line-break: 45upx;
    }

    .headerb {
        position: absolute;
        left: 0;
        top: 60upx;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20upx;
    }

    .headerb image {
        width: 710upx;
        box-shadow: 0 10upx 10px rgba(0, 0, 0, 0.3);
        border-radius: 40upx;
        position: relative;
        z-index: 10;
    }

    .notice {
        position: relative;
        z-index: 5;
        padding: 0 50upx;
    }

    .noticem {
        background: #fff;
        padding: 55upx 30upx 15upx;
        border-radius: 10upx;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        margin-top: -45upx;
    }

    .noticer {
        width: 480upx;
        height: 50upx;
    }

    .noticer .swiper-item {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 50upx;
        line-height: 50upx;
        font-size: 24upx;
    }

    .list {
        padding: 50upx 20upx 20upx;
    }

    .listm {
        background: #fff;
        border-radius: 15upx;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        margin-bottom: 20upx;
        padding: 30upx;
    }

    .listmpic {
        border-radius: 10upx;
        width: 166upx;
    }

    .listmr {
        width: 460upx;
        display: inline-block;
    }

    /* #ifdef MP-WEIXIN */
    .noticer .swiper-item {
        margin-top: 5upx;
    }

    /* #endif */
    /* #ifdef MP-BAIDU */
    .noticer .swiper-item {
        margin-top: 3upx;
    }

    /* #endif */
    /* #ifdef MP-ALIPAY */
    .noticer .swiper-item {
        margin-top: 2upx;
    }

    /* #endif */
    /* #ifdef MP-QQ */
    .noticer .swiper-item {
        margin-top: 4upx;
    }

    /* #endif */
    /* #ifdef MP-TOUTIAO */
    .noticer .swiper-item {
        margin-top: 4upx;
    }

    /* #endif */
</style>
