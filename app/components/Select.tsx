"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

type SelectProps = {
  options: string[];
  selected: string;
  setSelected: (option: string) => void;
};

const Select = ({ options, selected, setSelected }: SelectProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus();
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "Enter" || event.key === "Space") {
      event.preventDefault();
      setIsOpen(true);
    }
  };
  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    event.preventDefault();
    switch (event.code) {
      case "ArrowUp":
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;

      case "ArrowDown":
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;

      case "Enter":
      case "Space":
        const selectedOption = options[focusedIndex];
        setSelected(selectedOption);
        setIsOpen(false);
        break;

      case "Escape":
        setIsOpen(false);
        break;

      case "Tab":
        event.preventDefault();
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-1/3 relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="listbox"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
        className="w-full flex justify-between items-center px-4 py-2 text-left border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300 cursor-pointer"
      >
        {selected}
        <ChevronDownIcon
          className={`${isOpen ? "transform rotate-180" : ""} size-4`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id="listbox"
          role="listbox"
          tabIndex={0}
          onKeyDown={handleListKeyDown}
          aria-activedescendant={`option-${focusedIndex}`}
          className="absolute w-full bg-white mt-2 border border-gray-300 rounded-lg shadow-md overflow-hidden focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {options.map((option, index) => (
            <li
              key={option}
              id={`option-${index}`}
              role="option"
              aria-selected={option === selected}
              className={`px-4 py-2 text-left cursor-pointer ${
                focusedIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
