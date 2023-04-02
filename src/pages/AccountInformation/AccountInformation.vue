<template>
  <div id="account-information">
    <nav class="navBar">
      <h3 class="title">账号信息</h3>
      <span class="left" @click="$router.replace('/personal_center')">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
    </nav>
    <div class="user-form">
      <van-form @submit="onSubmit" :disabled="isNotRevise">
        <van-field
          v-model="uid"
          name="uid"
          label="UID"
          readonly
          center
          class="input"
        />
        <van-field
          v-model="nickname"
          name="nickname"
          label="昵称"
          maxlength="10"
          clearable
          center
          :error="false"
          :rules="[{ required: true, message: '请填写昵称' }]"
          autocomplete="off"
          class="input"
        />
        <van-field
          v-model="tel"
          type="tel"
          name="tel"
          maxlength="11"
          label="手机号"
          clearable
          center
          :error="false"
          :rules="[{ required: true, pattern, message: '请输入正确的手机号', trigger:'onChange' }]"
          autocomplete="off"
          class="input"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          center
          :error="false"
          :rules="[{ required: true, message: '请输入密码' }]"
          autocomplete="off"
          class="input"
        />
        <van-field name="uploader" label="头像" class="input img-input">
          <template #input>
            <van-uploader v-model="uploader" preview-size="80px" :max-count="1" :disabled="isNotRevise"/>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          :value="sexValue"
          name="sex"
          label="性别"
          center
          class="input"
          @click="checkSex"
        />
        <van-popup v-model="showSex" position="bottom">
          <van-picker
            show-toolbar
            :columns="sexColumns"
            class="sex-picker"
            @confirm="onConfirm1"
            @cancel="showSex = false"
          />
            <template #title>
              <span class="sex">性别</span>
            </template>
            <template #confirm>
              <span class="confirm">确认</span>
            </template>
            <template #cancel>
              <span>取消</span>
            </template>
        </van-popup>
        <van-field
          v-model="age"
          type="digit"
          name="age"
          label="年龄"
          clearable
          center
          class="input"
        />
        <van-field
          readonly
          name="constellation"
          :value="ConstellationValue"
          label="星座"
          center
          class="input"
          @click="checkConstellation"
        />
        <van-popup v-model="showConstellation" position="bottom">
          <van-picker
            show-toolbar
            :columns="constellationColumns"
            class="sex-picker"
            @confirm="onConfirm2"
            @cancel="showConstellation = false"
          />
        </van-popup>
        <div style="margin: 16px 35px;display: flex;justify-content:space-between;">
          <van-button round block type="info" native-type="button" class="btn" :disabled="!isNotRevise" @click="isNotRevise=false">修改</van-button>
          <van-button round block type="info" native-type="submit" class="btn" :disabled="isNotRevise">保存</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
    export default {
        name:'AccountInformation',
        data() {
          return {
            uid:7802561,
            nickname: 'Jay-周杰伦-周董',
            tel:13107968629,
            pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            password: '123456789',
            uploader: [{ url: './imgs/default.jpeg' }],
            sexValue: '未知',
            sexColumns: ['未知','男','女'],
            showSex: false,
            age:0,
            ConstellationValue:'未知',
            constellationColumns: ['未知','水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座',
            '狮子座','处女座','天秤座','天蝎座','射手座','摩羯座'],
            showConstellation:false,
            isNotRevise:true, 
          }
        },
        methods: {
          onSubmit(values) {
            // console.log('submit', values);
            this.isNotRevise = true
            this.$toast({
              message:' 修改成功！',
              className: 'toast-other',
            })
          },
          checkSex(){
            if(!this.isNotRevise){
              this.showSex = true
            }
          },
          onConfirm1(value) {
            this.sexValue = value;
            this.showSex = false;
          },
          checkConstellation(){
            if(!this.isNotRevise){
              this.showConstellation = true
            }
          },
          onConfirm2(value) {
            this.ConstellationValue = value;
            this.showConstellation = false;
          },
        },
    }
</script>

<style lang="less" scoped>
  @import '../../assets/mixins.less';
  #account-information{
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: relative;
    z-index: 200;
    .navBar{
        width: 100%;
        height: 100px;
        background-color: #fff;
        color: #56A6FF;
        .border-1px(bottom,rgb(187, 186, 186));
        position: fixed;
        top: 0;
        left: 0;
        .title{
            line-height: 100px;
            font-size: 45px;
            color: #000;
            text-align: center;
            font-weight: bold;
        }
        .left{
            position: absolute;
            top:25%;
            left: 10px;
            .iconfont{
              font-size: 50px;
            }
        }
    }
    .user-form{
      width: 100%;
      position: relative;
      top: 130px;
      background-color: #fff;
      .input{
        width: 95%;
        height: 95px;
        font-size: 38px;
        margin: 0 auto;
        &.img-input{
          height: 200px;
        }
        .menu{
          height: 50px;
          .menu-content{
            font-size: 55px;
          }
        }
      }
      .sex-picker{
        span.confirm{
          font-size: 55px;
        }
      }
      .btn{
        width: 230px;
        height: 65px;
        font-size: 41px;
      }
    }
  }
</style>