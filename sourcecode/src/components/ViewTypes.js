import * as React from 'react';

export default function ViewTypeButtons({ viewType, setViewType }) {
  
  const handleChange = (value) => {
    setViewType(value);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
      <button
        onClick={() => handleChange('day')}
        className={`w-full p1 text-sm font-semibold rounded-lg transition-colors duration-200 
          ${viewType === 'day' ? 'bg-blue-500 text-white' : 'bg-transparent border-2 border-blue-500 text-blue-500'} 
          hover:bg-blue-100 focus:outline-none`}
      >
        Day
      </button>
      <button
        onClick={() => handleChange('week')}
        className={`w-full p1 text-sm font-semibold rounded-lg transition-colors duration-200 
          ${viewType === 'week' ? 'bg-blue-500 text-white' : 'bg-transparent border-2 border-blue-500 text-blue-500'} 
          hover:bg-blue-100 focus:outline-none`}
      >
        Week
      </button>
      <button
        onClick={() => handleChange('month')}
        className={`w-full p1 text-sm font-semibold rounded-lg transition-colors duration-200 
          ${viewType === 'month' ? 'bg-blue-500 text-white' : 'bg-transparent border-2 border-blue-500 text-blue-500'} 
          hover:bg-blue-100 focus:outline-none`}
      >
        Month
      </button>
    </div>
  );
}
