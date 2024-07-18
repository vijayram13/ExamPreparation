import React, { useState } from "react";
import {  ArrowDropDown, ArrowRight } from "@mui/icons-material";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSubmenu = () => setIsSubmenuOpen(!isSubmenuOpen);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Filter
          <ArrowDropDown className="ml-2 -mr-1" />
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700  px-4 py-2 text-sm w-full text-left flex justify-between items-center"
              role="menuitem"
              onClick={toggleSubmenu}
            >
              Submenu
              <ArrowRight />
            </button>

            {isSubmenuOpen && (
              <div className="pl-4">
                <button
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                  role="menuitem"
                >
                  Submenu Item 1
                </button>
                <button
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                  role="menuitem"
                >
                  Submenu Item 2
                </button>
              </div>
            )}

            <button
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
              role="menuitem"
            >
              Item 2
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
              role="menuitem"
            >
              Item 3
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
