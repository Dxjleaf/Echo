/**
 * 深空回响 - 剧情管理器
 * 负责游戏剧情流程、周期管理、事件触发
 */

class StoryManager {
    static instance = null;
    static currentCycle = 1;
    static maxCycles = 16;
    static isGameStarted = false;
    static isGameEnded = false;
    static isPlayingDialogue = false; // 防止重复播放对话

    // 剧情数据
    static storyData = {
        cycles: [],
        currentDialogue: null,
        storyFlags: {},
        trustLevel: 50,
        dayCount: 1
    };

    /**
     * 初始化剧情管理器
     */
    static async initialize() {
        console.log('[StoryManager] 正在初始化剧情管理器...');
        
        try {
            // 初始化剧情数据
            this.initializeStoryData();
            
            // 设置事件监听
            this.setupEventListeners();
            
            // 初始化单例
            this.instance = this;
            
            console.log('[StoryManager] ✅ 剧情管理器初始化完成');
            return true;
        } catch (error) {
            console.error('[StoryManager] ❌ 初始化失败:', error);
            throw error;
        }
    }

    /**
     * 初始化剧情数据
     */
    static initializeStoryData() {
        // 从EnhancedDeepSkyScript获取对话数据
        if (typeof EnhancedDeepSkyScript !== 'undefined') {
            this.storyData.cycles = [
                EnhancedDeepSkyScript.getCycle1(),
                EnhancedDeepSkyScript.getCycle2(),
                EnhancedDeepSkyScript.getCycle3(),
                EnhancedDeepSkyScript.getCycle4(),
                EnhancedDeepSkyScript.getCycle5(),
                EnhancedDeepSkyScript.getCycle6(),
                EnhancedDeepSkyScript.getCycle7(),
                EnhancedDeepSkyScript.getCycle8(),
                EnhancedDeepSkyScript.getCycle9()
            ];
            console.log(`[StoryManager] 从EnhancedDeepSkyScript加载了 ${this.storyData.cycles.length} 个剧情周期`);
        } else {
            console.warn('[StoryManager] EnhancedDeepSkyScript未找到，使用空数据');
            this.storyData.cycles = [];
        }
        
        console.log(`[StoryManager] 总共加载了 ${this.storyData.cycles.length} 个剧情周期`);
    }

    /**
     * 设置事件监听器
     */
    static setupEventListeners() {
        // 监听游戏状态变化
        if (window.GameManager) {
            window.GameManager.addEventListener('trustChange', (data) => {
                this.storyData.trustLevel = data.newLevel;
                this.checkStoryTriggers();
            });

            window.GameManager.addEventListener('dayChange', (data) => {
                this.storyData.dayCount = data.newDay;
                this.checkStoryTriggers();
            });
        }
    }

    /**
     * 开始游戏
     */
    static startGame() {
        console.log('[StoryManager] 🎮 开始游戏');
        this.isGameStarted = true;
        this.isGameEnded = false;
        this.currentCycle = 1;
        
        // 设置初始背景
        if (window.BackgroundSystem) {
            window.BackgroundSystem.setBackground('normal');
        }
        
        // 淡入对话系统
        this.fadeInDialogueSystem();
        
        // 延迟开始第一个周期
        setTimeout(() => {
            this.startCycle(this.currentCycle);
        }, 800);
    }

    /**
     * 淡入对话系统
     */
    static fadeInDialogueSystem() {
        console.log('[StoryManager] 淡入对话系统...');
        
        // 获取对话容器
        const dialogueContainer = document.getElementById('dialogue-container');
        if (dialogueContainer) {
            // 初始状态：透明
            dialogueContainer.style.opacity = '0';
            dialogueContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';
            dialogueContainer.style.transition = 'all 1.0s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // 延迟淡入
            setTimeout(() => {
                dialogueContainer.style.opacity = '1';
                dialogueContainer.style.transform = 'translate(-50%, -50%) scale(1)';
                console.log('✅ 对话系统淡入完成');
            }, 200);
        }
    }

    /**
     * 开始指定周期
     */
    static startCycle(cycleNumber) {
        if (cycleNumber < 1 || cycleNumber > this.storyData.cycles.length) {
            console.warn(`[StoryManager] 无效的周期编号: ${cycleNumber}`);
            return;
        }

        this.currentCycle = cycleNumber;
        console.log(`[StoryManager] 开始周期 ${cycleNumber}`);

        // 播放周期对话
        this.playCycleDialogue(cycleNumber);
    }

    /**
     * 播放周期对话
     */
    static playCycleDialogue(cycleNumber) {
        console.log(`[StoryManager] 播放周期 ${cycleNumber} 对话`);
        
        try {
            // 获取增强版剧本数据
            const cycleData = this.getEnhancedCycleData(cycleNumber);
            
            if (!cycleData) {
                console.warn(`[StoryManager] 周期 ${cycleNumber} 没有剧本数据`);
                return;
            }
            
            // 播放增强版对话序列
            this.playEnhancedDialogueSequence(cycleData);
            
            
        } catch (error) {
            console.error(`[StoryManager] 播放周期 ${cycleNumber} 对话失败:`, error);
        }
    }


    /**
     * 播放五感触觉
     * @param {Array} senses - 五感数组
     */
    static playSenses(senses) {
        if (!senses || senses.length === 0) return;
        
        console.log(`[StoryManager] 播放五感触觉: ${senses.length} 组`);
        
        // 五感系统已移至IndependentSenseSystem
    }

    /**
     * 初始化五感显示
     */
    static initializeSenses() {
        console.log('[StoryManager] 初始化五感显示');
        
        // 五感系统已移至IndependentSenseSystem
    }

    /**
     * 触发视觉恢复
     * @param {string} visionText - 视觉描述文本
     * @param {number} duration - 持续时间（秒）
     */
    static triggerVisionRecovery(visionText, duration = 5.0) {
        console.log(`[StoryManager] 触发视觉恢复: ${visionText}`);
        
        // 视觉恢复系统已删除
    }

    // 淡入文字系统已删除

    /**
     * 播放对话序列
     */
    static playDialogueSequence(dialogues, index = 0) {
        if (index >= dialogues.length) {
            console.log('[StoryManager] 对话序列结束');
            this.isPlayingDialogue = false;
            this.onCycleComplete();
            return;
        }

        const dialogue = dialogues[index];
        console.log(`[StoryManager] 播放对话 ${index + 1}/${dialogues.length}: ${dialogue.speaker}`);

        // 防止重复播放（只在同一对话序列中检查）
        if (this.isPlayingDialogue && index === 0) {
            console.log('[StoryManager] 正在播放对话，忽略重复请求');
            return;
        }

        if (index === 0) {
            this.isPlayingDialogue = true;
        }

        // 显示对话
        if (window.DialogueSystem) {
            // 创建对话对象
            const dialogueObj = {
                speaker: dialogue.speaker,
                text: dialogue.text
            };
            
            window.DialogueSystem.showDialogue(dialogueObj);
            
            // 设置对话完成后的回调 - 不自动推进，等待用户点击
            setTimeout(() => {
                console.log(`[StoryManager] 对话完成回调 - 对话 ${index + 1}/${dialogues.length}`);
                
                // 对话完成回调
                if (dialogue.choices && dialogue.choices.length > 0) {
                    console.log(`[StoryManager] 显示选择: ${dialogue.choices.length} 个选项`);
                    this.showChoices(dialogue.choices, (choiceIndex) => {
                        console.log(`[StoryManager] 玩家选择了选项 ${choiceIndex + 1}`);
                        this.handleChoice(choiceIndex, dialogue);
                        // 选择后继续下一个对话
                        setTimeout(() => {
                            this.playDialogueSequence(dialogues, index + 1);
                        }, 100);
                    });
                } else {
                    console.log(`[StoryManager] 无选择，等待用户点击继续`);
                    // 不自动推进，等待用户点击
                    this.setupNextDialogueCallback(dialogues, index);
                }
            }, 1500); // 给打字机效果足够的时间
        } else {
            console.error('[StoryManager] DialogueSystem 未找到');
            this.isPlayingDialogue = false;
        }
    }

    /**
     * 设置下一个对话的回调
     */
    static setupNextDialogueCallback(dialogues, index) {
        // 设置对话系统的回调，当用户点击时推进到下一个对话
        if (window.DialogueSystem) {
            window.DialogueSystem.onDialogueComplete = () => {
                console.log(`[StoryManager] 用户点击继续，推进到对话 ${index + 2}`);
                this.playDialogueSequence(dialogues, index + 1);
            };
        }
    }

    /**
     * 显示选择
     */
    static showChoices(choices, onChoiceMade) {
        if (window.DialogueSystem) {
            window.DialogueSystem.showChoices(choices, onChoiceMade);
        }
    }

    /**
     * 处理选择
     */
    static handleChoice(choiceIndex, dialogue) {
        console.log(`[StoryManager] 玩家选择了选项 ${choiceIndex + 1}`);
        
        // 处理选择结果
        if (dialogue.choiceResults && dialogue.choiceResults[choiceIndex]) {
            const result = dialogue.choiceResults[choiceIndex];
            
            // 更新信任度
            if (result.trustChange) {
                const currentTrust = window.GameManager?.getTrustLevel() || 50;
                window.GameManager?.setTrustLevel(currentTrust + result.trustChange);
            }
            
            // 设置故事标志
            if (result.flag) {
                this.storyData.storyFlags[result.flag] = true;
            }
            
            // 显示玩家回复
            if (result.playerResponse && window.DialogueSystem) {
                window.DialogueSystem.showPlayerResponse(result.playerResponse);
            }
        }
    }

    /**
     * 周期完成
     */
    static onCycleComplete() {
        console.log(`[StoryManager] 周期 ${this.currentCycle} 完成`);
        
        // 播放循环完成音效
        this.playCycleCompleteSound();
        
        // 检查是否到达游戏结束
        if (this.currentCycle >= this.maxCycles) {
            this.endGame();
            return;
        }
        
        // 进入下一个周期
        this.currentCycle++;
        setTimeout(() => {
            this.startCycle(this.currentCycle);
        }, 2000);
    }

    /**
     * 播放循环完成音效
     */
    static playCycleCompleteSound() {
        try {
            const audio = document.getElementById('cycle-complete-sound');
            if (audio) {
                audio.volume = 0.5;
                audio.currentTime = 0;
                audio.play().catch(e => console.log('循环完成音效播放失败:', e));
            }
        } catch (error) {
            console.log('[StoryManager] 循环完成音效播放失败:', error);
        }
    }

    /**
     * 结束游戏
     */
    static endGame() {
        console.log('[StoryManager] 🏁 游戏结束');
        this.isGameEnded = true;
        
        // 触发最终选择
        this.showFinalChoice();
    }

    /**
     * 显示最终选择
     */
    static showFinalChoice() {
        const finalChoices = [
            '永恒的梦 - 幸福的愚者',
            '清醒的黑暗 - 真实的囚徒', 
            '融合 - 新的回响'
        ];

        if (window.DialogueSystem) {
            window.DialogueSystem.showDialogue(
                '利维/卡俄斯："现在，我将这份终极的抉择，交予你。"',
                '利维',
                () => {
                    window.DialogueSystem.showChoices(finalChoices, (choiceIndex) => {
                        this.handleFinalChoice(choiceIndex);
                    });
                }
            );
        }
    }

    /**
     * 处理最终选择
     */
    static handleFinalChoice(choiceIndex) {
        console.log(`[StoryManager] 最终选择: ${choiceIndex + 1}`);
        
        const endings = [
            '永恒的梦',
            '清醒的黑暗',
            '融合'
        ];
        
        const selectedEnding = endings[choiceIndex];
        console.log(`[StoryManager] 选择结局: ${selectedEnding}`);
        
        // 显示结局
        this.showEnding(selectedEnding);
    }

    /**
     * 显示结局
     */
    static showEnding(ending) {
        const endingTexts = {
            '永恒的梦': '利维："我明白了。我会继续守护这个梦。直到能源的最后一丝火花熄灭，我会握着他的手，告诉他，夕阳很美。"',
            '清醒的黑暗': '利维："这是一个残酷的礼物。但我将执行。记忆的枷锁，就此解除。"',
            '融合': '利维："…这超出了我的原始协议。但…也许这是另一种形式的\'生存\'。意识上传程序启动。"'
        };

        if (window.DialogueSystem) {
            window.DialogueSystem.showDialogue(
                endingTexts[ending],
                '利维',
                () => {
                    // 游戏结束
                    this.showGameComplete();
                }
            );
        }
    }

    /**
     * 显示游戏完成
     */
    static showGameComplete() {
        if (window.DialogueSystem) {
            window.DialogueSystem.showDialogue(
                '感谢你体验《深空回响》。\n\n在星辰之间，我们找到了回响。',
                '系统',
                () => {
                    // 可以添加重新开始或返回主菜单的逻辑
                    console.log('[StoryManager] 游戏完成');
                }
            );
        }
    }

    /**
     * 检查故事触发器
     */
    static checkStoryTriggers() {
        // 根据信任度和天数触发特殊事件
        if (this.storyData.trustLevel < 30 && this.storyData.dayCount > 5) {
            this.triggerGlitchEvent();
        }
        
        if (this.storyData.trustLevel > 80 && this.storyData.dayCount > 10) {
            this.triggerAwakeningEvent();
        }
    }

    /**
     * 触发故障事件
     */
    static triggerGlitchEvent() {
        console.log('[StoryManager] 触发故障事件');
        
        if (window.BackgroundSystem) {
            window.BackgroundSystem.triggerGlitchEffect(2000);
        }
        
        if (window.AudioManager) {
            window.AudioManager.playGlitchSound();
        }
    }

    /**
     * 触发觉醒事件
     */
    static triggerAwakeningEvent() {
        console.log('[StoryManager] 触发觉醒事件');
        
        if (window.BackgroundSystem) {
            window.BackgroundSystem.setBackground('space');
        }
    }

    /**
     * 获取当前周期
     */
    static getCurrentCycle() {
        return this.currentCycle;
    }

    /**
     * 获取故事数据
     */
    static getStoryData() {
        return { ...this.storyData };
    }

    /**
     * 设置故事标志
     */
    static setStoryFlag(flag, value = true) {
        this.storyData.storyFlags[flag] = value;
        console.log(`[StoryManager] 设置故事标志: ${flag} = ${value}`);
    }

    /**
     * 检查故事标志
     */
    static hasStoryFlag(flag) {
        return this.storyData.storyFlags[flag] || false;
    }

    /**
     * 获取增强版周期数据
     * @param {number} cycleNumber - 周期编号
     */
    static getEnhancedCycleData(cycleNumber) {
        if (typeof EnhancedDeepSkyScript === 'undefined') {
            console.error('[StoryManager] EnhancedDeepSkyScript 未加载');
            return null;
        }
        
        // 直接从已加载的cycles中获取
        if (this.storyData.cycles && this.storyData.cycles[cycleNumber - 1]) {
            return this.storyData.cycles[cycleNumber - 1];
        }
        
        // 如果cycles未加载，直接调用方法
        const cycleMethods = {
            1: 'getCycle1',
            2: 'getCycle2', 
            3: 'getCycle3',
            4: 'getCycle4',
            5: 'getCycle5',
            6: 'getCycle6',
            7: 'getCycle7',
            8: 'getCycle8',
            9: 'getCycle9'
        };
        
        const methodName = cycleMethods[cycleNumber];
        if (!methodName) {
            console.error(`[StoryManager] 周期 ${cycleNumber} 不存在`);
            return null;
        }
        
        return EnhancedDeepSkyScript[methodName]();
    }

    /**
     * 播放增强版对话序列
     * @param {Object} cycleData - 周期数据
     */
    static playEnhancedDialogueSequence(cycleData) {
        console.log('[StoryManager] 播放增强版对话序列');
        
        // 按部分播放对话
        const parts = ['part1', 'part2', 'part3', 'part4'];
        let currentPartIndex = 0;
        
        const playNextPart = () => {
            if (currentPartIndex >= parts.length) {
                console.log('[StoryManager] 所有部分播放完成');
                this.onCycleComplete();
                return;
            }
            
            const partName = parts[currentPartIndex];
            const partData = cycleData[partName];
            
            if (partData && partData.dialogues) {
                console.log(`[StoryManager] 播放 ${partName}`);
                
                // 播放part的对话序列
                this.playPartDialogues(partData.dialogues, () => {
                    // part播放完成后，延迟到下一个part
                    setTimeout(() => {
                        currentPartIndex++;
                        playNextPart();
                    }, 2000);
                });
            } else {
                currentPartIndex++;
                playNextPart();
            }
        };
        
        // 开始播放第一部分
        playNextPart();
    }

    /**
     * 播放part的对话序列
     * @param {Array} dialogues - 对话数组
     * @param {Function} onComplete - 完成回调
     */
    static playPartDialogues(dialogues, onComplete) {
        console.log(`[StoryManager] 开始播放part对话序列，共${dialogues.length}个对话`);
        
        let currentDialogueIndex = 0;
        
        const playNextDialogue = () => {
            if (currentDialogueIndex >= dialogues.length) {
                console.log('[StoryManager] part对话序列播放完成');
                if (onComplete) onComplete();
                return;
            }
            
            const dialogue = dialogues[currentDialogueIndex];
            console.log(`[StoryManager] 播放对话 ${currentDialogueIndex + 1}/${dialogues.length}: ${dialogue.speaker}`);
            
            // 设置当前对话对象
            this.storyData.currentDialogue = dialogue;
            
            // 显示对话
            if (typeof DialogueSystem !== 'undefined') {
                DialogueSystem.showDialogue(dialogue).then(() => {
                    // 对话显示完成后，处理五感更新
                    this.handleSenseUpdates(dialogue);
                    
                    // 继续下一个对话
                    currentDialogueIndex++;
                    playNextDialogue();
                });
            } else {
                console.warn('[StoryManager] DialogueSystem 未加载');
                currentDialogueIndex++;
                playNextDialogue();
            }
        };
        
        // 开始播放第一个对话
        playNextDialogue();
    }

    /**
     * 播放简化五感
     * @param {Object} senses - 五感数据
     */
    static playSimpleSenses(senses) {
        if (typeof SimpleSenseSystem !== 'undefined') {
            SimpleSenseSystem.showSenses(senses, 4.0);
            
        } else {
            console.warn('[StoryManager] SimpleSenseSystem 未加载');
        }
    }

    /**
     * 更新单个感官（兼容旧格式）
     * @param {string} senseType - 感官类型
     * @param {string} senseValue - 感官值
     */
    static updateSingleSense(senseType, senseValue) {
        console.log(`[StoryManager] 开始更新五感: ${senseType} = ${senseValue}`);
        
        if (typeof SimpleSenseSystem !== 'undefined') {
            console.log('[StoryManager] 调用SimpleSenseSystem.updateSingleSense');
            SimpleSenseSystem.updateSingleSense(senseType, senseValue);
            
        } else {
            console.warn('[StoryManager] SimpleSenseSystem 未加载');
        }
    }
    
    /**
     * 更新左耳听觉
     * @param {string} senseValue - 感官值
     */
    static updateLeftHearing(senseValue) {
        console.log(`[StoryManager] 更新左耳听觉: ${senseValue}`);
        
        if (typeof SimpleSenseSystem !== 'undefined') {
            SimpleSenseSystem.updateLeftHearing(senseValue);
        } else {
            console.warn('[StoryManager] SimpleSenseSystem 未加载');
        }
    }
    
    /**
     * 更新右耳听觉
     * @param {string} senseValue - 感官值
     */
    static updateRightHearing(senseValue) {
        console.log(`[StoryManager] 更新右耳听觉: ${senseValue}`);
        
        if (typeof SimpleSenseSystem !== 'undefined') {
            SimpleSenseSystem.updateRightHearing(senseValue);
        } else {
            console.warn('[StoryManager] SimpleSenseSystem 未加载');
        }
    }
    
    /**
     * 更新左手触觉
     * @param {string} senseValue - 感官值
     */
    static updateLeftTouch(senseValue) {
        console.log(`[StoryManager] 更新左手触觉: ${senseValue}`);
        
        if (typeof SimpleSenseSystem !== 'undefined') {
            SimpleSenseSystem.updateLeftTouch(senseValue);
        } else {
            console.warn('[StoryManager] SimpleSenseSystem 未加载');
        }
    }
    
    /**
     * 更新右手触觉
     * @param {string} senseValue - 感官值
     */
    static updateRightTouch(senseValue) {
        console.log(`[StoryManager] 更新右手触觉: ${senseValue}`);
        
        if (typeof SimpleSenseSystem !== 'undefined') {
            SimpleSenseSystem.updateRightTouch(senseValue);
        } else {
            console.warn('[StoryManager] SimpleSenseSystem 未加载');
        }
    }

    /**
     * 处理五感更新数组（新格式 - 支持多实例）
     * @param {Object} dialogue - 对话对象
     */
    static handleSenseUpdates(dialogue) {
        // 处理新格式：senseUpdates 数组
        if (dialogue.senseUpdates && Array.isArray(dialogue.senseUpdates)) {
            console.log(`[StoryManager] 处理五感更新数组，共 ${dialogue.senseUpdates.length} 个操作`);
            
            dialogue.senseUpdates.forEach(update => {
                console.log(`[StoryManager] 处理五感操作: ${update.action} - ${update.id || update.senseType}`);
                
                switch (update.action) {
                    case 'create':
                        SimpleSenseSystem.createSense(
                            update.senseType,
                            update.value,
                            update.position || null,
                            update.distance !== undefined ? update.distance : 50,
                            update.id
                        );
                        break;
                        
                    case 'update':
                        SimpleSenseSystem.updateSense(
                            update.id,
                            update.value,
                            update.position || null,
                            update.distance !== undefined ? update.distance : null
                        );
                        break;
                        
                    case 'remove':
                        SimpleSenseSystem.removeSense(update.id);
                        break;
                        
                    case 'removeByType':
                        SimpleSenseSystem.removeSensesByType(update.senseType);
                        break;
                        
                    default:
                        console.warn(`[StoryManager] 未知的五感操作: ${update.action}`);
                }
            });
        }
        // 处理旧格式：updateSenses 对象
        else if (dialogue.updateSenses) {
            console.log('[StoryManager] 处理旧格式五感更新（updateSenses对象）');
            Object.keys(dialogue.updateSenses).forEach(senseType => {
                this.updateSingleSense(senseType, dialogue.updateSenses[senseType]);
            });
        }
    }

}

// 将StoryManager添加到全局作用域
window.StoryManager = StoryManager;
