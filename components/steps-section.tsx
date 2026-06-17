import {
  Box,
  Card,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

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

export function StepsSection({
  tint = "lavender",
}: {
  tint?: "lavender" | "white";
}) {
  return (
    <Box
      style={{
        background:
          tint === "lavender" ? "var(--mantine-color-mauve-0)" : "#ffffff",
        borderTop: "1px solid var(--mantine-color-mauve-1)",
      }}
    >
      <Container size="xl" py={{ base: 56, sm: 88 }}>
        <Stack gap={6} mb={48} align="center">
          <Title
            order={2}
            ta="center"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.5rem)",
              letterSpacing: "-0.015em",
            }}
          >
            From cold list to warm intro
          </Title>
          <Text ta="center" c="dimmed" maw={520}>
            Ground-level market intelligence for vendors selling into small
            businesses. Three steps.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {STEPS.map((step) => (
            <Card
              key={step.n}
              className="step-card"
              padding="xl"
              radius="lg"
              withBorder
              style={{
                background:
                  tint === "lavender" ? "#ffffff" : "var(--mantine-color-mauve-0)",
                borderColor: "var(--mantine-color-mauve-2)",
              }}
            >
              <Text
                ff="var(--font-fraunces), Georgia, serif"
                fz={26}
                fw={500}
                c="mauve.7"
              >
                {step.n}
              </Text>
              <Title order={3} fz="lg" fw={500} mt="md">
                {step.title}
              </Title>
              <Text c="dimmed" size="sm" mt="xs">
                {step.body}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
