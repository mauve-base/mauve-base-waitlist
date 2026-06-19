"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Input } from "@chakra-ui/react";

/**
 * Inline lead-capture used in the hero and closing CTA. It does NOT sign anyone
 * up directly — it hands the typed email to /waitlist, where the full form (name,
 * company, vendor/restaurant/other) does the real signup. Empty is fine; the
 * waitlist page just opens blank.
 */
export function WaitlistForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    router.push(trimmed ? `/waitlist?email=${encodeURIComponent(trimmed)}` : "/waitlist");
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit} noValidate>
        <Flex gap="10px" direction={{ base: "column", sm: "row" }} align="flex-start">
          <Box flex="1" w="100%">
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              size="md"
              borderRadius="0"
              bg="white"
              borderColor="rgba(36, 24, 38, 0.18)"
              color="ink"
              _placeholder={{ color: "rgba(36, 24, 38, 0.45)" }}
              _focusVisible={{
                borderColor: "mauve.7",
                boxShadow: "0 0 0 1px var(--chakra-colors-mauve-7)",
              }}
              aria-label="Work email"
              w="100%"
            />
          </Box>
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
            Join waitlist
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
