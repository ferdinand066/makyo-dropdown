export interface DropdownOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

export interface DropdownProps {
  id: string;
  options: DropdownOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  withSearch?: boolean;
  multiSelect?: boolean;
  usePortal?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  renderOption?: (
    option: DropdownOption,
    isSelected: boolean
  ) => React.ReactNode;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  className?: string;
  dropdownClassName?: string;
  maxHeight?: number;
  zIndex?: number;
}

export interface DropdownLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}
