// src/components/ShiftLogic.js

import moment from 'jalali-moment';

// --- تعریف ثابت‌ها ---

// 1. تاریخ مبنا (پنج‌شنبه ۸ آبان ۱۴۰۴، شیفت شب)
// ما تاریخ را با فرمت ISO (YYYY-MM-DD) و به صورت شمسی (jYYYY-jMM-jDD) ذخیره می‌کنیم
const BASE_DATE_STRING = '1404-08-08';
const BASE_DATE = moment(BASE_DATE_STRING, 'jYYYY-jMM-jDD');

// 2. نوع شیفت‌ها (برای خوانایی بهتر کد)
export const SHIFT_TYPE = {
  DAY: 'day',
  NIGHT: 'night',
  OFF: 'off',
};

// 3. سیکل ۵ روزه
// بر اساس تاریخ مبنا (شب)
const CYCLE_LENGTH = 5;

/**
 * این تابع قلب برنامه است.
 * یک تاریخ شمسی (به عنوان آبجکت moment) دریافت می‌کند
 * و نوع شیفت در آن روز را برمی‌گرداند.
 *
 * @param {moment.Moment} date - تاریخ مورد نظر (باید آبجکت jalali-moment باشد)
 * @returns {string} - یکی از مقادیر SHIFT_TYPE (day, night, or off)
 */
export function getShiftType(date) {
  // 1. محاسبه اختلاف روزها از تاریخ مبنا
  // .startOf('day') برای این است که محاسبات تحت تاثیر ساعت انجام نشود
  const diffInDays = date.startOf('day').diff(BASE_DATE.startOf('day'), 'days');

  // 2. محاسبه باقیمانده (پیمانه) بر اساس سیکل ۵ روزه
  // (diffInDays % CYCLE_LENGTH) باقیمانده‌ای بین -4 تا 4 می‌دهد.
  // با ( + CYCLE_LENGTH) % CYCLE_LENGTH مطمئن می‌شویم که نتیجه همیشه مثبت و بین 0 تا 4 است.
  const cycleDay = ((diffInDays % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;

  // 3. تعیین نوع شیفت بر اساس باقیمانده
  // بر اساس توضیح شما:
  // روز 0 (تاریخ مبنا 1404/8/8): شب
  // روز 1 (1404/8/9): آف
  // روز 2 (1404/8/10): آف
  // روز 3 (1404/8/11): روز
  // روز 4 (1404/8/12): آف
  // روز 5 (که همان 0 در پیمانه است): شب
  // ...

  switch (cycleDay) {
    case 0:
      return SHIFT_TYPE.NIGHT; // شب
    case 3:
      return SHIFT_TYPE.DAY; // روز
    case 1:
    case 2:
    case 4:
    default:
      return SHIFT_TYPE.OFF; // آف
  }
}