import { Box, HStack, Text } from "@chakra-ui/react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <HStack gap="10px" align="center" wrap="nowrap">
      <Box
        w="24px"
        h="24px"
        style={{
          display: "grid",
          placeItems: "center",
          borderRadius: 0,
          background: light
            ? "#ffffff"
            : "linear-gradient(135deg, var(--chakra-colors-mauve-6), var(--chakra-colors-mauve-8))",
        }}
      >
        <Box
          w="8px"
          h="8px"
          style={{
            borderRadius: 0,
            background: light ? "var(--chakra-colors-mauve-7)" : "#ffffff",
          }}
        />
      </Box>
      <Text
        fontSize="19px"
        fontWeight={500}
        fontFamily="heading"
        color={light ? "white" : "ink"}
        style={{ letterSpacing: "-0.01em" }}
      >
        Mauve Base
      </Text>
    </HStack>
  );
}
