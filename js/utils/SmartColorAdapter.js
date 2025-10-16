/**
 * 深空回响 - 智能颜色适配系统
 * 根据背景颜色自动计算最佳文字颜色，确保可读性和视觉协调
 */

class SmartColorAdapter {
    static instance = null;
    static isInitialized = false;
    
    // 颜色适配配置
    static config = {
        // WCAG AA 标准对比度阈值
        minContrastRatio: 4.5,
        // 目标对比度（更舒适的阅读体验）
        targetContrastRatio: 7.0,
        // 色相偏移范围（避免互补色）
        hueOffsetRange: { min: 30, max: 60 },
        // 饱和度调整范围
        saturationRange: { min: 0.3, max: 0.8 },
        // 亮度调整范围
        lightnessRange: { min: 0.2, max: 0.9 }
    };
    
    // 预设的协调色相组合
    static harmoniousHues = [
        { base: 0, harmonious: [30, 60, 330] },      // 红色 -> 橙黄、黄绿、紫红
        { base: 30, harmonious: [0, 60, 90] },        // 橙色 -> 红、黄绿、黄
        { base: 60, harmonious: [30, 90, 120] },     // 黄色 -> 橙、黄绿、绿
        { base: 120, harmonious: [60, 150, 180] },   // 绿色 -> 黄绿、青绿、青
        { base: 180, harmonious: [120, 210, 240] }, // 青色 -> 绿、青蓝、蓝
        { base: 240, harmonious: [180, 270, 300] },  // 蓝色 -> 青、蓝紫、紫
        { base: 270, harmonious: [240, 300, 330] },  // 紫色 -> 蓝紫、紫红、红
        { base: 300, harmonious: [270, 330, 0] }    // 紫红 -> 紫、红、橙
    ];
    
    /**
     * 初始化智能颜色适配系统
     */
    static async initialize() {
        console.log('[SmartColorAdapter] 正在初始化智能颜色适配系统...');
        
        try {
            // 初始化单例
            this.instance = this;
            this.isInitialized = true;
            
            console.log('[SmartColorAdapter] ✅ 智能颜色适配系统初始化完成');
            return true;
        } catch (error) {
            console.error('[SmartColorAdapter] ❌ 初始化失败:', error);
            throw error;
        }
    }
    
    /**
     * 根据背景颜色计算最佳文字颜色
     * @param {string} backgroundColor - 背景颜色（hex格式）
     * @param {Object} options - 配置选项
     * @returns {string} 最佳文字颜色（hex格式）
     */
    static calculateOptimalTextColor(backgroundColor, options = {}) {
        const config = { ...this.config, ...options };
        
        // 解析背景颜色
        const bgRgb = this.hexToRgb(backgroundColor);
        if (!bgRgb) {
            console.warn('[SmartColorAdapter] 无效的背景颜色:', backgroundColor);
            return '#FFFFFF'; // 默认白色
        }
        
        // 获取背景色的HSL值
        const bgHsl = this.rgbToHsl(bgRgb.r, bgRgb.g, bgRgb.b);
        
        // 计算背景亮度
        const bgLuminance = this.getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
        
        // 确定文字亮度方向
        const targetLightness = bgLuminance > 0.5 ? 0.2 : 0.8;
        
        // 计算协调的色相
        const harmoniousHue = this.calculateHarmoniousHue(bgHsl.h);
        
        // 计算合适的饱和度
        const optimalSaturation = this.calculateOptimalSaturation(bgHsl.s, bgLuminance);
        
        // 生成候选颜色
        const candidates = this.generateColorCandidates(harmoniousHue, optimalSaturation, targetLightness);
        
        // 选择最佳颜色
        const bestColor = this.selectBestColor(bgRgb, candidates, config);
        
        console.log(`[SmartColorAdapter] 背景色: ${backgroundColor} -> 文字色: ${bestColor}`);
        return bestColor;
    }
    
    /**
     * 计算协调的色相
     * @param {number} baseHue - 基础色相
     * @returns {number} 协调的色相
     */
    static calculateHarmoniousHue(baseHue) {
        // 找到最接近的预设色相组合
        let bestMatch = this.harmoniousHues[0];
        let minDistance = Math.abs(baseHue - this.harmoniousHues[0].base);
        
        for (const harmony of this.harmoniousHues) {
            const distance = Math.abs(baseHue - harmony.base);
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = harmony;
            }
        }
        
        // 从协调色相中随机选择一个
        const randomIndex = Math.floor(Math.random() * bestMatch.harmonious.length);
        return bestMatch.harmonious[randomIndex];
    }
    
    /**
     * 计算最佳饱和度
     * @param {number} bgSaturation - 背景饱和度
     * @param {number} bgLuminance - 背景亮度
     * @returns {number} 最佳饱和度
     */
    static calculateOptimalSaturation(bgSaturation, bgLuminance) {
        // 高饱和度背景 -> 降低文字饱和度
        if (bgSaturation > 0.7) {
            return Math.max(0.3, bgSaturation * 0.6);
        }
        
        // 低饱和度背景 -> 适当提高文字饱和度
        if (bgSaturation < 0.3) {
            return Math.min(0.8, bgSaturation + 0.4);
        }
        
        // 中等饱和度背景 -> 保持相对平衡
        return Math.max(0.3, Math.min(0.8, bgSaturation * 0.8));
    }
    
    /**
     * 生成颜色候选
     * @param {number} hue - 色相
     * @param {number} saturation - 饱和度
     * @param {number} lightness - 亮度
     * @returns {Array} 颜色候选数组
     */
    static generateColorCandidates(hue, saturation, lightness) {
        const candidates = [];
        
        // 生成多个亮度变体
        const lightnessVariants = [
            lightness,
            lightness + 0.1,
            lightness - 0.1,
            lightness + 0.2,
            lightness - 0.2
        ].filter(l => l >= 0 && l <= 1);
        
        // 生成多个饱和度变体
        const saturationVariants = [
            saturation,
            saturation * 0.8,
            saturation * 1.2,
            Math.max(0.3, saturation - 0.2),
            Math.min(0.8, saturation + 0.2)
        ].filter(s => s >= 0 && s <= 1);
        
        // 组合生成候选颜色
        for (const l of lightnessVariants) {
            for (const s of saturationVariants) {
                const rgb = this.hslToRgb(hue, s, l);
                candidates.push({
                    rgb: rgb,
                    hex: this.rgbToHex(rgb.r, rgb.g, rgb.b),
                    hsl: { h: hue, s: s, l: l }
                });
            }
        }
        
        return candidates;
    }
    
    /**
     * 选择最佳颜色
     * @param {Object} bgRgb - 背景RGB值
     * @param {Array} candidates - 候选颜色数组
     * @param {Object} config - 配置对象
     * @returns {string} 最佳颜色hex值
     */
    static selectBestColor(bgRgb, candidates, config) {
        let bestColor = candidates[0];
        let bestScore = -1;
        
        for (const candidate of candidates) {
            // 计算对比度
            const contrast = this.getContrastRatio(bgRgb, candidate.rgb);
            
            // 检查是否满足最小对比度要求
            if (contrast < config.minContrastRatio) {
                continue;
            }
            
            // 计算综合评分
            const score = this.calculateColorScore(contrast, candidate, config);
            
            if (score > bestScore) {
                bestScore = score;
                bestColor = candidate;
            }
        }
        
        // 如果没有找到合适的颜色，使用默认颜色
        if (bestScore === -1) {
            const bgLuminance = this.getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
            return bgLuminance > 0.5 ? '#000000' : '#FFFFFF';
        }
        
        return bestColor.hex;
    }
    
    /**
     * 计算颜色评分
     * @param {number} contrast - 对比度
     * @param {Object} color - 颜色对象
     * @param {Object} config - 配置对象
     * @returns {number} 评分
     */
    static calculateColorScore(contrast, color, config) {
        let score = 0;
        
        // 对比度评分（权重最高）
        const contrastScore = Math.min(contrast / config.targetContrastRatio, 1) * 50;
        score += contrastScore;
        
        // 饱和度评分（避免过于鲜艳）
        const saturationScore = (1 - Math.abs(color.hsl.s - 0.5)) * 20;
        score += saturationScore;
        
        // 亮度评分（避免过亮或过暗）
        const lightnessScore = (1 - Math.abs(color.hsl.l - 0.5)) * 20;
        score += lightnessScore;
        
        // 色相协调性评分
        const hueScore = 10; // 基础分，因为已经选择了协调色相
        score += hueScore;
        
        return score;
    }
    
    /**
     * 应用智能颜色适配到元素
     * @param {HTMLElement} element - 目标元素
     * @param {string} backgroundColor - 背景颜色
     * @param {Object} options - 配置选项
     */
    static applySmartColorToElement(element, backgroundColor, options = {}) {
        const optimalColor = this.calculateOptimalTextColor(backgroundColor, options);
        
        // 应用颜色并添加过渡动画
        element.style.transition = 'color 0.5s ease-in-out';
        element.style.color = optimalColor;
        
        console.log(`[SmartColorAdapter] 应用智能颜色到元素: ${optimalColor}`);
    }
    
    /**
     * 批量应用智能颜色适配
     * @param {Array} elements - 元素数组
     * @param {string} backgroundColor - 背景颜色
     * @param {Object} options - 配置选项
     */
    static applySmartColorToElements(elements, backgroundColor, options = {}) {
        const optimalColor = this.calculateOptimalTextColor(backgroundColor, options);
        
        elements.forEach(element => {
            if (element) {
                element.style.transition = 'color 0.5s ease-in-out';
                element.style.color = optimalColor;
            }
        });
        
        console.log(`[SmartColorAdapter] 批量应用智能颜色: ${optimalColor}`);
    }
    
    /**
     * 更新CSS变量
     * @param {string} backgroundColor - 背景颜色
     * @param {Object} options - 配置选项
     */
    static updateCSSVariables(backgroundColor, options = {}) {
        const optimalColor = this.calculateOptimalTextColor(backgroundColor, options);
        const rgb = this.hexToRgb(optimalColor);
        
        if (rgb) {
            document.documentElement.style.setProperty('--text-color', optimalColor);
            document.documentElement.style.setProperty('--text-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
            
            console.log(`[SmartColorAdapter] 更新CSS变量: --text-color = ${optimalColor}`);
        }
    }
    
    // ==================== 工具方法 ====================
    
    /**
     * Hex转RGB
     * @param {string} hex - Hex颜色值
     * @returns {Object|null} RGB对象
     */
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    /**
     * RGB转Hex
     * @param {number} r - 红色值
     * @param {number} g - 绿色值
     * @param {number} b - 蓝色值
     * @returns {string} Hex颜色值
     */
    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    /**
     * RGB转HSL
     * @param {number} r - 红色值
     * @param {number} g - 绿色值
     * @param {number} b - 蓝色值
     * @returns {Object} HSL对象
     */
    static rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return { h: h * 360, s: s, l: l };
    }
    
    /**
     * HSL转RGB
     * @param {number} h - 色相
     * @param {number} s - 饱和度
     * @param {number} l - 亮度
     * @returns {Object} RGB对象
     */
    static hslToRgb(h, s, l) {
        h /= 360;
        
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        if (s === 0) {
            return { r: l * 255, g: l * 255, b: l * 255 };
        }
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        return {
            r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
            g: Math.round(hue2rgb(p, q, h) * 255),
            b: Math.round(hue2rgb(p, q, h - 1/3) * 255)
        };
    }
    
    /**
     * 计算亮度
     * @param {number} r - 红色值
     * @param {number} g - 绿色值
     * @param {number} b - 蓝色值
     * @returns {number} 亮度值
     */
    static getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    
    /**
     * 计算对比度
     * @param {Object} color1 - 颜色1的RGB值
     * @param {Object} color2 - 颜色2的RGB值
     * @returns {number} 对比度值
     */
    static getContrastRatio(color1, color2) {
        const lum1 = this.getLuminance(color1.r, color1.g, color1.b);
        const lum2 = this.getLuminance(color2.r, color2.g, color2.b);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }
    
    /**
     * 获取当前配置
     * @returns {Object} 配置对象
     */
    static getConfig() {
        return { ...this.config };
    }
    
    /**
     * 更新配置
     * @param {Object} newConfig - 新配置
     */
    static updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('[SmartColorAdapter] 配置已更新:', this.config);
    }
}

// 将SmartColorAdapter添加到全局作用域
window.SmartColorAdapter = SmartColorAdapter;
