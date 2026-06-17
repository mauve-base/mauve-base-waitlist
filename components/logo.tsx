import { Box, Group, Text } from "@mantine/core";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Group gap={10} align="center" wrap="nowrap">
      <Box
        w={26}
        h={26}
        style={{
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          background: light ? "#ffffff" : "var(--mantine-color-mauve-7)",
        }}
      >
        <Box
          w={9}
          h={9}
          style={{
            borderRadius: 999,
            background: light ? "var(--mantine-color-mauve-7)" : "#ffffff",
          }}
        />
      </Box>
      <Text
        fz={19}
        fw={500}
        ff="var(--font-fraunces), Georgia, serif"
        c={light ? "white" : "black"}
        style={{ letterSpacing: "-0.01em" }}
      >
        Mauve Base
      </Text>
    </Group>
  );
}
