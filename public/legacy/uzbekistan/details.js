<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>国家详情页</title>
  <link rel="stylesheet" href="details.css" />
</head>
<body>
document.querySelector(".image-preview").addEventListener("click", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "flex";
    modalImg.src = document.querySelector(".image-preview").src;
});

document.getElementById("imageModal").addEventListener("click", () => {
    document.getElementById("imageModal").style.display = "none";
});
</body>
</html>
