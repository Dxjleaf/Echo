/**
 * 动态五感管理系统
 * 核心特性：
 * - 使用百分比定位，自适应不同屏幕尺寸
 * - 支持同一类型的多个实例
 * - 每个实例有唯一ID和独立位置
 * - 完整的生命周期管理（创建、更新、删除）
 * - 距离感知系统（影响文字大小和透明度）
 */

/**
 * 五感实例类（使用百分比定位）
 */
class SenseInstance {
    constructor(id, senseType, value, position = null, distance = 50) {
        this.id = id;                    // 唯一标识符
        this.senseType = senseType;      // 感官类型
        this.value = value;              // 感官描述
        
        // 使用固定像素坐标 (基于1920x1080)
        this.basePosition = position || this.getDefaultPosition(senseType);
        this.currentPosition = this.calculateCurrentPosition();
        
        this.distance = Math.max(0, Math.min(100, distance)); // 距离 (0-100)
        this.element = null;             // DOM元素引用
        this.createdAt = Date.now();     // 创建时间
        
        // 计算基于距离的样式属性
        this.fontSize = this.calculateFontSize();
        this.opacity = this.calculateOpacity();
    }
    
    /**
     * 获取默认位置（使用百分比）
     * 固定7个位置：视觉1个、听觉2个、触觉2个、嗅觉1个、味觉1个
     */
    getDefaultPosition(senseType) {
        const defaults = {
            '视觉': { x: '50%', y: '25%' },        // 对话正上方
            '听觉_0': { x: '20%', y: '60%' },      // 左耳
            '听觉_1': { x: '80%', y: '60%' },      // 右耳
            '触觉_0': { x: '15%', y: '85%' },      // 左手
            '触觉_1': { x: '85%', y: '85%' },      // 右手
            '嗅觉': { x: '50%', y: '70%' },        // 对话正下方
            '味觉': { x: '50%', y: '90%' }         // 最底部中央
        };
        
        // 处理听觉和触觉的多位置
        if (senseType === '听觉') {
            return defaults['听觉_0'];  // 默认返回第一个位置
        } else if (senseType === '触觉') {
            return defaults['触觉_0'];  // 默认返回第一个位置
        }
        
        return defaults[senseType] || { x: '50%', y: '50%' };
    }
    
    /**
     * 获取指定索引的位置（用于听觉和触觉的多位置）
     * 使用百分比定位
     */
    static getPositionByIndex(senseType, index) {
        const positions = {
            '听觉': [
                { x: '20%', y: '60%' },      // 左耳
                { x: '80%', y: '60%' }       // 右耳
            ],
            '触觉': [
                { x: '15%', y: '85%' },      // 左手
                { x: '85%', y: '85%' }       // 右手
            ]
        };
        
        if (positions[senseType] && positions[senseType][index] !== undefined) {
            return positions[senseType][index];
        }
        
        return null;
    }
    
    /**
     * 计算当前位置（百分比直接使用）
     */
    calculateCurrentPosition() {
        // 百分比定位直接返回，不需要缩放计算
        return this.basePosition;
    }
    
    /**
     * 根据距离计算文字大小 (12px - 20px)
     */
    calculateFontSize() {
        const minSize = 12;
        const maxSize = 20;
        return minSize + (maxSize - minSize) * (1 - this.distance / 100);
    }
    
    /**
     * 根据距离计算透明度 (0.6 - 1.0)
     */
    calculateOpacity() {
        return 0.6 + (0.4 * (1 - this.distance / 100));
    }
    
    /**
     * 获取距离描述文字
     */
    getDistanceDescription() {
        if (this.distance <= 20) return "很近";
        if (this.distance <= 40) return "较近";
        if (this.distance <= 60) return "中等";
        if (this.distance <= 80) return "较远";
        return "很远";
    }
    
    /**
     * 更新距离并重新计算样式
     */
    updateDistance(newDistance) {
        this.distance = Math.max(0, Math.min(100, newDistance));
        this.fontSize = this.calculateFontSize();
        this.opacity = this.calculateOpacity();
        
        if (this.element) {
            this.applyDistanceStyles();
        }
    }
    
    /**
     * 更新元素样式（位置和距离相关样式）
     */
    updateElementStyle() {
        if (!this.element) return;
        
        // 更新位置（百分比定位）
        this.currentPosition = this.calculateCurrentPosition();
        this.element.style.left = this.currentPosition.x;
        this.element.style.top = this.currentPosition.y;
        
        // 更新字体大小
        this.fontSize = this.calculateFontSize();
        this.element.style.fontSize = `${this.fontSize}px`;
        
        // 更新透明度
        this.element.style.opacity = this.opacity.toString();
    }
    
    /**
     * 应用距离相关的样式到元素
     */
    applyDistanceStyles() {
        if (!this.element) return;
        
        this.element.style.fontSize = `${this.fontSize}px`;
        this.element.style.opacity = this.opacity.toString();
        
        // 更新距离显示文字
        const distanceElement = this.element.querySelector('.sense-distance');
        if (distanceElement) {
            distanceElement.textContent = this.getDistanceDescription();
        }
    }
}

/**
 * 动态五感系统（修复版）
 */
class SimpleSenseSystem {
    static container = null;
    static detailContainer = null; // 详情面板容器
    static senseInstances = new Map(); // ID -> SenseInstance
    static isVisible = false;
    static nextInstanceId = 1;
    static currentSenses = {
        视觉: null,
        听觉: null,
        触觉: null,
        嗅觉: null,
        味觉: null
    };

    /**
     * 初始化动态五感系统
     */
    static initialize() {
        console.log('[SimpleSenseSystem] 正在初始化动态五感系统（修复版）...');
        
        // 获取或创建容器
        let gameContainer = document.getElementById('game-container');
        if (!gameContainer) {
            console.error('[SimpleSenseSystem] 游戏容器未找到');
            return false;
        }
        
        // 创建五感专用容器
        this.container = document.getElementById('simple-sense-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'simple-sense-container';
            gameContainer.appendChild(this.container);
        }
        
        // 详情面板已移除，不再创建
        this.detailContainer = null;
        
        // 初始化状态
        this.senseInstances = new Map();
        this.isVisible = false;
        this.nextInstanceId = 1;
        
        // 初始为隐藏状态
        this.hideSenseDisplay();
        
        console.log('[SimpleSenseSystem] ✅ 动态五感系统初始化完成');
        return true;
    }

    /**
     * 显示五感容器
     */
    static showSenseDisplay() {
        if (this.container) {
            this.container.style.display = 'block';
            this.isVisible = true;
            console.log('[SimpleSenseSystem] 五感容器已显示');
        }
    }

    /**
     * 隐藏五感容器
     */
    static hideSenseDisplay() {
        if (this.container) {
            this.container.style.display = 'none';
            this.isVisible = false;
            console.log('[SimpleSenseSystem] 五感容器已隐藏');
        }
    }

    /**
     * 创建新的五感实例
     * @param {string} senseType - 感官类型
     * @param {string} value - 感官描述
     * @param {Object} position - 位置 {x, y}（像素坐标，基于1920x1080）
     * @param {number} distance - 距离 (0-100)
     * @param {string} customId - 自定义ID，可选
     * @returns {string} 实例ID
     */
    static createSense(senseType, value, position = null, distance = 50, customId = null) {
        const id = customId || `sense_${this.nextInstanceId++}`;
        
        console.log(`[SimpleSenseSystem] 创建五感 - ID: ${id}, 类型: ${senseType}, 位置: ${position ? `(${position.x}, ${position.y})` : '默认'}, 距离: ${distance}, 值: ${value}`);
        
        // 如果已存在相同ID的实例，先删除
        if (this.senseInstances.has(id)) {
            console.log(`[SimpleSenseSystem] 删除已存在的实例: ${id}`);
            this.removeSense(id);
        }
        
        const instance = new SenseInstance(id, senseType, value, position, distance);
        this.senseInstances.set(id, instance);
        
        this.createSenseElement(instance);
        
        if (!this.isVisible) {
            this.showSenseDisplay();
        }
        
        console.log(`[SimpleSenseSystem] 创建五感实例: ${id} (${senseType}) 基准位置: (${instance.basePosition.x}, ${instance.basePosition.y}) 当前位置: (${Math.round(instance.currentPosition.x)}, ${Math.round(instance.currentPosition.y)}) 距离: ${distance}`);
        console.log(`[SimpleSenseSystem] 当前实例数量: ${this.senseInstances.size}`);
        
        return id;
    }
    
    /**
     * 创建DOM元素 - 使用固定像素定位
     * @param {SenseInstance} instance - 五感实例
     */
    static createSenseElement(instance) {
        const element = document.createElement('div');
        element.className = `dynamic-sense ${instance.senseType}-sense`;
        element.id = `sense-${instance.id}`;
        element.dataset.senseId = instance.id;
        element.dataset.senseType = instance.senseType;
        
        // 设置内容，包含距离显示
        element.innerHTML = `
            <div class="sense-type">${instance.senseType}</div>
            <div class="sense-value">${instance.value}</div>
            <div class="sense-distance">${instance.getDistanceDescription()}</div>
        `;
        
        // 添加到容器
        this.container.appendChild(element);
        instance.element = element;
        
        // 使用百分比定位，配合transform居中
        element.style.cssText = `
            position: absolute !important;
            left: ${instance.currentPosition.x} !important;
            top: ${instance.currentPosition.y} !important;
            transform: translate(-50%, -50%) !important;
            font-size: ${instance.fontSize}px !important;
            opacity: 0;
            transition: opacity 1.5s ease-in-out, font-size 0.3s ease;
        `;
        
        // 添加鼠标事件
        this.addMouseEvents(element, instance);
        
        // 淡入动画
        setTimeout(() => {
            element.style.opacity = instance.opacity.toString();
        }, 100);
        
        console.log(`[SimpleSenseSystem] 创建元素: ${instance.id} (${instance.senseType}) 像素位置: (${Math.round(instance.currentPosition.x)}, ${Math.round(instance.currentPosition.y)}) 字体: ${Math.round(instance.fontSize)}px`);
    }
    
    /**
     * 添加鼠标事件（已禁用详情面板）
     */
    static addMouseEvents(element, instance) {
        // 详情面板功能已移除
        // 可以在这里添加其他鼠标交互
    }
    
    /**
     * 更新五感实例
     * @param {string} senseId - 实例ID
     * @param {string} newValue - 新的感官描述
     * @param {Object} newPosition - 新的位置 {x, y}（像素坐标）
     * @param {number} newDistance - 新的距离
     * @returns {boolean} 是否更新成功
     */
    static updateSense(senseId, newValue = null, newPosition = null, newDistance = null) {
        const instance = this.senseInstances.get(senseId);
        if (!instance) {
            console.warn(`[SimpleSenseSystem] 找不到五感实例: ${senseId}`);
            return false;
        }
        
        // 更新值
        if (newValue !== null) {
            instance.value = newValue;
            const valueElement = instance.element.querySelector('.sense-value');
            if (valueElement) {
                valueElement.textContent = newValue;
            }
        }
        
        // 更新位置
        if (newPosition !== null) {
            instance.basePosition = newPosition;
            instance.currentPosition = instance.calculateCurrentPosition();
            
            instance.element.classList.add('position-changing');
            instance.element.style.left = instance.currentPosition.x;
            instance.element.style.top = instance.currentPosition.y;
            
            setTimeout(() => {
                instance.element.classList.remove('position-changing');
            }, 500);
        }
        
        // 更新距离
        if (newDistance !== null) {
            instance.updateDistance(newDistance);
            instance.applyDistanceStyles();
        }
        
        // 详情面板已移除
        
        // 更新动画 - 淡入淡出
        instance.element.classList.add('sense-updated');
        setTimeout(() => {
            instance.element.classList.remove('sense-updated');
            // 淡入淡出动画完成后显示感叹号
            this.showSenseUpdateNotification(instance);
        }, 1000);
        
        console.log(`[SimpleSenseSystem] 更新五感实例: ${senseId} 距离: ${instance.distance}`);
        return true;
    }
    
    /**
     * 删除五感实例
     * @param {string} senseId - 实例ID
     * @returns {boolean} 是否删除成功
     */
    static removeSense(senseId) {
        const instance = this.senseInstances.get(senseId);
        if (!instance) {
            console.warn(`[SimpleSenseSystem] 找不到五感实例: ${senseId}`);
            return false;
        }
        
        // 详情面板已移除
        
        if (instance.element) {
            instance.element.style.opacity = '0';
            setTimeout(() => {
                if (instance.element && instance.element.parentNode) {
                    instance.element.parentNode.removeChild(instance.element);
                }
            }, 500);
        }
        
        this.senseInstances.delete(senseId);
        
        // 如果没有实例了，隐藏容器
        if (this.senseInstances.size === 0) {
            setTimeout(() => {
                this.hideSenseDisplay();
            }, 500);
        }
        
        console.log(`[SimpleSenseSystem] 删除五感实例: ${senseId}`);
        return true;
    }
    
    /**
     * 批量删除（按类型）
     * @param {string} senseType - 感官类型
     * @returns {number} 删除的实例数量
     */
    static removeSensesByType(senseType) {
        const toRemove = [];
        this.senseInstances.forEach((instance, id) => {
            if (instance.senseType === senseType) {
                toRemove.push(id);
            }
        });
        
        toRemove.forEach(id => this.removeSense(id));
        
        console.log(`[SimpleSenseSystem] 删除了 ${toRemove.length} 个 ${senseType} 实例`);
        return toRemove.length;
    }
    
    /**
     * 清空所有五感
     */
    static clearAllSenses() {
        console.log('[SimpleSenseSystem] 清空所有五感实例');
        this.senseInstances.forEach((instance, id) => {
            this.removeSense(id);
        });
    }
    
    /**
     * 检查是否有特定ID的实例
     */
    static hasSense(senseId) {
        return this.senseInstances.has(senseId);
    }
    
    /**
     * 获取特定类型的所有实例
     */
    static getSensesByType(senseType) {
        const result = [];
        this.senseInstances.forEach((instance, id) => {
            if (instance.senseType === senseType) {
                result.push({
                    id: id,
                    value: instance.value,
                    basePosition: instance.basePosition,
                    currentPosition: instance.currentPosition,
                    distance: instance.distance
                });
            }
        });
        return result;
    }
    
    /**
     * 获取所有实例
     */
    static getAllSenses() {
        const result = [];
        this.senseInstances.forEach((instance, id) => {
            result.push({
                id: id,
                senseType: instance.senseType,
                value: instance.value,
                basePosition: instance.basePosition,
                currentPosition: instance.currentPosition,
                distance: instance.distance
            });
        });
        return result;
    }
    
    /**
     * 获取实例数量
     */
    static getSenseCount() {
        return this.senseInstances.size;
    }
    
    /**
     * 调试：输出当前状态
     */
    static logCurrentState() {
        console.log('[SimpleSenseSystem] ===== 当前状态 =====');
        console.log(`[SimpleSenseSystem] 实例数量: ${this.senseInstances.size}`);
        console.log(`[SimpleSenseSystem] 容器可见: ${this.isVisible}`);
        console.log(`[SimpleSenseSystem] 缩放比例: ${(ScaleCalculator.getScale() * 100).toFixed(1)}%`);
        
        this.senseInstances.forEach((instance, id) => {
            console.log(`  - ${id}: ${instance.senseType} - "${instance.value}"`);
            console.log(`    基准位置: (${instance.basePosition.x}, ${instance.basePosition.y})`);
            console.log(`    当前位置: (${Math.round(instance.currentPosition.x)}, ${Math.round(instance.currentPosition.y)})`);
            console.log(`    距离: ${instance.distance} (${instance.getDistanceDescription()})`);
            console.log(`    元素存在: ${!!instance.element}`);
        });
        
        console.log('[SimpleSenseSystem] ====================');
    }

    /**
     * 兼容旧系统：更新单个五感（简化接口）
     * @param {string} senseType - 感官类型
     * @param {string} senseValue - 感官描述
     */
    static updateSingleSense(senseType, senseValue) {
        console.log(`[SimpleSenseSystem] 更新五感（兼容模式）: ${senseType} = ${senseValue}`);
        
        // 更新当前感官数据
        this.currentSenses[senseType] = senseValue;
        
        // 对于听觉和触觉，创建左右两个实例
        if (senseType === '听觉') {
            // 更新或创建左右耳实例，避免删除重建
            if (this.hasSense('hearing_left')) {
                this.updateSense('hearing_left', senseValue);
            } else {
                this.createSense('听觉', senseValue, { x: '20%', y: '60%' }, 50, 'hearing_left');
            }
            
            if (this.hasSense('hearing_right')) {
                this.updateSense('hearing_right', senseValue);
            } else {
                this.createSense('听觉', senseValue, { x: '80%', y: '60%' }, 50, 'hearing_right');
            }
        } else if (senseType === '触觉') {
            // 更新或创建左右手实例，避免删除重建
            if (this.hasSense('touch_left')) {
                this.updateSense('touch_left', senseValue);
            } else {
                this.createSense('触觉', senseValue, { x: '15%', y: '85%' }, 50, 'touch_left');
            }
            
            if (this.hasSense('touch_right')) {
                this.updateSense('touch_right', senseValue);
            } else {
                this.createSense('触觉', senseValue, { x: '85%', y: '85%' }, 50, 'touch_right');
            }
        } else {
            // 其他感官类型（视觉、嗅觉、味觉）使用单一实例
            const defaultId = `default_${senseType}`;
            
            if (this.hasSense(defaultId)) {
                this.updateSense(defaultId, senseValue);
            } else {
                this.createSense(senseType, senseValue, null, 50, defaultId);
            }
        }
    }
    
    /**
     * 获取当前所有五感状态（兼容旧系统）
     * @returns {Object} 当前五感对象
     */
    static getCurrentSenses() {
        return { ...this.currentSenses };
    }
    
    /**
     * 更新左耳听觉
     * @param {string} senseValue - 感官描述
     */
    static updateLeftHearing(senseValue) {
        console.log(`[SimpleSenseSystem] 更新左耳听觉: ${senseValue}`);
        
        if (this.hasSense('hearing_left')) {
            this.updateSense('hearing_left', senseValue);
        } else {
            this.createSense('听觉', senseValue, { x: '20%', y: '60%' }, 50, 'hearing_left');
        }
    }
    
    /**
     * 更新右耳听觉
     * @param {string} senseValue - 感官描述
     */
    static updateRightHearing(senseValue) {
        console.log(`[SimpleSenseSystem] 更新右耳听觉: ${senseValue}`);
        
        if (this.hasSense('hearing_right')) {
            this.updateSense('hearing_right', senseValue);
        } else {
            this.createSense('听觉', senseValue, { x: '80%', y: '60%' }, 50, 'hearing_right');
        }
    }
    
    /**
     * 更新左手触觉
     * @param {string} senseValue - 感官描述
     */
    static updateLeftTouch(senseValue) {
        console.log(`[SimpleSenseSystem] 更新左手触觉: ${senseValue}`);
        
        if (this.hasSense('touch_left')) {
            this.updateSense('touch_left', senseValue);
        } else {
            this.createSense('触觉', senseValue, { x: '15%', y: '85%' }, 50, 'touch_left');
        }
    }
    
    /**
     * 更新右手触觉
     * @param {string} senseValue - 感官描述
     */
    static updateRightTouch(senseValue) {
        console.log(`[SimpleSenseSystem] 更新右手触觉: ${senseValue}`);
        
        if (this.hasSense('touch_right')) {
            this.updateSense('touch_right', senseValue);
        } else {
            this.createSense('触觉', senseValue, { x: '85%', y: '85%' }, 50, 'touch_right');
        }
    }
    
    /**
     * 显示五感更新感叹号提示
     * @param {SenseInstance} instance - 五感实例
     */
    static showSenseUpdateNotification(instance) {
        if (!instance.element) return;
        
        // 移除已存在的感叹号
        const existingNotification = instance.element.querySelector('.sense-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 创建感叹号元素
        const notification = document.createElement('div');
        notification.className = 'sense-notification';
        notification.textContent = '!';
        
        // 添加到五感元素
        instance.element.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // 添加鼠标事件监听器
        const fadeOutNotification = () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        };
        
        // 鼠标悬停时淡出
        instance.element.addEventListener('mouseenter', fadeOutNotification, { once: true });
        
        // 点击时也淡出
        instance.element.addEventListener('click', fadeOutNotification, { once: true });
        
        console.log(`[SimpleSenseSystem] 显示五感更新提示: ${instance.id}`);
    }
}

// 将SimpleSenseSystem添加到全局作用域
window.SimpleSenseSystem = SimpleSenseSystem;
