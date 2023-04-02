<template>
  <div id="test-volume">
    <van-nav-bar
        @click-left="$router.replace('/test')"
        fixed
        class="navBar"
    >
        <template #title>
            <h2 class="head-title">{{ testName }}</h2>
        </template>
        <template #left>
            <section class="left" >
                <van-icon name="arrow-left" size="23" color="#fff" class="arrow"/>
                <span >返回</span>
            </section>
        </template>
    </van-nav-bar>
    <div class="titles">
      <van-form @submit="onSubmit">
        <van-field :name="testTopic.topicsName" :border="false" v-for="(testTopic,index) in testTopics" :key="index">
          <template #input>
            <van-cell class="title" :border="false" >
              <template #title>
                <span class="title-name">{{ testTopic.title }}</span>
              </template>
              <template #label>
                <section class="title-options">
                  <van-radio-group v-model="testTopic.radio">
                    <van-cell clickable center :border="false" v-for="(topic,key) in testTopic.topics" :key="key" class="title-option" @click="testTopic.radio = key">
                      <template #title>
                        <span class="title-option-content">
                          {{ topic.content }}
                        </span>
                      </template>
                      <template #icon>
                        <van-radio :name="key" icon-size="19px" class="radio"/>
                      </template>
                    </van-cell>
                  </van-radio-group>
                </section>
              </template>
            </van-cell>
          </template>
        </van-field>
        <!-- <van-cell class="title" :border="false" v-for="(testTopic,index) in testTopics" :key="index">
          <template #title>
            <span class="title-name">{{ testTopic.title }}</span>
          </template>
          <template #label>
            <section class="title-options">
              <van-radio-group v-model="testTopic.radio">
                <van-cell clickable center :border="false" v-for="(topic,key) in testTopic.topics" :key="key" class="title-option" @click="testTopic.radio = key">
                  <template #title>
                    <span class="title-option-content">
                      {{ topic }}
                    </span>
                  </template>
                  <template #icon>
                    <van-radio :name="key" icon-size="19px" class="radio"/>
                  </template>
                </van-cell>
              </van-radio-group>
            </section>
          </template>
        </van-cell> -->
        <!-- <van-cell class="title" :border="false">
          <template #title>
            <span class="title-name">2.情绪测试题</span>
          </template>
          <template #label>
            <section class="title-options">
              <van-radio-group v-model="radio">
                <section class="title-option">
                  <van-radio name="1" icon-size="19px" class="radio"></van-radio>
                  <div class="title-option-content">
                    单选框 1单选框 1
                  </div>
                </section>
                <section class="title-option">
                  <van-radio name="2" icon-size="19px" class="radio"></van-radio>
                  <div class="title-option-content">
                    单选框 2单选框 2单选框 2单选框 2单选框 2单选框 3
                  </div>
                </section>
                <section class="title-option">
                  <van-radio name="3" icon-size="19px" class="radio"></van-radio>
                  <div class="title-option-content">
                    单选框 1单选框 1
                  </div>
                </section>
                <section class="title-option">
                  <van-radio name="4" icon-size="19px" class="radio"></van-radio>
                  <div class="title-option-content">
                    单选框 4单选框 4单选框 4单选框 4单选框 4单选框 4
                  </div>
                </section>
              </van-radio-group>
            </section>
          </template>
        </van-cell> -->
        <div style="padding: 16px 0 32px 0;width: 100%;">
          <van-button round block type="info" native-type="submit" class="submit">提交</van-button>
        </div>
      </van-form>
    </div>

    <!-- 这一块是提示分析结果功能（还没实现） -->
    <van-popup v-model="showResult" round class="popup" >
        <h3>你属于</h3>
        <span></span>
    </van-popup>
  </div>
</template>

<script>
    export default {
        name:"TestVolume",
        data() {
          return {
            testName:'',
            testTopics:[
              {
                topicsName:'number1',
                title:'1、如果让你选择，你更愿意',
                topics:[
                  {
                    content:"独自工作",
                    score:1
                  },
                  {
                    content:"和一些人一起工作",
                    score:2
                  },
                  {
                    content:"同许多人一起工作并亲密接触",
                    score:3
                  },
                ],
                radio:'',
              },
              {
                topicsName:'number2',
                title:'2、当为解闷而读书时，你喜欢',
                topics:[
                  {
                    content:"读史书、秘闻、传记类",
                    score:1
                  },
                  {
                    content:"读历史小说、社会问题小说",
                    score:2
                  },
                  {
                    content:"读幻想小说、荒诞小说",
                    score:3
                  },
                ],
                radio:''
              },
              {
                topicsName:'number3',
                title:'3、对恐怖影片你的态度是',
                topics:[
                  {
                    content:"不能忍受",
                    score:1
                  },
                  {
                    content:"很喜欢",
                    score:2
                  },
                  {
                    content:"害怕",
                    score:3
                  },
                ],
                radio:''
              },
              {
                topicsName:'number4',
                title:'4、以下哪种情况符合你',
                topics:[
                  {
                    content:"很少关心他人的事",
                    score:1
                  },
                  {
                    content:"关心熟人的生活",
                    score:2
                  },
                  {
                    content:"爱听新闻，关心别人的生活细节",
                    score:3
                  },
                ],
                radio:''
              },
              {
                topicsName:'number5',
                title:'5、去外地时，你会',
                topics:[
                  {
                    content:"为亲戚们的平安感到高兴",
                    score:1
                  },
                  {
                    content:"希望去更多的地方",
                    score:2
                  },
                  {
                    content:"陶醉于自然风光",
                    score:3
                  },
                ],
                radio:''
              },
            ],
            showResult:false,
          }
        },
        methods: {
          onSubmit(values){
            let isAllSelect = 0 // 0：表示题目全部选择完毕，1：表示至少有一道题目未选择
            for (let key in values) {
              if (values.hasOwnProperty(key) && values[key] === '') {
                isAllSelect++
                break
              }
            }
            if(isAllSelect === 0){
              // 如果为0则计算分数，发送请求
              this.showResult = true
            }else{
              // 如果为1则提醒用户题目还没完成
              this.$toast({
                message:'！你还有题目未完成哦，请完成后在提交',
                className: 'toast-other',
                duration:3000,
              })
            }
          },
        },
        mounted(){
          this.testName = this.$route.query.testOption
        },
    }
</script>

<style lang="less" scoped>
  @import '../../assets/mixins.less';
  #test-volume{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    z-index: 200;
    .navBar{
        height: 100px;
        background-color: #4C8DE9;
        color: #fff;
        .head-title{
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
    .titles{
      width: 100%;
      position: relative;
      top: 120px;
      background-color: #fff;
      .title{
        padding: 15px 35px;
        .border-1px(bottom,rgb(187, 186, 186));
        margin-bottom: 15px;
        .title-name{
          font-size: 41px;
        }
        .title-options{
          font-size: 38px;
          margin-top: 25px;
          .title-option{
            .radio{
              width: 65px;
              align-self:flex-start
            }
            .title-option-content{
              font-size: 38px;
              line-height: 42px;
              color: #000;
            }
          }
        }
      }
      .submit{
        width: 80%;
        height: 80px;
        font-size: 38px;
        margin: 0 auto;
      }
    }
    .popup{
      
    }
  }
</style>