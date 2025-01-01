import React from "react";
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

  // Colors using useColorModeValue for light/dark mode support
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = "purple.500"; // Matches the banner's accent color

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
                <NavLink isActive={true}>Home</NavLink>
                <NavLink>My Books</NavLink>
              </Stack>

              {/* Auth Buttons */}
              <Stack direction={"row"} spacing={4} ml={8}>
                <Button
                  variant={"ghost"}
                  color={textColor}
                  _hover={{
                    bg: useColorModeValue("gray.100", "gray.700"),
                  }}
                >
                  Sign In
                </Button>
                <Button
                  bg={accentColor}
                  color={"white"}
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
            <NavLink isActive={true}>Home</NavLink>
            <NavLink>My Books</NavLink>
            <Button
              w="full"
              variant={"ghost"}
              color={textColor}
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
