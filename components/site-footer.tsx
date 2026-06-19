"use client";

import NextLink from "next/link";
import { Box, chakra, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Logo } from "@/components/logo";

const Link = chakra(NextLink);

export function SiteFooter() {
  return (
    <Box
      as="footer"
      style={{
        background: "var(--chakra-colors-paper)",
        borderTop: "1px solid rgba(36, 24, 38, 0.12)",
      }}
    >
      <Container maxW="1200px" px={{ base: "24px", sm: "40px" }} py={{ base: "40px", sm: "56px" }}>
        <Flex justify="space-between" align="center" wrap="wrap" gap="20px">
          <Logo />
          <HStack gap="24px" align="center">
            <Link href="/vision" className="nav-link" fontSize="sm" fontWeight={500}>
              Vision
            </Link>
            <chakra.a
              href="mailto:hello@mauvebase.com"
              className="nav-link"
              fontSize="sm"
              fontWeight={500}
            >
              hello@mauvebase.com
            </chakra.a>
          </HStack>
        </Flex>
        <Box mt="28px" pt="20px" style={{ borderTop: "1px solid rgba(36, 24, 38, 0.12)" }}>
          <Text fontSize="xs" color="ink" style={{ opacity: 0.55 }}>
            © 2026 Mauve Base. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
