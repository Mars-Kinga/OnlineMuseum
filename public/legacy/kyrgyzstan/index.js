document.addEventListener("DOMContentLoaded", function () {
  // 用户信息弹窗逻辑
  const icon = document.querySelector(".pic");
  let userPopup;

  icon.addEventListener("click", () => {
    if (!userPopup) {
      userPopup = document.createElement("div");
      userPopup.style.position = "absolute";
      userPopup.style.top = "100px";
      userPopup.style.right = "120px";
      userPopup.style.width = "180px";
      userPopup.style.background = "#ffffff";
      userPopup.style.boxShadow = "0px 0px 12px rgba(0,0,0,0.2)";
      userPopup.style.padding = "12px";
      userPopup.style.borderRadius = "8px";
      userPopup.style.zIndex = "100";
      document.body.appendChild(userPopup);
    } else {
      userPopup.remove();
      userPopup = null;
    }
  });

  // 地图圆点设置
  const map = document.querySelector(".pic-3");
  const detailPanel = document.querySelector(".section");
  detailPanel.classList.remove("visible");

  // Approximate coordinates for the 5 locations on the map image
  // The map is 880x473 roughly.
  // We have a map image which we are overlaying dots on.
  // Let's use percentage relative to the .pic-3 container size directly.

  const dotsData = [
    { topPercent: 26, leftPercent: 56, text: "碎叶城遗址" },
    { topPercent: 55, leftPercent: 55, text: "塔什拉巴特驿站" },
    { topPercent: 51, leftPercent: 42, text: "萨伊马鲁-塔什岩画群" }
  ];

  dotsData.forEach((pos, index) => {
    const dot = document.createElement("div");
    dot.className = "map-dot";
    dot.style.position = "absolute";
    dot.style.borderRadius = "50%";
    dot.style.background = "#804430";
    
    dot.style.top = `${pos.topPercent}%`;
    dot.style.left = `${pos.leftPercent}%`;
    dot.style.cursor = "pointer";
    dot.style.zIndex = "45";
    dot.style.boxShadow = "0px 0px 8px rgba(0,0,0,0.2)";
    dot.style.transition = "transform 0.3s ease";

    // 提示框行为
    const tooltip = document.createElement("div");
    tooltip.textContent = pos.text;
    tooltip.style.position = "absolute";
    tooltip.style.top = "-40px";
    tooltip.style.left = "50%";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.background = "#ffffff";
    tooltip.style.padding = "6px 10px";
    tooltip.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
    tooltip.style.borderRadius = "6px";
    tooltip.style.display = "none";
    tooltip.style.zIndex = "100";
    tooltip.style.whiteSpace = "nowrap";

    dot.addEventListener("mouseover", () => {
      dot.style.background = "#caa08c";
      dot.style.transform = "scale(1.4)";
      tooltip.style.display = "block";
    });
    dot.addEventListener("mouseout", () => {
      dot.style.background = "#804430";
      dot.style.transform = "scale(1)";
      tooltip.style.display = "none";
    });
    dot.addEventListener("click", () => {
      // Trigger the corresponding tab click
      buttons[index].click();
      detailPanel.classList.add("visible");
    });

    dot.appendChild(tooltip);
    map.appendChild(dot);
  });

  // 处理关闭逻辑
  const closeDetailPanel = () => {
    detailPanel.classList.remove("visible");
  };

  // 1. 关闭按钮点击
  const closeBtn = document.querySelector(".section-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDetailPanel();
    });
  }

  // 2. 点击外部区域关闭
  document.addEventListener("click", (e) => {
    // 如果详情面板是可见的，并且点击的目标既不是面板本身，也不是面板的子元素，
    // 并且点击的目标也不是地图上的圆点（防止刚打开就关闭）
    const isClickInsidePanel = detailPanel.contains(e.target);
    const isClickOnDot = e.target.classList.contains("map-dot") || e.target.closest(".map-dot");
    
    if (detailPanel.classList.contains("visible") && !isClickInsidePanel && !isClickOnDot) {
      closeDetailPanel();
    }
  });

  // 3. Esc 键关闭
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDetailPanel();
    }
  });

  // 中间按钮设置
  const text1 = `碎叶城遗址(Suyab / Ak-Beshim)\n\n位于楚河州托克马克市西南的碎叶城遗址（阿克-贝希姆遗址），是唐代安西四镇最西端的军政重镇，也是丝绸之路天山北道的关键节点。遗址面积约35公顷，考古发掘揭示了清晰的文化层叠压关系：底层为6至8世纪的粟特人聚落，中层为7至10世纪的唐代城池，上层为10至12世纪的喀喇汗王朝建筑。出土遗物包括唐代莲花纹瓦当、开元通宝钱币、汉式陶器与粟特文骨签文书。其中一件粟特文与汉文双语的残碑尤为珍贵，直接证明了粟特商团与唐代驻军之间的行政管理关系。碎叶城遗址于2014年作为“丝绸之路：长安-天山廊道的路网”组成部分被列入世界文化遗产。`;
  const text2 = `塔什拉巴特驿站(Tash Rabat Caravanserai)\n\n位于纳伦州阿特巴希山区的塔什拉巴特，是丝绸之路上保存最完好的高山石头驿站之一。建筑主体由粗琢石块垒砌，中央为穹顶大厅，四周环绕31个大小不等的房间和马厩，整体平面略呈矩形，面积约2000平方米。其始建年代尚有争议，一说为10至12世纪喀喇汗王朝的商队驿站，一说为更早的景教修道院改建而成。塔什拉巴特海拔超过3500米，是中亚现存海拔最高的丝路石头建筑，其选址表明古代商队宁可翻越陡峭的天山支脉以避开河谷中的匪患与关卡盘剥。建筑内部的壁龛、拴马石和排水系统至今清晰可辨。`;
  const text3 = `萨伊马鲁-塔什岩画群(Saimaluu-Tash Petroglyphs)\n\n位于贾拉拉巴德州费尔干纳山脉的萨伊马鲁-塔什，是中亚规模最大、年代跨度最长的岩画遗址群。在海拔3000至3500米的高山牧场中，超过十万幅岩画散布于数平方公里的玄武岩巨石表面，年代从公元前三千纪的青铜时代延续至公元后一千年左右的突厥时期。岩画题材涵盖野山羊、马、骆驼、雪豹、狩猎场景、祭祀舞蹈以及太阳轮符号。值得注意的是，不同时期的岩画呈现出明显的风格差异：早期岩画以简洁的线条勾勒动物轮廓，具有典型的斯基泰-西伯利亚动物风格；晚期岩画则出现骑射手和重甲骑兵的形象，与突厥时期的军事技术变革相对应。萨伊马鲁-塔什岩画群为研究天山地区游牧文明数千年的精神世界与社会变迁提供了不可替代的视觉档案。`;
  const text4 = `草原石人：突厥时期的墓葬雕塑\n\n散布于吉尔吉斯斯坦楚河谷地、伊塞克湖盆地和天山山谷中的石人雕像，是公元6至10世纪突厥汗国时期游牧墓葬的典型遗存，其在哈萨克斯坦境内也有遗存。这些石人以花岗岩或砂岩雕刻，高度通常在1至1.5米之间，刻画了蓄须的男性武士形象，右手多持杯或握剑，腰间束带，面部表情庄严肃穆。考古学研究表明，石人并非墓主本人的肖像，而是象征被墓主生前杀死的敌人，在死后继续为其服役。石人一律面朝东方——突厥人崇拜日出的方向。据不完全统计，吉尔吉斯斯坦境内现存石人超过300尊，但多数已遭盗掘或风化，原地保存的完整石人不足百尊。`;
  const text5 = `出土文献中的天山商路\n\n吉尔吉斯斯坦境内发现的古代文书数量远不及塔吉克斯坦（片治肯特）或乌兹别克斯坦（撒马尔罕），但仍有若干关键发现值得重视。1950年代，在塔拉斯河谷发现了一块刻有古突厥如尼文的石碑，铭文记载了一位突厥贵族去世后其子为其举行的丧葬仪式及所杀敌人的数目。同一区域还出土了粟特文和叙利亚文（景教）的陶片刻字，表明天山北道在突厥汗国时期是多种语言文字并行使用的文化交流走廊。2010年代，在碎叶城附近的一处窖藏中出土了数枚喀喇汗王朝时期的阿拉伯文铜币与宋代钱币的混合堆积，再次确证了10至12世纪天山商路在伊斯兰化后仍与中原保持着紧密的贸易联系。`;
  const text6 = `吉尔吉斯毡毯\n\n吉尔吉斯毡毯是游牧物质文化的核心代表之一，其制作工艺可追溯至公元前一千纪的斯基泰时期。考古学家在阿尔泰山区巴泽雷克墓冢中出土的公元前5世纪毛毡制品，其镶边技法和对称纹样与现代吉尔吉斯毡毯高度一致，表明这一技艺已传承至少2500年。Shyrdak采用双层毛毡镶嵌法制作：将染色的上层毛毡切割出纹样，再嵌入下层毛毡的镂空部分，形成正负形的色彩对照。传统纹样包括公羊角（象征力量）、狗尾（象征忠诚）、鹰翅（象征自由）和波浪（象征生命之水），每一幅毡毯都是一套完整的象征系统。由于现代合成染料和工业制毡的冲击，掌握全套传统技法的匠人已不足百人，2012年被列入联合国急需保护的非物质文化遗产名录。`;
  const text7 = `银饰\n\n吉尔吉斯斯坦国家历史博物馆收藏的一套19世纪吉尔吉斯新娘银饰，重达8公斤，包括额饰、胸饰、背饰和发饰四个部分。银饰表面以錾刻、镂空和镶嵌工艺装饰，红玛瑙和绿松石是使用最多的宝石材料。值得注意的是，同一套首饰上的纹样往往融合了伊斯兰几何图案、萨满教动物符号与佛教莲花纹——这种跨宗教的视觉混搭在严格意义上“犯规”，但在丝路游牧民族的审美传统中却顺理成章。`;


  const contentMap = [text1, text2, text3, text4, text5, text6, text7];
  const imageMap = [
    "images/suiye.png", 
    "images/tashila.png", 
    "images/sayima.png",
    "images/stone.jpg", 
    "images/tianshan.jpg",
    "images/tanzi.png",
    "images/silver.png"
  ];

  const buttons = document.querySelectorAll(".box-3");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      document.querySelector(".text-3").textContent = contentMap[index];
      const imgElement = document.querySelector(".content-img");
      if (imgElement) {
        if (imageMap[index]) {
          imgElement.src = imageMap[index];
          imgElement.style.display = "block";
        } else {
          imgElement.style.display = "none";
        }
      }
      detailPanel.classList.add("visible");
    });
  });

  // 底部按钮设置
  const buttonContentMap = {
    ".geography": "天山的脊梁：冰川与湖水的对话\n吉尔吉斯斯坦是名副其实的“中亚水塔”。天山山脉的现代冰川面积超过8000平方公里，是中亚地区阿姆河、锡尔河、塔里木河等大河水系的重要补给源。而镶嵌于天山怀抱中的伊塞克湖，是世界第二大高山咸水湖（仅次于的的喀喀湖），水面海拔1608米，冬季从不结冰，在当地语言中意为“热湖”。湖水呈现出令人难以置信的湛蓝色调，与环湖的雪峰形成摄人心魄的视觉对照。\n奇绝的地貌：从高山草甸到核桃林海\n永恒的冰雪：天山冰川群：包括南英尼尔切克冰川（长60公里，世界最长的高山冰川之一），这些冰川不仅塑造了险峻的角峰与U形谷，更是中亚干旱区亿万人口的生命线。\n高山明珠：伊塞克湖：长182公里，宽60公里，最深处达702米。湖水中含盐量适中，湖底沉睡着中世纪丝路古城遗址，是考古学家尚未完全揭开的谜题。\n夏日牧场：贾拉拉巴德草原：海拔2500至3500米的亚高山草甸，夏季呈现出绿绒毯般的柔美景观，是吉尔吉斯游牧文明延续三千年的物质基础。\n活化石森林：阿尔斯兰博布核桃林：世界上最大的野生核桃林，面积约60万公顷，部分树木已生长超过千年。遗传学研究表明，这片森林可能是现代栽培核桃的原生基因库。",
    ".history": "吉尔吉斯斯坦的历史，是一部游牧民族在高山与谷地间不断迁徙、融合与重生的史诗。由于地处欧亚大陆腹地，这里既是丝绸之路的险峻通道，也是各大帝国势力此消彼长的边缘地带。西迁的匈奴、南下的突厥、西征的蒙古、东扩的沙俄，每一股力量都在天山褶皱中留下了印记，却没有任何一个帝国能完全驯服这片高山之地。\n\n丝路险途：碎叶城与天山谷道\n在丝绸之路的全盛时期，天山并非阻隔，而是通道。汉代张骞凿空西域、唐代玄奘西行取经、元代马可·波罗东游，都曾穿越吉尔吉斯斯坦的山谷。位于楚河流域的碎叶城（今托克马克附近）是唐代安西四镇中最西端的一镇，也是中国历代中原王朝在西域设置的最远军政据点之一。据郭沫若考证，诗仙李白即出生于碎叶城（公元701年），五岁时随父迁居四川。这一说法虽有争议，但碎叶城遗址出土的唐代“开元通宝”钱币与汉式瓦当，确凿证明了大唐行政体系曾在此有效运作。\n\n游牧帝国：从黠戛斯到吉尔吉斯汗国\n现代吉尔吉斯人的直系祖先可追溯至古叶尼塞河流域的黠戛斯人。公元9世纪，黠戛斯汗国曾击败回鹘汗国，一度称雄漠北。约在10至15世纪，黠戛斯人逐渐南迁至天山地区，与当地突厥、蒙古部落融合，形成了近现代意义上的吉尔吉斯民族。在这一漫长的迁徙与融合过程中，吉尔吉斯人始终保持着以部落为基本单位的游牧社会组织，从未建立起统一的中央集权国家。这种高度分散的部落结构，使其在面对准噶尔汗国、浩罕汗国等外来征服时屡屡处于劣势，但也因此保存了独特的口传史诗传统与部落民主议事制度。\n\n帝国的边缘：浩罕统治与沙俄征服\n18至19世纪，吉尔吉斯斯坦大部分地区处于浩罕汗国的控制之下。浩罕汗国强征重税、修筑堡垒，引发吉尔吉斯各部落的持续反抗。1860至1880年代，沙俄帝国趁浩罕内乱之机，逐步吞并吉尔吉斯地区。与哈萨克草原的相对和平并入不同，吉尔吉斯山谷中爆发了多次激烈抵抗，最著名的是1873至1876年的阿赖山谷大起义，由女首领库尔曼江·达特卡领导。她最终被迫降俄，但因其威望过高，沙俄当局破例授予她“阿赖女王”的虚衔，允许其继续以半自治状态管理部落事务。\n\n苏联的遗产与现代国家的诞生\n苏联时期，吉尔吉斯经历了剧烈的社会改造：游牧民被强制定居，部落首领遭到清洗，文字从阿拉伯字母改为拉丁字母再改为西里尔字母，大片牧场被开垦为棉田。与此同时，苏联也带来了现代教育、工业基础和基础设施建设。1991年苏联解体，吉尔吉斯斯坦获得独立，成为中亚五国中政治转型最为波折的国家——经历了两次革命（2005年“郁金香革命”与2010年“四月革命”）、三次修宪和多次政权更迭，在中亚普遍盛行的强人政治中显得格外动荡。",
    ".industry": "资源禀赋：吉尔吉斯斯坦的自然资源呈现“上天不厚，入地有余”的特点。黄金储量位居世界前列，库姆托尔金矿是世界十大金矿之一，其产值一度占全国GDP的10%以上。此外，该国拥有中亚最大的水力发电潜力，纳伦河梯级电站群不仅供应本国，还向邻国出口电力。锑、汞、稀土等战略性矿产储量丰富，但受制于基础设施落后，多数矿藏尚未规模化开发。农业方面，高山牧场的天然草场面积超过900万公顷，畜牧业是国民经济的传统支柱，但生产仍以家庭放牧为主，商品化率较低。\n\n产业现状：经济结构呈现“金矿独大、劳务输出为生”的二元特征。库姆托尔金矿是单一最大的外汇来源，但该矿由加拿大公司控股经营，利润分成长期引发国内争议，2022年才完成国有化。由于国内就业岗位严重不足，约70至100万吉尔吉斯公民（占劳动人口近三分之一）在俄罗斯务工，侨汇收入占GDP的25%至30%，使吉尔吉斯斯坦成为全球最依赖侨汇的经济体之一。轻工业几乎空白，大量日用消费品依赖从中国和土耳其进口。\n\n发展挑战：吉尔吉斯斯坦面临“高山困境”的多重约束：国土高度碎片化导致交通基建成本极高，国内市场狭小难以培育规模产业，水资源丰富但缺乏调节能力造成冬季电力短缺，对俄侨汇的高度依赖使经济极易受外部冲击。如何在保持议会民主制度的前提下推动经济增长、降低对单一金矿和侨汇的双重依赖，是比什凯克决策者面临的根本性难题。",
    ".ethnicity": "部落底色与国家认同：吉尔吉斯斯坦虽以吉尔吉斯族为主体民族（约占73%），但真正的社会组织密码隐藏在部落认同之中。吉尔吉斯传统社会分为左翼、右翼和内翼三大部落联盟，其下再细分数十个大小部落。苏联时期，部落认同被视为“封建残余”遭到压制，但从未真正消失。独立后，部落归属重新成为政治动员和社会网络的核心资源：历任总统的出身部落、内阁的部落平衡、议会选举中的部落票仓，均是吉尔吉斯政治的隐形操作系统。这种“名义上的现代国家、实质上的部落联邦”格局，使国家认同建设始终步履维艰。\n\n多元民族共生：除吉尔吉斯族外，乌兹别克族（约占15%）集中分布于南部的奥什和贾拉拉巴德地区，2010年曾爆发严重的民族冲突。俄罗斯族（约占5%）主要居住在比什凯克和楚河州，苏联解体后人口大量外流，但俄语至今仍是事实上的族际通用语。此外，还有东干人（清末西北回民后裔）、维吾尔人、塔吉克人等少数民族。南部费尔干纳谷地的民族分布与边境线高度错位，在苏联划界时埋下了大量“飞地”和领土争议的隐患。\n\n吉尔吉斯族：\n语言：属突厥语系钦察语支，与哈萨克语高度互通。苏联时期改用西里尔字母，独立后虽多次讨论拉丁化改革，但至今沿用西里尔字母书写。\n\n传统象征：\n白毡帽（Kalpak）：吉尔吉斯男性的标志性头饰，以白色羊毛毡制成，帽型高耸，帽檐上绣有部落纹样。不同年龄和社会地位对应不同的帽型和纹饰。2019年，吉尔吉斯斯坦设立了“白毡帽日”（3月5日）。\n毡房（Boz üy）：吉尔吉斯游牧民居，结构与哈萨克毡房相似，但内部装饰以红色调为主，穹顶的交叉木条更为密集。毡房的搭建和拆卸仍遵循严格的性别分工。\n\n驯鹰传统：天山深处的吉尔吉斯牧人保留着用金雕狩猎的古老技艺，猎人与金雕之间的合作关系可达十年以上，最终金雕会被放归自然。这一传统被列入联合国非遗。\n\n精神世界：伊斯兰教逊尼派为信仰主体，但游牧生活方式使宗教实践长期带有强烈的民间信仰色彩。自然崇拜（山神、水神、祖先陵墓）与苏菲派圣墓朝拜交织共存，宗教仪式往往融入萨满遗俗。苏联时期无神论教育造成宗教知识的代际断层，独立后出现了“重新伊斯兰化”与传统习俗之间的复杂调适。",
    ".funfact": "“离海最远”的极致内陆国\n吉尔吉斯斯坦是世界上最内陆的国家之一，从国境线到任何海洋的距离都在3000公里以上。但伊塞克湖的存在让当地人产生了一种错觉：“我们有自己的海。”湖边甚至有一座苏联时期的“海军基地”，用于鱼雷测试。\n\n苏联潜艇在高原湖：冷战时期，苏联海军在伊塞克湖设有一个绝密的鱼雷试验基地，至今湖底仍沉睡着多艘废弃的试验潜艇。一个高山内陆国居然有“潜艇残骸潜水”的旅游项目。\n\n虽然国际上普遍认为核桃原产波斯，但吉尔吉斯斯坦坚称阿尔斯兰博布的野生核桃林才是正源。2017年，一株树龄约1200年的“核桃王”被列为国家自然遗产，当地新婚夫妇要绕树三圈以求多子多福。\n\n天然冰箱：山区牧民至今沿用一种古老的肉类保存法——将宰杀后的羊腔缝合后埋入冰川边缘的冻土层，可以保鲜数年之久。这种“冰川羊肉”取出时色泽如新，是招待贵客的最高礼遇。\n\n这个国家拥有中亚最大的核桃林，却几乎不出口核桃；拥有世界级的高山湖泊，却因为污染问题禁止大规模渔业；拥有无与伦比的夏季牧场，却将大部分牛羊肉出口给邻国。\n\n李白出生地的“户口之争”\n碎叶城是李白的出生地这一说法，主要依据是李阳冰《草堂集序》与范传正《唐左拾遗翰林学士李公新墓碑》的记载。但考古发掘显示，碎叶城在唐代确实存在完整的汉式官署建筑群，其规模与等级完全符合安西四镇的建制。至于李白是否真在此生活过——他的诗歌中从未提及天山雪峰，这本身就是一个有趣的文学悬案。\n\n玄奘笔下的“大清池”\n公元630年，玄奘西行途经伊塞克湖，在《大唐西域记》中留下了关于“大清池”的精确记载：“周千余里，东西长，南北狭。四面负山，众流交凑，色带青黑，味兼咸苦。”这是世界上对伊塞克湖最早的科学描述之一，比俄国探险家的测绘早了整整1200年。\n\n女汗王的传奇人生\n库尔曼江·达特卡（1811—1907）是中亚近代史上最传奇的女性人物。她出身普通牧民家庭，因智慧超群被阿赖部落推举为统治者，浩罕汗国和沙俄都不得不承认其权威。晚年她被迫亲眼目睹自己的儿子因反俄起义被处决，从此深居简出，终身缟素。她的肖像至今印在吉尔吉斯斯坦50索姆纸币上。"
  };

  Object.keys(buttonContentMap).forEach(selector => {
    const button = document.querySelector(selector);
    if (button) {
      button.addEventListener("click", () => {
        document.querySelector(".text-c").textContent = buttonContentMap[selector];
      });
    }
  });
  
  // 图片点击放大预览逻辑
  const contentImg = document.querySelector(".content-img");
  if(contentImg) {
    contentImg.addEventListener("click", () => {
      if(contentImg.src) {
        const modal = document.querySelector(".image-modal");
        const modalImage = modal.querySelector(".image-modal-content");
        modalImage.src = contentImg.src;
        modal.style.display = "flex";
      }
    });
  }

  // 点击遮罩关闭预览
  const modal = document.querySelector(".image-modal");
  if(modal) {
    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // 返回主页按钮
  const backBtn = document.createElement('button');
  backBtn.className = 'back-home';
  backBtn.textContent = '返回主页';
  backBtn.addEventListener('click', () => {
    window.location.href = '/';
  });
  document.body.appendChild(backBtn);
});
