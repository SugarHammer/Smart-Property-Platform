<template>
    <mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

        <view @tap="onDetailTap(item)" style="width: 690rpx;height: auto;border-radius: 15rpx;margin: 0 auto;margin-top: 15rpx;
		box-shadow: 0rpx 0rpx 10rpx 0rpx #8799A3;" class="cu-list menu-avatar" v-for="(item,index) in list" v-bind:key="index">
            <view class="cu-item">
                <view class="content" style="left: 20rpx;">
                    <text class="text-bold">{{ item.examrecordUuidNumber }}</text>
                    <view class="text-grey" style="overflow: hidden;
					 display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 2;
					-webkit-box-orient: vertical">问卷名称：{{item.exampaperName}}</view>
                </view>
                <view class="action" style="width: auto;">
                    <view class="cu-tag round bg-red sm">总分:{{item.totalScore}}</view>
                </view>
            </view>
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
                CustomBar: '0'
            }
        },
        onShow() {
            this.hasNext = true
            // 重新加载数据
            if (this.mescroll) this.mescroll.resetUpScroll()
        },
        onLoad() {
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
                let res = await this.$api.page("examrecord",{
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
            onDetailTap(item) {
                this.$utils.jump(`./detail?item=`+JSON.stringify(item))
            }
        }
    }
</script>

<style>

</style>
