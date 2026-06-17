import { Box, Button, Group, Text } from "@mantine/core";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <Box
      component="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.78)",
        backdropFilter: "saturate(180%) blur(10px)",
        WebkitBackdropFilter: "saturate(180%) blur(10px)",
        borderBottom: "1px solid var(--mantine-color-mauve-1)",
      }}
    >
      <Box
        px={{ base: 20, sm: 32, lg: 48 }}
        h={68}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="a"
          href="/"
          style={{ textDecoration: "none", display: "inline-flex" }}
        >
          <Logo />
        </Box>

        <Group gap="lg" align="center">
          <Text
            component="a"
            href="/vision"
            className="nav-link"
            size="sm"
            fw={500}
            visibleFrom="xs"
          >
            Vision
          </Text>
          <Button
            component="a"
            href="/#waitlist"
            size="sm"
            radius="md"
            color="mauve"
          >
            Join waitlist
          </Button>
        </Group>
      </Box>
    </Box>
  );
}
