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
      userPopup.innerHTML = `
        <div>用户名</div>
        <div>邮箱</div>
        <div>个人收藏</div>
        <div>退出登录</div>
      `;
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
  // 塔姆加里岩画: East (Right) ~75% X, ~35% Y
  // 亚萨维陵墓: South (Bottom) ~55% X, ~60% Y
  // 奥特拉尔古城: South West ~45% X, ~65% Y
  // 塔拉兹: South East ~65% X, ~70% Y
  // 萨乌兰遗址: South ~50% X, ~62% Y

  const dotsData = [
    { topPercent: 78, leftPercent: 72, text: "塔姆加里岩画" },
    { topPercent: 83, leftPercent: 53, text: "亚萨维陵墓" },
    { topPercent: 80, leftPercent: 70, text: "奥特拉尔古城" },
    { topPercent: 82, leftPercent: 60, text: "塔拉兹" },
    { topPercent: 80, leftPercent: 52, text: "萨乌兰遗址" }
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
  const text1 = `塔姆加里岩画（Tamgaly）\n\n塔姆格里是哈萨克斯坦七河地区的一处岩刻遗址，位于阿拉木图西北方170公里处，2004年入选联合国教科文组织世界文化遗产名录。当地有5000幅岩画，其中大多数位于主要的峡谷，周围的峡谷也有分布。岩画多数出自青铜时代，其中部分被中世纪或后来的蚀刻版画覆盖。部分岩画的年代可追溯到铁器时代。`;
  const text2 = `霍贾·艾哈迈德·亚萨维陵墓\n\n是位在哈萨克斯坦南部突厥斯坦的一座麻札。这座建筑于1389年由帖木儿委托兴建，他以统治以及扩张帖木儿帝国而知名。以取代著名的突厥诗人和苏非神秘主义者艾哈迈德·亚萨维（1093－1166）的一座较小的12世纪陵墓。但是帖木儿于1405年去世，工程也随之停止。今天，霍贾·艾哈迈德·亚萨维陵墓成为了帖木儿时期规模最大、保存最完整的建筑之一。`;
  const text3 = `奥特拉尔古城\n\n也称讹答剌，是古代丝绸之路上重要的商贸枢纽城市，8世纪时成为中亚地区最大城市之一，鼎盛时期人口逾十万。该城作为喀喇汗王朝至花剌子模时期的重要战略据点，10-12世纪先后隶属喀喇汗王朝和西辽政权，因1218年成吉思汗使者被杀事件成为蒙古西征的导火索，最终在1219年被蒙古军队彻底摧毁，14世纪帖木儿帝国时期曾短暂复兴。现存遗址位于哈萨克斯坦奇姆肯特市境内锡尔河与阿雷斯河交汇处，包含古代居民区、清真寺等考古遗迹，反映了中世纪中亚城市建筑的典型特征，目前正进行联合国教科文组织的保护与修复项目。`;
  const text4 = `塔拉兹\n\n是哈萨克斯坦江布尔州首府，位于该国南部塔拉兹河畔，邻近吉尔吉斯斯坦，市区面积187.8平方公里，2017年人口约35.75万。\n\n地处西天山与卡拉套山西麓，属大陆性气候，年均气温11.3℃。历史可追溯至西汉时期，5世纪已为丝路北线重镇，曾作为突奇施、葛逻禄等王朝都城，历史上先后更名为奥利埃—阿塔、米尔卓扬、江布尔，1997年恢复现名。`;
  const text5 = `萨乌兰（索兰）遗址（Sauran）\n\n最早提及这座城市的记载之一来自阿拉伯地理学家穆卡达西，他在 10 世纪将其描述为“一座被七道城墙环绕的大城市，清真寺位于内城”。1065 年，该城臣服于塞尔柱王朝，这是喀喇汗国转变为塞尔柱王朝附庸国的一部分。大约在14世纪70年代，当该地区处于乌鲁斯汗的统治之下时，蓝帐汗国的脱脱密士在帖木儿的大力支持下，试图征服该地区，目标是统治萨乌兰、奥特拉尔、萨加纳克、塞拉姆、塞莱等城市。该城为建造霍贾·艾哈迈德·亚萨维陵墓提供了砖瓦，该陵墓由帖木儿于1389年下令建造，位于距该城25英里（40公里）处。到了15世纪，这座城市与明朝建立了外交关系，明朝在《明史录》中将该城记载为掃蘭（saolan）。诗人宰因丁·马哈茂德·瓦西菲于1514年至1515年间到访该城，并描述了该城的坎儿井水利设施。与奥特拉尔一样，这座城市也因丝绸之路的衰落和该地区的权力斗争而遭受重创。`;

  const contentMap = [text1, text2, text3, text4, text5];
  const imageMap = [
    "images/tamgaly.jpeg", 
    "images/yasawi.jpeg", 
    "images/otrar.jpeg", 
    "images/taraz.jpeg", 
    "images/sauran.jpeg"
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
    ".geography": "辽阔的疆域：地广人稀的国度\n哈萨克斯坦面积约272万平方公里（相当于整个西欧），却仅有约1900万人口，人口密度极低。其国土从东部的阿尔泰山延伸至西部的里海，北接俄罗斯，南邻中亚诸国，东西跨度超过3000公里，坐火车横穿全国需要两天以上。\n\n多样的地貌：从雪山到荒漠的极致对比\n哈萨克斯坦的地形极为丰富，堪称“微缩版大陆”：\n草原：北部是广袤的欧亚大草原，曾是游牧文明的摇篮。\n沙漠与半荒漠：中部和西南部分布着克孜勒库姆沙漠和别特帕克达拉荒漠，荒凉而壮美。\n高山与冰川：东南部的天山山脉和阿尔泰山脉终年积雪，最高峰汗腾格里峰（Khan Tengri）海拔7010米。\n湖泊与内海：世界最大的内陆湖里海部分属于哈萨克斯坦，而巴尔喀什湖则一半咸水、一半淡水，堪称奇观。",
    ".history": "哈萨克斯坦的历史，是一部波澜壮阔的史诗，是游牧文明与农耕文明在此消彼长中谱写的壮美篇章。这片广袤的土地，既是古代丝绸之路的黄金通道，又是欧亚大陆文明碰撞与交融的见证者。\n\n远古的回响：青铜时代的文明曙光\n早在青铜时代，这片土地就孕育了璀璨的安德罗诺沃文化。公元前7世纪，骁勇善战的斯基泰人在这里建立了最早的游牧帝国，他们精湛的黄金工艺至今令人叹为观止。随后，匈奴、突厥等游牧民族相继在此驰骋，将马背上的文明推向巅峰。\n\n信仰的播种：伊斯兰文明的传入与哈萨克汗国的崛起\n公元8世纪，阿拉伯人带来了伊斯兰文明，在草原上播撒下新的文化种子。13世纪，成吉思汗的铁骑横扫欧亚，哈萨克斯坦成为蒙古帝国金帐汗国的重要组成部分。15世纪，哈萨克汗国崛起，三个玉兹（部族联盟）的建立标志着哈萨克民族的形成。\n\n帝国的角逐与苏联的烙印\n18世纪，沙俄的东扩改变了这片草原的命运。苏联时期，这里成为重要的工业基地和“面包篮子”，也经历了集体化运动带来的阵痛。1991年，随着苏联解体，哈萨克斯坦宣告独立，开启了崭新的历史篇章。\n\n永恒的草原：传统与未来的交响\n如今，古老的草原传统与现代文明在这里交相辉映。从金人的辉煌到航天城的现代，从游牧的毡房到新都的摩天大楼，哈萨克斯坦的历史就像其广袤的草原一样，永远充满着无限的可能与生机。",
    ".industry": "资源禀赋：哈萨克斯坦是全球资源宝库，坐拥世界12%的铀矿储量、300亿桶石油和广袤的耕地，其铬、钨产量称霸全球，马肉出口量世界第一，堪称“地下冒石油、地上跑骏马”的资源王国.\n\n产业现状：经济仍以能源矿产为支柱（占出口70%），但正加速转型：汽车制造对接国际品牌，风电光伏装机量领跑中亚，阿斯塔纳金融中心吸引科技企业，传统游牧饮食（马奶酒、干奶酪）也升级为特色食品工业。\n\n发展挑战：尽管手握“资源王炸”，哈萨克斯坦仍需破解“荷兰病”困局——过度依赖油气导致经济波动，未来需在绿色能源、中欧物流枢纽建设和高科技产业培育中找到新增长极，让黑金红利真正转化为全民福祉。",
    ".ethnicity": "多民族共生的“中亚熔炉”：哈萨克斯坦是全球民族多样性最显著的国家之一，全国生活着140多个民族。主体民族哈萨克族约占70%，俄罗斯族占15%，其余包括乌兹别克族、乌克兰族、维吾尔族、德意志族、朝鲜族等。这种多元构成源于沙俄扩张、苏联民族迁移政策以及丝绸之路的千年交融，形成了独特的文化共生现象。苏联时期因垦荒计划迁入大量俄罗斯人、德意志人，而20世纪30年代被流放至哈的朝鲜族群体，如今已成为全球唯一说俄语方言的朝鲜裔社群。\n\n哈萨克族：草原文明的传承者：作为游牧文化的活态继承者，哈萨克族保留着深厚的传统习俗：\n语言：属突厥语系，原用阿拉伯字母，苏联时期改用西里尔字母，2017年起逐步推行拉丁化改革。\n社会组织：历史上分为大、中、小三个“玉兹”（部落联盟），至今仍影响社会关系网。\n精神象征：金雕狩猎、冬不拉弹唱、“叼羊”马术比赛被列入非遗，国宝级诗人阿拜·库南巴耶夫的思想仍是民族精神指南。",
    ".funfact": "1. “我们真的不在哈萨克斯坦！”——面积梗王\n哈萨克斯坦的国土面积可以装下整个西欧，却只有1800万人口（相当于北京常住人口）。在这里，你可以开车一整天都看不到一个人影，但可能会遇见成群的野马——毕竟这里的马比人多3倍！\n\n2. 地理课代表的噩梦\n• 同时存在沙漠（克孜勒库姆沙漠）、雪山（天山山脉）、草原（欧亚大草原）和内陆海（里海）\n• 官方时区是UTC+6，但实际横跨两个时区\n• 首都从阿拉木图搬到阿斯塔纳（现名努尔苏丹），因为...总统觉得这里太靠边了\n\n3. 离谱的冷知识\n• 拜科努尔航天发射场：人类首个太空人加加林就是从这里上天的，但...这个“哈萨克斯坦的航天中心”至今租给俄罗斯使用\n• 苹果的祖籍：阿拉木图在哈萨克语意为“苹果之城”，现代苹果的基因溯源都指向这里的野生苹果林\n• 魔幻建筑收集癖：新首都努尔苏丹有座“生命之树”观景塔，晚上亮灯像巨型外星玉米棒\n\n4. 地理课不会教你的\n当地人说“我们哈萨克人骑马不用学”——小孩3岁就被抱上马背，传统婚礼要抢“姑娘追”，新郎策马狂奔时新娘可以拿鞭子抽他（真·硬核婚俗）\n\n5. 终极地理悖论\n这个国家用俄语字母拼写哈萨克语，用坚戈当货币，用“你是我的灵魂”当国歌歌词，还发明了用马奶发酵的碳酸饮料（喝起来像啤酒+酸奶的混合体）——建议地理考试时直接放弃理解 "
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
