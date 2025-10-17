# 五感系统位置说明（重新设计版）

## 📍 充分利用空间的布局

使用百分比定位，优化的7个五感显示位置：

```
                    50%, 15%
                      【视觉】
                      
12%, 35%                                88%, 35%
【听觉-左】                             【听觉-右】




                  [对话框区域]
                  (中央保留)




8%, 70%                                 92%, 70%
【触觉-左】                             【触觉-右】

                    50%, 80%
                      【嗅觉】
                    50%, 92%
                      【味觉】
```

## 🎯 位置详细说明

### 1. 视觉（1个位置）
- **位置**: 50%, 15% - 顶部中央
- **用途**: 视觉感知，顶部显著位置
- **示例**: "绝对的黑暗，连光的概念都不存在"

### 2. 听觉（2个位置）
- **左侧**: 12%, 35% - 左上区域
- **右侧**: 88%, 35% - 右上区域
- **用途**: 立体声效果，左右分离
- **示例**: 
  - 左: "左侧传来机械声"
  - 右: "右侧传来通风声"

### 3. 触觉（2个位置）
- **左下**: 8%, 70% - 左下角
- **右下**: 92%, 70% - 右下角
- **用途**: 双手触摸不同物体的触感
- **示例**:
  - 左手: "左手触摸到冰冷的墙壁"
  - 右手: "右手摸到柔软的床沿"

### 4. 嗅觉（1个位置）
- **位置**: (960, 850) - 底部中央偏上
- **用途**: 空气中的气味感知
- **示例**: "微弱的臭氧味，混合着消毒剂的气息"

### 5. 味觉（1个位置）
- **位置**: (960, 950) - 最底部中央
- **用途**: 口腔中的味道感知
- **示例**: "口腔中残留的金属苦涩味"

## 🔧 如何使用

### 方式1：使用默认位置（自动分配）

```javascript
// 对于视觉、嗅觉、味觉（单一位置）
senseUpdates: [
    {
        action: 'create',
        id: 'visual_1',
        senseType: '视觉',
        value: '描述文本',
        // position 不填，自动使用默认位置
        distance: 50
    }
]
```

### 方式2：指定听觉/触觉的具体位置

```javascript
// 获取听觉的第0个位置（左耳）
const leftEarPos = SenseInstance.getPositionByIndex('听觉', 0);
// 获取听觉的第1个位置（右耳）
const rightEarPos = SenseInstance.getPositionByIndex('听觉', 1);

senseUpdates: [
    {
        action: 'create',
        id: 'sound_left',
        senseType: '听觉',
        value: '左侧的声音',
        position: { x: 200, y: 300 },  // 手动指定左耳位置
        distance: 60
    },
    {
        action: 'create',
        id: 'sound_right',
        senseType: '听觉',
        value: '右侧的声音',
        position: { x: 1720, y: 300 },  // 手动指定右耳位置
        distance: 60
    }
]
```

### 方式3：使用脚本预设位置

```javascript
// 在脚本中预定义常用位置
const SENSE_POSITIONS = {
    VISUAL: { x: 960, y: 150 },
    HEARING_LEFT: { x: 200, y: 300 },
    HEARING_RIGHT: { x: 1720, y: 300 },
    TOUCH_LEFT: { x: 200, y: 900 },
    TOUCH_RIGHT: { x: 1720, y: 900 },
    SMELL: { x: 960, y: 850 },
    TASTE: { x: 960, y: 950 }
};

// 使用时直接引用
senseUpdates: [
    {
        action: 'create',
        id: 'touch_left_hand',
        senseType: '触觉',
        value: '左手触摸到...',
        position: SENSE_POSITIONS.TOUCH_LEFT,
        distance: 15
    }
]
```

## 💡 最佳实践

### 1. 视觉（中心感知）
- 用于描述主角视野中最重要的视觉信息
- 通常是场景的整体视觉感受
- 建议距离：0-30（非常近，环绕视野）

### 2. 听觉（立体声）
- **单一声源**：只使用一个位置即可
- **立体声**：左右耳分别显示不同声音
- **方向感**：通过左右位置暗示声源方向
- 建议距离：根据声源远近设定（20-90）

### 3. 触觉（双手感知）
- **单手触摸**：只使用一个位置
- **双手触摸**：左右分别显示
- **身体触感**：可以用任一位置表示身体其他部位
- 建议距离：5-20（触觉都比较近）

### 4. 嗅觉（气味扩散）
- 描述空气中飘来的气味
- 可以表示多种气味混合
- 建议距离：20-60（气味飘散的感觉）

### 5. 味觉（口腔感知）
- 描述口中的味道
- 通常距离很近
- 建议距离：0-10（在口中）

## ⚠️ 注意事项

1. **避免遮挡对话框**：所有位置已避开中央对话框区域（760-1160, 340-740）
2. **听觉/触觉限制**：最多只能同时显示2个听觉和2个触觉实例
3. **视觉/嗅觉/味觉限制**：每个类型只能有1个实例
4. **ID命名建议**：使用描述性ID，如 `sound_left`、`touch_right_hand` 等
5. **删除旧实例**：创建新实例前，如果位置相同，记得删除旧的

## 🎭 使用场景示例

### 场景1：单一感官
```javascript
{
    speaker: '旁白',
    text: '你睁开眼睛...',
    senseUpdates: [
        {
            action: 'create',
            id: 'darkness',
            senseType: '视觉',
            value: '绝对的黑暗',
            distance: 0
        }
    ]
}
```

### 场景2：立体听觉
```javascript
{
    speaker: '旁白',
    text: '你听到左右两侧传来不同的声音...',
    senseUpdates: [
        {
            action: 'create',
            id: 'sound_left',
            senseType: '听觉',
            value: '左侧：机械运转声',
            position: { x: 200, y: 300 },
            distance: 70
        },
        {
            action: 'create',
            id: 'sound_right',
            senseType: '听觉',
            value: '右侧：水滴声',
            position: { x: 1720, y: 300 },
            distance: 30
        }
    ]
}
```

### 场景3：双手触摸
```javascript
{
    speaker: '主角',
    text: '我用双手摸索着周围的环境...',
    senseUpdates: [
        {
            action: 'create',
            id: 'touch_left',
            senseType: '触觉',
            value: '左手：冰冷的金属墙壁',
            position: { x: 200, y: 900 },
            distance: 10
        },
        {
            action: 'create',
            id: 'touch_right',
            senseType: '触觉',
            value: '右手：柔软的床垫',
            position: { x: 1720, y: 900 },
            distance: 10
        }
    ]
}
```

### 场景4：全感官体验
```javascript
{
    speaker: '旁白',
    text: '所有感官同时恢复了...',
    senseUpdates: [
        { action: 'create', id: 'visual', senseType: '视觉', value: '昏暗的蓝光', distance: 20 },
        { action: 'create', id: 'sound_l', senseType: '听觉', value: '左耳：警报声', position: { x: 200, y: 300 }, distance: 60 },
        { action: 'create', id: 'sound_r', senseType: '听觉', value: '右耳：机械音', position: { x: 1720, y: 300 }, distance: 50 },
        { action: 'create', id: 'touch_l', senseType: '触觉', value: '左手：束缚感', position: { x: 200, y: 900 }, distance: 5 },
        { action: 'create', id: 'touch_r', senseType: '触觉', value: '右手：针刺感', position: { x: 1720, y: 900 }, distance: 5 },
        { action: 'create', id: 'smell', senseType: '嗅觉', value: '消毒水的气味', distance: 40 },
        { action: 'create', id: 'taste', senseType: '味觉', value: '血腥味', distance: 10 }
    ]
}
```

## 📊 位置图示（ASCII）

```
1920 x 1080 屏幕布局：

0                    960                   1920
├─────────────────────┼─────────────────────┤
│                                           │ 0
│                   视觉(960,150)           │
│     听觉-L                    听觉-R      │ 300
│   (200,300)               (1720,300)      │
│                                           │
│                                           │
│              ┌───────────────┐            │
│              │               │            │ 540
│              │   对话框区域   │            │
│              │               │            │
│              └───────────────┘            │
│                                           │
│                                           │
│   触觉-L                      触觉-R      │ 900
│ (200,900)                 (1720,900)      │
│                 嗅觉(960,850)             │
│                 味觉(960,950)             │ 1080
└───────────────────────────────────────────┘
```

