import Image from "next/image";
import { HStack, Text } from "@chakra-ui/react";
import mauveLogo from "@/public/mauve-base-logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <HStack gap="10px" align="center" wrap="nowrap">
      <Image
        src={mauveLogo}
        alt=""
        width={28}
        height={28}
        style={{ display: "block", borderRadius: "6px" }}
      />
      <Text
        fontSize="19px"
        fontWeight={500}
        fontFamily="heading"
        color={light ? "white" : "ink"}
        style={{ letterSpacing: "-0.01em" }}
      >
        Mauve Base
      </Text>
    </HStack>
  );
}
