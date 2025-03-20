import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { createStoryMeta, createTemplate, createStoryVariant } from "@/lib/storybook";

const meta = createStoryMeta(Button, "Components/Button") as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

const Template = createTemplate(Button);

export const Primary: Story = createStoryVariant(Template, {
  children: "Primary Button",
  variant: "default",
});

export const Secondary: Story = createStoryVariant(Template, {
  children: "Secondary Button",
  variant: "secondary",
});

export const Outline: Story = createStoryVariant(Template, {
  children: "Outline Button",
  variant: "outline",
});

export const Destructive: Story = createStoryVariant(Template, {
  children: "Destructive Button",
  variant: "destructive",
});

export const Ghost: Story = createStoryVariant(Template, {
  children: "Ghost Button",
  variant: "ghost",
});

export const Link: Story = createStoryVariant(Template, {
  children: "Link Button",
  variant: "link",
});

export const WithIcon: Story = createStoryVariant(Template, {
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
});

export const Loading: Story = createStoryVariant(Template, {
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
});

export const Disabled: Story = createStoryVariant(Template, {
  children: "Disabled Button",
  variant: "default",
  disabled: true,
});

export const Small: Story = createStoryVariant(Template, {
  children: "Small Button",
  variant: "default",
  size: "sm",
});

export const Large: Story = createStoryVariant(Template, {
  children: "Large Button",
  variant: "default",
  size: "lg",
});
