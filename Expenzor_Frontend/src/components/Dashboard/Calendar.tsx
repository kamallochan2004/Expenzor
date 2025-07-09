import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar: React.FC = () => {
  const [currentDate] = useState(new Date());
  const navigate = useNavigate();
  
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      navigate(`/transactions?date=${formattedDate}`);
    }
  };
  
  const days = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }
  
  // Add cells for each day of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === currentDate.getDate() && 
                    month === currentDate.getMonth() && 
                    year === currentDate.getFullYear();
    
    const isFutureDate = new Date(year, month, i) > new Date();
    
    days.push(
      <div 
        key={i} 
        onClick={() => !isFutureDate && handleDateClick(i)}
        className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer
          ${isToday ? 'bg-teal-600 text-white' : ''}
          ${isFutureDate ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
        `}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
      <div className="text-center mb-4">
        <h3 className="font-medium">{monthNames[month]} {year}</h3>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        <div className="text-sm font-medium text-gray-500">Su</div>
        <div className="text-sm font-medium text-gray-500">Mo</div>
        <div className="text-sm font-medium text-gray-500">Tu</div>
        <div className="text-sm font-medium text-gray-500">We</div>
        <div className="text-sm font-medium text-gray-500">Th</div>
        <div className="text-sm font-medium text-gray-500">Fr</div>
        <div className="text-sm font-medium text-gray-500">Sa</div>
        {days}
      </div>
    </div>
  );
};

export default Calendar;