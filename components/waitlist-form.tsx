"use client";

import { useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot — should stay empty for real users

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid work email.");
      return;
    }
    setError(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <Box
        className="fade-up"
        w="100%"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          borderRadius: 0,
          background: "#ffffff",
          border: "1px solid rgba(36, 24, 38, 0.12)",
        }}
      >
        <Box
          style={{
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            width: 24,
            height: 24,
            borderRadius: 0,
            background: "var(--chakra-colors-mauve-7)",
            color: "#fff",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </Box>
        <Text fontSize="sm" color="ink">
          You&rsquo;re on the list. We&rsquo;ll reach out as we onboard vendors.
        </Text>
      </Box>
    );
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.currentTarget.value)}
          style={{
            position: "absolute",
            left: "-9999px",
            width: 1,
            height: 1,
            opacity: 0,
          }}
        />
        <Flex gap="10px" direction={{ base: "column", sm: "row" }} align="flex-start">
          <Box flex="1" w="100%">
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                if (error) setError(null);
              }}
              size="md"
              borderRadius="0"
              bg="white"
              borderColor={error ? "red.500" : "rgba(36, 24, 38, 0.18)"}
              color="ink"
              _placeholder={{ color: "rgba(36, 24, 38, 0.45)" }}
              _focusVisible={{
                borderColor: "mauve.7",
                boxShadow: "0 0 0 1px var(--chakra-colors-mauve-7)",
              }}
              aria-label="Work email"
              aria-invalid={error ? true : undefined}
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
            loading={status === "loading"}
          >
            Join waitlist
          </Button>
        </Flex>
        {error ? (
          <Text color="red.500" fontSize="sm" mt="8px">
            {error}
          </Text>
        ) : null}
      </form>
    </Box>
  );
}
