import { Box, Container, Group, Text } from "@mantine/core";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <Box
      component="footer"
      style={{ background: "var(--mantine-color-mauve-9)" }}
    >
      <Container size="xl" py="xl">
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <Logo light />
          <Group gap="lg" align="center">
            <Text
              component="a"
              href="/vision"
              className="nav-link-light"
              size="sm"
            >
              Vision
            </Text>
            <Text
              component="a"
              href="mailto:hello@mauvebase.com"
              size="sm"
              c="white"
              style={{ textDecoration: "none" }}
            >
              hello@mauvebase.com
            </Text>
          </Group>
        </Group>
        <Text size="xs" mt="xl" c="rgba(255,255,255,0.5)" ta="center">
          © 2026 Mauve Base. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
