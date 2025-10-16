/**
 * 深空回响 - 颜色工具类
 * 负责颜色转换、互补色计算等功能
 */

class ColorUtils {
    /**
     * 将十六进制颜色转换为RGB
     * @param {string} hex - 十六进制颜色值 (#ffffff)
     * @returns {object} RGB对象 {r, g, b}
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
     * 将RGB转换为十六进制
     * @param {number} r - 红色值 (0-255)
     * @param {number} g - 绿色值 (0-255)
     * @param {number} b - 蓝色值 (0-255)
     * @returns {string} 十六进制颜色值
     */
    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * 将RGB转换为HSL
     * @param {number} r - 红色值 (0-255)
     * @param {number} g - 绿色值 (0-255)
     * @param {number} b - 蓝色值 (0-255)
     * @returns {object} HSL对象 {h, s, l}
     */
    static rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // 无色
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

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    /**
     * 将HSL转换为RGB
     * @param {number} h - 色相 (0-360)
     * @param {number} s - 饱和度 (0-100)
     * @param {number} l - 亮度 (0-100)
     * @returns {object} RGB对象 {r, g, b}
     */
    static hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // 无色
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    /**
     * 计算互补色
     * @param {string} hex - 十六进制颜色值
     * @returns {string} 互补色十六进制值
     */
    static getComplementaryColor(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return '#000000';

        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        // 计算互补色：色相旋转180度
        const complementaryH = (hsl.h + 180) % 360;
        
        const complementaryRgb = this.hslToRgb(complementaryH, hsl.s, hsl.l);
        return this.rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
    }

    /**
     * 计算分割互补色（选择互补色两侧的颜色之一）
     * @param {string} hex - 十六进制颜色值
     * @param {number} offset - 偏移角度 (默认30度)
     * @returns {string} 分割互补色十六进制值
     */
    static getSplitComplementaryColor(hex, offset = 30) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return '#000000';

        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        // 计算分割互补色：色相旋转180度±偏移角度
        const complementaryH = (hsl.h + 180) % 360;
        const splitH1 = (complementaryH + offset) % 360;
        const splitH2 = (complementaryH - offset + 360) % 360;
        
        // 根据背景亮度选择更合适的颜色
        const splitRgb1 = this.hslToRgb(splitH1, hsl.s, hsl.l);
        const splitRgb2 = this.hslToRgb(splitH2, hsl.s, hsl.l);
        
        // 选择对比度更高的颜色
        const contrast1 = this.getContrastRatio(rgb, splitRgb1);
        const contrast2 = this.getContrastRatio(rgb, splitRgb2);
        
        return contrast1 > contrast2 ? 
            this.rgbToHex(splitRgb1.r, splitRgb1.g, splitRgb1.b) :
            this.rgbToHex(splitRgb2.r, splitRgb2.g, splitRgb2.b);
    }

    /**
     * 计算对比度
     * @param {object} rgb1 - 第一个RGB颜色
     * @param {object} rgb2 - 第二个RGB颜色
     * @returns {number} 对比度值
     */
    static getContrastRatio(rgb1, rgb2) {
        const luminance1 = this.getLuminance(rgb1);
        const luminance2 = this.getLuminance(rgb2);
        
        const lighter = Math.max(luminance1, luminance2);
        const darker = Math.min(luminance1, luminance2);
        
        return (lighter + 0.05) / (darker + 0.05);
    }

    /**
     * 计算相对亮度
     * @param {object} rgb - RGB颜色对象
     * @returns {number} 亮度值 (0-1)
     */
    static getLuminance(rgb) {
        const { r, g, b } = rgb;
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    /**
     * 根据背景颜色自动选择最佳文本颜色
     * @param {string} backgroundColor - 背景颜色
     * @returns {string} 最佳文本颜色
     */
    static getBestTextColor(backgroundColor) {
        const bgRgb = this.hexToRgb(backgroundColor);
        if (!bgRgb) return '#ffffff';

        const bgLuminance = this.getLuminance(bgRgb);
        
        // 如果背景较暗，使用亮色文本；如果背景较亮，使用暗色文本
        if (bgLuminance < 0.5) {
            // 背景较暗，使用亮色文本
            return this.getSplitComplementaryColor(backgroundColor, 30);
        } else {
            // 背景较亮，使用暗色文本
            const complementary = this.getComplementaryColor(backgroundColor);
            const complementaryRgb = this.hexToRgb(complementary);
            if (complementaryRgb) {
                // 降低亮度以获得更好的对比度
                const hsl = this.rgbToHsl(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
                const darkerRgb = this.hslToRgb(hsl.h, hsl.s, Math.max(20, hsl.l - 30));
                return this.rgbToHex(darkerRgb.r, darkerRgb.g, darkerRgb.b);
            }
            return '#000000';
        }
    }

    /**
     * 获取颜色的主要色调
     * @param {string} hex - 十六进制颜色值
     * @returns {string} 色调名称
     */
    static getColorHue(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return 'unknown';

        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const h = hsl.h;

        if (h < 15 || h >= 345) return 'red';
        if (h < 45) return 'orange';
        if (h < 75) return 'yellow';
        if (h < 165) return 'green';
        if (h < 195) return 'cyan';
        if (h < 255) return 'blue';
        if (h < 285) return 'purple';
        if (h < 315) return 'magenta';
        return 'red';
    }

    /**
     * 调整颜色亮度
     * @param {string} hex - 十六进制颜色值
     * @param {number} amount - 调整量 (-100 到 100)
     * @returns {string} 调整后的颜色
     */
    static adjustBrightness(hex, amount) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;

        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const newL = Math.max(0, Math.min(100, hsl.l + amount));
        
        const newRgb = this.hslToRgb(hsl.h, hsl.s, newL);
        return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }

    /**
     * 调整颜色饱和度
     * @param {string} hex - 十六进制颜色值
     * @param {number} amount - 调整量 (-100 到 100)
     * @returns {string} 调整后的颜色
     */
    static adjustSaturation(hex, amount) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;

        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const newS = Math.max(0, Math.min(100, hsl.s + amount));
        
        const newRgb = this.hslToRgb(hsl.h, newS, hsl.l);
        return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }
}

// 将ColorUtils添加到全局作用域
window.ColorUtils = ColorUtils;
