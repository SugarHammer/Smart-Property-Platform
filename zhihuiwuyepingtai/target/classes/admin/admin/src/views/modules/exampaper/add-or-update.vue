<template>
    <div class="addEdit-block">
        <el-form
                class="detail-form-content"
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="auto">
            <el-row>
                <input id="updateId" name="id" type="hidden">
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'" label="问卷名称" prop="exampaperName">
                        <el-input v-model="ruleForm.exampaperName"
                                  placeholder="问卷名称" clearable :readonly="ro.exampaperName"></el-input>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="问卷名称" prop="exampaperName">
                            <el-input v-model="ruleForm.exampaperName"
                                      placeholder="问卷名称" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'" label="问卷时长(分钟)" prop="exampaperDate">
                        <el-input v-model="ruleForm.exampaperDate"
                                  placeholder="问卷时长(分钟)" clearable :readonly="ro.exampaperDate"></el-input>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="问卷时长(分钟)" prop="exampaperDate">
                            <el-input v-model="ruleForm.exampaperDate"
                                      placeholder="问卷时长(分钟)" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type!='info'" label="问卷总分数" prop="exampaperMyscore">
                        <el-input v-model="ruleForm.exampaperMyscore"
                                  placeholder="问卷总分数" clearable :readonly="ro.exampaperMyscore"></el-input>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="问卷总分数" prop="exampaperMyscore">
                            <el-input v-model="ruleForm.exampaperMyscore"
                                      placeholder="问卷总分数" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'" label="科目" prop="kemuTypes">
                        <el-select v-model="ruleForm.kemuTypes" :disabled="ruleForm.exampaperMyscore>0?true:false" placeholder="请选择科目">
                            <el-option
                                    v-for="(item,index) in kemuTypesOptions"
                                    v-bind:key="item.codeIndex"
                                    :label="item.indexName"
                                    :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="科目" prop="kemuValue">
                            <el-input v-model="ruleForm.kemuValue"
                                      placeholder="科目" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'" label="组卷方式" prop="zujuanTypes">
                        <el-select v-model="ruleForm.zujuanTypes" :disabled="ro.zujuanTypes" placeholder="请选择组卷方式">
                            <el-option
                                    v-for="(item,index) in zujuanTypesOptions"
                                    v-bind:key="item.codeIndex"
                                    :label="item.indexName"
                                    :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="组卷方式" prop="zujuanValue">
                            <el-input v-model="ruleForm.zujuanValue"
                                      placeholder="组卷方式" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'" label="问卷状态" prop="exampaperTypes">
                        <el-select v-model="ruleForm.exampaperTypes" :disabled="ro.exampaperTypes"
                                   placeholder="请选择问卷状态">
                            <el-option
                                    v-for="(item,index) in exampaperTypesOptions"
                                    v-bind:key="item.codeIndex"
                                    :label="item.indexName"
                                    :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else-if="type=='info'">
                        <el-form-item class="input" label="问卷状态" prop="exampaperValue">
                            <el-input v-model="ruleForm.exampaperValue"
                                      placeholder="问卷状态" readonly></el-input>
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
    import {isNumber, isIntNumer, isEmail, isPhone, isMobile, isURL, checkIdCard} from "@/utils/validate";
    import utilsJs, {getYearFormat,getMonthFormat,getDateFormat,getDatetimeFormat} from "../../../utils/utils.js";

    export default {
        data() {
            return {
                addEditForm: null,
                id: '',
                type: '',
                sessionTable: "",//登录账户所在表名
                role: "",//权限
                userId: "",//当前登录人的id
                ro: {
                    exampaperName: false,
                    exampaperDate: false,
                    exampaperMyscore: true,
                    kemuTypes: false,
                    exampaperTypes: false,
                    zujuanTypes: false,
                    exampaperDelete: false,
                },
                ruleForm: {
                    exampaperName: '',
                    exampaperDate: '',
                    exampaperMyscore: 0.0,
                    kemuTypes: '',
                    exampaperTypes: '',
                    zujuanTypes: '',
                    exampaperDelete: '',
                },
                kemuTypesOptions: [],
                exampaperTypesOptions: [],
                zujuanTypesOptions: [],
                rules: {
                    exampaperName: [
                        {required: true, message: '问卷名称不能为空', trigger: 'blur'},
                    ],
                    exampaperDate: [
                        {required: true, message: '问卷时长(分钟)不能为空', trigger: 'blur'},
                        {
                            pattern: /^[0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    exampaperMyscore: [
                        {required: true, message: '问卷总分数不能为空', trigger: 'blur'},
                        {
                            pattern: /^[0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    kemuTypes: [
                        {required: true, message: '科目不能为空', trigger: 'blur'},
                        {
                            pattern: /^[0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    exampaperTypes: [
                        {required: true, message: '问卷状态不能为空', trigger: 'blur'},
                        {
                            pattern: /^[0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    zujuanTypes: [
                        {required: true, message: '组卷方式不能为空', trigger: 'blur'},
                        {
                            pattern: /^[0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                    exampaperDelete: [
                        {required: true, message: '逻辑删除（1代表未删除 2代表已删除）不能为空', trigger: 'blur'},
                        {
                            pattern: /^[0-9]*$/,
                            message: '只允许输入整数',
                            trigger: 'blur'
                        }
                    ],
                }
            };
        },
        props: ["parent"],
        computed: {},
        created() {
            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");
            this.role = this.$storage.get("role");
            this.userId = this.$storage.get("userId");


            if (this.role != "管理员") {
            }
            this.addEditForm = styleJs.addStyle();
            this.addEditStyleChange()
            this.addEditUploadStyleChange()
            //获取下拉框信息
            this.$http({
                url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=kemu_types`,
                method: "get"
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.kemuTypesOptions = data.data.list;
                }
            });
            this.$http({
                url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=exampaper_types`,
                method: "get"
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.exampaperTypesOptions = data.data.list;
                }
            });
            this.$http({
                url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=zujuan_types`,
                method: "get"
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.zujuanTypesOptions = data.data.list;
                }
            });


        },
        mounted() {
        },
        methods: {
            // 下载
            download(file) {
                window.open(" ${file} ")
            },
            // 初始化
            init(id, type) {
                if (id) {
                    this.id = id;
                    this.type = type;
                }
                if (this.type == 'info' || this.type == 'else') {
                    this.info(id);
                }
                // 获取用户信息
                this.$http({
                    url: `${this.$storage.get("sessionTable")}/session`,
                    method: "get"
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        var json = data.data;
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            // 多级联动参数
            info(id) {
                let _this = this;
                _this.$http({
                    url: `exampaper/info/${id}`,
                    method: 'get'
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        _this.ruleForm = data.data;
                    } else {
                        _this.$message.error(data.msg);
                    }
                });
            },
            // 提交
            onSubmit() {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$http({
                            url: `exampaper/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: this.ruleForm
                        }).then(({data}) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.parent.showFlag = true;
                                        this.parent.addOrUpdateFlag = false;
                                        this.parent.exampaperCrossAddOrUpdateFlag = false;
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
            getUUID() {
                return new Date().getTime();
            },
            // 返回
            back() {
                this.parent.showFlag = true;
                this.parent.addOrUpdateFlag = false;
                this.parent.exampaperCrossAddOrUpdateFlag = false;
                this.parent.contentStyleChange();
            },
            //图片

            addEditStyleChange() {
                this.$nextTick(() => {
                    // input
                    document.querySelectorAll('.addEdit-block .input .el-input__inner').forEach(el => {
                        el.style.height = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputFontColor
                        el.style.fontSize = this.addEditForm.inputFontSize
                        el.style.borderWidth = this.addEditForm.inputBorderWidth
                        el.style.borderStyle = this.addEditForm.inputBorderStyle
                        el.style.borderColor = this.addEditForm.inputBorderColor
                        el.style.borderRadius = this.addEditForm.inputBorderRadius
                        el.style.backgroundColor = this.addEditForm.inputBgColor
                    })
                    document.querySelectorAll('.addEdit-block .input .el-form-item__label').forEach(el => {
                        el.style.lineHeight = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputLableColor
                        el.style.fontSize = this.addEditForm.inputLableFontSize
                    })
                    // select
                    document.querySelectorAll('.addEdit-block .select .el-input__inner').forEach(el => {
                        el.style.height = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectFontColor
                        el.style.fontSize = this.addEditForm.selectFontSize
                        el.style.borderWidth = this.addEditForm.selectBorderWidth
                        el.style.borderStyle = this.addEditForm.selectBorderStyle
                        el.style.borderColor = this.addEditForm.selectBorderColor
                        el.style.borderRadius = this.addEditForm.selectBorderRadius
                        el.style.backgroundColor = this.addEditForm.selectBgColor
                    })
                    document.querySelectorAll('.addEdit-block .select .el-form-item__label').forEach(el => {
                        el.style.lineHeight = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectLableColor
                        el.style.fontSize = this.addEditForm.selectLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .select .el-select__caret').forEach(el => {
                        el.style.color = this.addEditForm.selectIconFontColor
                        el.style.fontSize = this.addEditForm.selectIconFontSize
                    })
                    // date
                    document.querySelectorAll('.addEdit-block .date .el-input__inner').forEach(el => {
                        el.style.height = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateFontColor
                        el.style.fontSize = this.addEditForm.dateFontSize
                        el.style.borderWidth = this.addEditForm.dateBorderWidth
                        el.style.borderStyle = this.addEditForm.dateBorderStyle
                        el.style.borderColor = this.addEditForm.dateBorderColor
                        el.style.borderRadius = this.addEditForm.dateBorderRadius
                        el.style.backgroundColor = this.addEditForm.dateBgColor
                    })
                    document.querySelectorAll('.addEdit-block .date .el-form-item__label').forEach(el => {
                        el.style.lineHeight = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateLableColor
                        el.style.fontSize = this.addEditForm.dateLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .date .el-input__icon').forEach(el => {
                        el.style.color = this.addEditForm.dateIconFontColor
                        el.style.fontSize = this.addEditForm.dateIconFontSize
                        el.style.lineHeight = this.addEditForm.dateHeight
                    })
                    // upload
                    let iconLineHeight = parseInt(this.addEditForm.uploadHeight) - parseInt(this.addEditForm.uploadBorderWidth) * 2 + 'px'
                    document.querySelectorAll('.addEdit-block .upload .el-upload--picture-card').forEach(el => {
                        el.style.width = this.addEditForm.uploadHeight
                        el.style.height = this.addEditForm.uploadHeight
                        el.style.borderWidth = this.addEditForm.uploadBorderWidth
                        el.style.borderStyle = this.addEditForm.uploadBorderStyle
                        el.style.borderColor = this.addEditForm.uploadBorderColor
                        el.style.borderRadius = this.addEditForm.uploadBorderRadius
                        el.style.backgroundColor = this.addEditForm.uploadBgColor
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-form-item__label').forEach(el => {
                        el.style.lineHeight = this.addEditForm.uploadHeight
                        el.style.color = this.addEditForm.uploadLableColor
                        el.style.fontSize = this.addEditForm.uploadLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-icon-plus').forEach(el => {
                        el.style.color = this.addEditForm.uploadIconFontColor
                        el.style.fontSize = this.addEditForm.uploadIconFontSize
                        el.style.lineHeight = iconLineHeight
                        el.style.display = 'block'
                    })
                    // 多文本输入框
                    document.querySelectorAll('.addEdit-block .textarea .el-textarea__inner').forEach(el => {
                        el.style.height = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaFontColor
                        el.style.fontSize = this.addEditForm.textareaFontSize
                        el.style.borderWidth = this.addEditForm.textareaBorderWidth
                        el.style.borderStyle = this.addEditForm.textareaBorderStyle
                        el.style.borderColor = this.addEditForm.textareaBorderColor
                        el.style.borderRadius = this.addEditForm.textareaBorderRadius
                        el.style.backgroundColor = this.addEditForm.textareaBgColor
                    })
                    document.querySelectorAll('.addEdit-block .textarea .el-form-item__label').forEach(el => {
                        // el.style.lineHeight = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaLableColor
                        el.style.fontSize = this.addEditForm.textareaLableFontSize
                    })
                    // 保存
                    document.querySelectorAll('.addEdit-block .btn .btn-success').forEach(el => {
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
                    document.querySelectorAll('.addEdit-block .btn .btn-close').forEach(el => {
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
                this.$nextTick(() => {
                    document.querySelectorAll('.addEdit-block .upload .el-upload-list--picture-card .el-upload-list__item').forEach(el => {
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
</script>

<style lang="scss">
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

