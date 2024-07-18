// src/EditableDropdown.js
import React, { useEffect, useState } from "react";

const EditableDropdown = ({section, setSection}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newOption, setNewOption] = useState("");

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    setIsEditing(true);
  };
  const handleClose = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setSelectedOption(newOption.trim());
      setNewOption("");
      setIsEditing(false);
    }
  };

  const handleSectionSelection = (selectedOption) => {
    if(selectedOption.length > 0)
    setSection({[selectedOption]: []})
  };
  useEffect(() => {
    handleSectionSelection(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            className="p-2 w-80 rounded-s-md"
            value={newOption}
            onChange={handleInputChange}
            placeholder="Enter new section"
          />
          <button
            className="p-2 text-red-600 font-semibold bg-lime-600 rounded-e-md"
            onClick={handleAddOption}
          >
            Add Section
          </button>
          <button className="p-2 text-center text-red-600 font-semibold rounded-md bg-yellow-600 ms-1" onClick={handleClose}>
            X
          </button>
        </div>
      ) : (
        <div>
          <select
            className="p-2 w-80 rounded-s-md"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              {`${options.length ? "Select":"Create"} a section`}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="p-2 text-red-600 font-semibold bg-lime-600 rounded-e-md"
            onClick={handleButtonClick}
          >
            Add Section
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableDropdown;
