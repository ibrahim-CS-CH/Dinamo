# Dinamo Task

This repo is for Dinamo Task

## Getting Started

# Please add .env file that has VITE_APP_API_URL="https://jsonplaceholder.typicode.com"

To get started with this codebase, you need to have Node.js installed on your system. After cloning the repository,
install the dependencies:

```bash
    yarn
    yarn dev
```

# Developer Guidelines for Project

## 1. Code Quality

### 1.1 Adhere to Coding Standards

#### 1.1.1 Code Formatting

- Use Prettier for automatic code formatting.
  - Ensure Prettier is configured and integrated with your development environment.
  - Prettier is configured to run before commit, so ensure that is works.

#### 1.1.2 Linting

- Use ESLint for identifying and fixing problematic patterns in JavaScript code.
  - Ensure ESLint is configured with a shared configuration file `.eslintrc.json`.
  - Integrate ESLint with your code editor for real-time feedback.
- ESLint is ran during commit step, so make sure it works normally in you setup environment.

#### 1.1.3 Consistency and Unified Code

- Ensure consistent use of quotes, indentation, and spacing across the codebase.
- Follow our consistent naming convention for variables, functions, and classes.
- Organize imports and requires in a consistent order.

#### 1.1.4 Tailwind CSS Usage

- Follow the project's established guidelines for using Tailwind CSS.
- Ensure consistent use of utility classes for styling.
- Use Tailwind's configuration file `tailwind.config.js` to customize the framework according to project needs.
- Avoid overriding Tailwind classes with custom CSS; use Tailwind's theming and utility-first approach.

#### 1.1.5 Shadcn/Ui

- Pre-built Components: ShadCN provides a library of customizable components for rapid UI development.
- Accessibility: Built on top of Radix UI primitives, ensuring the UI is accessible and keyboard-friendly.
- Customization: Fully customizable using Tailwind CSS, allowing you to adapt styles to match your design system.
- Dark Mode Support: Easily toggle between light and dark themes.
