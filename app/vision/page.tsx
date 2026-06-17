import type { Metadata } from "next";
import { Box, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistForm } from "@/components/waitlist-form";

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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Title
      order={2}
      style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", letterSpacing: "-0.015em" }}
    >
      {children}
    </Title>
  );
}

export default function Vision() {
  return (
    <Box>
      <SiteHeader />

      {/* Hero */}
      <Container size="md" pt={{ base: 56, sm: 96 }} pb={{ base: 40, sm: 64 }}>
        <Stack gap="lg" className="fade-up">
          <Text
            fz="sm"
            fw={600}
            c="mauve.7"
            style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Our vision
          </Text>
          <Title
            order={1}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Outreach should start with{" "}
            <Text span inherit fs="italic" c="mauve.7">
              trust
            </Text>
            , not a cold open.
          </Title>
          <Text size="xl" c="dimmed" maw={720}>
            {
              "Mauve Base is building the trust layer for companies selling into small businesses — so the first message a vendor sends is a warm introduction, not another ignored cold email."
            }
          </Text>
        </Stack>
      </Container>

      {/* Stats strip */}
      <Box
        style={{
          borderTop: "1px solid var(--mantine-color-mauve-2)",
          borderBottom: "1px solid var(--mantine-color-mauve-2)",
          background: "var(--mantine-color-mauve-0)",
        }}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 3 }}
          spacing={0}
          px={{ base: 24, sm: 32, lg: 48 }}
        >
          {STATS.map(([value, label], i) => (
            <Box
              key={label}
              py={{ base: 28, sm: 40 }}
              px={{ base: 0, sm: 28 }}
              style={{
                borderLeft:
                  i === 0 ? undefined : "1px solid var(--mantine-color-mauve-2)",
              }}
            >
              <Text
                ff="var(--font-fraunces), Georgia, serif"
                fz={{ base: 36, sm: 44 }}
                fw={500}
                c="mauve.7"
                lh={1.1}
              >
                {value}
              </Text>
              <Text c="dimmed" size="sm" mt={6}>
                {label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Problem + approach */}
      <Container size="md" py={{ base: 56, sm: 88 }}>
        <Stack gap={48}>
          <Stack gap="sm" maw={760}>
            <SectionHeading>The problem</SectionHeading>
            <Text c="dimmed" size="lg">
              {
                "Selling to small businesses is mostly guesswork. Vendors can't tell which restaurants, shops, or clinics are actually ready to buy — so they spray cold outreach and hope. That volume has roughly 10×'d in the last three years, and about 98% of it goes unanswered. Buyers are exhausted; sellers are burning budget on noise."
              }
            </Text>
          </Stack>
          <Stack gap="sm" maw={760}>
            <SectionHeading>What we&rsquo;re building</SectionHeading>
            <Text c="dimmed" size="lg">
              {
                "We collect proprietary buying signals directly from small-business owners through regular panels — so we know not just when a business is ready to buy, but why. Vendors contribute the customer relationships they've already earned, and in return our AI agent writes warm introductions to prospects who already trust a vendor like them. It becomes the first tab a sales team opens before any outreach."
              }
            </Text>
          </Stack>
        </Stack>
      </Container>

      {/* Principles */}
      <Box
        style={{
          background: "var(--mantine-color-mauve-0)",
          borderTop: "1px solid var(--mantine-color-mauve-1)",
        }}
      >
        <Container size="lg" py={{ base: 56, sm: 88 }}>
          <SectionHeading>What we believe</SectionHeading>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
            {PRINCIPLES.map((p, i) => (
              <Box key={p.title}>
                <Text
                  ff="var(--font-fraunces), Georgia, serif"
                  fz={24}
                  fw={500}
                  c="mauve.7"
                >
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Title order={3} fz="lg" fw={500} mt="sm">
                  {p.title}
                </Title>
                <Text c="dimmed" size="sm" mt="xs">
                  {p.body}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Where we're headed */}
      <Container size="md" py={{ base: 56, sm: 88 }}>
        <Stack gap="sm" maw={760}>
          <SectionHeading>Where we&rsquo;re headed</SectionHeading>
          <Text c="dimmed" size="lg">
            {
              "We're starting with restaurant-facing vendors in the Raleigh–Durham–Chapel Hill Triangle — point-of-sale, payments, equipment, and suppliers — and expanding across the Southeast as each vendor's customers become a panel that surfaces signals for the next. The long-term vision: a living map of which small businesses are ready to buy, and the trusted path to reach them."
            }
          </Text>
        </Stack>
      </Container>

      {/* Closing CTA */}
      <Box style={{ background: "var(--mantine-color-mauve-9)" }}>
        <Container size="md" py={{ base: 64, sm: 96 }}>
          <Stack align="center" gap="lg">
            <Title
              order={2}
              ta="center"
              c="white"
              fs="italic"
              fw={500}
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
                maxWidth: 640,
              }}
            >
              Be early.
            </Title>
            <Text ta="center" c="rgba(255,255,255,0.8)" size="lg" maw={540}>
              {
                "Join the vendors shaping how small businesses get reached. We'll reach out as we onboard."
              }
            </Text>
            <Box maw={480} w="100%" mt="xs">
              <WaitlistForm onDark />
            </Box>
          </Stack>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
