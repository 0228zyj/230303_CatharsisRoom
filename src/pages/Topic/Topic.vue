<template>
  <div id="topic">
    <nav class="navBar">
      <h3 class="title">选择话题</h3>
      <span class="left" @click="$router.replace('/create')">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
    </nav>
    <div class="topic-options">
        <h3>选择自己想要吐槽的话题（默认是 #此刻#）</h3>
        <ul>
            <li class="topic-option" v-for="(topicOption,index) in topicOptions" :key="index" @click="selectTopic(topicOption)">
                <span>
                    <i class="iconfont icon-huati1"></i>
                </span>
                <span>{{ topicOption }}</span>
            </li>
        </ul>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh"></van-pull-refresh>
    </div>
    
  </div>
</template>

<script>
    export default {
        name:'Topic',
        data() {
            return {
                topicOptions:['此刻之海','校园生活','职场之海','社会环境','家庭生活','恋爱心理','人际关系'],
                isLoading: false,
            };
        },
        methods: {
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功！')
                    this.isLoading = false;
                }, 1000);
            },
            selectTopic(topicOption){
                this.$router.replace({
                    path:'/create',
                    query:{
                        topicOption
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../../assets/mixins.less';
    #topic{
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
                font-size: 37px;
                color: #000;
                text-align: center;
            }
            .left{
                position: absolute;
                top:30%;
                left: 20px;
                .iconfont{
                    font-size: 42px;
                }
            }
        }
        .topic-options{
            width: 100%;
            position: relative;
            top: 130px;
            background-color: #fff;
            h3{
                width: 90%;
                margin: 0 auto;
                color: #666666;
                font-size: 28px;
            }
            ul{
                width: 90%;
                margin: 0 auto;
                padding-top: 38px;
                .topic-option{
                    line-height: 95px;
                    background-color: #56A6FF;
                    color: #fff;
                    border-radius: 20px;
                    margin-bottom: 15px;
                    span{
                        &:first-of-type{
                            margin:0 15px 0 30px;
                            .icon-huati1{
                                font-size: 42px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>