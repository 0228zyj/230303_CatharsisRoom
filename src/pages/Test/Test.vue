<template>
  <div id="test">
    <section class="test-title">
        <h2>Funny小测试</h2>
    </section>
    <section class="test-content">
        <van-cell center class="test-option test-option-top"></van-cell>
        <van-cell 
            v-for="(testOption,index) in testOptions" 
            :key="index" 
            center 
            :title="testOption" 
            title-class="title-option" 
            class="test-option"
            @click="toTestVolume(testOption)"
        >
            <template #right-icon>
                <van-icon name="arrow" size="20px" />
            </template>
        </van-cell>
        <van-cell center class="test-option test-option-bottom"></van-cell>
    </section>
    <section class="test-tips">
        <h3 @click="showTestTips">Funny小测试提示</h3>
    </section>
    <van-popup v-model="show" round class="popup" >
        <van-list class="tip-options">
            <van-cell class="tip-option" v-for="(item,index) in list" :key="index" >
                <template #title>
                    <van-icon name="bulb-o" size="25px" color="#FD9B13"/>
                    <span class="custom-title">{{item}}</span>
                </template>
            </van-cell>
        </van-list>
    </van-popup>
  </div>
</template>

<script>
    export default {
        name: 'Test',
        data() {
            return {
                testOptions:["情绪测试",'焦虑测试','睡眠质量测试',"人际关系测试"],
                show:false,
                list:[
                    "点击不同的测试选项可以测试不同的内容哦！",
                    "题目全部选择完后，点击提交按钮，就可以出属于你自己的分析结果哦！",
                    "我们会不定时地更新到最新的最权威的测试题目哦！",
                ],
            }
        },
        methods: {
            toTestVolume(testOption){
                this.$router.push({
                    path:'/test_volume',
                    query:{
                        testOption,
                    },
                })
            },
            showTestTips(){
                this.show = true
            }
        },
    }
</script>

<style lang="less" scoped>
    #test{
        .test-title{
            width: 100%;
            background-color: #00479D;
            color: #fff;
            text-align: center;
            font: 50px Fantasy;
            padding: 20px 0;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 100;
        }
        .test-content{
            padding-top: 200px;
            .title-option{
                font-size: 40px;
            }
            .test-option{
                width: 90%;
                padding: 30px 30px;
                margin: 0 auto;
                margin-top: 20px;
                border-radius: 20px;
                background-color: #4C8DE9;
                color: #fff;
                &.test-option-top{
                    border-radius: 35px;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    background-color: #00479D;
                }
                &.test-option-bottom{
                    border-radius: 35px;
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    background-color: #00479D;
                }
            }
        }
        .test-tips{
            width: 100%;
            text-align: center;
            padding-top: 50px;
            font-size: 35px;
            color: #6B6B6B;
        }
        .popup{
            height: 35%;
            width: 80%;
            padding-top: 20px;
            .tip-options{
                height: 100%;
                .tip-option{
                    font-size: 38px;
                    line-height: 55px;
                }
            }
        }
    }
</style>