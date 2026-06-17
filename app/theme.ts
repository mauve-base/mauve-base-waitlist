import { createTheme, type MantineColorsTuple } from "@mantine/core";

// Refined, slightly muted purple with a mauve undertone — sophisticated, not neon.
const mauve: MantineColorsTuple = [
  "#f7f4fb",
  "#ece5f6",
  "#d7c6ec",
  "#c1a6e1",
  "#ad8bd8",
  "#9f79d2",
  "#9268c9",
  "#7e51b5",
  "#6a4199",
  "#523072",
];

export const theme = createTheme({
  primaryColor: "mauve",
  primaryShade: { light: 7 },
  autoContrast: true,
  luminanceThreshold: 0.35,
  colors: { mauve },
  white: "#ffffff",
  black: "#241826",
  defaultRadius: "md",
  fontFamily:
    "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  headings: {
    fontFamily: "var(--font-fraunces), Georgia, 'Times New Roman', serif",
    fontWeight: "500",
  },
});
