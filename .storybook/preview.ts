import type { Preview } from "@storybook/react";
import "@/styles/globals.css";

import { INITIAL_VIEWPORTS } from "storybook/viewport"; // https://storybook.js.org/docs/essentials/viewport

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        dark: { name: "Dark", value: "var(--color-foreground)" },
        light: { name: "Light", value: "var(--color-background)" },
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  initialGlobals: {
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
