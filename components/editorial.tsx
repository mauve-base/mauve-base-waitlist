import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

// Ink hairline — the structural rule used throughout the editorial layout.
export const RULE = "1px solid rgba(36, 24, 38, 0.12)";

/** Small uppercase tracked label — the "folio" marginalia / section locator. */
export function Label({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      fontSize="xs"
      fontWeight={600}
      color="mauve.7"
      style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}
    >
      {children}
    </Text>
  );
}

/** Magenta accent emphasis — the palette's pop color, in the display font. */
export function Em({ children }: { children: ReactNode }) {
  return (
    <Text as="span" fontFamily="heading" fontWeight={500} color="accent">
      {children}
    </Text>
  );
}

/** Serif section heading. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <Heading
      as="h2"
      fontWeight={500}
      style={{
        fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)",
        letterSpacing: "-0.015em",
        lineHeight: 1.08,
      }}
    >
      {children}
    </Heading>
  );
}

/**
 * Folio section: a wide left "margin" holds the uppercase label while the main
 * content sits in the central column — the magazine grid this redesign is built on.
 */
export function FolioSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "16px", md: "64px" }}
      align="flex-start"
    >
      <Box minW={{ md: "200px" }} pt={{ md: "6px" }}>
        <Label>{label}</Label>
      </Box>
      <Stack gap="24px" maxW="760px" flex="1">
        {children}
      </Stack>
    </Flex>
  );
}

/** Three serif numerals with hairline dividers — the "stat band". */
export function StatBand({ stats }: { stats: [string, string][] }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: "28px", sm: "0px" }}>
      {stats.map(([value, label], i) => (
        <Box
          key={label}
          borderLeftWidth={{ base: "0px", sm: i === 0 ? "0px" : "1px" }}
          borderColor="rgba(36, 24, 38, 0.12)"
          pl={{ base: "0px", sm: i === 0 ? "0px" : "40px" }}
        >
          <Text
            fontFamily="heading"
            fontSize={{ base: "44px", md: "56px" }}
            fontWeight={500}
            color="mauve.7"
            lineHeight={1.0}
            style={{ letterSpacing: "-0.01em" }}
          >
            {value}
          </Text>
          <Text color="ink" opacity={0.6} fontSize="sm" mt="10px" maxW="240px">
            {label}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

/**
 * Frames a visual like a plate in a journal: a hairline border on a white
 * surface, with an italic figure caption beneath.
 */
export function FigureFrame({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <Box as="figure" style={{ margin: 0 }}>
      <Box
        bg="white"
        border={RULE}
        p={{ base: "16px", md: "24px" }}
        style={{
          borderRadius: 12,
          boxShadow: "0 30px 60px -34px rgba(36, 24, 38, 0.3)",
        }}
      >
        {children}
      </Box>
      {caption ? (
        <Text
          as="figcaption"
          mt="12px"
          color="ink"
          fontSize="sm"
          style={{ opacity: 0.55, fontStyle: "italic" }}
        >
          {caption}
        </Text>
      ) : null}
    </Box>
  );
}
