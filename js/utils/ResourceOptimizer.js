/**
 * 深空回响 - 资源优化器
 * 负责资源压缩、缓存和性能优化
 */

class ResourceOptimizer {
    static cache = new Map();
    static isOptimized = false;

    /**
     * 初始化资源优化器
     */
    static initialize() {
        console.log('[ResourceOptimizer] 正在初始化资源优化器...');
        
        try {
            // 启用资源缓存
            this.enableResourceCaching();
            
            // 优化DOM操作
            this.optimizeDOMOperations();
            
            // 启用GPU加速
            this.enableGPUAcceleration();
            
            console.log('[ResourceOptimizer] ✅ 资源优化器初始化完成');
            return true;
        } catch (error) {
            console.error('[ResourceOptimizer] ❌ 初始化失败:', error);
            throw error;
        }
    }

    /**
     * 启用资源缓存
     */
    static enableResourceCaching() {
        // 缓存常用DOM查询
        this.cache.set('dialogueContainer', document.getElementById('dialogue-container'));
        this.cache.set('dialogueText', document.getElementById('dialogue-text'));
        this.cache.set('speakerName', document.getElementById('speaker-name'));
        
        console.log('[ResourceOptimizer] 资源缓存已启用');
    }

    /**
     * 优化DOM操作
     */
    static optimizeDOMOperations() {
        // 使用DocumentFragment减少重排
        this.documentFragment = document.createDocumentFragment();
        
        // 批量DOM更新
        this.pendingUpdates = [];
        this.updateTimer = null;
        
        console.log('[ResourceOptimizer] DOM操作优化已启用');
    }

    /**
     * 启用GPU加速
     */
    static enableGPUAcceleration() {
        // 为动画元素添加GPU加速
        const animatedElements = document.querySelectorAll('.dialogue-text, .fade-text, .click-effect');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
            element.style.transform = 'translateZ(0)';
            element.style.backfaceVisibility = 'hidden';
        });
        
        console.log('[ResourceOptimizer] GPU加速已启用');
    }

    /**
     * 批量更新DOM
     * @param {Function} updateFunction - 更新函数
     */
    static batchUpdate(updateFunction) {
        this.pendingUpdates.push(updateFunction);
        
        if (!this.updateTimer) {
            this.updateTimer = requestAnimationFrame(() => {
                this.pendingUpdates.forEach(update => update());
                this.pendingUpdates = [];
                this.updateTimer = null;
            });
        }
    }

    /**
     * 获取缓存的元素
     * @param {string} key - 缓存键
     * @returns {HTMLElement} DOM元素
     */
    static getCachedElement(key) {
        return this.cache.get(key);
    }

    /**
     * 预加载资源
     * @param {Array} resources - 资源列表
     */
    static preloadResources(resources) {
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.url;
            link.as = resource.type;
            if (resource.crossorigin) {
                link.crossOrigin = 'anonymous';
            }
            document.head.appendChild(link);
        });
        
        console.log('[ResourceOptimizer] 资源预加载已启动');
    }

    /**
     * 压缩文本内容
     * @param {string} text - 原始文本
     * @returns {string} 压缩后的文本
     */
    static compressText(text) {
        // 简单的文本压缩（移除多余空格和换行）
        return text.replace(/\s+/g, ' ').trim();
    }

    /**
     * 优化图片加载
     * @param {string} src - 图片源
     * @returns {Promise} 加载Promise
     */
    static loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * 清理缓存
     */
    static clearCache() {
        this.cache.clear();
        console.log('[ResourceOptimizer] 缓存已清理');
    }

    /**
     * 获取性能报告
     * @returns {Object} 性能报告
     */
    static getPerformanceReport() {
        return {
            cacheSize: this.cache.size,
            isOptimized: this.isOptimized,
            pendingUpdates: this.pendingUpdates.length,
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
            } : null
        };
    }
}

// 导出到全局
window.ResourceOptimizer = ResourceOptimizer;
