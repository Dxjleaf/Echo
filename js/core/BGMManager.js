/**
 * 背景音乐管理器
 * 管理游戏的背景音乐播放
 */
class BGMManager {
    static bgmAudio = null;
    static isPlaying = false;
    static volume = 0.3; // 默认音量30%
    static fadeInterval = null;
    static isInitialized = false;
    static onStateChange = null; // 状态变化回调

    /**
     * 初始化背景音乐系统
     */
    static initialize() {
        if (this.isInitialized) return;
        
        this.bgmAudio = document.getElementById('bgm-audio');
        if (!this.bgmAudio) {
            console.warn('[BGMManager] 未找到背景音乐元素');
            return;
        }

        // 设置初始音量
        this.bgmAudio.volume = this.volume;
        
        // 监听音频事件
        this.bgmAudio.addEventListener('ended', () => {
            this.handleAudioEnded();
        });

        this.bgmAudio.addEventListener('error', (e) => {
            console.error('[BGMManager] 音频加载错误:', e);
        });

        this.bgmAudio.addEventListener('canplaythrough', () => {
            console.log('[BGMManager] 背景音乐准备就绪');
        });

        this.isInitialized = true;
        console.log('[BGMManager] 背景音乐系统初始化完成');
    }

    /**
     * 开始播放背景音乐
     */
    static startBGM() {
        if (!this.isInitialized || !this.bgmAudio) {
            console.warn('[BGMManager] 系统未初始化或音频元素不存在');
            return;
        }

        if (this.isPlaying) {
            console.log('[BGMManager] 背景音乐已在播放');
            return;
        }

        try {
            // 设置音量
            this.bgmAudio.volume = this.volume;
            
            // 播放音乐
            const playPromise = this.bgmAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isPlaying = true;
                    console.log('[BGMManager] 背景音乐开始播放');
                    // 通知状态变化
                    if (this.onStateChange) {
                        this.onStateChange(true);
                    }
                }).catch(error => {
                    console.error('[BGMManager] 播放失败:', error);
                    // 如果自动播放被阻止，等待用户交互
                    this.waitForUserInteraction();
                });
            }
        } catch (error) {
            console.error('[BGMManager] 播放背景音乐时出错:', error);
        }
    }

    /**
     * 停止播放背景音乐
     */
    static stopBGM() {
        if (!this.bgmAudio || !this.isPlaying) return;

        this.bgmAudio.pause();
        this.bgmAudio.currentTime = 0;
        this.isPlaying = false;
        console.log('[BGMManager] 背景音乐已停止');
        // 通知状态变化
        if (this.onStateChange) {
            this.onStateChange(false);
        }
    }

    /**
     * 暂停背景音乐
     */
    static pauseBGM() {
        if (!this.bgmAudio || !this.isPlaying) return;

        this.bgmAudio.pause();
        this.isPlaying = false;
        console.log('[BGMManager] 背景音乐已暂停');
        // 通知状态变化
        if (this.onStateChange) {
            this.onStateChange(false);
        }
    }

    /**
     * 恢复播放背景音乐
     */
    static resumeBGM() {
        if (!this.bgmAudio || this.isPlaying) return;

        this.bgmAudio.play().then(() => {
            this.isPlaying = true;
            console.log('[BGMManager] 背景音乐已恢复');
            // 通知状态变化
            if (this.onStateChange) {
                this.onStateChange(true);
            }
        }).catch(error => {
            console.error('[BGMManager] 恢复播放失败:', error);
        });
    }

    /**
     * 设置音量
     * @param {number} volume - 音量 (0-1)
     */
    static setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.bgmAudio) {
            this.bgmAudio.volume = this.volume;
        }
        console.log(`[BGMManager] 音量设置为: ${(this.volume * 100).toFixed(0)}%`);
    }

    /**
     * 淡入效果
     * @param {number} duration - 淡入时长(毫秒)
     */
    static fadeIn(duration = 2000) {
        if (!this.bgmAudio) return;

        this.bgmAudio.volume = 0;
        this.startBGM();

        let startTime = Date.now();
        const startVolume = 0;
        const targetVolume = this.volume;

        this.fadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            this.bgmAudio.volume = startVolume + (targetVolume - startVolume) * progress;
            
            if (progress >= 1) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
            }
        }, 50);
    }

    /**
     * 淡出效果
     * @param {number} duration - 淡出时长(毫秒)
     */
    static fadeOut(duration = 2000) {
        if (!this.bgmAudio || !this.isPlaying) return;

        let startTime = Date.now();
        const startVolume = this.bgmAudio.volume;
        const targetVolume = 0;

        this.fadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            this.bgmAudio.volume = startVolume + (targetVolume - startVolume) * progress;
            
            if (progress >= 1) {
                this.pauseBGM();
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
            }
        }, 50);
    }

    /**
     * 处理音频播放结束
     */
    static handleAudioEnded() {
        console.log('[BGMManager] 音频播放结束，等待6秒后重新播放');
        
        // 等待6秒后重新播放
        setTimeout(() => {
            if (this.bgmAudio) {
                this.bgmAudio.currentTime = 0;
                this.startBGM();
            }
        }, 6000);
    }

    /**
     * 等待用户交互后播放
     */
    static waitForUserInteraction() {
        console.log('[BGMManager] 等待用户交互后播放背景音乐');
        
        const startBGMOnInteraction = () => {
            this.startBGM();
            // 移除事件监听器
            document.removeEventListener('click', startBGMOnInteraction);
            document.removeEventListener('keydown', startBGMOnInteraction);
            document.removeEventListener('touchstart', startBGMOnInteraction);
        };

        // 监听用户交互
        document.addEventListener('click', startBGMOnInteraction);
        document.addEventListener('keydown', startBGMOnInteraction);
        document.addEventListener('touchstart', startBGMOnInteraction);
    }

    /**
     * 获取当前播放状态
     */
    static getStatus() {
        return {
            isPlaying: this.isPlaying,
            volume: this.volume,
            currentTime: this.bgmAudio ? this.bgmAudio.currentTime : 0,
            duration: this.bgmAudio ? this.bgmAudio.duration : 0
        };
    }
}

// 将类添加到全局作用域
window.BGMManager = BGMManager;
