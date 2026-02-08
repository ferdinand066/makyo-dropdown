import React from "react";
import { cn } from "../utils/cn";
import { DropdownLabelProps } from "./dropdown.type";

export const DropdownLabel: React.FC<DropdownLabelProps> = ({
  htmlFor,
  children,
  className = "",
  required = false,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-medium text-gray-700", className)}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

DropdownLabel.displayName = "DropdownLabel";
