import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// "Amethyst Twilight Whisper" palette (from Figma).
// Kept on the original 0–9 `mauve` scale so existing `mauve.7` props and
// `var(--chakra-colors-mauve-7)` references map one-to-one — mauve.7 is the
// deep-violet primary. Magenta is a separate `accent` token.
const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "48em",
      md: "62em",
      lg: "75em",
      xl: "88em",
    },
    tokens: {
      colors: {
        mauve: {
          0: { value: "#f3eff8" },
          1: { value: "#e7dff3" },
          2: { value: "#d6c6ec" },
          3: { value: "#c6b4e6" }, // light lavender (palette)
          4: { value: "#ad8fdb" },
          5: { value: "#9a78d0" },
          6: { value: "#6e54ae" }, // muted medium purple (palette)
          7: { value: "#5e2d91" }, // deep violet — PRIMARY (palette)
          8: { value: "#46217a" },
          9: { value: "#34186f" }, // dark indigo (palette)
        },
        // Vivid magenta/orchid — the pop accent (palette).
        accent: { value: "#9b27b6" },
        accentDark: { value: "#821f9c" },
        ink: { value: "#1e1730" },
        // Light gray canvas (palette).
        paper: { value: "#e7e6eb" },
      },
      fonts: {
        heading: {
          value: "var(--font-space-grotesk), 'Segoe UI', Roboto, sans-serif",
        },
        body: {
          value:
            "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      },
    },
    // Lets `colorPalette="mauve"` work with the built-in button/input recipes.
    semanticTokens: {
      colors: {
        mauve: {
          solid: { value: "{colors.mauve.7}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.mauve.7}" },
          muted: { value: "{colors.mauve.1}" },
          subtle: { value: "{colors.mauve.0}" },
          emphasized: { value: "{colors.mauve.2}" },
          focusRing: { value: "{colors.mauve.7}" },
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      background: "paper",
      color: "ink",
    },
  },
});

export const system = createSystem(defaultConfig, config);
