<template>
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">

	<view class="cu-bar bg-white search" :style="[{top:CustomBar + 'px'}]">
        <view class="search-form round">
				<input :style='{"padding":"0 30rpx","boxShadow":"0 0 0px rgba(0,0,0,.6) inset","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"10rpx 2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
						v-model="searchForm.examquestionName" type="text" placeholder="问题名称"></input>
		</view>

        <view class="action">
            <view :style="{width:'40rpx',borderRadius:'40rpx 0 0 40rpx',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
            <view @tap="search" :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'auto',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                搜索
            </view>
            <view v-if="isAuth('examquestion','新增')" @click="onAddTap()"
                  :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'auto',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                新增
            </view>
            <view v-if="isAuth('examquestion','报表')" @tap="openChartDialog" :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'auto',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                报表
            </view>
            <view @click="showDrawer()"
                  :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'auto',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                类型
            </view>
            <view :style="{width:'40rpx',borderRadius:'0 40rpx 40rpx 0',height:'80rpx',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
            </view>
        </view>
	</view>
	<view style="">
            <uni-drawer ref="showRight" mode="left" :maskClick="true" :width="100" :mask-click="true">
                <scroll-view scroll-y="true" class="tabView" :style='{"padding":"0","boxShadow":"0 0 12rpx rgba(255,0,0,0)","margin":"10rpx 0 0 ","borderColor":"rgba(0,0,0,1)","borderRadius":"0","borderWidth":"0","borderStyle":"solid","height":"auto"}'>
                    <view style="display: flex;">
                        <view style="display: flex;flex-direction: column;width: 100%;">
                            <view :style='examquestionTypes===item.codeIndex?sactiveItem:sitem' class="tab"
                                  v-for="(item,index) in examquestionTypesList" :key="index" :class="examquestionTypes===item.codeIndex?'tabActive':''"
                                  @tap="examquestionTypesCategoryClick(item.codeIndex)">
                                {{item.indexName}}
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </uni-drawer>
        <view style="padding: 0 20rpx;width: 100%;margin: 0 auto;;flex-direction: column;flex-wrap: wrap;flex-direction: row;margin-top: 0upx;">
            <view class="list b-b" v-for="(item, index) in list" :key="index" style="width:100%;height: auto;border: 1rps solid #999;margin: 0 auto;background-color: #FFFFFF;margin-top: 10rpx; box-shadow: 0  0 10rpx 0 #999999;border-radius: 25rpx;">
                <view
                        style="margin-bottom: 25rpx;display: flex;justify-content: space-between;align-items: center;">
                    <h4>{{ item.examquestionName }}</h4>
                    <view>
                        <uni-icons v-show="isAuth('examquestion','删除')" @tap="onDeleteTap(item.id)" type="closeempty"
                                   size="20"></uni-icons>
                    </view>
                </view>
                <!-- 级联表 -->
                <!-- 当前表 -->
                 <view v-show="item.kemuValue" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">科目</text>
                     <text style="width: 70%">{{item.kemuValue}}</text>
                 </view>
                 <view v-show="item.examquestionOptions" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">选项，json字符串</text>
                     <text style="width: 70%">
                         <text v-if="item.examquestionOptions != null">{{item.examquestionOptions}}</text>
                         <text v-else></text>
                     </text>
                 </view>
                 <view v-show="item.examquestionAnswer" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">正确答案</text>
                     <text style="width: 70%">
                         <text v-if="item.examquestionAnswer != null">{{item.examquestionAnswer}}</text>
                         <text v-else></text>
                     </text>
                 </view>
                 <view v-show="item.examquestionAnalysis" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">答案解析</text>
                     <text style="width: 70%">
                         <text v-if="item.examquestionAnalysis != null">{{item.examquestionAnalysis}}</text>
                         <text v-else></text>
                     </text>
                 </view>
                 <view v-show="item.examquestionValue" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">问题类型</text>
                     <text style="width: 70%">{{item.examquestionValue}}</text>
                 </view>
                 <view v-show="item.examquestionSequence" style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;">
                     <text style="width: 25%;margin-right: 5%;">问题排序，值越大排越前面</text>
                     <text style="width: 70%">{{item.examquestionSequence}}</text>
                 </view>
            <view style="display: flex;justify-content: space-between;align-items: center;margin-top: 15rpx;font-size: 24rpx;color: #8799A3;">
                <text v-show="item.createTime">{{item.createTime}}</text>
                <uni-icons v-show="isAuth('examquestion','修改')" @tap="onUpdateTap(item.id)" type="compose" size="20">
                </uni-icons>
                <!--<view v-if="isAuth('examquestion','审核') && item.examquestionYesnoTypes==1" class="" style="display: flex; width: 70%;color: #FFFFFF;">
                    <view @tap="onShenhe(item,2)" :style="[{backgroundImage:'linear-gradient(40deg,'+ btnColor[0] +','+ btnColor[1] +')'}]" style="width:47%;height: 80rpx;line-height: 80rpx;text-align: center;border-bottom-left-radius: 40rpx;border-top-left-radius: 40rpx;">
                        同意
                    </view>
                    <view @tap="onShenhe(item,3)" :style="[{backgroundImage:'linear-gradient(130deg,'+ btnColor[1] +','+ btnColor[0] +')'}]" style="width: 47%;height: 80rpx;line-height: 80rpx;text-align: center;border-bottom-right-radius: 40rpx;border-top-right-radius: 40rpx;">
                        拒绝
                    </view>
                </view>
                <text>请耐心等待审核</text>
                -->
            </view>
        </view>
    </view>
	</view>
        <!--   报表    -->
        <uni-popup class="popup-content" ref="chartDialogRef" type="center">
            <form class="popup-form">
                <view class="uni-flex uni-column" :style="[{'width':aaaaaaaa+'rpx'}]" style="background-color: #FFFFFF;border-radius: 10rpx;height: auto;">
                    <view class="flex-item flex-item-V" style="text-align: center;font-size: 40upx;font-weight: bold;margin: 20upx;">报表模态框</view>
                    <view class="action" style="display: flex;">
                        <text style="width: 15%;text-align: center;">月</text>
                        <input style="width: 65%;" :style='{"padding":"0 30rpx","boxShadow":"0 0 16rpx var(--publicSubColor) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"var(--publicMainColor)","borderRadius":"20rpx","color":"var(--publicMainColor)","textAlign":"left","borderWidth":"2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                               v-model="echartsDate" placeholder="月" @tap="toggleTab('echartsDate')"></input>
                        <view @click="chartDialog()"
                              :style="{padding:'0 10rpx',lineHeight:'80rpx',width:'20%',height:'80rpx',fontSize:'28rpx',color:'rgba(239, 239, 239, 1)',backgroundColor:btnColor[0],borderColor:btnColor[0]}">
                            查询
                        </view>
                    </view>
                    <view style="margin: 0 auto;">
                        <qiun-data-charts  type="pie" :opts="opts" :chartData="chartData" />
                    </view>
                    <view class="flex-item flex-item-V" style="text-align: right;background: #FFFFFF;">
                        <button @tap="closeDialog" style="margin: 0 0 10rpx 50rpx;" class="cu-btn bg-cyan">关闭</button>
                    </view>
                </view>
            </form>
        </uni-popup>
        <w-picker mode="yearMonth" ref="echartsDate" @confirm="echartsDateConfirm" step="1" :current="false" :hasSecond="false" themeColor="#333333"></w-picker>
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
                user:{},//当前登录表的所有参数
                sessionTable : uni.getStorageSync("nowTable"),//登录账户所在表名
                role : uni.getStorageSync("role"),//权限
                userId:uni.getStorageSync("userid"),//当前登录人的id
                btnColor: ['#67c23a', '#909399', '#e6a23c', '#f56c6c', '#356c6c', '#3498db', '#f093a9',
                    '#a7c23a', '#104eff', '#90f794', '#a21233', '#8e44ad'
                ],
				queryList: [{
						queryName: "问题表名称",
					}
				],
                sactiveItem: {
                    "padding": "0",
                    "boxShadow": "0 0 0px rgba(0,0,0,.3)",
                    "margin": "0 10rpx",
                    "borderColor": "rgba(0,0,0,1)",
                    "backgroundColor": "var(--publicMainColor)",
                    "color": "#fff",
                    "borderRadius": "0 40rpx 40rpx 0",
                    "borderWidth": "0",
                    "width": "auto",
                    "lineHeight": "160rpx",
                    "fontSize": "28rpx",
                    "borderStyle": "solid"
                },
                sitem: {
                    "padding": "0",
                    "boxShadow": "0 0 0px rgba(0,0,0,.3)",
                    "margin": "0 10rpx",
                    "borderColor": "rgba(0,0,0,1)",
                    "backgroundColor": "var(--publicSubColor)",
                    "color": "#fff",
                    "borderRadius": "0 40rpx 40rpx 0",
                    "borderWidth": "0",
                    "width": "auto",
                    "lineHeight": "160rpx",
                    "fontSize": "28rpx",
                    "borderStyle": "solid"
                },

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
				/*1111*/
				kemuTypesList: [],
				examquestionTypesList: [],
                examquestionTypes: 0,

				CustomBar: '0',
                // 报表
                echartsDate:null,//时间框
                chartData: {},//数据
                //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
                opts: {
                    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
                    enableScroll: false,
                    // //柱状图
                    // padding:[15,15,0,5],legend:{},xAxis:{disableGrid:true},yAxis:{data:[{min:0}]},extra:{column:{type:"group",width:30,activeBgColor:"#000000",activeBgOpacity:0.08}},
                    //饼状图
                    extra:{pie:{activeOpacity:0.5,activeRadius:10,offsetAngle:0,labelWidth:15,border:false,borderWidth:3,borderColor:"#FFFFFF"}},
                }
			};
		},
        computed: {
            baseUrl() {
                return this.$base.url;
            },
        },
		async onShow() {
			this.btnColor = this.btnColor.sort(() => {
				return (0.5 - Math.random());
			});

            let _this = this
            let table = uni.getStorageSync("nowTable");
            // 获取用户信息
            let resA = await _this.$api.session(table);
            _this.user = resA.data;
            _this.btnColor = _this.btnColor.sort(() => {
                return (0.5 - Math.random());
            });

                //当前表的 问题类型 字段 字典表查询方法
                this.examquestionTypesSelect()



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
            //报表开始
            async openChartDialog() {//打开报表并查询数据
                this.echartsDate=this.$utils.getMonthFormat();//初始化年月
                this.chartDialog();//查询数据
                this.$refs.chartDialogRef.open()//打开模态框
            },
            closeDialog() {//关闭报表模态框
                this.$refs.chartDialogRef.close()
            },
            async chartDialog() {
                let _this= this;
                let res = await _this.$api.requestConditionDataGet("",'newSelectGroupSum',null,{
                    tableName:'examquestion_shouzhi',
                    groupColumn:'examquestion_types',
                    // sumColumn:'examquestion_number',
                    riqi:_this.echartsDate,
                    // yonghuId:_this.userId,
                });
                let data = {series: [{data:res.data}]};
                _this.chartData = JSON.parse(JSON.stringify(data));//json转
            },
            // 日期控件
            echartsDateConfirm(val) {
                this.echartsDate = val.result;this.$forceUpdate();
            },
            //报表结束
            //类型条件查询
            async showDrawer() {
                this.$refs.showRight.open();
            },
            async closeDrawer() {
                this.$refs.showRight.close();
            },
            //下载
            download(url) {
                let _this = this;
                uni.downloadFile({
                    url: url,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            _this.$utils.msg('下载成功');
                            // window.open(url);
                        }
                    }
                });
            },
            //当前表的 问题类型 字段 字典表查询方法
            async examquestionTypesSelect(){
                let examquestionTypes = await this.$api.page('dictionary', {
                    page: 1,
                    limit: 100,
                    dicCode:'examquestion_types',
                });
                examquestionTypes.data.list.splice(0, 0, {codeIndex: 0, indexName: '全部'})
                this.examquestionTypesList = examquestionTypes.data.list
            },
            //当前表的 问题类型字段类别搜索
			examquestionTypesCategoryClick(categoryName) {
                this.examquestionTypes = categoryName;
                this.mescroll.resetUpScroll();
            },
            //查询条件切换
            queryChange(e) {
                this.searchForm.examquestionName = "";
            },
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
				let params = {
					page: mescroll.num,
					limit: mescroll.size,
				}

                if (this.examquestionTypes != 0) {
                    params.examquestionTypes = this.examquestionTypes
                }
                let _this = this
                let res = await this.$api.page(`examquestion`, params);
                res.data.list.forEach(function(item,index){
                })

                if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			//添加地址
            onSelectTap(item) {
                uni.setStorageSync('address', item);
                uni.navigateBack({
                    delta: 1
                })
            },
			// 详情

			onDetailTap(item) {
				this.$utils.jump(`./detail?id=${item.id}`)
			},
			// 修改
			onUpdateTap(id) {
				this.$utils.jump(`./add-or-update?id=${id}`)
			},
			// 添加
			onAddTap() {
				this.$utils.jump(`./add-or-update`)
			},
			onDeleteTap(id) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: async function(res) {
						if (res.confirm) {
							await _this.$api.del('examquestion', JSON.stringify([id]));
							_this.hasNext = true
							// 重置分页参数页数为1
							_this.mescroll.resetUpScroll()
						}
					}
				});
			},
            onShenhe(data,shenheTypes) {
                var _this = this;
                uni.showModal({
                    title: '提示',
                    content: '确定要这个审核状态么?',
                    success: async function(res) {
                        if (res.confirm) {
                            var currentTime = new Date();
                            var year = currentTime.getFullYear();
                            var month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1;
                            var day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
                            var hour = currentTime.getHours();
                            var minute = currentTime.getMinutes();
                            var second = currentTime.getSeconds();
                            var shijian=year + "-" + month + "-" + day + " " +hour +":" +minute+":"+second;

                            data.examquestionYesnoTypes=shenheTypes;
                            data.examquestionShenheTime=shijian;
                            await _this.$api.update(`examquestion`, data);
                            _this.hasNext = true
                            // 重置分页参数页数为1
                            _this.mescroll.resetUpScroll()
                        }
                    }
                });
            },
			// 搜索
			async search() {
				this.mescroll.num = 1
				let searchForm = {
					page: this.mescroll.num,
					limit: this.mescroll.size
				}
				if (this.searchForm.examquestionName) {
                    searchForm['examquestionName'] = this.searchForm.examquestionName
                }

                let res = await this.$api.page(`examquestion`, searchForm);
                let _this = this
                res.data.list.forEach(function(item,index){
                })
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
			},
            toggleTab(str) {
                this.$refs[str].show();
            },
		}
	};
</script>

<style>
    /* product */
    page {
        background: #EEEEEE;
    }

    view {
        font-size: 28upx;
    }

    .daxiao{
        width: 100%;
        padding: 0 10rpx;
    }

    /* 按钮条件查询样式------------------------开始 */
    .tabView {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 60upx;
        margin-bottom: 20upx;
        white-space: nowrap;
        box-shadow: 0px 1px 14px 0px rgba(38, 38, 35, 0.07);
        margin-top: 6upx;
    }
    .tab {
        text-align: center;
        display: inline-block;
        margin: 0 12rpx 8rpx 0;
        padding: 0 10rpx;
        width: auto;
        line-height: 160rpx;
        color: #fff;
        font-size: 28rpx;
        border-radius: 0 40rpx 40rpx 0;
        border-width: 0;
        border-style: solid;
        border-color: rgba(0,0,0,1);
        background-color: var(--publicSubColor);
        box-shadow: 0 0 0px rgba(0,0,0,.3);
    }
    .tabActive{
        margin: 0 12rpx 8rpx 0;
        padding: 0 10rpx;
        width: auto;
        line-height: 160rpx;
        color: #fff;
        font-size: 28rpx;
        border-radius: 0 40rpx 40rpx 0;
        border-width: 0;
        border-style: solid;
        border-color: rgba(0,0,0,1);
        background-color: var(--publicMainColor);
        box-shadow: 0 0 0px rgba(0,0,0,.3);
    }
    /* 按钮条件查询样式------------------------结束 */

    .tab:last-of-type {
        border: none;
    }

    .uni-product-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        margin-top: 0upx;
    // justify-content: space-around;
    }

    .uni-product {
        padding: 10upx;
        margin: 10upx;
        display: flex;
        flex-direction: column;
        background: #FFFFFF;
    }

    .image-view {
        height: 330upx;
        width: 330upx;
        margin: 12upx 0;
    }

    .uni-product-image {
        height: 330upx;
        width: 330upx;
    }

    .uni-product-title {
        width: 300upx;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .uni-product-price {
        margin-top: 10upx;
        font-size: 28upx;
        line-height: 1.5;
        position: relative;
    }

    .uni-product-price-original {
        color: #e80080;
    }

    .uni-product-price-favour {
        color: #888888;
        text-decoration: line-through;
        margin-left: 10upx;
    }

    .uni-product-tip {
        position: absolute;
        right: 10upx;
        background-color: #ff3333;
        color: #ffffff;
        padding: 0 10upx;
        border-radius: 5upx;
    }

    uni-image > div, uni-image > img {
        width: 100%;
        height: 140px;
        object-fit: cover;
    }

    .add-btn {
        position: fixed;
        left: 30upx;
        right: 30upx;
    // #ifndef MP
    bottom: 106upx;
    // #endif
    // #ifdef MP-WEIXIN
    bottom: 16upx;
    // #endif
    z-index: 95;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 690upx;
        height: 80upx;
        font-size: 32upx;
        color: #fff;
        background-color: red;
        border-radius: 10upx;
        box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
    }

    .list {
        padding: 20upx 20upx 20upx;
    }

    .listm {
        background: #fff;
        border-radius: 15upx;
        box-shadow: 0 0 2upx rgba(0, 0, 0, 0.1);
        margin-bottom: 20upx;
        padding: 30upx;
    }

    .listmpic {
        border-radius: 10upx;
        width: 166upx;
        margin-right: 20upx;
    }

    .listmr {
    // width: 460upx;
        display: inline-block;
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .news-box6 .dian::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        background-color: red;
        position: absolute;
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 100%;
        z-index: 1;
    }


    .hide1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .hide2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .hide3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .hide4 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        -webkit-box-orient: vertical;
    }
</style>
