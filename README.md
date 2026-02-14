# ATPENN React Native Project

A React Native project following **modular architecture** and **Atomic Design Principles** for scalable code organization.  
[Recommended Reading: React Native Folder Structure Best Practices](https://medium.com/@prathiba2796/react-native-best-practices-for-organizing-code-with-atomic-folder-structure-131858653eb1)

## Installation

For detailed installation instructions and setup steps, please refer to the [Installation Guide]().



---

# Project Structure & Guidelines

This project follows a modular architecture with a focus on scalability, maintainability, and a clear separation of concerns. The UI components are organized following Atomic Design principles.

## Directory Structure

```plaintext
src/
├── assets/                  # Static assets (images, fonts, etc.)
├── components/              # Atomic Design components
│   ├── atom/                # Fundamental UI elements
│   │   ├── Box/             # Layout container
│   │   ├── Button/          # Interactive element
│   │   ├── Text/            # Typography component
│   │   └── ...              # Others (InputBox, RemoteImage, etc.)
│   ├── molecules/           # Combinations of atoms
│   └── organisms/           # Complex UI sections
├── navigation/              # Routing and navigation logic
├── screens/                 # App screens/pages
├── theme/                   # Design tokens (colors, spacing)
├── utils/                   # Helper functions
├── types/                   # TypeScript type definitions
├── App.tsx                  # Root component
└── index.js                 # Entry point
```

## Explanation
- **assets/**: Contains static assets like images, fonts, and icons used throughout the project.
- **components/**: Organized according to Atomic Design:
    - **atom/**: Basic UI elements that serve as the building blocks.
    - **Box/**: Layout container.
    - **Button/**: Interactive button.
    - **Text/**:Typography for consistent styling.
    - Additional components (e.g., InputBox, RemoteImage) can be added here.
- **molecules/:** Small groups of atoms working together to form more complex elements.
- **organisms/**: More complex UI sections that combine multiple molecules and atoms.
- **navigation/**:
Manages routing and navigation logic for the application.

- **screens/**: Contains the different pages or screens of the application.

- **theme/**: Includes design tokens such as colors, spacing, and fonts to maintain design consistency.

- **utils/**: Houses helper functions and utilities used across the project.

- **types/**:
Contains TypeScript type definitions for improved type safety and code clarity.

- **App.tsx**:
The root component that bootstraps the application.

- **index.js:**
The main entry point of the app.

## Components Usage

### Text Component

Our custom `Text` component standardizes typography across the app by replacing the native React Native `Text` component. This ensures consistent font sizes, colors, and styles throughout your project.

**Usage Example:**

```typescript
import { Text } from './path-to-text-component';

<Text variant="H1">This is a heading</Text>
<Text variant="P1">This is a paragraph</Text>
```

### Box Component

The `Box` component acts as a versatile layout container, offering a more powerful alternative to the standard `View` component. It leverages design tokens from our theme to ensure consistent spacing, padding, and background styling across the app.

**Usage Example:**

```typescript
import { Text } from './path-to-text-component';

<Text variant="H1">This is a heading</Text>
<Text variant="P1">This is a paragraph</Text>
```


## Technology Stack Explanation:

- **TypeScript:** Strong typing to reduce runtime errors and improve code quality with better autocompletion and refactoring support.

- **React Native:** This is the main framework we use to build the app. It lets us create one app that works on both Android and iOS.

- **React Navigation:** It makes switching between different screens simple. This tool helps set up smooth and easy navigation in the app.

- **@shopify/restyle:** This tool helps us manage the app's design. It keeps the style consistent and makes it simple to update the look of the app.




## Consistent `index.ts` Usage:

- **Index File Structure:**
    - Every folder will have an `index.ts` file to export its contents. This approach simplifies imports and keeps the codebase organized.

    - By using `index.ts`, we can import components, hooks, or utilities from a folder without needing to specify individual files, making the code cleaner and more maintainable.


    **Usage Example:**
```bash
// File structure
src/
  components/
    Button/
      Button.tsx
      index.ts
    index.ts

// In `index.ts` of components folder
export * from './Button';

// In `index.ts` of Button folder
export * from './Button';

// Importing the Button component elsewhere
import { Button } from 'components';
```







