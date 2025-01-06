function updateCalendar() {
    const today = new Date(); // 获取当前日期
    const currentMonth = today.getMonth(); // 获取当前月份 (0-11)
    const currentYear = today.getFullYear(); // 获取当前年份
    const currentDay = today.getDate(); // 获取当前天
  
    // 更新今天日期和月份部分
    document.getElementById('today-date').textContent = currentDay;
    document.getElementById('today-month').textContent = today.toLocaleString('default', { month: 'long' });
  
    // 获取本月的第一天和最后一天
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();
  
    // 获取本月第一天的星期几 (0-6, 0代表星期日)
    const firstWeekday = firstDayOfMonth.getDay();
  
    // 星期首字母
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
    // 获取日历的容器
    const calendarDaysContainer = document.getElementById('calendar-days');
    const calendarWeekdaysContainer = document.getElementById('calendar-weekdays');
    
    // 清空已有的日期和星期字母
    calendarDaysContainer.innerHTML = '';
    calendarWeekdaysContainer.innerHTML = '';
  
    // 生成星期首字母的标签，放置在第一行
    for (let i = 0; i < 7; i++) {
      const weekdayLabel = document.createElement('label');
      weekdayLabel.classList.add('weekday'); // 添加 'weekday' 类
  
      const weekdaySpan = document.createElement('span');
      weekdaySpan.textContent = weekdays[i]; // 设置星期字母
  
      weekdayLabel.appendChild(weekdaySpan);
      calendarWeekdaysContainer.appendChild(weekdayLabel);
    }
  
    // 生成空单元格以填充第一天之前的空位
    for (let i = 0; i < firstWeekday; i++) {
      const emptyCell = document.createElement('label');
      emptyCell.classList.add('weekday', 'invalid'); // 添加 'invalid' 类表示空白格子
      calendarDaysContainer.appendChild(emptyCell);
    }
  
    // 生成日期并显示在日历中
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayLabel = document.createElement('label');
      dayLabel.classList.add('day'); // 为每个日期添加 'day' 类
  
      const daySpan = document.createElement('span');
      daySpan.textContent = day;
  
      // 如果是今天的日期，添加 'today' 类
      if (day === currentDay) {
        dayLabel.classList.add('today');
      }
  
      // 如果是周末（周六或周日），添加 'weekend' 类
      if (firstWeekday + day - 1 === 6 || firstWeekday + day - 1 === 0) {
        dayLabel.classList.add('weekend');
      }
      // 判断是否为周末，首先确保第一个日期的星期几是正确的
      if ((firstWeekday + day - 1) % 7 === 6 || (firstWeekday + day - 1) % 7 === 0) {
        dayLabel.classList.add('weekend'); // 周末日期
      }
  
  
      // 将日期单元格添加到日历容器中
      dayLabel.appendChild(daySpan);
      calendarDaysContainer.appendChild(dayLabel);
    }
  }
  
