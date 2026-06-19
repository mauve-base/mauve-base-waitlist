"use client";

import NextLink from "next/link";
import { Box, Button, chakra, Container, Flex, HStack } from "@chakra-ui/react";
import { Logo } from "@/components/logo";

const Link = chakra(NextLink);

export function SiteHeader() {
  return (
    <Box
      as="header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(250, 248, 252, 0.8)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid rgba(36, 24, 38, 0.12)",
      }}
    >
      <Container maxW="1200px" px={{ base: "20px", sm: "28px", lg: "40px" }}>
        <Flex h="64px" align="center" justify="space-between">
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex" }}>
            <Logo />
          </Link>

          <HStack gap={{ base: "18px", sm: "28px" }} align="center">
            <Link
              href="/vision"
              className="nav-link"
              fontSize="sm"
              fontWeight={500}
              hideBelow="sm"
            >
              Vision
            </Link>
            <Button
              asChild
              size="sm"
              borderRadius="0"
              bg="mauve.7"
              color="white"
              fontWeight={500}
              px="18px"
              _hover={{ bg: "mauve.8" }}
            >
              <NextLink href="/waitlist">Join waitlist</NextLink>
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
