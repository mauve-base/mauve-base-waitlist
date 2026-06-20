import type { Metadata } from "next";
import NextLink from "next/link";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Em, Label } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Email confirmation — Mauve Base",
  robots: { index: false },
};

type Status = "success" | "expired" | "invalid" | "error";

const COPY: Record<
  Status,
  { label: string; heading: React.ReactNode; body: string; cta: string }
> = {
  success: {
    label: "You're on the list",
    heading: (
      <>
        Email <Em>confirmed</Em>.
      </>
    ),
    body: "Thanks for confirming. You're on the Mauve Base waitlist — we'll reach out as we onboard vendors.",
    cta: "Back to home",
  },
  expired: {
    label: "Link expired",
    heading: <>This link has expired.</>,
    body: "Confirmation links are valid for 48 hours. Please join the waitlist again to get a fresh link.",
    cta: "Join the waitlist",
  },
  invalid: {
    label: "Invalid link",
    heading: <>This link isn&rsquo;t valid.</>,
    body: "We couldn't read this confirmation link. Please join the waitlist again to get a new one.",
    cta: "Join the waitlist",
  },
  error: {
    label: "Something went wrong",
    heading: <>We couldn&rsquo;t confirm your email.</>,
    body: "Something went wrong on our end. Please try joining the waitlist again in a moment.",
    cta: "Join the waitlist",
  },
};

export default async function VerifiedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const key: Status =
    status === "success" ||
    status === "expired" ||
    status === "invalid" ||
    status === "error"
      ? status
      : "invalid";
  const copy = COPY[key];
  const href = key === "success" ? "/" : "/#waitlist";

  return (
    <Box>
      <SiteHeader />
      <Box
        as="section"
        bg="paper"
        display="flex"
        alignItems="center"
        minH={{ base: "70dvh", md: "80dvh" }}
      >
        <Container maxW="720px" px={{ base: "24px", sm: "40px" }} py={{ base: "72px", md: "96px" }}>
          <Label>{copy.label}</Label>
          <Heading
            as="h1"
            mt={{ base: "18px", md: "22px" }}
            fontWeight={500}
            style={{
              fontSize: "clamp(2.2rem, 5.4vw, 3.6rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            {copy.heading}
          </Heading>
          <Text
            mt={{ base: "20px", md: "24px" }}
            fontSize={{ base: "md", md: "lg" }}
            color="ink"
            style={{ opacity: 0.72 }}
            lineHeight={1.55}
            maxW="520px"
          >
            {copy.body}
          </Text>
          <Stack direction="row" mt={{ base: "28px", md: "36px" }}>
            <Button
              asChild
              size="md"
              borderRadius="0"
              px="22px"
              fontWeight={500}
              bg="mauve.7"
              color="white"
              _hover={{ bg: "mauve.8" }}
            >
              <NextLink href={href}>{copy.cta}</NextLink>
            </Button>
          </Stack>
        </Container>
      </Box>
      <SiteFooter />
    </Box>
  );
}
