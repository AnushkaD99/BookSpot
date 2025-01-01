import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Text,
  Stack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { LuCircleX, LuMenu } from "react-icons/lu";
import NavLink from "./NavLink";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  // Colors using useColorModeValue for light/dark mode support
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = "purple.500";

  // Navigation items configuration
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/my-books", label: "My Books" },
  ];

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    if (isOpen) onToggle();
  };

  // Check if path is active
  const isActivePath = (path) => location.pathname === path;

  return (
    <Box
      bg={bgColor}
      px={4}
      top={0}
      boxShadow="sm"
      as="nav"
      position={"sticky"}
      zIndex={999}
      w={"100%"}
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Logo Section */}
          <Flex alignItems={"center"}>
            <Text
              fontSize="xl"
              fontFamily="'Playfair Display', serif"
              fontWeight="bold"
              color={textColor}
              cursor="pointer"
              onClick={() => handleNavigation("/")}
            >
              BookSpot
            </Text>
          </Flex>

          {/* Mobile Menu Button */}
          <IconButton
            size={"md"}
            icon={isOpen ? <LuCircleX size={24} /> : <LuMenu size={24} />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={onToggle}
          />

          {/* Desktop Navigation */}
          <Flex display={{ base: "none", md: "flex" }} alignItems={"center"}>
            <Stack direction={"row"} spacing={8} alignItems={"center"}>
              {/* Navigation Links */}
              <Stack direction={"row"} spacing={4}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    isActive={isActivePath(item.path)}
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </Stack>

              {/* Auth Buttons */}
              <Stack direction={"row"} spacing={4} ml={8}>
                <Button
                  variant={"ghost"}
                  color={textColor}
                  onClick={() => handleNavigation("#")}
                  _hover={{
                    bg: useColorModeValue("gray.100", "gray.700"),
                  }}
                >
                  Sign In
                </Button>
                <Button
                  bg={accentColor}
                  color={"white"}
                  onClick={() => handleNavigation("#")}
                  _hover={{
                    bg: "purple.600",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Flex>

        {/* Mobile Navigation */}
        <Box display={{ base: isOpen ? "block" : "none", md: "none" }} pb={4}>
          <Stack as={"nav"} spacing={4}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                isActive={isActivePath(item.path)}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </NavLink>
            ))}
            <Button
              w="full"
              variant={"ghost"}
              color={textColor}
              onClick={() => handleNavigation("#")}
              _hover={{
                bg: useColorModeValue("gray.100", "gray.700"),
              }}
            >
              Sign In
            </Button>
            <Button
              w="full"
              bg={accentColor}
              color={"white"}
              onClick={() => handleNavigation("#")}
              _hover={{
                bg: "purple.600",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}