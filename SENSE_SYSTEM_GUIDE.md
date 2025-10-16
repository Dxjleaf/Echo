# 五感系统使用指南（新格式）

## 🎯 核心改进

### 1. **多实例支持**
- ✅ 同一类型的五感可以创建多个实例（如多个听觉、触觉）
- ✅ 每个实例有唯一ID，独立管理

### 2. **固定像素坐标**
- ✅ 使用1920x1080为基准的像素坐标
- ✅ 自动缩放适配不同屏幕尺寸
- ✅ 避开中央对话框区域（约760-1160 x 340-740）

### 3. **距离感知**
- ✅ 距离影响文字大小（12-20px）
- ✅ 距离影响透明度（0.6-1.0）
- ✅ 显示距离描述："很近"、"较近"、"中等"、"较远"、"很远"

## 📝 数据格式

### 新格式：`senseUpdates` 数组

```javascript
{
    speaker: '旁白',
    text: '对话内容...',
    senseUpdates: [
        {
            action: 'create',      // 操作类型
            id: 'unique_id',       // 唯一ID
            senseType: '听觉',     // 感官类型
            value: '描述文本',      // 感官描述
            position: { x: 300, y: 300 },  // 像素坐标（基于1920x1080）
            distance: 80           // 距离（0-100）
        }
    ]
}
```

### 旧格式：`updateSenses` 对象（仍支持）

```javascript
{
    speaker: '旁白',
    text: '对话内容...',
    updateSenses: {
        听觉: '低频嗡鸣声',
        触觉: '冰冷的平面'
    }
}
```

## 🔧 操作类型

### 1. `create` - 创建新实例

```javascript
{
    action: 'create',
    id: 'background_hum',           // 必需：唯一ID
    senseType: '听觉',              // 必需：感官类型
    value: '低频嗡鸣声',            // 必需：描述
    position: { x: 300, y: 300 },  // 可选：位置（默认使用感官类型的默认位置）
    distance: 80                    // 可选：距离（默认50）
}
```

### 2. `update` - 更新现有实例

```javascript
{
    action: 'update',
    id: 'background_hum',           // 必需：要更新的实例ID
    value: '嗡鸣声渐弱',            // 可选：新的描述
    position: { x: 400, y: 400 },  // 可选：新的位置
    distance: 60                    // 可选：新的距离
}
```

### 3. `remove` - 删除指定实例

```javascript
{
    action: 'remove',
    id: 'background_hum'  // 必需：要删除的实例ID
}
```

### 4. `removeByType` - 删除某类型的所有实例

```javascript
{
    action: 'removeByType',
    senseType: '听觉'  // 必需：要删除的感官类型
}
```

## 📍 位置规划

### 默认位置（避开中央对话框）

```javascript
视觉: { x: 960, y: 150 }    // 顶部中央
听觉: { x: 300, y: 300 }    // 左上角
触觉: { x: 1620, y: 900 }   // 右下角
嗅觉: { x: 1620, y: 300 }   // 右上角
味觉: { x: 300, y: 900 }    // 左下角
```

### 对话框区域（避免放置）

- 中央区域：约 (760-1160, 340-740)
- 建议在四个角落和边缘区域放置五感

### 推荐位置布局

```
(200,200)              (960,150)              (1720,200)
   听觉1                  视觉                   嗅觉1
   
(300,300)                                      (1620,300)
   听觉2                                         嗅觉2
                    
                    [对话框区域]
                    (760-1160)
                    (340-740)
                    
(300,900)                                      (1620,900)
   味觉                                          触觉
   
(200,1000)                                     (1720,1000)
```

## 💡 使用示例

### 场景1：单个五感逐步出现

```javascript
part1: {
    dialogues: [
        {
            speaker: '旁白',
            text: '首先恢复的是听觉...',
            senseUpdates: [
                {
                    action: 'create',
                    id: 'hearing_1',
                    senseType: '听觉',
                    value: '低频嗡鸣声',
                    position: { x: 300, y: 300 },
                    distance: 80
                }
            ]
        },
        {
            speaker: '旁白',
            text: '接着是触觉...',
            senseUpdates: [
                {
                    action: 'create',
                    id: 'touch_1',
                    senseType: '触觉',
                    value: '冰冷的平面',
                    position: { x: 1620, y: 900 },
                    distance: 10
                }
            ]
        }
    ]
}
```

### 场景2：多个同类型五感同时存在

```javascript
{
    speaker: '旁白',
    text: '你同时听到了多种声音...',
    senseUpdates: [
        {
            action: 'create',
            id: 'sound_left',
            senseType: '听觉',
            value: '左侧传来机械声',
            position: { x: 200, y: 400 },
            distance: 70
        },
        {
            action: 'create',
            id: 'sound_right',
            senseType: '听觉',
            value: '右侧传来通风声',
            position: { x: 1720, y: 400 },
            distance: 60
        },
        {
            action: 'create',
            id: 'sound_center',
            senseType: '听觉',
            value: '正上方的滴水声',
            position: { x: 960, y: 100 },
            distance: 30
        }
    ]
}
```

### 场景3：距离变化（推理线索）

```javascript
{
    speaker: '旁白',
    text: '脚步声越来越近...',
    senseUpdates: [
        {
            action: 'update',
            id: 'footsteps',
            value: '脚步声逼近，节奏急促',
            distance: 40  // 从90变为40
        }
    ]
}
```

### 场景4：清除特定类型

```javascript
{
    speaker: '利维',
    text: '系统校准中，暂时关闭听觉输入...',
    senseUpdates: [
        {
            action: 'removeByType',
            senseType: '听觉'  // 删除所有听觉实例
        }
    ]
}
```

### 场景5：替换实例

```javascript
{
    speaker: '旁白',
    text: '黑暗被微弱的光芒取代...',
    senseUpdates: [
        {
            action: 'remove',
            id: 'darkness'  // 删除黑暗
        },
        {
            action: 'create',
            id: 'dim_light',
            senseType: '视觉',
            value: '微弱的蓝色光芒，勉强能看清轮廓',
            position: { x: 960, y: 150 },
            distance: 20
        }
    ]
}
```

## 🐛 调试工具

### 查看当前状态

```javascript
SimpleSenseSystem.logCurrentState();
```

输出示例：
```
[SimpleSenseSystem] ===== 当前状态 =====
[SimpleSenseSystem] 实例数量: 3
[SimpleSenseSystem] 容器可见: true
[SimpleSenseSystem] 缩放比例: 66.7%
  - hearing_1: 听觉 - "低频嗡鸣声"
    基准位置: (300, 300)
    当前位置: (200, 200)
    距离: 80 (较远)
    元素存在: true
```

### 手动操作

```javascript
// 创建
SimpleSenseSystem.createSense('听觉', '描述', { x: 300, y: 300 }, 50, 'my_id');

// 更新
SimpleSenseSystem.updateSense('my_id', '新描述', null, 30);

// 删除
SimpleSenseSystem.removeSense('my_id');

// 按类型删除
SimpleSenseSystem.removeSensesByType('听觉');

// 清空所有
SimpleSenseSystem.clearAllSenses();
```

## ⚠️ 注意事项

1. **ID唯一性**：每个实例的ID必须唯一，否则会覆盖旧实例
2. **位置规划**：避免放置在对话框区域（中央）
3. **实例管理**：记得在合适的时机删除不需要的实例
4. **距离逻辑**：距离不仅影响视觉，也可以作为推理线索
5. **兼容性**：旧格式`updateSenses`仍然支持，但不支持多实例

## 📊 最佳实践

1. **渐进式显示**：五感逐个出现，不要一次性全部显示
2. **位置分散**：避免五感元素聚集在一起
3. **距离合理**：根据剧情设定合理的距离值
4. **及时清理**：场景转换时清除不需要的五感
5. **视觉层次**：近距离五感（大字体）用于重要信息，远距离（小字体）用于背景信息

