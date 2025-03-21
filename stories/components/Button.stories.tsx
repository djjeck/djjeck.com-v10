import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../client/src/components/ui/button";
import { createTemplate } from "../../client/src/lib/storybook";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Component documentation for Button",
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

const Template = (args: React.ComponentProps<typeof Button>) => <Button {...args} />;

export const Primary: Story = {
  render: Template,
  args: {
    children: "Primary Button",
    variant: "default",
  }
};

export const Secondary: Story = {
  render: Template,
  args: {
    children: "Secondary Button",
    variant: "secondary",
  }
};

export const Outline: Story = {
  render: Template,
  args: {
    children: "Outline Button",
    variant: "outline",
  }
};

export const Destructive: Story = {
  render: Template,
  args: {
    children: "Destructive Button",
    variant: "destructive",
  }
};

export const Ghost: Story = {
  render: Template,
  args: {
    children: "Ghost Button",
    variant: "ghost",
  }
};

export const Link: Story = {
  render: Template,
  args: {
    children: "Link Button",
    variant: "link",
  }
};

export const WithIcon: Story = {
  render: Template,
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        Button with Icon
      </>
    ),
    variant: "default",
  }
};

export const Loading: Story = {
  render: Template,
  args: {
    children: (
      <>
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Loading
      </>
    ),
    variant: "default",
    disabled: true,
  }
};

export const Disabled: Story = {
  render: Template,
  args: {
    children: "Disabled Button",
    variant: "default",
    disabled: true,
  }
};

export const Small: Story = {
  render: Template,
  args: {
    children: "Small Button",
    variant: "default",
    size: "sm",
  }
};

export const Large: Story = {
  render: Template,
  args: {
    children: "Large Button",
    variant: "default",
    size: "lg",
  }
};
