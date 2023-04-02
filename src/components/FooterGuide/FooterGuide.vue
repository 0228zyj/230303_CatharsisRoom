<template>
  <div id="footer_guide">
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/roast'}" @click="goTo('/roast')">
        <span>
            <i class="iconfont icon-wode"></i>
        </span>
        <span>吐槽</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/game'}" @click="goTo('/game')">
        <span>
            <i class="iconfont icon-youxi"></i>
        </span>
        <span>小游戏</span>
    </a>
    <a href="javascript:;" class="guide_item add_item" @click="goTo('/create')">
        <span>
            <i class="iconfont icon-out-column icon-add"></i>
        </span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/test'}" @click="goTo('/test')">
        <span>
            <i class="iconfont icon-xinicon_huabanfuben"></i>
        </span>
        <span>小测试</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path === '/personal_center'}" @click="goTo('/personal_center')">
        <span>
            <i class="iconfont icon-shouye"></i>
        </span>
        <span>我的</span>
    </a>
  </div>
</template>

<script>
    export default {
        name: 'FooterGuide',
        methods: {
            // 切换路由
            goTo(path){
                this.$router.push(path)
            }
        },
    }
</script>

<style scoped lang="less">
    @import '../../assets/mixins.less';
    #footer_guide{
        display: flex;
        width:100%;
        height: 100px;
        // .border-1px(top,#e4e4e4);
        .border-1px(top,rgb(187, 186, 186));
        background: #fff;
        position: fixed;
        bottom: 0;
        z-index:100;
        .guide_item{
            flex:1;
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items:center;
            justify-items: center;
            margin:10px;
            &.on{
                color:#363383;
            }
            span{
                font-size: 24px;
                margin:4px 0;
                .iconfont{
                    font-size: 44px;
                    &.icon-add{
                        font-size: 88px;
                        color: #363383;
                    }
                }
            }
            &.add_item{
                margin:0px;
                span{
                    line-height: 100px;
                }
            }
        }
    }
</style>