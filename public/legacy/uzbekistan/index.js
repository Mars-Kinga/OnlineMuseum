document.addEventListener("DOMContentLoaded", function () {
  // 用户信息弹窗逻辑
  // 处理用户点击头像图标以显示或隐藏用户信息弹窗
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
  // 创建地图上的交互圆点，并添加提示框和点击事件
  const map = document.querySelector(".pic-3");
  const detailPanel = document.querySelector(".section");
  detailPanel.classList.remove("visible");

  const dotsData = [
    { top: 180, left: 150, text: "费尔干纳峡谷的沙漠城堡群" },
    { top: 360, left: 290, text: "伊钱卡拉古城" },
    { top: 375, left: 300, text: "希瓦" },
    { top: 485, left: 440, text: "泽拉夫尚-卡拉库姆廊道" },
    { top: 500, left: 450, text: "布哈拉历史中心" },
    { top: 475, left: 580, text: "沙赫里萨布兹历史中心" },
    { top: 490, left: 580, text: "撒马尔罕" },
    { top: 380, left: 680, text: "首都：塔什干" }
  ];

  dotsData.forEach((pos) => {
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.width = "14px";
    dot.style.height = "14px";
    dot.style.borderRadius = "50%";
    dot.style.background = "#804430";
    if (pos.text === "首都：塔什干") {
      dot.style.background = "#ffd700"; // 初始设为黄色
    }
    dot.style.top = `${pos.top}px`;
    dot.style.left = `${pos.left}px`;
    dot.style.cursor = "pointer";
    dot.style.zIndex = "45";
    dot.style.boxShadow = "0px 0px 8px rgba(0,0,0,0.2)";
    dot.style.transition = "transform 0.3s ease";

    // 提示框行为
    // 创建提示框并设置其样式和显示逻辑
    const tooltip = document.createElement("div");
    tooltip.textContent = pos.text;
    tooltip.style.position = "absolute";
    tooltip.style.top = `${pos.top - 50}px`;
    tooltip.style.left = `${pos.left - 35}px`;
    tooltip.style.background = "#ffffff";
    tooltip.style.padding = "6px 10px";
    tooltip.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
    tooltip.style.borderRadius = "6px";
    tooltip.style.display = "none";
    tooltip.style.zIndex = "100";

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
      // 右侧面板显示隐藏逻辑
      // 切换右侧信息面板的可见性
      detailPanel.classList.toggle("visible");
    });

    map.parentElement.appendChild(dot);
    map.parentElement.appendChild(tooltip);
  });

  // 中间按钮设置
  const xiwaText = `希瓦古城位于乌兹别克斯坦西南部的花剌子模州，始建于公元10世纪，是古丝绸之路上重要的商贸与文化枢纽。作为花剌子模帝国的核心城市，希瓦曾是中亚伊斯兰文明的璀璨明珠，被誉为“沙漠中的博物馆”。1990年，希瓦古城内城（伊钦·卡拉）被联合国教科文组织列为世界文化遗产。`;
  const historyText = `阿米尔·图拉经学院
建于18世纪，是希瓦汗国时期的伊斯兰学术中心，以其精美的蓝色瓷砖和几何图案闻名。
修复前，建筑墙体裂缝达30厘米，地基下沉50厘米，濒临坍塌。

哈桑·穆拉德库什别吉清真寺
18世纪末建造，是希瓦古城内小型清真寺的典型代表，内部装饰极具伊斯兰风格。

伊钦·卡拉内城
古城核心区，保留8座清真寺、31座经学院、14座宣礼塔等建筑，完整呈现中亚伊斯兰建筑艺术。`;
  const remainsText = `非物质遗产：木雕门窗
希瓦古城的木雕艺术可追溯至10-12世纪的花剌子模王朝时期，在16-19世纪希瓦汗国时代达到鼎盛。作为丝绸之路上重要的商贸中心，希瓦融合了波斯细密画风格、突厥草原纹样和阿拉伯几何美学，形成了独特的中亚木雕流派。
希瓦木雕保留了丰富的花纹图案，例如伊斯利米，是一种具有波斯风格的卷草纹，常用与宫殿大门框饰；而吉里赫，则是一种几何化的植物藤蔓造型，在清真寺敏拜尔的讲坛上可以找到；阿拉伯书法也是主要的样式之一，主要以《古兰经》经文雕刻来装饰陵墓门楣。

希瓦木雕学校每年培养30名学徒，作品作为国礼赠送给"一带一路"沿线国家。2023年上海进博会上，希瓦木雕大师鲁斯塔姆现场演示将敦煌飞天纹样融入传统吉里赫纹。"每一道刀痕都是历史的密码，我们雕刻的不是木头，是千年文明的对话。"——希瓦非遗木雕传承人 卡里莫夫。这些精美木雕不仅是建筑装饰，更是中亚多元文明交汇的立体史书，见证着丝绸之路上的智慧交融。`;
  const archaeText = `2014年，为了恢复阿米尔·图拉经学院和哈桑清真寺的原貌，同时改善古城基础设施，中乌两国在“一带一路”框架下启动希瓦古城修复项目，由中国文化遗产；研究院承担。
希瓦古城的旅游项目是当地的经济支柱。中国文物修复工作队在希瓦古城开展的工作，得到了乌兹别克斯坦社会各界的高度关注，联合国教科文组织驻乌兹别克斯坦代表对中国采取的技术与理念十分认同。
中国文物修复团队修复整治后，内城正门区域恢复了昔日的风采，当地已经重新开放，使古城南北轴线再次畅通。
同时，在木雕艺术的修复和传承上，中国团队引入三维扫描记录雕刻纹样，协助建立数字纹样库（已收录1200种图案）。并且联合培训当地工匠，复兴传统工具使用（如波斯弧形凿、突厥角尺）。`;


  const contentMap = [xiwaText, historyText, remainsText, archaeText];
  const imageMap = [
    "images/xiwa.jpg",
    "",
    "images/remains.jpg",
    ""
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
             imgElement.style.display = "none"; // 没图就隐藏
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

  Object.keys(buttonContentMap).forEach(selector => {
    const button = document.querySelector(selector);
    button.addEventListener("click", () => {
      document.querySelector(".text-c").textContent = buttonContentMap[selector];
    });
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

/* Dots Data */
const dotsData = [
  { text: "Preview Content 1" },
  { text: "Preview Content 2" },
  { text: "Preview Content 3" },
  { text: "Preview Content 4" },
  { text: "Preview Content 5" },
  { text: "Preview Content 6" },
  { text: "Preview Content 7" },
  { text: "Preview Content 8" },
];


