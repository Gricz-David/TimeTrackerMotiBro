import React, { useState } from "react";
import Dialog from "./Dialog";

const Functionalities = ({
  timeRange,
  setTimeRange,
  tags,
  setTags,
  addOrEditTimeCard,
  setSnackbar,
  viewSwap,
  setViewSwap,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const availableTags = ["Project", "Client", "Break", "Lunch", "Meeting"]; // Predefined tags

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag)); // Remove tag if it's already selected
    } else {
      setTags([...tags, tag]); // Add tag if it's not selected
    }
  };

  // Switching the views between Time Cards or Summary
  function ViewSwapper() {
    if (viewSwap === 0) setViewSwap(1);
    else setViewSwap(0);
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:flex-wrap">
      {/* Time Range Section */}
      <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
        <span className="font-semibold text-gray-700">Time Range:</span>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === "past"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTimeRange("past")}
        >
          Past
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === "current"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTimeRange("current")}
        >
          Current
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === "upcoming"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTimeRange("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timeRange === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setTimeRange("all")}
        >
          All
        </button>
      </div>

      {/* Dialog Trigger Button */}
      <div className="flex justify-center my-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          Add Timecard
        </button>
      </div>

      {/* View Swap Trigger Button */}
      <div className="flex justify-center my-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={ViewSwapper}
        >
          {viewSwap === 0 ? "See Summary" : "See Time Cards"}
        </button>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap items-center space-x-2">
        <span className="font-semibold text-gray-700">Tags:</span>
        {availableTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded ${
              tags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <Dialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        addOrEditTimeCard={addOrEditTimeCard}
        setSnackbar={setSnackbar}
      />
    </div>
  );
}

export default Functionalities;
