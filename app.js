const STORAGE_KEY = "daily-hexagram-profile";

const WEEK_LABELS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const ZODIAC_SIGNS = [
  { name: "摩羯座", start: [12, 22], end: [1, 19], trait: "重视秩序与兑现" },
  { name: "水瓶座", start: [1, 20], end: [2, 18], trait: "擅长抽离与重新定义" },
  { name: "双鱼座", start: [2, 19], end: [3, 20], trait: "感受力细腻且富有直觉" },
  { name: "白羊座", start: [3, 21], end: [4, 19], trait: "行动快，适合率先破局" },
  { name: "金牛座", start: [4, 20], end: [5, 20], trait: "稳住节奏后反而更有力" },
  { name: "双子座", start: [5, 21], end: [6, 21], trait: "通过交流激活新的可能" },
  { name: "巨蟹座", start: [6, 22], end: [7, 22], trait: "更在意安全感与情绪回响" },
  { name: "狮子座", start: [7, 23], end: [8, 22], trait: "需要在表达里找到发光位置" },
  { name: "处女座", start: [8, 23], end: [9, 22], trait: "能在细节中整理出秩序" },
  { name: "天秤座", start: [9, 23], end: [10, 23], trait: "擅长协调关系与拿捏分寸" },
  { name: "天蝎座", start: [10, 24], end: [11, 22], trait: "适合深挖问题而非表面经过" },
  { name: "射手座", start: [11, 23], end: [12, 21], trait: "需要把注意力投向更远处" }
];

const CHINESE_ZODIAC = [
  "鼠",
  "牛",
  "虎",
  "兔",
  "龙",
  "蛇",
  "马",
  "羊",
  "猴",
  "鸡",
  "狗",
  "猪"
];

const COLOR_LIBRARY = [
  { name: "曙光橘", value: "#E68A58" },
  { name: "砚石黑", value: "#2A2423" },
  { name: "云雾白", value: "#F2EDE6" },
  { name: "松针绿", value: "#617A5E" },
  { name: "浅金沙", value: "#D8B274" },
  { name: "湖影蓝", value: "#6888A6" },
  { name: "胭脂红", value: "#B95A5A" },
  { name: "岩茶棕", value: "#8C644A" }
];

const ACTION_SUGGESTIONS = [
  "把今天最重要的一件事写成一句短句，并在午前完成第一步。",
  "整理一下桌面或包里的角落，让外部秩序帮助你稳定节奏。",
  "给一个重要的人发出真诚但不过度解释的消息。",
  "留 20 分钟不被打断的时间，只做一件真正推进的事。",
  "把临时情绪写下来，再决定是否要立刻回应外界。",
  "今天适合少开分支，把能量收回到一个明确目标上。",
  "出门时穿上更有存在感的颜色，提醒自己不要缩小表达。",
  "在傍晚之前完成一次身体上的放松，比如散步或伸展。"
];

const SUMMARY_OPENERS = [
  (name, theme) => `今天你的卦象落在「${name}」：${theme}。它更像一种提醒，不是催你立刻得出结果，而是告诉你，这一天真正重要的，往往是在过程中稳住自己。`,
  (name, theme) => `你今天对应的卦象是「${name}」：${theme}。比起急着证明什么，它更像在轻轻提醒你，先把自己的节奏放回合适的位置。`,
  (name, theme) => `这一天给你的卦象是「${name}」：${theme}。`
];

const MODERN_TRANSITIONS = [
  "放到你今天的状态里，它更像在说：",
  "你会更明显地感受到：",
  ""
];

const GUIDANCE_OPENERS = [
  "今天更顺手的做法是：",
  "",
  "这卦更支持你这样去行动："
];

const CAUTION_OPENERS = [
  "这一天更需要留意的是：",
  "",
  "今天别急着这样做："
];

const HEXAGRAM_NAMES = [
  "乾", "坤", "屯", "蒙", "需", "讼", "师", "比",
  "小畜", "履", "泰", "否", "同人", "大有", "谦", "豫",
  "随", "蛊", "临", "观", "噬嗑", "贲", "剥", "复",
  "无妄", "大畜", "颐", "大过", "坎", "离", "咸", "恒",
  "遁", "大壮", "晋", "明夷", "家人", "睽", "蹇", "解",
  "损", "益", "夬", "姤", "萃", "升", "困", "井",
  "革", "鼎", "震", "艮", "渐", "归妹", "丰", "旅",
  "巽", "兑", "涣", "节", "中孚", "小过", "既济", "未济"
];

const HEXAGRAM_THEMES = [
  "以主动与创造开局", "以承接与包容稳住根基", "起步阶段先稳节奏", "先学会看清再行动",
  "等待时机并积蓄能量", "用清晰边界减少消耗", "调动资源去完成共同目标", "建立可信任的连接",
  "小幅积累能带来转机", "谨慎前行比逞强更有效", "顺势推进，适合谈合作", "卡住时先守住内核",
  "在公开表达中聚焦共识", "资源在手，关键是如何分配", "低姿态反而更容易推进", "情绪被点亮，也要防过度乐观",
  "跟随真实的牵引力", "问题需要被认真修整", "靠近机会，同时保留判断", "先观察，再决定站位",
  "用规则处理混乱", "让形式服务内容", "该舍弃的部分要及时松手", "回到起点，重新校准",
  "别被妄念拉着走", "储备越足，动作越稳", "照顾输入，也照顾表达", "承担过多时要及时减重",
  "穿过不确定，靠内在定力前进", "让热情有明确方向", "关系中的共鸣会放大感受", "把稳定做成长期习惯",
  "适当后退也是策略", "力量增长后更要有分寸", "局面开始转亮，适合推进", "外部受压时保护内在光感",
  "关系与分工需要被重新整理", "观点不同，不等于不能同行", "先处理阻力，再谈速度", "松开的瞬间会带来转机",
  "减少多余负担", "把善意投向更值得的地方", "到了需要决断的时候", "相遇来得快，保持清醒",
  "把分散的人心聚起来", "循序上升，比跃进更稳", "局限感出现时先保留气力", "回到源头重整供给",
  "更新旧逻辑，才能继续前进", "把价值重新熬出来", "突发变化提醒你调整步点", "停一下，让判断跟上脚步",
  "慢慢靠近是更稳的前进", "关系中的选择需要现实感", "能量很足，更要安排出口", "在变动中维持姿态",
  "以柔和方式渗透改变", "把愉悦感用在正向连接上", "先化开阻滞，再谈推进", "有限反而让你更清楚重点",
  "真诚会比技巧更有穿透力", "细节偏差要及时修正", "阶段完成后仍需维护", "未完成并不等于失败"
];

const HEXAGRAM_CONTENT = window.HEXAGRAM_CONTENT || {};

const HEXAGRAM_DATA = HEXAGRAM_NAMES.map((name, index) => {
  const hexagramId = index + 1;
  const theme = HEXAGRAM_THEMES[index];
  const colorA = COLOR_LIBRARY[index % COLOR_LIBRARY.length];
  const colorB = COLOR_LIBRARY[(index + 3) % COLOR_LIBRARY.length];
  const colorC = COLOR_LIBRARY[(index + 5) % COLOR_LIBRARY.length];
  const content = HEXAGRAM_CONTENT[hexagramId] || {};

  return {
    hexagramId,
    hexagramName: name,
    coreMeaning: theme,
    sourceText: content.sourceText || `《周易》${name}卦相关原典整理中。`,
    sourceInterpretation:
      content.sourceInterpretation ||
      `${name}卦的原典释义将在后续版本逐条补全，目前先保留现代整理版结果。`,
    modernSummary:
      content.modernSummary ||
      `${name}卦对应的是“${theme}”的课题。今天不是拼命向前的一天，而是要看清当下的势能，把力气放在真正能推进局面的动作上。`,
    guidance:
      content.guidance ||
      `如果你愿意尊重今天的节奏，${name}卦会提醒你把注意力放在最关键的连接点上，用更少但更准的动作推动事情。`,
    caution:
      content.caution ||
      `今天不适合被即时情绪牵着跑。${name}卦更提醒你避开逞强、分心和过度解释，先稳住判断再开口。`,
    luckyColors: [colorA, colorB, colorC],
    actionSuggestions: [
      ACTION_SUGGESTIONS[index % ACTION_SUGGESTIONS.length],
      ACTION_SUGGESTIONS[(index + 2) % ACTION_SUGGESTIONS.length]
    ]
  };
});

const dom = {
  todayDateLabel: document.getElementById("todayDateLabel"),
  todayWeekLabel: document.getElementById("todayWeekLabel"),
  profileForm: document.getElementById("profileForm"),
  birthdateInput: document.getElementById("birthdateInput"),
  profileSummary: document.getElementById("profileSummary"),
  revealButton: document.getElementById("revealButton"),
  revealHint: document.getElementById("revealHint"),
  resultSection: document.getElementById("resultSection"),
  resultIdentity: document.getElementById("resultIdentity"),
  hexagramName: document.getElementById("hexagramName"),
  hexagramTheme: document.getElementById("hexagramTheme"),
  hexagramId: document.getElementById("hexagramId"),
  overallSummary: document.getElementById("overallSummary"),
  modernReading: document.getElementById("modernReading"),
  sourceText: document.getElementById("sourceText"),
  sourceInterpretation: document.getElementById("sourceInterpretation"),
  guidanceText: document.getElementById("guidanceText"),
  cautionText: document.getElementById("cautionText"),
  luckyColorSwatch: document.getElementById("luckyColorSwatch"),
  luckyColorName: document.getElementById("luckyColorName"),
  actionSuggestion: document.getElementById("actionSuggestion"),
  resetProfileButton: document.getElementById("resetProfileButton")
};

init();

function init() {
  const today = new Date();
  renderDate(today);

  const savedProfile = readProfile();
  if (savedProfile) {
    applyProfile(savedProfile);
  } else {
    updateRevealState();
  }

  dom.profileForm.addEventListener("submit", onProfileSubmit);
  dom.revealButton.addEventListener("click", onRevealClick);
  dom.resetProfileButton.addEventListener("click", resetProfile);
}

function renderDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  dom.todayDateLabel.textContent = `${date.getFullYear()}.${month}.${day}`;
  dom.todayWeekLabel.textContent = WEEK_LABELS[date.getDay()];
}

function onProfileSubmit(event) {
  event.preventDefault();

  const birthdateValue = dom.birthdateInput.value;
  if (!birthdateValue) {
    return;
  }

  const birthdate = new Date(`${birthdateValue}T00:00:00`);
  if (!isValidBirthdate(birthdate)) {
    dom.profileSummary.textContent = "请输入有效的生日，且不能晚于今天。";
    dom.profileSummary.classList.remove("hidden");
    return;
  }

  const profile = buildProfile(birthdateValue);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  applyProfile(profile);
}

function onRevealClick() {
  const profile = readProfile();
  if (!profile) {
    updateRevealState();
    return;
  }

  const result = resolveDailyReading(profile, new Date());
  renderResult(profile, result);
}

function applyProfile(profile) {
  dom.birthdateInput.value = profile.birthdate;
  dom.profileSummary.innerHTML = `
    已为你记住生日：<strong>${profile.birthdate}</strong><br />
    自动推导属性：<strong>${profile.sign}</strong> / <strong>${profile.chineseZodiac}</strong>
  `;
  dom.profileSummary.classList.remove("hidden");
  updateRevealState(profile);
}

function updateRevealState(profile = readProfile()) {
  const hasProfile = Boolean(profile);
  dom.revealButton.disabled = !hasProfile;
  dom.revealHint.textContent = hasProfile
    ? `已识别为 ${profile.sign} · ${profile.chineseZodiac}。点击即可开启今天的卦象。`
    : "保存生日后即可开启。当天多次打开，结果会保持一致。";
}

function renderResult(profile, result) {
  dom.resultIdentity.textContent = `${profile.sign} · ${profile.chineseZodiac} · ${result.dayStemBranch}`;
  dom.hexagramName.textContent = `${result.hexagram.hexagramName}卦`;
  dom.hexagramTheme.textContent = result.hexagram.coreMeaning;
  dom.hexagramId.textContent = result.hexagram.hexagramId;
  dom.overallSummary.textContent = result.overallSummary;
  dom.sourceText.textContent = result.sourceText;
  dom.sourceInterpretation.textContent = result.sourceInterpretation;
  dom.modernReading.textContent = result.modernReading;
  dom.guidanceText.textContent = result.guidanceText;
  dom.cautionText.textContent = result.cautionText;
  dom.luckyColorSwatch.style.background = result.luckyColor.value;
  dom.luckyColorName.textContent = result.luckyColor.name;
  dom.actionSuggestion.textContent = result.actionSuggestion;
  dom.resultSection.classList.remove("hidden");
}

function resetProfile() {
  localStorage.removeItem(STORAGE_KEY);
  dom.birthdateInput.value = "";
  dom.profileSummary.classList.add("hidden");
  dom.resultSection.classList.add("hidden");
  updateRevealState(null);
}

function readProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.birthdate || !parsed.sign || !parsed.chineseZodiac) {
      return null;
    }
    return parsed;
  } catch (error) {
    return null;
  }
}

function isValidBirthdate(date) {
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date <= today;
}

function buildProfile(birthdate) {
  const [year, month, day] = birthdate.split("-").map(Number);
  return {
    birthdate,
    sign: getWesternZodiac(month, day),
    chineseZodiac: getChineseZodiac(year),
    zodiacTrait: getWesternZodiacTrait(month, day)
  };
}

function getWesternZodiac(month, day) {
  return ZODIAC_SIGNS.find((sign) => inRange(month, day, sign.start, sign.end)).name;
}

function getWesternZodiacTrait(month, day) {
  return ZODIAC_SIGNS.find((sign) => inRange(month, day, sign.start, sign.end)).trait;
}

function inRange(month, day, start, end) {
  const target = month * 100 + day;
  const startNum = start[0] * 100 + start[1];
  const endNum = end[0] * 100 + end[1];

  if (startNum > endNum) {
    return target >= startNum || target <= endNum;
  }

  return target >= startNum && target <= endNum;
}

function getChineseZodiac(year) {
  const index = ((year - 1900) % 12 + 12) % 12;
  return CHINESE_ZODIAC[index];
}

function resolveDailyReading(profile, date) {
  const dayIndex = getDayIndex(date);
  const hexagram = HEXAGRAM_DATA[getPersonalDailyHexagramIndex(profile, dayIndex)];
  const signOffset = profile.sign.length % 3;
  const zodiacOffset = profile.chineseZodiac.charCodeAt(0) % 3;
  const colorIndex = (dayIndex + signOffset + zodiacOffset) % hexagram.luckyColors.length;
  const actionIndex = (dayIndex + zodiacOffset) % hexagram.actionSuggestions.length;
  const luckyColor = hexagram.luckyColors[colorIndex];
  const summaryTemplate = SUMMARY_OPENERS[dayIndex % SUMMARY_OPENERS.length];
  const modernTransition = MODERN_TRANSITIONS[hexagram.hexagramId % MODERN_TRANSITIONS.length];
  const guidanceOpener = GUIDANCE_OPENERS[hexagram.hexagramId % GUIDANCE_OPENERS.length];
  const cautionOpener = CAUTION_OPENERS[hexagram.hexagramId % CAUTION_OPENERS.length];
  const polishedSummary = stripLeadPhrase(hexagram.modernSummary, hexagram.hexagramName);
  const polishedGuidance = stripLeadPhrase(hexagram.guidance, hexagram.hexagramName);
  const polishedCaution = stripLeadPhrase(hexagram.caution, hexagram.hexagramName);

  return {
    hexagram,
    luckyColor,
    actionSuggestion: `${hexagram.actionSuggestions[actionIndex]} 幸运色建议使用 ${luckyColor.name}，让今天的注意力更集中。`,
    overallSummary: summaryTemplate(hexagram.hexagramName, hexagram.coreMeaning),
    sourceText: hexagram.sourceText,
    sourceInterpretation: hexagram.sourceInterpretation,
    modernReading: `${modernTransition}${polishedSummary}`,
    guidanceText: `${guidanceOpener}${polishedGuidance}`,
    cautionText: `${cautionOpener}${polishedCaution}`,
    dayStemBranch: getStemBranch(date)
  };
}

function getDayIndex(date) {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const start = new Date(2026, 0, 1);
  return Math.floor((normalized - start) / 86400000);
}

function getStemBranch(date) {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const base = new Date(2026, 0, 1);
  const offset = Math.floor((normalized - base) / 86400000);
  const stem = STEMS[((offset % 10) + 10) % 10];
  const branch = BRANCHES[((offset % 12) + 12) % 12];
  return `${stem}${branch}日`;
}

function getPersonalHexagramIndex(profile) {
  const [year, month, day] = profile.birthdate.split("-").map(Number);
  const baseValue = year + month * 7 + day * 13 + profile.sign.length * 5 + profile.chineseZodiac.charCodeAt(0);
  return ((baseValue % HEXAGRAM_DATA.length) + HEXAGRAM_DATA.length) % HEXAGRAM_DATA.length;
}

function getPersonalDailyHexagramIndex(profile, dayIndex) {
  const personalIndex = getPersonalHexagramIndex(profile);
  const signOffset = profile.sign.length * 3;
  const zodiacOffset = profile.chineseZodiac.charCodeAt(0);
  const mixedValue = personalIndex * 5 + dayIndex * 7 + signOffset + zodiacOffset;
  return ((mixedValue % HEXAGRAM_DATA.length) + HEXAGRAM_DATA.length) % HEXAGRAM_DATA.length;
}

function stripLeadPhrase(text, hexagramName) {
  return text
    .replace(new RegExp(`^今天若落在${hexagramName}卦，?`), "")
    .replace(new RegExp(`^${hexagramName}卦对应的是`), "它对应的是")
    .replace(new RegExp(`^${hexagramName}不是`), "它不是")
    .replace(/^适合/, "")
    .replace(/^不要/, "")
    .trim();
}
