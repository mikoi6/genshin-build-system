/* ============================================================
 * 原神角色养成系统 · 数据层
 * 说明：所有内置数据（角色/套装/武器/词条）均为只读预设，
 *       基于公开攻略整理，随游戏版本变化，此处为制作时点基线。
 * 数据版本：v2.0 · 2026-11-05
 * ============================================================ */

window.GENSHIN_DATA = (function () {

  /* ========== 元素 / 星级 / 武器类型 ========== */
  const ELEMENTS = ['火', '水', '风', '雷', '冰', '岩', '草'];

  /* ========== 圣遗物套装（全套装，含 2/4 件效果 + 掉落副本） ========== */
  const ARTIFACT_SETS = [
    { id: 'gladiator', name: '角斗士的终幕礼', effects: { two: '攻击力+18%', four: '装备者使用单手剑/双手剑/长柄武器时，普攻伤害+35%' }, domain: '精英Boss掉落 / 圣遗物兑换' },
    { id: 'wanderer', name: '流浪大地的乐团', effects: { two: '元素精通+80', four: '装备者使用法器/弓时，重击伤害+35%' }, domain: '精英Boss掉落 / 圣遗物兑换' },
    { id: 'thunderfury', name: '如雷的盛怒', effects: { two: '雷元素伤害加成+15%', four: '超载/感电/超导反应伤害+40%，触发反应减少元素战技CD' }, domain: '仲夏庭园' },
    { id: 'thundersoother', name: '平息鸣雷的尊者', effects: { two: '雷元素抗性+40%', four: '对雷元素影响下敌人伤害+35%' }, domain: '仲夏庭园' },
    { id: 'viridescent', name: '翠绿之影', effects: { two: '风元素伤害加成+15%', four: '扩散反应伤害+60%，降低敌人对应元素抗性40%' }, domain: '铭记之谷' },
    { id: 'maiden', name: '被怜爱的少女', effects: { two: '治疗效果+15%', four: '施放元素战技或爆发后，全队治疗加成+20%' }, domain: '铭记之谷' },
    { id: 'crimson', name: '炽烈的炎之魔女', effects: { two: '火元素伤害加成+15%', four: '超载/燃烧伤害+40%，蒸发/融化反应加成+15%，释放元素战技后2件套效果提升50%' }, domain: '无妄引咎密宫' },
    { id: 'lavawalker', name: '渡过烈火的贤人', effects: { two: '火元素抗性+40%', four: '对火元素影响下敌人伤害+35%' }, domain: '无妄引咎密宫' },
    { id: 'noblesse', name: '昔日宗室之仪', effects: { two: '元素爆发伤害+20%', four: '施放元素爆发后，全队攻击力+20%持续12秒' }, domain: '华池岩岫' },
    { id: 'bloodstained', name: '染血的骑士道', effects: { two: '物理伤害加成+25%', four: '击败敌人后10秒内重击无体力消耗且伤害+50%' }, domain: '华池岩岫' },
    { id: 'petra', name: '悠古的磐岩', effects: { two: '岩元素伤害加成+15%', four: '拾取晶片后，全队对应元素伤害+35%持续10秒' }, domain: '孤云凌霄之处' },
    { id: 'bolide', name: '逆飞的流星', effects: { two: '护盾强效+35%', four: '护盾保护下普攻/重击伤害+40%' }, domain: '孤云凌霄之处' },
    { id: 'blizzard', name: '冰风迷途的勇士', effects: { two: '冰元素伤害加成+15%', four: '对冰元素影响或冻结的敌人暴击率+20%，冻结时额外+20%' }, domain: '芬德尼尔之顶' },
    { id: 'heartofdepth', name: '沉沦之心', effects: { two: '水元素伤害加成+15%', four: '施放元素战技后15秒内普攻/重击伤害+30%' }, domain: '芬德尼尔之顶' },
    { id: 'tenacity', name: '千岩牢固', effects: { two: '生命值+20%', four: '元素战技命中敌人后，全队攻击力+20%且护盾强效+30%' }, domain: '山脊守望' },
    { id: 'paleflame', name: '苍白之火', effects: { two: '物理伤害加成+25%', four: '元素战技命中敌人后攻击力+9%叠加2次，叠满时物伤+50%' }, domain: '山脊守望' },
    { id: 'emblem', name: '绝缘之旗印', effects: { two: '元素充能效率+20%', four: '基于充能效率提升元素爆发伤害，最多75%' }, domain: '椛染之庭' },
    { id: 'shimenawa', name: '追忆之注连', effects: { two: '攻击力+18%', four: '施放元素战技后消耗15点能量，普攻/重击/下落伤害+50%' }, domain: '椛染之庭' },
    { id: 'husk', name: '华馆梦醒形骸记', effects: { two: '防御力+30%', four: '场上造成岩伤或命中后叠「问答」层，最多4层，每层防御+6%岩伤+6%' }, domain: '沉眠之庭' },
    { id: 'oceanhued', name: '海染砗磲', effects: { two: '治疗加成+15%', four: '治疗时生成泡沫，爆炸造成范围伤害' }, domain: '沉眠之庭' },
    { id: 'vermillion', name: '辰砂往生录', effects: { two: '攻击力+18%', four: '施放元素爆发后攻击力+8%，生命降低时叠层，最多+40%' }, domain: '层岩巨渊秘境' },
    { id: 'echoes', name: '来歆余响', effects: { two: '攻击力+18%', four: '普攻命中时有概率触发额外攻击力伤害' }, domain: '层岩巨渊秘境' },
    { id: 'deepwood', name: '深林的记忆', effects: { two: '草元素伤害加成+15%', four: '元素战技或爆发命中后，敌人草抗-30%' }, domain: '缘觉塔' },
    { id: 'gilded', name: '饰金之梦', effects: { two: '元素精通+80', four: '触发元素反应后，队伍中元素类型不同则攻击力+14%，相同则元素精通+50' }, domain: '缘觉塔' },
    { id: 'flowerparadise', name: '乐园遗落之花', effects: { two: '元素精通+80', four: '绽放/超绽放/烈绽放伤害+40%，叠层后+80%' }, domain: '净罪之井' },
    { id: 'desertpavilion', name: '沙上楼阁史话', effects: { two: '风元素伤害加成+15%', four: '重击命中后攻击力+10%普攻速度+10%' }, domain: '净罪之井' },
    { id: 'nymphdream', name: '水仙之梦', effects: { two: '水元素伤害加成+15%', four: '普攻/重击/下落/元素战技命中叠层，攻击力+7%水伤+4%，最多3层' }, domain: '罪祸的终末' },
    { id: 'vorukasha', name: '花海甘露之光', effects: { two: '生命值+20%', four: '元素战技与爆发伤害+10%，受到伤害后叠层+8%，最多5层' }, domain: '罪祸的终末' },
    { id: 'marechaussee', name: '逐影猎人', effects: { two: '普攻/重击伤害+15%', four: '生命值增减时暴击率+12%叠加3次' }, domain: '深潮的余响' },
    { id: 'goldentroupe', name: '黄金剧团', effects: { two: '元素战技伤害+20%', four: '元素战技伤害+25%，离场后额外+25%' }, domain: '深潮的余响' },
    { id: 'songofdays', name: '昔时之歌', effects: { two: '治疗加成+15%', four: '治疗时记录治疗量，转为后续增伤' }, domain: '临瀑之城' },
    { id: 'nighttime', name: '回声之林夜话', effects: { two: '攻击力+18%', four: '释放元素战技后，攻击力+20%' }, domain: '临瀑之城' },
    { id: 'unfinished', name: '未竟的遐思', effects: { two: '攻击力+18%', four: '脱离战斗3秒后，暴击伤害+50%' }, domain: '褪色的剧场' },
    { id: 'fragmentofharmonic', name: '谐律异想断章', effects: { two: '攻击力+18%', four: '生命之契增减时伤害+18%' }, domain: '褪色的剧场' },
    { id: 'scrollofhero', name: '烬城勇者绘卷', effects: { two: '元素战技触发夜魂时，附近队友对应元素伤害+12%', four: '触发夜魂迸发后，全队对应元素伤害+28%' }, domain: '纳塔秘境' },
    { id: 'obsidian', name: '黑曜秘典', effects: { two: '处于夜魂祝福时，伤害+15%', four: '消耗夜魂后暴击率+40%' }, domain: '纳塔秘境' },
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
          weapon: { primary: [{ name: '天空之刃', note: '充能+高白值' }], alternatives: [{ name: '西风剑', note: '充能' }, { name: '试作金珀', note: '回能（法器不可用，此处为示例占位）' }] },
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

  return {
    ELEMENTS, ARTIFACT_SETS, WEAPONS, SUBSTAT_KEYS, MAINSTAT_POOL, CHARACTERS,
  };
})();
