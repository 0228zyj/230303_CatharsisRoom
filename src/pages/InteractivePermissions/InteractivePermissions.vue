<template>
  <div id="interactive-permissions">
    <nav class="navBar">
      <span class="left" @click="$router.replace('/create')">
        <i class="iconfont icon-zuojiantou"></i>
      </span>
      <h3>选择权限</h3>
      <van-button class="complete" @click="complete">完成</van-button>
    </nav>
    <van-radio-group v-model="radio" class="permission-options">
        <van-cell-group class="permission-options-content" :border="false">
            <van-cell 
                v-for="(permission,index) in permissions" 
                :key="index"
                :title="permission"
                clickable
                center
                :border="false"
                class="permission-option"
                @click="radio = index"
            >
                <template #right-icon>
                    <van-radio :name="index" icon-size="18px"/>
                </template>
            </van-cell>
        </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
    export default {
        name:'InteractivePermissions',
        data() {
            return {
                radio:0,
                permissions:["允许互动","关闭互动","仅自己可见"],
            }
        },
        methods: {
            complete(){
                let permission = "允许互动"
                switch (this.radio) {
                    case 1:
                        permission = "关闭互动"
                        break;
                    case 2:
                        permission = "仅自己可见"
                        break;
                    default:
                        break;
                }
                this.$router.replace({
                    path:'/create',
                    query:{
                        permission
                    }
                })
            },
        },
        mounted() {
            this.permissions.map((currentValue,index)=>{
                if(currentValue === this.$route.query.permissionName){
                    this.radio = index
                }
            })
        },
    }
</script>

<style  lang="less" scoped>
    @import '../../assets/mixins.less';
    #interactive-permissions{
        height: 100%;
        width: 100%;
        background-color: #fff;
        position: relative;
        z-index: 200;
        .navBar{
            display: flex;
            width: 100%;
            height: 100px;
            background-color: #fff;
            color: #56A6FF;
            .border-1px(bottom,rgb(187, 186, 186));
            position: fixed;
            top: 0;
            left: 0;
            z-index: 20;
            justify-content: space-between;
            align-items: center;
            .left{
                padding-left: 20px;
                .iconfont{
                    font-size: 42px;
                }
            }
            h3{
                font-size: 37px;
                color: #000;
                font-weight: bold;
            }
            .complete{
                height: 100px;
                border: none;
                font-size: 35px;
                color: #56A6FF;
                margin-right: 7px;
            }
        }
        .permission-options{
            width: 100%;
            background-color: #F7F7F7;
            position: relative;
            top:101px;
            .permission-options-content{
                padding: 0 25px;
                .permission-option{
                    font-size: 32px;
                    padding: 30px 0;
                    .border-1px(bottom,rgb(187, 186, 186));
                }
            }
        }
    }
</style>