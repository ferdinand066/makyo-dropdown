import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Dropdown, { DropdownLabel } from "./Dropdown";
import { cn } from "../utils/cn";
import { DropdownOption } from "./dropdown.type";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
    withSearch: { control: "boolean" },
    multiSelect: { control: "boolean" },
    usePortal: { control: "boolean" },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    searchPlaceholder: { control: "text" },
    noOptionsMessage: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const basicOptions: DropdownOption[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option with icon", value: "opt2", icon: "🎨" },
  { label: "Long Long Option 3", value: "opt3" },
  { label: "Long Long Long Option 4", value: "opt4" },
  { label: "Long Long Long Long Option 5", value: "opt5" },
  { label: "Long Long Long Long Long Option 6", value: "opt6" },
];

const manyOptions: DropdownOption[] = Array.from({ length: 50 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `opt${i + 1}`,
}));

export const SingleSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Label</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "single-select",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: false,
    multiSelect: false,
    usePortal: false,
    clearable: true,
  },
};

export const WithLabelOnTop: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8">
        <div className="flex flex-col gap-1">
          <DropdownLabel htmlFor={args.id}>Select Option</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "label-top",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: false,
    multiSelect: false,
    usePortal: false,
    clearable: true,
  },
};

export const WithLabelOnLeft: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Select Option</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "label-left",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: false,
    multiSelect: false,
    usePortal: false,
    clearable: true,
  },
};

export const WithRequiredLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8">
        <div className="flex flex-col gap-1">
          <DropdownLabel htmlFor={args.id} required>
            Required Field
          </DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "required",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: false,
    multiSelect: false,
    usePortal: false,
    clearable: true,
  },
};

export const SingleSelectWithSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Label</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "single-select-search",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: true,
    multiSelect: false,
    usePortal: false,
    clearable: true,
    searchPlaceholder: "Search options...",
  },
};

export const MultiSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>([]);

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Multi Select</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as (string | number)[]);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "multi-select",
    options: basicOptions,
    placeholder: "Select multiple options",
    withSearch: false,
    multiSelect: true,
    usePortal: false,
    clearable: true,
  },
};

export const MultiSelectWithSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>([]);

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Multi Select</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as (string | number)[]);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "multi-select-search",
    options: basicOptions,
    placeholder: "Select multiple options",
    withSearch: true,
    multiSelect: true,
    usePortal: false,
    clearable: true,
    searchPlaceholder: "Search options...",
  },
};

export const WithPortal: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8">
        <div
          className="bg-blue-100 p-4 rounded-md overflow-hidden h-[200px]"
        >
          <p className="text-sm text-gray-600 mb-4">
            This dropdown uses a portal to render outside the overflow
            container.
          </p>
          <div className="flex items-center gap-3">
            <DropdownLabel htmlFor={args.id}>Portal</DropdownLabel>
            <Dropdown
              className="w-full"
              {...args}
              value={value}
              onChange={(newValue) => {
                setValue(newValue as string | number);
                args.onChange?.(newValue);
              }}
            />
          </div>
        </div>
      </div>
    );
  },
  args: {
    id: "portal-dropdown",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: true,
    multiSelect: false,
    usePortal: true,
    clearable: true,
  },
};

export const LongList: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Long List</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "long-list",
    options: manyOptions,
    placeholder: "Select an option",
    withSearch: true,
    multiSelect: false,
    usePortal: false,
    clearable: true,
    searchPlaceholder: "Search...",
  },
};

export const CustomOptionRendering: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    const customOptions: DropdownOption[] = [
      {
        label: "John Doe",
        value: "user1",
        email: "john@example.com",
        avatar: "👤",
      },
      {
        label: "Jane Smith",
        value: "user2",
        email: "jane@example.com",
        avatar: "👩",
      },
      {
        label: "Bob Johnson",
        value: "user3",
        email: "bob@example.com",
        avatar: "👨",
      },
      {
        label: "Alice Williams",
        value: "user4",
        email: "alice@example.com",
        avatar: "👧",
      },
    ];

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Select User</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            options={customOptions}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
            renderOption={(option, isSelected) => (
              <div
                className={cn(
                  "flex items-center gap-3",
                  isSelected && "font-semibold"
                )}
              >
                <span className="text-2xl">{option.avatar}</span>
                <div className="flex-1">
                  <div className="text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.email}</div>
                </div>
                {isSelected && (
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            )}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "custom-rendering",
    placeholder: "Choose a user",
    withSearch: true,
    multiSelect: false,
    usePortal: false,
    clearable: true,
    searchPlaceholder: "Search users...",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("opt1");

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Disabled</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as string | number);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "disabled",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: false,
    multiSelect: false,
    usePortal: false,
    disabled: true,
    clearable: true,
  },
};

export const HighZIndexTest: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>("");

    return (
      <div className="p-8 relative">
        <div
          className="absolute top-20 left-0 w-full h-10 bg-red-500 text-white flex items-center justify-center"
          style={{ zIndex: 5000 }}
        >
          Element with z-index: 5000
        </div>
        <div className="relative pt-2">
          <div className="flex items-center gap-3">
            <DropdownLabel htmlFor={args.id}>High Z-Index</DropdownLabel>
            <Dropdown
              className="w-full"
              {...args}
              value={value}
              onChange={(newValue) => {
                setValue(newValue as string | number);
                args.onChange?.(newValue);
              }}
            />
          </div>
        </div>
      </div>
    );
  },
  args: {
    id: "high-z-index",
    options: basicOptions,
    placeholder: "Select an option",
    withSearch: true,
    multiSelect: false,
    usePortal: false,
    clearable: true,
    zIndex: 10000,
  },
};

export const AllFeatures: Story = {
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>([]);

    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <DropdownLabel htmlFor={args.id}>Full Featured</DropdownLabel>
          <Dropdown
            className="w-full"
            {...args}
            value={value}
            onChange={(newValue) => {
              setValue(newValue as (string | number)[]);
              args.onChange?.(newValue);
            }}
          />
        </div>
      </div>
    );
  },
  args: {
    id: "all-features",
    options: manyOptions,
    placeholder: "Select multiple options",
    withSearch: true,
    multiSelect: true,
    usePortal: true,
    clearable: true,
    searchPlaceholder: "Search options...",
    noOptionsMessage: "No matching options",
    maxHeight: 300,
    zIndex: 9999,
  },
};
