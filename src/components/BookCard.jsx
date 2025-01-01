import { Box, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

export default function BookCard({ name, author, imageURL }) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        width="200px"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        height="300px"
        display="flex"
        flexDirection="column"
      >
        {/* Book Image */}
        <Image
          src={imageURL}
          alt={`Picture of ${name}`}
          roundedTop="lg"
          height="70%"
          objectFit="cover"
        />

        {/* Book Details */}
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex="1"
        >
          <Heading size="sm" textAlign="center">
            {name}
          </Heading>
          <Box fontSize="sm" fontWeight="light" color="gray.600" textAlign="center" mt={2}>
            by {author}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

// Prop Validation
BookCard.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};
