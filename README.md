# Makyo Dropdown

A lightweight, feature-rich React dropdown component with search, multi-select, and portal support.

## Installation

```bash
npm install makyo-component
```

## Quick Start

```tsx
import { Dropdown, DropdownLabel } from 'makyo-component';

const options = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
];

function App() {
  const [value, setValue] = useState('');

  return (
    <>
      <DropdownLabel htmlFor="my-dropdown">Select</DropdownLabel>
      <Dropdown
        id="my-dropdown"
        options={options}
        value={value}
        onChange={setValue}
      />
    </>
  );
}
```

## Features

- Single and multi-select modes
- Built-in search with highlight matching
- Portal rendering for overflow containers
- Custom option rendering
- Clearable selections
- Disabled states
- Icons support
- Tailwind CSS styling

## API

### Dropdown Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | HTML ID for the dropdown |
| `options` | `DropdownOption[]` | Required | Array of options |
| `value` | `string \| number \| array` | `undefined` | Selected value(s) |
| `onChange` | `function` | `undefined` | Change handler |
| `placeholder` | `string` | `"Select..."` | Placeholder text |
| `withSearch` | `boolean` | `false` | Enable search |
| `multiSelect` | `boolean` | `false` | Enable multi-select |
| `usePortal` | `boolean` | `false` | Render dropdown in portal |
| `disabled` | `boolean` | `false` | Disable dropdown |
| `clearable` | `boolean` | `true` | Show clear button |
| `renderOption` | `function` | `undefined` | Custom option renderer |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `noOptionsMessage` | `string` | `"No options found"` | Empty state message |
| `className` | `string` | `""` | Container classes |
| `dropdownClassName` | `string` | `""` | Dropdown menu classes |
| `maxHeight` | `number` | `300` | Max dropdown height (px) |
| `zIndex` | `number` | `9999` | Dropdown z-index |

### DropdownOption

```tsx
interface DropdownOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
  [key: string]: any; // Custom properties
}
```

### DropdownLabel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | Required | Links to dropdown ID |
| `children` | `ReactNode` | Required | Label content |
| `className` | `string` | `""` | Custom classes |
| `required` | `boolean` | `false` | Show required indicator |

## Examples

### With Search

```tsx
<Dropdown
  id="searchable"
  options={options}
  value={value}
  onChange={setValue}
  withSearch
  searchPlaceholder="Type to search..."
/>
```

### Multi-select

```tsx
<Dropdown
  id="multi"
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  multiSelect
  placeholder="Select multiple"
/>
```

### With Portal (for overflow containers)

```tsx
<div style={{ overflow: 'hidden' }}>
  <Dropdown
    id="portal"
    options={options}
    value={value}
    onChange={setValue}
    usePortal
  />
</div>
```

### Custom Option Rendering

```tsx
<Dropdown
  id="custom"
  options={users}
  value={value}
  onChange={setValue}
  renderOption={(option, isSelected) => (
    <div>
      <strong>{option.label}</strong>
      <div>{option.email}</div>
    </div>
  )}
/>
```

### With Icons

```tsx
const options = [
  { label: 'Apple', value: 'apple', icon: '🍎' },
  { label: 'Banana', value: 'banana', icon: '🍌' },
];
```

## Styling

Component uses Tailwind CSS. Ensure your project has Tailwind configured and includes:

```js
// tailwind.config.js
module.exports = {
  content: ['./node_modules/makyo-component/dist/**/*.js'],
  // ... rest of config
};
```

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build library
npm run build
```

