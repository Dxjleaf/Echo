# Echo Chamber Web - 代码库总结文档

## 📋 项目概述

**Echo Chamber** 是一个基于 Web 的互动式文字冒险游戏，采用纯 JavaScript 实现，无需任何框架。游戏通过对话系统、五感展示系统和背景效果系统，为玩家提供沉浸式的叙事体验。

**核心特色**：
- 🎭 **科幻悬疑剧情**：失忆主角在神秘封闭环境中的探索
- 🎨 **极简设计**：纯文字界面，无复杂UI元素
- 🎯 **五感系统**：通过感官体验营造沉浸感
- 🔄 **循环结构**：多循环叙事，每次都有新发现

---

## 🗂️ 项目结构

```
EchoChamber_Web/
├── index.html                    # 主入口文件
├── css/                         # 样式文件目录
│   ├── main.css                 # 主样式文件
│   ├── dialogue.css             # 对话系统样式
│   ├── background.css           # 背景效果样式
│   └── continuous-sense.css     # 五感显示样式
├── js/                          # JavaScript 代码目录
│   ├── core/                    # 核心系统
│   │   ├── GameManager.js       # 游戏主管理器
│   │   ├── DialogueSystem.js    # 对话系统
│   │   ├── SimpleSenseSystem.js # 五感显示系统（支持左右分离）
│   │   └── BackgroundManager.js  # 背景管理器
│   ├── story/                   # 剧情相关
│   │   ├── StoryManager.js      # 剧情管理器
│   │   └── EnhancedDeepSkyScript.js # 游戏剧本
│   └── utils/                   # 工具函数
│       ├── AudioManager.js      # 音频管理器（已禁用）
│       └── Logger.js            # 日志工具
├── docs/                        # 文档目录
│   ├── DEV_LOG.md              # 开发日志
│   └── SENSE_SYSTEM_GUIDE.md   # 五感系统指南
└── README.md                   # 项目说明
```

---

## 📄 核心文件详解

### 1. **index.html** - 主入口文件

**用途**：游戏的 HTML 结构和启动入口

**主要功能**：
- 定义游戏的 DOM 结构
- 加载所有 CSS 和 JavaScript 文件
- 初始化游戏启动流程
- 包含 SVG 滤镜定义（毛玻璃效果）

**关键 DOM 元素**：
```html
<div id="game-container">           <!-- 游戏主容器 -->
<div id="loading-screen">           <!-- 加载屏幕 -->
<div id="dialogue-container">       <!-- 对话容器 -->
<div id="simple-sense-container">   <!-- 五感显示容器 -->
<div id="background-container">     <!-- 背景效果容器 -->
```

**启动流程**：
1. 显示加载屏幕
2. 初始化所有系统（GameManager, DialogueSystem, SimpleSenseSystem, BackgroundManager）
3. 背景颜色过渡（从深色到游戏背景色）
4. 淡出加载屏幕
5. 启动游戏主循环

---

### 2. **css/main.css** - 主样式文件

**用途**：定义游戏的整体视觉风格和布局

**主要样式**：
- **全局样式**：重置默认样式，设置字体和颜色
- **游戏容器**：全屏布局，深色背景
- **加载屏幕**：居中显示，带淡入淡出动画
- **响应式设计**：适配不同屏幕尺寸

**关键样式**：
```css
body {
    background: linear-gradient(135deg, #0a0a2a 0%, #1a1a3a 100%);
    color: #e0e0e0;
    font-family: 'Microsoft YaHei', sans-serif;
}

#game-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
```

---

### 3. **css/dialogue.css** - 对话系统样式

**用途**：定义对话框的外观和动画效果

**主要样式**：
- **对话容器**：居中显示，半透明背景，毛玻璃效果
- **说话者名称**：不同角色使用不同颜色
- **对话文本**：打字机效果的文本显示
- **继续提示**：闪烁动画提示玩家继续

**关键样式**：
```css
#dialogue-container {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 800px;
    background: rgba(10, 10, 42, 0.85);
    backdrop-filter: blur(10px);
    border: 2px solid #4fc3f7;
    border-radius: 12px;
}

.speaker-protagonist { color: #4fc3f7; }  /* 主角 */
.speaker-narrator { color: #ff6b6b; }     /* 旁白 */
.speaker-deepsky { color: #51cf66; }      /* DeepSky */
```

---

### 4. **css/background.css** - 背景效果样式

**用途**：定义背景粒子和动画效果

**主要样式**：
- **背景容器**：全屏固定定位
- **粒子效果**：浮动的光点动画
- **渐变背景**：深空主题的渐变色

**关键动画**：
```css
@keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
}
```

---

### 5. **css/sense-breathing.css** - 五感动画样式

**用途**：定义五感显示框的动画效果

**主要动画**：
- **呼吸动画** (`senseBreathing`)：五感框的波浪式缩放和阴影变化
- **更新动画** (`senseUpdate`)：五感更新时的高亮效果
- **通知动画** (`senseNotificationPulse`)：感叹号的弹出动画
- **悬停增强** (`senseBreathingHover`)：鼠标悬停时的增强呼吸效果

**关键动画**：
```css
@keyframes senseBreathing {
    0%, 100% { transform: scale(1) translateY(0); }
    50% { transform: scale(1.05) translateY(-2px); }
}

@keyframes senseNotificationPulse {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
```

**延迟效果**：每个五感框有不同的动画延迟（0s, 0.2s, 0.4s, 0.6s, 0.8s），创造波浪效果

---

## 🎮 核心系统详解

### 6. **js/core/GameManager.js** - 游戏主管理器

**用途**：游戏的总控制中心，协调所有子系统

**主要职责**：
1. **系统初始化**：初始化所有子系统
2. **输入处理**：监听键盘和鼠标事件
3. **游戏状态管理**：控制游戏的启动、暂停、结束
4. **系统协调**：在各个系统之间传递消息

**关键方法**：
```javascript
static initialize() {
    // 初始化所有子系统
    DialogueSystem.initialize();
    SimpleSenseSystem.initialize();
    BackgroundManager.initialize();
    StoryManager.initialize();
    this.setupEventListeners();
}

static handleAdvanceInput() {
    // 处理玩家的推进输入（空格、回车、点击）
    if (this.isDialogueActive) {
        DialogueSystem.handleAdvance();
    }
}

static startGame() {
    // 启动游戏主循环
    StoryManager.startStory();
}
```

**事件监听**：
- `keydown`：空格键、回车键推进对话
- `click`：点击屏幕推进对话

---

### 7. **js/core/DialogueSystem.js** - 对话系统

**用途**：管理对话的显示、打字机效果和交互

**主要功能**：
1. **对话显示**：显示/隐藏对话框
2. **打字机效果**：逐字显示对话文本
3. **说话者样式**：根据角色应用不同样式
4. **对话推进**：处理玩家的推进输入
5. **五感检测**：检测对话完成后是否需要更新五感

**关键方法**：
```javascript
static showDialogue(dialogue) {
    // 显示一条对话
    // 1. 显示对话容器
    // 2. 设置说话者名称和样式
    // 3. 启动打字机效果
    // 4. 返回 Promise，在对话完成时 resolve
}

static startTypingEffect(text, speed = 50) {
    // 打字机效果
    // 逐字显示文本，创造打字机效果
}

static completeTyping() {
    // 立即完成打字机效果
    // 用于玩家跳过打字动画
}

static checkAndUpdateSenses() {
    // 检查当前对话是否包含五感更新
    // 如果有，调用 StoryManager.updateSingleSense()
}
```

**状态管理**：
- `isVisible`：对话框是否可见
- `isTyping`：是否正在打字
- `currentDialogue`：当前显示的对话对象
- `typewriterInterval`：打字机定时器

**音效集成**（已禁用）：
- 打字机音效：打字时播放
- 对话推进音效：推进对话时播放

---

### 8. **js/core/SimpleSenseSystem.js** - 五感显示系统

**用途**：管理五感信息的显示、更新和动画，支持左右分离的听觉和触觉

**主要功能**：
1. **五感显示**：在屏幕特定位置显示五感信息
2. **左右分离**：听觉和触觉支持左右分离显示
3. **动态管理**：支持创建、更新、删除五感实例
4. **动画效果**：淡入淡出、位置变化动画

**五感位置布局**：
```javascript
// 固定7个位置布局
const sensePositions = {
    视觉: { x: '50%', y: '25%' },     // 对话正上方
    听觉: [                           // 左右耳位置
        { x: '20%', y: '60%' },       // 左耳
        { x: '80%', y: '60%' }        // 右耳
    ],
    触觉: [                           // 左右手位置
        { x: '15%', y: '85%' },       // 左手
        { x: '85%', y: '85%' }        // 右手
    ],
    嗅觉: { x: '50%', y: '70%' },     // 对话正下方
    味觉: { x: '50%', y: '90%' }      // 最底部中央
};
```

**关键方法**：
```javascript
static initialize() {
    // 初始化系统，创建容器
}

static updateSingleSense(senseType, senseValue) {
    // 更新单个五感（兼容模式）
    // 听觉和触觉自动创建左右两个实例
}

// 新增：左右分离API
static updateLeftHearing(value) {
    // 更新左耳听觉
}

static updateRightHearing(value) {
    // 更新右耳听觉
}

static updateLeftTouch(value) {
    // 更新左手触觉
}

static updateRightTouch(value) {
    // 更新右手触觉
}

// 动态管理API
static createSense(id, senseType, value, position, distance = 50) {
    // 创建新的五感实例
}

static updateSense(id, value, newDistance) {
    // 更新指定ID的五感实例
}

static removeSense(id) {
    // 删除指定ID的五感实例
}

static removeSensesByType(senseType) {
    // 删除指定类型的所有五感实例
}
```

**SenseInstance 类**：
```javascript
class SenseInstance {
    constructor(id, senseType, value, position, distance = 50) {
        this.id = id;                    // 唯一标识
        this.senseType = senseType;       // 五感类型
        this.value = value;               // 五感描述
        this.position = position;         // 位置坐标
        this.distance = distance;         // 距离感知
        this.fontSize = this.calculateFontSize();
        this.opacity = this.calculateOpacity();
    }
    
    calculateFontSize() {
        // 根据距离计算字体大小
    }
    
    calculateOpacity() {
        // 根据距离计算透明度
    }
}
```

**状态管理**：
- `container`：五感容器 DOM 元素
- `isVisible`：五感容器是否可见
- `currentSenses`：当前五感实例 Map（key: id, value: SenseInstance）
- `activeSenses`：活跃的五感元素 Map

**五感框样式**：
```css
.dynamic-sense {
    position: absolute;
    transform: translate(-50%, -50%);
    color: rgba(255, 255, 255, 0.9);
    font-family: 'Microsoft YaHei', sans-serif;
    text-align: center;
    max-width: 200px;
    opacity: 0;
    transition: opacity 1.5s ease-in-out, transform 0.3s ease;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}
```

---

### 9. **js/core/BackgroundManager.js** - 背景管理器

**用途**：管理游戏的背景效果和粒子动画

**主要功能**：
1. **背景渐变**：深空主题的渐变背景
2. **粒子效果**：浮动的光点粒子
3. **动态更新**：根据游戏进度改变背景

**关键方法**：
```javascript
static initialize() {
    // 初始化背景系统
    // 创建背景容器和粒子
}

static createParticles(count = 50) {
    // 创建浮动粒子
    // 随机大小、位置、动画延迟
}

static updateBackground(style) {
    // 更新背景样式
    // 用于不同场景的背景切换
}
```

---

## 📖 剧情系统详解

### 10. **js/story/StoryManager.js** - 剧情管理器

**用途**：管理游戏剧情的流程和状态，支持动态五感管理

**主要功能**：
1. **剧情加载**：从脚本加载剧情数据
2. **循环管理**：管理游戏的多个循环
3. **对话播放**：按顺序播放对话序列
4. **五感触发**：支持多种五感更新方式

**关键方法**：
```javascript
static initialize() {
    // 初始化剧情管理器
    // 加载剧情脚本
}

static startStory() {
    // 开始游戏剧情
    // 从第一个循环开始
}

static playCycle(cycleNumber) {
    // 播放指定循环
    // 1. 播放循环音效
    // 2. 播放对话序列
}

static playPartDialogues(part) {
    // 播放一个 part 的所有对话
    // 处理 senseUpdates 数组
}

static handleSenseUpdates(dialogue) {
    // 处理 senseUpdates 数组
    // 支持 create, update, remove, removeByType 操作
}

// 新增：左右分离API
static updateLeftHearing(value) {
    // 更新左耳听觉
}

static updateRightHearing(value) {
    // 更新右耳听觉
}

static updateLeftTouch(value) {
    // 更新左手触觉
}

static updateRightTouch(value) {
    // 更新右手触觉
}

static updateSingleSense(senseType, senseValue) {
    // 更新单个五感（兼容模式）
    // 调用 SimpleSenseSystem.updateSingleSense()
}
```

**状态管理**：
- `storyData`：剧情数据对象
- `currentCycle`：当前循环编号
- `currentPart`：当前 part 对象
- `currentDialogue`：当前对话对象

**剧情结构**：
```javascript
{
    id: 'cycle_1',
    title: '初醒',
    theme: '存在的质疑',
    part1: {
        dialogues: [
            {
                speaker: '旁白',
                text: '意识像沉入深海的潜水员...',
                updateSenses: {
                    听觉: '低频嗡鸣，间断的电流噼啪声'
                },
                showSenseHint: true
            }
        ]
    }
}
```

**senseUpdates 数组格式**：
```javascript
{
    speaker: '旁白',
    text: '复杂的感官体验...',
    senseUpdates: [
        {
            action: 'create',
            id: 'sound_left',
            senseType: '听觉',
            value: '左耳：脚步声',
            position: { x: '20%', y: '60%' },
            distance: 70
        },
        {
            action: 'update',
            id: 'sound_left',
            value: '左耳：更近的脚步声',
            distance: 30
        },
        {
            action: 'remove',
            id: 'sound_left'
        },
        {
            action: 'removeByType',
            senseType: '听觉'
        }
    ]
}
```

---

### 11. **js/story/EnhancedDeepSkyScript.js** - 游戏剧本

**用途**：定义游戏的完整剧情内容，科幻悬疑主题

**剧情概述**：
- **主题**：失忆主角在神秘封闭环境中的探索
- **核心冲突**：记忆缺失、环境质疑、信任危机、真相渴望
- **循环结构**：3个主要循环，每个循环都有新发现

**内容结构**：
- **循环（Cycles）**：游戏分为多个循环，每个循环是一次完整的体验
- **Part**：每个循环分为多个 part，代表不同的剧情阶段
- **对话（Dialogues）**：每个 part 包含多条对话
- **五感更新（updateSenses）**：在特定对话中更新五感信息

**三个主要循环**：

#### **🔄 Cycle 1：初醒 - 存在的质疑**
- **主题**：意识恢复，五感逐步觉醒
- **体验**：从绝对黑暗开始，听觉→触觉→视觉→嗅觉→味觉依次恢复
- **关键发现**：光滑平面、臭氧味、金属苦涩味

#### **🔄 Cycle 2：日常 - 建立routine**
- **主题**：适应新环境，建立日常规律
- **体验**：与利维的日常互动，接受"营养液"而非真实食物
- **关键发现**：感受不到阳光、温度恒定、无自然气息

#### **🔄 Cycle 3：探索 - 发现异常**
- **主题**：开始质疑环境，发现不寻常的细节
- **体验**：触摸墙壁、探索空间，发现更多异常
- **关键发现**：墙壁异常光滑、环境音规律性、金属味道

**示例结构**：
```javascript
static getCycle1() {
    return {
        id: 'cycle_1',
        title: '初醒',
        theme: '存在的质疑',
        part1: {
            dialogues: [
                {
                    speaker: '旁白',
                    text: '意识像沉入深海的潜水员，缓慢地向上浮升...',
                    updateSenses: {
                        听觉: '低频嗡鸣，间断的电流噼啪声'
                    },
                    showSenseHint: true
                },
                {
                    speaker: '主角',
                    text: '（内心独白）我在哪里？为什么什么都看不见？',
                    updateSenses: {
                        视觉: '绝对的黑暗，没有任何光感'
                    }
                }
            ]
        }
    };
}
```

**五感更新规则**：
- `updateSenses`：对象，键为五感类型，值为具体描述
- `showSenseHint`：布尔值，是否显示"五感更新"提示
- 五感类型：`视觉`、`听觉`、`触觉`、`嗅觉`、`味觉`

**剧情设计原则**：
1. **渐进式揭示**：五感信息逐步展现，不一次性全部显示
2. **具体感官描述**：避免抽象描述（如"恐惧的味道"），使用具体感官体验
3. **对话驱动**：通过对话推进剧情，五感作为辅助信息
4. **循环结构**：每个循环有独立的主题和发展
5. **悬疑氛围**：通过感官体验营造紧张和困惑感

---

### 12. **js/story/StoryData.js** - 剧情数据结构

**用途**：定义剧情数据的标准结构（已简化，直接使用脚本数据）

**当前实现**：直接使用 `EnhancedDeepSkyScript` 提供的数据结构，无需额外的数据类

**数据结构**：
```javascript
// 循环数据结构
{
    id: 'cycle_1',
    title: '初醒',
    theme: '存在的质疑',
    part1: {
        dialogues: [...]
    },
    part2: {
        dialogues: [...]
    },
    // ... 更多 part
}

// 对话数据结构
{
    speaker: '旁白',
    text: '意识像沉入深海的潜水员...',
    updateSenses: {
        听觉: '低频嗡鸣，间断的电流噼啪声'
    },
    showSenseHint: true
}

// 动态五感更新结构
{
    speaker: '旁白',
    text: '复杂的感官体验...',
    senseUpdates: [
        {
            action: 'create',
            id: 'sound_left',
            senseType: '听觉',
            value: '左耳：脚步声',
            position: { x: '20%', y: '60%' },
            distance: 70
        }
    ]
}
```

**数据管理**：
- `StoryManager.storyData`：当前剧情数据对象
- `StoryManager.currentCycle`：当前循环编号
- `StoryManager.currentPart`：当前 part 对象
- `StoryManager.currentDialogue`：当前对话对象

---

## 🔧 工具系统详解

### 13. **js/utils/AudioManager.js** - 音频管理器

**用途**：管理游戏的音效和背景音乐

**主要功能**：
1. **音效加载**：预加载音效文件
2. **音效播放**：播放指定音效
3. **音量控制**：调整音效音量
4. **音效停止**：停止正在播放的音效

**关键方法**：
```javascript
static initialize() {
    // 初始化音频系统
    // 预加载音效文件
}

static playSound(soundId, volume = 1.0) {
    // 播放音效
}

static stopSound(soundId) {
    // 停止音效
}

static setVolume(soundId, volume) {
    // 设置音量
}
```

**音效列表**：
- `typewriter-sound`：打字机音效
- `dialogue-advance-sound`：对话推进音效
- `sense-update-sound`：五感更新音效

**当前状态**：所有音效已禁用（在 DialogueSystem 中添加了 `return;`）

---

### 14. **js/utils/Logger.js** - 日志工具

**用途**：提供统一的日志输出接口

**主要功能**：
1. **分级日志**：支持不同级别的日志（info, warn, error, debug）
2. **模块标识**：每条日志带有模块名称
3. **开关控制**：可以全局开启/关闭日志

**关键方法**：
```javascript
static log(module, message, level = 'info') {
    // 输出日志
    console.log(`[${module}] ${message}`);
}

static info(module, message) {
    // 信息日志
}

static warn(module, message) {
    // 警告日志
}

static error(module, message) {
    // 错误日志
}

static debug(module, message) {
    // 调试日志
}
```

**使用示例**：
```javascript
Logger.log('GameManager', '游戏开始');
Logger.debug('DialogueSystem', '显示对话: ' + dialogue.text);
```

---

## 🎯 关键交互流程

### 游戏启动流程

```
1. index.html 加载
   ↓
2. 显示加载屏幕
   ↓
3. 初始化所有系统
   - GameManager.initialize()
   - DialogueSystem.initialize()
   - SimpleSenseSystem.initialize()
   - BackgroundManager.initialize()
   - StoryManager.initialize()
   ↓
4. 背景颜色过渡（3秒）
   ↓
5. 淡出加载屏幕
   ↓
6. 启动游戏
   - GameManager.startGame()
   - StoryManager.startStory()
```

### 对话播放流程

```
1. StoryManager.playPartDialogues(part)
   ↓
2. 获取当前对话对象
   ↓
3. DialogueSystem.showDialogue(dialogue)
   ↓
4. 显示对话容器
   ↓
5. 设置说话者名称和样式
   ↓
6. 启动打字机效果
   ↓
7. 打字完成后调用 completeTyping()
   ↓
8. 处理五感更新
   - 检查 updateSenses 属性
   - 处理 senseUpdates 数组
   ↓
9. 等待玩家推进输入
   ↓
10. 隐藏对话，播放下一条
```

### 五感更新流程

#### **兼容模式（updateSenses）**：
```
1. 对话包含 updateSenses 属性
   ↓
2. StoryManager.updateSingleSense(type, value)
   ↓
3. SimpleSenseSystem.updateSingleSense(type, value)
   ↓
4. 判断五感类型
   ├─ 听觉/触觉 → 创建左右两个实例
   └─ 其他感官 → 创建单个实例
   ↓
5. 创建/更新五感元素
   ↓
6. 淡入动画
```

#### **动态模式（senseUpdates）**：
```
1. 对话包含 senseUpdates 数组
   ↓
2. StoryManager.handleSenseUpdates(dialogue)
   ↓
3. 遍历 senseUpdates 数组
   ↓
4. 根据 action 执行操作
   ├─ create → SimpleSenseSystem.createSense()
   ├─ update → SimpleSenseSystem.updateSense()
   ├─ remove → SimpleSenseSystem.removeSense()
   └─ removeByType → SimpleSenseSystem.removeSensesByType()
   ↓
5. 更新五感显示
```

#### **左右分离API**：
```
1. 调用特定API
   - StoryManager.updateLeftHearing()
   - StoryManager.updateRightHearing()
   - StoryManager.updateLeftTouch()
   - StoryManager.updateRightTouch()
   ↓
2. 代理到 SimpleSenseSystem
   ↓
3. 更新对应的五感实例
```

---

## 🎨 视觉设计规范

### 颜色方案

**主色调**：
- 背景色：`#0a0a2a` → `#1a1a3a`（深蓝色渐变）
- 主要文本：`#e0e0e0`（浅灰色）
- 强调色：`#4fc3f7`（亮蓝色）

**角色颜色**：
- 主角：`#4fc3f7`（亮蓝色）
- 旁白：`#ff6b6b`（红色）
- DeepSky：`#51cf66`（绿色）

**五感框颜色**：
- 背景：`#BE5869`（深红色）
- 文字：`#403A3E`（深灰色）
- 阴影：`#403A3E`

**边框和高亮**：
- 对话框边框：`#4fc3f7`
- 五感更新高亮：`#66b3ff`
- 感叹号通知：`#66b3ff`

### 动画时长

- 淡入淡出：0.5s - 0.8s
- 打字机速度：50ms/字
- 呼吸动画：3s 循环
- 更新动画：0.6s
- 感叹号弹出：0.3s

### 布局规范

**对话框**：
- 位置：底部 10%，水平居中
- 宽度：80%，最大 800px
- 内边距：20px

**五感框**：
- 大小：104px × 104px
- 位置：屏幕边缘（左上、左中、左下、右中、右下）
- 间距：距离边缘 3-5%

---

## 🔄 数据流向

```
EnhancedDeepSkyScript.js (剧本数据)
         ↓
StoryManager.js (加载剧本)
         ↓
StoryData.js (数据结构化)
         ↓
StoryManager.js (播放循环和对话)
         ↓
DialogueSystem.js (显示对话)
         ↓
SimpleSenseSystem.js (更新五感)
         ↓
用户界面 (DOM 元素)
```

---

## 🐛 已知问题和解决方案

### 1. 音效问题
**问题**：音效在对话完成后仍然播放
**解决**：在 DialogueSystem 中禁用所有音效（添加 `return;`）

### 2. 五感不显示
**问题**：五感更新时不显示
**原因**：
- `currentSenses` 被初始化为空对象而非 `null`
- `storyData.currentDialogue` 未正确设置
- `completeTyping()` 未被调用

**解决**：
- 移除 `initialize()` 中的 `this.currentSenses = {}`
- 在 `playPartDialogues()` 中设置 `storyData.currentDialogue`
- 修复 `startTypingEffect()` 的定时器逻辑

### 3. 感叹号需要点击两次才消失
**问题**：鼠标交互时，感叹号和呼吸动画需要多次点击才消失
**解决**：添加 `isInteracted` 标志，防止 `fadeOutNotification` 多次执行

### 4. 五感框样式被覆盖
**问题**：`senseElement.style.cssText +=` 覆盖了之前的样式
**解决**：使用 `Object.assign()` 和 `parsePositionString()` 合并样式

---

## 📝 开发注意事项

### 1. 五感更新规则
- 五感更新必须在 `dialogue` 对象的 `updateSenses` 属性中定义
- 不要在 `part` 级别定义 `senses` 属性（已废弃）
- 五感描述必须是具体的感官体验，避免抽象描述

### 2. 对话推进逻辑
- 对话推进由 `GameManager.handleAdvanceInput()` 统一处理
- 打字中途点击会立即完成打字，再次点击才推进对话
- 对话完成后显示"继续提示"（闪烁的 ▼）

### 3. 动画性能
- 使用 CSS 动画而非 JavaScript 动画
- 避免频繁的 DOM 操作
- 使用 `transform` 和 `opacity` 实现动画（GPU 加速）

### 4. 代码组织
- 所有系统使用静态类（static class）
- 使用 `Logger` 输出调试信息
- 保持模块化，每个系统职责单一

---

## 🚀 未来扩展方向

### 1. 音效系统
- 添加背景音乐
- 实现音效淡入淡出
- 立体声音效支持
- 五感音效集成

### 2. 存档系统
- 保存游戏进度
- 支持多个存档槽
- 自动保存功能
- 五感状态保存

### 3. 选择系统
- 添加对话选项
- 实现分支剧情
- 根据选择改变结局
- 五感影响剧情走向

### 4. 视觉增强
- 添加角色立绘
- 实现场景切换效果
- 添加更多粒子效果
- 五感可视化增强

### 5. 移动端适配
- 触摸事件支持
- 响应式布局优化
- 移动端性能优化
- 手势控制五感

### 6. 五感系统增强
- 更多五感类型（温度、湿度等）
- 五感组合效果
- 五感记忆系统
- 五感影响游戏机制

---

## 📚 参考资源

### 技术栈
- **HTML5**：结构和语义化
- **CSS3**：样式和动画
- **JavaScript ES6+**：逻辑和交互
- **无框架**：纯原生 JavaScript 实现

### 设计灵感
- 文字冒险游戏（Visual Novel）
- 科幻主题（深空、AI）
- 极简主义 UI 设计

---

## 📞 联系信息

如有问题或建议，请参考：
- `docs/API.md`：API 详细文档
- `docs/DEV_LOG.md`：开发日志
- `README.md`：项目说明

---

**最后更新**：2025-01-27
**版本**：2.0.0
**状态**：功能完整，支持左右分离五感系统

---

## 🎯 快速开始指南

### 本地运行
1. 克隆或下载项目
2. 使用 HTTP 服务器打开 `index.html`（不能直接用 file:// 协议）
3. 推荐使用 Live Server 或 Python HTTP Server

### 修改剧本
1. 编辑 `js/story/EnhancedDeepSkyScript.js`
2. 按照现有结构添加新的循环、part 和对话
3. 支持 `updateSenses` 和 `senseUpdates` 两种五感更新方式
4. 刷新页面查看效果

### 调整样式
1. 编辑对应的 CSS 文件
2. `main.css`：整体布局和颜色
3. `dialogue.css`：对话框样式
4. `continuous-sense.css`：五感显示样式

### 使用左右分离五感
1. 调用特定API：
   ```javascript
   StoryManager.updateLeftHearing('左耳：脚步声');
   StoryManager.updateRightHearing('右耳：水滴声');
   StoryManager.updateLeftTouch('左手：冰冷');
   StoryManager.updateRightTouch('右手：温暖');
   ```
2. 或使用 senseUpdates 数组：
   ```javascript
   senseUpdates: [
       {
           action: 'create',
           id: 'sound_left',
           senseType: '听觉',
           value: '左耳：脚步声',
           position: { x: '20%', y: '60%' }
       }
   ]
   ```

### 调试技巧
1. 打开浏览器开发者工具（F12）
2. 查看 Console 中的日志输出
3. 所有系统都有详细的 `console.log` 输出
4. 使用 `Logger` 工具统一管理日志

---

**祝您开发愉快！** 🎮✨

