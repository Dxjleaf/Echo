/**
 * 深空回响 - 游戏管理器
 * 负责游戏状态管理、数据持久化、系统协调
 */

class GameManager {
    static instance = null;
    static gameState = {
        currentDay: 1,
        trustLevel: 50,
        triggeredEvents: [],
        customVariables: {},
        gameFlags: {},
        currentCycle: 1,
        isGameStarted: false,
        isGamePaused: false
    };

    static settings = {
        textSpeed: 0.05,
        musicVolume: 0.7,
        sfxVolume: 0.8,
        voiceVolume: 1.0,
        skipEnabled: true,
        autoSave: true
    };

    static eventListeners = {
        onDayChange: [],
        onTrustChange: [],
        onEventTrigger: [],
        onGameStateChange: []
    };

    /**
     * 初始化游戏管理器
     */
    static async initialize() {
        console.log('[GameManager] 正在初始化游戏管理器...');
        
        try {
            // 加载保存的数据
            await this.loadGameData();
            
            // 设置事件监听
            this.setupEventListeners();
            
            // 初始化单例
            this.instance = this;
            
            console.log('[GameManager] ✅ 游戏管理器初始化完成');
            return true;
        } catch (error) {
            console.error('[GameManager] ❌ 初始化失败:', error);
            throw error;
        }
    }

    /**
     * 设置事件监听器
     */
    static setupEventListeners() {
        // 键盘事件
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.toggleSettings();
                    break;
                case ' ':
                case 'Enter':
                    if (!event.repeat) {
                        this.handleAdvanceInput();
                    }
                    break;
            }
        });

        // 鼠标事件
        document.addEventListener('click', (event) => {
            if (event.target.tagName !== 'BUTTON') {
                this.handleAdvanceInput();
            }
        });

        // 窗口事件
        window.addEventListener('beforeunload', () => {
            if (this.settings.autoSave) {
                this.saveGameData();
            }
        });
    }

    /**
     * 处理推进输入
     */
    static handleAdvanceInput() {
        console.log('[GameManager] 处理推进输入');
        // 通知对话系统处理输入
        if (window.DialogueSystem && window.DialogueSystem.handleInput) {
            window.DialogueSystem.handleInput();
        }
    }

    /**
     * 切换设置面板
     */
    static toggleSettings() {
        const settingsPanel = document.getElementById('settings-panel');
        if (settingsPanel) {
            settingsPanel.classList.toggle('hidden');
        }
    }

    /**
     * 开始游戏
     */
    static startGame() {
        console.log('[GameManager] 🚀 开始游戏');
        this.gameState.isGameStarted = true;
        this.gameState.currentDay = 1;
        this.gameState.trustLevel = 50;
        this.triggerEvent('gameStart');
    }

    /**
     * 设置游戏变量
     */
    static setVariable(key, value) {
        this.gameState.customVariables[key] = value;
        this.triggerEvent('gameStateChange', { key, value });
        console.log(`[GameManager] 设置变量: ${key} = ${value}`);
    }

    /**
     * 获取游戏变量
     */
    static getVariable(key, defaultValue = null) {
        return this.gameState.customVariables[key] ?? defaultValue;
    }

    /**
     * 检查是否有变量
     */
    static hasVariable(key) {
        return key in this.gameState.customVariables;
    }

    /**
     * 设置信任度
     */
    static setTrustLevel(level) {
        const oldLevel = this.gameState.trustLevel;
        this.gameState.trustLevel = Math.max(0, Math.min(100, level));
        
        if (oldLevel !== this.gameState.trustLevel) {
            this.triggerEvent('trustChange', { 
                oldLevel, 
                newLevel: this.gameState.trustLevel 
            });
            console.log(`[GameManager] 信任度变化: ${oldLevel} → ${this.gameState.trustLevel}`);
        }
    }

    /**
     * 获取信任度
     */
    static getTrustLevel() {
        return this.gameState.trustLevel;
    }

    /**
     * 设置当前天数
     */
    static setCurrentDay(day) {
        const oldDay = this.gameState.currentDay;
        this.gameState.currentDay = day;
        
        if (oldDay !== this.gameState.currentDay) {
            this.triggerEvent('dayChange', { oldDay, newDay: this.gameState.currentDay });
            console.log(`[GameManager] 天数变化: ${oldDay} → ${this.gameState.currentDay}`);
        }
    }

    /**
     * 获取当前天数
     */
    static getCurrentDay() {
        return this.gameState.currentDay;
    }

    /**
     * 触发事件
     */
    static triggerEvent(eventName, data = {}) {
        this.gameState.triggeredEvents.push({
            name: eventName,
            data,
            timestamp: Date.now()
        });

        // 调用事件监听器
        if (this.eventListeners[eventName]) {
            this.eventListeners[eventName].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`[GameManager] 事件监听器错误 (${eventName}):`, error);
                }
            });
        }

        console.log(`[GameManager] 触发事件: ${eventName}`, data);
    }

    /**
     * 添加事件监听器
     */
    static addEventListener(eventName, callback) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(callback);
    }

    /**
     * 移除事件监听器
     */
    static removeEventListener(eventName, callback) {
        if (this.eventListeners[eventName]) {
            const index = this.eventListeners[eventName].indexOf(callback);
            if (index > -1) {
                this.eventListeners[eventName].splice(index, 1);
            }
        }
    }

    /**
     * 保存游戏数据
     */
    static saveGameData() {
        try {
            const saveData = {
                gameState: this.gameState,
                settings: this.settings,
                timestamp: Date.now()
            };
            
            localStorage.setItem('EchoChamber_SaveData', JSON.stringify(saveData));
            console.log('[GameManager] 💾 游戏数据已保存');
            return true;
        } catch (error) {
            console.error('[GameManager] ❌ 保存失败:', error);
            return false;
        }
    }

    /**
     * 加载游戏数据
     */
    static async loadGameData() {
        try {
            const saveData = localStorage.getItem('EchoChamber_SaveData');
            if (saveData) {
                const data = JSON.parse(saveData);
                this.gameState = { ...this.gameState, ...data.gameState };
                this.settings = { ...this.settings, ...data.settings };
                console.log('[GameManager] 📁 游戏数据已加载');
            } else {
                console.log('[GameManager] 📁 没有找到保存数据，使用默认设置');
            }
            return true;
        } catch (error) {
            console.error('[GameManager] ❌ 加载失败:', error);
            return false;
        }
    }

    /**
     * 重置游戏
     */
    static resetGame() {
        this.gameState = {
            currentDay: 1,
            trustLevel: 50,
            triggeredEvents: [],
            customVariables: {},
            gameFlags: {},
            currentCycle: 1,
            isGameStarted: false,
            isGamePaused: false
        };
        
        localStorage.removeItem('EchoChamber_SaveData');
        console.log('[GameManager] 🔄 游戏已重置');
    }

    /**
     * 获取游戏状态
     */
    static getGameState() {
        return { ...this.gameState };
    }

    /**
     * 获取设置
     */
    static getSettings() {
        return { ...this.settings };
    }

    /**
     * 更新设置
     */
    static updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        this.saveGameData();
        console.log('[GameManager] ⚙️ 设置已更新');
    }
}

// 将GameManager添加到全局作用域
window.GameManager = GameManager;
