import type { Metadata } from "next";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistSignup } from "@/components/waitlist-signup";
import { Em, Label } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Join the waitlist — Mauve Base",
  description:
    "Request early access to Mauve Base. Tell us who you are and we'll reach out as we onboard.",
};

export default async function WaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <Box>
      <SiteHeader />
      <Box as="section" bg="paper" minH={{ base: "auto", md: "calc(100dvh - 64px)" }}>
        <Container maxW="560px" px={{ base: "24px", sm: "40px" }} py={{ base: "56px", md: "80px" }}>
          <Label>Join the waitlist</Label>
          <Heading
            as="h1"
            mt={{ base: "16px", md: "20px" }}
            fontWeight={500}
            style={{
              fontSize: "clamp(2.1rem, 5vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Start with a <Em>yes</Em>.
          </Heading>
          <Text
            mt={{ base: "14px", md: "16px" }}
            fontSize={{ base: "md", md: "lg" }}
            color="ink"
            style={{ opacity: 0.72 }}
            lineHeight={1.55}
          >
            Tell us a little about you. We&rsquo;ll send a quick confirmation email,
            then reach out as we onboard.
          </Text>

          <Stack mt={{ base: "28px", md: "36px" }}>
            <WaitlistSignup initialEmail={email ?? ""} />
            <Text fontSize="xs" color="ink" style={{ opacity: 0.55 }} mt="4px">
              No spam. We&rsquo;ll only email you to confirm and as we onboard.
            </Text>
          </Stack>
        </Container>
      </Box>
      <SiteFooter />
    </Box>
  );
}
