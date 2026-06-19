import type { Metadata } from "next";
import { Box, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistForm } from "@/components/waitlist-form";
import { TrustGraphFigure } from "@/components/trust-graph-figure";
import { Reveal } from "@/components/reveal";
import { Em, FolioSection, Label, RULE, SectionHeading, StatBand } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Vision — Mauve Base",
  description:
    "Mauve Base is building the trust layer for companies selling into small businesses, so outreach starts with a warm introduction instead of a cold email.",
};

const STATS: [string, string][] = [
  ["$14.8B", "Total addressable market"],
  ["~98%", "Of cold outreach goes unanswered"],
  ["10×", "Growth in outbound volume in 3 years"],
];

const PRINCIPLES = [
  {
    title: "Trust is the moat",
    body: "Every warm intro is built on a relationship a vendor already earned. That graph compounds — and it can't be scraped.",
  },
  {
    title: "Signals over spam",
    body: "Knowing the moment a business is ready to buy beats reaching everyone, all the time. Less noise, more yes.",
  },
  {
    title: "Local first",
    body: "We start where trust is densest — restaurant-facing vendors in the Triangle — then grow outward, vendor by vendor.",
  },
];

// Visual marks for each conviction (in place of 01/02/03).
const PRINCIPLE_ICONS = [
  // Trust is the moat — shield + check
  <svg key="moat" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 19 6v5.2c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // Signals over spam — broadcast
  <svg key="signals" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2.2" />
    <path d="M8 8a5.5 5.5 0 0 0 0 8" />
    <path d="M16 8a5.5 5.5 0 0 1 0 8" />
    <path d="M5.5 5.5a9 9 0 0 0 0 13" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>,
  // Local first — map pin
  <svg key="local" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21c4-4.2 6-7.3 6-10.2A6 6 0 0 0 6 10.8c0 2.9 2 6 6 10.2Z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>,
];

export default function Vision() {
  return (
    <Box>
      <SiteHeader />

      {/* Hero — full-viewport, vertically centered */}
      <Box
        as="section"
        bg="paper"
        mt={{ md: "-64px" }}
        display={{ base: "block", md: "flex" }}
        alignItems={{ md: "center" }}
        minH={{ base: "auto", md: "100dvh" }}
      >
        <Container
          maxW="1180px"
          px={{ base: "24px", sm: "40px" }}
          py={{ base: "72px", md: "56px" }}
          w="100%"
        >
          <Reveal>
            <Label>Our vision</Label>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading
              as="h1"
              mt={{ base: "36px", md: "56px" }}
              fontWeight={500}
              style={{
                fontSize: "clamp(2.4rem, 6.5vw, 4.6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                maxWidth: "18ch",
              }}
            >
              Outreach should start with <Em>trust</Em>, not a cold open.
            </Heading>
          </Reveal>
          <Reveal delay={0.14}>
            <Text
              mt={{ base: "28px", md: "40px" }}
              fontSize={{ base: "lg", md: "xl" }}
              color="ink"
              style={{ opacity: 0.72 }}
              maxW="640px"
              lineHeight={1.5}
            >
              Mauve Base is building the trust layer for companies selling into
              small businesses — so the first message a vendor sends is a warm
              introduction, not another ignored cold email.
            </Text>
          </Reveal>
        </Container>
      </Box>

      {/* Stat band */}
      <Box as="section" style={{ background: "#ffffff", borderTop: RULE, borderBottom: RULE }}>
        <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "48px", md: "72px" }}>
          <Reveal>
            <StatBand stats={STATS} />
          </Reveal>
        </Container>
      </Box>

      {/* Problem + approach */}
      <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "72px", md: "112px" }}>
        <Stack gap={{ base: "64px", md: "96px" }}>
          <Reveal>
            <FolioSection label="The problem">
              <SectionHeading>Selling to small businesses is mostly guesswork.</SectionHeading>
              <Text color="ink" style={{ opacity: 0.74 }} fontSize="lg" lineHeight={1.65}>
                Vendors can&rsquo;t tell which restaurants, shops, or clinics are
                actually ready to buy — so they spray cold outreach and hope. That
                volume has roughly 10&times;&rsquo;d in the last three years, and
                about 98% of it goes unanswered. Buyers are exhausted; sellers are
                burning budget on noise.
              </Text>
            </FolioSection>
          </Reveal>

          <Reveal delay={0.06}>
            <FolioSection label="What we're building">
              <SectionHeading>Buying signals, routed through trust.</SectionHeading>
              <Text color="ink" style={{ opacity: 0.74 }} fontSize="lg" lineHeight={1.65}>
                We collect proprietary buying signals directly from small-business
                owners through regular panels — so we know not just when a business
                is ready to buy, but why. Vendors contribute the customer
                relationships they&rsquo;ve already earned, and in return our AI
                agent writes warm introductions to prospects who already trust a
                vendor like them. It becomes the first tab a sales team opens before
                any outreach.
              </Text>
            </FolioSection>
          </Reveal>
        </Stack>
      </Container>

      {/* Principles — three columns (distinct from the home "how it works" index) */}
      <Box as="section" style={{ background: "#ffffff", borderTop: RULE }}>
        <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "64px", md: "104px" }}>
          <Reveal>
            <Label>What we believe</Label>
            <Heading
              as="h2"
              mt="16px"
              fontWeight={500}
              maxW="20ch"
              style={{
                fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.06,
              }}
            >
              Three convictions behind everything we build.
            </Heading>
          </Reveal>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="0px" mt={{ base: "24px", md: "72px" }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Box
                  h="100%"
                  pl={{ md: i === 0 ? "0px" : "44px" }}
                  pr={{ md: "44px" }}
                  py={{ base: "28px", md: "0px" }}
                  borderLeftWidth={{ base: "0px", md: i === 0 ? "0px" : "1px" }}
                  borderTopWidth={{ base: i === 0 ? "0px" : "1px", md: "0px" }}
                  borderColor="rgba(36, 24, 38, 0.12)"
                >
                  <Box color="mauve.7" style={{ height: 30 }}>
                    {PRINCIPLE_ICONS[i]}
                  </Box>
                  <Heading
                    as="h3"
                    mt="20px"
                    fontWeight={500}
                    fontSize="xl"
                    style={{ letterSpacing: "-0.015em" }}
                  >
                    {p.title}
                  </Heading>
                  <Text mt="12px" color="ink" style={{ opacity: 0.7 }} fontSize="md" lineHeight={1.6}>
                    {p.body}
                  </Text>
                </Box>
              </Reveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Where we're headed */}
      <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "72px", md: "112px" }}>
        <Reveal>
          <FolioSection label="Where we're headed">
            <SectionHeading>A living map of who&rsquo;s ready to buy.</SectionHeading>
            <Text color="ink" style={{ opacity: 0.74 }} fontSize="lg" lineHeight={1.65}>
              We&rsquo;re starting with restaurant-facing vendors in the
              Raleigh–Durham–Chapel Hill Triangle — point-of-sale, payments,
              equipment, and suppliers — and expanding across the Southeast as each
              vendor&rsquo;s customers become a panel that surfaces signals for the
              next. The long-term vision: a living map of which small businesses are
              ready to buy, and the trusted path to reach them.
            </Text>
            <Box mt="8px" maxW="620px">
              <TrustGraphFigure />
            </Box>
          </FolioSection>
        </Reveal>
      </Container>

      {/* Closing CTA */}
      <Box as="section" style={{ background: "#ffffff", borderTop: RULE }}>
        <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "72px", md: "112px" }}>
          <Flex direction={{ base: "column", md: "row" }} gap={{ base: "36px", md: "72px" }} align={{ base: "flex-start", md: "center" }} justify="space-between">
            <Reveal style={{ flex: "1.2" }}>
              <Heading
                as="h2"
                fontWeight={500}
                style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", letterSpacing: "-0.025em", lineHeight: 1.04, maxWidth: "12ch" }}
              >
                Be <Em>early</Em>.
              </Heading>
              <Text color="ink" style={{ opacity: 0.72 }} fontSize="lg" mt="18px" maxW="440px">
                Reach small businesses with warm introductions, not cold outreach.
                We&rsquo;ll reach out as we onboard.
              </Text>
            </Reveal>
            <Reveal delay={0.1} style={{ flex: "1", width: "100%", maxWidth: "460px" }}>
              <WaitlistForm />
            </Reveal>
          </Flex>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
