// src/components/CalendarDisplay.jsx

import React, { useState } from 'react';
import moment from 'jalali-moment';
import { getShiftType, SHIFT_TYPE } from './ShiftLogic';
import '../styles/Calendar.css';

// تنظیم moment برای استفاده از تقویم جلالی (فارسی)
moment.locale('fa');

const CalendarDisplay = () => {
  // state برای نگهداری ماه و سالی که نمایش داده می‌شود
  const [currentMonth, setCurrentMonth] = useState(moment());

  const today = moment();
  const weekdays = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

  // --- توابع ناوبری ---
  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'jMonth'));
  };

  const goToPrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'jMonth'));
  };

  const goToToday = () => {
    setCurrentMonth(moment());
  };

  // --- تابع اصلی رندر کردن گرید تقویم ---
  const renderCalendarGrid = () => {
    const daysInMonth = currentMonth.jDaysInMonth();
    const firstDayOfMonth = currentMonth.clone().startOf('jMonth');
    // .day() در jalali-moment: شنبه = 0, یکشنبه = 1, ... جمعه = 6
    const startDayIndex = (firstDayOfMonth.day() + 1) % 7;

    const cells = [];
    const totalCells = daysInMonth + startDayIndex;

    // 1. افزودن سلول‌های خالی قبل از روز اول ماه
    for (let i = 0; i < startDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="dayCell empty"></div>);
    }

    // 2. افزودن روزهای ماه
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentMonth.clone().jDate(day);
      const shift = getShiftType(date);

      // ساخت کلاس‌های CSS داینامیک
      let classNames = 'dayCell';
      if (date.isSame(today, 'day')) {
        classNames += ' today';
      }
      if (shift === SHIFT_TYPE.DAY) {
        classNames += ' day-shift';
      }
      if (shift === SHIFT_TYPE.NIGHT) {
        classNames += ' night-shift';
      }

      cells.push(
        <div key={day} className={classNames}>
          {day}
          {shift === SHIFT_TYPE.DAY && <span>☀️ روز</span>}
          {shift === SHIFT_TYPE.NIGHT && <span>🌙 شب</span>}
        </div>
      );
    }

    // 3. افزودن سلول‌های خالی بعد از روز آخر (برای تکمیل گرید 7 تایی)
    while (cells.length % 7 !== 0) {
      cells.push(<div key={`empty-end-${cells.length}`} className="dayCell empty"></div>);
    }

    return cells;
  };

  return (
    <main className="calendarDisplay">
      <div className="calendarHeader">
        <button onClick={goToPrevMonth} className="navButton">‹</button>
        <h2>{currentMonth.format('jMMMM jYYYY')}</h2>
        <button onClick={goToNextMonth} className="navButton">›</button>
        <button onClick={goToToday} className="todayButton">بازگشت به امروز</button>
      </div>

      <div className="calendarWeekdays">
        {weekdays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendarGrid">
        {renderCalendarGrid()}
      </div>
    </main>
  );
};

export default CalendarDisplay;