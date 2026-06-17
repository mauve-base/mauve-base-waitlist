"use client";

import { useState } from "react";
import { Box, Button, Flex, Text, TextInput } from "@mantine/core";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({
  onDark = false,
}: {
  onDark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid work email.");
      return;
    }
    setError(null);
    setStatus("loading");

    // TODO: wire to real backend (Notion / Resend). Stubbed for now.
    await new Promise((r) => setTimeout(r, 700));

    setStatus("done");
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
          borderRadius: "var(--mantine-radius-md)",
          background: onDark
            ? "rgba(255,255,255,0.1)"
            : "var(--mantine-color-mauve-0)",
          border: onDark
            ? "1px solid rgba(255,255,255,0.25)"
            : "1px solid var(--mantine-color-mauve-2)",
        }}
      >
        <Box
          style={{
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            width: 24,
            height: 24,
            borderRadius: 999,
            background: onDark ? "#fff" : "var(--mantine-color-mauve-7)",
            color: onDark ? "var(--mantine-color-mauve-7)" : "#fff",
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
        <Text size="sm" c={onDark ? "white" : "black"}>
          You&rsquo;re on the list. We&rsquo;ll reach out as we onboard vendors.
        </Text>
      </Box>
    );
  }

  return (
    <Box w="100%" className={onDark ? "form-on-dark" : undefined}>
      <form onSubmit={handleSubmit} noValidate>
        <Flex gap="sm" direction={{ base: "column", xs: "row" }} align="start">
          <TextInput
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              if (error) setError(null);
            }}
            error={error}
            size="md"
            radius="md"
            aria-label="Work email"
            style={{ flex: 1, width: "100%" }}
          />
          <Button
            type="submit"
            size="md"
            radius="md"
            color="mauve"
            variant={onDark ? "white" : "filled"}
            loading={status === "loading"}
          >
            Join waitlist
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
