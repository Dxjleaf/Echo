# 《深空回响》HTML版 - API文档

## 📚 概述

本文档描述了《深空回响》HTML版的所有API接口和使用方法。

---

## 🎮 核心系统API

### GameManager - 游戏管理器

#### 初始化
```javascript
await GameManager.initialize();
```

#### 游戏状态管理
```javascript
// 设置游戏变量
GameManager.setVariable(key, value);

// 获取游戏变量
const value = GameManager.getVariable(key, defaultValue);

// 检查变量是否存在
const exists = GameManager.hasVariable(key);
```

#### 信任度系统
```javascript
// 设置信任度 (0-100)
GameManager.setTrustLevel(level);

// 获取当前信任度
const trust = GameManager.getTrustLevel();
```

#### 天数管理
```javascript
// 设置当前天数
GameManager.setCurrentDay(day);

// 获取当前天数
const day = GameManager.getCurrentDay();
```

#### 事件系统
```javascript
// 添加事件监听器
GameManager.addEventListener('trustChange', (data) => {
    console.log('信任度变化:', data.oldLevel, '→', data.newLevel);
});

// 触发事件
GameManager.triggerEvent('customEvent', { data: 'value' });
```

#### 数据持久化
```javascript
// 保存游戏数据
GameManager.saveGameData();

// 加载游戏数据
await GameManager.loadGameData();

// 重置游戏
GameManager.resetGame();
```

---

### DialogueSystem - 对话系统

#### 初始化
```javascript
await DialogueSystem.initialize();
```

#### 显示对话
```javascript
// 基本对话
DialogueSystem.showDialogue(text, speakerName, onComplete);

// 示例
DialogueSystem.showDialogue(
    '你好，宇航员。',
    '利维',
    () => console.log('对话完成')
);
```

#### 选择系统
```javascript
// 显示选择
DialogueSystem.showChoices(choices, onChoiceMade);

// 示例
DialogueSystem.showChoices(
    ['选项1', '选项2', '选项3'],
    (choiceIndex) => console.log('选择了:', choiceIndex)
);
```

#### 玩家回复
```javascript
// 显示玩家回复
DialogueSystem.showPlayerResponse('我的回复');

// 隐藏玩家回复
DialogueSystem.hidePlayerResponse();
```

#### 对话控制
```javascript
// 隐藏对话
DialogueSystem.hideDialogue();

// 检查对话是否激活
const isActive = DialogueSystem.isDialogueActive();

// 处理输入
DialogueSystem.handleInput();
```

---

### BackgroundSystem - 背景系统

#### 初始化
```javascript
await BackgroundSystem.initialize();
```

#### 背景颜色预设
```javascript
// 可用预设
const presets = {
    'normal': '#d4d4d4',    // 正常
    'morning': '#ffd89b',   // 早晨
    'tense': '#ff6b6b',     // 紧张
    'space': '#0c0c0c',     // 太空
    'alert': '#ff0000',     // 警报
    'calm': '#667eea',      // 平静
    'mystery': '#2c3e50',   // 神秘
    'void': '#000000'       // 虚空
};
```

#### 设置背景
```javascript
// 设置背景颜色
BackgroundSystem.setBackground('space', 2000); // 2秒过渡

// 设置渐变背景
BackgroundSystem.setGradientBackground(
    ['#ff6b6b', '#ee5a24'],
    '135deg',
    2000
);
```

#### 故障效果
```javascript
// 触发故障效果
BackgroundSystem.triggerGlitchEffect(1000);

// 屏幕抖动
BackgroundSystem.triggerScreenShake(5, 500);

// 颜色突变
BackgroundSystem.triggerColorShift(800);

// 纹理闪烁
BackgroundSystem.triggerTextureFlicker(1000);
```

#### 环境效果
```javascript
// 添加效果
BackgroundSystem.addScanlines();
BackgroundSystem.addNoise();
BackgroundSystem.addPulse();
BackgroundSystem.addBreathe();
BackgroundSystem.addStars();

// 移除效果
BackgroundSystem.removeScanlines();
BackgroundSystem.removeNoise();
BackgroundSystem.removePulse();
BackgroundSystem.removeBreathe();
BackgroundSystem.removeStars();
```

#### 背景控制
```javascript
// 设置透明度
BackgroundSystem.setBackgroundOpacity(0.5);

// 获取当前背景
const current = BackgroundSystem.getCurrentBackground();

// 重置背景
BackgroundSystem.resetBackground();
```

---

### AudioManager - 音频管理器

#### 初始化
```javascript
await AudioManager.initialize();
```

#### 背景音乐
```javascript
// 播放背景音乐
AudioManager.playBackgroundMusic('calm', true); // 淡入

// 停止背景音乐
AudioManager.stopBackgroundMusic(true); // 淡出

// 暂停/恢复
AudioManager.pauseBackgroundMusic();
AudioManager.resumeBackgroundMusic();
```

#### 音效播放
```javascript
// 播放音效
AudioManager.playSFX('typewriter', 0.5);

// 常用音效
AudioManager.playTypewriterSound();
AudioManager.playGlitchSound();
```

#### 音量控制
```javascript
// 设置音量
AudioManager.setMusicVolume(0.7);
AudioManager.setSFXVolume(0.8);
AudioManager.setMasterVolume(1.0);

// 启用/禁用
AudioManager.setMusicEnabled(true);
AudioManager.setSFXEnabled(false);
```

#### 音频效果
```javascript
// 淡入效果
AudioManager.fadeIn(audioElement, targetVolume, duration);

// 淡出效果
AudioManager.fadeOut(audioElement, duration, callback);
```

---

## 📖 剧情系统API

### StoryManager - 剧情管理器

#### 初始化
```javascript
await StoryManager.initialize();
```

#### 游戏控制
```javascript
// 开始游戏
StoryManager.startGame();

// 开始指定周期
StoryManager.startCycle(1);

// 获取当前周期
const cycle = StoryManager.getCurrentCycle();
```

#### 故事数据
```javascript
// 获取故事数据
const data = StoryManager.getStoryData();

// 设置故事标志
StoryManager.setStoryFlag('flagName', true);

// 检查故事标志
const hasFlag = StoryManager.hasStoryFlag('flagName');
```

---

### RuntimeDialogues - 对话数据

#### 初始化
```javascript
RuntimeDialogues.initialize();
```

#### 数据访问
```javascript
// 获取所有周期
const cycles = RuntimeDialogues.getCycles();

// 获取指定周期
const cycle = RuntimeDialogues.getCycle(1);

// 获取周期数量
const count = RuntimeDialogues.getCycleCount();
```

#### 对话数据结构
```javascript
const cycle = {
    background: 'normal',           // 背景预设
    dialogues: [                    // 对话数组
        {
            speaker: '利维',         // 说话者
            text: '对话内容',        // 对话文本
            choices: ['选项1', '选项2'], // 选择数组
            choiceResults: [        // 选择结果
                {
                    trustChange: 5,     // 信任度变化
                    playerResponse: '我的回复', // 玩家回复
                    flag: 'flagName'    // 故事标志
                }
            ]
        }
    ]
};
```

---

## 🛠️ 工具类API

### Utils - 工具函数

#### 时间控制
```javascript
// 延迟执行
await Utils.delay(1000); // 1秒延迟

// 格式化时间
const time = Utils.formatTime(125); // "2:05"
```

#### 随机数
```javascript
// 随机数
const random = Utils.random(0, 100);

// 随机整数
const randomInt = Utils.randomInt(1, 10);

// 随机选择
const choice = Utils.randomChoice(['a', 'b', 'c']);
```

#### 函数控制
```javascript
// 防抖
const debounced = Utils.debounce(func, 300);

// 节流
const throttled = Utils.throttle(func, 100);
```

#### 对象操作
```javascript
// 深拷贝
const cloned = Utils.deepClone(originalObject);
```

#### 设备检测
```javascript
// 移动设备
const isMobile = Utils.isMobile();

// 触摸设备
const isTouch = Utils.isTouchDevice();

// 屏幕尺寸
const size = Utils.getScreenSize();
```

#### 全屏控制
```javascript
// 进入全屏
Utils.requestFullscreen();

// 退出全屏
Utils.exitFullscreen();

// 检查全屏状态
const isFullscreen = Utils.isFullscreen();
```

#### 动画系统
```javascript
// 动画函数
Utils.animate(
    0,           // 起始值
    100,         // 结束值
    1000,        // 持续时间(ms)
    'easeOut',   // 缓动函数
    (value) => {  // 回调函数
        console.log(value);
    }
);

// 可用缓动函数
const easingFunctions = {
    'linear': Utils.easing.linear,
    'easeInQuad': Utils.easing.easeInQuad,
    'easeOutQuad': Utils.easing.easeOutQuad,
    'easeInOutQuad': Utils.easing.easeInOutQuad,
    'easeInCubic': Utils.easing.easeInCubic,
    'easeOutCubic': Utils.easing.easeOutCubic,
    'easeInOutCubic': Utils.easing.easeInOutCubic
};
```

#### 剪贴板操作
```javascript
// 复制到剪贴板
await Utils.copyToClipboard('文本内容');

// 从剪贴板读取
const text = await Utils.readFromClipboard();
```

#### 浏览器检测
```javascript
// 检查浏览器支持
const support = Utils.checkBrowserSupport();
// {
//     localStorage: true,
//     webAudio: true,
//     fullscreen: true,
//     touch: true,
//     webgl: true
// }

// 获取性能信息
const performance = Utils.getPerformanceInfo();
```

---

### Storage - 存储管理

#### 初始化
```javascript
Storage.initialize();
```

#### 基本操作
```javascript
// 保存数据
Storage.save('key', data);

// 加载数据
const data = Storage.load('key', defaultValue);

// 删除数据
Storage.remove('key');

// 检查存在
const exists = Storage.exists('key');
```

#### 高级功能
```javascript
// 获取所有键
const keys = Storage.getAllKeys();

// 清空所有数据
Storage.clear();

// 获取存储使用情况
const usage = Storage.getStorageUsage();
```

#### 数据管理
```javascript
// 备份数据
const backupKey = Storage.backup();

// 恢复数据
Storage.restore(backupKey);

// 导出数据
Storage.exportData();

// 导入数据
Storage.importData(file);
```

#### 维护功能
```javascript
// 清理过期数据
const cleaned = Storage.cleanup(30); // 清理30天前的数据
```

---

## 🎯 使用示例

### 基本游戏流程
```javascript
// 1. 初始化所有系统
await GameManager.initialize();
await DialogueSystem.initialize();
await BackgroundSystem.initialize();
await AudioManager.initialize();
await StoryManager.initialize();

// 2. 开始游戏
StoryManager.startGame();

// 3. 设置背景
BackgroundSystem.setBackground('space');

// 4. 播放音乐
AudioManager.playBackgroundMusic('calm');

// 5. 显示对话
DialogueSystem.showDialogue(
    '欢迎来到深空回响。',
    '利维',
    () => console.log('对话完成')
);
```

### 自定义事件处理
```javascript
// 监听信任度变化
GameManager.addEventListener('trustChange', (data) => {
    if (data.newLevel < 30) {
        BackgroundSystem.triggerGlitchEffect();
        AudioManager.playGlitchSound();
    }
});

// 监听天数变化
GameManager.addEventListener('dayChange', (data) => {
    if (data.newDay > 10) {
        BackgroundSystem.setBackground('space');
    }
});
```

### 数据持久化
```javascript
// 保存游戏状态
GameManager.setVariable('playerName', '宇航员');
GameManager.setTrustLevel(75);
GameManager.saveGameData();

// 加载游戏状态
await GameManager.loadGameData();
const playerName = GameManager.getVariable('playerName');
const trust = GameManager.getTrustLevel();
```

---

## 🔧 配置选项

### 游戏设置
```javascript
const settings = {
    textSpeed: 0.05,        // 文本显示速度
    musicVolume: 0.7,        // 音乐音量
    sfxVolume: 0.8,         // 音效音量
    voiceVolume: 1.0,       // 语音音量
    skipEnabled: true,       // 允许跳过
    autoSave: true          // 自动保存
};
```

### 背景预设
```javascript
const backgroundPresets = {
    'normal': '#d4d4d4',    // 正常
    'morning': '#ffd89b',   // 早晨
    'tense': '#ff6b6b',     // 紧张
    'space': '#0c0c0c',     // 太空
    'alert': '#ff0000',     // 警报
    'calm': '#667eea',      // 平静
    'mystery': '#2c3e50',   // 神秘
    'void': '#000000'       // 虚空
};
```

---

## 🐛 错误处理

### 常见错误
```javascript
try {
    await GameManager.initialize();
} catch (error) {
    console.error('初始化失败:', error);
    // 处理错误
}
```

### 调试模式
```javascript
// 启用调试日志
GameManager.debugMode = true;
DialogueSystem.debugMode = true;
BackgroundSystem.debugMode = true;
AudioManager.debugMode = true;
```

---

## 📱 移动端适配

### 触摸事件
```javascript
// 检查触摸设备
if (Utils.isTouchDevice()) {
    // 添加触摸事件监听
    document.addEventListener('touchstart', handleTouch);
}
```

### 响应式设计
```javascript
// 检查屏幕尺寸
const screenSize = Utils.getScreenSize();
if (screenSize.width < 768) {
    // 移动端优化
    DialogueSystem.setMobileMode(true);
}
```

---

*本API文档由 Cursor AI 辅助生成*

**版本**: 1.0.0  
**最后更新**: 2024-12-19
