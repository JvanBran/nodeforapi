<template>
    <div class="main">
        <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
        >
            <a-tabs
                :activeKey="customActiveKey"
                :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
                @change="(key)=>{customActiveKey = key}"
            >
                <a-tab-pane key="tab1" tab="账号密码登录">
                    <a-form-item>
                        <a-input
                        size="large"
                        type="text"
                        placeholder="账户: admin"
                        v-decorator="[
                            'login_name',
                            {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
                        ]"
                        >
                        <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-input
                        size="large"
                        type="password"
                        autocomplete="false"
                        placeholder="密码: admin or ant.design"
                        v-decorator="[
                            'password',
                            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                        ]"
                        >
                        <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>
                </a-tab-pane>
            
                <a-tab-pane key="tab2" tab="手机号登录">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="手机号" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
                        <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>
                    <a-row :gutter="16">
                        <a-col class="gutter-row" :span="16">
                        <a-form-item>
                            <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                            <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                            </a-input>
                        </a-form-item>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                        <a-button
                            class="getCaptcha"
                            tabindex="-1"
                            :disabled="state.smsSendBtn"
                            @click.stop.prevent="getCaptcha"
                            v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
                        ></a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>
            <a-form-item>
                <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
                <router-link
                :to="{ name: 'recover', params: { user: 'aaa'} }"
                class="forge-password"
                style="float: right;"
                >忘记密码</router-link>
            </a-form-item>

            <a-form-item style="margin-top:24px">
                <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                :loading="state.loginBtn"
                :disabled="state.loginBtn"
                >确定</a-button>
            </a-form-item>
            <div class="user-login-other">
                <span>其他登录方式</span>
                <a>
                <a-icon class="item-icon" type="alipay-circle"></a-icon>
                </a>
                <a>
                <a-icon class="item-icon" type="taobao-circle"></a-icon>
                </a>
                <a>
                <a-icon class="item-icon" type="weibo-circle"></a-icon>
                </a>
                <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
            </div>
        </a-form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import {checkForm,timeFix} from '@/util/util'
    export default {
        data(){
            return{
                customActiveKey:'tab1',
                form: this.$form.createForm(this),
                state: {
                    time: 60,
                    loginBtn: false,
                    // login type: 0 email, 1 username, 2 telephone
                    loginType: 0,
                    smsSendBtn: false
                }
            }
        },
        mixins:[checkForm],
        created(){
        },
        methods: {
            ...mapActions(['Login', 'Logout']),
            handleSubmit(e){
                e.preventDefault()
                const {
                    form: { validateFields },
                    state,
                    customActiveKey,
                    Login
                } = this;
                state.loginBtn = true;
                const validateFieldsKey = customActiveKey === 'tab1' ? ['login_name', 'password'] : ['mobile', 'captcha']
                validateFields(validateFieldsKey, { force: true }, (err, values) => {
                    if (!err) {
                        const loginParams = { ...values }
                        delete loginParams.login_name
                        loginParams[!state.loginType ? 'email' : 'login_name'] = values.login_name
                        loginParams.password = values.password
                          Login(loginParams)
                          .then(() => {
                              this.loginSuccess()
                              state.loginBtn = false
                          })
                          .catch(() => {
                              setTimeout(() => {
                                state.loginBtn = false
                            }, 600)
                          });
                    } else {
                        setTimeout(() => {
                            state.loginBtn = false
                        }, 600)
                    }
                })
            },
            loginSuccess(){
                console.log('22')
                this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                message: '欢迎',
                description: `${timeFix()}，欢迎回来`
                })
            }, 1000)
            }
        },
    }
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>