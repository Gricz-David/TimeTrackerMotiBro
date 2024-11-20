import React from "react";

const Summary = ({ timecards, viewType }) => {
  // Helper function to get the start of the week (Sunday, for example)
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 - Sunday, 1 - Monday, etc.
    const diff = d.getDate() - day; // Get the previous Sunday (or the same day if it's Sunday)
    const startOfWeek = new Date(d.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0); // Set to midnight
    return startOfWeek;
  };

  // Function to calculate the summary (total hours, tag distribution, busiest day)
  const calculateSummary = () => {
    let totalHours = 0;
    const tagDistribution = {};
    const busiestPeriod = {};

    timecards.forEach((card) => {
      // Calculate duration based on startTime and endTime
      const start = new Date(`1970-01-01T${card.startTime}Z`);
      const end = new Date(`1970-01-01T${card.endTime}Z`);
      const duration = (end - start) / 3600000; // Convert milliseconds to hours

      totalHours += duration;

      // Calculate tag distribution
      tagDistribution[card.tag] = (tagDistribution[card.tag] || 0) + 1;

      // Group data based on viewType (day, week, month)
      let periodKey = "";
      const cardDate = new Date(card.date);

      if (viewType === "day") {
        // For daily view, use the exact date
        periodKey = cardDate.toLocaleDateString("en-GB");
      } else if (viewType === "week") {
        // For weekly view, group by the start of the week
        periodKey = getStartOfWeek(card.date).toLocaleDateString("en-GB");
      } else if (viewType === "month") {
        // For monthly view, group by year-month (e.g., "2024-11")
        periodKey = `${cardDate.getFullYear()}-${(cardDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
      }

      // Track total duration per period (daily/weekly/monthly)
      busiestPeriod[periodKey] = (busiestPeriod[periodKey] || 0) + duration;
    });

    return { totalHours, tagDistribution, busiestPeriod };
  };

  const { totalHours, tagDistribution, busiestPeriod } = calculateSummary();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto my-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {viewType.charAt(0).toUpperCase() + viewType.slice(1)} Summary
      </h3>

      <p className="text-lg font-medium text-gray-600 mb-6">
        <strong>Total Hours Worked:</strong> {totalHours.toFixed(2)} hours
      </p>

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          Workload Per {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
        </h4>
        <ul className="list-disc pl-5 space-y-2">
          {Object.entries(busiestPeriod).map(([period, hours]) => (
            <li key={period} className="text-gray-700">
              <span className="font-medium">{period}</span>: {hours.toFixed(2)}{" "}
              hours
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          Tag Distribution
        </h4>
        <ul className="list-disc pl-5 space-y-2">
          {Object.entries(tagDistribution).map(([tag, count]) => (
            <li key={tag} className="text-gray-700">
              <span className="font-medium">{tag}</span>: {count} occurrences
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Summary;
