import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Reveal } from "@/components/reveal";
import { Label, RULE } from "@/components/editorial";

const STEPS = [
  {
    n: "01",
    title: "Share your trusted relationships",
    body: "Contribute the small-business customers you already serve. The trust you've earned becomes your edge.",
  },
  {
    n: "02",
    title: "We surface buying signals",
    body: "Regular owner panels reveal which businesses are ready to buy — and exactly why.",
  },
  {
    n: "03",
    title: "Send warm introductions",
    body: "Our AI agent writes warm intros to prospects who already trust a vendor like you.",
  },
];

export function StepsSection() {
  return (
    <Box as="section" style={{ background: "var(--chakra-colors-paper)", borderTop: RULE }}>
      <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "64px", md: "104px" }}>
        <Reveal>
          <Flex justify="space-between" align="flex-end" pb="20px" style={{ borderBottom: RULE }}>
            <Label>How it works</Label>
            <Text
              fontSize="xs"
              color="ink"
              style={{ opacity: 0.55, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Three steps
            </Text>
          </Flex>
        </Reveal>

        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.08}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "14px", md: "48px" }}
              align="flex-start"
              py={{ base: "30px", md: "44px" }}
              style={{ borderBottom: RULE }}
            >
              <Text
                fontFamily="heading"
                fontSize={{ base: "42px", md: "58px" }}
                fontWeight={500}
                color="mauve.7"
                lineHeight={0.9}
                style={{ minWidth: "104px" }}
              >
                {step.n}
              </Text>
              <Heading
                as="h3"
                flex="1"
                fontWeight={500}
                fontSize={{ base: "xl", md: "2xl" }}
                style={{ letterSpacing: "-0.015em", maxWidth: "16ch" }}
              >
                {step.title}
              </Heading>
              <Text flex="1" color="ink" style={{ opacity: 0.7 }} fontSize="md" lineHeight={1.6} maxW="440px">
                {step.body}
              </Text>
            </Flex>
          </Reveal>
        ))}
      </Container>
    </Box>
  );
}
