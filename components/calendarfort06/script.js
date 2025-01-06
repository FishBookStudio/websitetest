function updateCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    // 更新今天日期和月份部分
    document.getElementById('today-date').textContent = currentDay;
    document.getElementById('today-month').textContent = today.toLocaleString('en-US', { month: 'long' });

    // 获取本月的第一天和最后一天
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();

    // 本月第一天的星期几
    let firstWeekday = firstDayOfMonth.getDay();
    if (firstWeekday === 0) firstWeekday = 7; // 周日调整为 7

    const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const calendarDaysContainer = document.getElementById('calendar-days');
    const calendarWeekdaysContainer = document.getElementById('calendar-weekdays');

    // 清空现有的日期和星期字母
    calendarDaysContainer.innerHTML = '';
    calendarWeekdaysContainer.innerHTML = '';

    // 填充星期首字母
    weekdays.forEach((weekday) => {
        const weekdayLabel = document.createElement('label');
        weekdayLabel.classList.add('weekday');

        const weekdaySpan = document.createElement('span');
        weekdaySpan.textContent = weekday;

        weekdayLabel.appendChild(weekdaySpan);
        calendarWeekdaysContainer.appendChild(weekdayLabel);
    });

    // 填充第一天前的空白格子
    for (let i = 1; i < firstWeekday; i++) {
        const emptyCell = document.createElement('label');
        emptyCell.classList.add('weekday', 'invalid'); // 空白格子
        calendarDaysContainer.appendChild(emptyCell);
    }

    // 填充日期
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayLabel = document.createElement('label');
        dayLabel.classList.add('day');

        const daySpan = document.createElement('span');
        daySpan.textContent = day;

        // 如果是今天，添加 'today' 类
        if (day === currentDay) {
            dayLabel.classList.add('today');
        }

        // 计算周末
        const dayOfWeek = (firstWeekday + day - 2) % 7;
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            dayLabel.classList.add('weekend'); // 添加周末类
        }

        dayLabel.appendChild(daySpan);
        calendarDaysContainer.appendChild(dayLabel);
    }
}
