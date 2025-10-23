document.addEventListener("DOMContentLoaded", function () {
  const icon = document.querySelector(".pic");
  let userPopup;

  if (icon) {
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
  }

  const map = document.querySelector(".pic-3");
  const detailPanel = document.querySelector(".section");
  if (detailPanel) detailPanel.classList.remove("visible");

  const dotsData = [
    { top: 180, left: 150, text: "费尔干纳峡谷的沙漠城堡群" },
    { top: 360, left: 290, text: "伊钱卡拉古城" },
    { top: 375, left: 300, text: "希瓦" },
    { top: 485, left: 440, text: "泽拉夫尚-卡拉库姆廊道" },
    { top: 380, left: 680, text: "首都：塔什干", navigateToUz: true }
  ];

  if (map) {
    dotsData.forEach((pos) => {
      const dot = document.createElement("div");
      dot.style.position = "absolute";
      dot.style.width = "14px";
      dot.style.height = "14px";
      dot.style.borderRadius = "50%";
      dot.style.background = pos.navigateToUz ? "#ffd700" : "#4686ff";
      dot.style.top = `${pos.top}px`;
      dot.style.left = `${pos.left}px`;
      dot.style.cursor = "pointer";
      dot.style.zIndex = "45";
      dot.style.boxShadow = "0px 0px 8px rgba(0,0,0,0.2)";
      dot.style.transition = "transform 0.3s ease";

      const tooltip = document.createElement("div");
      tooltip.textContent = pos.text;
      tooltip.style.position = "absolute";
      tooltip.style.top = `${pos.top - 40}px`;
      tooltip.style.left = `${pos.left + 20}px`;
      tooltip.style.background = "#ffffff";
      tooltip.style.padding = "6px 10px";
      tooltip.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
      tooltip.style.borderRadius = "6px";
      tooltip.style.display = "none";
      tooltip.style.zIndex = "100";

      dot.addEventListener("mouseover", () => {
        dot.style.transform = "scale(1.4)";
        tooltip.style.display = "block";
      });

      dot.addEventListener("mouseout", () => {
        dot.style.transform = "scale(1)";
        tooltip.style.display = "none";
      });

      dot.addEventListener("click", () => {
        if (pos.navigateToUz) {
          window.location.href = "/uzbekistan";
        } else if (detailPanel) {
          detailPanel.classList.toggle("visible");
        }
      });

      map.parentElement.appendChild(dot);
      map.parentElement.appendChild(tooltip);
    });
  }
});