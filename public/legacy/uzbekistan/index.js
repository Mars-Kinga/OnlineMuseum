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
    { top: 180, left: 150, text: "费尔干纳峡谷" },
    { top: 360, left: 290, text: "伊钱卡拉古城" },
    { top: 375, left: 300, text: "希瓦" },
    { top: 485, left: 440, text: "泽拉夫尚-卡拉库姆廊道" },
    { top: 500, left: 450, text: "布哈拉历史中心" },
    { top: 475, left: 580, text: "沙赫里萨布兹" },
    { top: 490, left: 580, text: "撒马尔罕" },
    { top: 380, left: 680, text: "首都：塔什干" }
  ];

  // 原始地图容器的宽高基准 (基于 .pic-3)
  const mapBaseWidth = 880;
  const mapBaseHeight = 472.915; 
  // 原始地图相对于父容器的偏移量
  const mapOffsetX = 90;
  const mapOffsetY = 150;

  dotsData.forEach((pos, index) => {
    const dot = document.createElement("div");
    dot.className = "map-dot";
    dot.style.position = "absolute";
    dot.style.borderRadius = "50%";
    dot.style.background = "#804430";
    if (pos.text === "首都：塔什干") {
      dot.style.background = "#ffd700"; // 初始设为黄色
    }
    
    const relativeTop = pos.top - mapOffsetY;
    const relativeLeft = pos.left - mapOffsetX;
    dot.style.top = `${(relativeTop / mapBaseHeight) * 100}%`;
    dot.style.left = `${(relativeLeft / mapBaseWidth) * 100}%`;
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
  const text1 = `费尔干纳峡谷（Fergana Valley）\n\n费尔干纳峡谷位于乌兹别克斯坦、吉尔吉斯斯坦与塔吉克斯坦交界处，是中亚最肥沃、人口最密集的地区之一。三面环山的地理环境，使其形成了独特的生态与人文空间，自古以来就是农业与手工业的重要中心。\n在丝绸之路时期，费尔干纳以出产“汗血宝马”（又称天马）而闻名，这些优良马种曾被汉朝视为战略资源，直接促成了中亚与中国之间的重要交流。除了经济意义，这里也是多民族、多文化交汇之地，融合了波斯、突厥与中原文化因素，是理解中亚文化多样性的重要区域。`;
  const text2 = `伊钱卡拉古城（Itchan Kala）\n\n伊钱卡拉古城位于乌兹别克斯坦希瓦市，是一座保存极为完整的中世纪城内城（内城）。整座城市被高大的夯土城墙环绕，内部集中了清真寺、经学院、宫殿与宣礼塔等建筑，构成一个高度完整的伊斯兰城市空间。\n作为花剌子模地区的重要中心，伊钱卡拉在16至19世纪达到繁荣，其建筑风格以蓝色瓷砖装饰和几何图案著称，展现出典型的中亚伊斯兰艺术特征。今天，这里几乎像一座“露天博物馆”，为研究中亚城市形态与宗教生活提供了直观的历史样本。`;
  const text3 = `希瓦古城\n\n希瓦古城位于乌兹别克斯坦西南部的花剌子模州，始建于公元10世纪，是古丝绸之路上重要的商贸与文化枢纽。作为花剌子模帝国的核心城市，希瓦曾是中亚伊斯兰文明的璀璨明珠，被誉为“沙漠中的博物馆”。1990年，希瓦古城内城（伊钦·卡拉）被联合国教科文组织列为世界文化遗产。`;
  const text4 = `泽拉夫尚-卡拉库姆廊道（Zeravshan–Karakum Corridor）\n\n泽拉夫尚-卡拉库姆廊道是丝绸之路中亚段的重要组成部分，连接撒马尔罕、布哈拉等历史名城，并延伸至土库曼斯坦的沙漠地区。这一廊道以绿洲—沙漠交替的地理特征为基础，形成了一条依赖水源分布的交通网络。\n沿线分布着大量古城遗址、商队驿站与灌溉系统遗迹，体现出人类在干旱环境中建立稳定交流网络的能力。它不仅是物资流通的通道，也是思想、宗教与技术传播的重要路径，是“丝绸之路如何运作”的一个典型案例。`;
  const text5 = `布哈拉历史中心（Historic Centre of Bukhara）\n\n布哈拉是中亚最古老的城市之一，其历史中心保存了大量9至17世纪的建筑群，是伊斯兰文化的重要中心。这里曾是学术与宗教活动的核心，汇聚了众多学者与神学家。\n代表性建筑包括卡扬清真寺、卡扬宣礼塔以及众多经学院，整体布局体现出典型的伊斯兰城市结构。布哈拉不仅是贸易城市，更是“知识与信仰之城”，在中亚伊斯兰文化传播中占据核心地位。`;
  const text6 = `沙赫里萨布兹（Shahrisabz）\n\n沙赫里萨布兹是帖木儿的出生地，也是其重要的政治与文化中心之一。这里最著名的遗址是阿克萨赖宫殿遗址，其巨大的入口拱门至今仍令人震撼，象征着帖木儿帝国的权力与雄心。\n城市中还保留有宗教建筑与陵墓群，体现出帖木儿时期建筑的宏伟规模与精致装饰。沙赫里萨布兹不仅具有历史意义，也体现了帝国如何通过建筑塑造政治象征。`;
  const text7 = `撒马尔罕（Samarkand）\n\n撒马尔罕是丝绸之路上最著名的城市之一，被誉为“东方明珠”。在帖木儿帝国时期，这里成为帝国首都，并发展为文化与艺术中心。\n最具代表性的雷吉斯坦广场，由三座宏伟的经学院组成，是中亚建筑艺术的巅峰之作。此外，沙赫静达陵墓群等遗址展示了精美的瓷砖工艺与宗教建筑风格。撒马尔罕不仅是贸易枢纽，更象征着权力、艺术与知识的汇聚`;
  const text8 = `塔什干（Tashkent）\n\n塔什干是乌兹别克斯坦的首都，也是中亚地区的重要现代城市。其历史可以追溯至古代丝绸之路时期，是连接草原与绿洲的重要节点。\n尽管经历了多次战争与地震，塔什干仍保留了一些历史遗迹，如古城部分、清真寺与传统集市。同时，这座城市也融合了苏联时期的现代规划与伊斯兰传统文化，展现出中亚城市在现代化进程中的独特面貌。`;

  const contentMap = [text1, text2, text3, text4, text5, text6, text7, text8];
  const imageMap = [
    "images/Fergana.png", 
    "images/Itchan.png", 
    "images/xiwa.jpg", 
    "images/Zeravshan–Karakum.png", 
    "images/Bukhara.png",
    "images/Shahrisabz.png", 
    "images/Samarkand.png", 
    "images/Tashkent.png"
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
    ".geography": "乌兹别克斯坦，这颗镶嵌在中亚腹地的明珠，以其独特的地理风貌成为欧亚大陆的“十字路口”。作为世界上仅有的两个双重内陆国之一（另一个为列支敦士登），它被哈萨克斯坦、土库曼斯坦、塔吉克斯坦、吉尔吉斯斯坦和阿富汗五国环抱，如同一位端坐在丝路地毯上的智者，静观千年文明往来。",
    ".history": "粟特人曾在绿洲建城，商队将葡萄带往长安；伊本·西那、花剌子米等学者照亮丝路文明；帖木儿打造横跨三洲的帝国，撒马尔罕成为世界明珠；帝国角力下，中亚既传诗歌也陷奴役；独立后的乌兹别克，年轻导游正用汉语讲述祖先的荣耀。",
    ".building": "在这片被沙漠与绿洲亲吻的土地上，建筑是石头写就的史书，每一座穹顶、每一方砖瓦，都在诉说着文明碰撞的传奇。从粟特商队的驿站到帖木儿帝国的清真寺，乌兹别克斯坦的建筑艺术，是数学与信仰的联姻，更是东西方美学的结晶。",
    ".clothing": "在乌兹别克斯坦，服饰不仅是遮体御寒之物，更是流动的史诗——每一针彩线都串联起波斯宫廷的华美、突厥草原的豪迈与绿洲农耕文明的精致。这里的衣袍会说话：刺绣的纹样是家族密码，丝绸的光泽是身份隐喻，而头巾的褶皱里，藏着千年商道的风沙与月光。",
    ".religion": "在这片被沙漠与绿洲分割的土地上，宗教如同锡尔河的水流，时而奔腾，时而静谧，最终汇成宽容的海洋。乌兹别克斯坦的信仰史，是一部文明对话的史诗——祆教的圣火、佛教的莲花、伊斯兰的新月，甚至基督教的十字架，都曾在这片土地上留下印记。"
  };

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
