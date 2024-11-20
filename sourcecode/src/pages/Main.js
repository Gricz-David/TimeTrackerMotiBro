import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ViewTypes from "../components/ViewTypes";
import Functionalities from "../components/Functionalities";
import TimeCardsView from "../components/TimeCardsView";
import Snackbar from "../components/Snackbar";
import Summary from "../components/Summary";
import Diagrams from "../components/Diagrams";

function MainPage() {
  const username = localStorage.getItem("username");
  const [viewType, setViewType] = useState("day");
  const [timeRange, setTimeRange] = useState("current");
  const [tags, setTags] = useState([]);
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    isOpen: false,
  });

  // Retrieve timecards from local storage
  const locallySavedTimeCards = localStorage.getItem("timeCards");
  // Checking if the timecards exist then parsing them for usage
  const initialTimeCards = locallySavedTimeCards
    ? JSON.parse(locallySavedTimeCards)
    : [];
  console.log(initialTimeCards);
  const [timeCards, setTimeCards] = useState(initialTimeCards);

  const [filteredData, setFilteredData] = useState([]);
  const [viewSwap, setViewSwap] = useState(0);

  const addOrEditTimeCard = (newCard) => {
    // Basic validation
    if (
      !newCard.date ||
      !newCard.startTime ||
      !newCard.endTime ||
      !newCard.tag
    ) {
      setSnackbar({
        message: "All fields (date, start time, end time, tag) are required.",
        type: "error",
        isOpen: true,
      });
      return;
    }

    if (newCard.startTime >= newCard.endTime) {
      setSnackbar({
        message: "Start time must be before end time.",
        type: "error",
        isOpen: true,
      });
      return;
    }

    let updatedTimeCards;

    // If the card has an id, it means we're editing an existing card
    if (newCard.id) {
      updatedTimeCards = timeCards.map((card) =>
        card.id === newCard.id ? { ...card, ...newCard } : card
      );
      setSnackbar({
        message: "Timecard updated successfully!",
        type: "success",
        isOpen: true,
      });
    } else {
      // Add unique ID to the new card
      const newCardWithId = {
        ...newCard,
        id: Date.now(), // Use the current timestamp as a unique ID
      };
      updatedTimeCards = [...timeCards, newCardWithId];
      setSnackbar({
        message: "Timecard added successfully!",
        type: "success",
        isOpen: true,
      });
    }

    setTimeCards(updatedTimeCards);
  };

  const deleteTimeCard = (id) => {
    setTimeCards((prev) => prev.filter((card) => card.id !== id));

    setSnackbar({
      message: "Timecard deleted successfully!",
      type: "success",
      isOpen: true,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    if (snackbar.isOpen) {
      const timer = setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
      }, 3000); // Close snackbar after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [snackbar.isOpen]);

  // Save timecards to local storage
  const saveTimeCards = () => {
    localStorage.setItem("timeCards", JSON.stringify(timeCards)); // Ensure we're saving the timeCards as a stringified JSON array
  };

  useEffect(() => {
    saveTimeCards(); // Save timecards when they change
  }, [timeCards]);

  return (
    <div className="min-h-screen bg-gray-100 pt-5 pb-2 px-4 flex flex-col">
      <Header username={username} />
      <div className="flex-1 bg-white p-4 rounded-lg shadow-lg w-full mx-auto mt-4 sm:mt-5 md:mt-6">
        <ViewTypes viewType={viewType} setViewType={setViewType} />
        <Functionalities
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          tags={tags}
          setTags={setTags}
          addOrEditTimeCard={addOrEditTimeCard}
          setSnackbar={setSnackbar}
          viewSwap={viewSwap}
          setViewSwap={setViewSwap}
        />
        <div className="flex-1 w-full mx-auto mt-2 sm:mt-3 md:mt-4">
          <div>
            <div className={viewSwap === 0 ? "" : "hidden"}>
              <TimeCardsView
                timeCards={timeCards}
                viewType={viewType}
                timeRange={timeRange}
                tags={tags}
                deleteTimeCard={deleteTimeCard}
                addOrEditTimeCard={addOrEditTimeCard}
                setSnackbar={setSnackbar}
                setFilteredData={setFilteredData}
              />
            </div>

            <div className={viewSwap === 1 ? "" : "hidden"}>
              <Summary timecards={filteredData} viewType={viewType} />
              {/* Diagrams is not functional, reason: ran out of time.*/}
              {/* <Diagrams timecards={filteredData} viewType={viewType} /> */}
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
        onClose={closeSnackbar}
      />
    </div>
  );
}

export default MainPage;
