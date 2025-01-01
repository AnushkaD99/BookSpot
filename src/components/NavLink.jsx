import { Link, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

export default function NavLink({ children, isActive = false }) {
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = "purple.500";
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        color: accentColor,
      }}
      fontWeight={500}
      color={isActive ? accentColor : textColor}
      cursor="pointer"
    >
      {children}
    </Link>
  );
}

NavLink.prototype = {
    children: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
}
