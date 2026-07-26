import { MCQuestion, TFQuestion, MatchingRound } from '../types';

export const MC_QUESTIONS: MCQuestion[] = [
  {
    id: 1,
    question: "肩胛骨的后缩动作主要由以下哪些肌肉完成？",
    options: [
      { key: "A", text: "前锯肌 + 胸小肌" },
      { key: "B", text: "菱形肌 + 斜方肌中束" },
      { key: "C", text: "上斜方肌 + 肩胛提肌" },
      { key: "D", text: "背阔肌 + 大圆肌" }
    ],
    answer: "B"
  },
  {
    id: 2,
    question: "以下哪块肌肉起点为“第 7-12 肋软骨内面、胸腰筋膜、髂嵴前部”止于“腹白线”？",
    options: [
      { key: "A", text: "腹横肌" },
      { key: "B", text: "腹内斜肌" },
      { key: "C", text: "腹直肌" },
      { key: "D", text: "腹外斜肌" }
    ],
    answer: "A"
  },
  {
    id: 3,
    question: "腹部四层肌肉由内至外包函：",
    options: [
      { key: "A", text: "腹横肌、盆底肌、多裂肌、腹直肌" },
      { key: "B", text: "腹横肌、腹内斜肌、腹外斜肌、腹直肌" },
      { key: "C", text: "腹直肌、腹外斜肌、腹内斜肌、股直肌" },
      { key: "D", text: "腹内斜肌、腹外斜肌、股直肌、腹横肌" }
    ],
    answer: "B"
  },
  {
    id: 4,
    question: "髋关节外旋 6 兄弟是以下哪一组肌肉：",
    options: [
      { key: "A", text: "臀大肌、股方肌、闭孔内肌、闭孔外肌、上孖肌、下孖肌" },
      { key: "B", text: "梨状肌、股方肌、闭孔内肌、闭孔外肌、上孖肌、下孖肌" },
      { key: "C", text: "缝匠肌、股直肌、闭孔内肌、闭孔外肌、上孖肌、下孖肌" },
      { key: "D", text: "梨状肌、股直肌、闭孔内肌、闭孔外肌、上孖肌、下孖肌" }
    ],
    answer: "B"
  },
  {
    id: 5,
    question: "以下哪个呼吸模式最常用于激活核心和维持腰椎、骨盆稳定性？",
    options: [
      { key: "A", text: "三维呼吸" },
      { key: "B", text: "腹式呼吸" },
      { key: "C", text: "锁骨式呼吸" },
      { key: "D", text: "单侧肋间呼吸" }
    ],
    answer: "A"
  },
  {
    id: 6,
    question: "“闭链运动”的定义是：",
    options: [
      { key: "A", text: "肢体远端自由移动" },
      { key: "B", text: "肢体远端固定，近端移动" },
      { key: "C", text: "不承重的动作" },
      { key: "D", text: "使用弹簧最重的动作" }
    ],
    answer: "B"
  },
  {
    id: 7,
    question: "在“骨盆后倾”姿势下，以下哪项描述是正确的？",
    options: [
      { key: "A", text: "增加腰椎前凸弧度" },
      { key: "B", text: "腰椎空隙增大" },
      { key: "C", text: "髂前上棘与耻骨联合在同一个平面" },
      { key: "D", text: "耻骨联合高于髂前上棘" }
    ],
    answer: "D"
  },
  {
    id: 8,
    question: "离心收缩的特点是：",
    options: [
      { key: "A", text: "肌肉长度缩短，产生力量" },
      { key: "B", text: "肌肉长度不变，保持张力" },
      { key: "C", text: "肌肉在延长过程中控制阻力" },
      { key: "D", text: "不需要能量消耗" }
    ],
    answer: "C"
  },
  {
    id: 9,
    question: "肩胛骨在稳定动作中最核心的设定姿势是：",
    options: [
      { key: "A", text: "上提并前伸" },
      { key: "B", text: "压低并轻微后缩" },
      { key: "C", text: "后缩并下回旋" },
      { key: "D", text: "抬高并外旋" }
    ],
    answer: "B"
  },
  {
    id: 10,
    question: "膈肌的主要功能是：",
    options: [
      { key: "A", text: "辅助肋骨外展" },
      { key: "B", text: "主导吸气，收缩时圆顶下降" },
      { key: "C", text: "主动呼气" },
      { key: "D", text: "稳定颈椎" }
    ],
    answer: "B"
  },
  {
    id: 11,
    question: "在动作中“肋骨外翻”通常意味着：",
    options: [
      { key: "A", text: "膈肌有效工作" },
      { key: "B", text: "核心力量增强的表现" },
      { key: "C", text: "胸椎伸展过度，腹横肌未有效稳定胸腔" },
      { key: "D", text: "骨盆后倾的代偿" }
    ],
    answer: "C"
  },
  {
    id: 12,
    question: "“头颈与脊柱中立位”主要指在什么状态下？",
    options: [
      { key: "A", text: "颈椎最大伸展位" },
      { key: "B", text: "下颌紧贴胸骨" },
      { key: "C", text: "保持颈椎自然的生理曲度，视线看向前方" },
      { key: "D", text: "后脑勺完全压向地面" }
    ],
    answer: "C"
  },
  {
    id: 13,
    question: "进行“后划系列-飞翔”时，握把拉到最大幅度时，肩胛骨应处于什么状态？",
    options: [
      { key: "A", text: "最大程度后缩并保持" },
      { key: "B", text: "轻微后缩，不锁死" },
      { key: "C", text: "完全前伸" },
      { key: "D", text: "耸肩以增加力臂" }
    ],
    answer: "B"
  },
  {
    id: 14,
    question: "“腰椎下沉”通常是指：",
    options: [
      { key: "A", text: "将脚掌放在脚踏杆上" },
      { key: "B", text: "腰椎从中立位过度到微后倾的相对扁平状态" },
      { key: "C", text: "大幅拱起背部" },
      { key: "D", text: "将头部用力压向垫子" }
    ],
    answer: "B"
  },
  {
    id: 15,
    question: "“1/2 根弹簧”的张力通常是指",
    options: [
      { key: "A", text: "100%" },
      { key: "B", text: "125%" },
      { key: "C", text: "50%" },
      { key: "D", text: "25%" }
    ],
    answer: "C"
  },
  {
    id: 16,
    question: "在进行“骨盆卷动”时，从卷起至最高点的过程中，脊柱的运动顺序是：",
    options: [
      { key: "A", text: "逐节离地，从尾骨开始卷起" },
      { key: "B", text: "逐节离地，从头颈开始卷起" },
      { key: "C", text: "整体同步屈曲" },
      { key: "D", text: "腰椎先动，胸椎后动" }
    ],
    answer: "A"
  },
  {
    id: 17,
    question: "当骨盆不动，胸廓右回旋时启动哪组肌肉？",
    options: [
      { key: "A", text: "右侧腹内斜、左侧腹外斜" },
      { key: "B", text: "右侧腹内斜、右侧腹外斜" },
      { key: "C", text: "右侧腹内斜、腹横肌" },
      { key: "D", text: "右侧腹外斜、腹直肌" }
    ],
    answer: "A"
  },
  {
    id: 18,
    question: "做“百次拍击”时，以下哪项是核心稳定失效的标志？",
    options: [
      { key: "A", text: "下背部轻轻贴住垫子" },
      { key: "B", text: "头部轻微抬起" },
      { key: "C", text: "腰椎离地空隙变大，骨盆晃动" },
      { key: "D", text: "手臂有节奏的拍击" }
    ],
    answer: "C"
  },
  {
    id: 19,
    question: "普拉提五项基本原则中，哪一项被视作“一切动作的前提和基础”？",
    options: [
      { key: "A", text: "肩胛骨稳定" },
      { key: "B", text: "头颈位置" },
      { key: "C", text: "骨盆位置" },
      { key: "D", text: "呼吸" }
    ],
    answer: "D"
  },
  {
    id: 20,
    question: "做“脚部练习”时，如果学员膝盖伸直时锁死，你应该：",
    options: [
      { key: "A", text: "鼓励他继续，因为锁死更稳定" },
      { key: "B", text: "提示“微屈膝盖，找到股四头肌均衡发力”" },
      { key: "C", text: "增加弹簧重量" },
      { key: "D", text: "让学员把脚放更高位置" }
    ],
    answer: "B"
  },
  {
    id: 21,
    question: "“百次拍击”的呼吸节奏是：",
    options: [
      { key: "A", text: "吸气 5 次，呼气 5 次，做 10 组" },
      { key: "B", text: "吸气 10 次，呼气 10 次，做 10 组" },
      { key: "C", text: "吸气 5 次，呼气 5 次，做 5 组" },
      { key: "D", text: "不要求特定节奏，自然呼吸即可" }
    ],
    answer: "A"
  },
  {
    id: 22,
    question: "关于“动作编排”的进阶顺序，正确的原则是：",
    options: [
      { key: "A", text: "从不稳定到稳定" },
      { key: "B", text: "从开链到闭链" },
      { key: "C", text: "从负重大到负重小" },
      { key: "D", text: "从简单运动平面到多运动平面组合" }
    ],
    answer: "D"
  },
  {
    id: 23,
    question: "在侧卧腿部练习中，如果学员抬腿时骨盆向后滚动，最重要的原因是：",
    options: [
      { key: "A", text: "髋外展肌无力，代偿用臀大肌后伸" },
      { key: "B", text: "腹横肌和髋内收肌未协同稳定" },
      { key: "C", text: "腿抬太高了" },
      { key: "D", text: "头枕高度不合适" }
    ],
    answer: "B"
  },
  {
    id: 24,
    question: "在闭链动作中，肩胛骨的稳定主要依赖：",
    options: [
      { key: "A", text: "仅靠关节锁死" },
      { key: "B", text: "胸小肌的强力收缩" },
      { key: "C", text: "前锯肌和斜方肌下束的协同" },
      { key: "D", text: "上斜方肌上提" }
    ],
    answer: "C"
  },
  {
    id: 25,
    question: "腿部外旋在普拉提动作中的主要目的是：",
    options: [
      { key: "A", text: "增加动作幅度" },
      { key: "B", text: "激活臀中肌和深层外旋肌以稳定髋关节" },
      { key: "C", text: "让膝关节过度伸展" },
      { key: "D", text: "减少内收肌肉参与" }
    ],
    answer: "B"
  },
  {
    id: 26,
    question: "深层核心肌群包括：",
    options: [
      { key: "A", text: "腹横肌、盆底肌、多裂肌、膈肌" },
      { key: "B", text: "腹横肌、盆底肌、腹内斜肌、膈肌" },
      { key: "C", text: "腹内斜肌、股直肌、盆底肌、多裂肌" },
      { key: "D", text: "腹横肌、盆底肌、腹直肌、膈肌" }
    ],
    answer: "A"
  },
  {
    id: 27,
    question: "进行“单腿伸展”时，非支撑腿在下放过程中应避免：",
    options: [
      { key: "A", text: "保持骨盆水平" },
      { key: "B", text: "核心持续收缩" },
      { key: "C", text: "腰椎随之伸展" },
      { key: "D", text: "缓慢控制放下" }
    ],
    answer: "C"
  },
  {
    id: 28,
    question: "股四头肌包括：",
    options: [
      { key: "A", text: "股直肌、股薄肌、缝匠肌、膕肌" },
      { key: "B", text: "股直肌、股薄肌、股中间肌、股二头肌" },
      { key: "C", text: "股直肌、股外侧肌、股内侧肌、股中间肌" },
      { key: "D", text: "股二头肌、股薄肌、股外侧肌、股内侧肌" }
    ],
    answer: "C"
  },
  {
    id: 29,
    question: "膕绳肌包括：",
    options: [
      { key: "A", text: "膕肌、跖肌、股二头肌" },
      { key: "B", text: "膕肌、半腱肌、半膜肌" },
      { key: "C", text: "股二头肌、缝匠肌、半膜肌" },
      { key: "D", text: "股二头肌、半腱肌、半膜肌" }
    ],
    answer: "D"
  },
  {
    id: 30,
    question: "在脊柱右侧屈动作中启动了哪组肌肉？",
    options: [
      { key: "A", text: "右侧腹内斜、右侧腹外斜" },
      { key: "B", text: "右侧腹内斜、左侧腹外斜" },
      { key: "C", text: "右侧腹内斜、腹横肌" },
      { key: "D", text: "右侧腹外斜、腹直肌" }
    ],
    answer: "A"
  }
];

export const TF_QUESTIONS: TFQuestion[] = [
  {
    id: 1,
    question: "起始位置只需要在课程中第一个动作前说明一次",
    answer: false
  },
  {
    id: 2,
    question: "腹横肌与腰方肌共同作用完成脊柱侧屈运动",
    answer: false
  },
  {
    id: 3,
    question: "对于圆肩体态，应多强调肩胛骨后缩下沉的训练。",
    answer: true
  },
  {
    id: 4,
    question: "做“骨盆卷动”时，卷至最高点应保持肩到膝成一条线，避免过度伸展",
    answer: true
  },
  {
    id: 5,
    question: "肩胛骨的上回旋需要前锯肌和斜方肌上/下束协同完成。",
    answer: true
  },
  {
    id: 6,
    question: "骨盆后倾会导致腰椎的生理前凸曲度增加。",
    answer: false
  },
  {
    id: 7,
    question: "拉伸应该在充分热身之后进行",
    answer: true
  },
  {
    id: 8,
    question: "在同一次练习中，应该先做开链再做闭链",
    answer: false
  },
  {
    id: 9,
    question: "普拉提所有动作应该在骨盆中立位完成，从不使用后倾位",
    answer: false
  },
  {
    id: 10,
    question: "内收肌群在所有下肢动作中都应保持放松，以免干扰骨盆稳定。",
    answer: false
  }
];

export const MATCHING_ROUNDS: MatchingRound[] = [
  {
    id: 1,
    title: "第一题：将肌肉与功能配对",
    leftItems: [
      { id: "1", text: "腹横肌" },
      { id: "2", text: "股直肌" },
      { id: "3", text: "前锯肌" },
      { id: "4", text: "肱三头肌" },
      { id: "5", text: "肩胛提肌" }
    ],
    rightOptions: [
      { id: "A", text: "肩胛骨前引" },
      { id: "B", text: "肘关节伸展" },
      { id: "C", text: "髋关节屈曲" },
      { id: "D", text: "增加腹内压，稳定腰椎" },
      { id: "E", text: "肩胛骨上提" },
      { id: "F", text: "肘关节屈曲" }
    ],
    correctMap: {
      "1": "D",
      "2": "C",
      "3": "A",
      "4": "B",
      "5": "E"
    },
    redHerringId: "F"
  },
  {
    id: 2,
    title: "第二题：将动作与训练目标配对",
    leftItems: [
      { id: "1", text: "滑雪" },
      { id: "2", text: "短盒子直背" },
      { id: "3", text: "百次拍击" },
      { id: "4", text: "长盒子划船" },
      { id: "5", text: "敬礼" }
    ],
    rightOptions: [
      { id: "A", text: "髋关节屈曲肌群向心收缩、腹直肌等长收缩" },
      { id: "B", text: "腹肌耐力、肩胛稳定" },
      { id: "C", text: "髋关节外展、内收肌群" },
      { id: "D", text: "肱三头肌及肩胛稳定肌群" },
      { id: "E", text: "髋关节屈曲肌群等长收缩、腹直肌向心收缩" },
      { id: "F", text: "竖脊肌群" }
    ],
    correctMap: {
      "1": "C",
      "2": "A",
      "3": "B",
      "4": "F",
      "5": "D"
    },
    redHerringId: "E"
  }
];

