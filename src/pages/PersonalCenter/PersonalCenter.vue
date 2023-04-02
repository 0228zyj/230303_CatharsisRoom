<template>
  <div class="personal-center">
    <van-dialog
      v-model="showDialog1"
      show-cancel-button
      width = "320px"
      className = "dialog"
      @confirm="confirm1"
    >
      <!-- 按钮样式暂时还没改，应该只能在定制主体里改，后续在改 -->
      <template #title>
        <div class="title">
          <img src="./imgs/tip.png" alt="警告">
          <span>温馨提示</span>
        </div>
      </template>
      <van-cell class="tip-container" value-class="tip" value="1.我们将在7日内处理你的注销申请，期间若重新登录吐槽墙，该申请将会被撤销；" />
      <van-cell class="tip-container" value-class="tip" value="2.成功注销后所有的账号信息将会被删除且无法找回，使用原登录信息将会自动创建一个新账号，请谨慎操作。" />
    </van-dialog>
    <div class="user-info">
      <section class="user-info-top">
        <div class="user-img-nickname">
          <div class="user-img">
            <img src="./imgs/default.jpeg" alt="头像">
          </div>
          <div class="user-nickname-uid">
            <p class="user-nickname">Jay-周杰伦-周董</p>
            <p class="user-uid">UID:7802561</p>
          </div>
          <van-button class="log-off" @click="accountCancellation">注销账号</van-button>
        </div>
        <div class="progress">
          <van-progress pivot-text="" :percentage="25" stroke-width="6" color="#FF3938"/>
          <section class="pro-value">
            <span>吐槽值&nbsp;300/1200</span>
          </section>
        </div>
      </section>
      <section class="user-info-bottom">
        <van-grid class="info-options" :column-num="3">
          <van-grid-item to="/account_information">
            <span class="icon">
                <i class="icon1 iconfont icon-gerenxinxi"></i>
            </span>
            <span>账号信息</span>
          </van-grid-item>
          <van-grid-item to="/my_attention">
            <span class="icon">
                <i class="icon2 iconfont icon-31guanzhuxuanzhong"></i>
            </span>
            <span>我的关注</span>
          </van-grid-item>
          <van-grid-item @click="toAllCreations">
            <span class="icon">
                <i class="icon3 iconfont icon-chuangzuo1"></i>
            </span>
            <span>我的吐槽</span>
          </van-grid-item>
        </van-grid>
      </section>
    </div>
    <div class="user-other">
      <van-cell 
        v-for="(otherOption,index) in otherOptions"
        :key="index" 
        center 
        :title="otherOption" 
        title-class="title-option" 
        class="other-option"
        @click="otherFun(index)"
      >
        <template #right-icon>
          <van-icon name="arrow" size="20px" />
        </template>
      </van-cell>
      <section>
        <van-button 
          round
          block 
          type="danger" 
          class="logout"
          @click="showDialog2=true"
        >
          退出登录
        </van-button>
      </section>
    </div>
    
    <van-notify v-model="showNotify2" type="primary" className="notify">
      <van-icon name="bell" style="margin-right: 4px;" class="icon"/>
      <span class="notify-content">该功能还在研发，敬请期待！</span>
    </van-notify>
    <van-popup v-model="showPopup" class="about" round>
      你偶尔来 我一直在
    </van-popup>
    <van-notify v-model="showNotify1" type="primary" className="notify">
      <van-icon name="fire" style="margin-right: 4px;" class="icon"/>
      <span class="notify-content">已是最新版本v1.0.0</span>
    </van-notify>

    <van-dialog
      v-model="showDialog2"
      show-cancel-button
      width = "220px"
      className = "logout-dialog"
      @confirm="confirm2"
    >
      <template #title>
        <div class="title">
          <span>确定退出吐槽墙？</span>
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script>
    export default {
        name: 'PersonalCenter',
        data() {
          return {
            showDialog1:false,
            otherOptions:["消息通知","隐私设置","关于吐槽墙","给吐槽墙题意见","检查更新"],
            showNotify1:false,
            showNotify2:false,
            timeId1:1,
            timeId2:2,
            showPopup:false,
            showDialog2:false,
          }
        },
        methods: {
          accountCancellation(){
            this.showDialog1 = true
          },
          confirm1(){
            
            this.$router.replace('/login')
          },
          toAllCreations(){
            this.$router.push({
              path:'/all_creations',
              query:{
                uid:123456,
                isOneself:1, // isOneself：0表示不是自己的所有创作页面；1表示是自己的所有创作页面
              },
            })
          },
          otherFun(type){
            switch (type) {
              case 0:
                this.$router.replace('/message')
                break;
              case 1:
              case 3:
                this.showNotify2 = true;
                clearTimeout(this.timeId1)
                this.timeId1 = setTimeout(() => {
                  this.showNotify2 = false;
                }, 3500);
                break;
              case 2:
                this.showPopup = true
                break;
              case 4:
                this.showNotify1 = true;
                clearTimeout(this.timeId2) // 防止多次点击生成多个定时器。还有另一种更为重要的解决方案。
                this.timeId2 = setTimeout(() => {
                  this.showNotify1 = false;
                }, 3500);
                break;
              default:
                break;
            }
          },
          confirm2(){
            this.$router.replace('/login')
          },

        },
    }
</script>

<style lang="less" scoped>
  .personal-center{
    height: 100%;
    width: 100%;
    .dialog{
      font-size: 90px important;
      .title{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          width: 100px;
        }
        span{
          font-size: 35px;
          font-weight: bold;
          padding: 40px 0;
        }
      }
      .tip-container{
        &:last-of-type{
          margin-bottom: 15px;
        }
      }
      .tip{
        line-height: 50px;
        font-size: 32px;
        color: #848484;
        padding: 0 30px;
        text-align: center;
      }
    }
    .user-info{
      width: 100%;
      height: 42%;
      background-color: #363383;
      .user-info-top{
        width: 90%;
        height: 75%;
        margin: 0 auto;
        .user-img-nickname{
          display: flex;
          padding: 50px 0;
          .user-img{
            width:150px;
            height:150px;
            border-radius:50%;
            margin-right: 20px;
            img{
              width: 100%;
              border-radius: 50%;
            }
          }
          .user-nickname-uid{
            flex: 1;
            color: #fff;
            .user-nickname{
              padding: 30px 0;
            }
            .user-uid{
              font-size: 30px;
            }
          }
          .log-off{
            font-size: 30px;
            color: gray;
            border-color: gray;
            background-color: transparent;
            margin-top: 100px;
          }
        }
        .progress{
          .pro-value{
            margin-top: 20px;
            color: #fff;
          }
        }
      }
      .user-info-bottom{
        height: 25%;
        background-color: #fff;
        .info-options{
          height: 100%;
          font-size: 30px;
          .icon{
            margin-bottom: 10px;
            .iconfont{
              font-size: 60px;
              &.icon1{
                color: #3268CF;
              }
              &.icon2{
                color: #FC455D;
              }
              &.icon3{
                color: #363383;
              }
            }
          } 
        }
      }
    }
    .user-other{
      .title-option{
        font-size: 33px;
      }
      .other-option{
        padding: 20px 20px;
        margin-top: 20px;
      }
      section{
        width: 100%;
        .logout{
          width: 180px;
          font-size: 30px;
          padding: 30px 0;
          border-radius: 10px;
          margin: 0 auto;
          margin-top: 35px;
        }
      }
      
    }
    .notify{
      height: 70px;
      background-color: rgba(113,179,253,0.85);
      .icon{
        font-size: 35px;
      }
      .notify-content{
        font-size: 35px;
        opacity: 1;
      }
    }
    .about{
      width: 80%;
      line-height: 200px;
      font-size: 50px;
      text-align: center;
    }
    .logout-dialog{
      .title{
        font-size: 35px;
        padding: 30px 0;
      }
    }
  }
</style>