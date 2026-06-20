"use client";

import { useState } from "react";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Turnstile, turnstileEnabled } from "@/components/turnstile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Category = "vendor" | "restaurant" | "other";
const OPTIONS: { value: Category; label: string }[] = [
  { value: "vendor", label: "Vendor" },
  { value: "restaurant", label: "Restaurant" },
  { value: "other", label: "Other" },
];

const FIELD_BORDER = "rgba(36, 24, 38, 0.18)";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="label"
      fontSize="xs"
      fontWeight={600}
      color="ink"
      style={{ letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.7 }}
    >
      {children}
    </Text>
  );
}

const inputProps = {
  size: "md" as const,
  borderRadius: "0",
  bg: "white",
  color: "ink",
  borderColor: FIELD_BORDER,
  _placeholder: { color: "rgba(36, 24, 38, 0.45)" },
  _focusVisible: {
    borderColor: "mauve.7",
    boxShadow: "0 0 0 1px var(--chakra-colors-mauve-7)",
  },
  w: "100%",
};

export function WaitlistSignup({ initialEmail = "" }: { initialEmail?: string }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [category, setCategory] = useState<Category | null>(null);
  const [role, setRole] = useState("");
  const [hp, setHp] = useState(""); // honeypot — stays empty for real users
  const [token, setToken] = useState(""); // Turnstile token
  const [tsReset, setTsReset] = useState(0); // bump to force a fresh challenge
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // guard against double-submit
    if (!name.trim()) return setError("Please enter your name.");
    if (!company.trim()) return setError("Please enter your company.");
    if (!EMAIL_RE.test(email.trim())) return setError("Please enter a valid email.");
    if (!category) return setError("Please tell us what you are.");
    if (category === "other" && !role.trim())
      return setError("Please tell us what you are.");
    if (turnstileEnabled && !token)
      return setError("Please complete the verification below.");

    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          category,
          role: role.trim(),
          turnstileToken: token,
          website: hp,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        // The token is single-use; force a fresh challenge before any retry.
        setToken("");
        setTsReset((n) => n + 1);
        return;
      }
      setStatus("done");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
      setToken("");
      setTsReset((n) => n + 1);
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
          padding: "18px 20px",
          background: "#ffffff",
          border: "1px solid rgba(36, 24, 38, 0.12)",
        }}
      >
        <Box
          style={{
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            width: 26,
            height: 26,
            background: "var(--chakra-colors-mauve-7)",
            color: "#fff",
          }}
        >
          <svg
            width="14"
            height="14"
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
          Check your inbox &mdash; we sent a link to confirm your email.
        </Text>
      </Box>
    );
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit} noValidate>
        {/* honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.currentTarget.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <Stack gap="18px">
          <Stack gap="6px">
            <FieldLabel>Name</FieldLabel>
            <Input
              {...inputProps}
              autoComplete="name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
                if (error) setError(null);
              }}
            />
          </Stack>

          <Stack gap="6px">
            <FieldLabel>Company</FieldLabel>
            <Input
              {...inputProps}
              autoComplete="organization"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => {
                setCompany(e.currentTarget.value);
                if (error) setError(null);
              }}
            />
          </Stack>

          <Stack gap="6px">
            <FieldLabel>Email</FieldLabel>
            <Input
              {...inputProps}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                if (error) setError(null);
              }}
            />
          </Stack>

          <Stack gap="8px">
            <FieldLabel>I am a&hellip;</FieldLabel>
            <Flex gap="10px" direction={{ base: "column", sm: "row" }}>
              {OPTIONS.map((opt) => {
                const selected = category === opt.value;
                return (
                  <Button
                    key={opt.value}
                    type="button"
                    flex="1"
                    size="md"
                    borderRadius="0"
                    fontWeight={500}
                    bg={selected ? "mauve.7" : "white"}
                    color={selected ? "white" : "ink"}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={selected ? "mauve.7" : FIELD_BORDER}
                    _hover={{ borderColor: "mauve.7", bg: selected ? "mauve.8" : "white" }}
                    onClick={() => {
                      setCategory(opt.value);
                      if (error) setError(null);
                    }}
                    aria-pressed={selected}
                  >
                    {opt.label}
                  </Button>
                );
              })}
            </Flex>
          </Stack>

          {category === "other" ? (
            <Stack gap="6px" className="fade-up">
              <FieldLabel>Tell us what you are</FieldLabel>
              <Input
                {...inputProps}
                placeholder="Investor, advisor, etc."
                value={role}
                onChange={(e) => {
                  setRole(e.currentTarget.value);
                  if (error) setError(null);
                }}
              />
            </Stack>
          ) : null}

          <Turnstile onToken={setToken} resetSignal={tsReset} />

          <Button
            type="submit"
            size="lg"
            borderRadius="0"
            fontWeight={500}
            bg="mauve.7"
            color="white"
            _hover={{ bg: "mauve.8" }}
            loading={status === "loading"}
            mt="2px"
          >
            Join waitlist
          </Button>

          {error ? (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          ) : null}
        </Stack>
      </form>
    </Box>
  );
}
