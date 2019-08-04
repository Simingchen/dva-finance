<template>
  <el-menu class="navbar" mode="horizontal">
    <img class="titile-img" src="../../login/img/loginLogoTitle.png">
    <!-- <span class="titile-heard">财道运营服务平台&nbsp;&nbsp;&nbsp;&nbsp; -->
    <!-- <span class="titile-dh">|&nbsp;&nbsp;&nbsp;&nbsp;您所在的位置&nbsp;：&nbsp;</span> -->
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <!-- <breadcrumb /> -->
    <!-- 消息提醒 -->
    <!-- <el-badge is-dot class="notice">
      <i class="el-icon-bell"/>
    </el-badge> -->
    <Search class="search_sty"/>
    <operationalGuidelines class="operationalGuidelines_sty"/>
    <screenfull class="screenfull"/>
    <!-- <el-tooltip content="全屏" placement="bottom" effect="light">

    </el-tooltip> -->
    <el-dropdown class="avatar-container" >
      <span>
        <div class="avatar-wrapper">
          <img :src="url_dow" :onerror="noImg" class="user-avatar">
          <i class="el-icon-caret-bottom" style="color:#fff;"/>
        </div>

      </span>

      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <div class="login_name_sty">{{ login_names }}</div>
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item >
            <i class="cd__icon--sy2"/> 首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item >
          <span style="display:block;" @click="seeting"><i class="cd__icon--yhsz"/> 用户设置</span>
        </el-dropdown-item>
        <el-dropdown-item >
          <span style="display:block;" @click="updataPwd"><i class="cd__icon--xgmm"/> 修改密码</span>
        </el-dropdown-item>
        <div class="logiut_div_sty">
          <el-button type="primary" size="mini" class="logiut_sty" @click="logout">退 出</el-button>
        </div>
        <!-- <el-dropdown-item class="logiut_sty">
          <div @click="logout">登出</div>
        </el-dropdown-item> -->
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 用户设置 -->
    <div>
      <el-dialog
        v-el-drag-dialog
        :visible.sync="dialogVisible"
        :before-close="add_Close"
        :close-on-click-modal="false"
        title="用户设置"
        width="835px">
        <div class="touxiang">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="before_upload2"
            :action="url"
            :data="uploadData"
            class="avatar-uploader">
            <img :src="url_dow" class="heads_tx">
          </el-upload>
        </div>
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          :rules="rules"
          label-width="120px">
          <el-form-item label="用户名称" prop="user_name">
            <el-input v-model="form.user_name" :maxlength="19" placeholder="请输入用户名称" style="width:250px;"/>
          </el-form-item>
          <el-form-item label="昵称" prop="nick_name">
            <el-input v-model="form.nick_name" :maxlength="19" placeholder="请输入昵称" style="width:250px;"/>
          </el-form-item>
          <el-form-item :error="nameError" label="登录账户" prop="login_name">
            <el-input v-model="form.login_name" :maxlength="19" placeholder="请输入登录账户" style="width:250px;"/>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile_phone">
            <el-input
              v-model="form.mobile_phone"
              :maxlength="11"
              style="width:250px;"
              placeholder="请输入手机号码"
              oninput = "value=value.replace(/[^\d]/g,'')"
            />
          </el-form-item>
          <el-form-item label="性别">
            <div style="width:250px;">
              <el-radio-group v-model="form.gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="form.email" :maxlength="25" placeholder="请输入电子邮箱" style="width:250px;"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="resetForm('form')">重置</el-button>
          <el-button :loading="butt_loading" size="mini" type="primary" @click="saveForms('form')">保存</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改密码 -->
    <div>
      <el-dialog
        v-el-drag-dialog
        :visible.sync="passVisible"
        :before-close="passClose"
        :close-on-click-modal="false"
        title="修改密码"
        width="500px">
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" status-icon label-width="140px" style="margin-top:-20px;">
          <el-form-item :error="olderr" label="原密码" prop="oldpass">
            <el-input v-model="ruleForm2.oldpass" placeholder="请输入原密码" style="width:250px"/>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass1">
            <el-input v-model="ruleForm2.newpass1" :type="type_input" placeholder="请输入新密码" style="width:250px">
              <el-button v-if="pas_show" slot="suffix" type="text" style="color:#909699;" @click="password_show">
                <i class="iconfont icon-eye"/>
              </el-button>
              <el-button v-if="!pas_show" slot="suffix" type="text" style="color:#909699;" @click="password_shows">
                <i class="iconfont icon-yanjing"/>
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newpass2">
            <el-input v-model.number="ruleForm2.newpass2" style="width:250px" placeholder="请输入确认密码" type="password"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="resetForm2('ruleForm2')">重置</el-button>
          <el-button size="mini" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        </span>
      </el-dialog>
    </div>
  </el-menu>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/breadCrumb'
import Hamburger from '@/components/hamburger'
import Screenfull from '@/components/screenFull'
import Search from '@/components/HeaderSearch'
import operationalGuidelines from '@/components/operationalGuidelines'

import {
  addOrUpdateUser, // 新增/修改用户信息
  updatePwd, // 修改用户密码
  checkLoginNameUnique
} from '@/api/groupManager.js'

// import { checkLoginNameUnique } from '@/api/groupManager.js'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Search,
    operationalGuidelines
  },
  directives: { elDragDialog },
  data () {
    // 手机号码校验
    const validatetel1 = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('请输入手机号码'))
      } else {
        callback()
      }
    }
    // 电子邮箱
    const emill = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!this.emill(value)) {
        callback(new Error('请输入合法的电子邮箱'))
      } else {
        callback()
      }
    }
    // 密码再次确认
    const two_pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value + '' !== this.ruleForm2.newpass1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      login_names: JSON.parse(localStorage.umUser).user_name,
      uploadData: {
        user_id: JSON.parse(localStorage.umUser).user_id,
        agency_id: JSON.parse(localStorage.entityInfo).agency_id
      },
      url: process.env.BASE_API + 'admin/userManager/headPortraitAdd.do', // 上传地址
      url_dow: process.env.BASE_API + 'admin/userManager/downloadAttach.do?agency_id=' +
       JSON.parse(localStorage.entityInfo).agency_id + '&user_id=' + JSON.parse(localStorage.umUser).user_id, // 下载地址
      olderr: '',
      passVisible: false,
      type_input: 'password',
      pas_show: false,
      butt_loading: false, // 按钮loading
      dialogVisible: false, // 控制新增弹窗
      // 修改密码数据
      ruleForm2: {
        oldpass: '',
        newpass1: '',
        newpass2: ''
      },
      // 修改密码表单验证
      rules2: {
        // 原始密码
        oldpass: [{ required: true, trigger: 'blur', message: '请输入原密码' }],
        // 新密码
        newpass1: [{ required: true, trigger: 'blur', message: '请输入新密码' }],
        // 确认密码
        newpass2: [{ required: true, trigger: 'blur', validator: two_pass }]
      },
      // 用户设置表单数据
      form: {
        user_name: '', // 用户名称
        nick_name: '', // 昵称
        login_name: '', // 登录账号
        gender: 0, // 性别
        mobile_phone: '', // 联系人手机号码
        email: '', // 电子邮箱
        passwork: '', // 用户密码
        passwork1: '' // 确认密码
      },
      // 用户设置表单验证
      rules: {
        // 用户名称
        user_name: [{ required: true, trigger: 'blur', message: '请输入用户名称' }],
        // 昵称
        nick_name: [],
        // 登录账号
        login_name: [{ required: true, trigger: 'blur', message: '请输入登录账号' }],
        // 联系人手机号码
        mobile_phone: [
          { required: true, trigger: 'blur', validator: validatetel1 }
        ],
        // 电子邮箱
        email: [
          { trigger: 'blur', validator: emill }
        ]
      },
      nameError: '',
      noImg: 'this.src="' + require('../img/icon.png') + '"'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    before_upload2 (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      if (!isJPG && !isPNG && !isGIF) {
        this.$message({
          message: '头像图片只能是 JPG/JPEG/PNG/GIF 格式!',
          type: 'warning'
        })
        return false
      }
    },

    // 上传头像成功
    handleAvatarSuccess (response, file, fileList) {
      if (response.code === '0') {
        this.url_dow = process.env.BASE_API + 'admin/userManager/downloadAttach.do?agency_id=' +
       JSON.parse(localStorage.entityInfo).agency_id + '&user_id=' + JSON.parse(localStorage.umUser).user_id +
       '&version=version'
      }
    },
    // 修改密码提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        const user_id = JSON.parse(localStorage.umUser).user_id
        if (valid) {
          updatePwd(user_id, this.ruleForm2.oldpass, this.ruleForm2.newpass1).then(res => {
            if (res.data.code === '1') {
              this.olderr = res.data.message
            } else if (res.data.code === '0') {
              this.$message({
                message: '密码修改成功！！',
                type: 'success'
              })
              this.passVisible = false
              this.logout()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改密码弹窗重置
    resetForm2 (formName) {
      this.$refs[formName].resetFields()
    },
    // 关闭修改密码弹窗
    passClose () {
      this.passVisible = false
    },
    // 密码显示切换
    password_show () {
      this.pas_show = false
      this.type_input = 'password'
    },
    password_shows () {
      this.pas_show = true
      this.type_input = 'text'
    },
    // 打开用户设置
    seeting () {
      const user = JSON.parse(localStorage.umUser)
      this.form.user_name = user.user_name
      this.form.nick_name = user.nick_name
      this.form.login_name = user.login_name
      this.form.gender = user.gender
      this.form.mobile_phone = user.mobile_phone
      this.form.email = user.email
      this.dialogVisible = true
    },
    // 打开修改密码
    updataPwd () {
      this.olderr = ''
      this.passVisible = true
    },
    // 编辑 保存
    saveForms (formName) {
      this.nameError = ''
      this.butt_loading = true
      const user = JSON.parse(localStorage.umUser)
      setTimeout(() => {
        this.butt_loading = false
      }, 1000)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const par = {
            group_id: JSON.parse(localStorage.umGroup).group_id,
            is_user_page: 'Y',
            user_type: user.user_type,
            user_id: user.user_id,
            user_name: this.form.user_name, // 用户名称
            nick_name: this.form.nick_name, // 昵称
            login_name: this.form.login_name, // 登录账号
            gender: parseInt(this.form.gender), // 性别
            mobile_phone: this.form.mobile_phone, // 联系人手机号码
            email: this.form.email // 电子邮箱
          }
          // 登录账号修改编辑过
          const id = JSON.parse(localStorage.entityInfo).agency_id
          if (this.form.login_name !== user.login_name) {
            checkLoginNameUnique(id, this.form.login_name).then(res => {
              if (res.data.code === '0') {
                if (res.data.data.flag) {
                  this.nameError = '登录账号重复'
                } else {
                  addOrUpdateUser(par).then(res => {
                    if (res.data.code === '0') {
                      this.fundListUser(this.g_id)
                      this.dialogVisible = false
                    }
                  })
                }
              }
            })
          } else {
            addOrUpdateUser(par).then(res => {
              if (res.data.code === '0') {
                window.localStorage.umUser = JSON.stringify(res.data.data)
                this.$message({
                  message: '用户设置保存成功！',
                  type: 'success'
                })
                this.dialogVisible = false
              } else {
                this.$message.error({
                  message: res.data.message
                })
                this.dialogVisible = false
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 用户设置弹窗重置
    resetForm (formName) {
      this.nameError = ''
      this.$refs[formName].resetFields()
    },
    // 手机号验证
    telVerification (str) {
      const reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
      return reg.test(str)
    },
    // 邮箱验证
    emill (str) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return reg.test(str)
    },
    // 关闭新增弹窗
    add_Close () {
      this.$nextTick(() => {
        if (this.$refs['form'] !== undefined) {
          this.$refs['form'].resetFields()
        }
      })
      this.updata_show = false
      this.dialogVisible = false
    },
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$router.push({ path: '/' })
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// 为了重新实例化Vue路由器对象以避免错误
      })
    }
  }
}
</script>

<style>
.popclass{
  margin-top: 5px !important;
}
.touxiang{
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
}
.heads_tx{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor:pointer;
  box-shadow: 2px 3px 3px #D0D0D0;
}
.heads_tx:hover{
  box-shadow: 2px 3px 3px #A8A8A8;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>

.divclass{
  text-align: center;
  width: 180px;
  height: 50px;
  border-radius: 10px;
  display: inline-block;
  position: absolute;
  top: 4px;
  right: 5px;
  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}
.popclass{
  margin-top: 50px !important;
  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}
.navbar {
  height: 50px;
  // line-height: 50px;
  margin-left: 0px !important;
  border-radius: 0px !important;
  background: #338EF3;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    position: absolute;
    left: 145px;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 82px;
    top: 16px;
  }
  .search_sty {
    position: absolute;
    right: 158px;
    top: 16px;
  }
  .operationalGuidelines_sty{
    position: absolute;
    right: 118px;
    top: 11px;
  }
  .notice {
    position: absolute;
    right: 95px;
    top: 14px;
    i{
      font-size: 23px;
      cursor:pointer;
      color: #fff;
    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 15px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 7px;
      position: relative;
      right: 15px;
      line-height: initial;
      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -15px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.titile-heard{
  color: #fff;
  font-weight:bold;
  position: absolute;
  margin-left: 42px;
  line-height: 50px;
}
.titile-img{
  // width: 103px;
  // height: 40px;
  // position: absolute;
  // top: 7px;
  // left: 5px;
  width: 132px;
  height: 33px;
  position: absolute;
  top: 8px;
  left: 4px;
}
.titile-dh{
  font-weight:400;
  color: #E8E8E8;
  font-size: 13px;
}
.login_name_sty{
  background: #F8F8F8;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  color: #606060;
  height: 40px;
  line-height: 40px;
  border-bottom:1px solid #E0E0E0;
  // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.logiut_sty{
  width: 100%;
}
.user-dropdown{
  top:37px !important;
  width: 130px;
}
.logiut_div_sty{
  width: 100%;
  text-align: center;
  padding: 10px;
}
</style>m]]

