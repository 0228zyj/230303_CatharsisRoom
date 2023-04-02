<template>
  <div id="private-chat">
    <!-- 顶部导航功能 -->
    <nav class="navBar">
        <h3 class="title">
            <img src="./imgs/niMing.jpeg" alt="头像">
            <span>小池</span>
        </h3>
        <span class="left" @click="$router.back()">
            <i class="iconfont icon-zuojiantou"></i>
        </span>
    </nav>
    <!-- 中间聊天框功能 -->
    <div class="chat-interface-contain">
        <div class="chat-interface">

        </div>
    </div>
    <!-- 底部输入框功能 -->
    <footer class="footer-part">
        <div class="changeStatus">
            <span>开始对话前，你可以</span>
            <span>切换为分身</span>
        </div>
        <div class="input-dispatch">
            <div class="input-contain">
                <van-field
                    v-model="message"
                    rows="1"
                    autosize
                    center
                    type="textarea"
                    placeholder="你说 ..."
                    class="input"
                />
            </div>
            <div class="btn-contain">
                <van-button color="#67AEFE" class="btn">
                    <template #icon>
                        <span>
                            <i class="iconfont icon-fasong1"></i>
                        </span>
                    </template>
                </van-button>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
    export default {
        name:'PrivateChat',
        data() {
            return {
                message:'',
            }
        },
        mounted() {
            // 在挂载之后通过otherUID查询后台数据
            console.log(this.$route.params.otherUID)
        },
    }
</script>

<style lang="less" scoped>
    @import '../../assets/mixins.less';
    #private-chat{
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
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 38px;
                color: #000;
                img{
                    width: 50px;
                    border-radius: 50%;
                    margin-right: 15px;
                }
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
        .chat-interface-contain{
            width: 100%;
            background-color: #F7F7F7;
            position: relative;
            top:125px;
            .chat-interface{
                width: 95%;
                margin: 0 auto;

            }
        }
        .footer-part{
            width: 100%;
            position: fixed;
            bottom: 0;
            z-index: 99;
            .changeStatus{
                width: 65%;
                margin: 0 auto;
                margin-bottom: 40px;
                text-align: center;
                background-color: #EAEAEA;
                padding: 15px 0;
                border-radius: 10px;
                font-size: 28px;
                color: #797979;
                span{
                    &:first-of-type{
                        margin-right: 15px;
                    }
                    &:last-of-type{
                        color: #58A8FF;
                    }
                }
            }
            .input-dispatch{
                display: flex;
                // justify-content: center;
                align-items:end;
                padding: 20px 0;
                .input-contain{
                    width: 85%;
                    .input{
                        width: 95%;
                        margin: 0 auto;
                        padding: 20px 30px;
                        font-size: 30px;
                        line-height: 32px;
                        border: 2px solid #000;
                        border-radius: 40px;
                        background-color: #F0F0F0;
                    }
                }
                .btn-contain{
                    width: 15%;
                    text-align: center;
                    .btn{
                        height: 45px;
                        width: 45px;
                        padding: 35px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
</style>