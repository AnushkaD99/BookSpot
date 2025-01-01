import { Box, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function BookCard({ id, name, author, imageURL }) {
  const navigate = useNavigate();
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
        onClick={() => navigate(`/book/${id}`)}
        cursor="pointer"
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
          <Box
            fontSize="sm"
            fontWeight="light"
            color="gray.600"
            textAlign="center"
            mt={2}
          >
            by {author}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

// Prop Validation
BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};
