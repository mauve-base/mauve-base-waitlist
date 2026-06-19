import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Reveal } from "@/components/reveal";
import { Em, Label, RULE, StatBand } from "@/components/editorial";

// Shared with the Vision page's stat band — keep the figures in sync.
const STATS: [string, string][] = [
  ["$14.8B", "Total addressable market"],
  ["~98%", "Of cold outreach goes unanswered"],
  ["10×", "Growth in outbound volume in 3 years"],
];

export function TrustStrip() {
  return (
    <Box
      as="section"
      style={{ background: "#ffffff", borderTop: RULE, borderBottom: RULE }}
    >
      <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "64px", md: "104px" }}>
        <Reveal>
          <Flex justify="space-between" align="flex-end" pb="20px" style={{ borderBottom: RULE }}>
            <Label>Why now</Label>
            <Text
              fontSize="xs"
              color="ink"
              style={{ opacity: 0.55, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Three signals
            </Text>
          </Flex>
        </Reveal>

        <Reveal delay={0.05}>
          <Heading
            as="h2"
            fontWeight={500}
            mt={{ base: "36px", md: "52px" }}
            maxW="20ch"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            The first tab a sales team opens <Em>before any outreach</Em>.
          </Heading>
        </Reveal>

        <Box mt={{ base: "44px", md: "64px" }}>
          <Reveal delay={0.1}>
            <StatBand stats={STATS} />
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
