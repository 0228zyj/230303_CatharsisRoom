<template>
  <div id="message">
    <van-nav-bar
        @click-left="$router.replace('/personal_center')"
        fixed
        class="navBar"
    >
        <template #title>
            <h2 class="title">消息列表</h2>
        </template>
        <template #left>
            <section class="left">
                <van-icon name="arrow-left" size="23" color="#fff" class="arrow"/>
                <span >返回</span>
            </section>
        </template>
    </van-nav-bar>
    <ul class="message-list">
        <li @click="toPrivateChat">
            <van-swipe-cell>
                <div class="content">
                    <img src="./imgs/Jay.jpg" alt="头像">
                    <div class="content-type">
                        <section class="content-type-top">
                            <span>系统通知</span>
                            <span>7天前</span>
                        </section>
                        <section class="content-type-bottom ellipsis">
                            <span>你你你你你你你你你你你你你你你你你你你你你你你你你你</span>
                        </section>
                    </div>
                </div>
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </li>
        <li @click="toPrivateChat">
            <van-swipe-cell>
                <div class="content">
                    <img src="./imgs/Jay.jpg" alt="头像">
                    <div class="content-type">
                        <section class="content-type-top">
                            <span>系统通知</span>
                            <span>7天前</span>
                        </section>
                        <section class="content-type-bottom ellipsis">
                            <span>你你你你你你你你你你你你你你你你你你你你你你你你你你</span>
                        </section>
                    </div>
                </div>
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {
                
            }
        },
        methods: {
            toPrivateChat(){
                this.$router.push('/private_chat')
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../../assets/mixins.less';
    #message{
        // height: 100%;
        width: 100%;
        background-color: #fff;
        .navBar{
            height: 100px;
            background-color: #56A6FF;
            color: #fff;
            .title{
                line-height: 100px;
                font-size: 45px;
                color: #fff;
                position: relative;
                top: 25px;
            }
            .left{
                font-size: 35px;
                position: relative;
                left: 0;
                top: 20px;
                .arrow{
                    padding-top: 15px;
                }
            }
        }
        .message-list{
            width: 100%;
            position: relative;
            top: 120px;
            padding-bottom: 135px;
            li{
                width: 100%;
                .content{
                    display: flex;
                    justify-content:space-evenly;
                    align-items: center;
                    height: 150px;
                    img{
                        width: 110px;
                        height: 110px;
                        border-radius: 50%;
                    }
                    .content-type{
                        width: 70%;
                        height: 149px;
                        .border-1px(bottom,rgb(187, 186, 186));
                        font-size: 35px;
                        .content-type-top{
                            display: flex;
                            justify-content: space-between;
                            padding: 30px 0 20px 0;
                            &>:first-child{
                                font-weight: bold;
                            }
                            &>:last-child{
                                font-size: 25px;
                                color: #9D9D9D;
                            }
                        }
                        .content-type-bottom{
                            color: #6B6B6B
                        }
                    }
                }
                .delete-button {
                    height: 100%;
                }
            }
        }
       
    }
</style>