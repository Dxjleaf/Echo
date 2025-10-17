/**
 * 手机端专用样式优化
 * 提供更好的移动设备视觉体验
 */

class MobileStyleOptimizer {
    static isInitialized = false;
    
    /**
     * 初始化手机端样式优化
     */
    static initialize() {
        if (this.isInitialized) return;
        
        this.addMobileStyles();
        this.optimizeViewport();
        this.addSafeAreaSupport();
        
        this.isInitialized = true;
        Logger.info('手机端样式优化已启用');
    }
    
    /**
     * 添加手机端专用样式
     */
    static addMobileStyles() {
        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'mobile-optimization-styles';
        mobileStyles.textContent = `
            /* 手机端全局优化 */
            @media (max-width: 768px) {
                /* 防止缩放 */
                html {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
                
                /* 优化滚动 */
                body {
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                }
                
                /* 防止选择文本 */
                * {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                
                /* 允许输入框选择文本 */
                input, textarea {
                    -webkit-user-select: text;
                    -moz-user-select: text;
                    -ms-user-select: text;
                    user-select: text;
                }
                
                /* 优化按钮触摸 */
                button, .language-button, .choice-button {
                    -webkit-tap-highlight-color: rgba(99, 102, 241, 0.3);
                    touch-action: manipulation;
                    min-height: 44px;
                    min-width: 44px;
                }
                
                /* 优化链接触摸 */
                a {
                    -webkit-tap-highlight-color: rgba(99, 102, 241, 0.3);
                    touch-action: manipulation;
                }
                
                /* 优化五感元素 */
                .dynamic-sense {
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                }
                
                /* 优化对话框 */
                #dialogue-container {
                    -webkit-tap-highlight-color: rgba(99, 102, 241, 0.2);
                    touch-action: manipulation;
                }
                
                /* 防止双击缩放 */
                * {
                    touch-action: manipulation;
                }
                
                /* 优化字体渲染 */
                body {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: optimizeLegibility;
                }
                
                /* 优化动画性能 */
                .dynamic-sense,
                .dialogue-text,
                .speaker-name {
                    will-change: transform, opacity;
                    transform: translateZ(0);
                }
                
                /* 优化阴影性能 */
                .dynamic-sense {
                    filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.4));
                }
                
                .dynamic-sense.expanded,
                .dynamic-sense.locked,
                .dynamic-sense:hover {
                    filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.6));
                }
            }
            
            /* 小屏手机进一步优化 */
            @media (max-width: 480px) {
                /* 更小的最小触摸区域 */
                button, .language-button, .choice-button {
                    min-height: 40px;
                    min-width: 40px;
                }
                
                /* 优化字体大小 */
                body {
                    font-size: 14px;
                }
                
                /* 优化间距 */
                .dynamic-sense {
                    margin: 2px;
                }
                
                /* 优化动画 */
                .dynamic-sense {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
            }
            
            /* 横屏优化 */
            @media (max-width: 768px) and (orientation: landscape) {
                /* 横屏时调整五感位置 */
                .视觉-sense {
                    top: 5% !important;
                }
                
                .听觉_0-sense {
                    top: 20% !important;
                }
                
                .听觉_1-sense {
                    top: 20% !important;
                }
                
                .触觉_0-sense {
                    bottom: 10% !important;
                }
                
                .触觉_1-sense {
                    bottom: 10% !important;
                }
                
                .嗅觉-sense {
                    bottom: 5% !important;
                }
                
                .味觉-sense {
                    bottom: 1% !important;
                }
                
                /* 横屏时调整对话框 */
                #dialogue-container {
                    bottom: 5% !important;
                    width: 90% !important;
                }
            }
            
            /* 高分辨率屏幕优化 */
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                /* 优化边框 */
                .dynamic-sense {
                    border-width: 1px;
                }
                
                /* 优化阴影 */
                .dynamic-sense {
                    box-shadow: 
                        0 2px 8px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }
            }
            
            /* 暗色模式优化 */
            @media (prefers-color-scheme: dark) {
                .dynamic-sense {
                    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
                    border-color: rgba(99, 102, 241, 0.5);
                }
                
                .dynamic-sense.expanded,
                .dynamic-sense.locked,
                .dynamic-sense:hover {
                    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
                    border-color: rgba(99, 102, 241, 0.8);
                }
            }
            
            /* 减少动画偏好 */
            @media (prefers-reduced-motion: reduce) {
                .dynamic-sense,
                .dialogue-text,
                .speaker-name,
                .continue-hint {
                    animation: none !important;
                    transition: none !important;
                }
                
                .dynamic-sense {
                    transition: opacity 0.2s ease !important;
                }
            }
            
            /* 高对比度模式 */
            @media (prefers-contrast: high) {
                .dynamic-sense {
                    border: 3px solid #fff;
                    background: #000;
                    color: #fff;
                }
                
                .dynamic-sense.expanded,
                .dynamic-sense.locked,
                .dynamic-sense:hover {
                    border: 3px solid #fff;
                    background: #000;
                }
            }
        `;
        
        document.head.appendChild(mobileStyles);
    }
    
    /**
     * 优化视口设置
     */
    static optimizeViewport() {
        // 检查是否已有视口 meta 标签
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            document.head.appendChild(viewportMeta);
        }
        
        // 设置优化的视口配置
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        
        Logger.info('视口设置已优化');
    }
    
    /**
     * 添加安全区域支持
     */
    static addSafeAreaSupport() {
        // 检查是否支持安全区域
        if (CSS.supports('padding: env(safe-area-inset-top)')) {
            const safeAreaStyles = document.createElement('style');
            safeAreaStyles.textContent = `
                /* 安全区域支持 */
                body {
                    padding-top: env(safe-area-inset-top);
                    padding-bottom: env(safe-area-inset-bottom);
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                }
                
                /* 语言选择界面安全区域 */
                .language-selection-screen {
                    padding-top: env(safe-area-inset-top);
                    padding-bottom: env(safe-area-inset-bottom);
                    padding-left: env(safe-area-inset-left);
                    padding-right: env(safe-area-inset-right);
                }
                
                /* 性能监控面板安全区域 */
                .performance-monitor {
                    top: calc(10px + env(safe-area-inset-top));
                    right: calc(10px + env(safe-area-inset-right));
                }
                
                @media (max-width: 768px) {
                    .performance-monitor {
                        top: calc(5px + env(safe-area-inset-top));
                        right: calc(5px + env(safe-area-inset-right));
                    }
                }
                
                @media (max-width: 480px) {
                    .performance-monitor {
                        top: calc(3px + env(safe-area-inset-top));
                        right: calc(3px + env(safe-area-inset-right));
                    }
                }
            `;
            
            document.head.appendChild(safeAreaStyles);
            Logger.info('安全区域支持已添加');
        }
    }
    
    /**
     * 检测设备特性
     */
    static detectDeviceFeatures() {
        const features = {
            touch: 'ontouchstart' in window,
            orientation: 'orientation' in window,
            devicePixelRatio: window.devicePixelRatio || 1,
            safeArea: CSS.supports('padding: env(safe-area-inset-top)'),
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            highContrast: window.matchMedia('(prefers-contrast: high)').matches,
            darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
        };
        
        Logger.info('设备特性检测:', features);
        return features;
    }
    
    /**
     * 获取移动端信息
     */
    static getMobileInfo() {
        return {
            screenSize: {
                width: window.innerWidth,
                height: window.innerHeight,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight
            },
            devicePixelRatio: window.devicePixelRatio || 1,
            orientation: screen.orientation ? screen.orientation.type : 'unknown',
            userAgent: navigator.userAgent,
            features: this.detectDeviceFeatures()
        };
    }
}

// 导出到全局
window.MobileStyleOptimizer = MobileStyleOptimizer;
