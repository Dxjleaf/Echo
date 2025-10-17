/**
 * 深空回响 - 对话系统
 * 负责对话显示、打字机效果、选择处理
 */

class DialogueSystem {
    static instance = null;
    static isTyping = false;
    static isWaitingForChoice = false;
    static currentDialogue = null;
    static onDialogueComplete = null;
    static onChoiceMade = null;
    static typingInterval = null;
    static isProcessingInput = false; // 防止重复处理输入
    static isWaitingAfterTyping = false; // 打字完成后的等待状态
    static currentText = ''; // 当前显示的文本
    static fullText = ''; // 完整文本
    static typingSpeed = 80; // 打字速度（毫秒）- 更慢的打字效果
    static batchSize = 1; // 批量处理字符数量 - 逐字显示
    static lastSoundTime = 0; // 上次播放音效的时间
    static soundThrottle = 80; // 音效节流时间（毫秒）
    static typewriterSoundInterval = null; // 持续打字机音效定时器

    // UI元素引用
    static elements = {
        dialogueContainer: null,
        dialogueText: null,
        speakerName: null,
        playerResponse: null,
        choicesContainer: null,
        choicesPanel: null
    };

    // 说话者颜色预设
    static speakerColors = {
        '旁白': '#aaaaaa',
        'Narrator': '#aaaaaa',
        '主角': '#4fc3f7',
        '铿': '#4fc3f7',
        'Keng': '#4fc3f7',
        '绵回': '#8b5cf6',
        'Mianhui': '#8b5cf6',
        '瑟': '#f48fb1',
        'Se': '#f48fb1',
        '系统': '#ffa726',
        '利维': '#66b3ff',
        '小雅': '#ffd700',
        '卡俄斯': '#ff4444'
    };

    static lastAdjustTime = 0; // 上次调整位置的时间
    static adjustThrottle = 200; // 调整节流时间（毫秒）
    static isAnimating = false; // 是否正在动画中
    static animationDuration = 500; // 动画持续时间（毫秒）

    /**
     * 动态调整对话位置，避免被五感描述框遮挡
     */
    static adjustDialoguePosition() {
        // 节流控制，避免过于频繁的调整
        const now = Date.now();
        if (now - this.lastAdjustTime < this.adjustThrottle) {
            return;
        }
        this.lastAdjustTime = now;
        
        if (!this.elements.dialogueContainer) return;
        
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        if (!isMobile) return; // 只在手机端调整
        
        // 检查是否有展开的五感描述框
        const expandedSenses = document.querySelectorAll('.dynamic-sense.expanded, .dynamic-sense.locked, .dynamic-sense:hover');
        
        let targetBottom;
        if (expandedSenses.length === 0) {
            // 没有展开的描述框，使用默认位置
            targetBottom = isSmallMobile ? 35 : 40;
        } else {
            // 计算最下方的展开描述框位置
            let maxBottomPosition = 0;
            expandedSenses.forEach(sense => {
                const rect = sense.getBoundingClientRect();
                const bottomPosition = window.innerHeight - rect.top;
                maxBottomPosition = Math.max(maxBottomPosition, bottomPosition);
            });
            
            // 动态调整对话位置，确保不被遮挡
            const safeDistance = isSmallMobile ? 30 : 40; // 安全距离（增加10像素）
            const adjustedBottom = Math.max(maxBottomPosition + safeDistance, isSmallMobile ? 35 : 40);
            targetBottom = adjustedBottom;
        }
        
        // 平滑动画到目标位置
        this.animateToPosition(targetBottom);
        
        Logger.info(`[DialogueSystem] 动态调整对话位置: ${targetBottom}px`);
    }

    /**
     * 平滑动画到目标位置
     * @param {number} targetBottom - 目标底部位置（像素或百分比）
     */
    static animateToPosition(targetBottom) {
        if (!this.elements.dialogueContainer || this.isAnimating) return;
        
        this.isAnimating = true;
        
        // 获取当前位置
        const currentStyle = window.getComputedStyle(this.elements.dialogueContainer);
        const currentBottom = currentStyle.bottom;
        
        // 解析当前位置值
        let currentValue;
        if (currentBottom.includes('%')) {
            currentValue = parseFloat(currentBottom);
        } else {
            currentValue = parseFloat(currentBottom) || 0;
        }
        
        // 解析目标位置值
        let targetValue;
        if (typeof targetBottom === 'string' && targetBottom.includes('%')) {
            targetValue = parseFloat(targetBottom);
        } else {
            targetValue = typeof targetBottom === 'number' ? targetBottom : parseFloat(targetBottom);
        }
        
        // 如果位置相同，不需要动画
        if (Math.abs(currentValue - targetValue) < 1) {
            this.isAnimating = false;
            return;
        }
        
        // 添加CSS过渡效果
        this.elements.dialogueContainer.style.transition = `bottom ${this.animationDuration}ms ease-in-out`;
        
        // 设置目标位置
        if (typeof targetBottom === 'number') {
            this.elements.dialogueContainer.style.bottom = `${targetBottom}px`;
        } else {
            this.elements.dialogueContainer.style.bottom = targetBottom;
        }
        
        // 动画完成后清理
        setTimeout(() => {
            this.isAnimating = false;
            // 移除过渡效果，避免影响其他操作
            this.elements.dialogueContainer.style.transition = '';
        }, this.animationDuration);
    }

    /**
     * 初始化对话系统
     */
    static async initialize() {
        console.log('[DialogueSystem] 正在初始化对话系统...');
        
        try {
            // 查找UI元素
            this.findUIElements();
            
            // 设置事件监听
            this.setupEventListeners();
            
            // 初始化单例
            this.instance = this;
            
            // 确保对话容器初始状态正确
            if (this.elements.dialogueContainer) {
                this.elements.dialogueContainer.classList.add('hidden');
            }
            
            console.log('[DialogueSystem] ✅ 对话系统初始化完成');
            return true;
        } catch (error) {
            console.error('[DialogueSystem] ❌ 初始化失败:', error);
            throw error;
        }
    }

    /**
     * 播放音效
     * @param {string} soundId - 音效ID
     * @param {number} volume - 音量 (0-1)
     */
    static playSound(soundId, volume = 0.3) {
        try {
            const audio = document.getElementById(soundId);
            if (audio) {
                // 增加音量，特别是打字机音效
                let adjustedVolume = volume;
                if (soundId === 'typewriter-sound') {
                    adjustedVolume = Math.min(volume, 0.4); // 增加打字机音效音量
                }
                
                audio.volume = adjustedVolume;
                audio.currentTime = 0;
                audio.play().catch(e => console.log('音效播放失败:', e));
            }
        } catch (error) {
            console.log('[DialogueSystem] 音效播放失败:', error);
        }
    }

    /**
     * 播放打字机音效（带节流）
     */
    static playTypewriterSound() {
        // 音效已禁用
        return;
    }

    /**
     * 持续播放打字机音效（用于整个打字过程）
     */
    static startContinuousTypewriterSound() {
        // 音效已禁用
        return;
    }

    /**
     * 停止持续打字机音效
     */
    static stopContinuousTypewriterSound() {
        // 音效已禁用
        return;
    }

    /**
     * 显示点击特效
     * @param {Event} event - 点击事件
     */
    static showClickEffect(event) {
        try {
            // 创建点击特效元素
            const effect = document.createElement('div');
            effect.className = 'click-effect';
            effect.style.cssText = `
                position: fixed;
                left: ${event.clientX}px;
                top: ${event.clientY}px;
                width: 20px;
                height: 20px;
                border: 2px solid var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -50%);
                animation: clickRipple 0.6s ease-out forwards;
            `;
            
            // 添加到页面
            document.body.appendChild(effect);
            
            // 动画结束后移除
            setTimeout(() => {
                if (effect.parentNode) {
                    effect.parentNode.removeChild(effect);
                }
            }, 600);
            
        } catch (error) {
            console.log('[DialogueSystem] 点击特效显示失败:', error);
        }
    }

    /**
     * 查找UI元素
     */
    static findUIElements() {
        this.elements.dialogueContainer = document.getElementById('dialogue-container');
        this.elements.dialogueText = document.getElementById('dialogue-text');
        this.elements.speakerName = document.getElementById('speaker-name');
        this.elements.playerResponse = document.getElementById('player-response');
        this.elements.choicesContainer = document.getElementById('choices-container');
        this.elements.choicesPanel = document.getElementById('choices-panel');

        console.log('[DialogueSystem] UI元素查找完成:', {
            dialogueContainer: !!this.elements.dialogueContainer,
            dialogueText: !!this.elements.dialogueText,
            speakerName: !!this.elements.speakerName,
            playerResponse: !!this.elements.playerResponse,
            choicesContainer: !!this.elements.choicesContainer,
            choicesPanel: !!this.elements.choicesPanel
        });
    }

    /**
     * 设置事件监听器
     */
    static setupEventListeners() {
        // 设置面板事件
        const saveSettingsBtn = document.getElementById('save-settings');
        const closeSettingsBtn = document.getElementById('close-settings');
        
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }
        
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        }

        // 设置滑块事件
        const textSpeedSlider = document.getElementById('text-speed');
        const volumeSlider = document.getElementById('volume');

        if (textSpeedSlider) {
            textSpeedSlider.addEventListener('input', (e) => {
                this.updateTextSpeed(e.target.value);
            });
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.updateVolume(e.target.value);
            });
        }

        // 左键点击推进对话
        document.addEventListener('click', (e) => {
            this.handleDialogueClick(e);
        });

        // 键盘事件
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    /**
     * 处理对话点击事件
     * @param {MouseEvent} e - 鼠标事件
     */
    static handleDialogueClick(e) {
        // 如果正在处理输入，忽略
        if (this.isProcessingInput) return;
        
        // 如果点击的是选择按钮，不处理
        if (e.target.classList.contains('choice-button')) return;
        
        // 如果点击的是设置面板，不处理
        if (e.target.closest('.settings-panel')) return;
        
        // 如果点击的是路线图，不处理
        if (e.target.closest('#roadmap-panel')) return;
        
        // 如果对话容器不可见，不处理
        if (!this.elements.dialogueContainer || this.elements.dialogueContainer.classList.contains('hidden')) {
            return;
        }

        // 如果正在等待选择，不处理
        if (this.isWaitingForChoice) return;

        // 如果正在打字，完全忽略点击（不允许跳过）
        if (this.isTyping) {
            console.log('[DialogueSystem] 正在打字中，忽略点击');
            return;
        }

        // 如果正在等待打字完成后的延迟，忽略点击
        if (this.isWaitingAfterTyping) {
            console.log('[DialogueSystem] 等待打字完成后的延迟中，忽略点击');
            return;
        }
        
        // 只有在所有条件都满足时才能推进对话
        if (!this.isTyping && !this.isWaitingForChoice && !this.isProcessingInput && !this.isWaitingAfterTyping) {
            this.isProcessingInput = true;
            
            // 添加点击特效
            this.showClickEffect(e);
            
            // 推进对话
            this.advanceDialogue();
            
            // 延迟重置处理状态，防止快速连续点击
            setTimeout(() => {
                this.isProcessingInput = false;
            }, 800); // 增加延迟时间到0.8秒
        }
    }

    /**
     * 处理键盘事件
     * @param {KeyboardEvent} e - 键盘事件
     */
    static handleKeyPress(e) {
        // 如果正在处理输入，忽略
        if (this.isProcessingInput) return;
        
        // 只处理空格键和回车键
        if (e.code !== 'Space' && e.code !== 'Enter') return;
        
        // 如果对话容器不可见，不处理
        if (!this.elements.dialogueContainer || this.elements.dialogueContainer.classList.contains('hidden')) {
            return;
        }

        // 如果正在等待选择，不处理
        if (this.isWaitingForChoice) return;

        e.preventDefault();
        
        // 如果正在打字，完全忽略按键（不允许跳过）
        if (this.isTyping) {
            console.log('[DialogueSystem] 正在打字中，忽略按键');
            return;
        }
        
        // 如果正在等待打字完成后的延迟，忽略按键
        if (this.isWaitingAfterTyping) {
            console.log('[DialogueSystem] 等待打字完成后的延迟中，忽略按键');
            return;
        }
        
        // 只有在所有条件都满足时才能推进对话
        if (!this.isTyping && !this.isWaitingForChoice && !this.isProcessingInput && !this.isWaitingAfterTyping) {
            this.isProcessingInput = true;
            
            // 创建模拟点击事件用于特效
            const mockEvent = {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2
            };
            this.showClickEffect(mockEvent);
            
            // 推进对话
            this.advanceDialogue();
            
            // 延迟重置处理状态，防止快速连续按键
            setTimeout(() => {
                this.isProcessingInput = false;
            }, 800); // 增加延迟时间到0.8秒
        }
    }

    /**
     * 完成当前打字
     */
    static completeTyping() {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        
        // 停止持续打字机音效
        this.stopContinuousTypewriterSound();
        
        this.isTyping = false;
        
        // 立即显示完整文本
        if (this.elements.dialogueText) {
            this.elements.dialogueText.textContent = this.fullText;
            
            // 处理术语高亮
            if (window.TermSystem) {
                TermSystem.enhanceDialogueText(this.elements.dialogueText);
            }
        }
        
        // 设置等待状态，防止用户立即点击推进
        this.isWaitingAfterTyping = true;
        this.isProcessingInput = true;
        
        // 注意：五感更新已移至StoryManager.handleSenseUpdates()中处理
        // 避免重复更新导致闪烁
        console.log('[DialogueSystem] 五感更新由StoryManager统一处理');
        
        setTimeout(() => {
            this.isWaitingAfterTyping = false;
            this.isProcessingInput = false;
            console.log('[DialogueSystem] 等待完成，现在可以推进对话');
        }, 1000); // 1秒延迟
        
        console.log('[DialogueSystem] 打字完成，等待1秒后才能推进');
    }

    /**
     * 检查并更新五感
     */
    static checkAndUpdateSenses() {
        console.log('[DialogueSystem] 开始检查五感更新...');
        // 获取当前正在显示的对话对象
        const currentDialogueObj = this.getCurrentDialogueObject();
        
        console.log('[DialogueSystem] 检查五感更新，当前对话对象:', currentDialogueObj);
        console.log('[DialogueSystem] StoryManager存在:', typeof StoryManager !== 'undefined');
        console.log('[DialogueSystem] StoryManager.storyData存在:', StoryManager && StoryManager.storyData);
        
        if (currentDialogueObj && currentDialogueObj.updateSenses) {
            console.log('[DialogueSystem] 检测到五感更新:', currentDialogueObj.updateSenses);
            
            // 逐个更新指定的感官
            for (const [senseType, senseValue] of Object.entries(currentDialogueObj.updateSenses)) {
                if (typeof StoryManager !== 'undefined') {
                    StoryManager.updateSingleSense(senseType, senseValue);
                }
            }
        }
    }

    /**
     * 获取当前对话对象
     */
    static getCurrentDialogueObject() {
        // 从StoryManager获取当前对话对象
        if (typeof StoryManager !== 'undefined' && StoryManager.storyData && StoryManager.storyData.currentDialogue) {
            return StoryManager.storyData.currentDialogue;
        }
        return null;
    }

    /**
     * 显示五感更新提示
     */
    static showSenseUpdateHint() {
        const hint = document.createElement('div');
        hint.className = 'sense-update-hint';
        hint.textContent = '五感更新';
        hint.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(102, 179, 255, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            z-index: 100;
            animation: senseHintFade 2s ease-out forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(hint);
        
        // 2秒后移除提示
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 2000);
    }

    /**
     * 推进对话
     */
    static advanceDialogue() {
        if (!this.currentDialogue || !this.currentDialogue.length) {
            console.log('[DialogueSystem] 没有更多对话');
            this.hideDialogue();
            if (this.onDialogueComplete) {
                this.onDialogueComplete();
            }
            return;
        }

        // 获取下一句对话
        const nextDialogue = this.currentDialogue.shift();
        
        if (nextDialogue.type === 'choice') {
            // 显示选择
            this.showChoices(nextDialogue.choices);
        } else {
            // 显示对话
            this.showDialogue(nextDialogue);
        }
    }

    /**
     * 显示对话
     * @param {Object} dialogue - 对话对象
     * @returns {Promise} 对话显示完成的Promise
     */
    static showDialogue(dialogue) {
        return new Promise((resolve) => {
            console.log('[DialogueSystem] 显示对话:', dialogue);
            
            // 验证对话对象
            if (!dialogue || typeof dialogue !== 'object') {
                console.error('[DialogueSystem] 无效的对话对象:', dialogue);
                resolve();
            return;
        }

            if (!dialogue.text || typeof dialogue.text !== 'string') {
                console.error('[DialogueSystem] 无效的对话文本:', dialogue.text);
                resolve();
            return;
        }

            // 设置完成回调
            this.onDialogueComplete = resolve;
            
            if (!this.elements.dialogueContainer) {
                console.error('[DialogueSystem] dialogueContainer元素未找到');
                resolve();
                return;
        }

        // 显示对话容器
            this.elements.dialogueContainer.classList.remove('hidden');
        console.log('[DialogueSystem] 对话容器已显示');
        
        // 设置说话者名称
        if (this.elements.speakerName) {
            this.elements.speakerName.textContent = dialogue.speaker || '旁白';
            this.elements.speakerName.style.color = this.speakerColors[dialogue.speaker] || this.speakerColors['旁白'];
            
            // 为旁白标签添加特殊样式
            if (dialogue.speaker === '旁白' || dialogue.speaker === 'Narrator' || !dialogue.speaker) {
                this.elements.speakerName.classList.add('narration-label');
            } else {
                this.elements.speakerName.classList.remove('narration-label');
            }
            
            console.log('[DialogueSystem] 说话者名称已设置:', dialogue.speaker || '旁白');
        }

        // 检查是否为旁白并应用样式（主角对话不算旁白）
        const isNarration = dialogue.speaker === '旁白' || dialogue.speaker === 'Narrator' || !dialogue.speaker;
        if (this.elements.dialogueText) {
            if (isNarration) {
                this.elements.dialogueText.classList.add('narration');
                console.log('[DialogueSystem] 应用旁白样式');
            } else {
                this.elements.dialogueText.classList.remove('narration');
                console.log('[DialogueSystem] 应用对话样式');
            }
        }

        // 隐藏选择面板
        if (this.elements.choicesPanel) {
            this.elements.choicesPanel.classList.add('hidden');
        }

        // 开始打字机效果
            console.log('[DialogueSystem] 开始打字机效果:', dialogue.text);
            this.startTyping(dialogue.text);
        });
    }

    /**
     * 开始打字机效果
     * @param {string} text - 要显示的文本
     */
    static startTyping(text) {
        // 检查文本参数
        if (!text || typeof text !== 'string') {
            console.error('[DialogueSystem] 无效的文本参数:', text);
            this.isTyping = false;
            return;
        }

        this.fullText = text;
        this.currentText = '';
        this.isTyping = true;
        
        // 启动持续打字机音效
        this.startContinuousTypewriterSound();
        
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
        }

        // 检查UI元素是否存在
        if (!this.elements.dialogueText) {
            console.error('[DialogueSystem] dialogueText元素未找到');
        this.isTyping = false;
            return;
        }

        let index = 0;
        this.typingInterval = setInterval(() => {
            try {
                if (index < text.length && this.isTyping) {
                    // 批量处理字符，减少DOM操作
                    const batchEnd = Math.min(index + this.batchSize, text.length);
                    this.currentText += text.substring(index, batchEnd);
                    
                    if (this.elements.dialogueText) {
                        this.elements.dialogueText.textContent = this.currentText;
                    }
                    
                    // 播放打字机音效
                    this.playTypewriterSound();
                    
                    // 在打字过程中动态调整对话位置
                    if (this.adjustDialoguePosition) {
                        this.adjustDialoguePosition();
                    }
                    
                    index = batchEnd;
                } else {
                    // 打字完成
        console.log('[DialogueSystem] 打字机效果完成');
                    this.completeTyping();
                }
            } catch (error) {
                console.error('[DialogueSystem] 打字机效果错误:', error);
                clearInterval(this.typingInterval);
                this.typingInterval = null;
                this.isTyping = false;
            }
        }, this.typingSpeed);
    }

    /**
     * 显示选择
     * @param {Array} choices - 选择数组
     */
    static showChoices(choices) {
        if (!this.elements.choicesPanel) return;

        // 隐藏对话文本
        if (this.elements.dialogueText) {
            this.elements.dialogueText.textContent = '';
        }

        // 显示选择面板
        this.elements.choicesPanel.classList.remove('hidden');
        this.isWaitingForChoice = true;

        // 清空选择容器
        if (this.elements.choicesContainer) {
            this.elements.choicesContainer.innerHTML = '';
        }

        // 创建选择按钮
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                this.handleChoiceSelection(choice, index);
            });
            
        if (this.elements.choicesContainer) {
                this.elements.choicesContainer.appendChild(button);
            }
        });

        console.log('[DialogueSystem] 显示选择:', choices.length);
    }

    /**
     * 处理选择
     * @param {Object} choice - 选择对象
     * @param {number} index - 选择索引
     */
    static handleChoiceSelection(choice, index) {
        console.log('[DialogueSystem] 选择:', choice.text);
        
        // 隐藏选择面板
        if (this.elements.choicesPanel) {
            this.elements.choicesPanel.classList.add('hidden');
        }
        
        this.isWaitingForChoice = false;
        
        // 在底部显示选择结果（打字机效果）
        this.showPlayerResponse(choice.text);

        // 触发选择回调
        if (this.onChoiceMade) {
            this.onChoiceMade(choice, index);
        }

        // 继续对话
        setTimeout(() => {
            this.advanceDialogue();
        }, 1000); // 给用户时间阅读选择结果
    }

    /**
     * 显示玩家回复（底部字幕）
     * @param {string} text - 回复文本
     */
    static showPlayerResponse(text) {
        if (!this.elements.playerResponse) return;

        // 显示玩家回复
        this.elements.playerResponse.style.display = 'block';
        this.elements.playerResponse.textContent = '';
        
        // 开始打字机效果
        this.startPlayerResponseTyping(text);
    }

    /**
     * 开始玩家回复的打字机效果
     * @param {string} text - 回复文本
     */
    static startPlayerResponseTyping(text) {
        let index = 0;
        const responseInterval = setInterval(() => {
            if (index < text.length) {
                this.elements.playerResponse.textContent += text[index];
                index++;
                
                // 在玩家回复打字过程中动态调整对话位置
                if (this.adjustDialoguePosition) {
                    this.adjustDialoguePosition();
                }
            } else {
                clearInterval(responseInterval);
                // 3秒后隐藏回复
                setTimeout(() => {
                    this.elements.playerResponse.style.display = 'none';
                }, 3000);
            }
        }, this.typingSpeed);
    }

    /**
     * 开始对话
     * @param {Array} dialogue - 对话数组
     * @param {Function} onComplete - 完成回调
     * @param {Function} onChoice - 选择回调
     */
    static startDialogue(dialogue, onComplete = null, onChoice = null) {
        console.log('[DialogueSystem] 开始对话:', dialogue.length, '句');
        
        this.currentDialogue = [...dialogue]; // 复制数组
        this.onDialogueComplete = onComplete;
        this.onChoiceMade = onChoice;
        
        // 重置状态
        this.isTyping = false;
        this.isWaitingForChoice = false;
        this.isProcessingInput = false;
        
        // 开始第一句对话
        this.advanceDialogue();
    }

    /**
     * 隐藏对话
     */
    static hideDialogue() {
        if (this.elements.dialogueContainer) {
            this.elements.dialogueContainer.classList.add('hidden');
        }
        
        if (this.elements.choicesPanel) {
            this.elements.choicesPanel.classList.add('hidden');
        }
        
        if (this.elements.playerResponse) {
            this.elements.playerResponse.style.display = 'none';
        }
        
        // 清理状态
        this.isTyping = false;
        this.isWaitingForChoice = false;
        this.isProcessingInput = false;
        this.currentDialogue = null;
        
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
        
        console.log('[DialogueSystem] 对话已隐藏');
    }

    /**
     * 更新打字速度
     * @param {number} speed - 速度值
     */
    static updateTextSpeed(speed) {
        this.typingSpeed = Math.max(10, Math.min(200, 200 - speed * 2));
        console.log('[DialogueSystem] 打字速度更新:', this.typingSpeed);
    }

    /**
     * 更新音量
     * @param {number} volume - 音量值
     */
    static updateVolume(volume) {
        // 这里可以添加音量控制逻辑
        console.log('[DialogueSystem] 音量更新:', volume);
    }

    /**
     * 保存设置
     */
    static saveSettings() {
        // 这里可以添加设置保存逻辑
        console.log('[DialogueSystem] 设置已保存');
    }

    /**
     * 关闭设置
     */
    static closeSettings() {
        // 这里可以添加设置关闭逻辑
        console.log('[DialogueSystem] 设置已关闭');
    }

    /**
     * 获取当前状态
     * @returns {Object} 当前状态
     */
    static getStatus() {
        return {
            isTyping: this.isTyping,
            isWaitingForChoice: this.isWaitingForChoice,
            isProcessingInput: this.isProcessingInput,
            hasDialogue: !!this.currentDialogue && this.currentDialogue.length > 0
        };
    }
}

// 将DialogueSystem添加到全局作用域
window.DialogueSystem = DialogueSystem;