import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Em, Label } from "@/components/editorial";
import { verifyVerificationToken } from "@/lib/waitlist-token";

export const metadata: Metadata = {
  title: "Confirm your email — Mauve Base",
  robots: { index: false },
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;

  // Peek only — this read has no side effect. The contact is created by the
  // POST below, after the human clicks "Confirm". Bad/expired links skip the
  // button and go straight to the explanatory /verified page.
  const result = verifyVerificationToken(token);
  if (!result.ok) redirect(`/verified?status=${result.reason}`);

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
          <Label>One last step</Label>
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
            Confirm your <Em>email</Em>.
          </Heading>
          <Text
            mt={{ base: "20px", md: "24px" }}
            fontSize={{ base: "md", md: "lg" }}
            color="ink"
            style={{ opacity: 0.72 }}
            lineHeight={1.55}
            maxW="520px"
          >
            Confirm <strong>{result.data.email}</strong> to lock in your place on
            the Mauve Base waitlist. We&rsquo;ll only reach out as we onboard.
          </Text>
          <form method="post" action="/api/waitlist/verify">
            <input type="hidden" name="token" value={token} />
            <Stack direction="row" mt={{ base: "28px", md: "36px" }}>
              <Button
                type="submit"
                size="md"
                borderRadius="0"
                px="22px"
                fontWeight={500}
                bg="mauve.7"
                color="white"
                _hover={{ bg: "mauve.8" }}
              >
                Confirm my email
              </Button>
            </Stack>
          </form>
        </Container>
      </Box>
      <SiteFooter />
    </Box>
  );
}
