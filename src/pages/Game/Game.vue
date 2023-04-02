<template>
  <div id="game">
    <section class="game-title">
        <h2>Playful小游戏</h2>
    </section>
    <!-- 先写好，到时候用JavaScript重复调用开启，这样就能保证背景音乐的循环播放。 -->
    <audio src="./audio/By Your Side-Jonas Blue,Raye.320.mp3" ref="bgAudio" loop></audio>
    <section class="game-content">
        <!-- 最高分数的实时更新通过数据库来实现 -->
        <div class="maximum-score">
            <!-- <div> -->
                <img src="./imgs/maximum_score2.png" alt="最高分">
            <!-- </div> -->
            <h3 ref="maximumScore">0</h3>
        </div>
        <!-- 游戏开始按钮 -->
        <button class="startgame" @click="startGame" ref="startGame">开 始 游 戏</button>
        <h3 class="rule" @click="showRules">游戏玩法</h3>

        <!-- 游戏开始界面 -->
        <!-- <div class="game-interface" :class="{on:false}"> -->
        <!-- 分数 -->
        <div class="fs" :class="{on:isBegin}"><span>分数：</span><span class="score" ref="score">0</span></div>

        <!-- 敌人碰到玩家弹出gameover的div。 -->
        <div class="gameover" ref="gameOver">
            <h1>分数：<span class="Gscore" ref="gScore">0</span></h1>
            <button class="resgame" @click="reload">重 新 开 始</button>
        </div>
        <!-- </div> -->
        <audio src="./audio/launch.mp3" ref="launchAudio"></audio>
        <canvas class="canvas" ref="canvas"></canvas>
        <audio src="./audio/boom2.mp3" ref="boomAudio"></audio>
    </section>
    <van-popup v-model="show" round class="popup" >
        <van-list class="rule-options">
            <van-cell class="rule-option" v-for="(item,index) in list" :key="index" >
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <van-icon name="fire" color="#F7630C"/>
                    <span class="custom-title">{{item}}</span>
                </template>
            </van-cell>
        </van-list>
    </van-popup>
  </div>
</template>

<script>
    export default {
        name: 'Game',
        data() {
            return {
                isBegin:false,
                maximumScore:0,
                show:false,
                list:[
                    "中间的白色圆球是玩家！",
                    "点击黑色地区，会向那个地方发射白色子弹，并且会有发生子弹的音效！",
                    "在随机地方生成敌人，随机颜色，会往玩家位置飞过来！",
                    "玩家需要点击敌人大概的位置，射出子弹拦住敌人！",
                    "击中敌人发出音效！如果敌人较大，还需要继续射击！",
                    "游戏有背景音乐！",
                    "敌人碰到玩家，游戏结束！",
                ],
            }
        },
        methods: {
            startGame(){
                this.isBegin = true
                let canvas = this.$refs.canvas
                let ctx = this.$refs.canvas.getContext('2d');
                // 设置canvas宽高
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                this.$refs.bgAudio.play() //播放音乐
                let _this = this // 保存this

                // 通用属性
                class Item {
                    constructor(x, y, radius, color, velocity) {
                        this.x = x;
                        this.y = y;
                        this.radius = radius;
                        this.color = color;
                        this.velocity = velocity;
                    };
                
                    // 绘制
                    draw() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = this.color;
                        ctx.fill();
                    };
                
                    // 移动
                    ai() {
                        this.draw();
                        this.x = this.x + this.velocity.x;
                        this.y = this.y + this.velocity.y;
                    };
                };
                // 玩家
                class Player extends Item {
                    constructor(x, y, radius, color) {
                        super(x, y, radius, color);
                        this.draw();
                    };
                };
                // 敌人
                class Ele extends Item {
                    constructor(x, y, radius, color, velocity) {
                        super(x, y, radius, color, velocity);
                    };
                };           
                // 子弹
                class Bullet extends Item {
                    constructor(x, y, radius, color, velocity) {
                        super(x, y, radius, color, velocity);
                    };
                };
                // 粒子效果
                class Particle extends Item {
                    constructor(x, y, radius, color, velocity, friction) {
                        super(x, y, radius, color, velocity);
                        this.x = x;
                        this.y = y;
                        this.radius = radius;
                        this.color = color;
                        this.velocity = velocity;
                        this.alpha = 1;
                        this.friction = friction;
                    };
                
                    draw() {
                        ctx.save();
                        ctx.globalAlpha = this.alpha;
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = this.color;
                        ctx.fill();
                        ctx.restore();
                    };
                
                    ai() {
                        this.draw();
                        this.velocity.x *= this.friction;
                        this.velocity.y *= this.friction;
                        this.x = this.x + this.velocity.x;
                        this.y = this.y + this.velocity.y;
                        this.alpha -= 0.01;
                    };
                };

                let bulletArray = [];
                let eleArray = [];
                let particles = [];
            
                let oScore = this.$refs.score
                let oGameOver = this.$refs.gameOver;
                let Gscore =  this.$refs.gScore;
                let score = 0;
                let flag = true;
                this.$refs.startGame.disabled = true;
                this.$refs.startGame.style.top = -60 + 'px';

                // 动画
                let animateId;

                function animate() {
                    if (flag) requestAnimationFrame(animate);
                    // 填充背景颜色
                    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    // 创建玩家
                    let player = new Player(canvas.width / 2, canvas.height / 2, 20, 'white');

                    // 遍历子弹
                    bulletArray.map((item, index) => {
                        item.ai()
                        // 删除
                        if (item.x <= 0 - item.radius || item.y <= 0 - item.radius || item.x >= canvas.width || item.y >= canvas.height) {
                            bulletArray.splice(index, 1);
                        }
                        // 判断
                        eleArray.map((ele, i) => {
                            let dist = Math.hypot(ele.x - item.x, ele.y - item.y);
                            // 添加粒子效果
                            if (dist - item.radius - ele.radius < 1) {
                                for (let i = 0; i < item.radius * 8; i++) {
                                    particles.push(new Particle(ele.x, ele.y, Math.random() * 4, ele.color, {
                                        x: (Math.random() - 0.5) * (Math.random() * 8),
                                        y: (Math.random() - 0.5) * (Math.random() * 8),
                                    }, 0.97));
                                }
                                if (ele.radius - 16 > 10) {
                                    ele.radius -= 16;
                                    bulletArray.splice(index, 1);
                                    score += 25;
                                    oScore.innerHTML = score;
                                    _this.$refs.boomAudio.currentTime = 0
                                    _this.$refs.boomAudio.play()
                                } else {
                                    bulletArray.splice(index, 1);
                                    eleArray.splice(i, 1);
                                    score += 50;
                                    oScore.innerHTML = score;
                                    _this.$refs.boomAudio.currentTime = 0
                                    _this.$refs.boomAudio.play()
                                }
                            }
                        })
                    })

                    // 遍历敌人
                    eleArray.map((item) => {
                        item.ai()
                        // 判断玩家和敌人碰撞 游戏结束
                        let dist = Math.hypot(player.x - item.x, player.y - item.y)
                        if (dist - item.radius - player.radius < 1) {
                            flag = false;
                            Gscore.innerHTML = score;
                            oGameOver.style.display = 'block';
                            _this.$refs.bgAudio.pause() // 暂停音乐
                        }
                    })

                    particles.map((item, index) => {
                        if (item.alpha <= 0) {
                            particles.splice(index, 1)
                        } else {
                            item.ai()
                        }
                    })
                }
                animate()

                // 子弹
                window.ontouchstart = function (e) {
                    if (!flag) return

                    // 子弹发射时的声音
                    _this.$refs.launchAudio.currentTime = 0 // 每次点击屏幕时，重置发射声音的时间，这样可以保证发射激光没有延迟
                    _this.$refs.launchAudio.play()

                    // 返回原点到点的线段与x轴正方向之间的平面角度
                    let angle = Math.atan2(e.changedTouches[0].clientY - canvas.height / 2, e.changedTouches[0].clientX - canvas.width / 2)
                    // 把角度转换（velocity来调整子弹发射的速度）
                    let velocity = {
                        x: Math.cos(angle) * 2.5,
                        y: Math.sin(angle) * 2.5
                    }
                    // 添加到数组里
                    bulletArray.push(new Bullet(canvas.width / 2, canvas.height / 2, 5, 'white', velocity))
                }

                // 敌人
                setInterval(() => {
                    if (!flag) return;
                    // 随机大小
                    let radius = Math.random() * (35 - 15) + 15;
                    // 随机颜色
                    let color = `hsl(${Math.random() * 360}, 50%, 50%)`
                    let x, y;
                    // 随机位置
                    if (Math.random() < 0.5) {
                        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
                        y = Math.random() * canvas.height + radius
                    } else {
                        x = Math.random() * canvas.width + radius
                        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
                    }
                    let angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
                    // velocity来调整敌人出现速度
                    let velocity = {
                        x: Math.cos(angle) * 1,
                        y: Math.sin(angle) * 1,
                    };
                    eleArray.push(new Ele(x, y, radius, color, velocity));
                }, 3000);
            },
            // 重新开始游戏
            reload(){
                // 用于刷新当前文档
                location.reload()
            },
            showRules(){
                this.show = true
            },
        },
        mounted(){
            // 让文字无法被选中
            document.addEventListener("selectstart", function (e) {
                e.preventDefault();
            })
        },
    }
</script>

<style lang="less" scoped>
    #game{
        width: 100%;
        height: 100%;
        .game-title{
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
        .game-content{
            .maximum-score{
                display: flex;
                flex-direction: column;
                text-align: center;
                // background-color: #56A6FF;
                position: fixed;
                left: 50%;
                top: 15%;
                transform: translate(-50%, 0);
                img{
                    width:450px;
                }
                h3{
                    font-size: 95px;
                    color: #171E60;
                }
            }
            .startgame,.resgame {
                width: 400px;
                height: 120px;
                background-color: #363383;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                outline: none;
                border: none;
                border-radius: 40px;
                color: white;
                font-size: 50px;
                cursor: pointer;
                transition: all .2s linear;
            }
            .rule{
                position: fixed;
                left: 50%;
                top: 60%;
                transform: translate(-50%, -50%);
                font-size: 35px;
                color: #6B6B6B;
            }
            .resgame {
                margin-top: 50px;
            }
            .fs {
                font-size: 50px;
                color: white;
                position: fixed;
                z-index: 9999;
                display: none;
                &.on{
                    display: block;
                }
            }
            .gameover {
                padding: 50px;
                width: 500px;
                height: 300px;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                text-align: center;
                border-radius: 20px;
                display: none;
                font-size: 50px;
                z-index: 9999;
            }
            .canvas{
                position: relative;
                z-index: 999;
            }
        }
        .popup{
            height: 62%;
            width: 80%;
            padding-top: 20px;
            .rule-options{
                height: 100%;
                .rule-option{
                    font-size: 42px;
                    line-height: 55px;
                }
            }
        }
    }

</style>