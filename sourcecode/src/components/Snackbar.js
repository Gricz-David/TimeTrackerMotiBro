const Snackbar = ({ message, type, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2">
          X
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
