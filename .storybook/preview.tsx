import React from "react";
import type { Preview } from "@storybook/react";
import "../client/src/index.css";
import "./storybook.css";

// Create a decorator for light/dark theme toggling
const withThemeDecorator = (Story: any, context: any) => {
  // Get the current theme from the globals or default to light
  const theme = context.globals.theme || 'light';
  
  return (
    <div className={`p-4 ${theme}`} data-theme={theme}>
      <Story />
    </div>
  );
};

// Define the preview configuration
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f8fafc" },
        { name: "dark", value: "#1e293b" },
      ],
    },
    layout: "centered",
  },
  // Add a global for theme switching
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  // Use the theme decorator
  decorators: [withThemeDecorator],
};

export default preview;