/**
 * 统一日志管理系统
 * 提供生产环境优化的日志输出
 */

class Logger {
    static isDebug = true; // 开发环境设为 true，生产环境设为 false
    static isVerbose = false; // 详细日志开关
    static logHistory = []; // 日志历史记录
    static maxHistorySize = 100; // 最大历史记录数
    
    /**
     * 普通日志
     * @param {string} message - 日志消息
     * @param {...any} args - 额外参数
     */
    static log(message, ...args) {
        if (this.isDebug) {
            console.log(message, ...args);
            this.addToHistory('LOG', message, args);
        }
    }
    
    /**
     * 警告日志
     * @param {string} message - 警告消息
     * @param {...any} args - 额外参数
     */
    static warn(message, ...args) {
        console.warn(`⚠️ ${message}`, ...args);
        this.addToHistory('WARN', message, args);
    }
    
    /**
     * 错误日志
     * @param {string} message - 错误消息
     * @param {...any} args - 额外参数
     */
    static error(message, ...args) {
        console.error(`❌ ${message}`, ...args);
        this.addToHistory('ERROR', message, args);
    }
    
    /**
     * 成功日志
     * @param {string} message - 成功消息
     * @param {...any} args - 额外参数
     */
    static success(message, ...args) {
        if (this.isDebug) {
            console.log(`✅ ${message}`, ...args);
            this.addToHistory('SUCCESS', message, args);
        }
    }
    
    /**
     * 信息日志
     * @param {string} message - 信息消息
     * @param {...any} args - 额外参数
     */
    static info(message, ...args) {
        if (this.isDebug) {
            console.log(`ℹ️ ${message}`, ...args);
            this.addToHistory('INFO', message, args);
        }
    }
    
    /**
     * 详细日志（仅在详细模式下显示）
     * @param {string} message - 详细消息
     * @param {...any} args - 额外参数
     */
    static verbose(message, ...args) {
        if (this.isDebug && this.isVerbose) {
            console.log(`🔍 ${message}`, ...args);
            this.addToHistory('VERBOSE', message, args);
        }
    }
    
    /**
     * 性能日志
     * @param {string} operation - 操作名称
     * @param {number} startTime - 开始时间
     * @param {...any} args - 额外参数
     */
    static performance(operation, startTime, ...args) {
        const duration = performance.now() - startTime;
        if (this.isDebug) {
            console.log(`⚡ ${operation}: ${duration.toFixed(2)}ms`, ...args);
            this.addToHistory('PERF', `${operation}: ${duration.toFixed(2)}ms`, args);
        }
    }
    
    /**
     * 添加日志到历史记录
     * @param {string} level - 日志级别
     * @param {string} message - 消息
     * @param {Array} args - 参数
     */
    static addToHistory(level, message, args) {
        this.logHistory.push({
            timestamp: new Date().toISOString(),
            level,
            message,
            args: args.length > 0 ? args : undefined
        });
        
        // 保持历史记录大小
        if (this.logHistory.length > this.maxHistorySize) {
            this.logHistory.shift();
        }
    }
    
    /**
     * 获取日志历史
     * @returns {Array} 日志历史
     */
    static getHistory() {
        return [...this.logHistory];
    }
    
    /**
     * 清空日志历史
     */
    static clearHistory() {
        this.logHistory = [];
    }
    
    /**
     * 导出日志历史
     * @returns {string} JSON 格式的日志历史
     */
    static exportHistory() {
        return JSON.stringify(this.logHistory, null, 2);
    }
    
    /**
     * 设置调试模式
     * @param {boolean} enabled - 是否启用调试
     */
    static setDebugMode(enabled) {
        this.isDebug = enabled;
        this.log(`Logger 调试模式: ${enabled ? '启用' : '禁用'}`);
    }
    
    /**
     * 设置详细模式
     * @param {boolean} enabled - 是否启用详细日志
     */
    static setVerboseMode(enabled) {
        this.isVerbose = enabled;
        this.log(`Logger 详细模式: ${enabled ? '启用' : '禁用'}`);
    }
    
    /**
     * 性能计时器
     * @param {string} operation - 操作名称
     * @returns {Function} 结束计时的函数
     */
    static timer(operation) {
        const startTime = performance.now();
        return (...args) => {
            this.performance(operation, startTime, ...args);
        };
    }
}

// 导出到全局
window.Logger = Logger;
