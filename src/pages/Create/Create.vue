<template>
  <div id="create">
    <nav class="navBar">
      <span class="left" @click="back">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <van-button class="publish" :disabled="!isPublish" @click="publishToast">发布</van-button>
    </nav>
    <div class="create-module-contain">
      <div class="create-module">
        <van-field
          v-model="invitation"
          rows="2"
          autosize
          maxlength="5000"
          show-word-limit
          type="textarea"
          placeholder="没人知道你是谁，在此刻吐槽你的心事吧..."
          :border="false"
          class="create-content"
        />
        <van-field name="uploader" class="img-input" :border="false">
          <template #input>
            <van-uploader
              v-model="uploader" 
              preview-size="105px" 
              accept = "image/*"
              :max-size="650 * 1024" 
              :max-count="9"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <!-- <van-field
          v-model="title"
          rows="2"
          label="标题"
          label-width = "60px"
          maxlength="24"
          show-word-limit
          type="textarea"
          placeholder="请输入吐槽标题"
          class="create-title"
        >
          <template #left-icon>
            <van-icon name="bookmark-o" size="20px"/>
          </template>
        </van-field> -->
        <van-cell title="话题" :value="topic" center :border="false" class="create-options" value-class="topic" to="/topic" replace>
          <template #icon>
            <van-icon name="apps-o" size="20px"/>
          </template>
          <template #right-icon>
            <van-icon name="arrow" size="15px"/>
          </template>
        </van-cell>
        <van-cell title="吐槽身份" :value="category" center :border="false" class="create-options" @click="show=true">
          <template #icon>
            <van-icon name="friends-o" size="20px"/>
          </template>
          <template #right-icon>
            <van-icon name="arrow" size="15px"/>
          </template>
        </van-cell>
        <van-cell title="互动权限" :value="permission" center :border="false" class="create-options" @click="toPermission">
          <template #icon>
            <van-icon name="eye-o" size="20px"/>
          </template>
          <template #right-icon>
            <van-icon name="arrow" size="15px"/>
          </template>
        </van-cell>
      </div>
    </div>
    <van-popup v-model="show" round class="choose" @click="show=false">
      <h3>选择身份</h3>
      <div class="anonymous" @click="category='分身匿名发布'">
        <img src="./imgs/niMing.jpeg" alt="匿名头像">
        <span>分身：使用无法被追踪的身份</span>
      </div>
      <div class="real-name" @click="category='真身真诚发布'">
        <!-- 真身发布的头像应该是用户自己的头像 -->
        <img src="./imgs/realName.jpg" alt="真身头像">
        <span>真身：使用真诚社交的身份</span>
      </div>
    </van-popup>
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      width = "220px"
      className = "logout-dialog"
      @confirm="confirm"
    >
      <template #title>
        <div class="title">
          <van-icon name="smile-comment" color="#4A5FE2"/>
          <span>退出将会丢失已经添加的内容，确定退出吗？</span>
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script>
    export default {
        name:'Create',
        data() {
          return {
            invitation:'',
            uploader: [],
            show: false,
            topic:'此刻之海',
            category:'分身匿名发布',
            permission:'允许互动',
            showDialog:false,
          }
        },
        computed:{
          isPublish(){
            return this.invitation 
          }
        },
        methods: {
          publishToast(){
            // 发送请求，更新数据库

            this.$router.replace('/roast')
          },
          back(){
            if(this.invitation){
              this.showDialog = true
            }else{
              this.$router.back()
            }
          },
          confirm(){
            this.$router.back()
          },
          onOversize(){
            this.$toast('文件大小不能超过 650kb');
          },
          toPermission(){
            this.$router.replace({
              path:'/interactive_permissions',
              query:{
                permissionName:this.permission
              }
            })
          },
        },
        mounted(){
          if(this.$route.query.topicOption){
            this.topic = this.$route.query.topicOption
          }
          if(this.$route.query.permission){
            this.permission = this.$route.query.permission
          }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/mixins.less';
    #create{
      height: 100%;
      width: 100%;
      background-color: #F7F7F7;
      position: relative;
      z-index: 200;
      .navBar{
        display: flex;
        width: 100%;
        height: 100px;
        background-color: #fff;
        color: #56A6FF;
        .border-1px(bottom,rgb(187, 186, 186));
        position: fixed;
        top: 0;
        left: 0;
        z-index: 20;
        justify-content: space-between;
        align-items: center;
        .left{
            padding-left: 20px;
            .iconfont{
              font-size: 42px;
            }
        }
        .publish{
            height: 100px;
            border: none;
            font-size: 35px;
            color: #000;
            margin-right: 7px;
        }
      }
      .create-module-contain{
        width: 100%;
        background-color: #F7F7F7;
        position: relative;
        top:125px;
        z-index: 10;
        .create-module{
          width: 93%;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 30px;
          border-bottom-right-radius: 0px;
          border-bottom-left-radius: 0px;
          box-shadow: 0px 0px 11px 4px #EAEAEA;
          .create-content{
            font-size: 35px;
            line-height: 50px;
            padding: 40px 30px;
            padding-bottom: 80px;
            border-radius: 30px;
          }
          .img-input{
            padding: 30px 30px;
            padding-top: 0;
          }
          // .create-title{
          //   font-size: 35px;
          //   height: 165px;
          //   line-height: 70px;
          //   padding: 0px 30px;
          // }
          .create-options{
            line-height: 70px;
            font-size: 32px;
            padding: 0px 30px;
          }
          .topic{
            color: #000;
          }
        }
      }
      .choose{
        width: 80%;
        height: 700px;
        font-size: 30px;
        color: #fff;
        text-align: center;
        background-color: transparent;
        h3{
          font-size: 45px;
          margin-bottom: 100px;
        }
        .anonymous{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 90px;
          img{
            width: 150px;
            border-radius: 50%;
            margin-bottom: 30px;
          }
        }
        .real-name{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
            width: 150px;
            border-radius: 50%;
            margin-bottom: 30px;
          }
        }
      }
      .logout-dialog{
        .title{
          font-size: 35px;
          padding: 30px 10px;
          line-height: 50px;
        }
      }
    }
</style>