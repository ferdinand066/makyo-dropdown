import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Search, X, ChevronDown, CircleX } from "lucide-react";
import { cn } from "../utils/cn";
import { DropdownProps } from "./dropdown.type";

const Dropdown: React.FC<DropdownProps> = ({
  id,
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  withSearch = false,
  multiSelect = false,
  usePortal = false,
  disabled = false,
  clearable = true,
  renderOption,
  searchPlaceholder = "Search...",
  noOptionsMessage = "No options found",
  className = "",
  dropdownClassName = "",
  maxHeight = 300,
  zIndex = 9999,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValues = useMemo(() => {
    if (multiSelect) {
      return Array.isArray(value) ? value : [];
    }
    return value !== undefined && value !== null ? [value] : [];
  }, [value, multiSelect]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(lowerSearchTerm)
    );
  }, [options, searchTerm]);

  const selectedOptions = useMemo(() => {
    if (multiSelect) {
      return options.filter((opt) => selectedValues.includes(opt.value));
    }
    const found = options.find((opt) => opt.value === selectedValues[0]);
    return found ? [found] : [];
  }, [options, selectedValues, multiSelect]);

  const selectedOption = multiSelect ? null : selectedOptions[0];

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      updatePosition();
      setSearchTerm("");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSelect = (selectedValue: string | number) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue)
        : [...currentValues, selectedValue];
      onChange?.(newValues);
    } else {
      onChange?.(selectedValue);
      handleClose();
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiSelect ? [] : "");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && withSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, withSearch]);

  useEffect(() => {
    if (isOpen && usePortal) {
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen, usePortal]);

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={index} className="bg-primary text-white">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  const renderDropdownContent = () => (
    <div
      ref={dropdownRef}
      className={cn(
        "bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden",
        dropdownClassName
      )}
      style={
        usePortal
          ? {
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex,
            }
          : { zIndex }
      }
    >
      {withSearch && (
        <div className="border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={typeof searchPlaceholder === 'string' ? searchPlaceholder : 'Search...'}
              className="w-full pl-10 pr-8 py-2 focus:outline-none text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <CircleX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
      <div className="overflow-y-auto" style={{ maxHeight: `${maxHeight}px` }}>
        {filteredOptions.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-500 text-center">
            {noOptionsMessage}
          </div>
        ) : (
          filteredOptions.map((option) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <div
                key={option.value}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={cn(
                  "px-3 py-2 cursor-pointer text-sm",
                  option.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-background",
                  isSelected && "bg-background"
                )}
              >
                {renderOption ? (
                  renderOption(option, isSelected)
                ) : (
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <span className="flex-shrink-0">{option.icon}</span>
                    )}
                    <span className="flex-1">
                      {highlightMatch(option.label, searchTerm)}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative min-w-[200px] bg-white border border-gray-300 rounded-md inline-block",
          className
        )}
      >
        <button
          type="button"
          id={id}
          onClick={handleToggle}
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 gap-2 bg-white rounded-md",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <div className="flex-1 flex items-center gap-2 overflow-hidden">
            {multiSelect && selectedOptions.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedOptions.map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-sm"
                  >
                    {opt.icon && <span>{opt.icon}</span>}
                    {opt.label}
                    {clearable && opt.value && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(opt.value);
                        }}
                        className="hover:text-gray-700"
                      >
                        <CircleX className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            ) : !multiSelect && selectedOption ? (
              <div className="flex items-center gap-2">
                {selectedOption.icon && <span>{selectedOption.icon}</span>}
                <span className="text-sm truncate">{selectedOption.label}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">{placeholder}</span>
            )}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {clearable && selectedValues.length > 0 && (
              <button
                onClick={handleClear}
                className="p-0.5 hover:bg-gray-200 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "w-4 h-4 text-gray-500 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </button>

        {isOpen && !usePortal && (
          <div className="absolute top-full left-0 right-0 mt-1" style={{ zIndex }}>
            {renderDropdownContent()}
          </div>
        )}
      </div>

      {isOpen &&
        usePortal &&
        createPortal(renderDropdownContent(), document.body)}
    </>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
export { DropdownLabel } from "./DropdownLabel";
