<template>
  <div id="login_container">
    <div class="login-inner">
      <div class="login-header">
        <img src="./imgs/tuCaoQiang2.png"/>
        <div class="login-header-title">
          <a href="javascript:;" :class="{on:loginWay === true}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on:loginWay === false}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login-content">
        <van-form @submit="onSubmit">
          <div v-if="loginWay">
            <van-field
              v-model="tel"
              type="tel"
              name="tel"
              maxlength="11"
              center
              clearable
              :error="false"
              :rules="[{ required: true, pattern, message: '请输入正确的手机号', trigger:'onChange' }]"
              placeholder="手机号"
              autocomplete="off"
              class="input1"
            >
              <template #button>
                <van-button class="send-btn" @click="sendSMS">发送验证码</van-button>
              </template>
            </van-field>
            <van-field v-model="identifyingCode" name="identifyingCode" maxlength="6" center placeholder="验证码" class="input1" />
          </div>
          <div v-if="!loginWay">
            <van-field
              v-model="nickName"
              name="nickname"
              maxlength="10"
              center
              clearable
              :error="false"
              placeholder="昵称"
              :rules="[{ required: true, message: '请填写昵称' }]"
              autocomplete="off"
              class="input1"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              center
              clearable
              :error="false"
              placeholder="密码"
              :rules="[{ required: true, message: '请输入密码' }]"
              autocomplete="off"
              class="input1"
            />
          </div>
          <section class="login-protocol">
              <div>
                <van-checkbox v-model="checked" icon-size="20px"></van-checkbox>
              </div>
              <div class="protocol-content">
                温馨提示：未注册吐槽墙帐号的手机号，登录时将自动注册。我已阅读并同意
                <a href="javascript:;" @click="showAgreement = true">《用户服务协议》</a>
              </div>
          </section>
          <div style="margin: 16px;">
            <van-button 
              round
              block 
              type="info" 
              :color = "bgColor"
              native-type="submit"
              class="login-btn"
            >
              登录
            </van-button>
          </div>
        </van-form>
        <a href="javascript:;" class="about-us" @click="showAbout = true">关于我们</a>
      </div>
    </div>
    <van-popup v-model="showAgreement" class="agreement" round>
      请在法律允许的范围内使用
      <br/>
      吐槽墙
    </van-popup>
    <van-popup v-model="showAbout" class="about" round>
      你 最 意 想 不 到 的 App
      <br/>
      你偶尔来 我一直在
    </van-popup>
  </div>
</template>

<script>
    export default {
      // style="font-size: 18px;"
        name: 'Login',
        data() {
          return {
            loginWay:true, // true代表短信登录, false代表密码登录
            tel:'',
            identifyingCode:'',
            nickName:'',
            password:'',
            pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            checked: false,
            showAgreement:false,
            showAbout:false,
          }
        },
        computed:{
          bgColor(){
            return this.checked === true ? "#363383" : "#E6E6E6"
          }
        },
        methods: {
          sendSMS(){
            // 发送短信按钮事件
          },
          onSubmit(){
            if(this.checked){
              // 
              this.$router.replace('/')
            }else{
              this.$toast({
                message:'！请阅读《用户服务协议》并勾选确认',
                className: 'toast-other',
              })
            }
          },
        },
    }
</script>

<style lang="less" scoped>
  @import '../../assets/mixins.less';
  #login_container{
    height: 100%;
    width: 100%;
    background-color:#fff;
    position: relative;
    z-index: 999;
    .login-inner{
      width:86%;
      margin: 0 auto;
      text-align:center;
      .login-header{
        padding: 150px 0 40px 0;
        img{
          width: 450px;
        }
        .login-header-title{
          width: 450px;
          margin: 0 auto;
          display: flex; 
          justify-content: space-between;
          padding-top: 80px;
          >a{
            color:#333;
            font-size: 35px;
            padding-bottom: 8px;
            &.on{
              color:#FF3938;
              border-bottom: 6px solid #FF3938;
            }
          }
        }
      }
      .login-content{
        .input1{
          width: 100%;
          height: 95px;
          font-size: 35px;
          border: 1px solid #817FB1;
          border-radius: 8px;
          margin-bottom: 15px;
          .send-btn{
            font-size: 30px;
            height: 100%;
            border: none;
            color: #363383;
          }
        }
        .login-protocol{
          display: flex;
          margin-top: 50px;
          .protocol-content{
            margin-left: 10px;
            text-align: left;
            a{
              color:#033E8B;
            }
          }
        }
        .login-btn{
          height: 80px;
          font-size: 38px;
        }
      }
    }
    .agreement,.about{
      width: 80%;
      padding: 20px 0;
      line-height: 65px;
      font-size: 40px;
      text-align: center;
    }
  }
</style>