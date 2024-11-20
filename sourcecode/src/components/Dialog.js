import React, { useState, useEffect } from "react";

const Dialog = ({
  isDialogOpen,
  setIsDialogOpen,
  addOrEditTimeCard,
  deleteTimeCard,
  selectedCard,
}) => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    tag: "",
    description: "",
  });

  // Predefined tags
  const tags = ["Project", "Client", "Break", "Lunch", "Meeting"];

  // Effect to pre-fill the form if editing an existing card
  useEffect(() => {
    if (selectedCard) {
      setFormData({
        date: selectedCard.date,
        startTime: selectedCard.startTime,
        endTime: selectedCard.endTime,
        tag: selectedCard.tag,
        description: selectedCard.description || "",
      });
    }
  }, [selectedCard]); // Runs whenever selectedCard changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there's a selected card, we're editing it
    if (selectedCard) {
      const updatedCard = {
        ...selectedCard,
        ...formData, // Update only the fields that changed
      };
      addOrEditTimeCard(updatedCard); // Call parent function to edit the existing card
    } else {
      addOrEditTimeCard(formData); // Call parent function to add a new card
    }

    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      tag: "",
      description: "",
    });
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (selectedCard) {
      deleteTimeCard(selectedCard.id);
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {selectedCard ? "Edit Time Card" : "Add Time Card"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tag</label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select a tag</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                {selectedCard && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {selectedCard ? "Save Changes" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
