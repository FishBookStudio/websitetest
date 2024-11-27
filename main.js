document.addEventListener("DOMContentLoaded", function () {
  const collapsibles = document.querySelectorAll(".collapsible");

  function toggleCollapsible() {
    this.classList.toggle("collapsible--expanded");
  }

  function handleResize() {
    const isLargeScreen = window.innerWidth >= 768;

    collapsibles.forEach((item) => {
      if (isLargeScreen) {
        // 在大屏幕下移除点击事件
        item.removeEventListener("click", toggleCollapsible);
        item.classList.add("collapsible--expanded"); // 确保默认展开
      } else {
        // 在小屏幕下添加点击事件
        item.addEventListener("click", toggleCollapsible);
        item.classList.remove("collapsible--expanded"); // 确保默认收起
      }
    });
  }

  // 初始化时运行
  handleResize();

  // 监听窗口大小变化
  window.addEventListener("resize", handleResize);
});