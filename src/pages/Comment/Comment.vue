<template>
  <div id="comment">
    <nav class="navBar">
      <h3 class="title">{{ roast.topic }}</h3>
      <span class="left" @click="$router.back()">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
    </nav>
    <div class="roast-module-contain">
        <div class="roast-module">
            <!-- 内容模块 -->
            <div class="tuCao-invitation">
                <section class="tuCao-invitation-top" @click="toAllCreations">
                    <img :src="roast.headerImg" alt="头像">
                    <section>
                        <p>{{ roast.name }}</p>
                        <p>{{ roast.publishTime }}</p>
                    </section>
                </section>
                <section class="tuCao-invitation-content">
                    <p>{{ roast.content }}</p>
                    <div class="img-list">
                        <img v-for="(image,index) in roast.imgList" :src="image" :key="index" :class="{img2:roast.imgList.length<=2,img3:roast.imgList.length>2}">
                    </div>
                </section>
                <section class="tuCao-invitation-bottom">
                    <span>评论 {{ roast.commentNumber }}</span>
                    <span>点赞 {{ roast.thumbNumber }}</span>
                </section>
            </div>
            <!-- 评论模块 -->
            <ul class="comment-list">
                <li class="tip">
                    <img src="./imgs/realName.jpg" alt="">
                    <span>发布第一条评论...</span>
                </li>
            </ul>
        </div>
    </div>
    <footer class="footerNav">
        <div class="tabBar">
            <section>
                <van-icon name="good-job-o" size="23px" :color="roast.color" @click="likeRoast(roast.uid)"/>
                <span>点赞</span>
            </section>
            <section @click="comment" class="comment-section">
                <van-icon name="comment-o" size="23px"/>
                <span>评论</span>
            </section>
            <section @click="toPrivateChat(roast.uid)">
                <van-icon name="chat-o" size="23px" />
                <span>私聊</span>
            </section>
        </div>
    </footer>
    <!-- 点击评论图标，弹出一个弹出层。弹出层（其遮罩层为透明色）里包含输入框 ,backgroundColor:'#363383' -->
    <van-popup v-model="showInput" position="bottom" :overlay-style="{backgroundColor:'transparent'}" >
        <div class="comment-input-contain">
            <div class="comment-input">
                <img :src="statusImg" alt="类型">
                <van-field 
                    v-model="commentValue" 
                    :placeholder="placeholderValue" 
                    rows="1"
                    autosize
                    type="textarea"
                    :autofocus="true"
                    center
                    class="input"
                />
                <van-button class="btn1" @click="changeStatus" v-show="!commentValueLength">
                    <span>{{ statusValue }}</span>
                </van-button>
                <van-button class="btn2" @click="sendComent" v-show="commentValueLength">
                    <span v-show="commentValueLength">
                        <i class="iconfont icon-fasong2"></i>
                    </span>
                </van-button>
            </div>
        </div>
    </van-popup>
  </div>
</template>

<script>
    export default {
        name:'Comment',
        data() {
            return {
                roast:{
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
                showInput:false,
                placeholderValue:'回复楼主',
                commentValue:'',
                statusImg:'./imgs/niMing.jpeg',
                statusValue:'切换为真身',
            }
        },
        methods: {
            likeRoast(){
                if(this.roast.isLike){
                    this.roast.thumbNumber--
                    this.roast.color = "#000"
                }else{
                    this.roast.thumbNumber++
                    this.roast.color = "#FF623E"
                    this.$toast({
                        icon: 'good-job-o',
                        className: 'toast-thumb',
                        duration:1000
                    })
                }
                this.roast.isLike = !this.roast.isLike
            },
            toAllCreations(){
                this.$router.push({
                    path:'/all_creations',
                    query:{
                        uid:123456,
                        isOneself:0,
                    },
                })
            },
            comment(){
                this.showInput = true;
            },
            toPrivateChat(otherUID){
                this.$router.push({
                    name:'PrivateChat',
                    params:{
                        otherUID
                    }
                })
            },
            changeStatus(){
                if(this.statusValue === '切换为分身'){
                    this.statusValue = '切换为真身'
                    this.statusImg = './imgs/niMing.jpeg'
                }else if(this.statusValue === '切换为真身'){
                    this.statusValue = '切换为分身'
                    this.statusImg = './imgs/realName.jpg'
                }
            },
            sendComent(){
                
            }
        },
        computed:{
            commentValueLength(){
                return this.commentValue !== ''
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/mixins.less';
    #comment{
        height: 100%;
        width: 100%;
        background-color: #F7F7F7;
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
            z-index: 99;
            .title{
                line-height: 100px;
                font-size: 38px;
                color: #000;
                text-align: center;
                font-weight: bold;
            }
            .left{
                position: absolute;
                top:25%;
                left: 10px;
                .iconfont{
                    font-size: 45px;
                }
            }
        }
        .roast-module-contain{
            width: 100%;
            background-color: #F7F7F7;
            position: relative;
            top:125px;
            z-index: 10;
            .roast-module{
                width: 93%;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 30px;
                box-shadow: 0px 0px 11px 4px #EAEAEA;
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
                        p{
                            padding: 20px 0;
                            padding-top: 30px;
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
                        justify-content: space-between;
                        padding: 35px 0;
                        padding-bottom: 15px;
                        span{
                            font-size: 35px;
                            &:first-of-type{
                                font-weight: bold;
                            }
                            &:last-of-type{
                                color: #8D8D8D;
                            }
                        }
                        
                    }
                }
                .comment-list{
                    width: 92%;
                    margin: 0 auto;
                    padding: 40px 0;
                    li.tip{
                        display: flex;
                        align-items: center;
                        color: #CCCCCC;
                        img{
                            width: 45px;
                            border-radius: 50%;
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
        .footerNav{
            position: fixed;
            bottom: 0;
            width: 100%;
            margin: 0 auto;
            z-index: 99;
            .tabBar{
                .border-1px(top,rgb(187, 186, 186));
                display: flex;
                width: 100%;
                height: 100px;
                background-color: #fff;
                margin: 0 auto;
                justify-content: center;
                align-items: center;
                section{
                    width: 33%;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &>:first-child{
                        margin-right: 20px;
                    }
                }
            }
        }
        .comment-input-contain{
            width: 100%;
            .border-1px(top,rgb(187, 186, 186));
            .comment-input{
                display: flex;
                width: 89%;
                margin: 0 auto;
                padding: 20px 0;
                align-items: end;
                img{
                    width: 45px;
                    border-radius: 50%;
                }
                .input{
                    font-size: 30px;
                    line-height: 30px;
                }
                .btn1,.btn2{
                    width: 215px;
                    background-color: #fff;
                    border: none;
                    color: #56A6FF;
                    font-size: 25px;
                    font-weight:bolder;
                    .icon-fasong2{
                        font-size: 40px;
                    }
                }
                .btn2{
                    width: 90px;
                }
            }
        }
    }
</style>