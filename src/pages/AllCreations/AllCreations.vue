<template>
  <div id="all-creations" ref="allCreations" >
    <div class="all-creations-nav" :class="{over:overHeight}">
      <span class="left" @click="$router.back()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <span v-show="overHeight">吐 槽 集</span>
    </div>
    <div class="all-creations-content" >
      <div class="all-creations-content-top">
        <img src="./imgs/default.jpeg" alt="头像">
        <section class="ellipsis">
          <span class="nickname">葡萄成熟时</span>
        </section>
        <span class="uid">UID:7802561</span>
        <section class="labels">
          <label>0岁</label>
          <label>未知</label>
          <label>摩羯座</label>
        </section>
      </div>
      <ul class="all-creations-content-bottom" >
        <li class="tuCao-invitation" v-for="roast in roastList" :key="roast.uid">
          <section class="tuCao-invitation-top">
              <img :src="roast.headerImg" alt="头像">
              <section>
                  <p>{{ roast.name }}</p>
                  <p>{{ roast.publishTime }}</p>
              </section>
          </section>
          <section class="tuCao-invitation-content">
              <h3>#{{ roast.topic }}#</h3>
              <p>{{ roast.content }}</p>
              <div class="img-list">
                <img v-for="(image,index) in roast.imgList" :src="image" :key="index" :class="{img2:roast.imgList.length<=2,img3:roast.imgList.length>2}">
              </div>
          </section>
          <section class="tuCao-invitation-bottom">
            <section>
                <van-icon name="good-job-o" size="23px" :color="roast.color" @click="likeRoast(roast.uid)">
                    <span class="thumb-number" style="color: #000;"> {{ roast.thumbNumber }}</span>
                </van-icon>
            </section>
            <section @click="toComment" class="comment-section">
                <van-icon name="comment-o" size="23px">
                    <span class="comment-number" style="color: #000;"> {{ roast.commentNumber }}</span>
                </van-icon>
            </section>
          </section>
        </li>
      </ul>
    </div>
    <!-- 通过路由接收的参数的不同来显示和隐藏该按钮 -->
    <div class="btns" v-show="!Number($route.query.isOneself)">
      <van-button type="primary" round color="#79B8FF" class="btn" @click="attention">
        <span v-show="!isAttention">关注</span>
        <span v-show="isAttention">已关注</span>
        <template #icon>
          <span v-show="!isAttention">
            <i class="iconfont icon-plus"></i>
          </span>
        </template>
      </van-button>
      <van-button type="info" round color="#79B8FF" class="btn" @click="toPrivateChat">
        私聊
        <template #icon>
          <span>
            <i class="iconfont icon-xiaoxi"></i>
          </span>
        </template>
      </van-button>
    </div>
  </div>
</template>

<script>
    export default {
        name:'AllCreations',
        data() {
            return {
              overHeight:false,
              roastList: [
                    {
                        uid:7802561,
                        headerImg:'./imgs/default.jpeg',
                        name:'Jay-周董-周杰伦',
                        publishTime:'7小时前',
                        topic:'此刻之海',
                        content:'也不是难过吧，只是清晰的记得，有一段时间，我什么也不想要了，也包括我的命，现在重视与自己有关的一切吧。',
                        imgList:['./imgs/default.jpeg','./imgs/default.jpeg','./imgs/default.jpeg','./imgs/default.jpeg','./imgs/default.jpeg'],
                        isLike:false,
                        color:'#000',
                        thumbNumber:2,
                        commentNumber:6,
                    },
                    {
                        uid:7802562,
                        headerImg:'./imgs/default.jpeg',
                        name:'Jay-周董-周杰伦',
                        publishTime:'7小时前',
                        topic:'此刻之海',
                        content:'也不是难过吧，只是清晰的记得，有一段时间，我什么也不想要了，也包括我的命，现在重视与自己有关的一切吧。',
                        imgList:['./imgs/default.jpeg','./imgs/default.jpeg'],
                        isLike:false,
                        color:'#000',
                        thumbNumber:2,
                        commentNumber:6,
                    },
                    {
                        uid:7802563,
                        headerImg:'./imgs/default.jpeg',
                        name:'Jay-周董-周杰伦',
                        publishTime:'7小时前',
                        topic:'此刻之海',
                        content:'也不是难过吧，只是清晰的记得，有一段时间，我什么也不想要了，也包括我的命，现在重视与自己有关的一切吧。',
                        isLike:false,
                        color:'#000',
                        thumbNumber:2,
                        commentNumber:6,
                    },
                    {
                        uid:7802564,
                        headerImg:'./imgs/default.jpeg',
                        name:'Jay-周董-周杰伦',
                        publishTime:'7小时前',
                        topic:'此刻之海',
                        content:'也不是难过吧，只是清晰的记得，有一段时间，我什么也不想要了，也包括我的命，现在重视与自己有关的一切吧。',
                        isLike:false,
                        color:'#000',
                        thumbNumber:2,
                        commentNumber:6,
                    },
                    {
                        uid:7802565,
                        headerImg:'./imgs/default.jpeg',
                        name:'Jay-周董-周杰伦',
                        publishTime:'7小时前',
                        topic:'此刻之海',
                        content:'也不是难过吧，只是清晰的记得，有一段时间，我什么也不想要了，也包括我的命，现在重视与自己有关的一切吧。',
                        isLike:false,
                        color:'#000',
                        thumbNumber:2,
                        commentNumber:6,
                    },
                    {
                        uid:7802566,
                        headerImg:'./imgs/default.jpeg',
                        name:'Jay-周董-周杰伦',
                        publishTime:'7小时前',
                        topic:'此刻之海',
                        content:'也不是难过吧，只是清晰的记得，有一段时间，我什么也不想要了，也包括我的命，现在重视与自己有关的一切吧。',
                        isLike:false,
                        color:'#000',
                        thumbNumber:2,
                        commentNumber:6,
                    },
                ],
              isAttention:'',
            }
        },
        methods: {
          // 滚动条滚动事件
          interfaceScrolling($event){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 50){
              this.overHeight = true
            }else{
              this.overHeight = false
            }
          },
          likeRoast(uid){
            this.roastList = this.roastList.map((currentValue)=>{
                if(currentValue.uid === uid){
                    if(currentValue.isLike){
                        currentValue.thumbNumber--
                        currentValue.color = "#000"
                    }else{
                        currentValue.thumbNumber++
                        currentValue.color = "#FF623E"
                        this.$toast({
                            icon: 'good-job-o',
                            className: 'toast-thumb',
                            duration:1000
                        })
                    }
                    currentValue.isLike = !currentValue.isLike
                }
                return currentValue
            })
          },
          toComment(){
            this.$router.push('/comment')
          },
          attention(){
            this.isAttention = this.isAttention === 1 ? 0 : 1
          },
          toPrivateChat(){
            this.$router.push('/private_chat')
          },
        },
        beforeMount() {
          this.isAttention = Number(this.$route.query.isAttention)
        },
        mounted(){
          window.addEventListener("scroll",this.interfaceScrolling)
        },
        destroyed(){
          window.removeEventListener("scroll",this.interfaceScrolling)
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/mixins.less';
    #all-creations{
        height: 100%;
        width: 100%;
        background-color: #fff;
        position: relative;
        z-index: 200;
        .all-creations-nav{
          width: 100%;
          line-height: 75px;
          position: fixed;
          top:0;
          left: 0;
          // background-color: #fff;
          background-color: transparent;
          z-index: 99;
          transition: all 0.8s;
          text-align: center;
          .left{
            position: absolute;
            left: 20px;
            .iconfont{
                font-size: 45px;
                // color:#6EAAFA;
                color:#fff;
            }
          }
          span{
            &:last-of-type{
              font-size: 40px;
              font-weight: bold;
              color:#6EAAFA;
            }
          }
        }
        .over{
          background-color: #fff;
          border-bottom: 1px solid rgb(187, 186, 186);
          .left{
            .iconfont{
                color:#6EAAFA;
            }
          }
        }
        .all-creations-content{
          width:100%;
          background-color: #fff;
          padding-bottom: 140px;
          .all-creations-content-top{
            height: 390px;
            color: #fff;
            background-image: url('./imgs/bg.png');
            background-size:cover;
            font-size: 30px;
            padding: 100px 0 0 25px;
            img{
              width: 150px;
              border-radius: 50%;
            }
            section{
              padding: 25px 0;
              width: 91%;
            }
            .nickname{
              font-size: 42px;
              font-weight: bold;
            }
            .uid{
              padding: 30px 0;
            }
            .labels{
              padding: 35px 0;
              label{
                padding: 7px;
                border: 1px solid #fff;
                border-radius: 10px;
                margin-right: 15px;
              }
            }
          }
          .all-creations-content-bottom{
            .tuCao-invitation{
              width: 92%;
              margin: 0 auto;
              padding-top: 30px;
              .border-1px(bottom,rgb(187, 186, 186));
              .tuCao-invitation-top{
                display: flex;
                align-items: center;
                img{
                  width: 90px;
                  border-radius: 50%;
                  margin-right: 15px;
                }
                section{
                  &>:first-child{
                    font-weight: bold;
                  }
                  &>:last-child{
                    font-size: 20px;
                    color: #8D8D8D;
                    padding-top: 15px;
                  }
                }
              }
              .tuCao-invitation-content{
                h3{
                  padding: 20px 0;
                  color:#6EAAFA;
                }
                p{
                  padding-bottom: 12px;
                  line-height: 45px;
                }
                .img-list{
                  .img2{
                      width: 48%;
                      border-radius: 15px;
                      margin: 10px 10px 25px 0;
                  }
                  .img3{
                      width: 31%;
                      border-radius: 15px;
                      margin: 0px 15px 15px 0;
                  }
                }
              }
              .tuCao-invitation-bottom{
                display: flex;
                justify-content: right;
                padding-bottom: 30px;
                section{
                    &:first-of-type{
                        margin-right: 30px;
                        .thumb-number{
                            font-size: 30px;
                        }
                    }
                    .comment-number{
                        font-size: 30px;
                    }
                }
              }
            }
          }
        }
        .btns{
          width: 100%;
          position: fixed;
          left: 50%;
          text-align: center;
          bottom: 30px;
          transform: translateX(-50%);
          .btn{
            width: 240px;
            height: 80px;
            font-size: 35px;
            &:first-of-type{
              margin-right: 65px;
            }
            .iconfont{
              font-size: 40px;
              margin-right: 10px;
            }
          }
        }
    }
</style>