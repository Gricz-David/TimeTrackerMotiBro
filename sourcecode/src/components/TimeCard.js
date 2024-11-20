import React from "react";

const TimeCard = ({ date, startTime, endTime, tag, description }) => {
  return (
    <div className="bg-white p-3 rounded-md shadow-sm text-gray-800 border border-gray-200 mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">{date}</span>

        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-md">
          {tag}
        </span>
      </div>

      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <div>
          <span className="font-semibold">Start:</span> {startTime}
        </div>
        <div>
          <span className="font-semibold">End:</span> {endTime}
        </div>
      </div>

      <div className="text-xs text-gray-600 truncate">{description}</div>
    </div>
  );
};

export default TimeCard;
