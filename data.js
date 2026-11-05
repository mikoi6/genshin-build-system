/* ============================================================
 * 原神角色养成系统 · 数据层
 * 说明：所有内置数据（角色/套装/武器/词条）均为只读预设，
 *       基于公开攻略整理，随游戏版本变化，此处为制作时点基线。
 * 数据版本：v2.0.1 · 2026-11-05
 * ============================================================ */

window.GENSHIN_DATA = (function () {

  /* ========== 元素 / 星级 / 武器类型 ========== */
  const ELEMENTS = ['火', '水', '风', '雷', '冰', '岩', '草'];

  /* ========== 圣遗物套装（全套装，含 2/4 件效果 + 掉落副本） ========== */
      const ARTIFACT_SETS = [
    { id: 10001, name: '行者之心', effects: { two: '攻击力提高18%。', four: '重击的暴击率提升30%。' }, domain: '' },
    { id: 10002, name: '勇士之心', effects: { two: '攻击力提高18%。', four: '对生命值高于50%的敌人，造成的伤害增加30%。' }, domain: '' },
    { id: 10003, name: '守护之心', effects: { two: '防御力提高30%。', four: '队伍里每有不同一种元素类型的自己的角色，自身获得30%相应的元素抗性。' }, domain: '' },
    { id: 10004, name: '奇迹', effects: { two: '所有元素抗性提高20%。', four: '受到某个元素类型的伤害后，相应的抗性提升30%，持续10秒。该效果每10秒只能触发一次。' }, domain: '' },
    { id: 10005, name: '战狂', effects: { two: '暴击率提高12%。', four: '生命值低于70%时，暴击率额外提升24%。' }, domain: '' },
    { id: 10006, name: '武人', effects: { two: '普通攻击与重击造成的伤害提高15%。', four: '施放元素战技后的8秒内，普通攻击和重击造成的伤害提升25%。' }, domain: '' },
    { id: 10007, name: '教官', effects: { two: '元素精通提高80点。', four: '触发元素反应后，队伍中所有角色的元素精通提高120点，持续8秒。' }, domain: '' },
    { id: 10008, name: '赌徒', effects: { two: '元素战技造成的伤害提升20%。', four: '击败敌人时，有100%概率清除元素战技的冷却时间。该效果每15秒至多触发一次。' }, domain: '' },
    { id: 10009, name: '流放者', effects: { two: '元素充能效率提高20%。', four: '施放元素爆发后，每2秒为队伍中所有角色（不包括自己）恢复2点元素能量。该效果持续6秒，无法叠加。' }, domain: '' },
    { id: 10010, name: '冒险家', effects: { two: '生命值上限提高1000点。', four: '开启各类宝箱后的5秒内，持续恢复30%生命值。' }, domain: '' },
    { id: 10011, name: '幸运儿', effects: { two: '防御力提高100点。', four: '拾取摩拉时，恢复300点生命值。' }, domain: '' },
    { id: 10012, name: '学士', effects: { two: '元素充能效率提高20%。', four: '获得元素微粒或元素晶球时，队伍中所有弓箭和法器角色额外恢复3点元素能量。该效果每3秒只能触发一次。' }, domain: '' },
    { id: 10013, name: '游医', effects: { two: '角色受到的治疗效果提高20%。', four: '施放元素爆发时，恢复20%生命值。' }, domain: '' },
    { id: 14001, name: '冰风迷途的勇士', effects: { two: '获得15%冰元素伤害加成。', four: '攻击处于冰元素影响下的敌人时，暴击率提高20%；若敌人处于冻结状态下，则暴击率额外提高20%。' }, domain: '芬德尼尔之顶' },
    { id: 14002, name: '平息鸣雷的尊者', effects: { two: '雷元素抗性提高40%。', four: '对处于雷元素影响下的敌人造成的伤害提升35%。' }, domain: '仲夏庭园' },
    { id: 14003, name: '渡过烈火的贤人', effects: { two: '火元素抗性提高40%。', four: '对处于火元素影响下的敌人造成的伤害提升35%。' }, domain: '无妄引咎密宫' },
    { id: 14004, name: '被怜爱的少女', effects: { two: '角色造成的治疗效果提升15%。', four: '施放元素战技或元素爆发后的10秒内，队伍中所有角色受治疗效果加成提高20%。' }, domain: '铭记之谷' },
    { id: 15001, name: '角斗士的终幕礼', effects: { two: '攻击力提高18%。', four: '装备该圣遗物套装的角色为单手剑、双手剑、长柄武器角色时，角色普通攻击造成的伤害提高35%。' }, domain: '精英Boss掉落 / 圣遗物兑换' },
    { id: 15002, name: '翠绿之影', effects: { two: '获得15%风元素伤害加成。', four: '扩散反应造成的伤害提升60%，星扩散反应造成的伤害提升20%。根据扩散的元素类型，降低受到影响的敌人40%的对应元素抗性，持续10秒。对敌人触发星扩散反应时，也会降低其40%的冰元素抗性。同元素类型的抗性降低效果无法叠加。' }, domain: '铭记之谷' },
    { id: 15003, name: '流浪大地的乐团', effects: { two: '元素精通提高80点。', four: '装备该圣遗物套装的角色为法器、弓箭角色时，角色重击造成的伤害提高35%。' }, domain: '精英Boss掉落 / 圣遗物兑换' },
    { id: 15005, name: '如雷的盛怒', effects: { two: '获得15%雷元素伤害加成。', four: '超载、感电、超导、超绽放反应造成的伤害提升40%，超激化反应带来的伤害提升提高20%，月感电、星超导反应造成的伤害提升20%。触发上述元素反应或原激化反应时，元素战技冷却时间减少1秒。该效果每0.8秒最多触发一次。' }, domain: '仲夏庭园' },
    { id: 15006, name: '炽烈的炎之魔女', effects: { two: '获得15%火元素伤害加成。', four: '超载、燃烧、烈绽放反应造成的伤害提升40%，蒸发、融化反应的加成系数提高15%。施放元素战技后的10秒内，2件套的效果提高50%，该效果最多叠加3次。' }, domain: '无妄引咎密宫' },
    { id: 15007, name: '昔日宗室之仪', effects: { two: '元素爆发造成的伤害提升20%。', four: '施放元素爆发后，队伍中所有角色攻击力提升20%，持续12秒。该效果不可叠加。' }, domain: '华池岩岫' },
    { id: 15008, name: '染血的骑士道', effects: { two: '造成的物理伤害提高25%。', four: '击败敌人后的10秒内，施放重击时不消耗体力，且重击造成的伤害提升50%。' }, domain: '华池岩岫' },
    { id: 15009, name: '祭火之人', effects: { two: 'undefined', four: 'undefined' }, domain: '' },
    { id: 15010, name: '祭水之人', effects: { two: 'undefined', four: 'undefined' }, domain: '' },
    { id: 15011, name: '祭雷之人', effects: { two: 'undefined', four: 'undefined' }, domain: '' },
    { id: 15013, name: '祭冰之人', effects: { two: 'undefined', four: 'undefined' }, domain: '' },
    { id: 15014, name: '悠古的磐岩', effects: { two: '获得15%岩元素伤害加成。', four: '获得结晶反应形成的晶片或触发月结晶反应时，队伍中所有角色获得35%对应元素伤害加成，持续10秒。同时只能通过该效果获得一种元素伤害加成。' }, domain: '孤云凌霄之处' },
    { id: 15015, name: '逆飞的流星', effects: { two: '护盾强效提高35%。', four: '处于护盾庇护下时，额外获得40%普通攻击和重击伤害加成。' }, domain: '孤云凌霄之处' },
    { id: 15016, name: '沉沦之心', effects: { two: '获得15%水元素伤害加成。', four: '施放元素战技后的15秒内，普通攻击与重击造成的伤害提高30%。' }, domain: '芬德尼尔之顶' },
    { id: 15017, name: '千岩牢固', effects: { two: '生命值提升20%。', four: '元素战技命中敌人后，使队伍中附近的所有角色攻击力提升20%，护盾强效提升30%，持续3秒。该效果每0.5秒至多触发一次。装备此圣遗物套装的角色处于队伍后台时，依然能触发该效果。' }, domain: '山脊守望' },
    { id: 15018, name: '苍白之火', effects: { two: '造成的物理伤害提高25%。', four: '元素战技命中敌人后，攻击力提升9%。该效果持续7秒，至多叠加2层，每0.3秒至多触发一次。叠满2层时，2件套的效果提升100%。' }, domain: '山脊守望' },
    { id: 15019, name: '追忆之注连', effects: { two: '攻击力提高18%。', four: '施放元素战技时，如果角色的元素能量高于或等于15点，则会流失15点元素能量，使接下来的10秒内，普通攻击、重击、下落攻击造成的伤害提高50%，持续期间内该效果不会再次触发。' }, domain: '椛染之庭' },
    { id: 15020, name: '绝缘之旗印', effects: { two: '元素充能效率提高20%。', four: '基于元素充能效率的25%，提高元素爆发造成的伤害。至多通过这种方式获得75%提升。' }, domain: '椛染之庭' },
    { id: 15021, name: '华馆梦醒形骸记', effects: { two: '防御力提高30%。', four: '装备此圣遗物套装的角色在以下情况下，将获得「问答」效果：在场上用岩元素攻击命中敌人后获得一层，每0.3秒至多触发一次；在队伍后台中，每3秒获得一层。问答至多叠加4层，每层能提供6%防御力与6%岩元素伤害加成。每6秒，若未获得问答效果，将损失一层。' }, domain: '沉眠之庭' },
    { id: 15022, name: '海染砗磲', effects: { two: '治疗加成提高15%。', four: '装备此圣遗物套装的角色对队伍中的角色进行治疗时，将产生持续3秒的海染泡沫，记录治疗的生命值回复量（包括溢出值）。持续时间结束时，海染泡沫将会爆炸，对周围的敌人造成90%累计回复量的伤害（该伤害结算方式同感电、超导等元素反应，但不受元素精通、等级或反应伤害加成效果影响）。每3.5秒至多产生一个海染泡沫；海染泡沫至多记录30000点回复量，含溢出部分的治疗量；自己的队伍中同时至多存在一个海染泡沫。装备此圣遗物套装的角色处于队伍后台时，依然能触发该效果。' }, domain: '沉眠之庭' },
    { id: 15023, name: '辰砂往生录', effects: { two: '攻击力提高18%。', four: '施放元素爆发后，将产生持续16秒的「潜光」效果：攻击力提升8%；并在角色的生命值降低时，攻击力进一步提升10%，至多通过这种方式提升4次，每0.8秒至多触发一次。「潜光」效果将在角色退场时消失；持续期间再次施放元素爆发，将移除原有的「潜光」。' }, domain: '层岩巨渊秘境' },
    { id: 15024, name: '来歆余响', effects: { two: '攻击力提高18%。', four: '普通攻击命中敌人时，有36%概率触发「幽谷祝祀」：普通攻击造成的伤害提高，伤害提高值为攻击力的70%，该效果将在普通攻击造成伤害后的0.05秒后清除。普通攻击未触发「幽谷祝祀」时，会使下次触发概率提升20%；0.2秒内至多判定1次触发与否。' }, domain: '层岩巨渊秘境' },
    { id: 15025, name: '深林的记忆', effects: { two: '获得15%草元素伤害加成。', four: '元素战技或元素爆发命中敌人后，使命中目标的草元素抗性降低30%，持续8秒。装备者处于队伍后台时，依然能触发该效果。' }, domain: '缘觉塔' },
    { id: 15026, name: '饰金之梦', effects: { two: '元素精通提高80点。', four: '触发元素反应后的8秒内，会根据队伍内其他角色的元素类型，使装备者获得强化：队伍中每存在1个和装备者同类元素的角色，攻击力提升14%；每存在1个和装备者不同元素类型的角色，元素精通提升50点。上述每类效果至多计算3个角色。该效果每8秒至多触发一次。装备者处于队伍后台时，依然能触发该效果。' }, domain: '缘觉塔' },
    { id: 15027, name: '沙上楼阁史话', effects: { two: '获得15%风元素伤害加成。', four: '重击命中敌人后，该角色的普通攻击速度提升10%，普通攻击、重击与下落攻击造成的伤害提升40%，持续15秒。' }, domain: '净罪之井' },
    { id: 15028, name: '乐园遗落之花', effects: { two: '元素精通提高80点。', four: '装备者绽放、超绽放、烈绽放反应造成的伤害提升40%，造成的月绽放反应伤害提升10%。此外，装备者触发绽放、超绽放、烈绽放、月绽放后，上述效果带来的加成提升25%，该效果持续10秒，至多叠加4次，每1秒至多触发一次。装备者处于队伍后台时依然能触发该效果。' }, domain: '净罪之井' },
    { id: 15029, name: '水仙之梦', effects: { two: '获得15%水元素伤害加成。', four: '普通攻击、重击、下落攻击、元素战技或元素爆发命中敌人后，将产生1层持续8秒的「镜中水仙」效果。处于1/2/3层及以上「镜中水仙」效果下时，攻击力将提高7%/16%/25%，水元素伤害加成提升4%/9%/15%。由普通攻击、重击、下落攻击、元素战技或元素爆发产生的「镜中水仙」将分别独立存在。' }, domain: '罪祸的终末' },
    { id: 15030, name: '花海甘露之光', effects: { two: '生命值提升20%。', four: '元素战技与元素爆发造成的伤害提升10%；装备者受到伤害后的5秒内，上述伤害提升效果提高80%，该提高效果至多叠加5层，每层持续时间独立计算，处于队伍后台时依然能触发该效果。' }, domain: '罪祸的终末' },
    { id: 15031, name: '逐影猎人', effects: { two: '普通攻击与重击造成的伤害提高15%。', four: '当前生命值提升或降低时，暴击率提升12%，该效果持续5秒，至多叠加3次。' }, domain: '深潮的余响' },
    { id: 15032, name: '黄金剧团', effects: { two: '元素战技造成的伤害提升20%。', four: '元素战技造成的伤害提升25%；此外，处于队伍后台时，元素战技造成的伤害还将进一步提升25%，该效果将在登场后2秒移除。' }, domain: '深潮的余响' },
    { id: 15033, name: '昔时之歌', effects: { two: '治疗加成提高15%。', four: '装备者对队伍中的角色进行治疗时，将产生持续6秒的渴盼效果，记录治疗的生命值回复量（包括溢出值）。持续时间结束时，渴盼效果将转变为「彼时的浪潮」效果：队伍中自己的当前场上角色的普通攻击、重击、下落攻击、元素战技与元素爆发命中敌人时，将基于渴盼效果所记录的回复量的8%提高造成的伤害，「彼时的浪潮」将在生效5次或10秒后移除。一次渴盼效果至多记录15000点回复量，同时至多存在一个，能够记录多个装备者的产生的回复量；装备者处于队伍后台时，依然能触发该效果。' }, domain: '临瀑之城' },
    { id: 15034, name: '回声之林夜话', effects: { two: '攻击力提高18%。', four: '施放元素战技后的10秒内，岩元素伤害加成提升20%；若处于结晶反应产生的护盾庇护下，或附近存在月结晶反应产生的月笼，上述效果提高150%，进一步提高的效果将在不满足上述条件的1秒后移除。' }, domain: '临瀑之城' },
    { id: 15035, name: '谐律异想断章', effects: { two: '攻击力提高18%。', four: '生命之契的数值提升或降低时，角色造成的伤害提升18%，该效果持续6秒，至多叠加3次。' }, domain: '褪色的剧场' },
    { id: 15036, name: '未竟的遐思', effects: { two: '攻击力提高18%。', four: '脱离战斗状态3秒后，造成的伤害提升50%。在战斗状态下，附近不存在处于燃烧状态下的敌人超过6秒后，上述伤害提升效果每秒降低10%，直到降低至0%；存在处于燃烧状态下的敌人时，每秒提升10%，直到达到50%。装备此圣遗物套装的角色处于队伍后台时，依然会触发该效果。' }, domain: '褪色的剧场' },
    { id: 15037, name: '烬城勇者绘卷', effects: { two: '队伍中附近的角色触发「夜魂迸发」时，装备者恢复6点元素能量。', four: '装备者触发其对应元素类型的相关反应后，队伍中附近的所有角色的该元素反应相关的元素伤害加成提升12%，持续15秒。若触发该效果时，装备者处于夜魂加持状态下，还将使队伍中附近的所有角色的与该元素反应相关的元素伤害加成提升28%，持续20秒。装备者处于后台时也能触发上述效果。同名圣遗物套装产生的伤害加成效果无法叠加。' }, domain: '' },
    { id: 15038, name: '黑曜秘典', effects: { two: '装备者处于夜魂加持状态，并且在场上时，造成的伤害提高15%。', four: '装备者在场上消耗1点夜魂值后，暴击率提高40%，持续6秒。该效果每1秒至多触发一次。' }, domain: '' },
    { id: 15039, name: '长夜之誓', effects: { two: '下落攻击造成的伤害提升25%。', four: '装备者的下落攻击/重击/元素战技命中敌人后，获得1/2/2层「永照的流辉」，由下落攻击、重击或元素战技产生的该效果分别每1秒至多触发一次。永照的流辉：下落攻击造成的伤害提升15%，持续6秒，至多叠加5层，每层持续时间独立计算。' }, domain: '' },
    { id: 15040, name: '深廊终曲', effects: { two: '获得15%冰元素伤害加成。', four: '装备者的元素能量为0时，普通攻击造成的伤害提升60%，元素爆发造成的伤害提升60%。装备者的普通攻击造成伤害后，上述元素爆发伤害提升效果将失效6秒；装备者的元素爆发造成伤害后，上述普通攻击伤害提升效果将失效6秒。角色处于队伍后台也能触发。' }, domain: '' },
    { id: 15041, name: '穹境示现之夜', effects: { two: '元素精通提高80点。', four: '队伍中附近的角色触发月曜反应时，若装备者在场上，将获得持续4秒的「月辉明光·蓄念」效果：队伍的月兆为初辉/满辉时，暴击率提升15%/30%。队伍中的角色每拥有一种不同的「月辉明光」效果，队伍中的所有角色触发的月曜反应造成的伤害提升10%。由「月辉明光」产生的效果无法叠加。' }, domain: '' },
    { id: 15042, name: '纺月的夜歌', effects: { two: '元素充能效率提高20%。', four: '造成元素伤害时，获得持续8秒的「月辉明光·崇信」效果：队伍的月兆为初辉/满辉时，队伍中的所有角色的元素精通提高60点/120点。装备者处于后台时也能触发上述效果。队伍中的角色每拥有一种不同的「月辉明光」效果，队伍中的所有角色触发的月曜反应造成的伤害提升10%。由「月辉明光」产生的效果无法叠加。' }, domain: '' },
    { id: 15043, name: '晨星与月的晓歌', effects: { two: '元素精通提高80点。', four: '装备者处于队伍后台时，造成的月曜反应伤害提升20%；队伍的月兆等级至少为满辉时，造成的月曜反应伤害进一步提升40%。上述效果将在装备者位于场上3秒后移除。' }, domain: '' },
    { id: 15044, name: '风起之日', effects: { two: '攻击力提高18%。', four: '普通攻击、重击、元素战技或元素爆发命中敌人后，将获得持续6秒的「风与牧歌的眷怜」：攻击力提高25%。若装备者已经完成了「魔女的课业」，则「风与牧歌的眷怜」将会升级为「风与牧歌的决意」，额外使通过考验的装备者的暴击率提升20%。装备者处于队伍后台时，也能触发上述效果。' }, domain: '' },
    { id: 15045, name: '天之美赐', effects: { two: '元素充能效率提高20%。', four: '若装备者已经完成了魔女的课业，则施放元素战技后，会获得「天光之引」效果：依据装备者的元素类型，使队伍中附近的所有角色获得20%对应元素伤害加成，持续20秒。装备者处于后台时也能触发上述效果，同名圣遗物套装产生的伤害加成效果无法叠加。 ·队伍拥有「魔导·秘仪」效果时，「天光之引」效果将会升级为「凡世颂歌」，除装备者的元素类型外，还会依据队伍中自己的当前场上角色的元素类型，使队伍中附近的所有角色获得对应元素伤害加成，且上述两种元素伤害加成提升至40%，同元素类型的元素伤害加成效果无法叠加。' }, domain: '' },
    { id: 15046, name: '影中沉凝的幻灭', effects: { two: '攻击力提高18%。', four: '超导反应造成的伤害提升80%，星超导反应造成的伤害提升40%；装备者攻击受到超导或星超导反应影响的敌人时，本次攻击的暴击率提高16%。' }, domain: '' },
    { id: 15047, name: '血红之证', effects: { two: '攻击力提高18%。', four: '装备者触发星扩散反应后的10秒内，暴击率提升16%，星扩散反应伤害提升40%。' }, domain: '' },
    { id: 15048, name: '炉火融炼之心', effects: { two: '攻击力提高18%。', four: '装备者触发星烁反应或造成星烁反应伤害后的12秒内，攻击力提升12%，队伍中附近的所有角色造成的星烁反应伤害提升50%。装备者处于后台时也能触发上述效果。同名圣遗物套装产生的伤害加成效果无法叠加。' }, domain: '' },
  ];

  /* ========== 武器（主流，含类型/星级/说明） ========== */
  const WEAPONS = {
    // 单手剑
    '祭礼剑': { type: '单手剑', rarity: 4, note: '元素战技造成伤害时概率重置CD，充能循环核心' },
    '西风剑': { type: '单手剑', rarity: 4, note: '暴击时概率产生元素微粒，团队充能' },
    '腐殖之剑': { type: '单手剑', rarity: 4, note: '元素战技伤害与暴击率提升（活动限定）' },
    '黑剑': { type: '单手剑', rarity: 4, note: '普攻/重击伤害+20%，暴击时回血（纪行）' },
    '铁蜂刺': { type: '单手剑', rarity: 4, note: '元素精通+165，适合精通流' },
    '匣里龙吟': { type: '单手剑', rarity: 4, note: '对火/雷影响下敌人伤害提升' },
    '黎明神剑': { type: '单手剑', rarity: 3, note: '生命高于90%时暴击率+28%，性价比极高' },
    '雾切之回光': { type: '单手剑', rarity: 5, note: '暴伤副词条，叠层增伤，输出单手剑毕业' },
    '磐岩结绿': { type: '单手剑', rarity: 5, note: '暴击率副词条，按生命转攻击' },
    '斫峰之刃': { type: '单手剑', rarity: 5, note: '攻击副词条，叠层护盾增攻' },
    // 双手剑
    '螭骨剑': { type: '双手剑', rarity: 4, note: '暴击率副词条，站场叠层增伤（纪行）' },
    '狼的末路': { type: '双手剑', rarity: 5, note: '攻击副词条，团队攻击加成' },
    '赤角石溃杵': { type: '双手剑', rarity: 5, note: '暴伤副词条，防御转普攻伤害' },
    '苇海信标': { type: '双手剑', rarity: 5, note: '暴击率副词条，生命转攻击' },
    // 长柄武器
    '决斗之枪': { type: '长柄武器', rarity: 4, note: '暴击率副词条，单挑加攻（纪行）' },
    '护摩之杖': { type: '长柄武器', rarity: 5, note: '暴伤副词条，生命转攻击，低血增伤' },
    '和璞鸢': { type: '长柄武器', rarity: 5, note: '暴击率副词条，叠层增伤' },
    '千岩长枪': { type: '长柄武器', rarity: 4, note: '攻击副词条，队伍璃月角色越多加成越高' },
    // 法器
    '天空之卷': { type: '法器', rarity: 5, note: '攻击副词条，元素伤害加成' },
    '四风原典': { type: '法器', rarity: 5, note: '暴击率副词条，站场叠元素伤害' },
    '流浪乐章': { type: '法器', rarity: 4, note: '暴伤副词条，出场触发随机强力buff' },
    '试作金珀': { type: '法器', rarity: 4, note: '生命副词条，回能回血，辅助通用' },
    '祭礼残章': { type: '法器', rarity: 4, note: '精通副词条，元素战技重置' },
    '千夜浮梦': { type: '法器', rarity: 5, note: '精通副词条，按队伍元素类型加精通/增伤' },
    // 弓
    '绝弦': { type: '弓', rarity: 4, note: '精通副词条，元素战技/爆发伤害+24%' },
    '祭礼弓': { type: '弓', rarity: 4, note: '充能副词条，元素战技重置' },
    '西风猎弓': { type: '弓', rarity: 4, note: '充能副词条，暴击产微粒' },
    '天空之翼': { type: '弓', rarity: 5, note: '暴击率副词条，暴伤与额外伤害' },
    '阿莫斯之弓': { type: '弓', rarity: 5, note: '攻击副词条，普攻重击增伤' },
    '终末嗟叹之诗': { type: '弓', rarity: 5, note: '充能副词条，触发后全队攻击+精通（辅助弓毕业）' },
  };

  /* ========== 副词条池（供评分权重与录入提示） ========== */
  const SUBSTAT_KEYS = [
    '暴击率', '暴击伤害', '攻击%', '攻击力', '生命%', '生命值',
    '防御%', '防御力', '元素精通', '元素充能效率'
  ];

  /* ========== 主词条池（按部位） ========== */
  const MAINSTAT_POOL = {
    flower: ['生命值'],                       // 生之花
    plume: ['攻击力'],                        // 死之羽
    sands: ['攻击%', '生命%', '防御%', '元素精通', '元素充能效率'],   // 时之沙
    goblet: ['攻击%', '生命%', '防御%', '元素精通', '火伤加成', '水伤加成', '风伤加成', '雷伤加成', '冰伤加成', '岩伤加成', '草伤加成', '物理伤害加成'], // 空之杯
    circlet: ['攻击%', '生命%', '防御%', '元素精通', '暴击率', '暴击伤害', '治疗加成'], // 理之冠
  };

  /* ========== 角色（尽量全角色，按配队方案组织） ========== */
  /* 数据结构说明：
   * 每个角色的 teamBuilds 数组，承载「配队方案」，
   * 配装/武器/天赋都挂在配队方案下，以解决「不同配队配装不同」。
   */
  const CHARACTERS = [
    /* ===== 火系 ===== */
    {
      id: 'hutao', name: '胡桃', element: '火', rarity: 5, weapon: '长柄武器',
      teamBuilds: [
        {
          name: '蒸发主C（胡行钟）', role: '主C',
          teammates: ['行秋', '钟离', '夜兰/万叶'],
          strategy: '胡桃低血高攻，靠行秋/夜兰挂水打蒸发，钟离提供护盾保证低血站场安全。开E后重击为主要输出。',
          artifact: { setIds: ['炽烈的炎之魔女'], type: '4件套', mainStats: { sands: '生命%', goblet: '火伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '元素精通', '生命%'] },
          weapon: { primary: [{ name: '护摩之杖', note: '生命转攻击，完美契合' }], alternatives: [{ name: '决斗之枪', note: '暴击率下位' }, { name: '匣里灭辰', note: '对水火附着增伤，蒸发契合' }] },
          talents: { priority: ['A', 'E', 'Q'], goal: { A: 9, E: 9, Q: 9 } }
        },
        {
          name: '融化主C（胡桃冰）', role: '主C',
          teammates: ['凯亚/罗莎莉亚', '莱依拉', '砂糖'],
          strategy: '冰系挂冰打融化，伤害上限更高但对元素附着要求严格，偏进阶玩法。',
          artifact: { setIds: ['炽烈的炎之魔女'], type: '4件套', mainStats: { sands: '元素精通', goblet: '火伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['元素精通', '暴击率', '暴击伤害', '生命%'] },
          weapon: { primary: [{ name: '护摩之杖', note: '' }], alternatives: [{ name: '决斗之枪', note: '' }] },
          talents: { priority: ['A', 'E', 'Q'], goal: { A: 9, E: 9, Q: 8 } }
        }
      ]
    },
    {
      id: 'xiangling', name: '香菱', element: '火', rarity: 4, weapon: '长柄武器',
      teamBuilds: [
        {
          name: '国家队（蒸发副C）', role: '副C',
          teammates: ['班尼特', '行秋', '重云/万叶'],
          strategy: '香菱大招脱手持续挂火，配合行秋打蒸发。充能靠班尼特产球循环。核心是「绝缘四件套+充能沙」保证大招无缝。',
          artifact: { setIds: ['绝缘之旗印'], type: '4件套', mainStats: { sands: '元素充能效率', goblet: '火伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '攻击%', '元素充能效率'] },
          weapon: { primary: [{ name: '渔获', note: '充能副词条+大招增伤，免费毕业' }], alternatives: [{ name: '西风长枪', note: '充能下位' }, { name: '决斗之枪', note: '暴击率，缺充能时需堆' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 9, E: 9, A: 1 } }
        }
      ]
    },
    {
      id: 'bennett', name: '班尼特', element: '火', rarity: 4, weapon: '单手剑',
      teamBuilds: [
        {
          name: '增伤辅助（万能拐）', role: '辅助',
          teammates: ['任意主C', '香菱', '行秋'],
          strategy: '大招圈内加攻击力并回血，是全游戏最泛用的增伤辅助。堆生命与充能，保证大招覆盖率。',
          artifact: { setIds: ['昔日宗室之仪'], type: '4件套', mainStats: { sands: '元素充能效率', goblet: '生命%', circlet: '治疗加成' }, subStats: ['元素充能效率', '生命%', '攻击%'] },
          weapon: { primary: [{ name: '天空之刃', note: '充能+高白值' }], alternatives: [{ name: '西风剑', note: '充能向' }, { name: '腐殖之剑', note: '战技增伤，活动限定' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 10, E: 6, A: 1 } }
        }
      ]
    },
    {
      id: 'diluc', name: '迪卢克', element: '火', rarity: 5, weapon: '双手剑',
      teamBuilds: [
        {
          name: '蒸发主C', role: '主C',
          teammates: ['行秋', '班尼特', '万叶/钟离'],
          strategy: '迪卢克三段E+普攻穿插打蒸发，行秋挂水，班尼特增伤。',
          artifact: { setIds: ['炽烈的炎之魔女'], type: '4件套', mainStats: { sands: '攻击%', goblet: '火伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '攻击%', '元素精通'] },
          weapon: { primary: [{ name: '狼的末路', note: '' }], alternatives: [{ name: '螭骨剑', note: '暴击率，性价比高' }] },
          talents: { priority: ['E', 'A', 'Q'], goal: { E: 9, A: 9, Q: 9 } }
        }
      ]
    },
    {
      id: 'yoimiya', name: '宵宫', element: '火', rarity: 5, weapon: '弓',
      teamBuilds: [
        {
          name: '蒸发主C', role: '主C',
          teammates: ['行秋/夜兰', '钟离', '班尼特'],
          strategy: '宵宫站场普攻速射，夜兰挂水打蒸发，钟离护盾防打断。',
          artifact: { setIds: ['追忆之注连'], type: '4件套', mainStats: { sands: '攻击%', goblet: '火伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '攻击%', '元素精通'] },
          weapon: { primary: [{ name: '阿莫斯之弓', note: '重击流可用' }, { name: '天空之翼', note: '暴击率' }], alternatives: [{ name: '弓藏', note: '普攻增伤，四星毕业' }] },
          talents: { priority: ['A', 'E', 'Q'], goal: { A: 9, E: 9, Q: 6 } }
        }
      ]
    },

    /* ===== 水系 ===== */
    {
      id: 'xingqiu', name: '行秋', element: '水', rarity: 4, weapon: '单手剑',
      teamBuilds: [
        {
          name: '挂水副C（蒸发队）', role: '副C',
          teammates: ['胡桃/宵宫/香菱', '班尼特', '任意'],
          strategy: '行秋大招脱手挂水，是蒸发队核心挂水位。祭礼剑双E保证充能，副C兼顾输出。',
          artifact: { setIds: ['绝缘之旗印'], type: '4件套', mainStats: { sands: '元素充能效率', goblet: '水伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['元素充能效率', '暴击率', '暴击伤害', '攻击%'] },
          weapon: { primary: [{ name: '祭礼剑', note: '双E充能循环核心' }], alternatives: [{ name: '西风剑', note: '充能下位' }, { name: '腐殖之剑', note: '输出向' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 9, E: 9, A: 1 } }
        },
        {
          name: '纯输出副C（低充能需求队）', role: '副C',
          teammates: ['雷神', '夜兰', '任意'],
          strategy: '队友提供大量充能时，行秋可降低充能需求，转堆攻击输出。',
          artifact: { setIds: ['沉沦之心'], type: '2+2', mainStats: { sands: '攻击%', goblet: '水伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '攻击%', '元素充能效率'] },
          weapon: { primary: [{ name: '祭礼剑', note: '' }], alternatives: [{ name: '磐岩结绿', note: '五星输出' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 9, E: 9, A: 1 } }
        }
      ]
    },
    {
      id: 'yelan', name: '夜兰', element: '水', rarity: 5, weapon: '弓',
      teamBuilds: [
        {
          name: '副C（生命增伤拐）', role: '副C',
          teammates: ['胡桃', '宵宫', '任意主C'],
          strategy: '夜兰大招脱手挂水+增伤，生命值转伤害，泛用性极强的五星副C。',
          artifact: { setIds: ['绝缘之旗印'], type: '4件套', mainStats: { sands: '生命%', goblet: '水伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '生命%', '元素充能效率'] },
          weapon: { primary: [{ name: '若水', note: '生命副词条，毕业' }], alternatives: [{ name: '终末嗟叹之诗', note: '辅助向' }, { name: '西风猎弓', note: '充能下位' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 9, E: 8, A: 1 } }
        }
      ]
    },
    {
      id: 'kokomi', name: '珊瑚宫心海', element: '水', rarity: 5, weapon: '法器',
      teamBuilds: [
        {
          name: '治疗/挂水辅助', role: '辅助',
          teammates: ['甘雨/绫华', '申鹤', '万叶'],
          strategy: '心海水母持续挂水+治疗，是冻结队与永冻队优质挂水位，堆生命保证治疗。',
          artifact: { setIds: ['千岩牢固'], type: '4件套', mainStats: { sands: '生命%', goblet: '生命%', circlet: '治疗加成' }, subStats: ['生命%', '元素充能效率', '元素精通'] },
          weapon: { primary: [{ name: '试作金珀', note: '回能回血' }], alternatives: [{ name: '不灭月华', note: '生命副词条' }] },
          talents: { priority: ['E', 'Q', 'A'], goal: { E: 9, Q: 8, A: 1 } }
        }
      ]
    },

    /* ===== 风系 ===== */
    {
      id: 'kazuha', name: '枫原万叶', element: '风', rarity: 5, weapon: '单手剑',
      teamBuilds: [
        {
          name: '增伤减抗辅助（万金油）', role: '辅助',
          teammates: ['任意元素主C', '任意', '任意'],
          strategy: '万叶核心是「扩散减抗+精通转增伤」，全堆元素精通，几乎所有元素队都能用。',
          artifact: { setIds: ['翠绿之影'], type: '4件套', mainStats: { sands: '元素精通', goblet: '元素精通', circlet: '元素精通' }, subStats: ['元素精通', '元素充能效率', '攻击%'] },
          weapon: { primary: [{ name: '苍古自由之誓', note: '精通+全队增伤' }], alternatives: [{ name: '铁蜂刺', note: '精通，平民毕业' }, { name: '祭礼剑', note: '双E聚怪' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 8, E: 8, A: 1 } }
        }
      ]
    },
    {
      id: 'venti', name: '温迪', element: '风', rarity: 5, weapon: '弓',
      teamBuilds: [
        {
          name: '聚怪辅助', role: '辅助',
          teammates: ['任意', '任意', '任意'],
          strategy: '温迪大招强力聚怪+持续元素转化，对群能力极强，对单略乏力。堆充能与精通。',
          artifact: { setIds: ['翠绿之影'], type: '4件套', mainStats: { sands: '元素充能效率', goblet: '元素精通', circlet: '元素精通' }, subStats: ['元素精通', '元素充能效率', '攻击%'] },
          weapon: { primary: [{ name: '终末嗟叹之诗', note: '全队增伤' }], alternatives: [{ name: '绝弦', note: '精通/爆发增伤' }, { name: '西风猎弓', note: '充能' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 9, E: 6, A: 1 } }
        }
      ]
    },
    {
      id: 'sucrose', name: '砂糖', element: '风', rarity: 4, weapon: '法器',
      teamBuilds: [
        {
          name: '精通拐/减抗辅助', role: '辅助',
          teammates: ['任意反应主C', '任意', '任意'],
          strategy: '砂糖给全队加元素精通+扩散减抗，是平民版万叶，堆精通即可。',
          artifact: { setIds: ['翠绿之影'], type: '4件套', mainStats: { sands: '元素精通', goblet: '元素精通', circlet: '元素精通' }, subStats: ['元素精通', '元素充能效率'] },
          weapon: { primary: [{ name: '祭礼残章', note: '精通' }], alternatives: [{ name: '万国诸海图谱', note: '精通' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 6, E: 6, A: 1 } }
        }
      ]
    },

    /* ===== 雷系 ===== */
    {
      id: 'raiden', name: '雷电将军', element: '雷', rarity: 5, weapon: '长柄武器',
      teamBuilds: [
        {
          name: '主C/站场（雷国）', role: '主C',
          teammates: ['香菱', '班尼特', '行秋/夜兰'],
          strategy: '雷神开大站场充能+输出，全队循环。堆充能，充能转元素伤害加成。',
          artifact: { setIds: ['绝缘之旗印'], type: '4件套', mainStats: { sands: '元素充能效率', goblet: '雷伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['元素充能效率', '暴击率', '暴击伤害', '攻击%'] },
          weapon: { primary: [{ name: '薙草之稻光', note: '充能转攻击，毕业' }], alternatives: [{ name: '渔获', note: '免费毕业' }, { name: '和璞鸢', note: '暴击率' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 9, E: 9, A: 1 } }
        },
        {
          name: '纯辅助（充能机）', role: '辅助',
          teammates: ['任意缺充能队伍', '任意', '任意'],
          strategy: '只点E给全队加爆发伤害与充能，低练度即可进队。',
          artifact: { setIds: ['千岩牢固'], type: '4件套', mainStats: { sands: '元素充能效率', goblet: '攻击%', circlet: '攻击%' }, subStats: ['元素充能效率', '攻击%'] },
          weapon: { primary: [{ name: '西风长枪', note: '充能' }], alternatives: [{ name: '渔获', note: '' }] },
          talents: { priority: ['E', 'Q', 'A'], goal: { E: 9, Q: 1, A: 1 } }
        }
      ]
    },
    {
      id: 'fischl', name: '菲谢尔', element: '雷', rarity: 4, weapon: '弓',
      teamBuilds: [
        {
          name: '脱手副C（超载/激化）', role: '副C',
          teammates: ['赛诺', '刻晴', '任意雷/草队'],
          strategy: '奥兹脱手持续挂雷，是激化队与超载队优质副C。',
          artifact: { setIds: ['如雷的盛怒'], type: '4件套', mainStats: { sands: '攻击%', goblet: '雷伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '攻击%', '元素精通'] },
          weapon: { primary: [{ name: '天空之翼', note: '暴击率' }], alternatives: [{ name: '绝弦', note: '精通/E爆发增伤' }, { name: '祭礼弓', note: '' }] },
          talents: { priority: ['E', 'Q', 'A'], goal: { E: 9, Q: 8, A: 1 } }
        }
      ]
    },
    {
      id: 'keqing', name: '刻晴', element: '雷', rarity: 5, weapon: '单手剑',
      teamBuilds: [
        {
          name: '激化主C', role: '主C',
          teammates: ['纳西妲', '菲谢尔', '钟离/万叶'],
          strategy: '刻晴配合草系打激化，草神挂草，菲谢尔副C。',
          artifact: { setIds: ['如雷的盛怒'], type: '4件套', mainStats: { sands: '攻击%', goblet: '雷伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '攻击%', '元素精通'] },
          weapon: { primary: [{ name: '雾切之回光', note: '毕业' }], alternatives: [{ name: '黑剑', note: '普攻重击增伤' }, { name: '黎明神剑', note: '高性价比' }] },
          talents: { priority: ['A', 'Q', 'E'], goal: { A: 9, Q: 9, E: 8 } }
        }
      ]
    },

    /* ===== 冰系 ===== */
    {
      id: 'ayaka', name: '神里绫华', element: '冰', rarity: 5, weapon: '单手剑',
      teamBuilds: [
        {
          name: '永冻主C', role: '主C',
          teammates: ['心海/莫娜', '申鹤/罗莎莉亚', '万叶/温迪'],
          strategy: '绫华大招高爆发，配合冻结队保证命中。堆双暴，冰套冻结下额外暴击。',
          artifact: { setIds: ['冰风迷途的勇士'], type: '4件套', mainStats: { sands: '攻击%', goblet: '冰伤加成', circlet: '暴击伤害' }, subStats: ['暴击伤害', '攻击%', '暴击率', '元素充能效率'] },
          weapon: { primary: [{ name: '雾切之回光', note: '毕业' }], alternatives: [{ name: '磐岩结绿', note: '暴击率' }, { name: '黑剑', note: '四星' }] },
          talents: { priority: ['Q', 'A', 'E'], goal: { Q: 9, A: 9, E: 9 } }
        }
      ]
    },
    {
      id: 'ganyu', name: '甘雨', element: '冰', rarity: 5, weapon: '弓',
      teamBuilds: [
        {
          name: '融化主C', role: '主C',
          teammates: ['香菱', '班尼特', '钟离'],
          strategy: '甘雨重击蓄力箭打融化，香菱挂火，钟离护盾。',
          artifact: { setIds: ['流浪大地的乐团'], type: '4件套', mainStats: { sands: '攻击%', goblet: '冰伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '攻击%', '元素精通'] },
          weapon: { primary: [{ name: '阿莫斯之弓', note: '蓄力增伤，毕业' }], alternatives: [{ name: '试作澹月', note: '免费' }, { name: '天空之翼', note: '暴击率' }] },
          talents: { priority: ['A', 'Q', 'E'], goal: { A: 9, Q: 8, E: 6 } }
        },
        {
          name: '永冻主C', role: '主C',
          teammates: ['心海', '申鹤', '万叶'],
          strategy: '甘雨大招脱手+重击，冻结队稳定输出，冰套暴击加成。',
          artifact: { setIds: ['冰风迷途的勇士'], type: '4件套', mainStats: { sands: '攻击%', goblet: '冰伤加成', circlet: '暴击伤害' }, subStats: ['暴击伤害', '攻击%', '暴击率'] },
          weapon: { primary: [{ name: '阿莫斯之弓', note: '' }], alternatives: [{ name: '天空之翼', note: '' }] },
          talents: { priority: ['A', 'Q', 'E'], goal: { A: 9, Q: 9, E: 6 } }
        }
      ]
    },
    {
      id: 'shenhe', name: '申鹤', element: '冰', rarity: 5, weapon: '长柄武器',
      teamBuilds: [
        {
          name: '冰系增伤辅助', role: '辅助',
          teammates: ['绫华', '甘雨', '任意冰C'],
          strategy: '申鹤给冰系角色提供大量增伤（冰翎），堆攻击力，是冰队核心拐。',
          artifact: { setIds: ['昔日宗室之仪'], type: '2+2', mainStats: { sands: '攻击%', goblet: '攻击%', circlet: '攻击%' }, subStats: ['攻击%', '元素充能效率', '暴击率'] },
          weapon: { primary: [{ name: '息灾', note: '攻击，毕业' }], alternatives: [{ name: '决斗之枪', note: '暴击' }, { name: '千岩长枪', note: '攻击' }] },
          talents: { priority: ['E', 'Q', 'A'], goal: { E: 9, Q: 8, A: 1 } }
        }
      ]
    },

    /* ===== 岩系 ===== */
    {
      id: 'zhongli', name: '钟离', element: '岩', rarity: 5, weapon: '长柄武器',
      teamBuilds: [
        {
          name: '纯盾辅', role: '辅助',
          teammates: ['任意主C', '任意', '任意'],
          strategy: '钟离堆生命提供最强护盾+减抗，是几乎所有队伍的安全保障。',
          artifact: { setIds: ['千岩牢固'], type: '4件套', mainStats: { sands: '生命%', goblet: '生命%', circlet: '生命%' }, subStats: ['生命%', '元素充能效率', '暴击率'] },
          weapon: { primary: [{ name: '西风长枪', note: '充能' }], alternatives: [{ name: '黑缨枪', note: '生命，三星神器' }] },
          talents: { priority: ['E', 'Q', 'A'], goal: { E: 9, Q: 1, A: 1 } }
        },
        {
          name: '副C（攻岩暴）', role: '副C',
          teammates: ['任意岩队/需要输出的队伍', '任意', '任意'],
          strategy: '钟离兼顾盾与输出，大招砸高额岩伤，堆攻岩暴。',
          artifact: { setIds: ['千岩牢固'], type: '4件套', mainStats: { sands: '生命%', goblet: '岩伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '生命%', '攻击%'] },
          weapon: { primary: [{ name: '护摩之杖', note: '生命转攻击' }], alternatives: [{ name: '决斗之枪', note: '' }] },
          talents: { priority: ['Q', 'E', 'A'], goal: { Q: 9, E: 9, A: 1 } }
        }
      ]
    },
    {
      id: 'albedo', name: '阿贝多', element: '岩', rarity: 5, weapon: '单手剑',
      teamBuilds: [
        {
          name: '脱手副C（防御流）', role: '副C',
          teammates: ['钟离', '五郎', '一斗/女仆'],
          strategy: '阿贝多E技能脱手持续岩伤，堆防御力转伤害，岩队核心副C。',
          artifact: { setIds: ['华馆梦醒形骸记'], type: '4件套', mainStats: { sands: '防御%', goblet: '岩伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['防御%', '暴击率', '暴击伤害'] },
          weapon: { primary: [{ name: '辰砂之纺锤', note: '防御转战技伤害' }], alternatives: [{ name: '黎明神剑', note: '高性价比' }] },
          talents: { priority: ['E', 'Q', 'A'], goal: { E: 9, Q: 6, A: 1 } }
        }
      ]
    },
    {
      id: 'itto', name: '荒泷一斗', element: '岩', rarity: 5, weapon: '双手剑',
      teamBuilds: [
        {
          name: '岩队主C', role: '主C',
          teammates: ['五郎', '钟离', '阿贝多'],
          strategy: '一斗开大后重击爆发，堆防御转攻击，需要五郎拐防御。',
          artifact: { setIds: ['华馆梦醒形骸记'], type: '4件套', mainStats: { sands: '防御%', goblet: '岩伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '防御%', '攻击%'] },
          weapon: { primary: [{ name: '赤角石溃杵', note: '防御转普攻，毕业' }], alternatives: [{ name: '螭骨剑', note: '暴击率' }] },
          talents: { priority: ['A', 'Q', 'E'], goal: { A: 9, Q: 9, E: 9 } }
        }
      ]
    },

    /* ===== 草系 ===== */
    {
      id: 'nahida', name: '纳西妲', element: '草', rarity: 5, weapon: '法器',
      teamBuilds: [
        {
          name: '激化/绽放辅助副C', role: '副C',
          teammates: ['任意草反应队', '任意', '任意'],
          strategy: '纳西妲大招给全队加精通，E技能持续挂草，是草系反应体系核心。',
          artifact: { setIds: ['深林的记忆'], type: '4件套', mainStats: { sands: '元素精通', goblet: '元素精通', circlet: '元素精通' }, subStats: ['元素精通', '元素充能效率', '暴击率'] },
          weapon: { primary: [{ name: '千夜浮梦', note: '精通，毕业' }], alternatives: [{ name: '祭礼残章', note: '精通' }, { name: '魔导绪论', note: '三星精通' }] },
          talents: { priority: ['E', 'Q', 'A'], goal: { E: 9, Q: 9, A: 1 } }
        }
      ]
    },
    {
      id: 'alhaitham', name: '艾尔海森', element: '草', rarity: 5, weapon: '单手剑',
      teamBuilds: [
        {
          name: '激化主C', role: '主C',
          teammates: ['纳西妲', '菲谢尔/八重', '钟离/久岐忍'],
          strategy: '海森站场打草伤+激化，堆双暴与精通。',
          artifact: { setIds: ['饰金之梦'], type: '4件套', mainStats: { sands: '元素精通', goblet: '草伤加成', circlet: '暴击率/暴击伤害' }, subStats: ['暴击率', '暴击伤害', '元素精通', '攻击%'] },
          weapon: { primary: [{ name: '裁叶萃光', note: '精通转伤害，毕业' }], alternatives: [{ name: '铁蜂刺', note: '精通' }, { name: '磐岩结绿', note: '暴击率' }] },
          talents: { priority: ['E', 'A', 'Q'], goal: { E: 9, A: 9, Q: 8 } }
        }
      ]
    },
  ];

  /* ========== Enka 导入映射表 ==========
   * 数据来源：genshin-db 5.2.15（社区数据集，已逐条核对）
   * 用途：把 Enka.Network 返回的原始数据翻译成本系统的结构
   */

      /* avatarId → [角色名, 元素, 星级, 图标文件名] · 全量 126 个角色 */
  const AVATAR_MAP = {
    10000002: ['神里绫华', '冰', 5, 'UI_AvatarIcon_Ayaka'],
    10000003: ['琴', '风', 5, 'UI_AvatarIcon_Qin'],
    10000005: ['空', '无', 5, 'UI_AvatarIcon_PlayerBoy'],
    10000006: ['丽莎', '雷', 4, 'UI_AvatarIcon_Lisa'],
    10000007: ['荧', '无', 5, 'UI_AvatarIcon_PlayerGirl'],
    10000014: ['芭芭拉', '水', 4, 'UI_AvatarIcon_Barbara'],
    10000015: ['凯亚', '冰', 4, 'UI_AvatarIcon_Kaeya'],
    10000016: ['迪卢克', '火', 5, 'UI_AvatarIcon_Diluc'],
    10000020: ['雷泽', '雷', 4, 'UI_AvatarIcon_Razor'],
    10000021: ['安柏', '火', 4, 'UI_AvatarIcon_Ambor'],
    10000022: ['温迪', '风', 5, 'UI_AvatarIcon_Venti'],
    10000023: ['香菱', '火', 4, 'UI_AvatarIcon_Xiangling'],
    10000024: ['北斗', '雷', 4, 'UI_AvatarIcon_Beidou'],
    10000025: ['行秋', '水', 4, 'UI_AvatarIcon_Xingqiu'],
    10000026: ['魈', '风', 5, 'UI_AvatarIcon_Xiao'],
    10000027: ['凝光', '岩', 4, 'UI_AvatarIcon_Ningguang'],
    10000029: ['可莉', '火', 5, 'UI_AvatarIcon_Klee'],
    10000030: ['钟离', '岩', 5, 'UI_AvatarIcon_Zhongli'],
    10000031: ['菲谢尔', '雷', 4, 'UI_AvatarIcon_Fischl'],
    10000032: ['班尼特', '火', 4, 'UI_AvatarIcon_Bennett'],
    10000033: ['达达利亚', '水', 5, 'UI_AvatarIcon_Tartaglia'],
    10000034: ['诺艾尔', '岩', 4, 'UI_AvatarIcon_Noel'],
    10000035: ['七七', '冰', 5, 'UI_AvatarIcon_Qiqi'],
    10000036: ['重云', '冰', 4, 'UI_AvatarIcon_Chongyun'],
    10000037: ['甘雨', '冰', 5, 'UI_AvatarIcon_Ganyu'],
    10000038: ['阿贝多', '岩', 5, 'UI_AvatarIcon_Albedo'],
    10000039: ['迪奥娜', '冰', 4, 'UI_AvatarIcon_Diona'],
    10000041: ['莫娜', '水', 5, 'UI_AvatarIcon_Mona'],
    10000042: ['刻晴', '雷', 5, 'UI_AvatarIcon_Keqing'],
    10000043: ['砂糖', '风', 4, 'UI_AvatarIcon_Sucrose'],
    10000044: ['辛焱', '火', 4, 'UI_AvatarIcon_Xinyan'],
    10000045: ['罗莎莉亚', '冰', 4, 'UI_AvatarIcon_Rosaria'],
    10000046: ['胡桃', '火', 5, 'UI_AvatarIcon_Hutao'],
    10000047: ['枫原万叶', '风', 5, 'UI_AvatarIcon_Kazuha'],
    10000048: ['烟绯', '火', 4, 'UI_AvatarIcon_Feiyan'],
    10000049: ['宵宫', '火', 5, 'UI_AvatarIcon_Yoimiya'],
    10000050: ['托马', '火', 4, 'UI_AvatarIcon_Tohma'],
    10000051: ['优菈', '冰', 5, 'UI_AvatarIcon_Eula'],
    10000052: ['雷电将军', '雷', 5, 'UI_AvatarIcon_Shougun'],
    10000053: ['早柚', '风', 4, 'UI_AvatarIcon_Sayu'],
    10000054: ['珊瑚宫心海', '水', 5, 'UI_AvatarIcon_Kokomi'],
    10000055: ['五郎', '岩', 4, 'UI_AvatarIcon_Gorou'],
    10000056: ['九条裟罗', '雷', 4, 'UI_AvatarIcon_Sara'],
    10000057: ['荒泷一斗', '岩', 5, 'UI_AvatarIcon_Itto'],
    10000058: ['八重神子', '雷', 5, 'UI_AvatarIcon_Yae'],
    10000059: ['鹿野院平藏', '风', 4, 'UI_AvatarIcon_Heizo'],
    10000060: ['夜兰', '水', 5, 'UI_AvatarIcon_Yelan'],
    10000061: ['绮良良', '草', 4, 'UI_AvatarIcon_Momoka'],
    10000062: ['埃洛伊', '冰', 5, 'UI_AvatarIcon_Aloy'],
    10000063: ['申鹤', '冰', 5, 'UI_AvatarIcon_Shenhe'],
    10000064: ['云堇', '岩', 4, 'UI_AvatarIcon_Yunjin'],
    10000065: ['久岐忍', '雷', 4, 'UI_AvatarIcon_Shinobu'],
    10000066: ['神里绫人', '水', 5, 'UI_AvatarIcon_Ayato'],
    10000067: ['柯莱', '草', 4, 'UI_AvatarIcon_Collei'],
    10000068: ['多莉', '雷', 4, 'UI_AvatarIcon_Dori'],
    10000069: ['提纳里', '草', 5, 'UI_AvatarIcon_Tighnari'],
    10000070: ['妮露', '水', 5, 'UI_AvatarIcon_Nilou'],
    10000071: ['赛诺', '雷', 5, 'UI_AvatarIcon_Cyno'],
    10000072: ['坎蒂丝', '水', 4, 'UI_AvatarIcon_Candace'],
    10000073: ['纳西妲', '草', 5, 'UI_AvatarIcon_Nahida'],
    10000074: ['莱依拉', '冰', 4, 'UI_AvatarIcon_Layla'],
    10000075: ['流浪者', '风', 5, 'UI_AvatarIcon_Wanderer'],
    10000076: ['珐露珊', '风', 4, 'UI_AvatarIcon_Faruzan'],
    10000077: ['瑶瑶', '草', 4, 'UI_AvatarIcon_Yaoyao'],
    10000078: ['艾尔海森', '草', 5, 'UI_AvatarIcon_Alhatham'],
    10000079: ['迪希雅', '火', 5, 'UI_AvatarIcon_Dehya'],
    10000080: ['米卡', '冰', 4, 'UI_AvatarIcon_Mika'],
    10000081: ['卡维', '草', 4, 'UI_AvatarIcon_Kaveh'],
    10000082: ['白术', '草', 5, 'UI_AvatarIcon_Baizhuer'],
    10000083: ['琳妮特', '风', 4, 'UI_AvatarIcon_Linette'],
    10000084: ['林尼', '火', 5, 'UI_AvatarIcon_Liney'],
    10000085: ['菲米尼', '冰', 4, 'UI_AvatarIcon_Freminet'],
    10000086: ['莱欧斯利', '冰', 5, 'UI_AvatarIcon_Wriothesley'],
    10000087: ['那维莱特', '水', 5, 'UI_AvatarIcon_Neuvillette'],
    10000088: ['夏洛蒂', '冰', 4, 'UI_AvatarIcon_Charlotte'],
    10000089: ['芙宁娜', '水', 5, 'UI_AvatarIcon_Furina'],
    10000090: ['夏沃蕾', '火', 4, 'UI_AvatarIcon_Chevreuse'],
    10000091: ['娜维娅', '岩', 5, 'UI_AvatarIcon_Navia'],
    10000092: ['嘉明', '火', 4, 'UI_AvatarIcon_Gaming'],
    10000093: ['闲云', '风', 5, 'UI_AvatarIcon_Liuyun'],
    10000094: ['千织', '岩', 5, 'UI_AvatarIcon_Chiori'],
    10000095: ['希格雯', '水', 5, 'UI_AvatarIcon_Sigewinne'],
    10000096: ['阿蕾奇诺', '火', 5, 'UI_AvatarIcon_Arlecchino'],
    10000097: ['赛索斯', '雷', 4, 'UI_AvatarIcon_Sethos'],
    10000098: ['克洛琳德', '雷', 5, 'UI_AvatarIcon_Clorinde'],
    10000099: ['艾梅莉埃', '草', 5, 'UI_AvatarIcon_Emilie'],
    10000100: ['卡齐娜', '岩', 4, 'UI_AvatarIcon_Kachina'],
    10000101: ['基尼奇', '草', 5, 'UI_AvatarIcon_Kinich'],
    10000102: ['玛拉妮', '水', 5, 'UI_AvatarIcon_Mualani'],
    10000103: ['希诺宁', '岩', 5, 'UI_AvatarIcon_Xilonen'],
    10000104: ['恰斯卡', '风', 5, 'UI_AvatarIcon_Chasca'],
    10000105: ['欧洛伦', '雷', 4, 'UI_AvatarIcon_Olorun'],
    10000106: ['玛薇卡', '火', 5, 'UI_AvatarIcon_Mavuika'],
    10000107: ['茜特菈莉', '冰', 5, 'UI_AvatarIcon_Citlali'],
    10000108: ['蓝砚', '风', 4, 'UI_AvatarIcon_Lanyan'],
    10000109: ['梦见月瑞希', '风', 5, 'UI_AvatarIcon_Mizuki'],
    10000110: ['伊安珊', '雷', 4, 'UI_AvatarIcon_Iansan'],
    10000111: ['瓦雷莎', '雷', 5, 'UI_AvatarIcon_Varesa'],
    10000112: ['爱可菲', '冰', 5, 'UI_AvatarIcon_Escoffier'],
    10000113: ['伊法', '风', 4, 'UI_AvatarIcon_Ifa'],
    10000114: ['丝柯克', '冰', 5, 'UI_AvatarIcon_SkirkNew'],
    10000115: ['塔利雅', '水', 4, 'UI_AvatarIcon_Dahlia'],
    10000116: ['伊涅芙', '雷', 5, 'UI_AvatarIcon_Ineffa'],
    10000117: ['奇偶·男性', '无', 5, 'UI_AvatarIcon_MannequinBoy'],
    10000118: ['奇偶·女性', '无', 5, 'UI_AvatarIcon_MannequinGirl'],
    10000119: ['菈乌玛', '草', 5, 'UI_AvatarIcon_Lauma'],
    10000120: ['菲林斯', '雷', 5, 'UI_AvatarIcon_Flins'],
    10000121: ['爱诺', '水', 4, 'UI_AvatarIcon_Aino'],
    10000122: ['奈芙尔', '草', 5, 'UI_AvatarIcon_Nefer'],
    10000123: ['杜林', '火', 5, 'UI_AvatarIcon_Durin'],
    10000124: ['雅珂达', '风', 4, 'UI_AvatarIcon_Jahoda'],
    10000125: ['哥伦比娅', '水', 5, 'UI_AvatarIcon_Columbina'],
    10000126: ['兹白', '岩', 5, 'UI_AvatarIcon_Zibai'],
    10000127: ['叶洛亚', '岩', 4, 'UI_AvatarIcon_Illuga'],
    10000128: ['法尔伽', '风', 5, 'UI_AvatarIcon_Varka'],
    10000129: ['洛恩', '冰', 5, 'UI_AvatarIcon_Lohen'],
    10000130: ['莉奈娅', '岩', 5, 'UI_AvatarIcon_Linnea'],
    10000131: ['尼可', '火', 5, 'UI_AvatarIcon_Nicole'],
    10000132: ['布伦妮', '风', 4, 'UI_AvatarIcon_Prune'],
    10000133: ['桑多涅', '冰', 5, 'UI_AvatarIcon_MarionetteNew'],
    10000136: ['米提亚', '雷', 5, ''],
    10000137: ['瓦列里', '雷', 4, ''],
    10000140: ['沃雅妮莎', '水', 5, 'UI_AvatarIcon_Vodyanitsa'],
    10000143: ['薇斯纳', '风', 5, 'UI_AvatarIcon_Vesna'],
    10000148: ['阿罗夏', '雷', 4, 'UI_AvatarIcon_Alyosha'],
    10000150: ['奥黛塔', '冰', 5, 'UI_AvatarIcon_Odette'],
  };

  /* 圣遗物 setId → 套装名（注意：与角色 id 不同，套装是 1xxxx 五位数） */
      const SET_ID_MAP = {
    10001: '行者之心',
    10002: '勇士之心',
    10003: '守护之心',
    10004: '奇迹',
    10005: '战狂',
    10006: '武人',
    10007: '教官',
    10008: '赌徒',
    10009: '流放者',
    10010: '冒险家',
    10011: '幸运儿',
    10012: '学士',
    10013: '游医',
    14001: '冰风迷途的勇士',
    14002: '平息鸣雷的尊者',
    14003: '渡过烈火的贤人',
    14004: '被怜爱的少女',
    15001: '角斗士的终幕礼',
    15002: '翠绿之影',
    15003: '流浪大地的乐团',
    15005: '如雷的盛怒',
    15006: '炽烈的炎之魔女',
    15007: '昔日宗室之仪',
    15008: '染血的骑士道',
    15009: '祭火之人',
    15010: '祭水之人',
    15011: '祭雷之人',
    15013: '祭冰之人',
    15014: '悠古的磐岩',
    15015: '逆飞的流星',
    15016: '沉沦之心',
    15017: '千岩牢固',
    15018: '苍白之火',
    15019: '追忆之注连',
    15020: '绝缘之旗印',
    15021: '华馆梦醒形骸记',
    15022: '海染砗磲',
    15023: '辰砂往生录',
    15024: '来歆余响',
    15025: '深林的记忆',
    15026: '饰金之梦',
    15027: '沙上楼阁史话',
    15028: '乐园遗落之花',
    15029: '水仙之梦',
    15030: '花海甘露之光',
    15031: '逐影猎人',
    15032: '黄金剧团',
    15033: '昔时之歌',
    15034: '回声之林夜话',
    15035: '谐律异想断章',
    15036: '未竟的遐思',
    15037: '烬城勇者绘卷',
    15038: '黑曜秘典',
    15039: '长夜之誓',
    15040: '深廊终曲',
    15041: '穹境示现之夜',
    15042: '纺月的夜歌',
    15043: '晨星与月的晓歌',
    15044: '风起之日',
    15045: '天之美赐',
    15046: '影中沉凝的幻灭',
    15047: '血红之证',
    15048: '炉火融炼之心',
  };

  /* Enka 属性 ID → 本系统词条名 */
  const PROP_MAP = {
    FIGHT_PROP_HP: '生命值',
    FIGHT_PROP_HP_PERCENT: '生命%',
    FIGHT_PROP_ATTACK: '攻击力',
    FIGHT_PROP_ATTACK_PERCENT: '攻击%',
    FIGHT_PROP_DEFENSE: '防御力',
    FIGHT_PROP_DEFENSE_PERCENT: '防御%',
    FIGHT_PROP_CRITICAL: '暴击率',
    FIGHT_PROP_CRITICAL_HURT: '暴击伤害',
    FIGHT_PROP_ELEMENT_MASTERY: '元素精通',
    FIGHT_PROP_CHARGE_EFFICIENCY: '元素充能效率',
    FIGHT_PROP_HEAL_ADD: '治疗加成',
    FIGHT_PROP_PHYSICAL_ADD_HURT: '物理伤害加成',
    FIGHT_PROP_FIRE_ADD_HURT: '火伤加成',
    FIGHT_PROP_WATER_ADD_HURT: '水伤加成',
    FIGHT_PROP_WIND_ADD_HURT: '风伤加成',
    FIGHT_PROP_ELEC_ADD_HURT: '雷伤加成',
    FIGHT_PROP_ICE_ADD_HURT: '冰伤加成',
    FIGHT_PROP_ROCK_ADD_HURT: '岩伤加成',
    FIGHT_PROP_GRASS_ADD_HURT: '草伤加成',
  };

  /* Enka 装备部位 → 本系统部位 key */
  const EQUIP_TYPE_MAP = {
    EQUIP_BRACER: 'flower',
    EQUIP_NECKLACE: 'plume',
    EQUIP_SHOES: 'sands',
    EQUIP_RING: 'goblet',
    EQUIP_DRESS: 'circlet',
  };

  return {
    ELEMENTS, ARTIFACT_SETS, WEAPONS, SUBSTAT_KEYS, MAINSTAT_POOL, CHARACTERS,
    AVATAR_MAP, SET_ID_MAP, PROP_MAP, EQUIP_TYPE_MAP,
  };
})();
