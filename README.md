# 《深空回响》- HTML网页版

## 🌌 项目简介

《深空回响》(Echo Chamber) 是一款基于HTML/CSS/JavaScript的纯文字冒险游戏，移植自Unity版本。游戏讲述了一名宇航员在深空中的孤独旅程，以及与AI助手"利维"的复杂关系。

## 🎮 游戏特色

- **纯文字体验**：沉浸式的文字冒险，无图像干扰
- **动态背景**：根据剧情变化的背景颜色和效果
- **音效系统**：背景音乐和音效增强沉浸感
- **分支选择**：多结局的剧情分支系统
- **响应式设计**：适配各种屏幕尺寸

## 🚀 快速开始

### 方法一：直接运行
1. 打开 `index.html` 文件
2. 游戏自动开始

### 方法二：本地服务器
```bash
# 使用Python简单服务器
python -m http.server 8000
# 或使用Node.js
npx http-server
```

## 🎯 操作说明

- **Space/Enter/点击**：推进对话
- **ESC**：打开设置
- **选择选项**：点击对应按钮

## 📁 项目结构

```
EchoChamber_Web/
├── index.html              # 主页面
├── css/
│   ├── main.css           # 主样式
│   ├── dialogue.css       # 对话系统样式
│   └── background.css     # 背景效果样式
├── js/
│   ├── core/
│   │   ├── GameManager.js     # 游戏管理器
│   │   ├── DialogueSystem.js  # 对话系统
│   │   ├── BackgroundSystem.js # 背景系统
│   │   └── AudioManager.js    # 音频管理器
│   ├── story/
│   │   ├── StoryManager.js    # 剧情管理器
│   │   └── RuntimeDialogues.js # 运行时对话
│   └── utils/
│       ├── Utils.js           # 工具函数
│       └── Storage.js         # 存储管理
├── assets/
│   ├── audio/             # 音频文件
│   └── fonts/             # 字体文件
└── docs/
    ├── DEV_LOG.md         # 开发日志
    └── API.md             # API文档
```

## 🛠️ 技术栈

- **HTML5**：语义化结构
- **CSS3**：现代样式和动画
- **JavaScript ES6+**：模块化编程
- **Web Audio API**：音频处理
- **LocalStorage**：数据持久化

## 📝 开发日志

详见 [DEV_LOG.md](docs/DEV_LOG.md)

## 🎨 设计理念

- **极简主义**：纯文字，无图像干扰
- **沉浸式体验**：动态背景和音效
- **哲学思考**：孤独、记忆、选择、存在

## 📄 许可证

MIT License

---

*《深空回响》- 在星辰之间寻找回响*
