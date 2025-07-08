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



// 获取所有的按钮和弹窗元素
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal-close');

// 显示弹窗
openModalBtns.forEach((btn, index) => {
  btn.onclick = function() {
    modals[index].style.display = 'flex'; // 根据按钮点击显示对应的弹窗
  };
});

// 关闭弹窗
closeBtns.forEach((closeBtn, index) => {
  closeBtn.onclick = function() {
    modals[index].style.display = 'none'; // 隐藏对应的弹窗
  };
});

// 点击弹窗外部区域时关闭弹窗
window.onclick = function(event) {
  modals.forEach((modal, index) => {
    if (event.target === modal) {
      modal.style.display = 'none'; // 隐藏弹窗
    }
  });
}
// 监听所有带 data-track 的按钮
document.querySelectorAll('[data-track]').forEach(btn => {
  btn.addEventListener('click', function() {
    var trackName = btn.getAttribute('data-track');
    // 发送事件到 Google Analytics
    gtag('event', 'button_click', {
      'event_category': 'button',
      'event_label': trackName
    });
  });
});