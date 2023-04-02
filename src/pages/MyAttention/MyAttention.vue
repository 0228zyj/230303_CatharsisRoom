<template>
    <div id="my-attention">
        <van-nav-bar
            @click-left="$router.replace('/personal_center')"
            fixed
            class="navBar"
        >
            <template #title>
                <h2 class="title">我的关注 {{ 2 }}</h2>
            </template>
            <template #left>
                <section class="left">
                    <van-icon name="arrow-left" size="23" color="#fff" class="arrow"/>
                    <span >返回</span>
                </section>
            </template>
        </van-nav-bar>
        <ul class="my-attention-list">
            <li @click="toAllCreations">
                <van-swipe-cell>
                    <div class="user">
                        <img src="./imgs/Jay.jpg" alt="头像">
                        <div class="user-type">
                            <section class="user-type-top">
                                <span>葡萄成熟时</span>
                            </section>
                            <section class="user-type-bottom">
                                <span>5岁 · </span>
                                <span>男 · </span>
                                <span>射手座</span>
                            </section>
                        </div>
                    </div>
                </van-swipe-cell>
            </li>
            <li @click="toAllCreations">
                <van-swipe-cell>
                    <div class="user">
                        <img src="./imgs/Jay.jpg" alt="头像">
                        <div class="user-type">
                            <section class="user-type-top">
                                <span>葡萄成熟时</span>
                            </section>
                            <section class="user-type-bottom">
                                <span>5岁 · </span>
                                <span>男 · </span>
                                <span>射手座</span>
                            </section>
                        </div>
                    </div>
                </van-swipe-cell>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'MyAttention',
        methods: {
            toAllCreations(){
                this.$router.push({
                    path:'/all_creations',
                    query:{
                        uid:123456,
                        isOneself:0,
                        isAttention:1,
                    },
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    #my-attention{
        height: 100%;
        width: 100%;
        background-color: #F7F7F7;
        position: relative;
        z-index: 200;
        .navBar{
            height: 100px;
            background-color: #56A6FF;
            color: #fff;
            .title{
                line-height: 100px;
                font-size: 42px;
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
        .my-attention-list{
            width: 100%;
            position: relative;
            top: 130px;
            padding-bottom: 20px;
            background-color: #F7F7F7;
            li{
                width: 90%;
                margin: 0 auto;
                margin-bottom: 19px;
                background-color: #fff;
                border-radius: 20px;
                box-shadow: 0px 0px 11px 2px #c7c7c7;
                .user{
                    display: flex;
                    justify-content:space-evenly;
                    align-items: center;
                    height: 170px;
                    img{
                        width: 110px;
                        height: 110px;
                        border-radius: 50%;
                    }
                    .user-type{
                        width: 70%;
                        height: 149px;
                        font-size: 35px;
                        .user-type-top{
                            padding: 30px 0 20px 0;
                            &>:first-child{
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
</style>