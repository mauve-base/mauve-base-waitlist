import { Box, Stack, Text, Title } from "@mantine/core";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { StepsSection } from "@/components/steps-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <Box>
      <SiteHeader />

      {/* Full-bleed hero that fills the viewport */}
      <Box
        id="waitlist"
        px={{ base: 24, sm: 40 }}
        mih={{ base: "auto", md: "calc(100vh - 69px)" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          align="center"
          gap="xl"
          className="fade-up"
          py={{ base: 72, md: 0 }}
          style={{ width: "100%", maxWidth: 1120 }}
        >
          <Title
            order={1}
            ta="center"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 1040,
            }}
          >
            Reach businesses the moment they&rsquo;re{" "}
            <Text span inherit fs="italic" c="mauve.7">
              ready to buy
            </Text>
            .
          </Title>

          <Text ta="center" c="dimmed" size="xl" maw={640}>
            Mauve Base turns real buying signals and trusted vendor
            relationships into warm introductions — so your outreach starts with
            a yes, not the spam folder.
          </Text>

          <Box maw={520} w="100%" mt="xs">
            <WaitlistForm />
          </Box>
        </Stack>
      </Box>

      <StepsSection tint="lavender" />
      <SiteFooter />
    </Box>
  );
}
