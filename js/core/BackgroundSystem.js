/**
 * 深空回响 - 背景系统
 * 负责背景颜色变化、故障效果、环境氛围
 */

class BackgroundSystem {
    static instance = null;
    static isGlitching = false;
    static currentBackground = 'normal';
    static colorCache = new Map(); // 颜色计算结果缓存
    static lastColorUpdate = 0; // 上次颜色更新时间
    static updateThrottle = 100; // 更新节流时间（毫秒）

    // 背景颜色预设
    static colorPresets = {
        '正常': '#d4d4d4',
        'normal': '#d4d4d4',
        '早晨': '#ffd89b',
        'morning': '#ffd89b',
        '紧张': '#ff6b6b',
        'tense': '#ff6b6b',
        '太空': '#0c0c0c',
        'space': '#0c0c0c',
        '警报': '#ff0000',
        'alert': '#ff0000',
        '平静': '#667eea',
        'calm': '#667eea',
        '神秘': '#2c3e50',
        'mystery': '#2c3e50',
        '虚空': '#000000',
        'void': '#000000'
    };

    // UI元素引用
    static elements = {
        backgroundContainer: null,
        backgroundOverlay: null,
        glitchEffect: null
    };

    // 文本元素引用
    static textElements = {
        dialogueText: null,
        speakerName: null,
        playerResponse: null,
        choiceButtons: null,
        loadingText: null,
        settingsLabels: null
    };

    // 当前文本颜色
    static currentTextColor = '#ffffff';

    /**
     * 初始化背景系统
     */
    static async initialize() {
        console.log('[BackgroundSystem] 正在初始化背景系统...');
        
        try {
            // 查找UI元素
            this.findUIElements();
            
            // 设置默认背景
            this.setBackground('normal');
            
            // 初始化单例
            this.instance = this;
            
            console.log('[BackgroundSystem] ✅ 背景系统初始化完成');
            return true;
        } catch (error) {
            console.error('[BackgroundSystem] ❌ 初始化失败:', error);
            throw error;
        }
    }

    /**
     * 查找UI元素
     */
    static findUIElements() {
        this.elements.backgroundContainer = document.getElementById('background-container');
        this.elements.backgroundOverlay = document.getElementById('background-overlay');
        this.elements.glitchEffect = document.getElementById('glitch-effect');

        // 查找文本元素
        this.findTextElements();

        console.log('[BackgroundSystem] UI元素查找完成:', {
            backgroundContainer: !!this.elements.backgroundContainer,
            backgroundOverlay: !!this.elements.backgroundOverlay,
            glitchEffect: !!this.elements.glitchEffect
        });
    }

    /**
     * 查找文本元素
     */
    static findTextElements() {
        this.textElements.dialogueText = document.getElementById('dialogue-text');
        this.textElements.speakerName = document.getElementById('speaker-name');
        this.textElements.playerResponse = document.getElementById('player-response');
        this.textElements.loadingText = document.getElementById('loading-text');
        
        // 查找选择按钮
        this.textElements.choiceButtons = document.querySelectorAll('.choice-button');
        
        // 查找设置标签
        this.textElements.settingsLabels = document.querySelectorAll('.setting-group label');

        console.log('[BackgroundSystem] 文本元素查找完成:', {
            dialogueText: !!this.textElements.dialogueText,
            speakerName: !!this.textElements.speakerName,
            playerResponse: !!this.textElements.playerResponse,
            choiceButtons: this.textElements.choiceButtons.length,
            loadingText: !!this.textElements.loadingText,
            settingsLabels: this.textElements.settingsLabels.length
        });
    }

    /**
     * 设置背景颜色
     */
    static setBackground(presetName, duration = 2000) {
        if (!this.colorPresets[presetName]) {
            console.warn(`[BackgroundSystem] 找不到颜色预设: ${presetName}`);
            return;
        }

        this.currentBackground = presetName;
        const color = this.colorPresets[presetName];

        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.style.transition = `background ${duration}ms ease-in-out`;
            this.elements.backgroundContainer.style.background = color;
        }

        // 自动调整文本颜色
        this.adjustTextColorForBackground(color, duration);

        console.log(`[BackgroundSystem] 背景已设置为: ${presetName} (${color})`);
    }

    /**
     * 渐变背景颜色
     */
    static changeBackgroundColor(presetName, duration = 2000) {
        this.setBackground(presetName, duration);
    }

    /**
     * 设置渐变背景
     */
    static setGradientBackground(colors, direction = '135deg', duration = 2000) {
        if (!Array.isArray(colors) || colors.length < 2) {
            console.warn('[BackgroundSystem] 渐变颜色数组无效');
            return;
        }

        const gradient = `linear-gradient(${direction}, ${colors.join(', ')})`;
        
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.style.transition = `background ${duration}ms ease-in-out`;
            this.elements.backgroundContainer.style.background = gradient;
        }

        // 使用第一个颜色作为主要背景色来调整文本颜色
        this.adjustTextColorForBackground(colors[0], duration);

        console.log(`[BackgroundSystem] 渐变背景已设置: ${gradient}`);
    }

    /**
     * 根据背景颜色自动调整文本颜色
     * @param {string} backgroundColor - 背景颜色
     * @param {number} duration - 过渡时间
     */
    static adjustTextColorForBackground(backgroundColor, duration = 2000) {
        try {
            // 优先使用SmartColorAdapter进行智能颜色适配
            if (typeof SmartColorAdapter !== 'undefined' && SmartColorAdapter.isInitialized) {
                this.applySmartColorAdaptation(backgroundColor, duration);
            } else if (typeof ColorUtils !== 'undefined') {
                // 回退到ColorUtils
                const bestTextColor = ColorUtils.getBestTextColor(backgroundColor);
                this.currentTextColor = bestTextColor;
                this.applyTextColorToElements(bestTextColor, duration);
                console.log(`[BackgroundSystem] 使用ColorUtils调整文本颜色: ${bestTextColor}`);
            } else {
                console.warn('[BackgroundSystem] 颜色适配系统未加载，无法调整文本颜色');
                return;
            }
        } catch (error) {
            console.error('[BackgroundSystem] 文本颜色调整失败:', error);
        }
    }
    
    /**
     * 应用智能颜色适配
     * @param {string} backgroundColor - 背景颜色
     * @param {number} duration - 过渡时间
     */
    static applySmartColorAdaptation(backgroundColor, duration = 2000) {
        try {
            // 更新CSS变量
            SmartColorAdapter.updateCSSVariables(backgroundColor);
            
            // 应用到所有文本元素
            const textElements = [
                this.textElements.dialogueText,
                this.textElements.speakerName,
                this.textElements.playerResponse,
                ...this.textElements.choiceButtons,
                ...this.textElements.loadingText,
                ...this.textElements.settingsLabels
            ].filter(el => el);
            
            SmartColorAdapter.applySmartColorToElements(textElements, backgroundColor);
            
            // 更新当前文字颜色
            const optimalColor = SmartColorAdapter.calculateOptimalTextColor(backgroundColor);
            this.currentTextColor = optimalColor;
            
            console.log(`[BackgroundSystem] 智能颜色适配完成: ${optimalColor}`);
        } catch (error) {
            console.error('[BackgroundSystem] 智能颜色适配失败:', error);
            // 回退到ColorUtils
            if (typeof ColorUtils !== 'undefined') {
                const bestTextColor = ColorUtils.getBestTextColor(backgroundColor);
                this.currentTextColor = bestTextColor;
                this.applyTextColorToElements(bestTextColor, duration);
            }
        }
    }

    /**
     * 应用文本颜色到所有文本元素
     * @param {string} color - 文本颜色
     * @param {number} duration - 过渡时间
     */
    static applyTextColorToElements(color, duration = 2000) {
        const transition = `color ${duration}ms ease-in-out`;

        // 重新查找文本元素（动态更新）
        this.findTextElements();

        // 对话文本
        if (this.textElements.dialogueText) {
            this.textElements.dialogueText.style.transition = transition;
            this.textElements.dialogueText.style.color = color;
        }

        // 说话者名称
        if (this.textElements.speakerName) {
            this.textElements.speakerName.style.transition = transition;
            this.textElements.speakerName.style.color = color;
        }

        // 玩家回复
        if (this.textElements.playerResponse) {
            this.textElements.playerResponse.style.transition = transition;
            this.textElements.playerResponse.style.color = color;
        }

        // 加载文本
        if (this.textElements.loadingText) {
            this.textElements.loadingText.style.transition = transition;
            this.textElements.loadingText.style.color = color;
        }

        // 选择按钮
        this.textElements.choiceButtons.forEach(button => {
            button.style.transition = transition;
            button.style.color = color;
            button.style.borderColor = color;
        });

        // 设置标签
        this.textElements.settingsLabels.forEach(label => {
            label.style.transition = transition;
            label.style.color = color;
        });

        // 更新CSS变量
        this.updateCSSVariables(color);
    }

    /**
     * 更新CSS变量
     * @param {string} color - 文本颜色
     */
    static updateCSSVariables(color) {
        const root = document.documentElement;
        root.style.setProperty('--text-color', color);
        root.style.setProperty('--text-color-rgb', this.hexToRgbString(color));
    }

    /**
     * 将十六进制颜色转换为RGB字符串
     * @param {string} hex - 十六进制颜色
     * @returns {string} RGB字符串
     */
    static hexToRgbString(hex) {
        const rgb = ColorUtils.hexToRgb(hex);
        if (!rgb) return '255, 255, 255';
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }

    /**
     * 触发故障效果
     */
    static triggerGlitchEffect(duration = 1000) {
        if (this.isGlitching) {
            return;
        }

        this.isGlitching = true;
        console.log('[BackgroundSystem] 触发故障效果');

        // 添加故障类
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('glitch-active');
        }

        if (this.elements.glitchEffect) {
            this.elements.glitchEffect.style.opacity = '1';
        }

        // 屏幕抖动
        this.triggerScreenShake();

        // 颜色突变
        this.triggerColorShift();

        // 设置恢复定时器
        setTimeout(() => {
            this.stopGlitchEffect();
        }, duration);
    }

    /**
     * 停止故障效果
     */
    static stopGlitchEffect() {
        this.isGlitching = false;

        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.remove('glitch-active');
        }

        if (this.elements.glitchEffect) {
            this.elements.glitchEffect.style.opacity = '0';
        }

        console.log('[BackgroundSystem] 故障效果已停止');
    }

    /**
     * 触发屏幕抖动
     */
    static triggerScreenShake(intensity = 5, duration = 500) {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('shake-active');
            
            setTimeout(() => {
                this.elements.backgroundContainer.classList.remove('shake-active');
            }, duration);
        }
    }

    /**
     * 触发颜色突变
     */
    static triggerColorShift(duration = 800) {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('color-shift');
            
            setTimeout(() => {
                this.elements.backgroundContainer.classList.remove('color-shift');
            }, duration);
        }
    }

    /**
     * 触发纹理闪烁
     */
    static triggerTextureFlicker(duration = 1000) {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('texture-flicker');
            
            setTimeout(() => {
                this.elements.backgroundContainer.classList.remove('texture-flicker');
            }, duration);
        }
    }

    /**
     * 添加扫描线效果
     */
    static addScanlines() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('scanlines');
        }
    }

    /**
     * 移除扫描线效果
     */
    static removeScanlines() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.remove('scanlines');
        }
    }

    /**
     * 添加噪点效果
     */
    static addNoise() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('noise');
        }
    }

    /**
     * 移除噪点效果
     */
    static removeNoise() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.remove('noise');
        }
    }

    /**
     * 添加脉冲效果
     */
    static addPulse() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('pulse');
        }
    }

    /**
     * 移除脉冲效果
     */
    static removePulse() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.remove('pulse');
        }
    }

    /**
     * 添加呼吸效果
     */
    static addBreathe() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('breathe');
        }
    }

    /**
     * 移除呼吸效果
     */
    static removeBreathe() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.remove('breathe');
        }
    }

    /**
     * 添加星空效果
     */
    static addStars() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.add('stars');
        }
    }

    /**
     * 移除星空效果
     */
    static removeStars() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.remove('stars');
        }
    }

    /**
     * 设置背景透明度
     */
    static setBackgroundOpacity(opacity) {
        if (this.elements.backgroundOverlay) {
            this.elements.backgroundOverlay.style.opacity = opacity;
        }
    }

    /**
     * 获取当前背景
     */
    static getCurrentBackground() {
        return this.currentBackground;
    }

    /**
     * 获取当前文本颜色
     */
    static getCurrentTextColor() {
        return this.currentTextColor;
    }

    /**
     * 手动设置文本颜色
     * @param {string} color - 文本颜色
     * @param {number} duration - 过渡时间
     */
    static setTextColor(color, duration = 2000) {
        this.currentTextColor = color;
        this.applyTextColorToElements(color, duration);
        console.log(`[BackgroundSystem] 手动设置文本颜色为: ${color}`);
    }

    /**
     * 重新计算并应用文本颜色
     * @param {number} duration - 过渡时间
     */
    static recalculateTextColor(duration = 2000) {
        const currentBg = this.colorPresets[this.currentBackground];
        if (currentBg) {
            this.adjustTextColorForBackground(currentBg, duration);
        }
    }

    /**
     * 为动态创建的元素应用当前文本颜色
     * @param {HTMLElement} element - 要应用颜色的元素
     * @param {number} duration - 过渡时间
     */
    static applyColorToElement(element, duration = 2000) {
        if (!element) return;

        const transition = `color ${duration}ms ease-in-out`;
        element.style.transition = transition;
        element.style.color = this.currentTextColor;

        // 如果是按钮，也设置边框颜色
        if (element.classList.contains('choice-button')) {
            element.style.borderColor = this.currentTextColor;
        }
    }

    /**
     * 为所有动态创建的元素应用当前文本颜色
     * @param {string} selector - CSS选择器
     * @param {number} duration - 过渡时间
     */
    static applyColorToSelector(selector, duration = 2000) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            this.applyColorToElement(element, duration);
        });
    }

    /**
     * 获取所有预设
     */
    static getColorPresets() {
        return { ...this.colorPresets };
    }

    /**
     * 添加自定义预设
     */
    static addColorPreset(name, color) {
        this.colorPresets[name] = color;
        console.log(`[BackgroundSystem] 添加颜色预设: ${name} = ${color}`);
    }

    /**
     * 移除自定义预设
     */
    static removeColorPreset(name) {
        if (this.colorPresets[name]) {
            delete this.colorPresets[name];
            console.log(`[BackgroundSystem] 移除颜色预设: ${name}`);
        }
    }

    /**
     * 重置背景
     */
    static resetBackground() {
        this.setBackground('normal');
        this.removeAllEffects();
        console.log('[BackgroundSystem] 背景已重置');
    }

    /**
     * 移除所有效果
     */
    static removeAllEffects() {
        if (this.elements.backgroundContainer) {
            this.elements.backgroundContainer.classList.remove(
                'glitch-active', 'shake-active', 'color-shift', 'texture-flicker',
                'scanlines', 'noise', 'pulse', 'breathe', 'stars'
            );
        }
    }
}

// 将BackgroundSystem添加到全局作用域
window.BackgroundSystem = BackgroundSystem;
