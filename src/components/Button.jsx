**Folder Name:** Components

**File Name:** Button.jsx

**Line by Line Documented Code:**

```jsx
// Importing the React library
import React from "react";

// Default export of the function component called Button
export default function Button({
    // Destructuring props passed to the component:
    children, // The content that will be displayed inside the button
    type = "button", // The type of button (defaults to "button")
    bgColor = "bg-blue-600", // The background color of the button (defaults to "bg-blue-600")
    textColor = "text-white", // The text color of the button (defaults to "text-white")
    className = "", // Additional CSS classes to be applied to the button
    ...props // Spread the rest of the props passed to the component
}) {
    // Return the Button component
    return (
        <button
            // Constructing the className string by combining the default CSS classes and any additional classes passed as props
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props} // Spread the rest of the props passed to the component
        >
            {children} // Display the content passed as props
        </button>
    );
}
```

**Explanation:**

- Import the React library to create the React component.
- Export the `Button` function as the default export.
- The `Button` function accepts several props:
  - `children`: The content that will be displayed inside the button.
  - `type`: The type of button (defaults to `"button"`).
  - `bgColor`: The background color of the button (defaults to `"bg-blue-600"`).
  - `textColor`: The text color of the button (defaults to `"text-white"`).
  - `className`: Additional CSS classes to be applied to the button.
  - Any additional props passed to the button will be spread into the button element.
- The `Button` function returns a button element with the specified props and content.