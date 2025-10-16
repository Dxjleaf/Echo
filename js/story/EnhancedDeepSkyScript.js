/**
 * 《深空回响：第一幕》增强版剧本
 * 每个Cycle包含完整的叙事结构和丰富的感官体验
 */

class EnhancedDeepSkyScript {
    /**
     * 获取Cycle 1：初醒 - 存在的质疑
     */
    static getCycle1() {
        return {
            id: 'cycle_1',
            title: '初醒',
            theme: '存在的质疑',
            
            part1: {
                dialogues: [
                    {
                        speaker: '旁白',
                        text: '意识从虚无中缓缓凝聚。最先感受到的是声音。',
                        updateSenses: {
                            听觉: '持续的低频嗡鸣'
                        },
                        showSenseHint: true
                    },
                    {
                        speaker: '旁白',
                        text: '一种稳定的振动声，像是某种大型设备的运转。',
                        updateSenses: {
                            听觉: '稳定的设备运转声'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）好黑...什么都看不见...我在哪里？',
                        updateSenses: {
                            视觉: '完全的黑暗'
                        }
                    },
                    {
                        speaker: '旁白',
                        text: '身体沉重得像是被什么东西压着，连抬起手指都困难。',
                        updateSenses: {
                            触觉: '身体沉重，难以移动'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）我的身体...为什么动不了？',
                        updateSenses: {
                            触觉: '四肢麻木无力'
                        }
                    },
                    {
                        speaker: '旁白',
                        text: '空气中飘散着淡淡的消毒水气味，混合着某种清洁剂的清香。',
                        updateSenses: {
                            嗅觉: '消毒水与清洁剂混合气味'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）这味道...像是医院？',
                        updateSenses: {
                            嗅觉: '医院特有的消毒水味'
                        }
                    },
                    {
                        speaker: '旁白',
                        text: '口腔异常干燥，带着药片的苦涩余味。',
                        updateSenses: {
                            味觉: '口干舌燥，药片苦味'
                        }
                    }
                ]
            },
            
            part2: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '你醒了？能听到我说话吗？'
                    },
                    {
                        speaker: '主角',
                        text: '谁...谁在那里？'
                    },
                    {
                        speaker: '利维',
                        text: '我是利维，你的护理员。别紧张，慢慢呼吸。'
                    },
                    {
                        speaker: '主角',
                        text: '为什么...这么黑？我什么都看不见...'
                    },
                    {
                        speaker: '利维',
                        text: '你的眼睛还包扎着纱布。这是为了保护。',
                        updateSenses: {
                            触觉: '眼周有绷带的轻微压迫感'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '包扎？我怎么了？发生什么事了？'
                    },
                    {
                        speaker: '利维',
                        text: '你刚做完手术，需要好好休息。别着急问太多。'
                    },
                    {
                        speaker: '主角',
                        text: '手术？什么手术？我为什么什么都想不起来？'
                    },
                    {
                        speaker: '利维',
                        text: '这是麻醉后的正常反应。记忆会慢慢恢复的。',
                        updateSenses: {
                            听觉: '远处隐约有关门声'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '我的名字...我连自己的名字都不记得了...'
                    },
                    {
                        speaker: '利维',
                        text: '别强迫自己。先专注于恢复身体。',
                        updateSenses: {
                            听觉: '利维的声音稳定而令人安心'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '这里...是医院吗？'
                    },
                    {
                        speaker: '利维',
                        text: '是的，康复中心。你需要在这里休养一段时间。',
                        updateSenses: {
                            听觉: '走廊传来推车滚轮的轻微声响'
                        }
                    }
                ]
            },
            
            // 五感探索部分
            part3: {
                dialogues: [
                    {
                        speaker: '主角',
                        text: '（内心独白）什么都看不见...只能用其他感官来了解这里了。'
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）除了那个嗡嗡声，还有什么声音？',
                        updateSenses: {
                            听觉: '专注聆听环境中的细微声音'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）好像...有很轻的嘶嘶声，像是通风系统？',
                        updateSenses: {
                            听觉: '轻微的通风系统声音'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）还有什么？努力听...',
                        updateSenses: {
                            听觉: '除了机械声，几乎没有其他声音'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）奇怪...医院应该有人声才对。这里太安静了。'
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）这个床铺...',
                        updateSenses: {
                            触觉: '手掌轻抚床单表面'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）很光滑，没有褶皱，像是新换的床单。',
                        updateSenses: {
                            触觉: '床单异常平整光滑'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）移动手指...碰到了什么东西？',
                        updateSenses: {
                            触觉: '手指触到冰凉的金属栏杆'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）是病床的护栏？为什么这么冰凉？'
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）除了消毒水还有什么气味？',
                        updateSenses: {
                            嗅觉: '仔细分辨空气中的气味'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）只有消毒水和清洁剂的味道...没有食物的气味，没有花香，没有人的气息...',
                        updateSenses: {
                            嗅觉: '单调的化学气味，缺乏生活气息'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）嘴里除了苦味还有什么？',
                        updateSenses: {
                            味觉: '仔细感受口腔中的味道'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）只有药片的苦味...连唾液都少得奇怪。',
                        updateSenses: {
                            味觉: '异常干燥，只有苦味'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）这个地方...感觉不太对劲。太干净，太安静，太...完美了？'
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）真实的医院不该是这样的...应该有各种杂乱的声音，不同的气味...'
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）但也许...是我想太多了？毕竟我什么都记不起来...'
                    }
                ]
            },
            
            part4: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '感觉怎么样？需要喝点水吗？',
                        updateSenses: {
                            听觉: '利维的声音从稍远处传来'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '好...有点渴。'
                    },
                    {
                        speaker: '利维',
                        text: '慢慢来，我帮你。',
                        updateSenses: {
                            听觉: '轻微的脚步声靠近'
                        }
                    },
                    {
                        speaker: '旁白',
                        text: '你感觉到吸管轻轻碰到嘴唇。',
                        updateSenses: {
                            触觉: '吸管接触嘴唇的触感',
                            味觉: '清凉的水流过喉咙'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '谢谢...现在是什么时候？'
                    },
                    {
                        speaker: '利维',
                        text: '晚上。你应该休息了。',
                        updateSenses: {
                            听觉: '远处传来极轻微的电子提示音'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '那个声音...是什么？'
                    },
                    {
                        speaker: '利维',
                        text: '只是监测设备。不用担心。',
                        updateSenses: {
                            听觉: '规律的滴答声，像是心跳监测'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '监测设备...有很多仪器吗？'
                    },
                    {
                        speaker: '利维',
                        text: '标准的术后监测。都是为了你的安全。',
                        updateSenses: {
                            听觉: '设备运转声似乎略有变化'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '我好像听到...有别人走进来？',
                        updateSenses: {
                            听觉: '门外隐约的脚步声'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '是值班医生在巡房。',
                        updateSenses: {
                            听觉: '脚步声在门外停顿，然后远去'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '医生？我能和他说话吗？'
                    },
                    {
                        speaker: '利维',
                        text: '明天吧。现在你需要休息。',
                        updateSenses: {
                            嗅觉: '空气中飘来淡淡的薰衣草香气'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '这香味...'
                    },
                    {
                        speaker: '利维',
                        text: '有助于放松。你会睡得很好。',
                        updateSenses: {
                            触觉: '床铺开始轻微调整角度'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '又要睡了吗...'
                    },
                    {
                        speaker: '利维',
                        text: '睡眠是最好的恢复。明天你会感觉好很多。',
                        updateSenses: {
                            听觉: '播放轻柔的睡眠音乐'
                        }
                    }
                ]
            },
            
            part5: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '闭上眼睛休息吧。我会在这里。'
                    },
                    {
                        speaker: '主角',
                        text: '你不会离开？'
                    },
                    {
                        speaker: '利维',
                        text: '不会。我保证。',
                        updateSenses: {
                            听觉: '利维的声音变得柔和'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '好...我相信你。'
                    },
                    {
                        speaker: '旁白',
                        text: '倦意如温暖的潮水般涌来。',
                        updateSenses: {
                            触觉: '身体逐渐放松，沉重感减轻'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）这个味道...让人好困...'
                    },
                    {
                        speaker: '旁白',
                        text: '薰衣草的香气似乎变得更加浓郁。',
                        updateSenses: {
                            嗅觉: '薰衣草香气变得浓郁'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）利维...希望明天...能看见点什么...'
                    },
                    {
                        speaker: '旁白',
                        text: '意识开始模糊，沉入深沉的黑暗中。',
                        updateSenses: {
                            听觉: '所有声音逐渐遥远模糊',
                            视觉: '黑暗变得更加深沉'
                        }
                    },
                    {
                        speaker: '旁白',
                        text: '在完全失去意识前，你似乎听到了什么。',
                        updateSenses: {
                            听觉: '极轻微的电子合成音'
                        }
                    },
                    {
                        speaker: '旁白',
                        text: '但那声音太过短暂，很快就消失在睡意中。',
                        updateSenses: {
                            触觉: '最后的感觉是全身的轻盈',
                            味觉: '口中残留着淡淡的甜味'
                        }
                    }
                ]
            }
        };
    }

    /**
     * 获取Cycle 2：日常 - 建立routine
     */
    static getCycle2() {
        return {
            id: 'cycle_2',
            title: '日常',
            theme: '建立routine',
            
            part1: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '早上好。昨晚休息得好吗？',
                        // 听觉变化：利维的声音
                        updateSenses: {
                            听觉: '利维的声音，背景中有微弱的机械运转声'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '早上？我...我还是什么都看不见。这是早上吗？',
                        // 无五感更新
                    },
                    {
                        speaker: '利维',
                        text: '是的，现在是上午九点。阳光透过东窗，照在你的被子上。',
                        // 触觉变化：被子触感
                        updateSenses: {
                            触觉: '被子触感柔软，但温度异常恒定'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '阳光？我感受不到任何温度变化...',
                        // 嗅觉变化：空气特性
                        updateSenses: {
                            嗅觉: '空气中没有任何自然气息'
                        }
                    }
                ]
            },
            
            part2: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '早餐时间到了。我为你准备了营养液。',
                        // 听觉变化：脚步声
                        updateSenses: {
                            听觉: '机械运转声，利维的脚步声'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '营养液？不是真正的食物吗？',
                        // 触觉变化：手中物体
                        updateSenses: {
                            触觉: '手中被放置了一个温热的物体'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '目前你的消化系统还不能处理固体食物。这需要时间。',
                        // 嗅觉变化：食物香气
                        updateSenses: {
                            嗅觉: '开始闻到某种食物的香气'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '我什么时候能恢复正常？',
                        // 味觉变化：营养液
                        updateSenses: {
                            味觉: '口中被注入某种液体，带着营养的味道'
                        }
                    }
                ]
            },
            
            part3: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '这是营养液，专门为你调配的。',
                        // 听觉变化：滴答声
                        updateSenses: {
                            听觉: '利维的声音，远处有规律的滴答声'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '营养液？不是真正的食物吗？',
                        // 触觉变化：营养液温度
                        updateSenses: {
                            触觉: '营养液的味道，温度适中'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '目前你的消化系统还不能处理固体食物。这需要时间。',
                        // 嗅觉变化：化学味道
                        updateSenses: {
                            嗅觉: '营养液的气味，带着某种化学味道'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '我什么时候能恢复正常？',
                        // 味觉变化：维生素味道
                        updateSenses: {
                            味觉: '营养液的味道，微甜，带着维生素的味道'
                        }
                    }
                ]
            },
            
            part4: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '现在让我们做一些简单的身体活动。',
                        // 听觉变化：指导声
                        updateSenses: {
                            听觉: '利维的指导声，机械设备的运转声'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '活动？我看不见，怎么活动？',
                        // 触觉变化：身体重量
                        updateSenses: {
                            触觉: '开始感受到身体的重量，重力感逐渐恢复'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '我会引导你。先试着坐起来。',
                        // 嗅觉变化：汗水味道
                        updateSenses: {
                            嗅觉: '空气中开始有汗水的味道'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '我感觉...很奇怪。',
                        // 味觉变化：营养液变淡
                        updateSenses: {
                            味觉: '口中营养液的味道开始变淡'
                        }
                    }
                ]
            },

        };
    }

    /**
     * 获取Cycle 3：探索 - 发现异常
     */
    static getCycle3() {
        return {
            id: 'cycle_3',
            title: '探索',
            theme: '发现异常',
            
            part1: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '今天感觉怎么样？',
                        // 听觉变化：房间回音
                        updateSenses: {
                            听觉: '利维的声音，房间内的回音'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '我想...我想看看周围的环境。',
                        // 触觉变化：触摸墙壁
                        updateSenses: {
                            触觉: '开始触摸周围的环境，发现墙壁异常光滑'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '你的视觉系统还在恢复中。',
                        // 嗅觉变化：空气循环
                        updateSenses: {
                            嗅觉: '房间内空气循环，没有任何自然气息'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '这些墙壁...太光滑了。',
                        // 味觉变化：营养液残留
                        updateSenses: {
                            味觉: '口中仍有营养液的味道'
                        }
                    }
                ]
            },
            
            part2: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '这是为了你的安全。',
                        // 听觉变化：触摸声音
                        updateSenses: {
                            听觉: '触摸墙壁时的声音，异常清脆'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '安全？从什么？',
                        // 触觉变化：墙壁温度
                        updateSenses: {
                            触觉: '墙壁温度恒定，没有任何温度变化'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '外界环境。',
                        // 嗅觉变化：消毒剂
                        updateSenses: {
                            嗅觉: '消毒剂的味道，但很淡'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '外界？外面有什么？',
                        // 味觉变化：营养液消失
                        updateSenses: {
                            味觉: '营养液味道开始消失'
                        }
                    }
                ]
            },
            
            part3: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '现在还不是时候。',
                        // 听觉变化：环境音规律性
                        updateSenses: {
                            听觉: '开始注意到环境音的规律性'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '什么时候才是时候？',
                        // 触觉变化：门把手
                        updateSenses: {
                            触觉: '触摸到门把手，发现它异常光滑'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '当你的身体完全恢复时。',
                        // 嗅觉变化：金属味道
                        updateSenses: {
                            嗅觉: '空气中开始有某种金属味道'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '我感觉...这里不像是医院。',
                        // 味觉变化：金属味道
                        updateSenses: {
                            味觉: '口中开始有金属味道'
                        }
                    }
                ]
            },
            
            part4: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '你需要休息了。',
                        // 听觉变化：声音机械
                        updateSenses: {
                            听觉: '利维的声音开始变得有些机械'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '等等，我想知道更多...',
                        // 触觉变化：身体疲惫
                        updateSenses: {
                            触觉: '身体开始感到疲惫'
                        }
                    },
                    {
                        speaker: '利维',
                        text: '明天我们再继续。',
                        // 嗅觉变化：化学味道
                        updateSenses: {
                            嗅觉: '空气中开始有某种化学味道'
                        }
                    },
                    {
                        speaker: '主角',
                        text: '明天...',
                        // 味觉变化：金属味道加重
                        updateSenses: {
                            味觉: '口中金属味道加重'
                        }
                    }
                ]
            },

        };
    }

    // 其他Cycle的占位符...
    static getCycle4() { return this.getCycle1(); }
    static getCycle5() { return this.getCycle1(); }
    static getCycle6() { return this.getCycle1(); }
    static getCycle7() { return this.getCycle1(); }
    static getCycle8() { return this.getCycle1(); }
    static getCycle9() { return this.getCycle1(); }
}

// 将类添加到全局作用域
window.EnhancedDeepSkyScript = EnhancedDeepSkyScript;