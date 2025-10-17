/**
 * 内存管理系统
 * 防止内存泄漏，优化内存使用
 */

class MemoryManager {
    static eventListeners = new Map();
    static instances = new WeakMap();
    static timers = new Set();
    static observers = new Set();
    static memoryStats = {
        eventListeners: 0,
        timers: 0,
        observers: 0,
        instances: 0
    };
    
    /**
     * 添加事件监听器（带内存管理）
     * @param {HTMLElement} element - DOM 元素
     * @param {string} event - 事件类型
     * @param {Function} handler - 事件处理函数
     * @param {Object} options - 事件选项
     */
    static addEventListener(element, event, handler, options = {}) {
        const key = `${element.id || element.tagName}_${event}`;
        
        // 如果已存在，先移除
        if (this.eventListeners.has(key)) {
            this.removeEventListener(element, event);
        }
        
        element.addEventListener(event, handler, options);
        this.eventListeners.set(key, { element, event, handler, options });
        this.memoryStats.eventListeners = this.eventListeners.size;
        
        Logger.verbose(`添加事件监听器: ${key}`);
    }
    
    /**
     * 移除事件监听器
     * @param {HTMLElement} element - DOM 元素
     * @param {string} event - 事件类型
     */
    static removeEventListener(element, event) {
        const key = `${element.id || element.tagName}_${event}`;
        const listener = this.eventListeners.get(key);
        
        if (listener) {
            element.removeEventListener(event, listener.handler, listener.options);
            this.eventListeners.delete(key);
            this.memoryStats.eventListeners = this.eventListeners.size;
            Logger.verbose(`移除事件监听器: ${key}`);
        }
    }
    
    /**
     * 创建定时器（带内存管理）
     * @param {Function} callback - 回调函数
     * @param {number} delay - 延迟时间
     * @returns {number} 定时器 ID
     */
    static setTimeout(callback, delay) {
        const timerId = setTimeout(() => {
            this.timers.delete(timerId);
            this.memoryStats.timers = this.timers.size;
            callback();
        }, delay);
        
        this.timers.add(timerId);
        this.memoryStats.timers = this.timers.size;
        
        Logger.verbose(`创建定时器: ${timerId}`);
        return timerId;
    }
    
    /**
     * 创建间隔定时器（带内存管理）
     * @param {Function} callback - 回调函数
     * @param {number} interval - 间隔时间
     * @returns {number} 定时器 ID
     */
    static setInterval(callback, interval) {
        const timerId = setInterval(callback, interval);
        
        this.timers.add(timerId);
        this.memoryStats.ters = this.timers.size;
        
        Logger.verbose(`创建间隔定时器: ${timerId}`);
        return timerId;
    }
    
    /**
     * 清除定时器
     * @param {number} timerId - 定时器 ID
     */
    static clearTimer(timerId) {
        if (this.timers.has(timerId)) {
            clearTimeout(timerId);
            clearInterval(timerId);
            this.timers.delete(timerId);
            this.memoryStats.timers = this.timers.size;
            Logger.verbose(`清除定时器: ${timerId}`);
        }
    }
    
    /**
     * 创建观察器（带内存管理）
     * @param {Object} observer - 观察器对象
     * @returns {Object} 观察器对象
     */
    static createObserver(observer) {
        this.observers.add(observer);
        this.memoryStats.observers = this.observers.size;
        
        Logger.verbose(`创建观察器: ${observer.constructor.name}`);
        return observer;
    }
    
    /**
     * 销毁观察器
     * @param {Object} observer - 观察器对象
     */
    static destroyObserver(observer) {
        if (this.observers.has(observer)) {
            if (observer.disconnect) {
                observer.disconnect();
            }
            this.observers.delete(observer);
            this.memoryStats.observers = this.observers.size;
            Logger.verbose(`销毁观察器: ${observer.constructor.name}`);
        }
    }
    
    /**
     * 注册实例（用于跟踪）
     * @param {Object} instance - 实例对象
     * @param {string} type - 实例类型
     */
    static registerInstance(instance, type) {
        this.instances.set(instance, { type, createdAt: Date.now() });
        this.memoryStats.instances++;
        
        Logger.verbose(`注册实例: ${type}`);
    }
    
    /**
     * 注销实例
     * @param {Object} instance - 实例对象
     */
    static unregisterInstance(instance) {
        if (this.instances.has(instance)) {
            const info = this.instances.get(instance);
            this.instances.delete(instance);
            this.memoryStats.instances--;
            
            Logger.verbose(`注销实例: ${info.type}`);
        }
    }
    
    /**
     * 清理所有资源
     */
    static cleanup() {
        Logger.info('开始内存清理...');
        
        // 清理事件监听器
        this.eventListeners.forEach((listener, key) => {
            listener.element.removeEventListener(listener.event, listener.handler, listener.options);
        });
        this.eventListeners.clear();
        
        // 清理定时器
        this.timers.forEach(timerId => {
            clearTimeout(timerId);
            clearInterval(timerId);
        });
        this.timers.clear();
        
        // 清理观察器
        this.observers.forEach(observer => {
            if (observer.disconnect) {
                observer.disconnect();
            }
        });
        this.observers.clear();
        
        // 重置统计
        this.memoryStats = {
            eventListeners: 0,
            timers: 0,
            observers: 0,
            instances: 0
        };
        
        Logger.success('内存清理完成');
    }
    
    /**
     * 获取内存使用统计
     * @returns {Object} 内存统计信息
     */
    static getStats() {
        const memoryInfo = performance.memory ? {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        } : null;
        
        return {
            ...this.memoryStats,
            memoryInfo,
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * 检查内存泄漏
     * @returns {Object} 泄漏检查结果
     */
    static checkLeaks() {
        const stats = this.getStats();
        const leaks = [];
        
        // 检查事件监听器
        if (stats.eventListeners > 50) {
            leaks.push(`事件监听器过多: ${stats.eventListeners}`);
        }
        
        // 检查定时器
        if (stats.timers > 20) {
            leaks.push(`定时器过多: ${stats.timers}`);
        }
        
        // 检查观察器
        if (stats.observers > 10) {
            leaks.push(`观察器过多: ${stats.observers}`);
        }
        
        // 检查内存使用
        if (stats.memoryInfo && stats.memoryInfo.used > 100) {
            leaks.push(`内存使用过高: ${stats.memoryInfo.used}MB`);
        }
        
        return {
            hasLeaks: leaks.length > 0,
            leaks,
            stats
        };
    }
    
    /**
     * 强制垃圾回收（如果可用）
     */
    static forceGC() {
        if (window.gc) {
            window.gc();
            Logger.info('强制垃圾回收执行');
        } else {
            Logger.warn('强制垃圾回收不可用');
        }
    }
}

// 导出到全局
window.MemoryManager = MemoryManager;
