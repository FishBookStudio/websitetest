<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>访问计数器</title>
  </head>
  <body>
    <h1>欢迎访问我的网页！</h1>
    <p>访问次数：<span id="visitor-count">加载中...</span></p>

    <script>
      // 使用 fetch 请求来获取访问次数并显示在页面上
      fetch("/get-visit-count")
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("visitor-count").textContent = data.count;
        })
        .catch((error) => console.error("Error:", error));
    </script>
  </body>
</html>

