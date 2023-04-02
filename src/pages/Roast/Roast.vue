<template>
  <div id="roast">
    <div class="roast-top">
        <span @click="attentionShow=true" :class="{active:attentionShow}">关注</span>
        <span @click="attentionShow=false" :class="{active:!attentionShow}">推荐</span>
        <div class="line" :class="{left:attentionShow}"></div>
    </div>
    <div class="attention" v-show="attentionShow">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class="tuCao-invitations"
            >
                <div class="tuCao-invitation"  v-for="roast in roastList" :key="roast.uid" >
                    <section class="tuCao-invitation-top" @click="toAllCreations">
                        <img :src="roast.headerImg" alt="头像">
                        <section>
                            <p>{{ roast.name }}</p>
                            <p>{{ roast.publishTime }}</p>
                        </section>
                    </section>
                    <!-- 这块内容区域还得考虑当手指按住的时候，在滑动的情况 -->
                    <section class="tuCao-invitation-content" @click="toComment">
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
                        <section @click="toPrivateChat(roast.uid)">
                            <van-icon name="chat-o" size="23px" />
                        </section>
                    </section>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
    <van-tabs 
        v-show="!attentionShow"
        line-height="2px" 
        title-inactive-color="#808080" 
        title-active-color="#363383" 
        :swipeable="true" 
        sticky 
        offset-top="50px" 
        animated 
        class="recommend"
    >
        <van-tab v-model="active" v-for="(topicOption,index) in topicOptions" :title="topicOption" :key="index" title-style="font-size:15px;">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    class="tuCao-invitations"
                >
                    <div class="tuCao-invitation"  v-for="roast in roastList" :key="roast.uid">
                        <section class="tuCao-invitation-top" @click="toAllCreations">
                            <img :src="roast.headerImg" alt="头像">
                            <section>
                                <p>{{ roast.name }}</p>
                                <p>{{ roast.publishTime }}</p>
                            </section>
                        </section>
                        <section class="tuCao-invitation-content" @click="toComment">
                            <h3>#{{ roast.topic }}#</h3>
                            <p>{{ roast.content }}</p>
                            <div class="img-list">
                                <img v-for="(image,index) in roast.imgList" :src="image" :key="index" :class="{img2:roast.imgList.length<=2,img3:roast.imgList.length>2}">
                            </div>
                        </section>
                        <section class="tuCao-invitation-bottom" >
                            <section>
                                <van-icon name="good-job-o" size="23px" :color="roast.color" @click="likeRoast(roast.uid)">
                                    <span class="thumb-number" style="color: #000;"> {{ roast.thumbNumber }}</span>
                                </van-icon>
                                <!-- <van-icon name="good-job" size="23px" v-show="isLike" color="#FF623E" @click="likeRoast($event,true)"/> -->
                                <!-- <span> {{ roast.thumbNumber }}</span> -->
                            </section>
                            <section @click="toComment" class="comment-section">
                                <van-icon name="comment-o" size="23px">
                                    <span class="comment-number" style="color: #000;"> {{ roast.commentNumber }}</span>
                                </van-icon>
                            </section>
                            <section @click="toPrivateChat(roast.uid)">
                                <van-icon name="chat-o" size="23px" />
                            </section>
                        </section>
                    </div>
                </van-list>
            </van-pull-refresh>
        </van-tab>
    </van-tabs>
    <div class="border-line" v-if="!attentionShow"></div>
  </div>
</template>

<script>
    export default {
        name: 'Roast',
        data() {
            return {
                attentionShow:false,
                activeName: "attention",
                active:0,
                topicOptions:['热门','此刻之海','校园生活','职场之海','社会环境','家庭生活','恋爱心理','人际关系'],
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
                loading: false,
                finished: false,
                refreshing: false,
            }
        },
        methods: {
            onLoad() {
                setTimeout(() => {
                    if (this.refreshing) {
                        this.roastList = [];
                        this.refreshing = false;
                    }

                    // for (let i = 0; i < 10; i++) {
                    //     this.list.push(this.list.length + 1);
                    // }
                    this.roastList=[
                        {
                            uid:7802561,
                            headerImg:'./imgs/default.jpeg',
                            name:'Jay-周董-周杰伦',
                            publishTime:'7小时前',
                            topic:'此刻之海',
                            content:'也不是难过吧，只是清晰的记得，有一段时间，我什么也不想要了，也包括我的命，现在重视与自己有关的一切吧。',
                            imgList:['./imgs/default.jpeg','./imgs/default.jpeg','./imgs/default.jpeg','./imgs/default.jpeg','./imgs/default.jpeg'],
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
                            thumbNumber:2,
                            commentNumber:6,
                        },
                    ]
                    this.loading = false;

                    if (this.roastList.length >= 6) {
                        this.finished = true;
                    }
                }, 1000);
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
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
            toComment(){
                this.$router.push('/comment')
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
            toPrivateChat(otherUID){
                this.$router.push({
                    name:'PrivateChat',
                    params:{
                        otherUID
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../../assets/mixins.less';
    #roast{
        width: 100%;
        height: 100%;
        background-color: #fff;
        .roast-top{
            display: flex;
            width: 100%;
            height: 100px;
            background-color: #fff;
            .border-1px(bottom,rgb(187, 186, 186));
            justify-content:center;
            font-size: 38px;
            position: fixed;
            top:0px;
            z-index: 99;
            span{
                line-height: 100px;
                color: #808080;
                &:first-of-type{
                    margin-right: 70px;
                }
            }
            .active{
                color: #363383;
            }
            .line{
                width: 75px;
                height: 5px;
                background-color: #363383;
                border-radius: 30px;
                position: absolute;
                left: 54.8%;
                top: 80px;
                transition: all 0.1s;
            }
            .left{
                transform: translateX(-145px);
            }
        }
        .attention,.recommend{
            .tuCao-invitations{
                margin-top: 110px;
                padding-bottom: 100px;
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
                        .comment-section{
                            margin-right: 30px;
                        }
                    }
                }
            }
        }
        .border-line{
            width: 100%;
            height: 10px;
            background-color: #fff;
            .border-1px(bottom,rgb(187, 186, 186));
            position: fixed;
            top:180px;
            z-index: 99;
        }
    }
</style>