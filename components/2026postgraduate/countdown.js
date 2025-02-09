// 设置目标日期：2026年考研日期
const targetDate = new Date("2025-12-25T00:00:00").getTime();

// 更新倒计时
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    // 计算剩余时间
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // 更新页面上的倒计时
    document.getElementById("days-number").textContent = days;
    document.getElementById("hours-number").textContent = hours;
    document.getElementById("minutes-number").textContent = minutes;
    document.getElementById("seconds-number").textContent = seconds;

    // 如果倒计时结束
    if (timeRemaining <= 0) {
        clearInterval(interval);
        document.querySelector('.countdown').innerHTML = '<h2>考试来临！祝你成功！</h2>';
    }
}

// 每秒更新一次倒计时
const interval = setInterval(updateCountdown, 1000);

// 初始调用一次
updateCountdown();
