/**
 * 性能监控面板
 * 实时显示系统性能指标
 */

class PerformanceMonitor {
    static isVisible = false;
    static panel = null;
    static updateInterval = null;
    static stats = {
        fps: 0,
        frameCount: 0,
        lastTime: 0,
        memoryUsage: 0,
        domElements: 0,
        eventListeners: 0
    };
    
    /**
     * 初始化性能监控
     */
    static initialize() {
        if (this.panel) return;
        
        this.createPanel();
        this.startMonitoring();
        Logger.info('性能监控面板已初始化');
    }
    
    /**
     * 创建监控面板
     */
    static createPanel() {
        this.panel = document.createElement('div');
        this.panel.id = 'performance-monitor';
        this.panel.className = 'performance-monitor';
        this.panel.innerHTML = `
            <div class="perf-header">
                <span>性能监控</span>
                <button id="perf-toggle">隐藏</button>
            </div>
            <div class="perf-content">
                <div class="perf-item">
                    <span class="perf-label">FPS:</span>
                    <span class="perf-value" id="perf-fps">--</span>
                </div>
                <div class="perf-item">
                    <span class="perf-label">内存:</span>
                    <span class="perf-value" id="perf-memory">--</span>
                </div>
                <div class="perf-item">
                    <span class="perf-label">DOM元素:</span>
                    <span class="perf-value" id="perf-dom">--</span>
                </div>
                <div class="perf-item">
                    <span class="perf-label">事件监听:</span>
                    <span class="perf-value" id="perf-events">--</span>
                </div>
                <div class="perf-item">
                    <span class="perf-label">缓存命中率:</span>
                    <span class="perf-value" id="perf-cache">--</span>
                </div>
                <div class="perf-item">
                    <span class="perf-label">批处理队列:</span>
                    <span class="perf-value" id="perf-batch">--</span>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .performance-monitor {
                position: fixed;
                top: 10px;
                right: 10px;
                width: 200px;
                background: rgba(0, 0, 0, 0.8);
                border: 1px solid #333;
                border-radius: 8px;
                color: #fff;
                font-family: monospace;
                font-size: 12px;
                z-index: 1000;
                backdrop-filter: blur(10px);
            }
            
            .perf-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.1);
                border-bottom: 1px solid #333;
            }
            
            .perf-header button {
                background: none;
                border: none;
                color: #fff;
                cursor: pointer;
                font-size: 10px;
            }
            
            .perf-content {
                padding: 8px 12px;
            }
            
            .perf-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
            }
            
            .perf-label {
                color: #aaa;
            }
            
            .perf-value {
                color: #0f0;
                font-weight: bold;
            }
            
            .perf-value.warning {
                color: #ff0;
            }
            
            .perf-value.error {
                color: #f00;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(this.panel);
        
        // 绑定切换按钮
        const toggleBtn = this.panel.querySelector('#perf-toggle');
        toggleBtn.addEventListener('click', () => {
            this.toggle();
        });
    }
    
    /**
     * 开始监控
     */
    static startMonitoring() {
        this.lastTime = performance.now();
        
        // FPS 计算
        const measureFPS = () => {
            const now = performance.now();
            this.stats.frameCount++;
            
            if (now - this.lastTime >= 1000) {
                this.stats.fps = Math.round((this.stats.frameCount * 1000) / (now - this.lastTime));
                this.stats.frameCount = 0;
                this.lastTime = now;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        measureFPS();
        
        // 定期更新显示
        this.updateInterval = setInterval(() => {
            this.updateDisplay();
        }, 500);
    }
    
    /**
     * 更新显示
     */
    static updateDisplay() {
        if (!this.panel || !this.isVisible) return;
        
        // 更新 FPS
        const fpsElement = this.panel.querySelector('#perf-fps');
        fpsElement.textContent = this.stats.fps;
        fpsElement.className = this.stats.fps < 30 ? 'perf-value error' : 
                              this.stats.fps < 50 ? 'perf-value warning' : 'perf-value';
        
        // 更新内存使用
        const memoryElement = this.panel.querySelector('#perf-memory');
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            memoryElement.textContent = `${used}MB`;
            memoryElement.className = used > 100 ? 'perf-value error' : 
                                     used > 50 ? 'perf-value warning' : 'perf-value';
        } else {
            memoryElement.textContent = 'N/A';
        }
        
        // 更新 DOM 元素数量
        const domElement = this.panel.querySelector('#perf-dom');
        const domCount = document.querySelectorAll('*').length;
        domElement.textContent = domCount;
        domElement.className = domCount > 1000 ? 'perf-value error' : 
                              domCount > 500 ? 'perf-value warning' : 'perf-value';
        
        // 更新事件监听器数量
        const eventsElement = this.panel.querySelector('#perf-events');
        if (window.MemoryManager) {
            const eventCount = MemoryManager.getStats().eventListeners;
            eventsElement.textContent = eventCount;
            eventsElement.className = eventCount > 50 ? 'perf-value error' : 
                                     eventCount > 20 ? 'perf-value warning' : 'perf-value';
        } else {
            eventsElement.textContent = 'N/A';
        }
        
        // 更新缓存命中率
        const cacheElement = this.panel.querySelector('#perf-cache');
        if (window.DOMCache) {
            const cacheStats = DOMCache.getStats();
            cacheElement.textContent = cacheStats.hitRate;
            cacheElement.className = parseFloat(cacheStats.hitRate) < 50 ? 'perf-value error' : 
                                   parseFloat(cacheStats.hitRate) < 70 ? 'perf-value warning' : 'perf-value';
        } else {
            cacheElement.textContent = 'N/A';
        }
        
        // 更新批处理队列
        const batchElement = this.panel.querySelector('#perf-batch');
        if (window.DOMBatcher) {
            const batchStats = DOMBatcher.getStats();
            batchElement.textContent = batchStats.pendingUpdates;
            batchElement.className = batchStats.pendingUpdates > 10 ? 'perf-value error' : 
                                   batchStats.pendingUpdates > 5 ? 'perf-value warning' : 'perf-value';
        } else {
            batchElement.textContent = 'N/A';
        }
    }
    
    /**
     * 显示/隐藏面板
     */
    static toggle() {
        this.isVisible = !this.isVisible;
        const toggleBtn = this.panel.querySelector('#perf-toggle');
        
        if (this.isVisible) {
            this.panel.style.display = 'block';
            toggleBtn.textContent = '隐藏';
            this.updateDisplay();
        } else {
            this.panel.style.display = 'none';
            toggleBtn.textContent = '显示';
        }
    }
    
    /**
     * 显示面板
     */
    static show() {
        this.isVisible = true;
        this.panel.style.display = 'block';
        this.panel.querySelector('#perf-toggle').textContent = '隐藏';
        this.updateDisplay();
    }
    
    /**
     * 隐藏面板
     */
    static hide() {
        this.isVisible = false;
        this.panel.style.display = 'none';
        this.panel.querySelector('#perf-toggle').textContent = '显示';
    }
    
    /**
     * 销毁监控器
     */
    static destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        if (this.panel) {
            this.panel.remove();
            this.panel = null;
        }
        
        Logger.info('性能监控面板已销毁');
    }
    
    /**
     * 获取性能报告
     * @returns {Object} 性能报告
     */
    static getReport() {
        return {
            fps: this.stats.fps,
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
            } : null,
            domElements: document.querySelectorAll('*').length,
            cacheStats: window.DOMCache ? DOMCache.getStats() : null,
            batchStats: window.DOMBatcher ? DOMBatcher.getStats() : null,
            memoryStats: window.MemoryManager ? MemoryManager.getStats() : null,
            timestamp: new Date().toISOString()
        };
    }
}

// 导出到全局
window.PerformanceMonitor = PerformanceMonitor;
