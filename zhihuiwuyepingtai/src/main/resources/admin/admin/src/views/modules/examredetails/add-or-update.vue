<template>
    <div class="addEdit-block">
        <el-form
                class="detail-form-content"
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="80px"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="问卷编号" prop="examredetailsUuidNumber">
                        <el-input v-model="ruleForm.examredetailsUuidNumber"
                                  placeholder="问卷编号" clearable  :readonly="ro.examredetailsUuidNumber"></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="问卷编号" prop="examredetailsUuidNumber">
                            <el-input v-model="ruleForm.examredetailsUuidNumber"
                                      placeholder="问卷编号" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'"  label="问题表" prop="examquestionId">
                        <el-select v-model="ruleForm.examquestionId" placeholder="请选择问题表" @change="examquestionChange">
                            <el-option
                                    v-for="(item,index) in examquestionOptions"
                                    v-bind:key="item.id"
                                    :label="item.examquestionName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="问题名称" prop="examquestionName">
                        <el-input v-model="examquestionForm.examquestionName"
                                  placeholder="问题名称" clearable  :readonly="ro.examquestionName" readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="问题名称" prop="examquestionName">
                            <el-input
                                    type="textarea"
                                    min="1"
                                    v-model="ruleForm.examquestionName"
                                    placeholder="问题名称"
                                    clearable
                                    readonly
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="24">
                    <el-form-item  v-if="type=='info'&&(ruleForm.examquestionTypes==1||ruleForm.examquestionTypes==2||ruleForm.examquestionTypes==3)" label="选项" prop="examquestionOptions">
                        <div class="options" v-for="(item,index) in options" v-bind:key="index">
                            {{item.code}}. {{item.text}}
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="正确答案" prop="examquestionAnswer">
                        <el-input v-model="examquestionForm.examquestionAnswer"
                                  placeholder="正确答案" clearable  :readonly="ro.examquestionAnswer" readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="正确答案" prop="examquestionAnswer">
                            <el-input v-model="ruleForm.examquestionAnswer"
                                      placeholder="正确答案" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="答案解析" prop="examquestionAnalysis">
                        <el-input v-model="examquestionForm.examquestionAnalysis"
                                  placeholder="答案解析" clearable  :readonly="ro.examquestionAnalysis" readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="答案解析" prop="examquestionAnalysis">
                            <el-input
                                    type="textarea"
                                    min="1"
                                    v-model="ruleForm.examquestionAnalysis"
                                    placeholder="答案解析"
                                    clearable
                                    readonly
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="问题排序" prop="examquestionSequence">
                        <el-input v-model="examquestionForm.examquestionSequence"
                                  placeholder="问题排序，值越大排越前面" clearable  :readonly="ro.examquestionSequence" readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="问题排序" prop="examquestionSequence">
                            <el-input v-model="ruleForm.examquestionSequence"
                                      placeholder="问题排序，" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>

                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'"  label="用户" prop="yonghuId">
                        <el-select v-model="ruleForm.yonghuId" placeholder="请选择用户" @change="yonghuChange">
                            <el-option
                                    v-for="(item,index) in yonghuOptions"
                                    v-bind:key="item.id"
                                    :label="item.yonghuName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="用户姓名" prop="yonghuName">
                        <el-input v-model="yonghuForm.yonghuName"
                                  placeholder="用户姓名" clearable  :readonly="ro.yonghuName" readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="用户姓名" prop="yonghuName">
                            <el-input v-model="ruleForm.yonghuName"
                                      placeholder="用户姓名" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <input id="updateId" name="id" type="hidden">

                <input id="yonghuId" name="yonghuId" type="hidden">
                <input id="examquestionId" name="examquestionId" type="hidden">
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="考生答案" prop="examredetailsMyanswer">
                        <el-input v-model="ruleForm.examredetailsMyanswer"
                                  placeholder="考生答案" clearable  :readonly="ro.examredetailsMyanswer"></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="考生答案" prop="examredetailsMyanswer">
                            <el-input v-model="ruleForm.examredetailsMyanswer"
                                      placeholder="考生答案" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'"  label="问题得分" prop="examredetailsMyscore">
                        <el-input v-model="ruleForm.examredetailsMyscore"
                                  placeholder="问题得分" clearable  :readonly="ro.examredetailsMyscore"></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="问题得分" prop="examredetailsMyscore">
                            <el-input v-model="ruleForm.examredetailsMyscore"
                                      placeholder="问题得分" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>


            </el-row>
            <el-form-item class="btn">
                <el-button v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
                <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
                <el-button v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>
<script>
    import styleJs from "../../../utils/style.js";
    // 数字，邮件，手机，url，身份证校验
    import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
    import utilsJs, {getYearFormat,getMonthFormat,getDateFormat,getDatetimeFormat} from "../../../utils/utils.js";
    export default {
        data() {
            let self = this
            var validateIdCard = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (!checkIdCard(value)) {
                    callback(new Error("请输入正确的身份证号码"));
                } else {
                    callback();
                }
            };
            var validateUrl = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (!isURL(value)) {
                    callback(new Error("请输入正确的URL地址"));
                } else {
                    callback();
                }
            };
            var validateMobile = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (!isMobile(value)) {
                    callback(new Error("请输入正确的手机号码"));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (!isPhone(value)) {
                    callback(new Error("请输入正确的电话号码"));
                } else {
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (!isEmail(value)) {
                    callback(new Error("请输入正确的邮箱地址"));
                } else {
                    callback();
                }
            };
            var validateNumber = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (!isNumber(value)) {
                    callback(new Error("请输入数字"));
                } else {
                    callback();
                }
            };
            var validateIntNumber = (rule, value, callback) => {
                if(!value){
                    callback();
                } else if (!isIntNumer(value)) {
                    callback(new Error("请输入整数"));
                } else {
                    callback();
                }
            };
            return {
                addEditForm:null,
                id: '',
                type: '',
                examquestionForm: {},
                yonghuForm: {},
                ro:{
                    examredetailsUuidNumber: false,
                    yonghuId: false,
                    examquestionId: false,
                    examredetailsMyanswer: false,
                    examredetailsMyscore: false,
                },
                ruleForm: {
                    examredetailsUuidNumber: '',
                    yonghuId: '',
                    examquestionId: '',
                    examredetailsMyanswer: '',
                    examredetailsMyscore: '',
                },
                examquestionOptions : [],
                yonghuOptions : [],
                rules: {
                    examredetailsUuidNumber: [
                        { required: true, message: '问卷编号不能为空', trigger: 'blur' },
                    ],
                    yonghuId: [
                        { required: true, message: '用户id不能为空', trigger: 'blur' },
                    ],
                    examquestionId: [
                        { required: true, message: '问题id（外键）不能为空', trigger: 'blur' },
                    ],
                    examredetailsMyanswer: [
                        { required: true, message: '考生答案不能为空', trigger: 'blur' },
                    ],
                    examredetailsMyscore: [
                        { required: true, message: '问题得分不能为空', trigger: 'blur' },
                    ],
                }
            };
        },
        props: ["parent"],
        computed: {
        },
        created() {
            this.addEditForm = styleJs.addStyle();
            this.addEditStyleChange()
            this.addEditUploadStyleChange()
            //获取下拉框信息

            this.$http({
                url: `examquestion/page?page=1&limit=100`,
                method: "get"
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.examquestionOptions = data.data.list;
                }
            });

            this.$http({
                url: `yonghu/page?page=1&limit=100`,
                method: "get"
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.yonghuOptions = data.data.list;
                }
            });

        },
        methods: {
            // 下载
            download(file){

                window.open(" ${file} ")
            },
            // 初始化
            init(id,type) {
                if (id) {
                    this.id = id;
                    this.type = type;
                }
                if(this.type=='info'||this.type=='else'){
                    this.info(id);
                }else if(this.type=='cross'){
                    var obj = this.$storage.getObj('crossObj');
                    for (var o in obj){

                        if(o=='examredetailsUuidNumber'){
                            this.ruleForm.examredetailsUuidNumber = obj[o];
                            this.ro.examredetailsUuidNumber = true;
                            continue;
                        }
                        if(o=='yonghuId'){
                            this.ruleForm.yonghuId = obj[o];
                            this.ro.yonghuId = true;
                            continue;
                        }
                        if(o=='examquestionId'){
                            this.ruleForm.examquestionId = obj[o];
                            this.ro.examquestionId = true;
                            continue;
                        }
                        if(o=='examredetailsMyanswer'){
                            this.ruleForm.examredetailsMyanswer = obj[o];
                            this.ro.examredetailsMyanswer = true;
                            continue;
                        }
                        if(o=='examredetailsMyscore'){
                            this.ruleForm.examredetailsMyscore = obj[o];
                            this.ro.examredetailsMyscore = true;
                            continue;
                        }
                    }
                }
                // 获取用户信息
                this.$http({
                    url:`${this.$storage.get("sessionTable")}/session`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        var json = data.data;
                    } else {
                        this.$message.error(data.msg);
                    }
                });


            },
            examquestionChange(id){
                this.$http({
                    url: `examquestion/info/`+id,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.examquestionForm = data.data;
                    }
                });
            },
            yonghuChange(id){
                this.$http({
                    url: `yonghu/info/`+id,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.yonghuForm = data.data;
                    }
                });
            },
            // 多级联动参数
            info(id) {
                this.$http({
                    url: `examredetails/info/${id}`,
                    method: 'get'
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.ruleForm = data.data;
                        this.examquestionChange(data.data.examquestionId)
                        this.yonghuChange(data.data.yonghuId)
                        this.options = JSON.parse(this.ruleForm.examquestionOptions)
                        //解决前台上传图片后台不显示的问题
                        let reg=new RegExp('../../../upload','g')//g代表全部
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            // 提交
            onSubmit() {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$http({
                            url:`examredetails/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: this.ruleForm
                        }).then(({ data }) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.parent.showFlag = true;
                                        this.parent.addOrUpdateFlag = false;
                                        this.parent.examredetailsCrossAddOrUpdateFlag = false;
                                        this.parent.search();
                                        this.parent.contentStyleChange();
                                    }
                                });
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }
                });
            },
            // 获取uuid
            getUUID () {
                return new Date().getTime();
            },
            // 返回
            back() {
                this.parent.showFlag = true;
                this.parent.addOrUpdateFlag = false;
                this.parent.examredetailsCrossAddOrUpdateFlag = false;
                this.parent.contentStyleChange();
            },
            //图片

            addEditStyleChange() {
                this.$nextTick(()=>{
                    // input
                    document.querySelectorAll('.addEdit-block .input .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputFontColor
                        el.style.fontSize = this.addEditForm.inputFontSize
                        el.style.borderWidth = this.addEditForm.inputBorderWidth
                        el.style.borderStyle = this.addEditForm.inputBorderStyle
                        el.style.borderColor = this.addEditForm.inputBorderColor
                        el.style.borderRadius = this.addEditForm.inputBorderRadius
                        el.style.backgroundColor = this.addEditForm.inputBgColor
                    })
                    document.querySelectorAll('.addEdit-block .input .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputLableColor
                        el.style.fontSize = this.addEditForm.inputLableFontSize
                    })
                    // select
                    document.querySelectorAll('.addEdit-block .select .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectFontColor
                        el.style.fontSize = this.addEditForm.selectFontSize
                        el.style.borderWidth = this.addEditForm.selectBorderWidth
                        el.style.borderStyle = this.addEditForm.selectBorderStyle
                        el.style.borderColor = this.addEditForm.selectBorderColor
                        el.style.borderRadius = this.addEditForm.selectBorderRadius
                        el.style.backgroundColor = this.addEditForm.selectBgColor
                    })
                    document.querySelectorAll('.addEdit-block .select .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectLableColor
                        el.style.fontSize = this.addEditForm.selectLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .select .el-select__caret').forEach(el=>{
                        el.style.color = this.addEditForm.selectIconFontColor
                        el.style.fontSize = this.addEditForm.selectIconFontSize
                    })
                    // date
                    document.querySelectorAll('.addEdit-block .date .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateFontColor
                        el.style.fontSize = this.addEditForm.dateFontSize
                        el.style.borderWidth = this.addEditForm.dateBorderWidth
                        el.style.borderStyle = this.addEditForm.dateBorderStyle
                        el.style.borderColor = this.addEditForm.dateBorderColor
                        el.style.borderRadius = this.addEditForm.dateBorderRadius
                        el.style.backgroundColor = this.addEditForm.dateBgColor
                    })
                    document.querySelectorAll('.addEdit-block .date .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateLableColor
                        el.style.fontSize = this.addEditForm.dateLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .date .el-input__icon').forEach(el=>{
                        el.style.color = this.addEditForm.dateIconFontColor
                        el.style.fontSize = this.addEditForm.dateIconFontSize
                        el.style.lineHeight = this.addEditForm.dateHeight
                    })
                    // upload
                    let iconLineHeight = parseInt(this.addEditForm.uploadHeight) - parseInt(this.addEditForm.uploadBorderWidth) * 2 + 'px'
                    document.querySelectorAll('.addEdit-block .upload .el-upload--picture-card').forEach(el=>{
                        el.style.width = this.addEditForm.uploadHeight
                        el.style.height = this.addEditForm.uploadHeight
                        el.style.borderWidth = this.addEditForm.uploadBorderWidth
                        el.style.borderStyle = this.addEditForm.uploadBorderStyle
                        el.style.borderColor = this.addEditForm.uploadBorderColor
                        el.style.borderRadius = this.addEditForm.uploadBorderRadius
                        el.style.backgroundColor = this.addEditForm.uploadBgColor
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.uploadHeight
                        el.style.color = this.addEditForm.uploadLableColor
                        el.style.fontSize = this.addEditForm.uploadLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-icon-plus').forEach(el=>{
                        el.style.color = this.addEditForm.uploadIconFontColor
                        el.style.fontSize = this.addEditForm.uploadIconFontSize
                        el.style.lineHeight = iconLineHeight
                        el.style.display = 'block'
                    })
                    // 多文本输入框
                    document.querySelectorAll('.addEdit-block .textarea .el-textarea__inner').forEach(el=>{
                        el.style.height = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaFontColor
                        el.style.fontSize = this.addEditForm.textareaFontSize
                        el.style.borderWidth = this.addEditForm.textareaBorderWidth
                        el.style.borderStyle = this.addEditForm.textareaBorderStyle
                        el.style.borderColor = this.addEditForm.textareaBorderColor
                        el.style.borderRadius = this.addEditForm.textareaBorderRadius
                        el.style.backgroundColor = this.addEditForm.textareaBgColor
                    })
                    document.querySelectorAll('.addEdit-block .textarea .el-form-item__label').forEach(el=>{
                        // el.style.lineHeight = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaLableColor
                        el.style.fontSize = this.addEditForm.textareaLableFontSize
                    })
                    // 保存
                    document.querySelectorAll('.addEdit-block .btn .btn-success').forEach(el=>{
                        el.style.width = this.addEditForm.btnSaveWidth
                        el.style.height = this.addEditForm.btnSaveHeight
                        el.style.color = this.addEditForm.btnSaveFontColor
                        el.style.fontSize = this.addEditForm.btnSaveFontSize
                        el.style.borderWidth = this.addEditForm.btnSaveBorderWidth
                        el.style.borderStyle = this.addEditForm.btnSaveBorderStyle
                        el.style.borderColor = this.addEditForm.btnSaveBorderColor
                        el.style.borderRadius = this.addEditForm.btnSaveBorderRadius
                        el.style.backgroundColor = this.addEditForm.btnSaveBgColor
                    })
                    // 返回
                    document.querySelectorAll('.addEdit-block .btn .btn-close').forEach(el=>{
                        el.style.width = this.addEditForm.btnCancelWidth
                        el.style.height = this.addEditForm.btnCancelHeight
                        el.style.color = this.addEditForm.btnCancelFontColor
                        el.style.fontSize = this.addEditForm.btnCancelFontSize
                        el.style.borderWidth = this.addEditForm.btnCancelBorderWidth
                        el.style.borderStyle = this.addEditForm.btnCancelBorderStyle
                        el.style.borderColor = this.addEditForm.btnCancelBorderColor
                        el.style.borderRadius = this.addEditForm.btnCancelBorderRadius
                        el.style.backgroundColor = this.addEditForm.btnCancelBgColor
                    })
                })
            },
            addEditUploadStyleChange() {
                this.$nextTick(()=>{
                    document.querySelectorAll('.addEdit-block .upload .el-upload-list--picture-card .el-upload-list__item').forEach(el=>{
                        el.style.width = this.addEditForm.uploadHeight
                        el.style.height = this.addEditForm.uploadHeight
                        el.style.borderWidth = this.addEditForm.uploadBorderWidth
                        el.style.borderStyle = this.addEditForm.uploadBorderStyle
                        el.style.borderColor = this.addEditForm.uploadBorderColor
                        el.style.borderRadius = this.addEditForm.uploadBorderRadius
                        el.style.backgroundColor = this.addEditForm.uploadBgColor
                    })
                })
            },
        }
    };
</script><style lang="scss">
.editor{
  height: 500px;

  & /deep/ .ql-container {
	  height: 310px;
  }
}
.amap-wrapper {
  width: 100%;
  height: 500px;
}
.search-box {
  position: absolute;
}
.addEdit-block {
	margin: -10px;
}
.detail-form-content {
	padding: 12px;
	background-color: transparent;
}
.btn .el-button {
  padding: 0;
}</style>

