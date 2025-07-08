class Calendar {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      theme: options.theme || 'light',
      events: options.events || [],
      onDateClick: options.onDateClick || null,
      minDate: options.minDate || null,
      maxDate: options.maxDate || null
    };
    
    this.currentDate = new Date();
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const calendarHTML = `
      <div class="calendar ${this.options.theme}">
        <div class="calendar-header">
          <button class="calendar-nav prev-month">‹</button>
          <h2 class="calendar-title"></h2>
          <button class="calendar-nav next-month">›</button>
        </div>
        <div class="calendar-weekdays">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div class="calendar-days"></div>
      </div>
    `;
    
    this.container.innerHTML = calendarHTML;
    this.updateCalendar();
  }

  updateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // 更新标题
    const title = this.container.querySelector('.calendar-title');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    title.textContent = `${monthNames[month]} ${year}`;
    
    // 获取当月第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // 获取当月第一天是星期几（0-6，0是周日）
    let firstDayWeek = firstDay.getDay();
    // 将周日(0)转换为7，使周一为1
    firstDayWeek = firstDayWeek === 0 ? 7 : firstDayWeek;
    // 调整为从周一开始
    firstDayWeek = firstDayWeek - 1;
    
    // 获取上个月的最后几天
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // 生成日历网格
    const daysContainer = this.container.querySelector('.calendar-days');
    daysContainer.innerHTML = '';
    
    // 添加上个月的日期
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      this.createDayElement(daysContainer, day, 'prev-month', date);
    }
    
    // 添加当月的日期
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const isToday = this.isToday(date);
      this.createDayElement(daysContainer, day, isToday ? 'today' : '', date);
    }
    
    // 添加下个月的日期
    const remainingDays = 42 - (firstDayWeek + lastDay.getDate());
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      this.createDayElement(daysContainer, day, 'next-month', date);
    }
    
    // 更新导航按钮状态
    this.updateNavButtons();
  }

  createDayElement(container, day, className, date) {
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-day ${className}`;
    dayElement.textContent = day;
    
    // 添加事件标记
    const events = this.getEventsForDate(date);
    if (events.length > 0) {
      const eventDot = document.createElement('div');
      eventDot.className = 'event-dot';
      dayElement.appendChild(eventDot);
      
      // 添加事件提示
      const tooltip = document.createElement('div');
      tooltip.className = 'event-tooltip';
      tooltip.innerHTML = events.map(event => `
        <div class="event-item">
          <span class="event-time">${event.time}</span>
          <span class="event-title">${event.title}</span>
        </div>
      `).join('');
      dayElement.appendChild(tooltip);
    }
    
    // 添加点击事件
    dayElement.addEventListener('click', () => {
      if (this.options.onDateClick) {
        this.options.onDateClick(date);
      }
    });
    
    container.appendChild(dayElement);
  }

  getEventsForDate(date) {
    return this.options.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  }

  isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  updateNavButtons() {
    const prevButton = this.container.querySelector('.prev-month');
    const nextButton = this.container.querySelector('.next-month');
    
    if (this.options.minDate) {
      const minDate = new Date(this.options.minDate);
      prevButton.disabled = this.currentDate <= minDate;
    }
    
    if (this.options.maxDate) {
      const maxDate = new Date(this.options.maxDate);
      nextButton.disabled = this.currentDate >= maxDate;
    }
  }

  attachEventListeners() {
    const prevButton = this.container.querySelector('.prev-month');
    const nextButton = this.container.querySelector('.next-month');
    
    prevButton.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.updateCalendar();
    });
    
    nextButton.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.updateCalendar();
    });
  }
}

// 导出组件
window.Calendar = Calendar; 