import NextLink from "next/link";
import { Box, Button, Container, Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { StepsSection } from "@/components/steps-section";
import { TrustStrip } from "@/components/trust-strip";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Em, Label, RULE } from "@/components/editorial";

export default function Home() {
  return (
    <Box>
      <SiteHeader />

      {/* Editorial hero — stacked lead with a wide framed product window below */}
      <Box
        id="waitlist"
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
          <Box maxW="860px">
            <Reveal>
              <Label>Market intelligence for B2B vendors</Label>
            </Reveal>

            <Reveal delay={0.05}>
              <Heading
                as="h1"
                mt={{ base: "20px", md: "26px" }}
                fontWeight={500}
                style={{
                  fontSize: "clamp(2.6rem, 6.4vw, 5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  maxWidth: "16ch",
                }}
              >
                Reach businesses the moment they&rsquo;re <Em>ready to buy</Em>.
              </Heading>
            </Reveal>

            <Reveal delay={0.12}>
              <Text
                mt={{ base: "24px", md: "32px" }}
                fontSize={{ base: "lg", md: "xl" }}
                color="ink"
                style={{ opacity: 0.72 }}
                lineHeight={1.55}
                maxW="560px"
              >
                Mauve Base turns real buying signals and trusted vendor
                relationships into warm introductions — so your outreach starts
                with a yes, not the spam folder.
              </Text>
            </Reveal>

            <Reveal delay={0.18}>
              <Stack gap="14px" mt={{ base: "28px", md: "40px" }} maxW="520px">
                <Label>Join waitlist</Label>
                <WaitlistForm />
                <Text fontSize="xs" color="ink" style={{ opacity: 0.55 }}>
                  No spam. We&rsquo;ll reach out as we onboard vendors.
                </Text>
              </Stack>
            </Reveal>
          </Box>
        </Container>
      </Box>

      <StepsSection />
      <TrustStrip />

      {/* Closing CTA */}
      <Box as="section" style={{ background: "var(--chakra-colors-paper)", borderTop: RULE }}>
        <Container maxW="1180px" px={{ base: "24px", sm: "40px" }} py={{ base: "72px", md: "112px" }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: "36px", md: "72px" }}
            align={{ base: "flex-start", md: "center" }}
            justify="space-between"
          >
            <Reveal style={{ flex: "1.2" }}>
              <Heading
                as="h2"
                fontWeight={500}
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.4rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.04,
                  maxWidth: "12ch",
                }}
              >
                Start with a <Em>yes</Em>.
              </Heading>
              <Text color="ink" style={{ opacity: 0.72 }} fontSize="lg" mt="18px" maxW="440px">
                Reach small businesses with warm introductions, not cold outreach.
                We&rsquo;ll reach out as we onboard.
              </Text>
            </Reveal>
            <Reveal delay={0.1} style={{ flex: "1", width: "100%", maxWidth: "460px" }}>
              <Stack gap="14px">
                <WaitlistForm />
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  color="accent"
                  fontWeight={500}
                  alignSelf="flex-start"
                  px="0"
                  _hover={{ bg: "transparent", color: "accentDark" }}
                >
                  <NextLink href="/vision">Read our vision →</NextLink>
                </Button>
              </Stack>
            </Reveal>
          </Flex>
        </Container>
      </Box>

      <SiteFooter />
    </Box>
  );
}
