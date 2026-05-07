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
    { topPercent: 65, leftPercent: 45, text: "尼萨古城（帕提亚遗存）" },
    { topPercent: 72, leftPercent: 63, text: "梅尔夫古城" },
    { topPercent: 11, leftPercent: 47, text: "库尼亚-乌尔根奇遗址（伊斯兰建筑遗存）" }
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
  const text1 = `尼萨古城（帕提亚遗存）\n\n位于阿什哈巴德以西18公里的尼萨古城，是帕提亚帝国（公元前3世纪至公元3世纪）最早的都城之一，也是联合国教科文组织认定的世界文化遗产。尼萨的考古发掘揭示了一个高度希腊化的东方宫廷：出土的大理石雕像残件明显模仿希腊古典风格，而象牙角杯（Rhyton）上的浮雕则将希腊酒神狄俄尼索斯的形象与波斯神话中的神兽格列芬并置。尤为重要的是，在尼萨王宫的库房遗址中发现了刻有阿拉米字母的陶片文书，记录了大量葡萄酒的进出库明细。这些文书不仅证明帕提亚时期丝路贸易的管理已高度官僚化，也佐证了中亚绿洲作为葡萄酒东传中转站的关键地位。`;
  const text2 = `梅尔夫古城\n\n梅尔夫古城位于今土库曼斯坦东南部，其考古地层厚度达15米，涵盖从公元前6世纪的波斯堡垒到13世纪蒙古入侵前的塞尔柱都城，时间跨度近两千年。梅尔夫出土文物中最具学术价值的，是不同时期宗教建筑的叠压关系：佛教窣堵坡的基址之上建起了琐罗亚斯德教的火庙，火庙倾圮后又被改建为清真寺。这种“信仰地层学”清晰呈现了佛教、祆教与伊斯兰教沿丝绸之路依次东渐西传的历史进程。此外，梅尔夫出土的唐代风格铜镜残片、萨珊波斯银币与阿拉伯金币的共出堆积，为研究8至10世纪丝路贸易的货币流通提供了关键物证。`;
  const text3 = `库尼亚-乌尔根奇遗址（伊斯兰建筑遗存）\n\n位于土库曼斯坦北部的库尼亚-乌尔根奇，是花剌子模地区最重要的中世纪城市遗址。现存文物建筑群包括12世纪的伊尔-阿尔斯兰陵墓、14世纪的库特鲁格-帖木尔宣礼塔及苏菲派圣者纳杰梅丁·库布拉的陵寝。其中，库特鲁格-帖木尔宣礼塔高约60米，塔身以蓝釉砖镶嵌库法体《古兰经》经文，是中亚伊斯兰砖构建筑的典范之作。值得注意的是，在圣陵墙壁的装饰层中，考古学家发现了多片元代龙泉窑青瓷的镶嵌残片。这些瓷器极有可能是13世纪蒙古西征时从中原带入的战利品或贸易品，后被当地人视为珍物，刻意嵌入神圣建筑以彰显尊崇。`;
  const text4 = `土库曼地毯\n\n土库曼地毯不仅是实用器物，更是承载民族历史与部落认同的纺织文物。现存最早的土库曼地毯残片出土于蒙古境内的匈奴贵族墓葬（公元前1世纪），其织法与19世纪土库曼特克部落的地毯高度相似，表明这一编织传统已延续两千余年。土库曼地毯的核心纹样“古尔”（Gul）实为部落徽章的抽象化表达，不同部落拥有各自专属的古尔图案，代代相传，不得混用。正因如此，每一张传统土库曼地毯都可视作一部加密的部落系谱，记录了婚姻联盟、支系分化与迁徙路线等关键历史信息。土库曼斯坦国旗左侧的垂直条纹图案，即取材自特克部落的古尔纹样，这是世界上唯一将纺织纹样纳入国旗设计的国家。`;
  

  const contentMap = [text1, text2, text3, text4];
  const imageMap = [
    "images/nisa.png", 
    "images/mei.png", 
    "images/ku.png", 
    "images/tu.png"
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
    ".geography": "灼热的疆域：\n土库曼斯坦是中亚人口密度最低的国家之一，绝大多数城镇和生命线都依赖于卡拉库姆运河和阿姆河的灌溉绿洲。首都阿什哈巴德宛如沙漠中升起的一座白色大理石幻境，而一旦离开城市，你将进入一片由沙丘、骆驼刺和烈日主宰的原始寂静。\n\n奇绝的地貌：\n永恒的火焰：达尔瓦扎气坑。位于沙漠中心的巨大火坑，1971年因苏联地质勘探事故点燃，至今未曾熄灭，成为地球上最接近《圣经》中“地狱”形象的景观，烈焰在夜幕下尤为震撼。\n沉默的沙海：卡拉库姆沙漠：占据国土五分之四，盛产顽强的沙漠动植物，包括著名的阿哈尔捷金马（汗血宝马）的故乡。\n史前足迹：库吉唐套山脉：这里不仅有深邃的峡谷，还保留着世界上最多的恐龙脚印化石群，仿佛一部凝固在岩石上的侏罗纪公园。\n多彩的峡谷：扬吉卡拉峡谷：因风蚀作用形成火星般的红、橙、粉、白色岩层，被誉为“地球上最像外星球的地方”。",
    ".history": "土库曼斯坦的历史，是一部在绿洲与沙漠间书写的文明漂流记，更是丝绸之路的硬核咽喉。这里没有广阔的海洋，但驼铃在沙海中的每一次摇动，都连接着波斯、希腊、中国与草原帝国的命运。\n\n丝路枢纽：从帕提亚到梅尔夫的荣光\n早在青铜时代，这里就出现了发达的绿洲文明。公元前3世纪，来自土库曼斯坦土地上的帕提亚人（安息帝国）崛起，成为与罗马、汉朝并立的世界强国，垄断了当时丝路上的转口贸易。而在中世纪，梅尔夫古城（Merv）不仅是塞尔柱突厥帝国的首都，更是与巴格达、大马士革齐名的伊斯兰世界学术中心，曾有“谋夫城，苏丹庇荫之地”的美誉，图书馆藏书之丰令当时的欧洲学者望尘莫及。\n\n征服的尘埃：从蒙古铁骑到沙俄荒漠\n13世纪，成吉思汗的军队将梅尔夫夷为平地，据传屠杀了百万人口，丝路绿洲的繁华戛然而止。此后的几百年里，土库曼各部落在这片被摧毁的土地上过着游牧劫掠的生活，并以桀骜不驯的骑手闻名。19世纪，沙俄帝国的征服列车开进沙漠，土库曼人进行了殊死抵抗，格奥克捷佩堡战役的悲壮至今仍是民族记忆的核心。\n\n中立与封闭：现代国家的炼成\n苏联解体后，土库曼斯坦获得了意想不到的独立。在首任总统尼亚佐夫（自封“土库曼巴希”，意为所有土库曼人的领袖）统治下，该国奉行极端的“永久中立”政策，几乎隔绝了外界的影响，形成了独特的政治文化。现任总统谢尔达尔·别尔德穆哈梅多夫延续了这一“密室”状态，使土库曼斯坦成为中亚最难以捉摸却又稳定的国家。",
    ".industry": "资源禀赋：土库曼斯坦是名副其实的“蓝金之国”。其天然气储量高居世界第四，尤其是南约罗坦奥斯曼气田，是世界第二大单体气田。此外，这里是中亚最大的棉花产地之一，传统的阿哈尔捷金马养殖、卡拉库尔羊羔皮和手工地毯编织构成了独特的游牧产业基底。\n\n产业现状：经济高度依赖天然气出口（占外汇收入80%以上），近年来由于国际气价波动和主要客户（如俄罗斯、中国）需求变化，经济面临转型压力。阿什哈巴德致力于打造“中亚的白色迪拜”，大兴土木建设豪华酒店与机场。同时，借助里海港口土库曼巴希，该国正试图将自己重塑为连接中国中亚欧洲的交通物流走廊。\n\n发展挑战：土库曼斯坦面临着比哈萨克斯坦更严重的“资源魔咒”。经济结构的单一导致严重的隐性失业和通货膨胀，官方汇率与黑市汇率长期脱节。如何在不放弃“永久中立”与封闭管控的前提下，开放市场并解决咸海生态灾难带来的农业萎缩，是其最大的生存课题。",
    ".ethnicity": "部落底色与“大一统”叙事：土库曼斯坦虽宣称民族构成单一（土库曼族占85%以上），但真正主导社会结构的，是五大部落：特克、约穆德、萨雷克、埃尔萨里、乔乌杜尔。这五大部落的图腾与纹样至今体现在国旗、地毯和妇女的首饰上。苏联时期的民族划界强行将土库曼部落分割在不同加盟国（如伊朗仍有大量土库曼人），而现代国家则在努力用“土库曼巴希”或“国家中立”的概念弥合根深蒂固的部落认同。\n\n语言：属突厥语系乌古斯语支，与土耳其语、阿塞拜疆语高度相通。独立后迅速改用拉丁字母，并大量清除俄语借词。\n\n传统象征：\n  地毯：世界三大地毯产地之一。土库曼地毯特有的“Teke Gul”（特克部落徽章）被印在国旗左侧，被列入联合国非遗。每一张地毯都是部落妇女编织的加密家谱。\n  汗血宝马：阿哈尔捷金马（Akhal Teke）拥有金属般光泽的皮毛，耐力惊人。中国古籍中的“汗血宝马”正源于此，是丝路上最昂贵的战略物资。\n\n服饰：男士依然流行戴巨大的黑色羊皮高帽（Telpek），即便在40度高温下也不摘下，因为这是“移动的空调房”和地位的象征。\n\n精神世界：虽为伊斯兰国家，但土库曼人的信仰混合了萨满教的自然崇拜（如对火、对圣树的朝拜）和苏菲派的神秘主义。库尼亚乌尔根奇的圣陵是全世界土库曼人一生必去的精神家园，重要性不亚于麦加在阿拉伯人心中的地位。",
    ".funfact": "世界上唯一一个公民免费用水、用电、用天然气的国家（虽然近年有限制改革），因为在沙漠底下埋藏着世界第四大的天然气储量。\n\n里海实际上是湖，但土库曼斯坦的海军依然叫“海军”。\n\n阿什哈巴德保持着“世界白色大理石建筑最密集城市”的吉尼斯纪录（543栋白色大理石楼），阳光刺眼时需要戴墨镜逛街。\n\n自来水可燃事件：在某些偏远村落，由于天然气管道和自来水管老化交叉污染，打开水龙头流出的水……可以直接用打火机点燃（真·喝口火水）。\n\n古代商队若想绕过战乱的伊朗高原，几乎必须走梅尔夫尼萨一线。这里出土的帕提亚帝国牛角形来通杯（Rhyton），证明了当时贵族喝着葡萄酒谈跨国生意的奢华生活。\n\n就在阿什哈巴德郊区，坐落着安息帝国最早的都城尼萨遗址。考古学家在这里发现了大量象牙雕刻，风格融合了希腊神像与波斯装饰，证明这里曾是丝路上的“文化杂交水稻田”。\n\n梅尔夫古城在中世纪被称为“东方女王”。1221年，因守军杀死了成吉思汗的女婿，蒙古大军破城后进行了长达13天的屠城，据史学家伊本·艾西尔记载，仅靠数人头堆起的京观就有数十座。从此梅尔夫一蹶不振，绿洲变回沙漠。"  };

  const overviewTextBox = document.querySelector(".rectangle");
  const overviewTextContent = document.querySelector(".text-c");
  const overviewGroup = document.querySelector(".group");
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  const placeOverviewBox = (button) => {
    if (!overviewTextBox || !overviewGroup) return;

    if (mobileQuery.matches && button) {
      const card = button.closest(".pic-4, .img-3, .pic-7, .mask-group, .mask-group-2");
      if (card) {
        card.insertAdjacentElement("afterend", overviewTextBox);
        return;
      }
    }

    overviewGroup.appendChild(overviewTextBox);
  };

  Object.keys(buttonContentMap).forEach(selector => {
    const button = document.querySelector(selector);
    if (button && overviewTextContent) {
      button.addEventListener("click", () => {
        overviewTextContent.textContent = buttonContentMap[selector];
        placeOverviewBox(button);
      });
    }
  });

  const handleOverviewLayoutChange = () => {
    if (!overviewTextBox || !overviewGroup) return;

    if (!mobileQuery.matches) {
      overviewGroup.appendChild(overviewTextBox);
    }
  };

  handleOverviewLayoutChange();
  mobileQuery.addEventListener("change", handleOverviewLayoutChange);
  
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
