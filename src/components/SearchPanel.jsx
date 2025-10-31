// src/components/SearchPanel.jsx

import React, { useState } from 'react';
import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import moment from 'jalali-moment';
import { getShiftType, SHIFT_TYPE } from './ShiftLogic';
import '../styles/Search.css';

const SearchPanel = () => {
  // state برای نگهداری تاریخ انتخابی
  // فرمت پیش‌فرض کتابخانه: { day: 1, month: 8, year: 1404 }
  const [selectedDate, setSelectedDate] = useState(null);

  // state برای نمایش متن نتیجه
  const [resultText, setResultText] = useState('لطفاً یک تاریخ را انتخاب کنید.');

  // state برای اعمال کلاس CSS داینامیک
  const [resultClass, setResultClass] = useState('off');

  // تابعی که هنگام تغییر تاریخ اجرا می‌شود
  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (!date) {
      setResultText('لطفاً یک تاریخ را انتخاب کنید.');
      setResultClass('off');
      return;
    }

    // 1. تبدیل فرمت تاریخ کتابخانه به فرمت تاریخ شمسی (YYYY-MM-DD)
    const dateString = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

    // 2. تبدیل رشته تاریخ به آبجکت jalali-moment
    const momentDate = moment(dateString, 'jYYYY-jMM-DD');

    // 3. استفاده از تابع منطقی که در مرحله ۲ نوشتیم
    const shift = getShiftType(momentDate);

    // 4. نمایش نتیجه به کاربر
    const formattedDate = momentDate.format('dddd، jD jMMMM jYYYY');

    setResultClass(shift); // اعمال کلاس CSS (day, night, or off)

    switch (shift) {
      case SHIFT_TYPE.DAY:
        setResultText(`در ${formattedDate}: شیفت روز ☀️`);
        break;
      case SHIFT_TYPE.NIGHT:
        setResultText(`در ${formattedDate}: شیفت شب 🌙`);
        break;
      case SHIFT_TYPE.OFF:
      default:
        setResultText(`در ${formattedDate}: آف (استراحت) ☕️`);
        break;
    }
  };

  return (
    <aside className="searchPanel">
      <h2>🔎 جستجوی تاریخ شیفت</h2>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        inputPlaceholder="تاریخ مورد نظر را انتخاب کنید..."
        shouldHighlightWeekends
        locale="fa" // فعال‌سازی کامل تقویم فارسی
        calendarPopperPosition="bottom"
      />

      <div className={`searchResult ${resultClass}`}>
        {resultText}
      </div>
    </aside>
  );
};

export default SearchPanel;