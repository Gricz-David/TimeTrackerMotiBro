import React, { useEffect, useState } from "react";
import TimeCard from "./TimeCard";
import Dialog from "./Dialog";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  isBefore,
  isAfter,
  isSameDay,
  compareAsc,
  format,
} from "date-fns";

const TimeCardsView = ({
  timeCards,
  viewType,
  timeRange,
  tags,
  deleteTimeCard,
  addOrEditTimeCard,
  setSnackbar,
  setFilteredData,
}) => {
  const today = new Date();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Store the selected card for editing

  // Determine the date range based on viewType
  let startDate = null,
    endDate = null;
  if (viewType === "day") {
    startDate = today;
    endDate = today;
  } else if (viewType === "week") {
    startDate = startOfWeek(today, { weekStartsOn: 1 });
    endDate = endOfWeek(today, { weekStartsOn: 1 });
  } else if (viewType === "month") {
    startDate = startOfMonth(today);
    endDate = endOfMonth(today);
  }

  // Filter timecards based on timeRange
  const filteredTimeCards = timeCards.filter((card) => {
    const cardDate = parseISO(card.date);

    // Check if the card is within the specified time range
    const isWithinTimeRange = (() => {
      if (timeRange === "past") {
        if (viewType === "day") {
          return isBefore(cardDate, today);
        } else {
          return isBefore(cardDate, startDate);
        }
      } else if (timeRange === "current") {
        if (viewType === "day") {
          return isSameDay(cardDate, today);
        } else {
          return isWithinInterval(cardDate, { start: startDate, end: endDate });
        }
      } else if (timeRange === "upcoming") {
        if (viewType === "day") {
          return isAfter(cardDate, today);
        } else {
          return isAfter(cardDate, endDate);
        }
      } else if (timeRange === "all") {
        return true;
      }
      return false;
    })();

    // Check if the card matches the selected tags
    const matchesTags =
      tags.length === 0 || tags.some((tag) => card.tag?.includes(tag));

    return isWithinTimeRange && matchesTags;
  });

  useEffect(() => {
    setFilteredData(filteredTimeCards);
  }, [filteredTimeCards]);

  // Sort timecards by date and start time
  const sortedTimeCards = filteredTimeCards.sort((a, b) => {
    const dateComparison = compareAsc(parseISO(a.date), parseISO(b.date));
    if (dateComparison !== 0) {
      return dateComparison;
    }
    // If the dates are the same, compare by startTime
    return a.startTime.localeCompare(b.startTime);
  });

  // Helper function to group timecards by day, week, or month
  const groupTimeCards = () => {
    const grouped = {};
    sortedTimeCards.forEach((card) => {
      const cardDate = parseISO(card.date);
      let groupKey;

      if (viewType === "day") {
        groupKey = format(cardDate, "yyyy-MM-dd");
      } else if (viewType === "week") {
        groupKey = `${format(
          startOfWeek(cardDate, { weekStartsOn: 1 }),
          "yyyy-MM-dd"
        )} - ${format(endOfWeek(cardDate, { weekStartsOn: 1 }), "yyyy-MM-dd")}`;
      } else if (viewType === "month") {
        groupKey = format(cardDate, "yyyy-MM");
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(card);
    });

    return grouped;
  };

  const groupedTimeCards = groupTimeCards();

  // Helper to format the view title
  const formatTitle = () => {
    if (viewType === "day") {
      return `Current Day - ${today.toDateString()}`;
    } else if (viewType === "week") {
      return `Current Week - ${startDate.toDateString()} to ${endDate.toDateString()}`;
    } else if (viewType === "month") {
      return `Current Month - ${startDate.toDateString()} to ${endDate.toDateString()}`;
    }
    return "Timecards";
  };

  // Handle double click on a TimeCard to open the dialog for editing
  const handleDoubleClick = (card) => {
    setSelectedCard(card);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{formatTitle()}</h2>
      {Object.keys(groupedTimeCards).length > 0 ? (
        Object.keys(groupedTimeCards).map((groupKey, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {viewType === "day"
                ? `Day ${groupKey}`
                : viewType === "week"
                ? `Week: ${groupKey}`
                : `Month: ${groupKey}`}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedTimeCards[groupKey].map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  onDoubleClick={() => handleDoubleClick(card)}
                >
                  <TimeCard {...card} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No timecards available for this view.</p>
      )}

      <Dialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        deleteTimeCard={deleteTimeCard}
        addOrEditTimeCard={addOrEditTimeCard}
        setSnackbar={setSnackbar}
        selectedCard={selectedCard}
      />
    </div>
  );
};

export default TimeCardsView;
