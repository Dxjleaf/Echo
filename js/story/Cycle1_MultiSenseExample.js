/**
 * Cycle 1 示例脚本（新格式）
 * 演示如何使用 senseUpdates 数组创建多个同类型五感实例
 */

class Cycle1MultiSenseExample {
    static getCycle1() {
        return {
            id: 'cycle_1',
            title: '初醒',
            theme: '存在的质疑',
            soundEffect: '【持续的低频嗡鸣，夹杂断续的电流声】',
            endSound: '【嗡鸣渐弱，被规律的心跳监测音取代】',
            
            // 第一部分：意识恢复 - 五感逐步觉醒
            part1: {
                dialogues: [
                    {
                        speaker: '旁白',
                        text: '意识像沉入深海的潜水员，缓慢地向上浮升。最先恢复的是听觉——一种持续的低频嗡鸣，像是某种大型机械在远方运转。',
                        // 使用新格式：senseUpdates 数组
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'background_hum',
                                senseType: '听觉',
                                value: '低频嗡鸣，间断的电流噼啪声',
                                position: { x: 300, y: 300 },  // 左上角
                                distance: 80  // 较远距离
                            }
                        ]
                    },
                    {
                        speaker: '旁白',
                        text: '接着是触觉，你发现自己躺在一个坚硬的平面上，表面异常光滑，没有任何纹理。',
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'surface_touch',
                                senseType: '触觉',
                                value: '冰冷坚硬的平面，光滑得不像自然材质',
                                position: { x: 1620, y: 900 },  // 右下角
                                distance: 10  // 很近，直接接触
                            }
                        ]
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）我在哪里？为什么什么都看不见？这种黑暗...太彻底了，连一丝光线的轮廓都没有。',
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'darkness',
                                senseType: '视觉',
                                value: '绝对的黑暗，没有任何光感',
                                position: { x: 960, y: 150 },  // 顶部中央
                                distance: 0  // 最近，环绕视野
                            }
                        ]
                    },
                    {
                        speaker: '旁白',
                        text: '你尝试移动手指，发现动作异常流畅，没有任何阻力。空气中有一种微妙的静电感，让你的皮肤微微发麻。',
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'air_quality',
                                senseType: '嗅觉',
                                value: '微弱的臭氧味，混合着某种消毒剂的气息',
                                position: { x: 1620, y: 300 },  // 右上角
                                distance: 30  // 较近距离
                            }
                        ]
                    },
                    {
                        speaker: '主角',
                        text: '（内心独白）我的身体...为什么感觉这么轻？还有这种味道...金属的苦涩味。',
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'mouth_taste',
                                senseType: '味觉',
                                value: '口腔中残留的金属苦涩味',
                                position: { x: 300, y: 900 },  // 左下角
                                distance: 5  // 非常近，在口中
                            }
                        ]
                    }
                ]
            },
            
            // 第二部分：多个同类型感官和距离变化
            part2: {
                dialogues: [
                    {
                        speaker: '利维',
                        text: '检测到意识活动水平提升。你好，能听到我的声音吗？',
                        // 无五感更新，保持当前状态
                    },
                    {
                        speaker: '主角',
                        text: '谁？！谁在说话？我看不见你！你在哪里？',
                        // 听觉变化：利维的声音出现，同时有两个听觉
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'levi_voice',
                                senseType: '听觉',
                                value: '利维的声音清晰而稳定，带着某种合成的质感',
                                position: { x: 600, y: 400 },  // 左侧中部
                                distance: 40  // 中等距离
                            }
                        ]
                    },
                    {
                        speaker: '利维',
                        text: '请保持冷静。你的视觉系统暂时离线，这是正常的恢复过程。我是利维，你的辅助系统。',
                        // 更新听觉：利维的声音变近
                        senseUpdates: [
                            {
                                action: 'update',
                                id: 'levi_voice',
                                value: '利维的声音变得更加清晰，仿佛就在耳边',
                                distance: 20  // 距离变近
                            }
                        ]
                    },
                    {
                        speaker: '旁白',
                        text: '你听到远处有规律的脚步声，同时近处有持续的水滴声。',
                        // 创建多个听觉实例
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'footsteps',
                                senseType: '听觉',
                                value: '远处传来规律的脚步声',
                                position: { x: 200, y: 200 },  // 左上角远处
                                distance: 90  // 很远
                            },
                            {
                                action: 'create',
                                id: 'water_drip',
                                senseType: '听觉',
                                value: '近处有持续的水滴声',
                                position: { x: 400, y: 600 },  // 左侧较近
                                distance: 25  // 较近
                            }
                        ]
                    },
                    {
                        speaker: '主角',
                        text: '我同时触摸到墙壁和床沿，感受到不同的材质。',
                        // 创建多个触觉实例
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'wall_touch',
                                senseType: '触觉',
                                value: '墙壁冰冷而光滑，没有纹理',
                                position: { x: 1400, y: 500 },  // 右侧中部
                                distance: 15  // 较近
                            },
                            {
                                action: 'create',
                                id: 'bed_touch',
                                senseType: '触觉',
                                value: '床沿有微小的接缝，材质较软',
                                position: { x: 1700, y: 700 },  // 右下区域
                                distance: 10  // 很近
                            }
                        ]
                    },
                    {
                        speaker: '旁白',
                        text: '脚步声越来越近了...',
                        // 更新距离：脚步声接近
                        senseUpdates: [
                            {
                                action: 'update',
                                id: 'footsteps',
                                value: '脚步声越来越近，节奏急促',
                                distance: 60  // 距离更新为中等
                            }
                        ]
                    },
                    {
                        speaker: '主角',
                        text: '我闻到了一种新的气味...像是金属加热后的味道。',
                        // 创建新的嗅觉，同时存在两种气味
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'metal_smell',
                                senseType: '嗅觉',
                                value: '金属加热后的刺鼻气味',
                                position: { x: 1500, y: 450 },  // 右上区域
                                distance: 40  // 中等距离
                            }
                        ]
                    }
                ]
            },
            
            // 第三部分：推理线索 - 距离变化揭示真相
            part3: {
                dialogues: [
                    {
                        speaker: '旁白',
                        text: '你注意到某些声音的距离变化不太自然...',
                        senseUpdates: [
                            {
                                action: 'update',
                                id: 'footsteps',
                                value: '脚步声突然变得很近，但没有相应的位移感',
                                distance: 20  // 突然变得很近，不自然
                            },
                            {
                                action: 'update',
                                id: 'background_hum',
                                value: '机械嗡鸣声始终保持在固定距离',
                                distance: 80  // 距离不变，暗示是环境音
                            }
                        ]
                    },
                    {
                        speaker: '主角',
                        text: '这些距离...它们不符合物理规律。声音的远近变化太快了。',
                        senseUpdates: [
                            {
                                action: 'update',
                                id: 'water_drip',
                                value: '水滴声始终在固定位置，距离不变',
                                distance: 25  // 固定距离，暗示是循环音效
                            }
                        ]
                    },
                    {
                        speaker: '利维',
                        text: '距离感知系统可能有些故障，我会进行校准。',
                        // 删除所有听觉实例，消除矛盾
                        senseUpdates: [
                            {
                                action: 'removeByType',
                                senseType: '听觉'
                            }
                        ]
                    },
                    {
                        speaker: '旁白',
                        text: '所有的声音突然消失了，只剩下死寂...',
                        senseUpdates: [
                            {
                                action: 'create',
                                id: 'silence',
                                senseType: '听觉',
                                value: '绝对的安静，连呼吸声都听不到',
                                position: { x: 960, y: 540 },  // 中央（对话结束后显示）
                                distance: 0  // 最近，环绕的寂静
                            }
                        ]
                    }
                ]
            }
        };
    }
}

// 导出到全局
window.Cycle1MultiSenseExample = Cycle1MultiSenseExample;

