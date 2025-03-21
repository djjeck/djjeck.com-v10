// This file contains utilities for Storybook integration
import React from "react";
import type { ComponentProps, ComponentType } from "react";

/**
 * Creates story args based on component props
 */
export function createStoryMeta<T extends ComponentType<any>>(
  component: T,
  title: string
) {
  return {
    title,
    component,
    parameters: {
      layout: "centered",
      docs: {
        description: {
          component: `Component documentation for ${title}`,
        },
      },
    },
    argTypes: {},
  };
}

/**
 * Creates story variants from template
 */
export function createStoryVariant<TComponent extends ComponentType<any>>(
  Template: any,
  args: Partial<ComponentProps<TComponent>>
) {
  const variant = { ...Template };
  variant.args = args;
  return variant;
}

/**
 * Creates a template function for stories
 */
export function createTemplate<TComponent extends ComponentType<any>>(
  Component: TComponent
) {
  return (args: ComponentProps<typeof Component>) => <Component {...args} />;
}
