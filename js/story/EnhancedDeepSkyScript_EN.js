/**
 * Script
 * Auresia World Story - Chapter 1
 */

class EnhancedDeepSkyScript_EN {
    /**
     * Initialize terms glossary
     */
    static initializeTerms() {
        if (window.TermSystem) {
            TermSystem.registerTerms({
                // World & Foundation
                'Auresia': 'The realm of sound and touch where survival depends on learning to "see" through ears, nose, and fingertips',
                'Somathesians': 'The wise race of this world, born with sensitive tendrils that perceive the world through touch and vibration',
                'Tactiliths': 'Flexible tendrils behind Somathesians\' shoulders, capable of delicate stone carving and silent communication through touch',
                'Aurafield': 'The blended field of temperature, scent, and vibration naturally emitted by every being, revealing emotions and states',
                
                // Society & Identity
                'Lithweavers': 'Artisan class specializing in carving singing stones, creating resonant artworks with their hands',
                'Deep Resonants': 'Settlement elders who hear the earth\'s deepest pulses, responsible for warning dangers and guiding directions',
                'Keng': 'Apprentice stonemason skilled at listening to stone resonance. His name itself is onomatopoeia of striking stone.',
                'Mianhui': 'Keng\'s mentor, experienced stonemason. Name represents his gentle yet profound presence.',
                'Se': 'Keng\'s workshop companion, friendly stonemason.',
                
                // Perception & Communication
                'Synaptic Pairing': 'Unique Somathesian communication: direct thought transmission through tendril contact, more precise and private than speech',
                'Form Resonance': 'Each object\'s unique vibration frequency, like its "sound fingerprint," allowing material recognition without sight',
                'Emotives': 'Emotional and state information conveyed through scent, crucial to communication',
                
                // Time & Architecture
                'Heartstone Spire': 'The settlement\'s heart, continuously emitting rhythmic pulses that guide daily life, an unfailing beacon',
                'Dawn Pulse': 'Morning awakening signal: three long, one short vibration through the earth, gentle yet irresistible',
                'Noon Pulse': 'Midday rest signal: continuous hum marking work\'s midpoint, time for brief respite and energy replenishment',
                'Dusk Pulse': 'Evening relaxation signal: long, descending wave announcing work cycle\'s end',
                'Harmony Corridors': 'Exquisitely carved passages that capture and amplify nature\'s faintest vibrations',
                
                // Materials & Creation
                'Songstone': 'Magical singing stone that remembers and repeats specific vibrations',
                'Aquatone': 'Special Songstone that produces melodic sounds when water flows through it',
                'Melody Channels': 'Waterways carved into Aquatone, transforming chaotic water sounds into musical melodies',
                'Prima Point': 'Each stone\'s perfect starting point; finding it awakens the stone\'s inner song',
                'Tactile Tracery': 'Grooved patterns on walls recording ancestral wisdom and memories, a tactile textbook',
                
                // Nature & Items
                'Nectar Dew': 'Morning-harvested drink, sweet and thirst-quenching, its dripping sounds serve as natural timekeeper',
                'Glimmercaps': 'Staple food: thick, juicy mushrooms with rich earthy flavor and subtle sweetness',
                'Thermal Moss': 'Ideal bedding material: soft, temperature-regulating, clearly transmitting vibrations to never miss important signals',
                'Crystal Dew': 'Night-formed dewdrops creating dawn symphonies as they fall and strike different surfaces',
                
                // Craft & Technology
                'Resonance Mallet': 'Primary stonemason\'s tool for striking and carving stone',
                'Harmony Hammer': 'Precision tool for testing and adjusting stone resonance properties',
                'Lithic Polisher': 'Polishing tool for smoothing stone surfaces to perfection',
                
                // Perceptual States
                'Resonant Focus': 'Deep concentration state where sweat carries unique sea-breeze and metal scent',
                'Creator\'s Bliss': 'Joyful completion state emitting sweet honey and warm stone fragrance'
            });
        }
    }
    
    /**
     * Get Cycle 1: Stone Mason's Dawn
     */
    static getCycle1() {
        return {
            id: 'cycle_1',
            title: 'Dawn and Stone Speech',
            theme: 'Awakening in Resonance, Conversing with Stone',
            
            part1: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'Keng awoke to a rhythmic vibration.',
                        updateSenses: {
                            触觉: 'The Thermal Moss bed beneath him transmitted the Dawn Pulse - three long and one short steady pulses, warm and firm throughout his body',
                            听觉: 'The deep vibration of the Dawn Pulse through the earth, like the heartbeat of a waking world',
                            嗅觉: 'The moist earthy scent of Thermal Moss, mixed with lingering nighttime tranquility'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'He extended his Tactiliths, habitually brushing over the Tactile Tracery on the wall.',
                        updateSenses: {
                            触觉: 'The depth and turns of ancestral markings transmitted wisdom memories, Tactiliths gently exploring the patterns',
                            听觉: 'The faint friction sound of Tactiliths gliding over grooves, accompanied by the deep resonance of ancient stone',
                            嗅觉: 'The mineral scent accumulated over years, carrying the weight of wisdom'
                        }
                    }
                ]
            },
            
            part2: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'Leaving the dwelling, the morning settlement was full of vitality.',
                        updateSenses: {
                            听觉: 'The crisp symphony of Crystal Dew dripping, distant wind whistling softly through holes',
                            嗅觉: 'The light sweetness of newborn Glimmercaps blending with the vibrant moist moss scent',
                            触觉: 'The cool morning air gently brushing by, bringing refreshing awakening'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Walking along the main path toward the workshop, the feel underfoot guided his way.',
                        updateSenses: {
                            触觉: 'The tactile change from moss softness to packed earth firmness to rough stone chips',
                            听觉: 'The crunch of stepping on stone chips interweaving with distant workshop tapping',
                            嗅觉: 'The mineral dust scent gradually intensifying, heralding the start of work'
                        }
                    }
                ]
            },
            
            part3: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'The workshop was already an ocean of sound.',
                        updateSenses: {
                            听觉: 'Clear tapping and delicate polishing sounds weaving into a symphony of labor',
                            嗅觉: 'Mianhui mentor\'s ancient wood-like steady scent mixing with fresh Songstone aroma',
                            触觉: 'The dense vibration frequency in the air, full of creative energy'
                        }
                    },
                    {
                        speaker: 'Mianhui',
                        text: '(via Synaptic Pairing) You\'re here. Two new Aquatone from the eastern mine. Need to carve Melody Channels for the new western spring. Choose the one with clearer, more coherent song.',
                        updateSenses: {
                            触觉: 'The mentor\'s clear instructions through Tactiliths, with subtle tremors of anticipation',
                            听觉: 'The unique frequency of information transmission through the medium, full of teaching rhythm'
                        }
                    },
                    {
                        speaker: 'Keng',
                        text: '(via Synaptic Pairing) Understood, Mentor.',
                        updateSenses: {
                            触觉: 'Response of compliance to the mentor, body preparing for the task',
                            嗅觉: 'Changes in Emotives when focusing on tasks, emitting responsible scent'
                        }
                    }
                ]
            },
            
            part4: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'Keng approached the two cold boulders and began perceiving.',
                        updateSenses: {
                            触觉: 'Palms adhering to rough stone surfaces, Tactiliths exploring texture details',
                            听觉: 'The first stone\'s chaotic internal tremors, unstable crackling harsh noises',
                            嗅觉: 'The sharp mineral scent of fresh Songstone, displaying primitive power'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'The second stone seemed too silent.',
                        updateSenses: {
                            触觉: 'Weak, slow internal vibrations, feedback like sinking in mud',
                            听觉: 'Lifeless stillness, disappointing lack of resonance potential',
                            嗅觉: 'The oppressive scent of dull stone, feeling of exhausted vitality'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'But the third... when his palm touched it, stable, even vibrations transmitted.',
                        updateSenses: {
                            触觉: 'Steady, powerful resonance transmission, uniform dense internal structure full of potential',
                            听觉: 'Healthy pure resonance singing, deep melody prototype faintly discernible',
                            嗅觉: 'The clear moist scent of quality Aquatone, hinting at flowing characteristics'
                        }
                    }
                ]
            },
            
            part5: {
                dialogues: [
                    {
                        speaker: 'Keng',
                        text: '(via Synaptic Pairing) This one, Mentor.',
                        updateSenses: {
                            触觉: 'Confirmation waves carrying the satisfaction of discovery',
                            嗅觉: 'Confident Emotives from correct choice mixed with joy'
                        }
                    },
                    {
                        speaker: 'Mianhui',
                        text: '(via Synaptic Pairing) Describe it.',
                        updateSenses: {
                            触觉: 'Instructions requiring precise perception, pressure expecting detailed description',
                            听觉: 'Clear transmission of brief commands, reflecting teaching patience'
                        }
                    },
                    {
                        speaker: 'Keng',
                        text: '(via Synaptic Pairing) Its Form Resonance is very uniform, no void-like emptiness inside, nor harsh noises from cracks. Its song... is like a great river flowing steadily in a wide channel.',
                        updateSenses: {
                            触觉: 'Focus on transforming complex vibrations, Tactiliths dancing to express emotion',
                            听觉: 'Voice of discovery joy, fluent poetic metaphorical tone',
                            嗅觉: 'Bright Emotives changes after accurate perception, scent of understanding and comprehension'
                        }
                    }
                ]
            },
            
            part6: {
                dialogues: [
                    {
                        speaker: 'Mianhui',
                        text: '(via Synaptic Pairing) Good. Now, find its Prima Point. That\'s where your true dialogue with this stone begins.',
                        updateSenses: {
                            嗅觉: 'Mentor\'s approving warm hay scent, positive Emotives permeating',
                            触觉: 'Gentle waves guiding work, encouraging supportive vibrations transmitting',
                            听觉: 'Anticipatory frequency full of confidence in apprentice growth'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Keng picked up the Resonance Mallet, tapping gently like a musician tuning an instrument.',
                        updateSenses: {
                            触觉: 'Mallet handle warmed by body temperature, tool\'s balanced weight reassuring',
                            听觉: 'Mostly dull thumping sounds, rich variations from different positions',
                            嗅觉: 'Palm sweat mixed with wood, tangible sense of work beginning'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Until one spot—Ding! A clear, pleasant note emerged.',
                        updateSenses: {
                            听觉: 'The clear resonance of the Prima Point, lingering vibrations filling the space',
                            触觉: 'Stone heart-like resonance key point, perfect tactile confirmation',
                            嗅觉: 'Excited Emotives from discovering the key point, joy of breakthrough'
                        }
                    }
                ]
            },
            
            part7: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'With the Prima Point determined, true carving began.',
                        updateSenses: {
                            听觉: 'Keng! The heavy impact of the mason\'s namesake, accompanied by Songstone chip scattering',
                            嗅觉: 'Sharp mineral scent of fresh stone chips, creative excitement Emotives permeating',
                            触觉: 'The solid vibration feedback from the Resonance Mallet, each strike full of power'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'The second strike, lighter, sound still clear.',
                        updateSenses: {
                            触觉: 'Subtle friction between chisel tip and stone, precise muscle memory control',
                            听觉: 'Continuous clear resonance, sound diffusion full of rhythm',
                            嗅觉: 'Songstone\'s internal scent releasing with carving, revealing deep characteristics'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Throughout the morning, Keng immersed himself in this solo with the stone.',
                        updateSenses: {
                            触觉: 'Rich tactile information from Tactilith tips, coordinated muscle control in focused state',
                            嗅觉: 'Sea breeze saltiness of sweat mixed with metallic coldness',
                            听觉: 'Changing notes from each strike forming unique creative melody'
                        }
                    }
                ]
            },
            
            part8: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'He was carving Melody Channels to guide the spring, turning chaotic water sounds into pleasant water music.',
                        updateSenses: {
                            触觉: 'Adjusting carving angles according to diagrams, feeling channel wall curvature changes',
                            听觉: 'Different techniques producing varied resonance feedback, melody gradually forming',
                            嗅觉: 'Highly concentrated Emotives during Resonant Focus'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Sometimes using Tactiliths to gently stroke formed grooves, feeling smoothness.',
                        updateSenses: {
                            触觉: 'Perceiving subtle differences in groove wall smoothness, sensitive Tactilith detection',
                            听觉: 'Almost silent Tactilith sliding over stone, silent confirmation of perfect smoothness',
                            嗅觉: 'Warm powdery scent after stone polishing'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Sometimes tapping groove walls with small hammer, judging thickness uniformity.',
                        updateSenses: {
                            听觉: 'Light tapping feedback on structural integrity, warning noises from potential weak points',
                            触觉: 'Subtle tremor tactile warnings, stable feedback from uniform thickness',
                            嗅觉: 'Cautious Emotives scent during inspection'
                        }
                    }
                ]
            },
            
            part9: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'The high-frequency hum of the Noon Pulse came from the Heartstone Spire.',
                        updateSenses: {
                            听觉: 'Continuous steady humming signal, sound waves evenly propagating',
                            触觉: 'Gentle resonance of vibrations in the body, physiological response to rhythm change',
                            嗅觉: 'Warm changes in air Emotives'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Workshop rhythm slowed, Keng and Se walked toward the Harmony Corridors.',
                        updateSenses: {
                            听觉: 'Gradually sparse tapping sounds, light cracking of stretching joints',
                            嗅觉: 'Warm penetration of food aroma, fading mineral dust scent',
                            触觉: 'Transition from intensive labor to relaxation'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'The noon breeze warm and lazy, transformed into soft sighs in the corridor.',
                        updateSenses: {
                            触觉: 'Comfortable warmth of breeze brushing by, smooth coolness of corridor pillars',
                            听觉: 'Sigh-like sound of wind through holes, unique acoustic characteristics of corridor',
                            嗅觉: 'Accumulated steady scent of ancient stone'
                        }
                    }
                ]
            },
            
            part10: {
                dialogues: [
                    {
                        speaker: 'Se',
                        text: '(via Synaptic Pairing) The water music of the Melody Channels must be hard to carve? Your tapping rhythm seemed very tight all morning.',
                        updateSenses: {
                            触觉: 'Caring warmth from friend, subtle vibrations of understanding support',
                            嗅觉: 'Se\'s cool mint morning dew Emotives, peaceful scent of friendly exchange',
                            听觉: 'Gentle frequency of greeting with understanding'
                        }
                    },
                    {
                        speaker: 'Keng',
                        text: '(via Synaptic Pairing) Yes, Aquatone is very sensitive. To prevent sound scattering when water flows, the curvature and smoothness must be precise. Every chisel strike must "hear" its future water flow sound.',
                        updateSenses: {
                            触觉: 'Transmitting fatigue after Resonant Focus, enthusiasm sharing professional knowledge',
                            嗅觉: 'Roasted nut-like satisfying Emotives, bright scent of confident explanation',
                            听觉: 'Professional confidence in explanatory voice'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'They shared Glimmercaps and Nectar Dew, Aurafields gently blending.',
                        updateSenses: {
                            味觉: 'Thick earthy mushroom flavor with hidden sweetness',
                            触觉: 'Refreshing sweet sensation of Nectar Dew, energy replenishment from food',
                            嗅觉: 'Harmonious blending of their presence, warm mixture of friendship Emotives'
                        }
                    }
                ]
            },
            
            part11: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'Afternoon work was more steady, with settled focus of approaching day\'s end.',
                        updateSenses: {
                            听觉: 'Steady powerful rhythm of tapping, workshop\'s overall peaceful frequency',
                            嗅觉: 'Permeation of fine powdery scent, tranquil Emotives of afternoon period',
                            触觉: 'Familiar weight feel of tool grip'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Keng switched to fine tools for polishing and tuning.',
                        updateSenses: {
                            触觉: 'Smooth tactile feel of wet Lithic Polisher, fine movement muscle control',
                            听觉: 'Light tapping detection with Harmony Hammer, subtle differences in resonance changes',
                            嗅觉: 'Fresh scent of water and stone mixture'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'He needed to ensure smooth natural transition of resonance frequency from channel start to end.',
                        updateSenses: {
                            触觉: 'Tactile change from rough to smooth surface, confirmation of perfect curvature feel',
                            听觉: 'Focused listening to subtle differences, smooth transition of melody coherence',
                            嗅觉: 'Highly concentrated Emotives during fine work'
                        }
                    }
                ]
            },
            
            part12: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'When Keng believed the final groove wall met requirements, he stopped.',
                        updateSenses: {
                            触觉: 'Weight change of putting down tools, slight trembling of relaxing muscles',
                            听觉: 'Workshop background sounds prominent, peaceful frequency of self-satisfaction',
                            嗅觉: 'Permeating anticipation Emotives of completion moment'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'He stepped back, struck the Melody Channels starting end with Harmony Hammer.',
                        updateSenses: {
                            触觉: 'Precise control of specific angle, muscle memory of force control',
                            听觉: 'Whooshing sound of swinging hammer, silent moment of anticipation',
                            嗅觉: 'Focused calm before final test'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Ling————! A clear, coherent flowing water-like melody streamed from the stone channel!',
                        updateSenses: {
                            听觉: 'Undulating rhythm of streaming water, perfect melody echoing in space',
                            触觉: 'Physical vibration of resonance in air, full-body tremor of successful creation',
                            嗅觉: 'Honey warm rock Emotives of Creator\'s Bliss'
                        }
                    }
                ]
            },
            
            part13: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'Creator\'s Bliss surged through Keng\'s entire body like warm flow.',
                        updateSenses: {
                            嗅觉: 'Rich sweet honey aroma, grounding scent of warm rock',
                            触觉: 'Joyful trembling of satisfaction, full-body warmth of achievement moment',
                            听觉: 'Accelerated beating of own heart'
                        }
                    },
                    {
                        speaker: 'Mianhui',
                        text: '(via Synaptic Pairing) A good song, Keng. Clear, stable, melodious. It will sing steadily in future water flows for a long time, guiding passersby. You did well.',
                        updateSenses: {
                            触觉: 'Approving vibrations from mentor, honor tremors brought by recognition',
                            嗅觉: 'Brighter honey Emotives, warm diffusion of approving information',
                            听觉: 'Warm frequency of praising words'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'This simple recognition perfectly embedded into Keng\'s satisfaction.',
                        updateSenses: {
                            触觉: 'Fullness and calm at spiritual level, harmonious resonance of all cells',
                            听觉: 'World sounds exceptionally clear and pleasant, peaceful frequency of inner contentment',
                            嗅觉: 'Harmonious Emotives of double sweetness'
                        }
                    }
                ]
            },
            
            part14: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'At that moment, the Heartstone Spire\'s vibrations changed again.',
                        updateSenses: {
                            听觉: 'Long descending Dusk Pulse, sound waves calming restless effects',
                            触觉: 'Body\'s response to rest signals, collective rhythm synchronizing changes',
                            嗅觉: 'Gentle transformation of air Emotives'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'The Dusk Pulse announced the work cycle\'s end, time to return to the nest.',
                        updateSenses: {
                            听觉: 'Workshop tapping ceased, dense vibrations of homeward footsteps',
                            嗅觉: 'Warm flood of nest Emotives, rapid dissipation of mineral dust',
                            触觉: 'Collective rhythm shifting toward rest'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Keng followed the homeward footsteps vibrations and his own nest\'s unique scent.',
                        updateSenses: {
                            触觉: 'Regular vibration feedback from footsteps, clear guidance toward home',
                            嗅觉: 'Familiar sweet scent of home Thermal Moss, special aroma of stored dried fruits',
                            听觉: 'Peaceful lowering of settlement sounds'
                        }
                    }
                ]
            },
            
            part15: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: 'Night belonged to the nest, family, and deep rest.',
                        updateSenses: {
                            听觉: 'Settlement\'s gentle hum, peaceful nighttime frequency',
                            嗅觉: 'Warm dinner aromas, harmonious mixture of family Emotives',
                            触觉: 'Soft embrace of Thermal Moss bedding'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'In sharing daily experiences through Synaptic Pairing, body and mind gradually relaxed.',
                        updateSenses: {
                            触觉: 'Gentle waves of intimate communication, comfortable tremors of relaxed state',
                            嗅觉: 'Peaceful warm Emotives, flowing scent of family tranquility',
                            听觉: 'Reassuring frequency of soft conversation'
                        }
                    },
                    {
                        speaker: 'Narrator',
                        text: 'Until the next day\'s Dawn Pulse came again, beginning a new cycle.',
                        updateSenses: {
                            听觉: 'Faint perception of distant vibrations, heralding frequency of new cycle',
                            触觉: 'Substantial feeling of accumulated strength, vitality recovery after rest',
                            嗅觉: 'Steady flow of peaceful sleep Emotives'
                        }
                    }
                ]
            }
        };
    }

    // Placeholder for subsequent chapters
    static getCycle2() {
        return {
            id: 'cycle_2',
            title: 'To Be Continued',
            theme: 'The Story Continues...',
            part1: {
                dialogues: [
                    {
                        speaker: 'Narrator',
                        text: '(Silent Storm and new messages chapter in development...)'
                    }
                ]
            }
        };
    }

    static getCycle3() { return this.getCycle2(); }
    static getCycle4() { return this.getCycle2(); }
    static getCycle5() { return this.getCycle2(); }
    static getCycle6() { return this.getCycle2(); }
    static getCycle7() { return this.getCycle2(); }
    static getCycle8() { return this.getCycle2(); }
    static getCycle9() { return this.getCycle2(); }
}

// Add to global scope
window.EnhancedDeepSkyScript_EN = EnhancedDeepSkyScript_EN;
