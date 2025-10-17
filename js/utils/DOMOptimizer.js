/**
 * DOM 缓存和批处理系统
 * 优化 DOM 操作性能，减少重复查询和批量更新
 */

class DOMCache {
    static cache = new Map();
    static cacheStats = {
        hits: 0,
        misses: 0,
        totalQueries: 0
    };
    
    /**
     * 获取缓存的 DOM 元素
     * @param {string} selector - CSS 选择器
     * @param {boolean} forceRefresh - 是否强制刷新缓存
     * @returns {HTMLElement|null} DOM 元素
     */
    static getElement(selector, forceRefresh = false) {
        this.cacheStats.totalQueries++;
        
        if (!forceRefresh && this.cache.has(selector)) {
            this.cacheStats.hits++;
            return this.cache.get(selector);
        }
        
        this.cacheStats.misses++;
        const element = document.querySelector(selector);
        
        if (element) {
            this.cache.set(selector, element);
        }
        
        return element;
    }
    
    /**
     * 获取多个元素
     * @param {string} selector - CSS 选择器
     * @param {boolean} forceRefresh - 是否强制刷新缓存
     * @returns {NodeList} 元素列表
     */
    static getElements(selector, forceRefresh = false) {
        const cacheKey = `all:${selector}`;
        this.cacheStats.totalQueries++;
        
        if (!forceRefresh && this.cache.has(cacheKey)) {
            this.cacheStats.hits++;
            return this.cache.get(cacheKey);
        }
        
        this.cacheStats.misses++;
        const elements = document.querySelectorAll(selector);
        
        if (elements.length > 0) {
            this.cache.set(cacheKey, elements);
        }
        
        return elements;
    }
    
    /**
     * 设置元素缓存
     * @param {string} selector - CSS 选择器
     * @param {HTMLElement} element - DOM 元素
     */
    static setElement(selector, element) {
        this.cache.set(selector, element);
    }
    
    /**
     * 清除特定缓存
     * @param {string} selector - CSS 选择器
     */
    static clearElement(selector) {
        this.cache.delete(selector);
    }
    
    /**
     * 清除所有缓存
     */
    static clearAll() {
        this.cache.clear();
        this.cacheStats = { hits: 0, misses: 0, totalQueries: 0 };
    }
    
    /**
     * 获取缓存统计
     * @returns {Object} 缓存统计信息
     */
    static getStats() {
        const hitRate = this.cacheStats.totalQueries > 0 
            ? (this.cacheStats.hits / this.cacheStats.totalQueries * 100).toFixed(2)
            : 0;
            
        return {
            ...this.cacheStats,
            hitRate: `${hitRate}%`,
            cacheSize: this.cache.size
        };
    }
    
    /**
     * 预热常用元素
     * @param {Array<string>} selectors - 选择器列表
     */
    static preload(selectors) {
        selectors.forEach(selector => {
            this.getElement(selector);
        });
    }
}

class DOMBatcher {
    static pendingUpdates = [];
    static updateTimer = null;
    static batchStats = {
        totalBatches: 0,
        totalUpdates: 0,
        averageBatchSize: 0
    };
    
    /**
     * 调度 DOM 更新
     * @param {Function} updateFunction - 更新函数
     * @param {number} priority - 优先级 (0-10, 10最高)
     */
    static scheduleUpdate(updateFunction, priority = 5) {
        this.pendingUpdates.push({ fn: updateFunction, priority });
        
        if (!this.updateTimer) {
            this.updateTimer = requestAnimationFrame(() => {
                this.flushUpdates();
            });
        }
    }
    
    /**
     * 执行所有待处理的更新
     */
    static flushUpdates() {
        if (this.pendingUpdates.length === 0) return;
        
        // 按优先级排序
        this.pendingUpdates.sort((a, b) => b.priority - a.priority);
        
        const batchSize = this.pendingUpdates.length;
        this.batchStats.totalBatches++;
        this.batchStats.totalUpdates += batchSize;
        this.batchStats.averageBatchSize = 
            this.batchStats.totalUpdates / this.batchStats.totalBatches;
        
        // 执行所有更新
        this.pendingUpdates.forEach(({ fn }) => {
            try {
                fn();
            } catch (error) {
                console.error('DOM 批处理更新失败:', error);
            }
        });
        
        // 清空待处理队列
        this.pendingUpdates = [];
        this.updateTimer = null;
    }
    
    /**
     * 立即执行更新（跳过批处理）
     * @param {Function} updateFunction - 更新函数
     */
    static immediateUpdate(updateFunction) {
        try {
            updateFunction();
        } catch (error) {
            console.error('DOM 立即更新失败:', error);
        }
    }
    
    /**
     * 获取批处理统计
     * @returns {Object} 批处理统计信息
     */
    static getStats() {
        return {
            ...this.batchStats,
            pendingUpdates: this.pendingUpdates.length
        };
    }
    
    /**
     * 重置统计
     */
    static resetStats() {
        this.batchStats = {
            totalBatches: 0,
            totalUpdates: 0,
            averageBatchSize: 0
        };
    }
}

class DOMOptimizer {
    static isInitialized = false;
    static observer = null;
    
    /**
     * 初始化 DOM 优化器
     */
    static initialize() {
        if (this.isInitialized) return;
        
        // 预热常用元素
        const commonSelectors = [
            '#dialogue-container',
            '#dialogue-text',
            '#speaker-name',
            '#simple-sense-container',
            '#bgm-controls',
            '#settings-panel'
        ];
        
        DOMCache.preload(commonSelectors);
        
        // 设置 DOM 变化观察器
        this.setupMutationObserver();
        
        this.isInitialized = true;
        Logger.success('DOM 优化器初始化完成');
    }
    
    /**
     * 设置 DOM 变化观察器
     */
    static setupMutationObserver() {
        if (!window.MutationObserver) return;
        
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // 当元素被移除时，清除相关缓存
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.clearElementCache(node);
                        }
                    });
                }
            });
        });
        
        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    /**
     * 清除元素相关缓存
     * @param {HTMLElement} element - 被移除的元素
     */
    static clearElementCache(element) {
        // 清除以该元素 ID 为键的缓存
        if (element.id) {
            DOMCache.clearElement(`#${element.id}`);
        }
        
        // 清除以该元素类名为键的缓存
        if (element.className) {
            const classes = element.className.split(' ');
            classes.forEach(cls => {
                DOMCache.clearElement(`.${cls}`);
            });
        }
    }
    
    /**
     * 销毁优化器
     */
    static destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        DOMCache.clearAll();
        DOMBatcher.resetStats();
        this.isInitialized = false;
    }
    
    /**
     * 获取优化统计
     * @returns {Object} 优化统计信息
     */
    static getStats() {
        return {
            cache: DOMCache.getStats(),
            batcher: DOMBatcher.getStats(),
            isInitialized: this.isInitialized
        };
    }
}

// 导出到全局
window.DOMCache = DOMCache;
window.DOMBatcher = DOMBatcher;
window.DOMOptimizer = DOMOptimizer;
