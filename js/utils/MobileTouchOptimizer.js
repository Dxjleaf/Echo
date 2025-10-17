/**
 * 手机端触摸交互优化
 * 提供更好的移动设备用户体验
 */

class MobileTouchOptimizer {
    static isMobile = false;
    static touchStartTime = 0;
    static touchStartPos = { x: 0, y: 0 };
    static longPressTimer = null;
    static longPressDelay = 500; // 长按延迟（毫秒）
    static swipeThreshold = 50; // 滑动阈值（像素）
    static isLongPress = false;
    
    /**
     * 初始化移动端优化
     */
    static initialize() {
        this.detectMobile();
        
        if (this.isMobile) {
            this.setupTouchEvents();
            this.optimizeMobileStyles();
            Logger.info('移动端触摸优化已启用');
        } else {
            Logger.info('桌面端，跳过移动端优化');
        }
    }
    
    /**
     * 检测是否为移动设备
     */
    static detectMobile() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        
        this.isMobile = isMobileDevice || (isTouchDevice && isSmallScreen);
        
        Logger.info(`移动设备检测: ${this.isMobile ? '是' : '否'}`, {
            userAgent: isMobileDevice,
            touch: isTouchDevice,
            smallScreen: isSmallScreen
        });
    }
    
    /**
     * 设置触摸事件
     */
    static setupTouchEvents() {
        // 为五感元素添加触摸事件
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        
        // 防止双击缩放
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
        
        // 防止长按菜单
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        Logger.info('触摸事件已设置');
    }
    
    /**
     * 处理触摸开始
     */
    static handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchStartTime = Date.now();
        this.touchStartPos = { x: touch.clientX, y: touch.clientY };
        this.isLongPress = false;
        
        // 设置长按定时器
        this.longPressTimer = setTimeout(() => {
            this.isLongPress = true;
            this.handleLongPress(e);
        }, this.longPressDelay);
        
        // 添加触摸反馈
        this.addTouchFeedback(e.target);
    }
    
    /**
     * 处理触摸移动
     */
    static handleTouchMove(e) {
        // 如果移动距离过大，取消长按
        if (this.longPressTimer) {
            const touch = e.touches[0];
            const deltaX = Math.abs(touch.clientX - this.touchStartPos.x);
            const deltaY = Math.abs(touch.clientY - this.touchStartPos.y);
            
            if (deltaX > 10 || deltaY > 10) {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            }
        }
    }
    
    /**
     * 处理触摸结束
     */
    static handleTouchEnd(e) {
        // 清除长按定时器
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
        
        // 如果不是长按，处理点击
        if (!this.isLongPress) {
            const touchDuration = Date.now() - this.touchStartTime;
            
            // 短按（小于200ms）
            if (touchDuration < 200) {
                this.handleTap(e);
            }
        }
        
        // 移除触摸反馈
        this.removeTouchFeedback(e.target);
    }
    
    /**
     * 处理点击
     */
    static handleTap(e) {
        const target = e.target;
        
        // 五感元素点击
        if (target.closest('.dynamic-sense')) {
            const senseElement = target.closest('.dynamic-sense');
            this.handleSenseTap(senseElement);
        }
        
        // 对话框点击
        if (target.closest('#dialogue-container')) {
            this.handleDialogueTap();
        }
        
        // 语言选择按钮点击
        if (target.closest('.language-button')) {
            this.handleLanguageButtonTap(target.closest('.language-button'));
        }
    }
    
    /**
     * 处理长按
     */
    static handleLongPress(e) {
        const target = e.target;
        
        // 五感元素长按 - 锁定/解锁
        if (target.closest('.dynamic-sense')) {
            const senseElement = target.closest('.dynamic-sense');
            this.handleSenseLongPress(senseElement);
        }
        
        // 显示触觉反馈
        this.showHapticFeedback();
    }
    
    /**
     * 处理五感元素点击
     */
    static handleSenseTap(senseElement) {
        // 切换展开/收起状态
        if (senseElement.classList.contains('expanded') || senseElement.classList.contains('locked')) {
            senseElement.classList.remove('expanded', 'locked');
        } else {
            senseElement.classList.add('expanded');
        }
        
        Logger.verbose('五感元素点击:', senseElement.dataset.senseType);
    }
    
    /**
     * 处理五感元素长按
     */
    static handleSenseLongPress(senseElement) {
        // 锁定/解锁状态
        if (senseElement.classList.contains('locked')) {
            senseElement.classList.remove('locked');
            Logger.verbose('五感元素解锁:', senseElement.dataset.senseType);
        } else {
            senseElement.classList.add('locked');
            senseElement.classList.remove('expanded');
            Logger.verbose('五感元素锁定:', senseElement.dataset.senseType);
        }
        
        // 显示锁定状态提示
        this.showLockStatus(senseElement);
    }
    
    /**
     * 处理对话框点击
     */
    static handleDialogueTap() {
        // 推进对话
        if (window.GameManager && GameManager.handleAdvanceInput) {
            GameManager.handleAdvanceInput();
        }
        
        Logger.verbose('对话框点击 - 推进对话');
    }
    
    /**
     * 处理语言选择按钮点击
     */
    static handleLanguageButtonTap(button) {
        // 添加点击动画
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        Logger.verbose('语言选择按钮点击:', button.dataset.lang);
    }
    
    /**
     * 添加触摸反馈
     */
    static addTouchFeedback(element) {
        if (element.classList.contains('dynamic-sense') || 
            element.classList.contains('language-button') ||
            element.classList.contains('choice-button')) {
            element.style.transform = 'scale(0.98)';
            element.style.transition = 'transform 0.1s ease';
        }
    }
    
    /**
     * 移除触摸反馈
     */
    static removeTouchFeedback(element) {
        if (element.classList.contains('dynamic-sense') || 
            element.classList.contains('language-button') ||
            element.classList.contains('choice-button')) {
            setTimeout(() => {
                element.style.transform = '';
            }, 100);
        }
    }
    
    /**
     * 显示触觉反馈
     */
    static showHapticFeedback() {
        // 使用 Web Vibration API（如果支持）
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // 50ms 震动
        }
        
        // 视觉反馈
        this.showVisualFeedback();
    }
    
    /**
     * 显示视觉反馈
     */
    static showVisualFeedback() {
        // 创建波纹效果
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(ripple);
        
        // 清理
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 600);
    }
    
    /**
     * 显示锁定状态提示
     */
    static showLockStatus(senseElement) {
        const isLocked = senseElement.classList.contains('locked');
        const message = isLocked ? '已锁定' : '已解锁';
        
        // 创建状态提示
        const statusTip = document.createElement('div');
        statusTip.textContent = message;
        statusTip.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 2s ease-in-out;
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(statusTip);
        
        // 清理
        setTimeout(() => {
            statusTip.remove();
            style.remove();
        }, 2000);
    }
    
    /**
     * 优化移动端样式
     */
    static optimizeMobileStyles() {
        // 添加移动端专用样式
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            /* 移动端优化样式 */
            .dynamic-sense {
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
            }
            
            .language-button,
            .choice-button {
                -webkit-tap-highlight-color: rgba(99, 102, 241, 0.3);
                touch-action: manipulation;
            }
            
            /* 防止选择文本 */
            * {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            
            /* 优化滚动 */
            body {
                -webkit-overflow-scrolling: touch;
            }
            
            /* 防止缩放 */
            input, textarea, select {
                font-size: 16px;
            }
        `;
        
        document.head.appendChild(mobileStyles);
    }
    
    /**
     * 获取移动端信息
     */
    static getMobileInfo() {
        return {
            isMobile: this.isMobile,
            userAgent: navigator.userAgent,
            screenSize: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            touchSupport: 'ontouchstart' in window,
            maxTouchPoints: navigator.maxTouchPoints || 0
        };
    }
}

// 导出到全局
window.MobileTouchOptimizer = MobileTouchOptimizer;
