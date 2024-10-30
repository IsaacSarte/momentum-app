"use client";
import { ChangeEvent, useEffect, useState } from "react";

const AddDailyGoal = () => {
  const [input, setInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(true);

  // Load the stored goal from localStorage when the component mounts
  useEffect(() => {
    const storedGoal = localStorage.getItem("dailyGoal");
    if (storedGoal) {
      setInput(storedGoal);
      setIsEditing(false); // Show the span initially if a goal is stored
    }
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input.trim() === "") {
      alert("Enter what you want to focus on first ;)");
      return;
    }

    // Save the input to localStorage
    localStorage.setItem("dailyGoal", input);
    setIsEditing(false); // Switch to span view
  };

  const handleToggle = () => {
    if (!isEditing) {
      // Remove the goal from localStorage when toggling back to input
      localStorage.removeItem("dailyGoal");
      setInput(""); // Clear the input field
    }
    setIsEditing(true); // Switch back to input view
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <span className="text-white text-3xl font-medium">
        What is your main focus today?
      </span>
      {isEditing ? (
        <input
          type="text"
          className="max-w-lg w-full px-2 py-1 outline-none bg-transparent border-b-2 border-white rounded text-white"
          onChange={handleInput}
          value={input}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />
      ) : (
        <span
          className="max-w-lg w-full px-2 py-1 outline-none bg-transparent border-b-2 border-white rounded text-white cursor-pointer transition hover:line-through"
          onClick={handleToggle}
        >
          It is: {input}
        </span>
      )}
    </div>
  );
};

export default AddDailyGoal;
