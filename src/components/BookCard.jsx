import { Box, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

export default function BookCard({name, author, imageURL}) {
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW={"200px"}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
        src={imageURL}
        alt={`Picture of ${name}`}
        roundedTop="lg"
        boxSize={'200px'}
        objectFit='cover'
        />
        <Box p={6}>
            <Flex mt="1" justifyContent="center" alignContent="center">
                <Box
                fontSize="sm"
                fontWeight="light"
                lineHeight="tight"
                >
                <Heading size={'sm'}>{name}</Heading>
                 by {author}
              </Box>
            </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

//prop validation
BookCard.propTypes = {
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
};