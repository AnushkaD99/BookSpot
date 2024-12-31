import { Box, Button, Flex, Heading, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box
      as="nav"
      w={"100%"}
      position={"fixed"}
      zIndex={"999"}
      bg={useColorModeValue("", "gray.800")}
      bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.1))"
      backdropFilter="blur(8px)"
    >
      <Flex
        h={16}
        px={20}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link to={"/"}>
            <Heading size={"md"}>BookSpot</Heading>
        </Link>
        <HStack spacing={8} >
            <Link to={"/"}>
                <Text>Home</Text>
            </Link>
            <Link to={"/"}>
                <Text>Home</Text>
            </Link>
            <Link to={"/"}>
                <Text>Home</Text>
            </Link>
        </HStack>
        <HStack>
            <Button>SignIn</Button>
            <Button>SignUp</Button>
        </HStack>
      </Flex>
    </Box>
  );
}
