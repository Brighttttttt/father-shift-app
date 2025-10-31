// src/App.jsx

import React from 'react';
import CalendarDisplay from './components/CalendarDisplay';
import SearchPanel from './components/SearchPanel';
import './styles/App.css';

function App() {
  return (
    <div className="appContainer">
      {/* بخش جستجو (در دسکتاپ سمت چپ، در موبایل پایین) 
        کلاس searchSection برای اعمال order: 2 در موبایل است
      */}
      <div className="searchSection">
        <SearchPanel />
      </div>

      {/* بخش تقویم (در دسکتاپ سمت راست، در موبایل بالا)
        کلاس calendarSection برای اعمال order: 1 در موبایل است
      */}
      <div className="calendarSection">
        <CalendarDisplay />
      </div>
    </div>
  );
}

export default App;