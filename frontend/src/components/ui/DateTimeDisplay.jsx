import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const DateTimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="hidden md:flex items-center gap-4 text-sm font-medium">
      <div className="flex items-center gap-2 text-gray-400">
        <Calendar size={16} className="text-[#00E5FF]" />
        <span>{formatDate(time)}</span>
      </div>
      <div className="h-4 w-px bg-white/10"></div>
      <div className="flex items-center gap-2 text-gray-400">
        <Clock size={16} className="text-[#00E5FF]" />
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
