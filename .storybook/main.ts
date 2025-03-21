import type { StorybookConfig } from "@storybook/react-vite";
import { join, resolve } from "path";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    {
      directory: "../stories",
      files: "*.mdx",
      titlePrefix: "Docs",
    },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    // Removing @storybook/addon-styling as it's incompatible with Storybook v8
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  core: {
    disableTelemetry: true,
  },
  // Set logLevel to debug to see more information
  logLevel: 'debug',
  viteFinal: async (config) => {
    console.log("Running viteFinal configuration");
    // Customize the Vite config here
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@": resolve(__dirname, "../client/src"),
          "@shared": resolve(__dirname, "../shared"),
        },
      },
    };
  },
};

export default config;
