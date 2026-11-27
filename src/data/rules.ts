import type { RuleExcerpt } from '../types';

/**
 * Verbatim rulebook excerpts extracted directly from 《E市规则类怪谈》.
 * Every rule citation in a creature's dossier opens the exact corresponding record here.
 */
export const RULE_EXCERPTS: Record<string, RuleExcerpt> = {
  'op6-x': {
    id: 'op6-x',
    documentTitle: 'Espedro市区999接线员紧急时期工作守则',
    edition: '第6版',
    shortTitle: '999接线员守则 第6版 · X',
    clauseTag: '条款 X / XII / XIII',
    clauses: [
      {
        clause: 'X.',
        text: '如果报警人声称看到了具有以下特征的人员，请让报警人保持冷静并迅速回家，视情况通知执勤警员处理：B.目标佩戴物品遮掩面部；D.目标身上存在致命伤痕但正常活动；E.目标缺乏容易辨识的五官；F.目标发出诡异的声音；I.目标持有登记表，并尝试过对报案人进行社会调查活动。如果目标正在持续的观察或在跟踪报案人，请立刻让报警人迅速逃走。',
      },
      {
        clause: 'XIII.',
        text: '请反复告诉报警人，人类是具有两只眼睛，两只耳朵，一只鼻子，一张嘴的灵长类生物，并让报警人重复。如果报警人出现口齿不清，嚎叫，大声哭泣，突然沉默超过30秒以上等现象时，请立刻挂断电话并告知前来调查的执勤警员，提醒他们带上警灯。',
      },
    ],
    relatedEntityIds: ['01', '02', '03', '04', '06', '21'],
  },
  'op6-vi': {
    id: 'op6-vi',
    documentTitle: 'Espedro市区999接线员紧急时期工作守则',
    edition: '第6版',
    shortTitle: '999接线员守则 第6版 · VI',
    clauseTag: '条款 VI',
    clauses: [
      {
        clause: 'VI.',
        text: '当报案人称其所在地区出现凶杀案时，务必确认是否包含以下任一要素：A.死者多于三人；B.死者受到肢解；C.死者五官受到破坏；D.死者具有WRT人员特征；E.死者是警员或国民警卫队人员，附近没有存在闪烁警灯的专用车辆；F.死者为幼童，数量超过两人。当任一条件符合上述要求，请联系附近区域的执勤警员并通知S.T.A.R.小队前往。务必不要让报警人留在原地。',
      },
    ],
    relatedEntityIds: ['06', '14', '15', '18'],
  },
  'op6-vii-viii': {
    id: 'op6-vii-viii',
    documentTitle: 'Espedro市区999接线员紧急时期工作守则',
    edition: '第6版',
    shortTitle: '999接线员守则 第6版 · VII–VIII',
    clauseTag: '条款 VII / VIII',
    clauses: [
      {
        clause: 'VII.',
        text: '如果通讯出现异常，请不要慌张。由于WRT人员对于通讯信号塔的破坏，短暂的通讯故障是正常的。但请不要在此时继续接收耳机内的任何讯息。如果产生不适，请前往医务室。',
      },
      {
        clause: 'VIII.',
        text: '如果报警人在用无法理解的语言说话，请立刻挂断。如果产生不适，请前往医务室。',
      },
    ],
    relatedEntityIds: ['05', '18', '23', '32'],
  },
  'op6-xviii': {
    id: 'op6-xviii',
    documentTitle: 'Espedro市区999接线员紧急时期工作守则',
    edition: '第6版',
    shortTitle: '999接线员守则 第6版 · XVIII–XIX',
    clauseTag: '条款 XVIII / XIX',
    clauses: [
      {
        clause: 'XVIII.',
        text: '日落后保证不要留在黑暗的房间中。建筑内电路和电源牢靠，绝无可能意外停电。',
      },
      {
        clause: 'XIX.',
        text: '如果必要的话，请在临时休息室就寝。请勿关闭室内的警灯。',
      },
    ],
    relatedEntityIds: ['16', '17'],
  },
  'op6-anchor': {
    id: 'op6-anchor',
    documentTitle: 'Espedro市区999接线员紧急时期工作守则',
    edition: '第6版',
    shortTitle: '999接线员守则 第6版 · XXIII–XXVII',
    clauseTag: '认知锚点条款',
    clauses: [
      { clause: 'XXIII.', text: '人类是具有两只眼睛，两只耳朵，一只鼻子，一张嘴的灵长类生物。' },
      { clause: 'XXIV.', text: '人类不会对人类产生食欲，虐待欲和杀戮欲。' },
      { clause: 'XXV.', text: '人类的嘴和眼睛不会大于人类的脸。' },
      { clause: 'XXVI.', text: '人类不会害怕，且喜欢闪烁的红蓝色灯光。人类不会毁坏红蓝色灯光。' },
      { clause: 'XXVII.', text: '人类不会害怕盯着镜子看。' },
    ],
    relatedEntityIds: ['05', '06', '09', '10', '11'],
  },
  'pol8-vii': {
    id: 'pol8-vii',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第8版',
    shortTitle: '执勤警员守则 第8版 · VII',
    clauseTag: '条款 VII / XI',
    clauses: [
      {
        clause: 'VII.',
        text: '求助的市民是不可以完全信任的。如果市民具有以下任一特征，可以根据情况强行命令对方脱下衣物。如果对方拒绝执行，可以采取任何武力：A.市民佩戴任何可以遮蔽头部的衣物；B.市民穿着过分臃肿的衣物，如背心；E.市民的五官无法辨认；F.市民拒绝靠近闪烁的警灯。不要直接接触被脱下的衣物。',
      },
    ],
    relatedEntityIds: ['02', '04', '06', '21', '22'],
  },
  'pol8-x': {
    id: 'pol8-x',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第8版',
    shortTitle: '执勤警员守则 第8版 · X',
    clauseTag: '条款 X · 认知核验',
    clauses: [
      {
        clause: 'X. A',
        text: '人类只有两只并排的眼睛，两只相对的耳朵，一张小于头且大于眼睛的嘴。眼睛用来观察事物而不是人类。人类拥有鼻子。',
      },
      {
        clause: 'X. B',
        text: '人类只有两只等长的手臂。人类只有两只等长的腿。人类的手指有五根。',
      },
      {
        clause: 'X. C–D',
        text: '人类喜欢闪烁的红蓝色灯光。天空是且只是蓝色的。蓝色是您衣服的颜色。',
      },
    ],
    relatedEntityIds: ['01', '02', '03', '04', '05', '06', '07', '08', '11', '27', '28', '29', '30'],
  },
  'pol8-xii': {
    id: 'pol8-xii',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第8版',
    shortTitle: '执勤警员守则 第8版 · XII',
    clauseTag: '条款 XII',
    clauses: [
      {
        clause: 'XII.',
        text: '如果感受到被监视，请保持沉默冷静。您的车辆是经过防弹改装的。但是也请不要注视空旷的场所，也不要把任何肢体移出车辆，直到被观察的感受消失。如果出现恶心，呕吐，头晕和头痛，幻觉和精神失常，可以打开警灯。如果仍无效，请向车外扔出一枚震爆弹并迅速撤离。',
      },
    ],
    relatedEntityIds: ['11', '12', '13', '28'],
  },
  'pol8-xxvii': {
    id: 'pol8-xxvii',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第8版',
    shortTitle: '执勤警员守则 第8版 · XXVII',
    clauseTag: '条款 XXVII',
    clauses: [
      {
        clause: 'XXVII.',
        text: '请勿相信哨卡。市内没有任何哨卡。不要听从任何人的指示下车，即使对方身穿国民警卫队的服装。我们也没有任何暗号。',
      },
    ],
    relatedEntityIds: ['22', '31'],
  },
  'pol8-xxix': {
    id: 'pol8-xxix',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第8版',
    shortTitle: '执勤警员守则 第8版 · XXIX',
    clauseTag: '条款 XXIX',
    clauses: [
      {
        clause: 'XXIX.',
        text: '如果发现以下的任何物体或者人员，请汇报总部请求支援，并视情况选择处理：B.靠近您并希望您回答问题的人，他们往往是遮掩面部或者穿着厚实衣物的；C.没有被人群发现的普通尸体；D.幼童尸体，往往超过五人且被肢解；E.被堆在一起的尸体，往往超过三人且被肢解。',
      },
    ],
    relatedEntityIds: ['14', '15', '21'],
  },
  'pol8-xxxi': {
    id: 'pol8-xxxi',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第8版',
    shortTitle: '执勤警员守则 第8版 · XXXI–XXXII',
    clauseTag: '条款 XXXI / XXXII',
    clauses: [
      {
        clause: 'XXXI.',
        text: '可以哭。可以尖叫。不要祈祷。信仰是完全无用的。包括无神论。',
      },
      {
        clause: 'XXXII.',
        text: '相信红蓝色。不能相信红色，但可以蓝色。靠近红蓝色。',
      },
    ],
    relatedEntityIds: ['25', '26', '35'],
  },
  'pol17-xi-xii': {
    id: 'pol17-xi-xii',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第17版',
    shortTitle: '执勤警员守则 第17版 · XI / XII',
    clauseTag: '条款 XI / XII',
    clauses: [
      {
        clause: 'XI.',
        text: '请远离任何穿着臃肿的人。如果有必要，可以选择投掷震爆弹或使用电击枪。绝不能靠近他们小于三米。',
      },
      {
        clause: 'XII.',
        text: '远离成堆的尸体，并迅速报告其位置。国民警卫队会处理。',
      },
    ],
    relatedEntityIds: ['02', '14', '15'],
  },
  'pol17-xiii': {
    id: 'pol17-xiii',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第17版',
    shortTitle: '执勤警员守则 第17版 · XIII',
    clauseTag: '条款 XIII · Hudson禁令',
    clauses: [
      {
        clause: 'XIII.',
        text: '不要前往Hudson中学。Hudson中学是从没有塔楼的。Hudson中学里有国民警卫队。看见Hudson中学时务必默念此守则。永远不要靠近Hudson中学。',
      },
    ],
    relatedEntityIds: ['34'],
  },
  'pol17-xv': {
    id: 'pol17-xv',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第17版',
    shortTitle: '执勤警员守则 第17版 · XV',
    clauseTag: '条款 XV',
    clauses: [
      {
        clause: 'XV.',
        text: '如果感受到被注视，请迅速离开。如果仍然无法减弱，请立刻打开警灯。如果仍然无法消除，请投掷震爆弹。如果以上方式均告无效，请射击车顶，确认有物体倒下，或者立刻弃车。绝对不可以回头看。离开后，请使用医用吗啡。',
      },
    ],
    relatedEntityIds: ['11', '12', '13'],
  },
  'pol17-xxiii-xxvi': {
    id: 'pol17-xxiii-xxvi',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第17版',
    shortTitle: '执勤警员守则 第17版 · XXIII / XXVI',
    clauseTag: '条款 XXIII / XXVI',
    clauses: [
      {
        clause: 'XXIII.',
        text: '如果阳光突然消失，请务必保持安静并让汽车熄火，直到阳光再次出现。尽量不要看窗外。只是建议而已。',
      },
      {
        clause: 'XXVI.',
        text: '不要食用和饮用车辆外的任何补给。透明的水是有害的，请不要过多接触。这样的水是包括雨的。',
      },
    ],
    relatedEntityIds: ['07', '08', '16', '17'],
  },
  'pol17-xxviii': {
    id: 'pol17-xxviii',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第17版',
    shortTitle: '执勤警员守则 第17版 · XXVIII',
    clauseTag: '条款 XXVIII · 伪装排查',
    clauses: [
      {
        clause: 'XXVIII.',
        text: '逮捕所有在安全地点中独处的军需官，维修工人，军医，警员，国民警卫队，S.T.A.R.警员和政府公职人员。拒绝执行者可以被视为叛国并一同逮捕。被逮捕者需要被移交到审讯室。私自处决被逮捕者将被处以极刑。',
      },
    ],
    relatedEntityIds: ['21'],
  },
  'pol17-xxix-xxx': {
    id: 'pol17-xxix-xxx',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第17版',
    shortTitle: '执勤警员守则 第17版 · XXIX–XXX',
    clauseTag: '条款 XXIX / XXX · 镜面管制',
    clauses: [
      {
        clause: 'XXIX.',
        text: '进入安全建筑时，请在建筑大厅中站在由国民警卫队士兵保护的镜子前站立超过一分钟。请盯紧镜子中的自己。',
      },
      {
        clause: 'XXX.',
        text: '不可以使用任何私人镜子。只有被国民警卫队士兵保护的镜子是可以使用的。发现其它镜子必须迅速破坏并报告。',
      },
    ],
    relatedEntityIds: ['09', '10'],
  },
  'pol17-tail': {
    id: 'pol17-tail',
    documentTitle: 'Espedro市区执勤警员紧急时期工作守则',
    edition: '第17版 · 红蓝尾页',
    shortTitle: '执勤警员守则 第17版 · 尾页',
    clauseTag: '红蓝尾页 · 紧急朗读',
    clauses: [
      {
        clause: '手指与躯干',
        text: '人类的后脑勺是没有任何器官的。我的手指是可以交叉，且两边数量是相等的。我的指甲不会长于手指。骨骼不会从我身体的任何部位露出。',
      },
      {
        clause: '口腔与情绪',
        text: '人的口腔是能用来进食的，但是不可以进食人类。口腔中没有超过小臂的东西。人类不会一直微笑。人类也不会一直哭泣。',
      },
      {
        clause: '信仰与天空',
        text: '天空是蓝色的。天空中不会有眼睛。天使是不存在的。恶魔是不存在的。我不相信没有看见过的任何东西。Hudson中学没有塔楼。',
      },
    ],
    relatedEntityIds: ['01', '02', '03', '04', '05', '08', '15', '25', '26', '28', '34'],
  },
  'ng16-xv-xvi': {
    id: 'ng16-xv-xvi',
    documentTitle: 'Bellrona州国民警卫队 特殊时期外勤班组守则',
    edition: '第16版',
    shortTitle: '国民警卫队外勤守则 第16版 · XV–XVI',
    clauseTag: '条款 XV（可摧毁）/ XVI（必须远离）',
    clauses: [
      {
        clause: 'XV. 可摧毁目标',
        text: '您可以摧毁的非人群内生物或实体：A.口腔；B.眼球；C.脸颊；D.镇暴警员；E.无法表明身份且没有红蓝色灯光的任何人；J.四肢。',
      },
      {
        clause: 'XVI. 必须远离目标',
        text: '您不可以接触，且必须要远离的非人群生物或实体：A.翅膀；C.透明；D.黑暗；E.手持扩音器或者相机的WRT；F.爱人；H.不断出现的同一具尸体；J.无法被完全看到的东西；K.天空；L.哨卡里的国民警卫队；M.大于您的载具的可以移动的生物。',
      },
    ],
    relatedEntityIds: ['05', '06', '07', '08', '11', '14', '16', '17', '18', '19', '20', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
  },
  'ng28-ix-x': {
    id: 'ng28-ix-x',
    documentTitle: 'Bellrona州国民警卫队 特殊时期外勤班组守则',
    edition: '第28版',
    shortTitle: '国民警卫队外勤守则 第28版 · IX–X',
    clauseTag: '条款 IX（数字清除）/ X（镜面禁令）',
    clauses: [
      {
        clause: 'IX.',
        text: '摧毁任何只包括有阿拉伯数字的物体。摧毁后请默念至少一遍尾页的内容。如果无法摧毁，请尽可能的远离并且不要直视，记录坐标之后呼叫空袭支援。此类物体包括：具有数字特征的灯光，尸体，车辆，飞鸟，云彩，无人机编队，或其余物品。',
      },
      {
        clause: 'X.',
        text: '禁止独自观察除安全区域内镜面的可以显示自身形象的镜面物体，包括水源和各种金属形成的镜面效应，瞄准镜应当使用全息瞄准器。如果发现其余任何镜面物体，请加以涂鸦销毁。',
        annotation: '手写批注：干死那个把我照片贴在厕所镜子位置上的混账东西。',
      },
    ],
    relatedEntityIds: ['08', '09', '10', '14'],
  },
  'ng28-xi-xiii': {
    id: 'ng28-xi-xiii',
    documentTitle: 'Bellrona州国民警卫队 特殊时期外勤班组守则',
    edition: '第28版',
    shortTitle: '国民警卫队外勤守则 第28版 · XI–XIII',
    clauseTag: '条款 XI / XII / XIII',
    clauses: [
      {
        clause: 'XI.',
        text: 'Hudson中学不存在。Hudson中学并不是本市区的建筑。高大的塔楼是海市蜃楼。您将会远离Hudson中学。有生命危险时，请务必要默念此守则。尾页内容可以被搁置。',
        annotation: '手写批注：指南针没有用。直接掉头。',
      },
      {
        clause: 'XII–XIII.',
        text: '夜间外出时可能会迷路。请远离任何有学校特征的建筑。Hudson中学没有国民警卫队。因为Hudson中学不存在。您将远离Hudson中学。',
      },
    ],
    relatedEntityIds: ['34'],
  },
  'ng28-xiv': {
    id: 'ng28-xiv',
    documentTitle: 'Bellrona州国民警卫队 特殊时期外勤班组守则',
    edition: '第28版',
    shortTitle: '国民警卫队外勤守则 第28版 · XIV',
    clauseTag: '条款 XIV · “人群”规避协议',
    clauses: [
      {
        clause: 'XIV.',
        text: '请不要以任何暴力或嘈杂形式前去搅扰生物“人群”。如果有穿越的必要，请使用扩音器播放《Red River Valley》直到人群离去。如果要强行通过，请务必离开载具步行并打开红蓝色的警灯或频闪灯。不要尝试与人群沟通。如果被迫弃车，也可以进入人群，但是不得超过五分钟。生物以及实体不会越过人群进行追逐。',
        annotation: '手写批注：我看见了熟人。他们好像很快乐？',
      },
    ],
    relatedEntityIds: ['23', '33'],
  },
  'ng28-xv-sky-fluid': {
    id: 'ng28-xv-sky-fluid',
    documentTitle: 'Bellrona州国民警卫队 特殊时期外勤班组守则',
    edition: '第28版',
    shortTitle: '国民警卫队外勤守则 第28版 · XV-H / I',
    clauseTag: '交战标准 XV-H / XV-I',
    clauses: [
      {
        clause: 'XV. H',
        text: '无法被观测的黑暗或透明实体，往往会造成物品移动——使用闪光弹。',
      },
      {
        clause: 'XV. I',
        text: '异样的天空——全体闭目，执行尾页内容后确认班组成员有无异常。',
      },
    ],
    relatedEntityIds: ['07', '08', '16', '17'],
  },
  'ng28-xv-kl': {
    id: 'ng28-xv-kl',
    documentTitle: 'Bellrona州国民警卫队 特殊时期外勤班组守则',
    edition: '第28版',
    shortTitle: '国民警卫队外勤守则 第28版 · XV-K / L',
    clauseTag: '交战标准 XV-K / XV-L',
    clauses: [
      {
        clause: 'XV. K',
        text: '特殊实体“法拉第”The Faraday——无法被确定外形。如果设备出现工作异常，务必原路返回，或者关闭电子设备，进入战斗状态。',
      },
      {
        clause: 'XV. L',
        text: '特殊实体“薛定谔”The Schrodinger——人形生物，可能具有任何形态，可能会突然出现在任何无红蓝色警灯的地点。如果有遭遇，请视情况处理，或全体闭目三秒。',
        annotation: '手写批注：眨眼就行。不算吓人。',
      },
    ],
    relatedEntityIds: ['13', '32'],
  },
  'ng9-xv-heavy': {
    id: 'ng9-xv-heavy',
    documentTitle: 'Bellrona州国民警卫队 特殊时期歼灭班组守则',
    edition: '第9版',
    shortTitle: '歼灭班组守则 第9版 · XV-B / D / E / G',
    clauseTag: '高危歼灭标准',
    clauses: [
      {
        clause: 'XV. B',
        text: '拒绝暴露头部的人形生物——警告并在对方拒绝执行后，视情况执行逮捕与摧毁。如果对方携带有扩音或录像设备，可直接摧毁。',
      },
      {
        clause: 'XV. D',
        text: '巨大的无法理解的物体——尽可能的摧毁，或者牵制并呼叫重型支援。',
      },
      {
        clause: 'XV. E',
        text: '受到武装人员守卫的哨卡——摧毁并爆破整个建筑，或呼叫空袭。注意销毁内部存在的人员录像和表格名单。',
      },
      {
        clause: 'XV. G',
        text: '发出无法理解语言或者巨大噪音的生物和实体，可能包含军用载具或者无人机——使用军用耳塞后，摧毁。',
      },
    ],
    relatedEntityIds: ['05', '18', '19', '20', '22', '23', '24', '27', '28', '29', '30', '31'],
  },
  'ng9-xv-mn': {
    id: 'ng9-xv-mn',
    documentTitle: 'Bellrona州国民警卫队 特殊时期歼灭班组守则',
    edition: '第9版',
    shortTitle: '歼灭班组守则 第9版 · XV-M / N',
    clauseTag: '特殊实体交战协议',
    clauses: [
      {
        clause: 'XV. M',
        text: '特殊实体“魔方”The Rubik——受到破碎镜像影响的人形生物，类似于破碎镜面中的人类影像，可对观察人员造成巨大的认知扭曲，往往成群出现。务必全力悉数摧毁，并且保证在摧毁完毕后朗读至少一次尾页内容。',
      },
      {
        clause: 'XV. N',
        text: '特殊实体“古茨曼”The Gerstmann——尚且无法确定外形。当此实体出现时，受到影响人员将暂时无法言语，无法理解语言，失去方向感官以及平衡感知。尚无有效对抗方式。',
      },
    ],
    relatedEntityIds: ['09', '12'],
  },
};
